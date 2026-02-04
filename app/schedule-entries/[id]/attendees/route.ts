import { NextRequest, NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor, requireScheduleEntryInOrg } from "@/lib/auth";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);
    const { id } = await params;
    if (!id) badRequest("id is required");

    await requireScheduleEntryInOrg(id, auth.organization_id);
    const scope = new URL(req.url).searchParams.get("scope");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const updated = await scheduleEntryService.updateAttendees(id, body, { scope });
    return NextResponse.json(updated);
  });
}
