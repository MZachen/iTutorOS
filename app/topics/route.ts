import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, handleRoute, notFound } from "@/lib/api";
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

    const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
    const topic_name = typeof body.topic_name === "string" ? body.topic_name.trim() : "";
    if (!subject_id) badRequest("subject_id is required");
    if (!topic_name) badRequest("topic_name is required");

    const subject = await prisma.subject.findUnique({
      where: { id: subject_id },
      select: { id: true, organization_id: true },
    });
    if (!subject) notFound("subject_id not found");
    if (subject.organization_id !== auth.organization_id) forbidden("subject_id does not belong to your organization");

    const existing = await prisma.topic.findFirst({
      where: {
        organization_id: auth.organization_id,
        subject_id,
        topic_name: { equals: topic_name, mode: "insensitive" },
      },
    });
    if (existing) return NextResponse.json(existing);

    const created = await prisma.topic.create({
      data: {
        organization_id: auth.organization_id,
        subject_id,
        topic_name,
      },
    });

    return NextResponse.json(created, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const subjectId = new URL(req.url).searchParams.get("subject_id");
    if (!subjectId) badRequest("subject_id required");

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { id: true, organization_id: true },
    });
    if (!subject) notFound("subject_id not found");
    if (subject.organization_id !== auth.organization_id) forbidden("subject_id does not belong to your organization");

    const topics = await prisma.topic.findMany({
      where: { organization_id: auth.organization_id, subject_id: subjectId },
      orderBy: { topic_name: "asc" },
    });

    return NextResponse.json(topics);
  });
}

