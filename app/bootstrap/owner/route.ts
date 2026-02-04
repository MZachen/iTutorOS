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
    const first_name = typeof body.first_name === "string" ? body.first_name.trim() : null;
    const last_name = typeof body.last_name === "string" ? body.last_name.trim() : null;

    if (!organization_id) badRequest("organization_id is required");
    if (!user_id) badRequest("user_id is required");
    if (!email) badRequest("email is required");
    if (!first_name) badRequest("first_name is required");
    if (!last_name) badRequest("last_name is required");

    const org = await prisma.organization.findUnique({
      where: { id: organization_id },
      select: { id: true, owner_user_id: true },
    });

    if (!org) badRequest("organization not found");
    if (org.owner_user_id) badRequest("organization already has an owner");

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: user_id,
          organization_id,
          email,
          first_name,
          last_name,
        },
      });

      // Assume most subscribers are independent tutors: OWNER also gets a tutor profile by default.
      await tx.userRole.createMany({
        data: [
          { user_id: user.id, role: "OWNER" },
          { user_id: user.id, role: "TUTOR" },
        ],
        skipDuplicates: true,
      });

      const tutor = await tx.tutor.create({
        data: {
          user_id: user.id,
          organization_id,
          is_active: true,
        },
      });

      await tx.organization.update({
        where: { id: organization_id },
        data: { owner_user_id: user.id },
      });

      const locations = await tx.location.findMany({
        where: { organization_id, archived_at: null },
        select: { id: true },
      });

      if (locations.length > 0) {
        await tx.userLocation.createMany({
          data: locations.map((l) => ({ user_id: user.id, location_id: l.id })),
          skipDuplicates: true,
        });

        await tx.tutorLocation.createMany({
          data: locations.map((l) => ({ tutor_id: tutor.id, location_id: l.id })),
          skipDuplicates: true,
        });
      }

      return { user, tutor, locations_added: locations.length };
    });

    return NextResponse.json(result, { status: 201 });
  });
}
