import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PIPELINE_SYSTEM_PROMPT = `You are the iTutorOS Pipeline Copilot. Use the rules below when answering:
- One pipeline per organization. Leads can exist without a location until the family commits.
- Stage defaults to NEW when a lead is created. All other pipeline fields are null until a user sets them.
- Lead stages: New, Contact Attempted, Contacted, Follow-up Attempted, Followed-up, Committed, Scheduled, Assessed, Active, Cold.
- Lead sources: Web, Walk-in, Phone, Email, Social (Facebook/Instagram/TikTok).
- Lead temperature: Hot, Warm, Cold.
- Last contact method: Phone, Email, DM.
- Reason lost: Price, Timing, No response, Went elsewhere, Other.
- When a lead is committed: create parent and student records and schedule services.
- Scheduled means assessment or tutoring is on the calendar. Assessed means an assessment was delivered. Active means tutoring delivered.
Respond with concise, actionable guidance tailored to the question.`;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
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

  const model =
    process.env.AI_CHAT_MODEL ||
    process.env.OPENAI_CHAT_MODEL ||
    (isOpenAI ? "gpt-4o-mini" : "");
  if (!model) {
    return NextResponse.json(
      { error: "Missing AI_CHAT_MODEL for the configured chat provider." },
      { status: 500 },
    );
  }
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const cleaned = messages
    .filter((msg: any) => msg && (msg.role === "user" || msg.role === "assistant") && typeof msg.content === "string")
    .map((msg: any) => ({ role: msg.role, content: msg.content }));

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [{ role: "system", content: PIPELINE_SYSTEM_PROMPT }, ...cleaned],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message || "OpenAI request failed." },
      { status: res.status },
    );
  }

  const message = data?.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ message });
}
