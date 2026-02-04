import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const locationId = new URL(req.url).searchParams.get("location_id");
    if (!locationId) badRequest("location_id is required");

    await requireLocationInOrg(locationId, auth.organization_id);

    const students = await prisma.student.findMany({
      where: { location_id: locationId, archived_at: null },
      orderBy: { created_at: "desc" },
      include: { parent: true },
    });

    return NextResponse.json(students);
  });
}
