import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

const DEFAULT_TUTOR_COLOR = "#7c3aed";

function normalizeColor(value?: string | null) {
  if (!value) return DEFAULT_TUTOR_COLOR;
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_TUTOR_COLOR;
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function planTutorLimit(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic") return 1;
  if (key === "basic-plus") return 3;
  if (key === "pro") return 10;
  return null;
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const sp = new URL(req.url).searchParams;
    const location_id = sp.get("location_id");
    const archivedParam = sp.get("archived");
    let archived: "active" | "archived" | "all" = "active";
    if (archivedParam != null) {
      const v = archivedParam.toLowerCase();
      if (v === "true" || v === "1" || v === "archived") archived = "archived";
      else if (v === "all") archived = "all";
      else if (v === "false" || v === "0" || v === "active") archived = "active";
      else badRequest("archived must be one of true,false,all");
    }

    const archivedFilter =
      archived === "archived" ? { archived_at: { not: null } } : archived === "all" ? {} : { archived_at: null };

    const tutors = await prisma.tutor.findMany({
      where: {
        organization_id: auth.organization_id,
        ...archivedFilter,
        ...(location_id
          ? { tutorLocations: { some: { location_id } } }
          : {}),
      },
      orderBy: { created_at: "asc" },
      include: {
        user: { select: { first_name: true, last_name: true, email: true } },
        tutorLocations: true,
      },
    });

    return NextResponse.json(tutors);
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
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
    const first_name = typeof body.first_name === "string" ? body.first_name.trim() : null;
    const last_name = typeof body.last_name === "string" ? body.last_name.trim() : null;
    const color_hex = normalizeColor(body.color_hex);
    const user_id = typeof body.user_id === "string" ? body.user_id : null;

    if (!email) badRequest("email is required");

    const result = await prisma.$transaction(async (tx) => {
      let user = null;
      if (user_id) {
        user = await tx.user.findUnique({ where: { id: user_id } });
        if (!user) badRequest("user_id not found");
        if (user.organization_id !== organization_id) badRequest("user_id does not belong to organization");
      } else {
        user = await tx.user.findFirst({ where: { email } });
        if (user && user.organization_id !== organization_id) badRequest("email belongs to another organization");
        if (!user) {
          user = await tx.user.create({
            data: {
              id: randomUUID(),
              organization_id,
              email,
              first_name,
              last_name,
              is_active: true,
            },
          });
        }
      }

      const existingTutor = await tx.tutor.findFirst({ where: { user_id: user.id } });
      if (existingTutor) {
        return { tutor: existingTutor };
      }

      const org = await tx.organization.findUnique({
        where: { id: organization_id },
        select: { subscription_plan: true },
      });
      const tutorLimit = planTutorLimit(org?.subscription_plan);
      if (tutorLimit !== null) {
        const currentCount = await tx.tutor.count({
          where: { organization_id, archived_at: null },
        });
        if (currentCount >= tutorLimit) {
          forbidden(
            `Your ${org?.subscription_plan ?? "Basic"} plan allows up to ${tutorLimit} tutor${
              tutorLimit === 1 ? "" : "s"
            }.`,
          );
        }
      }

      await tx.userRole.createMany({
        data: [{ user_id: user.id, role: "TUTOR" }],
        skipDuplicates: true,
      });

      const tutor = await tx.tutor.create({
        data: {
          organization_id,
          user_id: user.id,
          is_active: true,
          color_hex,
        },
      });

      let location_ids = Array.isArray(body.location_ids) ? body.location_ids : [];
      if (!location_ids.length) {
        const locations = await tx.location.findMany({
          where: { organization_id, archived_at: null },
          select: { id: true },
        });
        location_ids = locations.map((l) => l.id);
      }

      if (location_ids.length) {
        await tx.userLocation.createMany({
          data: location_ids.map((location_id: string) => ({ user_id: user.id, location_id })),
          skipDuplicates: true,
        });
        await tx.tutorLocation.createMany({
          data: location_ids.map((location_id: string) => ({ tutor_id: tutor.id, location_id })),
          skipDuplicates: true,
        });
      }

      return { tutor };
    });

    const tutor = await prisma.tutor.findUnique({
      where: { id: result.tutor.id },
      include: { user: { select: { first_name: true, last_name: true, email: true } } },
    });

    return NextResponse.json({ tutor }, { status: 201 });
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

    const tutor_id = typeof body.tutor_id === "string" ? body.tutor_id : null;
    if (!tutor_id) badRequest("tutor_id is required");

    const tutor = await prisma.tutor.findUnique({
      where: { id: tutor_id },
      select: { id: true, organization_id: true },
    });
    if (!tutor) badRequest("tutor not found");
    if (tutor.organization_id !== auth.organization_id) badRequest("tutor does not belong to organization");

    const data: Record<string, any> = {};
    if (typeof body.archived === "boolean") {
      data.archived_at = body.archived ? new Date() : null;
      data.is_active = !body.archived;
    }
    if (typeof body.color_hex === "string") {
      data.color_hex = normalizeColor(body.color_hex);
    }

    if (!Object.keys(data).length) badRequest("No fields to update");

    const updated = await prisma.tutor.update({
      where: { id: tutor_id },
      data,
      include: { user: { select: { first_name: true, last_name: true, email: true } } },
    });

    return NextResponse.json(updated);
  });
}
