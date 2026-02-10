"use client";

import { useMemo, useState, type FormEvent } from "react";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilIcon } from "@hugeicons/core-free-icons";

export default function SalesFeaturePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
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
        <div className="mx-auto w-full max-w-[1000px]">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <h1 className="title-font m-0">Sales Pipeline Clarity</h1>
                <p className="mt-3 text-base font-bold">Every lead has a next step, and iTutorOS keeps you on track.</p>
              </div>

              <img src="/sales-header-1.png" alt="Sales overview" className="mt-6 mx-auto w-full rounded-2xl object-cover sm:w-1/2" />

              <p className="mt-6 text-base leading-relaxed text-gray-700">
                Tutors often lose leads because follow-up is inconsistent or hard to track. iTutorOS includes a simple, structured pipeline
                that captures every inquiry, tracks status changes, and keeps the relationship moving forward so you can convert more
                families into long-term students.
              </p>

              <ul className="mt-6 grid gap-3 text-base text-gray-700">
                {[
                  "Lead stages: New, Contact Attempted, Contacted, Follow-up Attempted, Followed-up, Committed, Scheduled, Assessed, Active, Cold.",
                  "Track lead source: Web, Walk-in, Phone, Email, or Social (Facebook/Instagram/TikTok).",
                  "Assign lead owner and location for accountability.",
                  "Log last contact method and date for clean follow-ups.",
                  "Record lead temperature (Hot, Warm, Cold) and aging.",
                  "Capture reasons lost (price, timing, no response, went elsewhere, other).",
                  "Auto-record web form submissions into the pipeline with lead source set.",
                  "Guided workflows for walk-ins, phone calls, emails, and social media inquiries.",
                  "How-to-sell tutorials available so tutors can improve conversion.",
                  "Pipeline ties directly into student registration and scheduling.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#ff9df9]" aria-hidden="true">
                      <HugeiconsIcon icon={PencilIcon} size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
