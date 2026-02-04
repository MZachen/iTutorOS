import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor, requireOrgMatch } from "@/lib/auth";

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

    const organization_id = auth.organization_id;
    const location_name = typeof body.location_name === "string" ? body.location_name : null;

    if (!location_name) badRequest("location_name is required");

    const location = await prisma.$transaction(async (tx) => {
      const created = await tx.location.create({
        data: {
          organization_id,
          location_name,
          is_virtual: Boolean(body.is_virtual ?? false),
          location_address_1: typeof body.location_address_1 === "string" ? body.location_address_1 : null,
          location_city: typeof body.location_city === "string" ? body.location_city : null,
          location_state: typeof body.location_state === "string" ? body.location_state : null,
          location_zip: typeof body.location_zip === "string" ? body.location_zip : null,
        },
      });

      // Auto-add all OWNER users in this org to the new location
      const owners = await tx.userRole.findMany({
        where: { role: "OWNER", user: { organization_id } },
        select: { user_id: true },
      });

      if (owners.length > 0) {
        await tx.userLocation.createMany({
          data: owners.map((o) => ({ user_id: o.user_id, location_id: created.id })),
          skipDuplicates: true,
        });
      }

      return created;
    });

    return NextResponse.json(location, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const organizationIdParam = new URL(req.url).searchParams.get("organization_id");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const organizationId = auth.organization_id;

    const locations = await prisma.location.findMany({
      where: { organization_id: organizationId },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(locations);
  });
}
