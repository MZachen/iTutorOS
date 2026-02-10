import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, conflict, handleRoute } from "@/lib/api";
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

    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : null);
    const parent1Email = normalize(body.parent1?.email);
    const parent1Phone = normalize(body.parent1?.phone);
    const parent2Email = normalize(body.parent2?.email);
    const parent2Phone = normalize(body.parent2?.phone);

    const result = await prisma.$transaction(async (tx) => {
      const orClauses: any[] = [];
      if (parent1Email) {
        orClauses.push({ parent1_email: { equals: parent1Email, mode: "insensitive" } });
      }
      if (parent1Phone) {
        orClauses.push({ parent1_phone: parent1Phone });
      }
      if (orClauses.length) {
        const duplicate = await tx.parent.findFirst({
          where: {
            organization_id,
            OR: orClauses,
          },
          select: { id: true, parent1_email: true, parent1_phone: true },
        });
        if (duplicate) {
          conflict({ message: "Parent with this email or phone already exists." });
        }
      }

      const parent = await tx.parent.create({
        data: {
          organization_id,

          parent1_first_name: normalize(body.parent1?.first_name),
          parent1_last_name: normalize(body.parent1?.last_name),
          parent1_phone: parent1Phone,
          parent1_email: parent1Email,
          parent1_address_1: normalize(body.parent1?.address_1),
          parent1_address_2: normalize(body.parent1?.address_2),
          parent1_city: normalize(body.parent1?.city),
          parent1_state: normalize(body.parent1?.state),
          parent1_zip: normalize(body.parent1?.zip),

          parent2_first_name: normalize(body.parent2?.first_name),
          parent2_last_name: normalize(body.parent2?.last_name),
          parent2_phone: parent2Phone,
          parent2_email: parent2Email,
          parent2_address_1: normalize(body.parent2?.address_1),
          parent2_address_2: normalize(body.parent2?.address_2),
          parent2_city: normalize(body.parent2?.city),
          parent2_state: normalize(body.parent2?.state),
          parent2_zip: normalize(body.parent2?.zip),

          notes: normalize(body.notes),
        },
      });

      const rawDob = student?.dob;
      let parsedDob: Date | null | undefined = undefined;
      if (rawDob instanceof Date) {
        parsedDob = rawDob;
      } else if (typeof rawDob === "string" && rawDob.trim()) {
        const date = new Date(rawDob);
        if (Number.isNaN(date.getTime())) badRequest("student.dob is invalid");
        parsedDob = date;
      } else if (rawDob === null) {
        parsedDob = null;
      }

      const createdStudent = await tx.student.create({
        data: {
          organization_id,
          parent_id: parent.id,
          location_id: student.location_id,
          first_name: student.first_name,
          last_name: student.last_name,
          email: normalize(student?.email),
          phone: normalize(student?.phone),
          dob: parsedDob,
          school: normalize(student?.school),
          iep: typeof student?.iep === "boolean" ? student.iep : undefined,
          allergies: typeof student?.allergies === "boolean" ? student.allergies : undefined,
          medical_condition: typeof student?.medical_condition === "boolean" ? student.medical_condition : undefined,
          behaviorial_issue: typeof student?.behaviorial_issue === "boolean" ? student.behaviorial_issue : undefined,
          vision_issue: typeof student?.vision_issue === "boolean" ? student.vision_issue : undefined,
          hearing_issue: typeof student?.hearing_issue === "boolean" ? student.hearing_issue : undefined,
          in_person: typeof student?.in_person === "boolean" ? student.in_person : true,
          notes: normalize(student?.notes),
        },
      });

      return { parent, student: createdStudent };
    });

    return NextResponse.json(result, { status: 201 });
  });
}
