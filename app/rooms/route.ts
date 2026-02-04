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

    const location_id = typeof body.location_id === "string" ? body.location_id : null;
    const room_name = typeof body.room_name === "string" ? body.room_name : null;

    if (!location_id) badRequest("location_id required");
    if (!room_name) badRequest("room_name required");

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
    const locationId = new URL(req.url).searchParams.get("location_id");
    if (!locationId) badRequest("location_id required");

    const rooms = await prisma.room.findMany({
      where: { location_id: locationId },
      orderBy: { room_name: "asc" },
    });

    return NextResponse.json(rooms);
  });
}

