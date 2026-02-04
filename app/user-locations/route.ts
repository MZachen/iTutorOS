import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const organizationId = new URL(req.url).searchParams.get("organization_id");
    if (!organizationId) badRequest("organization_id required");

    const rows = await prisma.userLocation.findMany({
      where: { user: { organization_id: organizationId } },
      orderBy: { location_id: "asc" },
    });

    return NextResponse.json(rows);
  });
}

