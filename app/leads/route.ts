import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const organization_id = typeof body.organization_id === "string" ? body.organization_id : null;
    if (!organization_id) badRequest("organization_id required");

    const lead = await prisma.lead.create({
      data: {
        organization_id,

        parent_first_name: typeof body.parent_first_name === "string" ? body.parent_first_name : null,
        parent_last_name: typeof body.parent_last_name === "string" ? body.parent_last_name : null,
        parent_email: typeof body.parent_email === "string" ? body.parent_email : null,
        parent_phone: typeof body.parent_phone === "string" ? body.parent_phone : null,

        parent_address_1: typeof body.parent_address_1 === "string" ? body.parent_address_1 : null,
        parent_address_2: typeof body.parent_address_2 === "string" ? body.parent_address_2 : null,
        parent_city: typeof body.parent_city === "string" ? body.parent_city : null,
        parent_state: typeof body.parent_state === "string" ? body.parent_state : null,
        parent_zip: typeof body.parent_zip === "string" ? body.parent_zip : null,

        lead_location_id: typeof body.lead_location_id === "string" ? body.lead_location_id : null,
        owner_user_id: typeof body.owner_user_id === "string" ? body.owner_user_id : null,

        subject_id: typeof body.subject_id === "string" ? body.subject_id : null,
        topic_id: typeof body.topic_id === "string" ? body.topic_id : null,

        notes: typeof body.notes === "string" ? body.notes : null,

        // your rule: only stage initialized; everything else null unless provided
        stage: "NEW",
        source: typeof body.source === "string" ? body.source : null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const organizationId = new URL(req.url).searchParams.get("organization_id");
    if (!organizationId) badRequest("organization_id required");

    const leads = await prisma.lead.findMany({
      where: { organization_id: organizationId, archived_at: null },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(leads);
  });
}

