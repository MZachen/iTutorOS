"use client";

import { useMemo, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      if (error) {
        setStatus(error.message);
        return;
      }
      setStatus("Check your email to confirm your signup. After confirming, you’ll be redirected back here.");
      setEmail("");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      className="relative grid min-h-screen place-items-center p-6 font-sans"
      style={{ backgroundImage: "url(/pencilBG.png)", backgroundRepeat: "repeat", backgroundSize: "auto" }}
    >
      <div className="absolute left-4 top-4">
        <BrandLogo href="/" />
      </div>

      <Card className="w-full max-w-[520px] bg-white/95">
        <CardContent className="p-6">
          <h1 className="m-0 text-5xl font-extrabold">Sign up</h1>
          <p className="mt-2">Create an account. You’ll receive a confirmation email.</p>

          <form onSubmit={onSubmit} className="mt-4 grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
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
  );
}
