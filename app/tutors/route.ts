import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

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
    const user_id = typeof body.user_id === "string" ? body.user_id : null;
    const email = typeof body.email === "string" ? body.email : null;
    const location_ids = Array.isArray(body.location_ids) ? body.location_ids : [];

    if (!user_id) badRequest("user_id is required");
    if (!email) badRequest("email is required");
    if (location_ids.length === 0) badRequest("location_ids required");

    const locations = await prisma.location.findMany({
      where: { id: { in: location_ids }, organization_id },
      select: { id: true },
    });
    if (locations.length !== location_ids.length) {
      badRequest("All location_ids must belong to your organization");
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({
        where: { id: user_id },
        select: { id: true, organization_id: true, email: true },
      });

      if (existingUser && existingUser.organization_id !== organization_id) {
        badRequest("user_id belongs to a different organization");
      }

      if (existingUser && existingUser.email !== email) {
        badRequest("email does not match existing user_id");
      }

      const user = existingUser
        ? await tx.user.findUniqueOrThrow({ where: { id: user_id } })
        : await tx.user.create({
            data: {
              id: user_id,
              organization_id,
              email,
              first_name: typeof body.first_name === "string" ? body.first_name : null,
              last_name: typeof body.last_name === "string" ? body.last_name : null,
            },
          });

      await tx.userRole.createMany({
        data: [{ user_id: user.id, role: "TUTOR" }],
        skipDuplicates: true,
      });

      await tx.userLocation.createMany({
        data: location_ids.map((location_id: string) => ({ user_id: user.id, location_id })),
        skipDuplicates: true,
      });

      const tutor =
        (await tx.tutor.findUnique({ where: { user_id: user.id } })) ??
        (await tx.tutor.create({
          data: {
            user_id: user.id,
            organization_id,
            is_active: true,
          },
        }));

      // Also create TutorLocation rows (needed for scheduling)
      await tx.tutorLocation.createMany({
        data: location_ids.map((location_id: string) => ({ tutor_id: tutor.id, location_id })),
        skipDuplicates: true,
      });

      return { user, tutor };
    });

    return NextResponse.json(result, { status: 201 });
  });
}
