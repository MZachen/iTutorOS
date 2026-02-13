import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { decryptJson, encryptJson } from "@/lib/email-crypto";
import { getConnectionProvider, requiredConnectionFields, type ConnectionProviderId } from "@/lib/connections";
import type { IntegrationProvider, Prisma } from "@prisma/client";

export const runtime = "nodejs";

function toProviderId(value: string): ConnectionProviderId {
  const provider = getConnectionProvider(value);
  if (!provider) badRequest("Unknown provider");
  return provider.id;
}

function toDbProvider(providerId: ConnectionProviderId): IntegrationProvider {
  return providerId.toUpperCase() as IntegrationProvider;
}

function decryptCredentials(raw: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    const data = decryptJson<Record<string, string>>(raw);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ provider: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { provider: providerParam } = await params;
    const providerId = toProviderId(providerParam);
    const providerConfig = getConnectionProvider(providerId);
    if (!providerConfig) badRequest("Unknown provider");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const fieldsInput =
      body?.fields && typeof body.fields === "object" && !Array.isArray(body.fields) ? (body.fields as Record<string, unknown>) : {};
    const clearFields = Array.isArray(body?.clear_fields)
      ? body.clear_fields.filter((value: unknown): value is string => typeof value === "string")
      : [];

    const dbProvider = toDbProvider(providerId);
    const existing = await prisma.integrationConnection.findUnique({
      where: { organization_id_provider: { organization_id: auth.organization_id, provider: dbProvider } },
    });

    const existingFields = decryptCredentials(existing?.credentials_encrypted ?? null);
    const merged: Record<string, string> = { ...existingFields };

    Object.entries(fieldsInput).forEach(([key, value]) => {
      if (typeof value !== "string") return;
      const trimmed = value.trim();
      if (!trimmed) return;
      merged[key] = trimmed;
    });

    clearFields.forEach((key: string) => {
      delete merged[key];
    });

    const required = requiredConnectionFields(providerConfig);
    const missing = required.filter((key) => !merged[key] || !String(merged[key]).trim());
    if (missing.length > 0) {
      badRequest(`Missing required fields: ${missing.join(", ")}`);
    }

    const connected = required.length === 0 ? Boolean(Object.keys(merged).length) : required.every((key) => merged[key]?.trim());
    const now = new Date();

    const data: Prisma.IntegrationConnectionUncheckedCreateInput = {
      organization_id: auth.organization_id,
      provider: dbProvider,
      credentials_encrypted: encryptJson(merged),
      connected_at: connected ? now : null,
      created_by_user_id: auth.userId,
      updated_by_user_id: auth.userId,
    };

    const updated = await prisma.integrationConnection.upsert({
      where: { organization_id_provider: { organization_id: auth.organization_id, provider: dbProvider } },
      create: data,
      update: {
        credentials_encrypted: data.credentials_encrypted,
        connected_at: data.connected_at,
        updated_by_user_id: auth.userId,
      },
    });

    return NextResponse.json({
      provider: providerId,
      fields: Object.fromEntries(
        providerConfig.fields.map((field) => [
          field.key,
          { has_value: Boolean(merged[field.key]?.trim()), value: field.type === "password" ? "" : merged[field.key] ?? "" },
        ]),
      ),
      connected,
      connected_at: updated.connected_at?.toISOString() ?? null,
      updated_at: updated.updated_at?.toISOString() ?? null,
    });
  });
}
