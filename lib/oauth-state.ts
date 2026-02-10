import crypto from "crypto";

const STATE_SECRET_ENV = "OAUTH_STATE_SECRET";

type OAuthStatePayload = {
  inboxId: string;
  orgId: string;
  userId?: string | null;
  exp: number;
};

function getSecret(): Buffer {
  const raw = process.env[STATE_SECRET_ENV] ?? process.env.EMAIL_CRED_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(`Missing required env var: ${STATE_SECRET_ENV} (or EMAIL_CRED_ENCRYPTION_KEY fallback)`);
  }
  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, "hex");
  try {
    const buf = Buffer.from(raw, "base64");
    if (buf.length >= 16) return buf;
  } catch {}
  return Buffer.from(raw, "utf8");
}

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64urlToBuffer(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
}

export function signOAuthState(payload: OAuthStatePayload) {
  const body = base64url(JSON.stringify(payload));
  const sig = base64url(crypto.createHmac("sha256", getSecret()).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyOAuthState(token: string): OAuthStatePayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = base64url(crypto.createHmac("sha256", getSecret()).update(body).digest());
  const sigBuf = base64urlToBuffer(sig);
  const expBuf = base64urlToBuffer(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  const parsed = JSON.parse(base64urlToBuffer(body).toString("utf8")) as OAuthStatePayload;
  if (!parsed?.inboxId || !parsed?.orgId || !parsed?.exp) return null;
  if (Date.now() > parsed.exp) return null;
  return parsed;
}

