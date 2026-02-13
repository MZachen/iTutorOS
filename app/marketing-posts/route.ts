import { NextResponse } from "next/server";
import { MarketingPostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const statusParam = sp.get("status");
    const status: MarketingPostStatus | undefined =
      statusParam === "DRAFT" || statusParam === "READY" || statusParam === "POSTED"
        ? statusParam
        : undefined;

    const rows = await prisma.marketingPost.findMany({
      where: {
        organization_id: auth.organization_id,
        ...(status ? { status } : {}),
      },
      orderBy: [{ updated_at: "desc" }],
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

    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) badRequest("title is required");

    const platform_ids = Array.isArray(body.platform_ids)
      ? body.platform_ids.map((item: any) => String(item))
      : [];

    const created = await prisma.marketingPost.create({
      data: {
        organization_id: auth.organization_id,
        title,
        status: body.status === "POSTED" || body.status === "READY" ? body.status : "DRAFT",
        platform_ids,
        template_style: typeof body.template_style === "string" ? body.template_style : null,
        layout_preset: typeof body.layout_preset === "string" ? body.layout_preset : null,
        aspect_ratio: typeof body.aspect_ratio === "string" ? body.aspect_ratio : null,
        copy_text: typeof body.copy_text === "string" ? body.copy_text : null,
        image_url: typeof body.image_url === "string" ? body.image_url : null,
        media_selection: typeof body.media_selection === "object" ? body.media_selection : null,
        created_by_user_id: auth.userId,
        updated_by_user_id: auth.userId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  });
}
