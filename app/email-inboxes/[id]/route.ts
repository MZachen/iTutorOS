import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, handleRoute, forbidden, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { encryptJson } from "@/lib/email-crypto";
import type { EmailAuthType, EmailProvider } from "@prisma/client";

export const runtime = "nodejs";

function parseProvider(value: any): EmailProvider | null {
  if (value === undefined) return null;
  if (value === "GMAIL" || value === "OUTLOOK" || value === "IMAP") return value;
  badRequest("provider must be GMAIL, OUTLOOK, or IMAP");
}

function parseAuthType(value: any, provider: EmailProvider | null): EmailAuthType | null {
  if (value === undefined) return null;
  if (value === "OAUTH" || value === "IMAP") return value;
  if (provider) return provider === "IMAP" ? "IMAP" : "OAUTH";
  badRequest("auth_type must be OAUTH or IMAP");
}

function sanitizeInbox(inbox: any) {
  const { credentials_encrypted, ...rest } = inbox;
  return { ...rest, has_credentials: Boolean(credentials_encrypted) };
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { id } = await params;
    if (!id) badRequest("id is required");

    let body: any;
    try {
      body = await req.json();
    } catch {
      badRequest("Invalid JSON body");
    }

    const inbox = await prisma.emailInbox.findUnique({ where: { id } });
    if (!inbox) notFound("Email inbox not found");
    if (inbox.organization_id !== auth.organization_id) forbidden("Email inbox does not belong to your organization");

    const provider = parseProvider(body.provider);
    const auth_type = parseAuthType(body.auth_type, provider ?? null);

    const data: Record<string, any> = {};
    if (provider) data.provider = provider;
    if (auth_type) data.auth_type = auth_type;
    if (typeof body.address === "string") data.address = body.address.trim() || inbox.address;
    if (typeof body.label === "string") data.label = body.label.trim() || null;
    if (typeof body.enabled === "boolean") data.enabled = body.enabled;
    if (typeof body.daily_scan_enabled === "boolean") data.daily_scan_enabled = body.daily_scan_enabled;
    if (typeof body.daily_scan_time === "string") data.daily_scan_time = body.daily_scan_time;
    if (typeof body.imap_host === "string") data.imap_host = body.imap_host.trim() || null;
    if (typeof body.imap_port === "number") data.imap_port = body.imap_port;
    if (typeof body.imap_secure === "boolean") data.imap_secure = body.imap_secure;
    if (typeof body.archived === "boolean") data.archived_at = body.archived ? new Date() : null;

    if (body.credentials && typeof body.credentials === "object") {
      data.credentials_encrypted = encryptJson(body.credentials);
    }
    if (body.clear_credentials === true) {
      data.credentials_encrypted = null;
    }

    if (Object.keys(data).length === 0) badRequest("No fields to update");
    data.updated_by_user_id = auth.userId;

    const updated = await prisma.emailInbox.update({ where: { id }, data });
    return NextResponse.json(sanitizeInbox(updated));
  });
}
