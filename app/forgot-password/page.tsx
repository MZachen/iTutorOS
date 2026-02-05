"use client";

import { useMemo, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        setStatus(error.message);
        return;
      }
      setStatus(null);
      setSent(true);
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
            <h1 className="m-0 text-5xl font-extrabold">Reset password</h1>
            <p className="mt-2">Enter your email and we&apos;ll send you a reset link.</p>

            {sent ? (
              <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
                Link sent — check your inbox.
              </p>
            ) : (
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

                <Button disabled={busy} type="submit" className="mt-2 w-full">
                  {busy ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            )}

            {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

            <p className="mt-4 text-sm">
              Remembered your password? <a href="/login">Log in</a>
            </p>
          </CardContent>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}
