import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound, forbidden } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { id } = await params;
    if (!id) badRequest("id is required");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const conflictRow = await prisma.scheduleConflict.findUnique({ where: { id } });
    if (!conflictRow) notFound("schedule_conflict not found");
    if (conflictRow.organization_id !== auth.organization_id) forbidden("schedule_conflict not in organization");

    if (typeof body.resolved !== "boolean") {
      badRequest("resolved must be boolean");
    }

    const updated = await prisma.scheduleConflict.update({
      where: { id },
      data: {
        resolved_at: body.resolved ? new Date() : null,
        resolved_by_user_id: body.resolved ? auth.userId : null,
      },
    });

    return NextResponse.json(updated);
  });
}

