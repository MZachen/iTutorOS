import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const { id } = await params;
    if (!id) badRequest("lead id required");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    // only update what is provided
    const data: any = {};
    const allowed = [
      "stage",
      "lead_location_id",
      "owner_user_id",
      "temperature",
      "last_contact_method",
      "last_contact_at",
      "reason_lost",
      "notes",
      "subject_id",
      "topic_id",
      "source",
      "converted_parent_id",
      "parent_first_name",
      "parent_last_name",
      "parent_email",
      "parent_phone",
      "parent_address_1",
      "parent_address_2",
      "parent_city",
      "parent_state",
      "parent_zip",
    ];

    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, k)) data[k] = body[k];
    }

    const updated = await prisma.lead.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  });
}
