import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getWebsiteConfigForOrg,
  saveWebsiteConfigForOrg,
} from "@/lib/website-config-store";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth(req);
    const config = await getWebsiteConfigForOrg(auth.organization_id);
    return NextResponse.json({ config });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unauthorized.";
    return NextResponse.json({ message }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await requireAuth(req);
    const body = (await req.json()) as { config?: unknown };
    const config = await saveWebsiteConfigForOrg(
      auth.organization_id,
      body?.config ?? {},
    );
    return NextResponse.json({ config });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unable to save website config.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
