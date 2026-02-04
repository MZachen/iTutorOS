import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const { id } = await params;
    if (!id) badRequest("id is required");

    const updated = await scheduleEntryService.skipOccurrence(id);
    return NextResponse.json(updated);
  });
}
