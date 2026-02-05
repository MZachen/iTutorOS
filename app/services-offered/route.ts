import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
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

    const service_offered_id = typeof body.service_offered_id === "string" ? body.service_offered_id : null;
    if (!service_offered_id) badRequest("service_offered_id required");

    const svc = await prisma.serviceOffered.findUnique({
      where: { id: service_offered_id },
      select: { id: true, location_id: true },
    });
    if (!svc) notFound("service_offered_id not found");

    await requireLocationInOrg(svc.location_id, auth.organization_id);

    const data: Record<string, any> = {};
    if (typeof body.service_code === "string") data.service_code = body.service_code.trim();
    if (typeof body.hourly_rate_cents === "number") data.hourly_rate_cents = body.hourly_rate_cents;
    if (typeof body.is_active === "boolean") data.is_active = body.is_active;

    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : val === null ? null : undefined);
    const displayName = normalize(body.display_name);
    if (displayName !== undefined) data.display_name = displayName;
    const descriptionText = normalize(body.description_text);
    if (descriptionText !== undefined) data.description_text = descriptionText;

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.serviceOffered.update({
      where: { id: service_offered_id },
      data,
    });

    return NextResponse.json(updated);
  });
}

export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const service_offered_id = typeof body.service_offered_id === "string" ? body.service_offered_id : null;
    if (!service_offered_id) badRequest("service_offered_id required");

    const svc = await prisma.serviceOffered.findUnique({
      where: { id: service_offered_id },
      select: { id: true, location_id: true },
    });
    if (!svc) notFound("service_offered_id not found");

    await requireLocationInOrg(svc.location_id, auth.organization_id);

    const updated = await prisma.serviceOffered.update({
      where: { id: service_offered_id },
      data: { is_active: false },
    });

    return NextResponse.json({ id: updated.id, is_active: updated.is_active });
  });
}
