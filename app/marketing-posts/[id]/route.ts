import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const routeParams = await params;
    const id = routeParams.id;
    if (!id) badRequest("id is required");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const post = await prisma.marketingPost.findUnique({ where: { id } });
    if (!post || post.organization_id !== auth.organization_id) {
      notFound("marketing post not found");
    }

    const data: Record<string, any> = { updated_by_user_id: auth.userId };

    if ("title" in body) {
      const title = typeof body.title === "string" ? body.title.trim() : "";
      if (!title) badRequest("title is required");
      data.title = title;
    }

    if ("status" in body) {
      const status = body.status;
      if (!["DRAFT", "READY", "POSTED"].includes(status)) {
        badRequest("status is invalid");
      }
      data.status = status;
      if (status === "POSTED") {
        data.posted_at = new Date();
        data.last_posted_at = new Date();
      }
    }

    if ("platform_ids" in body && Array.isArray(body.platform_ids)) {
      data.platform_ids = body.platform_ids.map((item: any) => String(item));
    }

    if ("template_style" in body) {
      data.template_style = typeof body.template_style === "string" ? body.template_style : null;
    }
    if ("layout_preset" in body) {
      data.layout_preset = typeof body.layout_preset === "string" ? body.layout_preset : null;
    }
    if ("aspect_ratio" in body) {
      data.aspect_ratio = typeof body.aspect_ratio === "string" ? body.aspect_ratio : null;
    }
    if ("copy_text" in body) {
      data.copy_text = typeof body.copy_text === "string" ? body.copy_text : null;
    }
    if ("image_url" in body) {
      data.image_url = typeof body.image_url === "string" ? body.image_url : null;
    }
    if ("media_selection" in body) {
      data.media_selection = typeof body.media_selection === "object" ? body.media_selection : null;
    }

    const updated = await prisma.marketingPost.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const routeParams = await params;
    const id = routeParams.id;
    if (!id) badRequest("id is required");

    const post = await prisma.marketingPost.findUnique({ where: { id } });
    if (!post || post.organization_id !== auth.organization_id) {
      notFound("marketing post not found");
    }

    await prisma.marketingPost.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  });
}
