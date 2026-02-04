import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireOrgMatch } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const organizationIdParam = new URL(req.url).searchParams.get("organization_id");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const organizationId = auth.organization_id;

    const rows = await prisma.userLocation.findMany({
      where: { user: { organization_id: organizationId } },
      orderBy: { location_id: "asc" },
    });

    return NextResponse.json(rows);
  });
}
