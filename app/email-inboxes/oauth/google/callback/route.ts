import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptJson, decryptJson } from "@/lib/email-crypto";
import { verifyOAuthState } from "@/lib/oauth-state";

export const runtime = "nodejs";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

type GoogleTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

function buildRedirect(base: string, status: "success" | "error", message?: string) {
  const url = new URL(base);
  url.searchParams.set("tab", "PIPELINE");
  url.searchParams.set("oauth", status);
  if (message) url.searchParams.set("message", message);
  return url.toString();
}

export async function GET(req: NextRequest) {
  const base = `${new URL(req.url).origin}/settings`;
  const search = new URL(req.url).searchParams;
  const error = search.get("error");
  if (error) {
    return NextResponse.redirect(buildRedirect(base, "error", error));
  }
  const code = search.get("code");
  const state = search.get("state");
  if (!code || !state) {
    return NextResponse.redirect(buildRedirect(base, "error", "missing_code"));
  }

  const payload = verifyOAuthState(state);
  if (!payload) {
    return NextResponse.redirect(buildRedirect(base, "error", "invalid_state"));
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_OAUTH_REDIRECT_URI ?? `${new URL(req.url).origin}/email-inboxes/oauth/google/callback`;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(buildRedirect(base, "error", "missing_oauth_env"));
  }

  const inbox = await prisma.emailInbox.findUnique({ where: { id: payload.inboxId } });
  if (!inbox || inbox.organization_id !== payload.orgId) {
    return NextResponse.redirect(buildRedirect(base, "error", "inbox_not_found"));
  }

  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenJson = (await tokenRes.json()) as GoogleTokenResponse;
  if (!tokenRes.ok || tokenJson.error || !tokenJson.access_token) {
    return NextResponse.redirect(buildRedirect(base, "error", tokenJson.error ?? "token_exchange_failed"));
  }

  let refreshToken = tokenJson.refresh_token ?? null;
  if (!refreshToken && inbox.credentials_encrypted) {
    try {
      const existing = decryptJson<{ refresh_token?: string | null }>(inbox.credentials_encrypted);
      refreshToken = existing.refresh_token ?? null;
    } catch {}
  }

  const expiryDate = tokenJson.expires_in ? Date.now() + tokenJson.expires_in * 1000 : null;
  const credentials = {
    provider: "google",
    access_token: tokenJson.access_token,
    refresh_token: refreshToken,
    expiry_date: expiryDate,
  };

  await prisma.emailInbox.update({
    where: { id: inbox.id },
    data: {
      provider: "GMAIL",
      auth_type: "OAUTH",
      credentials_encrypted: encryptJson(credentials),
      updated_by_user_id: inbox.updated_by_user_id ?? inbox.created_by_user_id ?? null,
    },
  });

  return NextResponse.redirect(buildRedirect(base, "success"));
}

