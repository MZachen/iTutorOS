import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAnyRole, requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

type Role = "OWNER" | "ADMIN" | "TUTOR";

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireAnyRole(auth, ["OWNER", "ADMIN"]);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const organization_id = auth.organization_id;
    const user_id = typeof body.user_id === "string" ? body.user_id : null;
    const email = typeof body.email === "string" ? body.email : null;
    const role = typeof body.role === "string" ? (body.role as Role) : null;

    if (!user_id) badRequest("user_id is required");
    if (!email) badRequest("email is required");
    if (!role) badRequest("role is required");

    const location_ids = Array.isArray(body.location_ids) ? body.location_ids : [];
    if (role !== "OWNER" && location_ids.length === 0) {
      badRequest("location_ids required for ADMIN/TUTOR");
    }

    if (location_ids.length) {
      const locations = await prisma.location.findMany({
        where: { id: { in: location_ids }, organization_id },
        select: { id: true },
      });
      if (locations.length !== location_ids.length) {
        badRequest("All location_ids must belong to your organization");
      }
    }

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
      data: { user_id: user.id, role },
    });

    if (role !== "OWNER") {
      await prisma.userLocation.createMany({
        data: location_ids.map((location_id: string) => ({ user_id: user.id, location_id })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json(user, { status: 201 });
  });
}
