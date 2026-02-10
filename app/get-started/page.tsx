"use client";

import { useMemo, useState, type FormEvent } from "react";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function GetStartedPage() {
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
        <div className="mx-auto w-full max-w-[900px]">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-hidden rounded-2xl">
                <img src="/tutor-header-1.jpg" alt="Tutoring session" className="h-auto w-full object-cover" />
              </div>

              <h1 className="mt-6 text-4xl font-extrabold">Get started with iTutorOS</h1>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                iTutorOS is the all-in-one operating system built specifically for tutoring businesses. From scheduling and availability
                to services, pricing, and onboarding, every step is designed to reduce admin work while making families feel taken care of.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                Our AI-powered marketing and sales pipeline helps you stand out, guide leads through the decision process, and convert more
                inquiries into long-term students. You also get a branded website, customizable templates, and step-by-step guidance so you
                can launch confidently without hiring a developer.
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
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
      </main>
      <MarketingFooter />
    </div>
  );
}
