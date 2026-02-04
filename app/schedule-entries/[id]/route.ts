import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireScheduleEntryInOrg } from "@/lib/auth";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(_req);
    const { id } = await params;
    if (!id) badRequest("id is required");

    await requireScheduleEntryInOrg(id, auth.organization_id);
    const entry = await scheduleEntryService.getById(id);
    return NextResponse.json(entry);
  });
}
