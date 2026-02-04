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
    const user_id = typeof body.user_id === "string" ? body.user_id : null;
    const email = typeof body.email === "string" ? body.email : null;

    if (!organization_id) badRequest("organization_id is required");
    if (!user_id) badRequest("user_id is required");
    if (!email) badRequest("email is required");

    const org = await prisma.organization.findUnique({
      where: { id: organization_id },
      select: { id: true, owner_user_id: true },
    });

    if (!org) badRequest("organization not found");
    if (org.owner_user_id) badRequest("organization already has an owner");

    const user = await prisma.user.create({
      data: {
        id: user_id,
        organization_id,
        email,
        first_name: typeof body.first_name === "string" ? body.first_name : null,
        last_name: typeof body.last_name === "string" ? body.last_name : null,
      },
    });

    await prisma.userRole.create({
      data: { user_id: user.id, role: "OWNER" },
    });

    await prisma.organization.update({
      where: { id: organization_id },
      data: { owner_user_id: user.id },
    });

    const locations = await prisma.location.findMany({
      where: { organization_id, archived_at: null },
      select: { id: true },
    });

    if (locations.length > 0) {
      await prisma.userLocation.createMany({
        data: locations.map((l) => ({ user_id: user.id, location_id: l.id })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json({ user, locations_added: locations.length }, { status: 201 });
  });
}

