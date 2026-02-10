import crypto from "crypto";

const KEY_ENV = "EMAIL_CRED_ENCRYPTION_KEY";

function getKey(): Buffer {
  const raw = process.env[KEY_ENV];
  if (!raw) throw new Error(`Missing required env var: ${KEY_ENV}`);
  const key = /^[0-9a-fA-F]{64}$/.test(raw) ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error(`${KEY_ENV} must be 32 bytes (hex or base64)`);
  return key;
}

export function encryptJson(payload: unknown): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const input = Buffer.from(JSON.stringify(payload), "utf8");
  const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decryptJson<T = unknown>(token: string): T {
  const key = getKey();
  const buffer = Buffer.from(token, "base64");
  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const data = buffer.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8")) as T;
}
