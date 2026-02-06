import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireLocationInOrg } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const locationId = new URL(req.url).searchParams.get("location_id");
    if (locationId) {
      await requireLocationInOrg(locationId, auth.organization_id);
    }

    const students = await prisma.student.findMany({
      where: {
        organization_id: auth.organization_id,
        archived_at: null,
        ...(locationId ? { location_id: locationId } : {}),
      },
      orderBy: { created_at: "desc" },
      include: { parent: true },
    });

    return NextResponse.json(students);
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
