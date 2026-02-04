import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const organization_id = auth.organization_id;

    const student = body.student ?? null;
    if (!student?.location_id) badRequest("student.location_id is required");
    await requireLocationInOrg(student.location_id, organization_id);
    if (!student?.first_name || !student?.last_name) {
      badRequest("student.first_name and student.last_name are required");
    }

    const result = await prisma.$transaction(async (tx) => {
      const parent = await tx.parent.create({
        data: {
          organization_id,

          parent1_first_name: typeof body.parent1?.first_name === "string" ? body.parent1.first_name : null,
          parent1_last_name: typeof body.parent1?.last_name === "string" ? body.parent1.last_name : null,
          parent1_phone: typeof body.parent1?.phone === "string" ? body.parent1.phone : null,
          parent1_email: typeof body.parent1?.email === "string" ? body.parent1.email : null,
          parent1_address_1: typeof body.parent1?.address_1 === "string" ? body.parent1.address_1 : null,
          parent1_address_2: typeof body.parent1?.address_2 === "string" ? body.parent1.address_2 : null,
          parent1_city: typeof body.parent1?.city === "string" ? body.parent1.city : null,
          parent1_state: typeof body.parent1?.state === "string" ? body.parent1.state : null,
          parent1_zip: typeof body.parent1?.zip === "string" ? body.parent1.zip : null,

          parent2_first_name: typeof body.parent2?.first_name === "string" ? body.parent2.first_name : null,
          parent2_last_name: typeof body.parent2?.last_name === "string" ? body.parent2.last_name : null,
          parent2_phone: typeof body.parent2?.phone === "string" ? body.parent2.phone : null,
          parent2_email: typeof body.parent2?.email === "string" ? body.parent2.email : null,
          parent2_address_1: typeof body.parent2?.address_1 === "string" ? body.parent2.address_1 : null,
          parent2_address_2: typeof body.parent2?.address_2 === "string" ? body.parent2.address_2 : null,
          parent2_city: typeof body.parent2?.city === "string" ? body.parent2.city : null,
          parent2_state: typeof body.parent2?.state === "string" ? body.parent2.state : null,
          parent2_zip: typeof body.parent2?.zip === "string" ? body.parent2.zip : null,

          notes: typeof body.notes === "string" ? body.notes : null,
        },
      });

      const createdStudent = await tx.student.create({
        data: {
          organization_id,
          parent_id: parent.id,
          location_id: student.location_id,
          first_name: student.first_name,
          last_name: student.last_name,
          in_person: Boolean(student.in_person ?? true),
        },
      });

      return { parent, student: createdStudent };
    });

    return NextResponse.json(result, { status: 201 });
  });
}
