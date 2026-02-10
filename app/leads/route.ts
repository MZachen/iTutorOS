import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg, requireOrgMatch } from "@/lib/auth";

export const runtime = "nodejs";

function normalizeLeadStudents(input: any): Record<string, any>[] | null {
  if (input == null) return null;
  if (!Array.isArray(input)) badRequest("lead_students must be an array");
  return input
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const student: Record<string, any> = {};
      if (typeof item.first_name === "string") student.first_name = item.first_name.trim();
      if (typeof item.last_name === "string") student.last_name = item.last_name.trim();
      if (typeof item.email === "string") student.email = item.email.trim();
      if (typeof item.phone === "string") student.phone = item.phone.trim();
      if (typeof item.school === "string") student.school = item.school.trim();
      if (typeof item.dob === "string" || item.dob === null) student.dob = item.dob;
      if (typeof item.iep === "boolean") student.iep = item.iep;
      if (typeof item.allergies === "boolean") student.allergies = item.allergies;
      if (typeof item.medical_condition === "boolean") student.medical_condition = item.medical_condition;
      if (typeof item.behaviorial_issue === "boolean") student.behaviorial_issue = item.behaviorial_issue;
      if (typeof item.vision_issue === "boolean") student.vision_issue = item.vision_issue;
      if (typeof item.hearing_issue === "boolean") student.hearing_issue = item.hearing_issue;
      if (typeof item.in_person === "boolean") student.in_person = item.in_person;
      if (typeof item.notes === "string") student.notes = item.notes;
      const hasText = [
        student.first_name,
        student.last_name,
        student.email,
        student.phone,
        student.school,
        student.notes,
        typeof student.dob === "string" ? student.dob : null,
      ].some((value) => typeof value === "string" && value.trim().length > 0);
      const hasFlags =
        student.iep ||
        student.allergies ||
        student.medical_condition ||
        student.behaviorial_issue ||
        student.vision_issue ||
        student.hearing_issue ||
        student.in_person === false;
      if (!hasText && !hasFlags) return null;
      return student;
    })
    .filter((item): item is Record<string, any> => Boolean(item));
}

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

    if (typeof body.lead_location_id === "string") {
      await requireLocationInOrg(body.lead_location_id, organization_id);
    }

    const leadStudents = normalizeLeadStudents(body.lead_students);
    const leadStudentsValue = leadStudents && leadStudents.length > 0 ? leadStudents : undefined;

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
        source_detail: typeof body.source_detail === "string" ? body.source_detail : null,
        lead_students: leadStudentsValue,
        archived_at: typeof body.archived === "boolean" ? (body.archived ? new Date() : null) : undefined,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const organizationIdParam = new URL(req.url).searchParams.get("organization_id");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const archivedParam = new URL(req.url).searchParams.get("archived");
    const organizationId = auth.organization_id;

    const leads = await prisma.lead.findMany({
      where: {
        organization_id: organizationId,
        ...(archivedParam === "all"
          ? {}
          : archivedParam === "only"
            ? { archived_at: { not: null } }
            : { archived_at: null }),
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(leads);
  });
}
