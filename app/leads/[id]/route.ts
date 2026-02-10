import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg } from "@/lib/auth";

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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
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
      "source_detail",
      "lead_students",
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

    if (Object.prototype.hasOwnProperty.call(body, "lead_students")) {
      data.lead_students = normalizeLeadStudents(body.lead_students) ?? [];
    }

    if (typeof body.archived === "boolean") {
      data.archived_at = body.archived ? new Date() : null;
    }

    const existing = await prisma.lead.findUnique({
      where: { id },
      select: { organization_id: true },
    });
    if (!existing) badRequest("lead not found");
    if (existing.organization_id !== auth.organization_id) {
      badRequest("lead does not belong to your organization");
    }

    if (Object.prototype.hasOwnProperty.call(body, "lead_location_id") && typeof body.lead_location_id === "string") {
      await requireLocationInOrg(body.lead_location_id, auth.organization_id);
    }

    const updated = await prisma.lead.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  });
}
