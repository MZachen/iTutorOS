import { prisma } from "@/lib/prisma";
import { badRequest, conflict, notFound } from "@/lib/api";
import { randomUUID } from "crypto";

type Uuid = string;

const ONE_DAY_MS = 86_400_000;
const MAX_SERIES_OCCURRENCES = 500;

type RecurrenceType = "AD_HOC" | "WEEKLY" | "DAILY";
type UpdateScope = "THIS" | "FUTURE" | "ALL";

type CreateScheduleEntryBody = {
  organization_id: Uuid;
  location_id: Uuid;
  service_offered_id: Uuid;
  tutor_id: Uuid;
  start_at: string; // ISO string
  duration_minutes: number;
  include_buffer?: boolean;
  capacity?: number;

  // recurrence (V1)
  recurrence_type?: RecurrenceType;
  recurrence_interval?: number; // WEEKLY = weeks, DAILY = days
  recurrence_days_of_week?: number[] | string; // WEEKLY only (0-6, UTC)
  series_end_date?: string | null; // ISO datetime
  occurrence_count?: number | null;

  // optional joins
  room_ids?: Uuid[];
  attendee_student_ids?: Uuid[];

  // optional fields (V1)
  product_id?: Uuid | null;
  subject_id?: Uuid | null;
  topic_id?: Uuid | null;
  resources_text?: string | null;
};

type RescheduleBody = {
  start_at: string; // ISO
  duration_minutes: number;
  include_buffer: boolean;
};

type UpdateRoomsBody = { room_ids: Uuid[] };
type UpdateAttendeesBody = { attendee_student_ids: Uuid[] };
type UpdateServiceOfferedBody = { service_offered_id: Uuid };
type UpdateCapacityBody = { capacity: number };
type ExceptionEditBody = {
  start_at?: string;
  duration_minutes?: number;
  include_buffer?: boolean;
  room_ids?: Uuid[];
  attendee_student_ids?: Uuid[];
  service_offered_id?: Uuid;
  capacity?: number;
  product_id?: Uuid | null;
  subject_id?: Uuid | null;
  topic_id?: Uuid | null;
  resources_text?: string | null;
};
type RestoreExceptionBody = { archived_series_entry_id: Uuid };

class ScheduleEntryService {
  // -------------------------
  // Helpers
  // -------------------------
  private requireString(name: string, v: any): string {
    if (typeof v !== "string" || v.trim() === "") {
      badRequest(`${name} is required`);
    }
    return v;
  }

