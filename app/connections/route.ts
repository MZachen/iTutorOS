import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { decryptJson } from "@/lib/email-crypto";
import { getConnectionProvider, requiredConnectionFields, type ConnectionProviderId } from "@/lib/connections";
import type { IntegrationConnection } from "@prisma/client";

export const runtime = "nodejs";

type ConnectionFieldSnapshot = {
  has_value: boolean;
  value?: string;
};

type ConnectionSnapshot = {
  provider: ConnectionProviderId;
  fields: Record<string, ConnectionFieldSnapshot>;
  connected: boolean;
  connected_at: string | null;
  updated_at: string | null;
};

function toProviderId(value: string): ConnectionProviderId {
  const provider = getConnectionProvider(value);
  if (!provider) badRequest("Unknown provider");
  return provider.id;
}

function fromDbProvider(value: string): ConnectionProviderId {
  return toProviderId(value.toLowerCase());
}

function decryptCredentials(connection: IntegrationConnection): Record<string, string> {
  if (!connection.credentials_encrypted) return {};
  try {
    const data = decryptJson<Record<string, string>>(connection.credentials_encrypted);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function sanitizeConnection(connection: IntegrationConnection): ConnectionSnapshot {
  const providerId = fromDbProvider(connection.provider);
  const provider = getConnectionProvider(providerId);
  if (!provider) {
    return {
      provider: providerId,
      fields: {},
      connected: false,
      connected_at: connection.connected_at?.toISOString() ?? null,
      updated_at: connection.updated_at?.toISOString() ?? null,
    };
  }

  const stored = decryptCredentials(connection);
  const fields: Record<string, ConnectionFieldSnapshot> = {};
  provider.fields.forEach((field) => {
    const rawValue = typeof stored[field.key] === "string" ? stored[field.key] : "";
    const hasValue = Boolean(rawValue && rawValue.trim());
    fields[field.key] = {
      has_value: hasValue,
      value: field.type === "password" ? "" : rawValue,
    };
  });

  const required = requiredConnectionFields(provider);
  const connected = required.every((key) => fields[key]?.has_value);

  return {
    provider: providerId,
    fields,
    connected,
    connected_at: connection.connected_at?.toISOString() ?? null,
    updated_at: connection.updated_at?.toISOString() ?? null,
  };
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const connections = await prisma.integrationConnection.findMany({
      where: { organization_id: auth.organization_id },
      orderBy: { updated_at: "desc" },
    });

    return NextResponse.json(connections.map(sanitizeConnection));
  });
}
