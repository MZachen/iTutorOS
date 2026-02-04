import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor, requireScheduleEntryInOrg } from "@/lib/auth";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(_req);
    requireNotTutor(auth);
    const { id } = await params;
    if (!id) badRequest("id is required");

    await requireScheduleEntryInOrg(id, auth.organization_id);
    const updated = await scheduleEntryService.skipOccurrence(id);
    return NextResponse.json(updated);
  });
}
