import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const location_id = sp.get("location_id");
    const archivedParam = sp.get("archived");
    let archived: "active" | "archived" | "all" = "active";
    if (archivedParam != null) {
      const v = archivedParam.toLowerCase();
      if (v === "true" || v === "1" || v === "archived") archived = "archived";
      else if (v === "all") archived = "all";
      else if (v === "false" || v === "0" || v === "active") archived = "active";
      else badRequest("archived must be one of true,false,all");
    }

    const archivedFilter =
      archived === "archived" ? { archived_at: { not: null } } : archived === "all" ? {} : { archived_at: null };

    const tutors = await prisma.tutor.findMany({
      where: {
        organization_id: auth.organization_id,
        ...archivedFilter,
        ...(location_id
          ? { tutorLocations: { some: { location_id } } }
          : {}),
      },
      orderBy: { created_at: "asc" },
      include: {
        user: { select: { first_name: true, last_name: true, email: true } },
        tutorLocations: true,
      },
    });

    return NextResponse.json(tutors);
  });
}

