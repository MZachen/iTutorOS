import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptJson, encryptJson } from "@/lib/email-crypto";
import { getConnectionProvider, type ConnectionProviderId } from "@/lib/connections";
import { getOAuthConfig } from "@/lib/connection-oauth";
import { verifyConnectionOAuthState } from "@/lib/connection-oauth-state";
import type { IntegrationProvider } from "@prisma/client";

export const runtime = "nodejs";

type OAuthTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

function buildRedirect(base: string, status: "success" | "error", provider: ConnectionProviderId, message?: string) {
  const url = new URL(base);
  url.searchParams.set("tab", "CONNECTIONS");
  url.searchParams.set("oauth", status);
  url.searchParams.set("provider", provider);
  url.searchParams.set("kind", "connections");
  if (message) url.searchParams.set("message", message);
  return url.toString();
}

export async function GET(req: NextRequest) {
  const base = `${new URL(req.url).origin}/settings`;
  const search = new URL(req.url).searchParams;
  const error = search.get("error");
  const state = search.get("state");
  if (error && state) {
    const payload = verifyConnectionOAuthState(state);
    const provider = payload?.provider ?? "facebook";
    return NextResponse.redirect(buildRedirect(base, "error", provider, error));
  }

  const code = search.get("code");
  if (!code || !state) {
    return NextResponse.redirect(buildRedirect(base, "error", "facebook", "missing_code"));
  }

  const payload = verifyConnectionOAuthState(state);
  if (!payload) {
    return NextResponse.redirect(buildRedirect(base, "error", "facebook", "invalid_state"));
  }

  const providerId = payload.provider;
  const providerConfig = getConnectionProvider(providerId);
  const oauthConfig = getOAuthConfig(providerId);
  if (!providerConfig || !oauthConfig) {
    return NextResponse.redirect(buildRedirect(base, "error", providerId, "oauth_not_configured"));
  }

  const dbProvider = providerId.toUpperCase() as IntegrationProvider;
  const connection = await prisma.integrationConnection.findUnique({
    where: { organization_id_provider: { organization_id: payload.orgId, provider: dbProvider } },
  });
  if (!connection) {
    return NextResponse.redirect(buildRedirect(base, "error", providerId, "connection_not_found"));
  }

  const stored = connection.credentials_encrypted
    ? decryptJson<Record<string, string | null>>(connection.credentials_encrypted)
    : {};
  const clientId = stored[oauthConfig.clientIdKey];
  const clientSecret = stored[oauthConfig.clientSecretKey];
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(buildRedirect(base, "error", providerId, "missing_client_credentials"));
  }

  const redirectUri = `${new URL(req.url).origin}/connections/oauth/callback`;
  const tokenParams = new URLSearchParams({
    client_id: String(clientId),
    client_secret: String(clientSecret),
    redirect_uri: redirectUri,
    code,
    grant_type: "authorization_code",
    ...oauthConfig.extraTokenParams,
  });

  const tokenRes = await fetch(oauthConfig.tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: tokenParams,
  });

  const tokenJson = (await tokenRes.json()) as OAuthTokenResponse;
  if (!tokenRes.ok || tokenJson.error || !tokenJson.access_token) {
    return NextResponse.redirect(
      buildRedirect(base, "error", providerId, tokenJson.error ?? "token_exchange_failed"),
    );
  }

  const expiresAt = tokenJson.expires_in ? Date.now() + tokenJson.expires_in * 1000 : null;
  const nextCredentials: Record<string, string | null> = {
    ...stored,
    access_token: tokenJson.access_token,
    refresh_token: tokenJson.refresh_token ?? stored["refresh_token"] ?? null,
    token_type: tokenJson.token_type ?? stored["token_type"] ?? null,
    scope: tokenJson.scope ?? stored["scope"] ?? null,
    expires_at: expiresAt ? String(expiresAt) : stored["expires_at"] ?? null,
    obtained_at: String(Date.now()),
  };

  await prisma.integrationConnection.update({
    where: { id: connection.id },
    data: {
      credentials_encrypted: encryptJson(nextCredentials),
      connected_at: new Date(),
      updated_by_user_id: payload.userId ?? connection.updated_by_user_id ?? connection.created_by_user_id ?? null,
    },
  });

  return NextResponse.redirect(buildRedirect(base, "success", providerId));
}
