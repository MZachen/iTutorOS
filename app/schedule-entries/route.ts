import { NextResponse } from "next/server";
import { badRequest, handleRoute } from "@/lib/api";
import { scheduleEntryService } from "@/lib/schedule-entry";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleRoute(async () => {
    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const created = await scheduleEntryService.create(body);
    return NextResponse.json(created, { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const sp = new URL(req.url).searchParams;
    const location_id = sp.get("location_id");
    if (!location_id) badRequest("location_id is required");

    const series_id = sp.get("series_id");
    const archivedParam = sp.get("archived");
    let archived: "active" | "archived" | "all" = "active";
    if (archivedParam != null) {
      const v = archivedParam.toLowerCase();
      if (v === "true" || v === "1" || v === "archived") archived = "archived";
      else if (v === "all") archived = "all";
      else if (v === "false" || v === "0" || v === "active") archived = "active";
      else badRequest("archived must be one of true,false,all");
    }

    const entries = await scheduleEntryService.listByLocation(location_id, { series_id, archived });
    return NextResponse.json(entries);
  });
}
