import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const { id } = await params;
    if (!id) badRequest("id is required");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const updated = await scheduleEntryService.restoreException(id, body);
    return NextResponse.json(updated);
  });
}
