import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email : null;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? new URL(req.url).origin;
    const returnUrl = typeof body.returnUrl === "string" ? body.returnUrl : `${origin}/settings`;

    const stripe = getStripeClient();
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer = existing.data[0] ?? (await stripe.customers.create({ email }));

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe portal failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
