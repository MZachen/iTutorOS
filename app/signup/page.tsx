"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
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
        setTimeout(() => router.replace(`/login?reason=exists&email=${encoded}`), 1200);
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
      <MarketingHeader showSocial={false} />

      <main
        className="grid flex-1 place-items-center p-6"
        style={{
          position: "relative",
          fontFamily: "inherit",
          backgroundImage: "url(/pencilBG.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >

        <Card className="w-full max-w-[520px]">
          <CardContent className="p-6">
            <h1 className="m-0 text-5xl font-extrabold">Sign up</h1>
            <p className="mt-2">Create an account. You&apos;ll receive a confirmation email.</p>

            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email (This will be your main organization email after sign up)</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-indigo-50"
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
                  className="bg-indigo-50"
                  autoComplete="new-password"
                />
              </div>

              <Button disabled={busy} type="submit" className="mt-2 w-full">
                {busy ? "Creating..." : "Create account"}
              </Button>
            </form>

            {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

            <p className="mt-4 text-sm">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </CardContent>
        </Card>
      </main>

      <MarketingFooter />
  </div>
  );
}
