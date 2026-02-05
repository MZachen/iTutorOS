import { NextResponse } from "next/server";
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
    const org = await prisma.organization.findUnique({
      where: { id: auth.organization_id },
    });
    return NextResponse.json(org ? [org] : []);
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

    const business_name = typeof body.business_name === "string" ? body.business_name.trim() : null;
    const timezone = typeof body.timezone === "string" ? body.timezone.trim() : null;
    const default_buffer_minutes = Number.isInteger(body.default_buffer_minutes) ? body.default_buffer_minutes : null;

    const business_phone = typeof body.business_phone === "string" ? body.business_phone.trim() : null;
    const business_email = typeof body.business_email === "string" ? body.business_email.trim() || null : null;
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

    if (!business_phone) badRequest("business_phone is required");
    if (!business_address_1) badRequest("business_address_1 is required");
    if (!business_city) badRequest("business_city is required");
    if (!business_state) badRequest("business_state is required");
    if (!business_zip) badRequest("business_zip is required");

    const org = await prisma.organization.update({
      where: { id: auth.organization_id },
      data: {
        business_name,
        timezone,
        default_buffer_minutes,
        business_phone,
        business_email,
        business_address_1,
        business_address_2,
        business_city,
        business_state,
        business_zip,
        updated_by_user_id: auth.userId,
      },
    });

    return NextResponse.json(org);
  });
}
