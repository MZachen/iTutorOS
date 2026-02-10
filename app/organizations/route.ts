import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const business_name = typeof body.business_name === "string" ? body.business_name.trim() : null;
    const timezone = typeof body.timezone === "string" ? body.timezone.trim() : null;
    const default_buffer_minutes = Number.isInteger(body.default_buffer_minutes) ? body.default_buffer_minutes : null;
    const subscription_plan = typeof body.subscription_plan === "string" ? body.subscription_plan.trim() : "basic";

    const business_phone = typeof body.business_phone === "string" ? body.business_phone.trim() : null;
    const business_address_1 = typeof body.business_address_1 === "string" ? body.business_address_1.trim() : null;
    const business_address_2 =
      typeof body.business_address_2 === "string" ? body.business_address_2.trim() || null : null;
    const business_city = typeof body.business_city === "string" ? body.business_city.trim() : null;
    const business_state = typeof body.business_state === "string" ? body.business_state.trim() : null;
    const business_zip = typeof body.business_zip === "string" ? body.business_zip.trim() : null;

    if (!business_name) badRequest("business_name is required");
    if (!timezone) badRequest("timezone is required");
    if (default_buffer_minutes == null) badRequest("default_buffer_minutes is required");
    if (default_buffer_minutes < 0) badRequest("default_buffer_minutes must be >= 0");
    if (!["basic", "basic-plus", "pro", "enterprise"].includes(subscription_plan)) {
      badRequest("subscription_plan is invalid");
    }

    if (!business_phone) badRequest("business_phone is required");
    if (!business_address_1) badRequest("business_address_1 is required");
    if (!business_city) badRequest("business_city is required");
    if (!business_state) badRequest("business_state is required");
    if (!business_zip) badRequest("business_zip is required");

    const org = await prisma.organization.create({
      data: {
        business_name,
        timezone,
        default_buffer_minutes,
        subscription_plan,
        business_phone,
        business_address_1,
        business_address_2,
        business_city,
        business_state,
        business_zip,
      },
    });

    return NextResponse.json(org, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    try {
      const org = await prisma.organization.findUnique({
        where: { id: auth.organization_id },
        include: {
          images: {
            where: { image_type: "BUSINESS_LOGO", archived_at: null },
            select: { image_url: true, image_type: true, archived_at: true },
          },
        },
      });
      return NextResponse.json(org ? [org] : []);
    } catch (err) {
      // If the DB is behind migrations (common in dev), fall back to a safe column set.
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2022") {
        const org = await prisma.organization.findUnique({
          where: { id: auth.organization_id },
          select: {
            id: true,
            business_name: true,
            business_phone: true,
            business_email: true,
            timezone: true,
            default_buffer_minutes: true,
            owner_user_id: true,
            business_address_1: true,
            business_address_2: true,
            business_city: true,
            business_state: true,
            business_zip: true,
            created_at: true,
            updated_at: true,
            archived_at: true,
            created_by_user_id: true,
            updated_by_user_id: true,
          },
        });
        return NextResponse.json(org ? [{ ...org, subscription_plan: "basic" }] : []);
      }
      throw err;
    }
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

    const data: Record<string, any> = {};

    if ("business_name" in body) {
      const business_name = typeof body.business_name === "string" ? body.business_name.trim() : "";
      if (!business_name) badRequest("business_name is required");
      data.business_name = business_name;
    }

    if ("timezone" in body) {
      const timezone = typeof body.timezone === "string" ? body.timezone.trim() : "";
      if (!timezone) badRequest("timezone is required");
      data.timezone = timezone;
    }

    if ("default_buffer_minutes" in body) {
      const default_buffer_minutes = Number.isInteger(body.default_buffer_minutes) ? body.default_buffer_minutes : null;
      if (default_buffer_minutes == null) badRequest("default_buffer_minutes is required");
      if (default_buffer_minutes < 0) badRequest("default_buffer_minutes must be >= 0");
      data.default_buffer_minutes = default_buffer_minutes;
    }

    if ("business_phone" in body) {
      const business_phone = typeof body.business_phone === "string" ? body.business_phone.trim() : "";
      if (!business_phone) badRequest("business_phone is required");
      data.business_phone = business_phone;
    }

    if ("business_email" in body) {
      const business_email = typeof body.business_email === "string" ? body.business_email.trim() || null : null;
      data.business_email = business_email;
    }

    if ("business_address_1" in body) {
      const business_address_1 = typeof body.business_address_1 === "string" ? body.business_address_1.trim() : "";
      if (!business_address_1) badRequest("business_address_1 is required");
      data.business_address_1 = business_address_1;
    }

    if ("business_address_2" in body) {
      const business_address_2 =
        typeof body.business_address_2 === "string" ? body.business_address_2.trim() || null : null;
      data.business_address_2 = business_address_2;
    }

    if ("business_city" in body) {
      const business_city = typeof body.business_city === "string" ? body.business_city.trim() : "";
      if (!business_city) badRequest("business_city is required");
      data.business_city = business_city;
    }

    if ("business_state" in body) {
      const business_state = typeof body.business_state === "string" ? body.business_state.trim() : "";
      if (!business_state) badRequest("business_state is required");
      data.business_state = business_state;
    }

    if ("business_zip" in body) {
      const business_zip = typeof body.business_zip === "string" ? body.business_zip.trim() : "";
      if (!business_zip) badRequest("business_zip is required");
      data.business_zip = business_zip;
    }

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const org = await prisma.organization.update({
      where: { id: auth.organization_id },
      data: {
        ...data,
        updated_by_user_id: auth.userId,
      },
    });

    return NextResponse.json(org);
  });
}
