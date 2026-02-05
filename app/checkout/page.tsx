"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BrandLogo from "@/app/_components/BrandLogo";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const PLANS = [
  { id: "basic", name: "Basic", price: "$19.95/month" },
  { id: "basic-plus", name: "Basic+", price: "$29.95/month" },
  { id: "pro", name: "Pro", price: "$49.95/month" },
  { id: "enterprise", name: "Enterprise", price: "$99.95/month" },
];

export default function CheckoutPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const searchParams = useSearchParams();
  const selectedPlanId = searchParams.get("plan") ?? "basic";
  const orgId = searchParams.get("org") ?? undefined;
  const selectedPlan = useMemo(
    () => PLANS.find((plan) => plan.id === selectedPlanId) ?? PLANS[0],
    [selectedPlanId]
  );
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setStatus("Please log in to continue.");
        return;
      }
      setEmail(data.session.user.email ?? null);
    });
  }, [supabase]);

  return (
    <main className="min-h-screen itutoros-soft-gradient p-6" style={{ position: "relative", fontFamily: "inherit" }}>
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 50 }}>
        <BrandLogo href="/" />
      </div>

      <div className="mx-auto w-full max-w-[720px] itutoros-card-2 p-8">
        <h1 className="title-font m-0">Checkout</h1>
        <p className="mt-3 text-base font-bold text-gray-700">Review your plan and complete your subscription.</p>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-lg font-extrabold">{selectedPlan.name}</div>
          <div className="mt-2 text-3xl font-extrabold text-[#7200dc]">{selectedPlan.price}</div>
          <p className="mt-2 text-sm text-gray-600">
            Secure payments will be handled by Stripe. You can update your billing details anytime in Settings.
          </p>
        </div>

        {status ? <p className="mt-4 text-sm text-gray-600">{status}</p> : null}

        <Button
          type="button"
          className="mt-6 w-full"
          disabled={busy}
          onClick={async () => {
            setStatus(null);
            setBusy(true);
            try {
              const res = await fetch("/api/stripe/create-checkout-session", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  plan: selectedPlanId,
                  email,
                  orgId,
                }),
              });
              if (!res.ok) {
                const msg = await res.text();
                setStatus(`Unable to start checkout (${res.status}): ${msg}`);
                return;
              }
              const data = await res.json();
              if (!data.url) {
                setStatus("Checkout session did not return a URL.");
                return;
              }
              window.location.href = data.url as string;
            } catch (err) {
              setStatus(err instanceof Error ? err.message : "Checkout failed");
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Redirecting..." : "Continue to Stripe checkout"}
        </Button>
      </div>
    </main>
  );
}