  private requireInt(name: string, v: any): number {
    const n = Number(v);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      badRequest(`${name} must be an integer`);
    }
    return n;
  }

  private parseDate(name: string, v: any): Date {
    const s = this.requireString(name, v);
    const d = new Date(s);
    if (isNaN(d.getTime())) badRequest(`${name} must be ISO datetime`);
    return d;
  }

  private addMinutes(d: Date, minutes: number): Date {
    return new Date(d.getTime() + minutes * 60_000);
  }

  private parseRecurrenceType(v: any): RecurrenceType {
    const t = typeof v === "string" ? v : "AD_HOC";
    if (t === "AD_HOC" || t === "WEEKLY" || t === "DAILY") return t;
    badRequest("recurrence_type must be one of AD_HOC, WEEKLY, DAILY");
  }

  private parseDaysOfWeek(v: any): number[] {
    const raw = Array.isArray(v)
      ? v
      : typeof v === "string"
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : null;

    if (!raw) badRequest("recurrence_days_of_week is required for WEEKLY recurrence");

    const days = raw.map((x: any) => Number(x));
    if (days.some((d) => !Number.isInteger(d) || d < 0 || d > 6)) {
      badRequest("recurrence_days_of_week must be an array (or comma string) of integers 0-6");
    }

    return Array.from(new Set(days)).sort((a, b) => a - b);
  }

  private parseScope(v: any): UpdateScope {
    if (v == null) return "THIS";
    const s = typeof v === "string" ? v.trim().toUpperCase() : "";
    if (s === "" || s === "THIS") return "THIS";
    if (s === "FUTURE" || s === "ALL") return s as UpdateScope;
    badRequest("scope must be one of THIS, FUTURE, ALL");
  }

  private computeEndTimesLocal(params: {
    startAt: Date;
    durationMinutes: number;
    includeBuffer: boolean;
    defaultBufferMinutes: number;
  }): { end_at: Date; blocked_end_at: Date } {
    const endAt = this.addMinutes(params.startAt, params.durationMinutes);
    const blockedEndAt = params.includeBuffer ? this.addMinutes(endAt, params.defaultBufferMinutes) : endAt;
    return { end_at: endAt, blocked_end_at: blockedEndAt };
  }

  private async getOrgDefaultBufferMinutes(organization_id: Uuid): Promise<number> {
    const org = await prisma.organization.findUnique({
      where: { id: organization_id },
      select: { default_buffer_minutes: true },
    });
    if (!org) badRequest("organization_id not found");
    return Number(org.default_buffer_minutes ?? 0);
  }

  private buildDailyOccurrences(params: {
    startAt: Date;
    intervalDays: number;
    seriesEndDate: Date | null;
    occurrenceCount: number | null;
  }): Date[] {
    const out: Date[] = [];
    let cursor = new Date(params.startAt.getTime());

    while (true) {
      if (params.seriesEndDate && cursor.getTime() > params.seriesEndDate.getTime()) break;
      out.push(new Date(cursor.getTime()));
      if (out.length > MAX_SERIES_OCCURRENCES) badRequest("Too many occurrences; reduce schedule length");
      if (params.occurrenceCount && out.length >= params.occurrenceCount) break;
      cursor = new Date(cursor.getTime() + params.intervalDays * ONE_DAY_MS);
    }

    return out;
  }

  private buildWeeklyOccurrences(params: {
    startAt: Date;
    intervalWeeks: number;
    daysOfWeek: number[]; // 0-6 (UTC)
    seriesEndDate: Date | null;
    occurrenceCount: number | null;
  }): Date[] {
    const out: Date[] = [];

    // We iterate day-by-day from startAt; weekIndex is anchored on startAt.
    let cursor = new Date(params.startAt.getTime());
    while (true) {
      if (params.seriesEndDate && cursor.getTime() > params.seriesEndDate.getTime()) break;

      const dayDiff = Math.round((cursor.getTime() - params.startAt.getTime()) / ONE_DAY_MS);
      const weekIndex = Math.floor(dayDiff / 7);
      const inWeek = weekIndex % params.intervalWeeks === 0;

      if (inWeek && params.daysOfWeek.includes(cursor.getUTCDay())) {
        out.push(new Date(cursor.getTime()));
        if (out.length > MAX_SERIES_OCCURRENCES) badRequest("Too many occurrences; reduce schedule length");
        if (params.occurrenceCount && out.length >= params.occurrenceCount) break;
      }

      cursor = new Date(cursor.getTime() + ONE_DAY_MS);
    }

    return out;
  }

  private timeTagsForTutorOrRoom(params: {
    newStart: Date;
    newEnd: Date;
    newBlockedEnd: Date;
    existingStart: Date;
    existingEnd: Date;
    existingBlockedEnd: Date;
  }): ("overlap" | "buffer")[] {
    const { newStart, newEnd, existingStart, existingEnd } = params;

    // "overlap" = real session overlaps
    const overlapsReal = newStart < existingEnd && newEnd > existingStart;

    // Otherwise, the collision is because someone’s blocked/buffer time overlaps
    return overlapsReal ? ["overlap"] : ["buffer"];
  }

  private async computeEndTimes(params: {
    organization_id: Uuid;
    startAt: Date;
    durationMinutes: number;
    includeBuffer: boolean;
  }): Promise<{ end_at: Date; blocked_end_at: Date; default_buffer_minutes: number }> {
    const org = await prisma.organization.findUnique({
      where: { id: params.organization_id },
      select: { default_buffer_minutes: true },
    });
    if (!org) badRequest(`organization_id not found`);

    const defaultBuffer = Number(org.default_buffer_minutes ?? 0);
    const endAt = this.addMinutes(params.startAt, params.durationMinutes);
    const blockedEndAt = params.includeBuffer ? this.addMinutes(endAt, defaultBuffer) : endAt;

    return { end_at: endAt, blocked_end_at: blockedEndAt, default_buffer_minutes: defaultBuffer };
  }

  private async getEntryOrThrow(id: Uuid) {
    const entry = await prisma.scheduleEntry.findUnique({
      where: { id },
      include: { rooms: true, attendees: true },
    });
    if (!entry) notFound(`schedule_entry not found`);
    return entry;
  }

  private async getActiveEntryOrThrow(id: Uuid) {
    const entry = await this.getEntryOrThrow(id);
    if (entry.archived_at) badRequest("schedule_entry is archived");
    return entry;
  }

  private requireSeriesIdForScope(anchor: { series_id: string | null }, scope: UpdateScope) {
    if (scope === "THIS") return;
    if (!anchor.series_id) badRequest("scope requires this schedule entry to be part of a series");
  }

  private seriesScopeWhere(params: { series_id: string; scope: UpdateScope; anchorStartAt: Date }) {
    return {
      series_id: params.series_id,
      archived_at: null,
      ...(params.scope === "FUTURE" ? { start_at: { gte: params.anchorStartAt } } : {}),
    };
  }

  private conflictPayload(params: {
    message: string;
    conflict_tags: string[];
    conflicting_schedule_entry_id: string;
    resource?: Record<string, any>;
  }) {
    return {
      message: params.message,
      conflict_tags: params.conflict_tags,
      conflicting_schedule_entry_id: params.conflicting_schedule_entry_id,
      ...(params.resource ? params.resource : {}),
    };
  }

  private async assertTutorAvailable(params: {
    tutor_id: Uuid;
    exclude_schedule_entry_ids?: Uuid[];
    newStart: Date;
    newEnd: Date;
    newBlockedEnd: Date;
    context?: Record<string, any>;
  }) {
    const excludeIds = params.exclude_schedule_entry_ids?.filter(Boolean) ?? [];
    const conflictEntry = await prisma.scheduleEntry.findFirst({
      where: {
        tutor_id: params.tutor_id,
        archived_at: null,
        id: excludeIds.length ? { notIn: excludeIds } : undefined,
        start_at: { lt: params.newBlockedEnd },
        blocked_end_at: { gt: params.newStart },
      },
      select: { id: true, start_at: true, end_at: true, blocked_end_at: true },
    });

    if (!conflictEntry) return;

    const tags = [
      "tutor",
      ...this.timeTagsForTutorOrRoom({
        newStart: params.newStart,
        newEnd: params.newEnd,
        newBlockedEnd: params.newBlockedEnd,
        existingStart: conflictEntry.start_at,
        existingEnd: conflictEntry.end_at,
        existingBlockedEnd: conflictEntry.blocked_end_at,
      }),
    ];

    conflict(
      this.conflictPayload({
        message: `Tutor is already booked (tutor_id=${params.tutor_id} conflicts with schedule_entry_id=${conflictEntry.id})`,
        conflict_tags: tags,
        conflicting_schedule_entry_id: conflictEntry.id,
        resource: { tutor_id: params.tutor_id, ...(params.context ?? {}) },
      }),
    );
  }

  private async assertRoomsAvailable(params: {
    room_ids: Uuid[];
    exclude_schedule_entry_ids?: Uuid[];
    newStart: Date;
    newEnd: Date;
    newBlockedEnd: Date;
    context?: Record<string, any>;
  }) {
    if (!params.room_ids?.length) return;

    const excludeIds = params.exclude_schedule_entry_ids?.filter(Boolean) ?? [];
    const conflictRoom = await prisma.scheduleEntryRoom.findFirst({
      where: {
        room_id: { in: params.room_ids },
        scheduleEntry: {
          archived_at: null,
          id: excludeIds.length ? { notIn: excludeIds } : undefined,
          start_at: { lt: params.newBlockedEnd },
          blocked_end_at: { gt: params.newStart },
        },
      },
      select: {
        room_id: true,
        scheduleEntry: { select: { id: true, start_at: true, end_at: true, blocked_end_at: true } },
      },
    });

    if (!conflictRoom) return;

    const tags = [
      "room",
      ...this.timeTagsForTutorOrRoom({
        newStart: params.newStart,
        newEnd: params.newEnd,
        newBlockedEnd: params.newBlockedEnd,
        existingStart: conflictRoom.scheduleEntry.start_at,
        existingEnd: conflictRoom.scheduleEntry.end_at,
        existingBlockedEnd: conflictRoom.scheduleEntry.blocked_end_at,
      }),
    ];

    conflict(
      this.conflictPayload({
        message: `Room is already booked (room_id=${conflictRoom.room_id} conflicts with schedule_entry_id=${conflictRoom.scheduleEntry.id})`,
        conflict_tags: tags,
        conflicting_schedule_entry_id: conflictRoom.scheduleEntry.id,
        resource: { room_id: conflictRoom.room_id, ...(params.context ?? {}) },
      }),
    );
  }

  // Student conflicts should be REAL session overlap only (not buffer)
  private async assertStudentsAvailable(params: {
    student_ids: Uuid[];
    exclude_schedule_entry_ids?: Uuid[];
    newStart: Date;
    newEnd: Date;
    context?: Record<string, any>;
  }) {
    if (!params.student_ids?.length) return;

    const excludeIds = params.exclude_schedule_entry_ids?.filter(Boolean) ?? [];
    const conflictAttendance = await prisma.scheduleEntryAttendee.findFirst({
      where: {
        student_id: { in: params.student_ids },
        scheduleEntry: {
          archived_at: null,
          id: excludeIds.length ? { notIn: excludeIds } : undefined,
          start_at: { lt: params.newEnd },
          end_at: { gt: params.newStart },
        },
      },
      select: {
        student_id: true,
        scheduleEntry: { select: { id: true, start_at: true, end_at: true } },
      },
    });

    if (!conflictAttendance) return;

    conflict(
      this.conflictPayload({
        message: `Student is already booked (student_id=${conflictAttendance.student_id} conflicts with schedule_entry_id=${conflictAttendance.scheduleEntry.id})`,
        conflict_tags: ["overlap", "student"],
        conflicting_schedule_entry_id: conflictAttendance.scheduleEntry.id,
        resource: { student_id: conflictAttendance.student_id, ...(params.context ?? {}) },
      }),
    );
  }

  // -------------------------
  // CRUD / Endpoints
  // -------------------------
  async create(body: CreateScheduleEntryBody) {
    const organization_id = this.requireString("organization_id", body.organization_id);
    const location_id = this.requireString("location_id", body.location_id);
    const service_offered_id = this.requireString("service_offered_id", body.service_offered_id);
    const tutor_id = this.requireString("tutor_id", body.tutor_id);

    const startAt = this.parseDate("start_at", body.start_at);
    const durationMinutes = this.requireInt("duration_minutes", body.duration_minutes);
    if (durationMinutes < 1) badRequest("duration_minutes must be >= 1");

    const includeBuffer = Boolean(body.include_buffer ?? false);
    const capacity = body.capacity == null ? 1 : this.requireInt("capacity", body.capacity);
    if (capacity < 1) badRequest("capacity must be >= 1");

    const recurrence_type = this.parseRecurrenceType(body.recurrence_type);

    // Validate location belongs to org
    const location = await prisma.location.findUnique({
      where: { id: location_id },
      select: { id: true, organization_id: true },
    });
    if (!location) badRequest("location_id not found");
    if (location.organization_id !== organization_id) {
      badRequest("location_id does not belong to organization_id");
    }

    // Validate service offered belongs to location
    const svc = await prisma.serviceOffered.findUnique({
      where: { id: service_offered_id },
      select: { id: true, location_id: true, hourly_rate_cents: true },
    });
    if (!svc) badRequest("service_offered_id not found");
    if (svc.location_id !== location_id) {
      badRequest("service_offered_id does not belong to location_id");
    }

    // Validate tutor belongs to org and is associated to location
    const tutor = await prisma.tutor.findUnique({
      where: { id: tutor_id },
      select: { id: true, organization_id: true },
    });
    if (!tutor) badRequest("tutor_id not found");
    if (tutor.organization_id !== organization_id) {
      badRequest("tutor_id does not belong to organization_id");
    }
    const tutorLoc = await prisma.tutorLocation.findUnique({
      where: { tutor_id_location_id: { tutor_id, location_id } },
      select: { tutor_id: true },
    });
    if (!tutorLoc) {
      badRequest("tutor_id is not associated with location_id");
    }

    // Validate rooms belong to location (if provided)
    const room_ids = Array.isArray(body.room_ids) ? Array.from(new Set(body.room_ids)) : [];
    if (room_ids.length) {
      const rooms = await prisma.room.findMany({
        where: { id: { in: room_ids }, location_id },
        select: { id: true },
      });
      if (rooms.length !== room_ids.length) {
        badRequest("All room_ids must belong to location_id");
      }
    }

    // Validate students belong to location (hard rule) (if provided)
    const attendee_student_ids = Array.isArray(body.attendee_student_ids)
      ? Array.from(new Set(body.attendee_student_ids))
      : [];
    if (attendee_student_ids.length) {
      if (attendee_student_ids.length > capacity) {
        badRequest("attendee_student_ids cannot exceed capacity");
      }
      const students = await prisma.student.findMany({
        where: { id: { in: attendee_student_ids }, location_id, archived_at: null },
        select: { id: true },
      });
      if (students.length !== attendee_student_ids.length) {
        badRequest("All attendee_student_ids must belong to location_id and be active");
      }
    }

    // -------------------------
    // AD_HOC (single entry)
    // -------------------------
    if (recurrence_type === "AD_HOC") {
      const { end_at, blocked_end_at } = await this.computeEndTimes({
        organization_id,
        startAt,
        durationMinutes,
        includeBuffer,
      });

      // Conflicts
      await this.assertTutorAvailable({
        tutor_id,
        newStart: startAt,
        newEnd: end_at,
        newBlockedEnd: blocked_end_at,
      });
      await this.assertRoomsAvailable({
        room_ids,
        newStart: startAt,
        newEnd: end_at,
        newBlockedEnd: blocked_end_at,
      });
      await this.assertStudentsAvailable({
        student_ids: attendee_student_ids,
        newStart: startAt,
        newEnd: end_at,
      });

      const created = await prisma.$transaction(async (tx) => {
        const entry = await tx.scheduleEntry.create({
          data: {
            organization_id,
            location_id,
            service_offered_id,
            tutor_id,
            start_at: startAt,
            duration_minutes: durationMinutes,
            include_buffer: includeBuffer,
            end_at,
            blocked_end_at,
            capacity,
            recurrence_type: "AD_HOC",
            hourly_rate_cents_snapshot: Number(svc.hourly_rate_cents),
            product_id: body.product_id ?? null,
            subject_id: body.subject_id ?? null,
            topic_id: body.topic_id ?? null,
            resources_text: body.resources_text ?? null,
          },
        });

        if (room_ids.length) {
          await tx.scheduleEntryRoom.createMany({
            data: room_ids.map((room_id) => ({
              schedule_entry_id: entry.id,
              room_id,
            })),
            skipDuplicates: true,
          });
        }

        if (attendee_student_ids.length) {
          await tx.scheduleEntryAttendee.createMany({
            data: attendee_student_ids.map((student_id) => ({
              schedule_entry_id: entry.id,
              student_id,
            })),
            skipDuplicates: true,
          });
        }

        return tx.scheduleEntry.findUnique({
          where: { id: entry.id },
          include: { rooms: true, attendees: true },
        });
      });

      return created;
    }

    // -------------------------
    // WEEKLY / DAILY (series)
    // -------------------------
    const recurrence_interval =
      body.recurrence_interval == null ? 1 : this.requireInt("recurrence_interval", body.recurrence_interval);
    if (recurrence_interval < 1) badRequest("recurrence_interval must be >= 1");

    const occurrence_count =
      body.occurrence_count == null ? null : this.requireInt("occurrence_count", body.occurrence_count);
    if (occurrence_count != null && occurrence_count < 1) badRequest("occurrence_count must be >= 1");

    const series_end_date = body.series_end_date == null ? null : this.parseDate("series_end_date", body.series_end_date);

    const hasCount = occurrence_count != null;
    const hasEndDate = series_end_date != null;
    if (hasCount === hasEndDate) {
      badRequest("Provide exactly one of occurrence_count or series_end_date for recurring schedules");
    }
    if (series_end_date && series_end_date.getTime() < startAt.getTime()) {
      badRequest("series_end_date must be >= start_at");
    }

    const series_id = randomUUID();

    const occurrences =
      recurrence_type === "DAILY"
        ? this.buildDailyOccurrences({
            startAt,
            intervalDays: recurrence_interval,
            seriesEndDate: series_end_date,
            occurrenceCount: occurrence_count,
          })
        : this.buildWeeklyOccurrences({
            startAt,
            intervalWeeks: recurrence_interval,
            daysOfWeek: this.parseDaysOfWeek(body.recurrence_days_of_week),
            seriesEndDate: series_end_date,
            occurrenceCount: occurrence_count,
          });

    if (occurrences.length === 0) badRequest("Recurrence produced zero occurrences");

    const defaultBufferMinutes = await this.getOrgDefaultBufferMinutes(organization_id);

    const windows = occurrences.map((occStart) => ({
      startAt: occStart,
      ...this.computeEndTimesLocal({
        startAt: occStart,
        durationMinutes,
        includeBuffer,
        defaultBufferMinutes,
      }),
    }));

    // Protect against "self-overlap" (e.g., daily recurrence with duration+buffer > 24h)
    for (let i = 1; i < windows.length; i++) {
      const prev = windows[i - 1]!;
      const curr = windows[i]!;
      if (curr.startAt.getTime() < prev.blocked_end_at.getTime()) {
        badRequest("Recurrence pattern self-overlaps; increase interval or reduce duration/buffer");
      }
    }

    // Conflicts (check every occurrence)
    for (const w of windows) {
      const ctx = { series_id, occurrence_start_at: w.startAt.toISOString() };

      await this.assertTutorAvailable({
        tutor_id,
        newStart: w.startAt,
        newEnd: w.end_at,
        newBlockedEnd: w.blocked_end_at,
        context: ctx,
      });
      await this.assertRoomsAvailable({
        room_ids,
        newStart: w.startAt,
        newEnd: w.end_at,
        newBlockedEnd: w.blocked_end_at,
        context: ctx,
      });
      await this.assertStudentsAvailable({
        student_ids: attendee_student_ids,
        newStart: w.startAt,
        newEnd: w.end_at,
        context: ctx,
      });
    }

    const recurrence_days_of_week =
      recurrence_type === "WEEKLY" ? this.parseDaysOfWeek(body.recurrence_days_of_week).join(",") : null;

    const entry_ids = windows.map(() => randomUUID());

    await prisma.$transaction(async (tx) => {
      await tx.scheduleEntry.createMany({
        data: windows.map((w, idx) => ({
          id: entry_ids[idx]!,
          organization_id,
          location_id,
          service_offered_id,
          tutor_id,
          start_at: w.startAt,
          duration_minutes: durationMinutes,
          include_buffer: includeBuffer,
          end_at: w.end_at,
          blocked_end_at: w.blocked_end_at,
          capacity,
          recurrence_type,
          series_id,
          recurrence_interval,
          recurrence_days_of_week,
          series_end_date,
          occurrence_count,
          hourly_rate_cents_snapshot: Number(svc.hourly_rate_cents),
          product_id: body.product_id ?? null,
          subject_id: body.subject_id ?? null,
          topic_id: body.topic_id ?? null,
          resources_text: body.resources_text ?? null,
        })),
      });

      if (room_ids.length) {
        await tx.scheduleEntryRoom.createMany({
          data: entry_ids.flatMap((schedule_entry_id) =>
            room_ids.map((room_id) => ({ schedule_entry_id, room_id })),
          ),
          skipDuplicates: true,
        });
      }

      if (attendee_student_ids.length) {
        await tx.scheduleEntryAttendee.createMany({
          data: entry_ids.flatMap((schedule_entry_id) =>
            attendee_student_ids.map((student_id) => ({ schedule_entry_id, student_id })),
          ),
          skipDuplicates: true,
        });
      }
    });

    return { series_id, created_count: entry_ids.length, entry_ids };
  }

  async listByLocation(
    location_id: Uuid,
    opts?: { series_id?: string | null; archived?: "active" | "archived" | "all" },
  ) {
    if (!location_id) badRequest("location_id is required");

    const archivedMode = opts?.archived ?? "active";
    const archivedFilter =
      archivedMode === "archived" ? { archived_at: { not: null } } : archivedMode === "all" ? {} : { archived_at: null };

    return prisma.scheduleEntry.findMany({
      where: {
        location_id,
        ...archivedFilter,
        ...(opts?.series_id ? { series_id: opts.series_id } : {}),
      },
      orderBy: { start_at: "asc" },
      include: { rooms: true, attendees: true },
    });
  }

  async getById(id: Uuid) {
    return this.getEntryOrThrow(id);
  }

  async unarchive(id: Uuid, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const anchor = await this.getEntryOrThrow(id);

    if (scope === "THIS") {
      if (!anchor.archived_at) return anchor;

      await this.assertTutorAvailable({
        tutor_id: anchor.tutor_id,
        exclude_schedule_entry_ids: [anchor.id],
        newStart: anchor.start_at,
        newEnd: anchor.end_at,
        newBlockedEnd: anchor.blocked_end_at,
      });
      await this.assertRoomsAvailable({
        room_ids: anchor.rooms.map((r: any) => r.room_id),
        exclude_schedule_entry_ids: [anchor.id],
        newStart: anchor.start_at,
        newEnd: anchor.end_at,
        newBlockedEnd: anchor.blocked_end_at,
      });
      await this.assertStudentsAvailable({
        student_ids: anchor.attendees.map((a: any) => a.student_id),
        exclude_schedule_entry_ids: [anchor.id],
        newStart: anchor.start_at,
        newEnd: anchor.end_at,
      });

      return prisma.scheduleEntry.update({
        where: { id },
        data: { archived_at: null },
        include: { rooms: true, attendees: true },
      });
    }

    this.requireSeriesIdForScope(anchor, scope);

    const entries = await prisma.scheduleEntry.findMany({
      where: {
        ...this.seriesScopeWhere({
          series_id: anchor.series_id!,
          scope,
          anchorStartAt: anchor.start_at,
        }),
        archived_at: { not: null },
      },
      orderBy: { start_at: "asc" },
      include: { rooms: true, attendees: true },
    });

    if (entries.length === 0) {
      return { series_id: anchor.series_id, scope, unarchived_count: 0, entry_ids: [] };
    }

    for (const e of entries) {
      const ctx = { series_id: anchor.series_id, scope, schedule_entry_id: e.id };
      await this.assertTutorAvailable({
        tutor_id: e.tutor_id,
        exclude_schedule_entry_ids: [e.id],
        newStart: e.start_at,
        newEnd: e.end_at,
        newBlockedEnd: e.blocked_end_at,
        context: ctx,
      });
      await this.assertRoomsAvailable({
        room_ids: e.rooms.map((r: any) => r.room_id),
        exclude_schedule_entry_ids: [e.id],
        newStart: e.start_at,
        newEnd: e.end_at,
        newBlockedEnd: e.blocked_end_at,
        context: ctx,
      });
      await this.assertStudentsAvailable({
        student_ids: e.attendees.map((a: any) => a.student_id),
        exclude_schedule_entry_ids: [e.id],
        newStart: e.start_at,
        newEnd: e.end_at,
        context: ctx,
      });
    }

    const entry_ids = entries.map((e) => e.id);
    await prisma.scheduleEntry.updateMany({
      where: { id: { in: entry_ids } },
      data: { archived_at: null },
    });

    return { series_id: anchor.series_id, scope, unarchived_count: entry_ids.length, entry_ids };
  }

  async skipOccurrence(id: Uuid) {
    const entry = await this.getActiveEntryOrThrow(id);
    if (!entry.series_id) badRequest("skip occurrence requires a series entry");

    return prisma.scheduleEntry.update({
      where: { id },
      data: { archived_at: new Date() },
      include: { rooms: true, attendees: true },
    });
  }

  async archive(id: Uuid, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const anchor = await this.getEntryOrThrow(id);

    if (scope === "THIS") {
      return prisma.scheduleEntry.update({
        where: { id },
        data: { archived_at: new Date() },
        include: { rooms: true, attendees: true },
      });
    }

    this.requireSeriesIdForScope(anchor, scope);

    const entries = await prisma.scheduleEntry.findMany({
      where: this.seriesScopeWhere({
        series_id: anchor.series_id!,
        scope,
        anchorStartAt: anchor.start_at,
      }),
      select: { id: true },
      orderBy: { start_at: "asc" },
    });

    const entry_ids = entries.map((e) => e.id);
    if (!entry_ids.length) return { series_id: anchor.series_id, scope, archived_count: 0, entry_ids: [] };

    const archived_at = new Date();
    await prisma.scheduleEntry.updateMany({
      where: { id: { in: entry_ids } },
      data: { archived_at },
    });

    return { series_id: anchor.series_id, scope, archived_count: entry_ids.length, entry_ids };
  }

  async reschedule(id: Uuid, body: RescheduleBody, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const entry = await this.getActiveEntryOrThrow(id);

    const newStart = this.parseDate("start_at", body.start_at);
    const durationMinutes = this.requireInt("duration_minutes", body.duration_minutes);
    if (durationMinutes < 1) badRequest("duration_minutes must be >= 1");

    const includeBuffer = Boolean(body.include_buffer);

    if (scope !== "THIS") {
      this.requireSeriesIdForScope(entry, scope);

      const seriesEntries = await prisma.scheduleEntry.findMany({
        where: this.seriesScopeWhere({
          series_id: entry.series_id!,
          scope,
          anchorStartAt: entry.start_at,
        }),
        orderBy: { start_at: "asc" },
        include: { rooms: true, attendees: true },
      });

      const defaultBufferMinutes = await this.getOrgDefaultBufferMinutes(entry.organization_id);
      const deltaMs = newStart.getTime() - entry.start_at.getTime();

      const windows = seriesEntries.map((e) => {
        const startAt = new Date(e.start_at.getTime() + deltaMs);
        const { end_at, blocked_end_at } = this.computeEndTimesLocal({
          startAt,
          durationMinutes,
          includeBuffer,
          defaultBufferMinutes,
        });
        return {
          id: e.id,
          tutor_id: e.tutor_id,
          room_ids: e.rooms.map((r: any) => r.room_id),
          student_ids: e.attendees.map((a: any) => a.student_id),
          startAt,
          end_at,
          blocked_end_at,
        };
      });

      // Protect against "self-overlap" after applying changes
      windows.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
      for (let i = 1; i < windows.length; i++) {
        const prev = windows[i - 1]!;
        const curr = windows[i]!;
        if (curr.startAt.getTime() < prev.blocked_end_at.getTime()) {
          badRequest("Recurrence pattern self-overlaps; increase interval or reduce duration/buffer");
        }
      }

      const excludeIds = windows.map((w) => w.id);
      for (const w of windows) {
        const ctx = {
          series_id: entry.series_id,
          scope,
          schedule_entry_id: w.id,
          new_start_at: w.startAt.toISOString(),
        };

        await this.assertTutorAvailable({
          tutor_id: w.tutor_id,
          exclude_schedule_entry_ids: excludeIds,
          newStart: w.startAt,
          newEnd: w.end_at,
          newBlockedEnd: w.blocked_end_at,
          context: ctx,
        });
        await this.assertRoomsAvailable({
          room_ids: w.room_ids,
          exclude_schedule_entry_ids: excludeIds,
          newStart: w.startAt,
          newEnd: w.end_at,
          newBlockedEnd: w.blocked_end_at,
          context: ctx,
        });
        await this.assertStudentsAvailable({
          student_ids: w.student_ids,
          exclude_schedule_entry_ids: excludeIds,
          newStart: w.startAt,
          newEnd: w.end_at,
          context: ctx,
        });
      }

      await prisma.$transaction(async (tx) => {
        for (const w of windows) {
          await tx.scheduleEntry.update({
            where: { id: w.id },
            data: {
              start_at: w.startAt,
              duration_minutes: durationMinutes,
              include_buffer: includeBuffer,
              end_at: w.end_at,
              blocked_end_at: w.blocked_end_at,
            },
          });
        }
      });

      return { series_id: entry.series_id, scope, updated_count: windows.length, entry_ids: excludeIds };
    }

    const { end_at, blocked_end_at } = await this.computeEndTimes({
      organization_id: entry.organization_id,
      startAt: newStart,
      durationMinutes,
      includeBuffer,
    });

    // Re-check conflicts using existing rooms + attendees
    const room_ids = entry.rooms.map((r: any) => r.room_id);
    const student_ids = entry.attendees.map((a: any) => a.student_id);

    await this.assertTutorAvailable({
      tutor_id: entry.tutor_id,
      exclude_schedule_entry_ids: [id],
      newStart,
      newEnd: end_at,
      newBlockedEnd: blocked_end_at,
    });
    await this.assertRoomsAvailable({
      room_ids,
      exclude_schedule_entry_ids: [id],
      newStart,
      newEnd: end_at,
      newBlockedEnd: blocked_end_at,
    });
    await this.assertStudentsAvailable({
      student_ids,
      exclude_schedule_entry_ids: [id],
      newStart,
      newEnd: end_at,
    });

    return prisma.scheduleEntry.update({
      where: { id },
      data: {
        start_at: newStart,
        duration_minutes: durationMinutes,
        include_buffer: includeBuffer,
        end_at,
        blocked_end_at,
      },
      include: { rooms: true, attendees: true },
    });
  }

  async updateRooms(id: Uuid, body: UpdateRoomsBody, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const entry = await this.getActiveEntryOrThrow(id);
    const room_ids = Array.isArray(body.room_ids) ? Array.from(new Set(body.room_ids)) : [];
    if (!Array.isArray(body.room_ids)) badRequest("room_ids must be an array");

    if (scope !== "THIS") {
      this.requireSeriesIdForScope(entry, scope);

      // Validate rooms belong to this entry's location
      if (room_ids.length) {
        const rooms = await prisma.room.findMany({
          where: { id: { in: room_ids }, location_id: entry.location_id },
          select: { id: true },
        });
        if (rooms.length !== room_ids.length) {
          badRequest("All room_ids must belong to the schedule entry location_id");
        }
      }

      const seriesEntries = await prisma.scheduleEntry.findMany({
        where: this.seriesScopeWhere({
          series_id: entry.series_id!,
          scope,
          anchorStartAt: entry.start_at,
        }),
        orderBy: { start_at: "asc" },
        select: { id: true, start_at: true, end_at: true, blocked_end_at: true },
      });

      const excludeIds = seriesEntries.map((e) => e.id);
      for (const e of seriesEntries) {
        const ctx = { series_id: entry.series_id, scope, schedule_entry_id: e.id };
        await this.assertRoomsAvailable({
          room_ids,
          exclude_schedule_entry_ids: excludeIds,
          newStart: e.start_at,
          newEnd: e.end_at,
          newBlockedEnd: e.blocked_end_at,
          context: ctx,
        });
      }

      await prisma.$transaction(async (tx) => {
        await tx.scheduleEntryRoom.deleteMany({ where: { schedule_entry_id: { in: excludeIds } } });
        if (room_ids.length) {
          await tx.scheduleEntryRoom.createMany({
            data: excludeIds.flatMap((schedule_entry_id) =>
              room_ids.map((room_id) => ({ schedule_entry_id, room_id })),
            ),
          });
        }
      });

      return { series_id: entry.series_id, scope, updated_count: excludeIds.length, entry_ids: excludeIds };
    }

    // Validate rooms belong to this entry's location
    if (room_ids.length) {
      const rooms = await prisma.room.findMany({
        where: { id: { in: room_ids }, location_id: entry.location_id },
        select: { id: true },
      });
      if (rooms.length !== room_ids.length) {
        badRequest("All room_ids must belong to the schedule entry location_id");
      }
    }

    // Conflicts for rooms use blocked window
    await this.assertRoomsAvailable({
      room_ids,
      exclude_schedule_entry_ids: [id],
      newStart: entry.start_at,
      newEnd: entry.end_at,
      newBlockedEnd: entry.blocked_end_at,
    });

    await prisma.$transaction(async (tx) => {
      await tx.scheduleEntryRoom.deleteMany({ where: { schedule_entry_id: id } });
      if (room_ids.length) {
        await tx.scheduleEntryRoom.createMany({
          data: room_ids.map((room_id) => ({ schedule_entry_id: id, room_id })),
        });
      }
    });

    return this.getById(id);
  }

  async updateAttendees(id: Uuid, body: UpdateAttendeesBody, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const entry = await this.getActiveEntryOrThrow(id);

    const attendee_student_ids = Array.isArray(body.attendee_student_ids)
      ? Array.from(new Set(body.attendee_student_ids))
      : [];
    if (!Array.isArray(body.attendee_student_ids)) {
      badRequest("attendee_student_ids must be an array");
    }

    if (scope !== "THIS") {
      this.requireSeriesIdForScope(entry, scope);

      // Validate students belong to entry.location_id (hard rule)
      if (attendee_student_ids.length) {
        const students = await prisma.student.findMany({
          where: { id: { in: attendee_student_ids }, location_id: entry.location_id, archived_at: null },
          select: { id: true },
        });
        if (students.length !== attendee_student_ids.length) {
          badRequest("All attendee_student_ids must belong to location_id and be active");
        }
      }

      const seriesEntries = await prisma.scheduleEntry.findMany({
        where: this.seriesScopeWhere({
          series_id: entry.series_id!,
          scope,
          anchorStartAt: entry.start_at,
        }),
        orderBy: { start_at: "asc" },
        select: { id: true, start_at: true, end_at: true, capacity: true },
      });

      const overCapacity = seriesEntries.find((e) => attendee_student_ids.length > Number(e.capacity));
      if (overCapacity) badRequest("attendee_student_ids cannot exceed capacity");

      const excludeIds = seriesEntries.map((e) => e.id);
      for (const e of seriesEntries) {
        const ctx = { series_id: entry.series_id, scope, schedule_entry_id: e.id };
        await this.assertStudentsAvailable({
          student_ids: attendee_student_ids,
          exclude_schedule_entry_ids: excludeIds,
          newStart: e.start_at,
          newEnd: e.end_at,
          context: ctx,
        });
      }

      await prisma.$transaction(async (tx) => {
        await tx.scheduleEntryAttendee.deleteMany({ where: { schedule_entry_id: { in: excludeIds } } });
        if (attendee_student_ids.length) {
          await tx.scheduleEntryAttendee.createMany({
            data: excludeIds.flatMap((schedule_entry_id) =>
              attendee_student_ids.map((student_id) => ({ schedule_entry_id, student_id })),
            ),
          });
        }
      });

      return { series_id: entry.series_id, scope, updated_count: excludeIds.length, entry_ids: excludeIds };
    }

    if (attendee_student_ids.length > entry.capacity) {
      badRequest("attendee_student_ids cannot exceed capacity");
    }

    // Validate students belong to entry.location_id (hard rule)
    if (attendee_student_ids.length) {
      const students = await prisma.student.findMany({
        where: { id: { in: attendee_student_ids }, location_id: entry.location_id, archived_at: null },
        select: { id: true },
      });
      if (students.length !== attendee_student_ids.length) {
        badRequest("All attendee_student_ids must belong to location_id and be active");
      }
    }

    // Student conflicts use real session times (not buffer)
    await this.assertStudentsAvailable({
      student_ids: attendee_student_ids,
      exclude_schedule_entry_ids: [id],
      newStart: entry.start_at,
      newEnd: entry.end_at,
    });

    await prisma.$transaction(async (tx) => {
      await tx.scheduleEntryAttendee.deleteMany({ where: { schedule_entry_id: id } });
      if (attendee_student_ids.length) {
        await tx.scheduleEntryAttendee.createMany({
          data: attendee_student_ids.map((student_id) => ({ schedule_entry_id: id, student_id })),
        });
      }
    });

    return this.getById(id);
  }

  async updateServiceOffered(id: Uuid, body: UpdateServiceOfferedBody, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const entry = await this.getActiveEntryOrThrow(id);
    const service_offered_id = this.requireString("service_offered_id", body.service_offered_id);

    const svc = await prisma.serviceOffered.findUnique({
      where: { id: service_offered_id },
      select: { id: true, location_id: true, hourly_rate_cents: true },
    });
    if (!svc) badRequest("service_offered_id not found");
    if (svc.location_id !== entry.location_id) {
      badRequest("service_offered_id does not belong to this schedule entry location_id");
    }

    if (scope !== "THIS") {
      this.requireSeriesIdForScope(entry, scope);

      const entries = await prisma.scheduleEntry.findMany({
        where: this.seriesScopeWhere({
          series_id: entry.series_id!,
          scope,
          anchorStartAt: entry.start_at,
        }),
        select: { id: true },
      });

      const entry_ids = entries.map((e) => e.id);
      await prisma.scheduleEntry.updateMany({
        where: { id: { in: entry_ids } },
        data: { service_offered_id, hourly_rate_cents_snapshot: Number(svc.hourly_rate_cents) },
      });

      return { series_id: entry.series_id, scope, updated_count: entry_ids.length, entry_ids };
    }

    return prisma.scheduleEntry.update({
      where: { id },
      data: {
        service_offered_id,
        hourly_rate_cents_snapshot: Number(svc.hourly_rate_cents),
      },
      include: { rooms: true, attendees: true },
    });
  }

  async updateCapacity(id: Uuid, body: UpdateCapacityBody, opts?: { scope?: any }) {
    const scope = this.parseScope(opts?.scope);
    const capacity = this.requireInt("capacity", body.capacity);
    if (capacity < 1) badRequest("capacity must be >= 1");

    const entry = await this.getActiveEntryOrThrow(id);

    if (scope !== "THIS") {
      this.requireSeriesIdForScope(entry, scope);

      const seriesEntries = await prisma.scheduleEntry.findMany({
        where: this.seriesScopeWhere({
          series_id: entry.series_id!,
          scope,
          anchorStartAt: entry.start_at,
        }),
        select: { id: true, _count: { select: { attendees: true } } },
      });

      const over = seriesEntries.find((e) => Number(e._count.attendees) > capacity);
      if (over) badRequest("capacity cannot be less than current attendee count");

      const entry_ids = seriesEntries.map((e) => e.id);
      await prisma.scheduleEntry.updateMany({
        where: { id: { in: entry_ids } },
        data: { capacity },
      });

      return { series_id: entry.series_id, scope, updated_count: entry_ids.length, entry_ids };
    }

    const currentAttendeeCount = entry.attendees.length;
    if (capacity < currentAttendeeCount) {
      badRequest("capacity cannot be less than current attendee count");
    }

    return prisma.scheduleEntry.update({
      where: { id },
      data: { capacity },
      include: { rooms: true, attendees: true },
    });
  }

  async exceptionEdit(id: Uuid, body: ExceptionEditBody) {
    const entry = await this.getActiveEntryOrThrow(id);
    if (!entry.series_id) badRequest("exception edit requires a series entry");

    const startAt =
      Object.prototype.hasOwnProperty.call(body, "start_at") && body.start_at != null
        ? this.parseDate("start_at", body.start_at)
        : entry.start_at;

    const durationMinutes =
      Object.prototype.hasOwnProperty.call(body, "duration_minutes") && body.duration_minutes != null
        ? this.requireInt("duration_minutes", body.duration_minutes)
        : entry.duration_minutes;
    if (durationMinutes < 1) badRequest("duration_minutes must be >= 1");

    const includeBuffer =
      Object.prototype.hasOwnProperty.call(body, "include_buffer") && body.include_buffer != null
        ? Boolean(body.include_buffer)
        : entry.include_buffer;

    const capacity =
      Object.prototype.hasOwnProperty.call(body, "capacity") && body.capacity != null
        ? this.requireInt("capacity", body.capacity)
        : entry.capacity;
    if (capacity < 1) badRequest("capacity must be >= 1");

    const room_ids = Array.isArray(body.room_ids)
      ? Array.from(new Set(body.room_ids))
      : entry.rooms.map((r: any) => r.room_id);

    const attendee_student_ids = Array.isArray(body.attendee_student_ids)
      ? Array.from(new Set(body.attendee_student_ids))
      : entry.attendees.map((a: any) => a.student_id);

    if (attendee_student_ids.length > capacity) {
      badRequest("attendee_student_ids cannot exceed capacity");
    }

    const service_offered_id = body.service_offered_id ?? entry.service_offered_id;
    let hourly_rate_cents_snapshot = entry.hourly_rate_cents_snapshot;
    if (service_offered_id !== entry.service_offered_id) {
      const svc = await prisma.serviceOffered.findUnique({
        where: { id: service_offered_id },
        select: { id: true, location_id: true, hourly_rate_cents: true },
      });
      if (!svc) badRequest("service_offered_id not found");
      if (svc.location_id !== entry.location_id) {
        badRequest("service_offered_id does not belong to this schedule entry location_id");
      }
      hourly_rate_cents_snapshot = Number(svc.hourly_rate_cents);
    }

    // Validate rooms belong to this entry's location
    if (room_ids.length) {
      const rooms = await prisma.room.findMany({
        where: { id: { in: room_ids }, location_id: entry.location_id },
        select: { id: true },
      });
      if (rooms.length !== room_ids.length) {
        badRequest("All room_ids must belong to the schedule entry location_id");
      }
    }

    // Validate students belong to entry.location_id (hard rule)
    if (attendee_student_ids.length) {
      const students = await prisma.student.findMany({
        where: { id: { in: attendee_student_ids }, location_id: entry.location_id, archived_at: null },
        select: { id: true },
      });
      if (students.length !== attendee_student_ids.length) {
        badRequest("All attendee_student_ids must belong to location_id and be active");
      }
    }

    const { end_at, blocked_end_at } = await this.computeEndTimes({
      organization_id: entry.organization_id,
      startAt,
      durationMinutes,
      includeBuffer,
    });

    // Conflicts (exclude the original occurrence)
    await this.assertTutorAvailable({
      tutor_id: entry.tutor_id,
      exclude_schedule_entry_ids: [entry.id],
      newStart: startAt,
      newEnd: end_at,
      newBlockedEnd: blocked_end_at,
    });
    await this.assertRoomsAvailable({
      room_ids,
      exclude_schedule_entry_ids: [entry.id],
      newStart: startAt,
      newEnd: end_at,
      newBlockedEnd: blocked_end_at,
    });
    await this.assertStudentsAvailable({
      student_ids: attendee_student_ids,
      exclude_schedule_entry_ids: [entry.id],
      newStart: startAt,
      newEnd: end_at,
    });

    const product_id = Object.prototype.hasOwnProperty.call(body, "product_id") ? body.product_id ?? null : entry.product_id;
    const subject_id = Object.prototype.hasOwnProperty.call(body, "subject_id") ? body.subject_id ?? null : entry.subject_id;
    const topic_id = Object.prototype.hasOwnProperty.call(body, "topic_id") ? body.topic_id ?? null : entry.topic_id;
    const resources_text = Object.prototype.hasOwnProperty.call(body, "resources_text")
      ? body.resources_text ?? null
      : entry.resources_text;

    const result = await prisma.$transaction(async (tx) => {
      const newEntry = await tx.scheduleEntry.create({
        data: {
          organization_id: entry.organization_id,
          location_id: entry.location_id,
          service_offered_id,
          tutor_id: entry.tutor_id,
          start_at: startAt,
          duration_minutes: durationMinutes,
          include_buffer: includeBuffer,
          end_at,
          blocked_end_at,
          capacity,
          recurrence_type: "AD_HOC",
          series_id: null,
          recurrence_interval: null,
          recurrence_days_of_week: null,
          series_end_date: null,
          occurrence_count: null,
          hourly_rate_cents_snapshot,
          product_id,
          subject_id,
          topic_id,
          resources_text,
        },
      });

      if (room_ids.length) {
        await tx.scheduleEntryRoom.createMany({
          data: room_ids.map((room_id) => ({ schedule_entry_id: newEntry.id, room_id })),
          skipDuplicates: true,
        });
      }

      if (attendee_student_ids.length) {
        await tx.scheduleEntryAttendee.createMany({
          data: attendee_student_ids.map((student_id) => ({ schedule_entry_id: newEntry.id, student_id })),
          skipDuplicates: true,
        });
      }

      await tx.scheduleEntry.update({
        where: { id: entry.id },
        data: { archived_at: new Date() },
      });

      return newEntry;
    });

    return {
      series_id: entry.series_id,
      archived_series_entry_id: entry.id,
      exception_entry_id: result.id,
    };
  }

  async restoreException(id: Uuid, body: RestoreExceptionBody) {
    const exceptionEntry = await this.getActiveEntryOrThrow(id);
    if (exceptionEntry.series_id) badRequest("exception entry must have series_id null");
    if (exceptionEntry.recurrence_type !== "AD_HOC") badRequest("exception entry must be AD_HOC");

    const archived_series_entry_id = this.requireString("archived_series_entry_id", body.archived_series_entry_id);
    const seriesEntry = await this.getEntryOrThrow(archived_series_entry_id);

    if (!seriesEntry.series_id) badRequest("archived_series_entry_id must be a series entry");
    if (!seriesEntry.archived_at) badRequest("archived_series_entry_id is not archived");
    if (seriesEntry.organization_id !== exceptionEntry.organization_id) {
      badRequest("entries must belong to the same organization");
    }
    if (seriesEntry.location_id !== exceptionEntry.location_id) {
      badRequest("entries must belong to the same location");
    }
    if (seriesEntry.tutor_id !== exceptionEntry.tutor_id) {
      badRequest("entries must belong to the same tutor");
    }

    await this.assertTutorAvailable({
      tutor_id: seriesEntry.tutor_id,
      exclude_schedule_entry_ids: [seriesEntry.id, exceptionEntry.id],
      newStart: seriesEntry.start_at,
      newEnd: seriesEntry.end_at,
      newBlockedEnd: seriesEntry.blocked_end_at,
    });
    await this.assertRoomsAvailable({
      room_ids: seriesEntry.rooms.map((r: any) => r.room_id),
      exclude_schedule_entry_ids: [seriesEntry.id, exceptionEntry.id],
      newStart: seriesEntry.start_at,
      newEnd: seriesEntry.end_at,
      newBlockedEnd: seriesEntry.blocked_end_at,
    });
    await this.assertStudentsAvailable({
      student_ids: seriesEntry.attendees.map((a: any) => a.student_id),
      exclude_schedule_entry_ids: [seriesEntry.id, exceptionEntry.id],
      newStart: seriesEntry.start_at,
      newEnd: seriesEntry.end_at,
    });

    const archived_at = new Date();
    await prisma.$transaction(async (tx) => {
      await tx.scheduleEntry.update({
        where: { id: exceptionEntry.id },
        data: { archived_at },
      });
      await tx.scheduleEntry.update({
        where: { id: seriesEntry.id },
        data: { archived_at: null },
      });
    });

    return {
      series_id: seriesEntry.series_id,
      restored_series_entry_id: seriesEntry.id,
      archived_exception_entry_id: exceptionEntry.id,
    };
  }
}

export const scheduleEntryService = new ScheduleEntryService();
