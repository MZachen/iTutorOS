import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export function getStripeClient() {
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey);
}
