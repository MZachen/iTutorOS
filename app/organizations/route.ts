import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const business_name = typeof body.business_name === "string" ? body.business_name : null;
    const timezone = typeof body.timezone === "string" ? body.timezone : null;
    const default_buffer_minutes =
      typeof body.default_buffer_minutes === "number" ? body.default_buffer_minutes : null;

    if (!business_name) badRequest("business_name is required");
    if (!timezone) badRequest("timezone is required");
    if (default_buffer_minutes == null) badRequest("default_buffer_minutes is required");

    const org = await prisma.organization.create({
      data: { business_name, timezone, default_buffer_minutes },
    });

    return NextResponse.json(org, { status: 201 });
  });
}

export async function GET() {
  return handleRoute(async () => {
    const orgs = await prisma.organization.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(orgs);
  });
}

