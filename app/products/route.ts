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
    const rows = await prisma.product.findMany({
      where: { organization_id: auth.organization_id },
      orderBy: { product_name: "asc" },
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

    const product_name = typeof body.product_name === "string" ? body.product_name.trim() : "";
    if (!product_name) badRequest("product_name is required");

    const product_type = typeof body.product_type === "string" ? body.product_type : "CLASS";

    const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
    const topic_id = typeof body.topic_id === "string" ? body.topic_id : null;

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

    const created = await prisma.product.create({
      data: {
        organization_id: auth.organization_id,
        product_type,
        product_name,
        product_slogan_text: normalizeText(body.product_slogan_text),
        product_logo_url: normalizeText(body.product_logo_url),
        product_description_text: normalizeText(body.product_description_text),
        product_syllabus_text: normalizeText(body.product_syllabus_text),
        languages_offered: normalizeText(body.languages_offered),
        service_code: normalizeText(body.service_code),
        subject_id: subject_id ?? null,
        topic_id: topic_id ?? null,
      },
    });

    return NextResponse.json(created, { status: 201 });
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

    const product_id = typeof body.product_id === "string" ? body.product_id : null;
    if (!product_id) badRequest("product_id is required");

    const product = await prisma.product.findUnique({
      where: { id: product_id },
      select: { id: true, organization_id: true },
    });
    if (!product) notFound("product_id not found");
    if (product.organization_id !== auth.organization_id) badRequest("product_id does not belong to your organization");

    const data: Record<string, any> = {};
    if ("product_name" in body) {
      const product_name = typeof body.product_name === "string" ? body.product_name.trim() : "";
      if (!product_name) badRequest("product_name is required");
      data.product_name = product_name;
    }
    if (typeof body.product_type === "string") data.product_type = body.product_type;

    if ("product_slogan_text" in body) {
      const next = normalizeText(body.product_slogan_text);
      if (next !== undefined) data.product_slogan_text = next;
    }
    if ("product_logo_url" in body) {
      const next = normalizeText(body.product_logo_url);
      if (next !== undefined) data.product_logo_url = next;
    }
    if ("product_description_text" in body) {
      const next = normalizeText(body.product_description_text);
      if (next !== undefined) data.product_description_text = next;
    }
    if ("product_syllabus_text" in body) {
      const next = normalizeText(body.product_syllabus_text);
      if (next !== undefined) data.product_syllabus_text = next;
    }
    if ("languages_offered" in body) {
      const next = normalizeText(body.languages_offered);
      if (next !== undefined) data.languages_offered = next;
    }
    if ("service_code" in body) {
      const next = normalizeText(body.service_code);
      if (next !== undefined) data.service_code = next;
    }

    if ("subject_id" in body) {
      const subject_id = typeof body.subject_id === "string" ? body.subject_id : null;
      if (subject_id) {
        const subject = await prisma.subject.findUnique({
          where: { id: subject_id },
          select: { organization_id: true },
        });
        if (!subject || subject.organization_id !== auth.organization_id) {
          badRequest("subject_id does not belong to your organization");
        }
      }
      data.subject_id = subject_id;
    }

    if ("topic_id" in body) {
      const topic_id = typeof body.topic_id === "string" ? body.topic_id : null;
      if (topic_id) {
        const topic = await prisma.topic.findUnique({
          where: { id: topic_id },
          select: { organization_id: true },
        });
        if (!topic || topic.organization_id !== auth.organization_id) {
          badRequest("topic_id does not belong to your organization");
        }
      }
      data.topic_id = topic_id;
    }

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.product.update({
      where: { id: product_id },
      data,
    });

    return NextResponse.json(updated);
  });
}
