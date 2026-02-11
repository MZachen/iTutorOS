import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const subject_name = typeof body.subject_name === "string" ? body.subject_name.trim() : "";
    if (!subject_name) badRequest("subject_name is required");

    const existing = await prisma.subject.findFirst({
      where: {
        organization_id: auth.organization_id,
        subject_name: { equals: subject_name, mode: "insensitive" },
      },
    });

    if (existing) return NextResponse.json(existing);

    const created = await prisma.subject.create({
      data: {
        organization_id: auth.organization_id,
        subject_name,
      },
    });

    return NextResponse.json(created, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const archivedParam = new URL(req.url).searchParams.get("archived");

    const subjects = await prisma.subject.findMany({
      where: { organization_id: auth.organization_id, ...(archivedParam === "all" ? {} : { archived_at: null }) },
      orderBy: { subject_name: "asc" },
    });

    return NextResponse.json(subjects);
  });
}

export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
    if (!subject_id) badRequest("subject_id is required");

    const subject = await prisma.subject.findUnique({
      where: { id: subject_id },
      select: { id: true, organization_id: true },
    });
    if (!subject) notFound("subject_id not found");
    if (subject.organization_id !== auth.organization_id) badRequest("subject_id does not belong to your organization");

    const data: Record<string, any> = {};
    if ("subject_name" in body) {
      const subject_name = typeof body.subject_name === "string" ? body.subject_name.trim() : "";
      if (!subject_name) badRequest("subject_name is required");
      data.subject_name = subject_name;
    }
    if ("description_text" in body) {
      const description_text =
        typeof body.description_text === "string" ? body.description_text.trim() || null : body.description_text === null ? null : undefined;
      if (description_text !== undefined) data.description_text = description_text;
    }
    if (typeof body.archived === "boolean") {
      data.archived_at = body.archived ? new Date() : null;
    }
    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.subject.update({
      where: { id: subject_id },
      data,
    });

    return NextResponse.json(updated);
  });
}

export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
    if (!subject_id) badRequest("subject_id is required");

    const subject = await prisma.subject.findUnique({
      where: { id: subject_id },
      select: { id: true, organization_id: true },
    });
    if (!subject) notFound("subject_id not found");
    if (subject.organization_id !== auth.organization_id) badRequest("subject_id does not belong to your organization");

    const updated = await prisma.subject.update({
      where: { id: subject_id },
      // Prisma Client types may be stale until `prisma generate` is run after schema changes.
      data: { archived_at: new Date() } as any,
    });
    return NextResponse.json({ id: updated.id, archived_at: (updated as any).archived_at });
  });
}
