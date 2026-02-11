import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the iTutorOS Marketing Copilot.
Rewrite the provided text for clarity, warmth, and marketing appeal.
Keep it concise, avoid exaggeration, and return only the rewritten text.`;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  const current = typeof body?.current === "string" ? body.current.trim() : "";
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  const baseUrlRaw =
    process.env.AI_CHAT_BASE_URL ||
    process.env.OPENAI_API_BASE_URL ||
    "https://api.openai.com/v1";
  const baseUrl = baseUrlRaw.replace(/\/+$/, "");
  const isOpenAI = (() => {
    try {
      const host = new URL(baseUrl).host;
      return host.includes("api.openai.com");
    } catch {
      return false;
    }
  })();

  const apiKey = isOpenAI
    ? process.env.AI_CHAT_API_KEY || process.env.OPENAI_API_KEY
    : process.env.AI_CHAT_API_KEY;

  if (isOpenAI && !apiKey) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }

  let model =
    process.env.AI_CHAT_MODEL ||
    process.env.OPENAI_CHAT_MODEL ||
    (isOpenAI ? "gpt-4o-mini" : "");
  if (!model && !isOpenAI) {
    try {
      const modelRes = await fetch(`${baseUrl}/models`, {
        headers: {
          "content-type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
      });
      const modelData = await modelRes.json();
      const firstId = modelData?.data?.[0]?.id;
      if (typeof firstId === "string" && firstId.trim()) {
        model = firstId.trim();
      }
    } catch {
      // ignore model discovery errors
    }
  }
  if (!model) {
    return NextResponse.json(
      { error: "Missing AI_CHAT_MODEL for the configured chat provider." },
      { status: 500 },
    );
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `${prompt}\n\nCurrent text:\n${current || "(empty)"}`,
        },
      ],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "AI request failed." },
      { status: res.status },
    );
  }

  const message = data?.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ message });
}
