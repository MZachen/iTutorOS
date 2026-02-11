import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor, requireScheduleEntryInOrg } from "@/lib/auth";
import { scheduleEntryService } from "@/lib/schedule-entry";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(_req);
    const { id } = await params;
    if (!id) badRequest("id is required");

    await requireScheduleEntryInOrg(id, auth.organization_id);
    const entry = await scheduleEntryService.getById(id);
    return NextResponse.json(entry);
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);
    const { id } = await params;
    if (!id) badRequest("id is required");

    await requireScheduleEntryInOrg(id, auth.organization_id);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const entry = await scheduleEntryService.getById(id);

    const scope = typeof body.scope === "string" ? body.scope : undefined;
    const allowConflicts = Boolean(body.allow_conflicts ?? false);
    const createdByUserId = auth.userId ?? null;

    const nextStartAt =
      Object.prototype.hasOwnProperty.call(body, "start_at") && body.start_at != null
        ? body.start_at
        : entry.start_at;
    const nextDuration =
      Object.prototype.hasOwnProperty.call(body, "duration_minutes") && body.duration_minutes != null
        ? body.duration_minutes
        : entry.duration_minutes;
    const nextIncludeBuffer =
      Object.prototype.hasOwnProperty.call(body, "include_buffer") && body.include_buffer != null
        ? body.include_buffer
        : entry.include_buffer;

    const shouldReschedule =
      Object.prototype.hasOwnProperty.call(body, "start_at") ||
      Object.prototype.hasOwnProperty.call(body, "duration_minutes") ||
      Object.prototype.hasOwnProperty.call(body, "include_buffer");

    if (shouldReschedule) {
      await scheduleEntryService.reschedule(
        id,
        {
          start_at: new Date(nextStartAt).toISOString(),
          duration_minutes: Number(nextDuration),
          include_buffer: Boolean(nextIncludeBuffer),
        },
        { scope, allowConflicts, createdByUserId },
      );
    }

    if (Object.prototype.hasOwnProperty.call(body, "service_offered_id")) {
      await scheduleEntryService.updateServiceOffered(id, { service_offered_id: body.service_offered_id }, { scope });
    }

    if (Object.prototype.hasOwnProperty.call(body, "room_ids")) {
      await scheduleEntryService.updateRooms(
        id,
        { room_ids: Array.isArray(body.room_ids) ? body.room_ids : [] },
        { scope, allowConflicts, createdByUserId },
      );
    }

    if (Object.prototype.hasOwnProperty.call(body, "attendee_student_ids")) {
      await scheduleEntryService.updateAttendees(
        id,
        { attendee_student_ids: Array.isArray(body.attendee_student_ids) ? body.attendee_student_ids : [] },
        { scope, allowConflicts, createdByUserId },
      );
    }

    if (Object.prototype.hasOwnProperty.call(body, "capacity")) {
      await scheduleEntryService.updateCapacity(id, { capacity: Number(body.capacity) }, { scope });
    }

    const meta: Record<string, any> = {};
    if (Object.prototype.hasOwnProperty.call(body, "subject_id")) {
      meta.subject_id = body.subject_id ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(body, "topic_id")) {
      meta.topic_id = body.topic_id ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(body, "resources_text")) {
      meta.resources_text = typeof body.resources_text === "string" ? body.resources_text.trim() || null : null;
    }
    if (Object.prototype.hasOwnProperty.call(body, "location_detail")) {
      meta.location_detail = typeof body.location_detail === "string" ? body.location_detail.trim() || null : null;
    }

    if (Object.keys(meta).length > 0) {
      const location = await prisma.location.findUnique({
        where: { id: entry.location_id },
        select: { is_virtual: true, is_system: true },
      });
      if ((location?.is_virtual || location?.is_system) && !meta.location_detail) {
        badRequest("location_detail is required for virtual or offsite sessions");
      }
      await prisma.scheduleEntry.update({ where: { id }, data: meta });
    }

    const updated = await scheduleEntryService.getById(id);
    return NextResponse.json(updated);
  });
}
