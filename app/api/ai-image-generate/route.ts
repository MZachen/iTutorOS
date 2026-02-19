import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

type GenerateBody = {
  prompt?: string;
  width?: number;
  height?: number;
  quality?: "low" | "medium" | "high" | "auto";
  background?: "transparent" | "opaque" | "auto";
  moderation?: "low" | "auto";
};

type SupportedSize = "1024x1024" | "1536x1024" | "1024x1536";
type UsageStore = Record<string, Record<string, number>>;
const AI_IMAGE_MONTHLY_CAP = (() => {
  const raw = Number.parseInt(process.env.AI_IMAGE_MONTHLY_CAP ?? "25", 10);
  if (!Number.isFinite(raw) || raw < 1) return 25;
  return raw;
})();
const USAGE_FILE = path.join(process.cwd(), ".cache", "ai-image-usage.json");

function readText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function readInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function pickSupportedSize(width: number, height: number): SupportedSize {
  const candidates: Array<{ size: SupportedSize; w: number; h: number }> = [
    { size: "1024x1024", w: 1024, h: 1024 },
    { size: "1536x1024", w: 1536, h: 1024 },
    { size: "1024x1536", w: 1024, h: 1536 },
  ];
  const ratio = width / Math.max(1, height);
  let best = candidates[0];
  let bestScore = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    const candidateRatio = candidate.w / candidate.h;
    const ratioDiff = Math.abs(candidateRatio - ratio);
    const areaDiff = Math.abs(candidate.w * candidate.h - width * height);
    const score = ratioDiff * 10000 + areaDiff;
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return best.size;
}

function monthKey(date = new Date()) {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}`;
}

function nextMonthIsoDate(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const next = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0, 0));
  return next.toISOString();
}

async function readUsageStore(): Promise<UsageStore> {
  try {
    const raw = await fs.readFile(USAGE_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as UsageStore;
  } catch {
    return {};
  }
}

async function writeUsageStore(store: UsageStore) {
  const dir = path.dirname(USAGE_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(USAGE_FILE, JSON.stringify(store), "utf8");
}

export async function GET(req: Request) {
  let auth:
    | {
        userId: string;
        organization_id: string;
      }
    | undefined;
  try {
    auth = await requireAuth(req);
  } catch (error) {
    const message =
      error instanceof Error && error.message ? error.message : "Unauthorized.";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  const orgId = auth.organization_id;
  const currentMonth = monthKey();
  const usageStore = await readUsageStore();
  const orgUsage = usageStore[orgId] ?? {};
  const used = orgUsage[currentMonth] ?? 0;
  return NextResponse.json({
    used,
    cap: AI_IMAGE_MONTHLY_CAP,
    remaining: Math.max(0, AI_IMAGE_MONTHLY_CAP - used),
    reset_on: nextMonthIsoDate(),
  });
}

export async function POST(req: Request) {
  let auth:
    | {
        userId: string;
        organization_id: string;
      }
    | undefined;
  try {
    auth = await requireAuth(req);
  } catch (error) {
    const message =
      error instanceof Error && error.message ? error.message : "Unauthorized.";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  let body: GenerateBody;
  try {
    body = (await req.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = readText(body.prompt);
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required." }, { status: 400 });
  }

  const openAiKey = readText(process.env.OPENAI_API_KEY);
  if (!openAiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  const width = readInt(body.width, 1080, 256, 4096);
  const height = readInt(body.height, 1080, 256, 4096);
  const size = pickSupportedSize(width, height);
  const model = readText(process.env.OPENAI_IMAGE_MODEL, "gpt-image-1");
  const baseUrl = readText(
    process.env.OPENAI_API_BASE_URL,
    "https://api.openai.com/v1",
  ).replace(/\/+$/, "");

  const orgId = auth.organization_id;
  const currentMonth = monthKey();
  const usageStore = await readUsageStore();
  const orgUsage = usageStore[orgId] ?? {};
  const used = orgUsage[currentMonth] ?? 0;
  if (used >= AI_IMAGE_MONTHLY_CAP) {
    return NextResponse.json(
      {
        error: `Monthly AI post generation cap reached (${AI_IMAGE_MONTHLY_CAP}).`,
        code: "AI_IMAGE_CAP_REACHED",
        used,
        cap: AI_IMAGE_MONTHLY_CAP,
        reset_on: nextMonthIsoDate(),
      },
      { status: 429 },
    );
  }

  const response = await fetch(`${baseUrl}/images/generations`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality: body.quality ?? "high",
      background: body.background ?? "auto",
      moderation: body.moderation ?? "auto",
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    data?: Array<{ b64_json?: string; url?: string }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    return NextResponse.json(
      { error: payload?.error?.message || "Image generation failed." },
      { status: response.status || 500 },
    );
  }

  const first = payload?.data?.[0];
  if (!first) {
    return NextResponse.json(
      { error: "Image generation returned no output." },
      { status: 502 },
    );
  }

  if (first.b64_json) {
    const nextStore = {
      ...usageStore,
      [orgId]: {
        ...orgUsage,
        [currentMonth]: used + 1,
      },
    };
    await writeUsageStore(nextStore);
    return NextResponse.json({
      image_data_url: `data:image/png;base64,${first.b64_json}`,
      size,
      used: used + 1,
      cap: AI_IMAGE_MONTHLY_CAP,
      reset_on: nextMonthIsoDate(),
    });
  }

  if (first.url) {
    const imageRes = await fetch(first.url);
    if (!imageRes.ok) {
      return NextResponse.json(
        { error: "Generated image URL fetch failed." },
        { status: 502 },
      );
    }
    const contentType = imageRes.headers.get("content-type") || "image/png";
    const buf = Buffer.from(await imageRes.arrayBuffer());
    const nextStore = {
      ...usageStore,
      [orgId]: {
        ...orgUsage,
        [currentMonth]: used + 1,
      },
    };
    await writeUsageStore(nextStore);
    return NextResponse.json({
      image_data_url: `data:${contentType};base64,${buf.toString("base64")}`,
      size,
      used: used + 1,
      cap: AI_IMAGE_MONTHLY_CAP,
      reset_on: nextMonthIsoDate(),
    });
  }

  return NextResponse.json(
    { error: "Image generation returned unknown output format." },
    { status: 502 },
  );
}
