import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const auth = await requireAuth(req);
  return NextResponse.json({
    user_id: auth.userId,
    organization_id: auth.organization_id,
    roles: auth.roles,
    isOwner: auth.isOwner,
    isAdmin: auth.isAdmin,
    isTutor: auth.isTutor,
  });
}
