"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<string | null>("Preparing your reset link...");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
      const hp = new URLSearchParams(hash);
      const access_token = hp.get("access_token");
      const refresh_token = hp.get("refresh_token");
      const error_description = hp.get("error_description");
      if (error_description) {
        setStatus(decodeURIComponent(error_description));
        return;
      }

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (cancelled) return;
        if (error) {
          setStatus(error.message);
          return;
        }
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        setStatus(null);
        setReady(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setStatus(null);
        setReady(true);
        return;
      }

      setStatus("This reset link is invalid or expired. Please request a new one.");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!password || password.length < 8) {
      setStatus("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setStatus(error.message);
        return;
      }
      setStatus("Password updated. Redirecting to log in...");
      setTimeout(() => router.replace("/login"), 1200);
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
            <h1 className="m-0 text-5xl font-extrabold">Set a new password</h1>
            <p className="mt-2">Choose a new password for your account.</p>

            {!ready ? (
              <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="password">New password</Label>
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

                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="new-password"
                  />
                </div>

                <Button disabled={busy} type="submit" className="mt-2 w-full">
                  {busy ? "Saving..." : "Update password"}
                </Button>
              </form>
            )}

            {ready && status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

            <p className="mt-4 text-sm">
              Need a new link? <a href="/forgot-password">Request a reset</a>
            </p>
          </CardContent>
        </Card>
      </main>

      <MarketingFooter />
    </div>
  );
}
