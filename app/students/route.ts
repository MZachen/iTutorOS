import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireLocationInOrg } from "@/lib/auth";

export const runtime = "nodejs";

function parsePositiveInt(
  raw: string | null,
  { fallback, min, max }: { fallback: number; min: number; max: number },
) {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const searchParams = new URL(req.url).searchParams;
    const locationId = searchParams.get("location_id");
    const archivedParam = searchParams.get("archived");
    const shouldPaginate = searchParams.has("page") || searchParams.has("page_size");
    const page = parsePositiveInt(searchParams.get("page"), { fallback: 1, min: 1, max: 100000 });
    const pageSize = parsePositiveInt(searchParams.get("page_size"), {
      fallback: 50,
      min: 1,
      max: 200,
    });
    if (locationId) {
      await requireLocationInOrg(locationId, auth.organization_id);
    }

    const where = {
      organization_id: auth.organization_id,
      ...(archivedParam === "all"
        ? {}
        : archivedParam === "only"
          ? { archived_at: { not: null } }
          : { archived_at: null }),
      ...(locationId ? { location_id: locationId } : {}),
    };

    if (!shouldPaginate) {
      const students = await prisma.student.findMany({
        where,
        orderBy: { created_at: "desc" },
        include: { parent: true },
      });
      return NextResponse.json(students);
    }

    const total = await prisma.student.count({ where });
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const normalizedPage = Math.min(page, pageCount);
    const skip = (normalizedPage - 1) * pageSize;
    const students = await prisma.student.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: { parent: true },
      skip,
      take: pageSize,
    });

    return NextResponse.json({
      items: students,
      total,
      page: normalizedPage,
      page_size: pageSize,
      page_count: pageCount,
      has_prev: normalizedPage > 1,
      has_next: normalizedPage < pageCount,
    });
  });
}

export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const student_id = typeof body.student_id === "string" ? body.student_id : null;
    if (!student_id) badRequest("student_id is required");

    const existing = await prisma.student.findUnique({
      where: { id: student_id },
      select: { id: true, organization_id: true },
    });
    if (!existing) notFound("student_id not found");
    if (existing.organization_id !== auth.organization_id) badRequest("student_id not in organization");

    const data: Record<string, any> = {};
    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : val === null ? null : undefined);

    if (typeof body.first_name === "string") data.first_name = body.first_name.trim();
    if (typeof body.last_name === "string") data.last_name = body.last_name.trim();
    const email = normalize(body.email);
    if (email !== undefined) data.email = email;
    const phone = normalize(body.phone);
    if (phone !== undefined) data.phone = phone;
    const school = normalize(body.school);
    if (school !== undefined) data.school = school;
    if (typeof body.in_person === "boolean") data.in_person = body.in_person;
    const notes = normalize(body.notes);
    if (notes !== undefined) data.notes = notes;

    if (body.dob === null) {
      data.dob = null;
    } else if (typeof body.dob === "string" && body.dob.trim()) {
      const date = new Date(body.dob);
      if (Number.isNaN(date.getTime())) badRequest("dob is invalid");
      data.dob = date;
    }

    if (typeof body.iep === "boolean") data.iep = body.iep;
    if (typeof body.allergies === "boolean") data.allergies = body.allergies;
    if (typeof body.medical_condition === "boolean") data.medical_condition = body.medical_condition;
    if (typeof body.behaviorial_issue === "boolean") data.behaviorial_issue = body.behaviorial_issue;
    if (typeof body.vision_issue === "boolean") data.vision_issue = body.vision_issue;
    if (typeof body.hearing_issue === "boolean") data.hearing_issue = body.hearing_issue;

    if (typeof body.parent_id === "string") {
      const parent = await prisma.parent.findUnique({
        where: { id: body.parent_id },
        select: { id: true, organization_id: true },
      });
      if (!parent || parent.organization_id !== auth.organization_id) badRequest("parent_id not in organization");
      data.parent_id = body.parent_id;
    }

    if (typeof body.location_id === "string") {
      await requireLocationInOrg(body.location_id, auth.organization_id);
      data.location_id = body.location_id;
    }

    if (typeof body.archived === "boolean") data.archived_at = body.archived ? new Date() : null;

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.student.update({ where: { id: student_id }, data, include: { parent: true } });
    return NextResponse.json(updated);
  });
}

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const parent_id = typeof body.parent_id === "string" ? body.parent_id : null;
    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    if (!parent_id) badRequest("parent_id is required");
    if (!location_id) badRequest("location_id is required");
    if (!body.first_name || !body.last_name) badRequest("first_name and last_name are required");

    const parent = await prisma.parent.findUnique({
      where: { id: parent_id },
      select: { id: true, organization_id: true },
    });
    if (!parent || parent.organization_id !== auth.organization_id) badRequest("parent_id not in organization");
    await requireLocationInOrg(location_id, auth.organization_id);

    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : null);

    const rawDob = body.dob;
    let parsedDob: Date | null | undefined = undefined;
    if (rawDob instanceof Date) {
      parsedDob = rawDob;
    } else if (typeof rawDob === "string" && rawDob.trim()) {
      const date = new Date(rawDob);
      if (Number.isNaN(date.getTime())) badRequest("dob is invalid");
      parsedDob = date;
    } else if (rawDob === null) {
      parsedDob = null;
    }

    const created = await prisma.student.create({
      data: {
        organization_id: auth.organization_id,
        parent_id,
        location_id,
        first_name: String(body.first_name).trim(),
        last_name: String(body.last_name).trim(),
        email: normalize(body.email),
        phone: normalize(body.phone),
        dob: parsedDob,
        school: normalize(body.school),
        iep: typeof body.iep === "boolean" ? body.iep : undefined,
        allergies: typeof body.allergies === "boolean" ? body.allergies : undefined,
        medical_condition: typeof body.medical_condition === "boolean" ? body.medical_condition : undefined,
        behaviorial_issue: typeof body.behaviorial_issue === "boolean" ? body.behaviorial_issue : undefined,
        vision_issue: typeof body.vision_issue === "boolean" ? body.vision_issue : undefined,
        hearing_issue: typeof body.hearing_issue === "boolean" ? body.hearing_issue : undefined,
        in_person: typeof body.in_person === "boolean" ? body.in_person : true,
        notes: normalize(body.notes),
      },
      include: { parent: true },
    });

    return NextResponse.json(created, { status: 201 });
  });
}

export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const student_id = typeof body.student_id === "string" ? body.student_id : null;
    if (!student_id) badRequest("student_id is required");

    const existing = await prisma.student.findUnique({
      where: { id: student_id },
      select: { id: true, organization_id: true },
    });
    if (!existing) notFound("student_id not found");
    if (existing.organization_id !== auth.organization_id) badRequest("student_id not in organization");

    const updated = await prisma.student.update({
      where: { id: student_id },
      data: { archived_at: new Date() },
    });
    return NextResponse.json({ id: updated.id, archived_at: updated.archived_at });
  });
}
