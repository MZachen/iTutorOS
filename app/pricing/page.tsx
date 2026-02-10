"use client";

import { useMemo, useState, type FormEvent } from "react";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "Essentials for getting started.",
    price: "$19.95/month",
    highlights: [
      "One location",
      "Unlimited rooms",
      "Unlimited Subjects and Topics",
      "1 Tutor",
      "Basic Scheduling",
      "10 lead pipeline capacity",
      "Simple 1 page landing page",
      "2 marketing posts per month",
      "Basic support",
    ],
  },
  {
    id: "basic-plus",
    name: "Basic+",
    description: "More tutors and more marketing capacity.",
    price: "$29.95/month",
    highlights: [
      "One location",
      "Unlimited rooms",
      "Unlimited Subjects and Topics",
      "3 Tutors",
      "Advanced Scheduling",
      "25 lead pipeline capacity",
      "Simple 1 page landing page",
      "4 marketing posts per month",
      "Basic support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Full feature set for growing businesses.",
    price: "$49.95/month",
    highlights: [
      "One location",
      "Unlimited rooms",
      "Unlimited Subjects and Topics",
      "10 Tutors",
      "All Scheduling Features Unlocked",
      "100 lead pipeline capacity",
      "Full website",
      "15 marketing posts per month",
      "Full support and consultation",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Built for multi-location organizations.",
    price: "$99.95/month",
    highlights: [
      "Multiple locations",
      "Unlimited rooms",
      "Unlimited Subjects and Topics",
      "Unlimited Tutors",
      "All Scheduling Features Unlocked",
      "Unlimited pipeline capacity",
      "Full website with custom domain",
      "Unlimited marketing posts",
      "Full support and consultation",
    ],
  },
];

export default function PricingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const emailRedirectTo = `${window.location.origin}/auth/callback?plan=${encodeURIComponent(selectedPlan)}`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      if (error) {
        setStatus(error.message);
        return;
      }
      const identities = data?.user?.identities ?? [];
      if (data?.user && identities.length === 0) {
        setStatus("You already have an account. Redirecting you to log in...");
        const encoded = encodeURIComponent(email);
        setTimeout(() => {
          window.location.href = `/login?reason=exists&email=${encoded}`;
        }, 1200);
        return;
      }
      setStatus("Check your email to confirm your signup. After confirming, you'll be redirected back here.");
      setEmail("");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 p-6 itutoros-soft-gradient">
        <div className="mx-auto w-full max-w-[1100px]">
          <h1 className="title-font m-0 text-center">Flexible Pricing Plans</h1>
          <p className="mt-3 text-center text-base font-bold text-gray-700">
            Affordable pricing structured for the growth of your business.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {PRICING_PLANS.map((plan) => {
              const selected = plan.id === selectedPlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className="text-left"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-gray-200 to-gray-600 p-[3px] shadow-lg">
                    <div className={`rounded-2xl ${selected ? "bg-[#e0fde5]" : "bg-white"}`}>
                      <div className="p-6">
                        <div className="text-xl font-extrabold">{plan.name}</div>
                        <div className="mt-2 text-3xl font-extrabold text-[#7200dc]">{plan.price}</div>
                        <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                        <ul className="mt-4 grid gap-2 text-sm text-gray-700">
                          {plan.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full bg-[#7200dc]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-extrabold">Ready to Get Started?</h2>
                <form onSubmit={onSubmit} className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email (This will be your main organization email after sign up)</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-50"
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-zinc-50"
                      autoComplete="new-password"
                    />
                  </div>

                  <Button disabled={busy} type="submit" className="w-full">
                    {busy ? "Creating..." : "Create account"}
                  </Button>
                </form>

                {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
