import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { badRequest, conflict, forbidden, handleRoute } from "@/lib/api";
import { requireAuth, requireLocationInOrg, requireNotTutor, requireOrgMatch } from "@/lib/auth";

export const runtime = "nodejs";

const SYSTEM_LOCATIONS = [
  { name: "Virtual / Web Meeting", is_virtual: true },
  { name: "Offsite / Homebound", is_virtual: false },
];

const HAS_IS_SYSTEM = "is_system" in Prisma.LocationScalarFieldEnum;

async function ensureSystemLocations(organization_id: string) {
  if (!HAS_IS_SYSTEM) return;
  const existing = await prisma.location.findMany({
    where: { organization_id, is_system: true, archived_at: null },
    select: { id: true, location_name: true },
  });
  const existingNames = new Set(existing.map((loc) => loc.location_name));
  const missing = SYSTEM_LOCATIONS.filter((loc) => !existingNames.has(loc.name));
  if (!missing.length) return;

  await prisma.$transaction(async (tx) => {
    const createdIds: string[] = [];
    for (const item of missing) {
      const created = await tx.location.create({
        data: {
          organization_id,
          location_name: item.name,
          is_virtual: item.is_virtual,
          is_system: true,
        },
        select: { id: true },
      });
      createdIds.push(created.id);
    }

    if (!createdIds.length) return;

    const owners = await tx.userRole.findMany({
      where: { role: "OWNER", user: { organization_id } },
      select: { user_id: true },
    });
    if (owners.length) {
      await tx.userLocation.createMany({
        data: owners.flatMap((o) => createdIds.map((location_id) => ({ user_id: o.user_id, location_id }))),
        skipDuplicates: true,
      });
    }

    const tutors = await tx.tutor.findMany({
      where: { organization_id, archived_at: null },
      select: { id: true },
    });
    if (tutors.length) {
      await tx.tutorLocation.createMany({
        data: tutors.flatMap((t) => createdIds.map((location_id) => ({ tutor_id: t.id, location_id }))),
        skipDuplicates: true,
      });
    }
  });
}

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

    let plan = "basic";
    try {
      const org = await prisma.organization.findUnique({
        where: { id: organization_id },
        select: { subscription_plan: true },
      });
      plan = org?.subscription_plan ?? "basic";
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2022")) throw err;
    }
    const planLabel =
      plan === "enterprise" ? "Enterprise" : plan === "pro" ? "Pro" : plan === "basic-plus" ? "Basic+" : "Basic";
    const limit = plan === "enterprise" ? null : 1;
    if (limit !== null) {
      const where: Record<string, any> = { organization_id, archived_at: null };
      if (HAS_IS_SYSTEM) where.is_system = false;
      const currentCount = await prisma.location.count({ where });
      if (currentCount >= limit) {
        forbidden(`Your ${planLabel} plan allows up to ${limit} location${limit === 1 ? "" : "s"}.`);
      }
    }

    const location = await prisma.$transaction(async (tx) => {
      const created = await tx.location.create({
        data: {
          organization_id,
          location_name,
          is_virtual: Boolean(body.is_virtual ?? false),
          location_address_1: typeof body.location_address_1 === "string" ? body.location_address_1 : null,
          location_address_2: typeof body.location_address_2 === "string" ? body.location_address_2 : null,
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
    const archivedParam = new URL(req.url).searchParams.get("archived");
    requireOrgMatch(organizationIdParam, auth.organization_id);
    const organizationId = auth.organization_id;

    await ensureSystemLocations(organizationId);

    const locations = await prisma.location.findMany({
      where: {
        organization_id: organizationId,
        ...(archivedParam === "all" ? {} : { archived_at: null }),
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(locations);
  });
}

export async function PATCH(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    if (!location_id) badRequest("location_id is required");

    await requireLocationInOrg(location_id, auth.organization_id);
    const select: Record<string, boolean> = { is_virtual: true };
    if (HAS_IS_SYSTEM) select.is_system = true;
    const existing = await prisma.location.findUnique({ where: { id: location_id }, select });
    if (HAS_IS_SYSTEM && existing?.is_system && typeof body.archived === "boolean" && body.archived) {
      forbidden("System locations cannot be archived");
    }

    const data: Record<string, any> = {};
    if (typeof body.location_name === "string") data.location_name = body.location_name.trim();
    if (typeof body.is_virtual === "boolean") data.is_virtual = body.is_virtual;
    if (typeof body.archived === "boolean") data.archived_at = body.archived ? new Date() : null;

    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : val === null ? null : undefined);
    const address1 = normalize(body.location_address_1);
    if (address1 !== undefined) data.location_address_1 = address1;
    const address2 = normalize(body.location_address_2);
    if (address2 !== undefined) data.location_address_2 = address2;
    const city = normalize(body.location_city);
    if (city !== undefined) data.location_city = city;
    const state = normalize(body.location_state);
    if (state !== undefined) data.location_state = state;
    const zip = normalize(body.location_zip);
    if (zip !== undefined) data.location_zip = zip;

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.$transaction(async (tx) => {
      const updatedLoc = await tx.location.update({
        where: { id: location_id },
        data,
      });

      if (updatedLoc.is_virtual) {
        const archived_at = new Date();
        await tx.room.updateMany({
          where: { location_id, archived_at: null },
          data: { archived_at },
        });
        await tx.scheduleEntryRoom.deleteMany({
          where: { room: { location_id } },
        });
      }

      return updatedLoc;
    });

    return NextResponse.json(updated);
  });
}

export async function DELETE(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    if (!location_id) badRequest("location_id is required");

    await requireLocationInOrg(location_id, auth.organization_id);
    if (HAS_IS_SYSTEM) {
      const existing = await prisma.location.findUnique({
        where: { id: location_id },
        select: { is_system: true },
      });
      if (existing?.is_system) {
        forbidden("System locations cannot be archived");
      }
    }

    const updated = await prisma.location.update({
      where: { id: location_id },
      data: { archived_at: new Date() },
    });
    return NextResponse.json({ id: updated.id, archived_at: updated.archived_at });
  });
}
