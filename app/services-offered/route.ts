import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

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

    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    const service_code = typeof body.service_code === "string" ? body.service_code : null;
    const hourly_rate_cents = typeof body.hourly_rate_cents === "number" ? body.hourly_rate_cents : null;

    if (!location_id) badRequest("location_id required");
    if (!service_code) badRequest("service_code required");
    if (hourly_rate_cents == null) badRequest("hourly_rate_cents required");

    await requireLocationInOrg(location_id, auth.organization_id);

    const svc = await prisma.serviceOffered.create({
      data: {
        location_id,
        service_code,
        hourly_rate_cents,
        display_name: typeof body.display_name === "string" ? body.display_name : null,
        description_text: typeof body.description_text === "string" ? body.description_text : null,
        is_active: body.is_active == null ? true : Boolean(body.is_active),
      },
    });

    return NextResponse.json(svc, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const locationId = new URL(req.url).searchParams.get("location_id");
    if (!locationId) badRequest("location_id required");

    await requireLocationInOrg(locationId, auth.organization_id);

    const rows = await prisma.serviceOffered.findMany({
      where: { location_id: locationId },
      orderBy: { service_code: "asc" },
    });

    return NextResponse.json(rows);
  });
}
