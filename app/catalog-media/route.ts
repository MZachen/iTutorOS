import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

function normalizeText(value: any) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
  if (value === null) return null;
  return undefined;
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const product_id = sp.get("product_id");
    const subject_id = sp.get("subject_id");
    const topic_id = sp.get("topic_id");
    const service_code = sp.get("service_code");
    const archivedParam = sp.get("archived");
    const archivedFilter = archivedParam === "all" ? {} : { archived_at: null };

    const rows = await prisma.catalogMedia.findMany({
      where: {
        organization_id: auth.organization_id,
        ...archivedFilter,
        ...(product_id ? { product_id } : {}),
        ...(subject_id ? { subject_id } : {}),
        ...(topic_id ? { topic_id } : {}),
        ...(service_code ? { service_code } : {}),
      },
      orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
    });

    return NextResponse.json(rows);
  });
}

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

    const product_id = typeof body.product_id === "string" ? body.product_id : null;
    const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
    const topic_id = typeof body.topic_id === "string" ? body.topic_id : null;
    const service_code = typeof body.service_code === "string" ? body.service_code.trim() : null;

    if (!product_id && !subject_id && !topic_id && !service_code) {
      badRequest("Provide product_id, subject_id, topic_id, or service_code");
    }

    if (product_id) {
      const product = await prisma.product.findUnique({
        where: { id: product_id },
        select: { organization_id: true },
      });
      if (!product || product.organization_id !== auth.organization_id) {
        badRequest("product_id does not belong to your organization");
      }
    }

    if (subject_id) {
      const subject = await prisma.subject.findUnique({
        where: { id: subject_id },
        select: { organization_id: true },
      });
      if (!subject || subject.organization_id !== auth.organization_id) {
        badRequest("subject_id does not belong to your organization");
      }
    }

    if (topic_id) {
      const topic = await prisma.topic.findUnique({
        where: { id: topic_id },
        select: { organization_id: true },
      });
      if (!topic || topic.organization_id !== auth.organization_id) {
        badRequest("topic_id does not belong to your organization");
      }
    }

    if (service_code) {
      const svc = await prisma.serviceOffered.findFirst({
        where: {
          service_code,
          location: { organization_id: auth.organization_id },
        },
        select: { id: true },
      });
      if (!svc) badRequest("service_code not found in your organization");
    }

    const media_url = typeof body.media_url === "string" ? body.media_url.trim() : "";
    if (!media_url) badRequest("media_url is required");

    const media_type = typeof body.media_type === "string" ? body.media_type : null;
    if (media_type !== "PHOTO" && media_type !== "VIDEO") {
      badRequest("media_type must be PHOTO or VIDEO");
    }

    const created = await prisma.catalogMedia.create({
      data: {
        organization_id: auth.organization_id,
        product_id,
        subject_id,
        topic_id,
        service_code: service_code || null,
        media_type,
        media_url,
        caption_text: normalizeText(body.caption_text),
        sort_order: typeof body.sort_order === "number" ? body.sort_order : null,
      },
    });

    return NextResponse.json(created, { status: 201 });
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

    const id = typeof body.id === "string" ? body.id : null;
    if (!id) badRequest("id is required");

    const row = await prisma.catalogMedia.findUnique({
      where: { id },
      select: { id: true, organization_id: true },
    });
    if (!row) notFound("catalog media not found");
    if (row.organization_id !== auth.organization_id) badRequest("catalog media does not belong to your organization");

    const updated = await prisma.catalogMedia.update({
      where: { id },
      data: { archived_at: new Date() },
    });

    return NextResponse.json({ id: updated.id, archived_at: updated.archived_at });
  });
}
