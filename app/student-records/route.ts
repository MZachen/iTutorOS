import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

const userSelect = { select: { first_name: true, last_name: true, email: true } };

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const studentId = new URL(req.url).searchParams.get("student_id");

    if (studentId) {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: { id: true, organization_id: true },
      });
      if (!student) notFound("student_id not found");
      if (student.organization_id !== auth.organization_id) badRequest("student_id not in organization");
    }

    const records = await prisma.studentRecord.findMany({
      where: {
        organization_id: auth.organization_id,
        ...(studentId ? { student_id: studentId } : {}),
      },
      orderBy: { updated_at: "desc" },
      include: {
        createdBy: userSelect,
        updatedBy: userSelect,
      },
    });

    return NextResponse.json(records);
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

    const student_id = typeof body.student_id === "string" ? body.student_id : null;
    const note_text = typeof body.note_text === "string" ? body.note_text.trim() : "";

    if (!student_id) badRequest("student_id is required");
    if (!note_text) badRequest("note_text is required");

    const student = await prisma.student.findUnique({
      where: { id: student_id },
      select: { id: true, organization_id: true },
    });
    if (!student) notFound("student_id not found");
    if (student.organization_id !== auth.organization_id) badRequest("student_id not in organization");

    const created = await prisma.studentRecord.create({
      data: {
        organization_id: auth.organization_id,
        student_id,
        note_text,
        created_by_user_id: auth.userId,
        updated_by_user_id: auth.userId,
      },
      include: {
        createdBy: userSelect,
        updatedBy: userSelect,
      },
    });

    return NextResponse.json(created, { status: 201 });
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

    const record_id = typeof body.record_id === "string" ? body.record_id : null;
    const note_text = typeof body.note_text === "string" ? body.note_text.trim() : "";

    if (!record_id) badRequest("record_id is required");
    if (!note_text) badRequest("note_text is required");

    const existing = await prisma.studentRecord.findUnique({
      where: { id: record_id },
      select: { id: true, organization_id: true },
    });
    if (!existing) notFound("record_id not found");
    if (existing.organization_id !== auth.organization_id) badRequest("record_id not in organization");

    const updated = await prisma.studentRecord.update({
      where: { id: record_id },
      data: {
        note_text,
        updated_by_user_id: auth.userId,
      },
      include: {
        createdBy: userSelect,
        updatedBy: userSelect,
      },
    });

    return NextResponse.json(updated);
  });
}
