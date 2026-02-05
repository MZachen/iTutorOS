import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

const PRICE_MAP: Record<string, string | undefined> = {
  basic: process.env.STRIPE_PRICE_BASIC,
  "basic-plus": process.env.STRIPE_PRICE_BASIC_PLUS,
  pro: process.env.STRIPE_PRICE_PRO,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = typeof body.plan === "string" ? body.plan : "";
    const priceId = PRICE_MAP[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email : undefined;
    const orgId = typeof body.orgId === "string" ? body.orgId : undefined;

    const origin = req.headers.get("origin") ?? new URL(req.url).origin;
    const successUrl = `${origin}/setup?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/checkout?plan=${encodeURIComponent(plan)}${orgId ? `&org=${encodeURIComponent(orgId)}` : ""}`;

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      metadata: {
        plan,
        org_id: orgId ?? "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
