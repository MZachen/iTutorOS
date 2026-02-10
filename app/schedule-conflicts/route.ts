import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const sp = new URL(req.url).searchParams;
    const resolvedParam = sp.get("resolved");
    let resolvedFilter: { resolved_at?: null | { not: null } } | undefined;
    if (!resolvedParam || resolvedParam === "false" || resolvedParam === "0") {
      resolvedFilter = { resolved_at: null };
    } else if (resolvedParam === "true" || resolvedParam === "1") {
      resolvedFilter = { resolved_at: { not: null } };
    } else if (resolvedParam === "all") {
      resolvedFilter = undefined;
    } else {
      badRequest("resolved must be one of true,false,all");
    }

    const conflicts = await prisma.scheduleConflict.findMany({
      where: {
        organization_id: auth.organization_id,
        ...(resolvedFilter ?? {}),
      },
      orderBy: { created_at: "desc" },
      include: {
        scheduleEntry: true,
        conflictingScheduleEntry: true,
      },
    });

    return NextResponse.json(conflicts);
  });
}

