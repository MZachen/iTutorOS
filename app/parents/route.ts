import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireOrgMatch } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const organizationIdParam = new URL(req.url).searchParams.get("organization_id");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const archivedParam = new URL(req.url).searchParams.get("archived");

    const parents = await prisma.parent.findMany({
      where: {
        organization_id: auth.organization_id,
        ...(archivedParam === "all" ? {} : { archived_at: null }),
      },
      orderBy: { created_at: "desc" },
      include: {
        students: {
          select: { id: true, first_name: true, last_name: true, archived_at: true, location_id: true },
        },
      },
    });

    return NextResponse.json(parents);
  });
}

export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const parent_id = typeof body.parent_id === "string" ? body.parent_id : null;
    if (!parent_id) badRequest("parent_id is required");

    const existing = await prisma.parent.findUnique({
      where: { id: parent_id },
      select: { id: true, organization_id: true },
    });
    if (!existing) notFound("parent_id not found");
    if (existing.organization_id !== auth.organization_id) badRequest("parent_id not in organization");

    const data: Record<string, any> = {};
    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : val === null ? null : undefined);

    const fields: Array<[string, string]> = [
      ["parent1_first_name", "parent1_first_name"],
      ["parent1_last_name", "parent1_last_name"],
      ["parent1_email", "parent1_email"],
      ["parent1_phone", "parent1_phone"],
      ["parent1_address_1", "parent1_address_1"],
      ["parent1_address_2", "parent1_address_2"],
      ["parent1_city", "parent1_city"],
      ["parent1_state", "parent1_state"],
      ["parent1_zip", "parent1_zip"],
      ["parent2_first_name", "parent2_first_name"],
      ["parent2_last_name", "parent2_last_name"],
      ["parent2_email", "parent2_email"],
      ["parent2_phone", "parent2_phone"],
      ["parent2_address_1", "parent2_address_1"],
      ["parent2_address_2", "parent2_address_2"],
      ["parent2_city", "parent2_city"],
      ["parent2_state", "parent2_state"],
      ["parent2_zip", "parent2_zip"],
      ["notes", "notes"],
    ];
    for (const [key, field] of fields) {
      const value = normalize(body[key]);
      if (value !== undefined) data[field] = value;
    }

    if (typeof body.archived === "boolean") data.archived_at = body.archived ? new Date() : null;

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.parent.update({
      where: { id: parent_id },
      data,
      include: { students: { select: { id: true, first_name: true, last_name: true, archived_at: true, location_id: true } } },
    });
    return NextResponse.json(updated);
  });
}

export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const parent_id = typeof body.parent_id === "string" ? body.parent_id : null;
    if (!parent_id) badRequest("parent_id is required");

    const existing = await prisma.parent.findUnique({
      where: { id: parent_id },
      select: { id: true, organization_id: true },
    });
    if (!existing) notFound("parent_id not found");
    if (existing.organization_id !== auth.organization_id) badRequest("parent_id not in organization");

    const updated = await prisma.parent.update({
      where: { id: parent_id },
      data: { archived_at: new Date() },
    });
    return NextResponse.json({ id: updated.id, archived_at: updated.archived_at });
  });
}
