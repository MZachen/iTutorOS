import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { signOAuthState } from "@/lib/oauth-state";

export const runtime = "nodejs";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { id } = await params;
    if (!id) badRequest("id is required");

    const inbox = await prisma.emailInbox.findUnique({ where: { id } });
    if (!inbox) notFound("Email inbox not found");
    if (inbox.organization_id !== auth.organization_id) forbidden("Email inbox does not belong to your organization");
    if (inbox.provider !== "GMAIL") badRequest("Only Gmail inboxes can be connected with Google OAuth.");

    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const redirectUri =
      process.env.GOOGLE_OAUTH_REDIRECT_URI ??
      `${new URL(req.url).origin}/email-inboxes/oauth/google/callback`;
    if (!clientId) badRequest("Missing GOOGLE_OAUTH_CLIENT_ID env var.");

    const state = signOAuthState({
      inboxId: inbox.id,
      orgId: inbox.organization_id,
      userId: auth.userId,
      exp: Date.now() + 10 * 60 * 1000,
    });

    const paramsObj = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "openid",
        "email",
        "profile",
      ].join(" "),
      state,
    });

    const url = `${GOOGLE_AUTH_URL}?${paramsObj.toString()}`;
    return NextResponse.json({ url });
  });
}

