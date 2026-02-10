import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, handleRoute, notFound } from "@/lib/api";
import { requireAuth, requireNotTutor } from "@/lib/auth";
import { decryptJson, encryptJson } from "@/lib/email-crypto";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export const runtime = "nodejs";

type ScanCredentials = { username: string; password: string };
type GoogleCredentials = {
  provider?: string;
  access_token?: string;
  refresh_token?: string | null;
  expiry_date?: number | null;
};

function parseDate(value: any): Date | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const dateOnly = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const year = Number.parseInt(dateOnly[1], 10);
    const month = Number.parseInt(dateOnly[2], 10) - 1;
    const day = Number.parseInt(dateOnly[3], 10);
    return new Date(year, month, day);
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function splitName(raw?: string | null, email?: string | null) {
  const cleaned = (raw ?? "").replace(/["']/g, "").trim();
  if (cleaned) {
    const parts = cleaned.split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: null };
    return { first: parts[0], last: parts.slice(1).join(" ") };
  }
  if (email) {
    const local = email.split("@")[0] ?? "";
    const parts = local.replace(/[._-]+/g, " ").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { first: null, last: null };
    if (parts.length === 1) return { first: parts[0], last: null };
    return { first: parts[0], last: parts.slice(1).join(" ") };
  }
  return { first: null, last: null };
}

function buildNotes(subject: string | null, body: string | null, from: string | null) {
  const safeSubject = subject?.trim() || "(no subject)";
  const safeBody = (body ?? "").replace(/\s+/g, " ").trim();
  const snippet = safeBody.length > 320 ? `${safeBody.slice(0, 320)}...` : safeBody;
  const lines = [
    `Email lead from ${from ?? "unknown sender"}`,
    `Subject: ${safeSubject}`,
    snippet ? `Snippet: ${snippet}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

function parseFromHeader(value?: string | null) {
  if (!value) return { name: null as string | null, email: null as string | null };
  const match = value.match(/^(.*)<([^>]+)>$/);
  if (match) {
    const name = match[1].replace(/["']/g, "").trim() || null;
    const email = match[2].trim() || null;
    return { name, email };
  }
  if (value.includes("@")) return { name: null, email: value.trim() };
  return { name: value.trim(), email: null };
}

async function scanImapInbox(params: {
  host: string;
  port: number;
  secure: boolean;
  credentials: ScanCredentials;
  since: Date;
  before: Date;
  limit: number;
}) {
  const client = new ImapFlow({
    host: params.host,
    port: params.port,
    secure: params.secure,
    auth: {
      user: params.credentials.username,
      pass: params.credentials.password,
    },
  });

  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    const uids = await client.search({ since: params.since, before: params.before });
    const list = Array.isArray(uids) ? uids : [];
    const limited = list.slice(-params.limit);
    const messages = [];
    for await (const msg of client.fetch(limited, { envelope: true, source: true })) {
      messages.push(msg);
    }
    return messages;
  } finally {
    lock.release();
    await client.logout().catch(() => null);
  }
}

async function refreshGoogleAccessToken(refreshToken: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) badRequest("Missing GOOGLE_OAUTH_CLIENT_ID/GOOGLE_OAUTH_CLIENT_SECRET");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const json = (await res.json()) as { access_token?: string; expires_in?: number; refresh_token?: string };
  if (!res.ok || !json.access_token) {
    badRequest("Unable to refresh Gmail access token. Please reconnect.");
  }
  return json;
}

async function ensureGoogleAccessToken(
  inboxId: string,
  creds: GoogleCredentials,
  userId: string,
): Promise<{ accessToken: string; refreshToken: string | null; expiry: number | null }> {
  const existingToken = creds.access_token ?? null;
  const refreshToken = creds.refresh_token ?? null;
  const expiry = creds.expiry_date ?? null;
  const isExpired = !expiry || Date.now() > expiry - 60_000;
  if (existingToken && !isExpired) return { accessToken: existingToken, refreshToken, expiry };
  if (!refreshToken) badRequest("Missing Gmail refresh token. Please reconnect.");
  const refreshed = await refreshGoogleAccessToken(refreshToken);
  const accessToken = refreshed.access_token;
  if (!accessToken) badRequest("Unable to refresh Gmail access token. Please reconnect.");
  const expiryDate = refreshed.expires_in ? Date.now() + refreshed.expires_in * 1000 : null;
  const nextCreds: GoogleCredentials = {
    provider: "google",
    access_token: accessToken,
    refresh_token: refreshed.refresh_token ?? refreshToken,
    expiry_date: expiryDate,
  };
  await prisma.emailInbox.update({
    where: { id: inboxId },
    data: {
      credentials_encrypted: encryptJson(nextCreds),
      updated_by_user_id: userId,
    },
  });
  return { accessToken, refreshToken: nextCreds.refresh_token ?? null, expiry: expiryDate };
}

async function fetchGmailMessages(accessToken: string, query: string, limit: number) {
  const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  url.searchParams.set("q", query);
  url.searchParams.set("maxResults", String(limit));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) {
    const detail = await res.text();
    badRequest(`Gmail list failed: ${detail || res.status}`);
  }
  const json = (await res.json()) as { messages?: Array<{ id: string }> };
  return json.messages ?? [];
}

async function fetchGmailMessage(accessToken: string, id: string) {
  const url = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`);
  url.searchParams.set("format", "metadata");
  url.searchParams.append("metadataHeaders", "From");
  url.searchParams.append("metadataHeaders", "Subject");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) {
    const detail = await res.text();
    badRequest(`Gmail message fetch failed: ${detail || res.status}`);
  }
  return (await res.json()) as {
    id: string;
    snippet?: string;
    internalDate?: string;
    payload?: { headers?: Array<{ name: string; value: string }> };
  };
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    requireNotTutor(auth);

    const { id } = await params;
    if (!id) badRequest("id is required");

    let body: any = {};
    try {
      body = await req.json();
    } catch {}

    const inbox = await prisma.emailInbox.findUnique({ where: { id } });
    if (!inbox) notFound("Email inbox not found");
    if (inbox.organization_id !== auth.organization_id) forbidden("Email inbox does not belong to your organization");
    if (inbox.archived_at) badRequest("Email inbox is archived");
    if (!inbox.enabled) badRequest("Email inbox is disabled");

    const stageOnly = body.stage_only === true;
    const start = parseDate(body.start) ?? inbox.last_scan_at ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = parseDate(body.end) ?? new Date();
    const before = new Date(end.getTime());
    before.setDate(before.getDate() + 1);
    const limit = typeof body.limit === "number" && body.limit > 0 ? Math.min(body.limit, 200) : 50;

    let messages: any[] = [];
    let gmailAccessToken: string | null = null;

    if (inbox.auth_type === "OAUTH") {
      if (inbox.provider !== "GMAIL") badRequest("Only Gmail OAuth is supported right now.");
      if (!inbox.credentials_encrypted) badRequest("Missing Gmail credentials. Please connect again.");
      const creds = decryptJson<GoogleCredentials>(inbox.credentials_encrypted);
      const tokenResult = await ensureGoogleAccessToken(inbox.id, creds, auth.userId);
      const accessToken = tokenResult.accessToken;
      gmailAccessToken = accessToken;

      const startStr = `${start.getFullYear()}/${String(start.getMonth() + 1).padStart(2, "0")}/${String(
        start.getDate(),
      ).padStart(2, "0")}`;
      const endStr = `${before.getFullYear()}/${String(before.getMonth() + 1).padStart(2, "0")}/${String(
        before.getDate(),
      ).padStart(2, "0")}`;
      const query = `after:${startStr} before:${endStr}`;
      messages = await fetchGmailMessages(accessToken, query, limit);
    } else {
      if (!inbox.credentials_encrypted) {
        badRequest("Missing IMAP credentials for this inbox.");
      }
      if (!inbox.imap_host || !inbox.imap_port) {
        badRequest("IMAP host and port are required.");
      }
      const credentials = decryptJson<ScanCredentials>(inbox.credentials_encrypted);
      messages = await scanImapInbox({
        host: inbox.imap_host,
        port: inbox.imap_port,
        secure: inbox.imap_secure ?? true,
        credentials,
        since: start,
        before,
        limit,
      });
    }

    const rows: Array<{
      id: string;
      parent_first_name: string | null;
      parent_last_name: string | null;
      parent_email: string | null;
      source: "EMAIL";
      source_detail: string;
      created_at: string;
      notes: string;
    }> = [];
    let created = 0;
    let index = 0;
    for (const msg of messages) {
      let fromName: string | null = null;
      let fromAddress: string | null = null;
      let createdAt = new Date();
      let notes = "";

      if (gmailAccessToken) {
        const detail = await fetchGmailMessage(gmailAccessToken, msg.id);
        const headers = detail.payload?.headers ?? [];
        const fromHeader = headers.find((h) => h.name.toLowerCase() === "from")?.value ?? null;
        const subjectHeader = headers.find((h) => h.name.toLowerCase() === "subject")?.value ?? null;
        const parsedFrom = parseFromHeader(fromHeader);
        fromName = parsedFrom.name;
        fromAddress = parsedFrom.email;
        if (detail.internalDate) createdAt = new Date(Number(detail.internalDate));
        notes = buildNotes(subjectHeader, detail.snippet ?? null, fromAddress);
      } else {
        const envelope = msg.envelope;
        const from = envelope?.from?.[0];
        fromName = from?.name ?? null;
        fromAddress = from?.address ?? null;
        const parsed = msg.source ? await simpleParser(msg.source as Buffer) : null;
        const textBody = parsed?.text ?? parsed?.html ?? null;
        createdAt = envelope?.date ? new Date(envelope.date) : new Date();
        notes = buildNotes(parsed?.subject ?? envelope?.subject ?? null, textBody, fromAddress);
      }

      const { first, last } = splitName(fromName, fromAddress);
      rows.push({
        id: `${inbox.id}-${msg.uid ?? msg.id ?? Date.now()}-${index}`,
        parent_first_name: first,
        parent_last_name: last,
        parent_email: fromAddress,
        source: "EMAIL",
        source_detail: inbox.address,
        created_at: createdAt.toISOString(),
        notes,
      });
      if (!stageOnly) {
        await prisma.lead.create({
          data: {
            organization_id: auth.organization_id,
            owner_user_id: auth.userId,
            parent_first_name: first,
            parent_last_name: last,
            parent_email: fromAddress,
            notes,
            stage: "NEW",
            source: "EMAIL",
            source_detail: inbox.address,
          },
        });
        created += 1;
      }
      index += 1;
    }

    const updated = await prisma.emailInbox.update({
      where: { id },
      data: {
        last_scan_at: new Date(),
        updated_by_user_id: auth.userId,
      },
    });

    return NextResponse.json({
      inbox: {
        id: updated.id,
        last_scan_at: updated.last_scan_at,
      },
      scanned: messages.length,
      created,
      staged: rows.length,
      rows,
    });
  });
}
