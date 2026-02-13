import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { decryptJson } from "@/lib/email-crypto";
import { getConnectionProvider, type ConnectionProviderId } from "@/lib/connections";
import { getOAuthConfig } from "@/lib/connection-oauth";
import { signConnectionOAuthState } from "@/lib/connection-oauth-state";
import type { IntegrationProvider } from "@prisma/client";

export const runtime = "nodejs";

function toProviderId(value: string): ConnectionProviderId {
  const provider = getConnectionProvider(value);
  if (!provider) badRequest("Unknown provider");
  return provider.id;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { provider: providerParam } = await params;
    const providerId = toProviderId(providerParam);
    const providerConfig = getConnectionProvider(providerId);
    if (!providerConfig) badRequest("Unknown provider");

    const oauthConfig = getOAuthConfig(providerId);
    if (!oauthConfig) badRequest("OAuth is not configured for this provider yet.");

    const dbProvider = providerId.toUpperCase() as IntegrationProvider;
    const connection = await prisma.integrationConnection.findUnique({
      where: { organization_id_provider: { organization_id: auth.organization_id, provider: dbProvider } },
    });
    if (!connection) notFound("Connection not found. Save credentials first.");
    if (connection.organization_id !== auth.organization_id) forbidden("Connection does not belong to your organization.");

    const stored = connection.credentials_encrypted ? decryptJson<Record<string, string>>(connection.credentials_encrypted) : {};
    const clientId = stored[oauthConfig.clientIdKey];
    const clientSecret = stored[oauthConfig.clientSecretKey];
    if (!clientId || !clientSecret) {
      badRequest("Missing client credentials for OAuth. Save your App ID/Client ID and secret first.");
    }

    const redirectUri = `${new URL(req.url).origin}/connections/oauth/callback`;
    const state = signConnectionOAuthState({
      provider: providerId,
      orgId: auth.organization_id,
      userId: auth.userId,
      exp: Date.now() + 10 * 60 * 1000,
    });

    const paramsObj = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: oauthConfig.scopes.join(" "),
      state,
      ...oauthConfig.extraAuthParams,
    });

    const url = `${oauthConfig.authUrl}?${paramsObj.toString()}`;
    return NextResponse.json({ url });
  });
}
