import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
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

    const subjects = await prisma.subject.findMany({
      where: { organization_id: auth.organization_id },
      orderBy: { subject_name: "asc" },
    });

    return NextResponse.json(subjects);
  });
}

