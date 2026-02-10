import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor, requireOrgMatch } from "@/lib/auth";
import { encryptJson } from "@/lib/email-crypto";
import type { EmailAuthType, EmailProvider, Prisma } from "@prisma/client";

export const runtime = "nodejs";

function parseProvider(value: any): EmailProvider {
  if (value === "GMAIL" || value === "OUTLOOK" || value === "IMAP") return value;
  badRequest("provider must be GMAIL, OUTLOOK, or IMAP");
}

function parseAuthType(value: any, provider: EmailProvider): EmailAuthType {
  if (value === "OAUTH" || value === "IMAP") return value;
  return provider === "IMAP" ? "IMAP" : "OAUTH";
}

function sanitizeInbox(inbox: any) {
  const { credentials_encrypted, ...rest } = inbox;
  return { ...rest, has_credentials: Boolean(credentials_encrypted) };
}

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const provider = parseProvider(body.provider);
    const auth_type = parseAuthType(body.auth_type, provider);
    const address = typeof body.address === "string" ? body.address.trim() : "";
    if (!address) badRequest("address is required");

    const data: Prisma.EmailInboxUncheckedCreateInput = {
      organization_id: auth.organization_id,
      provider,
      auth_type,
      address,
      label: typeof body.label === "string" ? body.label.trim() || null : null,
      enabled: typeof body.enabled === "boolean" ? body.enabled : true,
      daily_scan_enabled: typeof body.daily_scan_enabled === "boolean" ? body.daily_scan_enabled : false,
      daily_scan_time: typeof body.daily_scan_time === "string" ? body.daily_scan_time : null,
      imap_host: typeof body.imap_host === "string" ? body.imap_host.trim() || null : null,
      imap_port: typeof body.imap_port === "number" ? body.imap_port : null,
      imap_secure: typeof body.imap_secure === "boolean" ? body.imap_secure : null,
      created_by_user_id: auth.userId,
      updated_by_user_id: auth.userId,
    };

    if (body.credentials && typeof body.credentials === "object") {
      data.credentials_encrypted = encryptJson(body.credentials);
    }

    const created = await prisma.emailInbox.create({ data });
    return NextResponse.json(sanitizeInbox(created), { status: 201 });
  });
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    const organizationIdParam = new URL(req.url).searchParams.get("organization_id");
    const archivedParam = new URL(req.url).searchParams.get("archived");
    requireOrgMatch(organizationIdParam, auth.organization_id);

    const inboxes = await prisma.emailInbox.findMany({
      where: {
        organization_id: auth.organization_id,
        ...(archivedParam === "all"
          ? {}
          : archivedParam === "only"
            ? { archived_at: { not: null } }
            : { archived_at: null }),
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(inboxes.map(sanitizeInbox));
  });
}
