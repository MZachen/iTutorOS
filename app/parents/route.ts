import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, conflict, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireOrgMatch } from "@/lib/auth";

export const runtime = "nodejs";

function parsePositiveInt(
  raw: string | null,
  { fallback, min, max }: { fallback: number; min: number; max: number },
) {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const searchParams = new URL(req.url).searchParams;
    const organizationIdParam = searchParams.get("organization_id");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const archivedParam = searchParams.get("archived");
    const shouldPaginate = searchParams.has("page") || searchParams.has("page_size");
    const page = parsePositiveInt(searchParams.get("page"), { fallback: 1, min: 1, max: 100000 });
    const pageSize = parsePositiveInt(searchParams.get("page_size"), {
      fallback: 50,
      min: 1,
      max: 200,
    });
    const where = {
      organization_id: auth.organization_id,
      ...(archivedParam === "all" ? {} : { archived_at: null }),
    };
    const include = {
      students: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          archived_at: true,
          location_id: true,
        },
      },
    } as const;

    if (!shouldPaginate) {
      const parents = await prisma.parent.findMany({
        where,
        orderBy: { created_at: "desc" },
        include,
      });
      return NextResponse.json(parents);
    }

    const total = await prisma.parent.count({ where });
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const normalizedPage = Math.min(page, pageCount);
    const skip = (normalizedPage - 1) * pageSize;
    const parents = await prisma.parent.findMany({
      where,
      orderBy: { created_at: "desc" },
      include,
      skip,
      take: pageSize,
    });

    return NextResponse.json({
      items: parents,
      total,
      page: normalizedPage,
      page_size: pageSize,
      page_count: pageCount,
      has_prev: normalizedPage > 1,
      has_next: normalizedPage < pageCount,
    });
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

    const emailToCheck = typeof data.parent1_email === "string" ? data.parent1_email : null;
    const phoneToCheck = typeof data.parent1_phone === "string" ? data.parent1_phone : null;
    if (emailToCheck || phoneToCheck) {
      const orClauses: any[] = [];
      if (emailToCheck) {
        orClauses.push({ parent1_email: { equals: emailToCheck, mode: "insensitive" } });
      }
      if (phoneToCheck) {
        orClauses.push({ parent1_phone: phoneToCheck });
      }
      const duplicate = await prisma.parent.findFirst({
        where: {
          organization_id: auth.organization_id,
          id: { not: parent_id },
          OR: orClauses,
        },
        select: { id: true },
      });
      if (duplicate) {
        conflict({ message: "Parent with this email or phone already exists." });
      }
    }

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
