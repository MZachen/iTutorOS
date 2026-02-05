import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { badRequest, conflict, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireLocationInOrg, requireNotTutor } from "@/lib/auth";

export const runtime = "nodejs";

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

    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    const room_name = typeof body.room_name === "string" ? body.room_name : null;

    if (!location_id) badRequest("location_id required");
    if (!room_name) badRequest("room_name required");

    await requireLocationInOrg(location_id, auth.organization_id);

    const room = await prisma.room.create({
      data: {
        location_id,
        room_name,
        room_number: typeof body.room_number === "string" ? body.room_number : null,
        floor_number: typeof body.floor_number === "string" ? body.floor_number : null,
      },
    });

    return NextResponse.json(room, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const locationId = new URL(req.url).searchParams.get("location_id");
    if (!locationId) badRequest("location_id required");

    await requireLocationInOrg(locationId, auth.organization_id);

    const rooms = await prisma.room.findMany({
      where: { location_id: locationId },
      orderBy: { room_name: "asc" },
    });

    return NextResponse.json(rooms);
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

    const room_id = typeof body.room_id === "string" ? body.room_id : null;
    if (!room_id) badRequest("room_id required");

    const room = await prisma.room.findUnique({
      where: { id: room_id },
      select: { id: true, location_id: true },
    });
    if (!room) notFound("room_id not found");

    await requireLocationInOrg(room.location_id, auth.organization_id);

    const data: Record<string, any> = {};
    if (typeof body.room_name === "string") data.room_name = body.room_name.trim();

    const normalize = (val: any) => (typeof val === "string" ? val.trim() || null : val === null ? null : undefined);
    const roomNumber = normalize(body.room_number);
    if (roomNumber !== undefined) data.room_number = roomNumber;
    const floorNumber = normalize(body.floor_number);
    if (floorNumber !== undefined) data.floor_number = floorNumber;

    if (Object.keys(data).length === 0) badRequest("No fields to update");

    const updated = await prisma.room.update({
      where: { id: room_id },
      data,
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

    const room_id = typeof body.room_id === "string" ? body.room_id : null;
    if (!room_id) badRequest("room_id required");

    const room = await prisma.room.findUnique({
      where: { id: room_id },
      select: { id: true, location_id: true },
    });
    if (!room) notFound("room_id not found");

    await requireLocationInOrg(room.location_id, auth.organization_id);

    try {
      const deleted = await prisma.room.delete({ where: { id: room_id } });
      return NextResponse.json({ id: deleted.id });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
        conflict({ message: "Room is in use and cannot be removed. Remove it from schedules first." });
      }
      throw err;
    }
  });
}
