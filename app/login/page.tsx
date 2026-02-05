"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function userIsRegistered(accessToken: string): Promise<boolean> {
  const res = await fetch("/organizations", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.ok) return true;
  if (res.status === 403) return false;
  throw new Error(`Unexpected response from /organizations: ${res.status}`);
}

export default function LoginPage() {
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus(error.message);
        return;
      }
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        setStatus("No session returned. Please try again.");
        return;
      }

      const registered = await userIsRegistered(accessToken);
      router.push(registered ? "/dashboard" : "/onboarding");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Login failed");
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
        <BrandLogo />
      </div>

      <Card className="w-full max-w-[520px] bg-white/95">
        <CardContent className="p-6">
          <h1 className="m-0 text-5xl font-extrabold">Log in</h1>
          <p className="mt-2">Log in with your email and password.</p>

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
                autoComplete="current-password"
              />
            </div>

            <Button disabled={busy} type="submit" className="mt-2 w-full">
              {busy ? "Logging in..." : "Log in"}
            </Button>
          </form>

          {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

          <p className="mt-4 text-sm">
            Need an account? <a href="/signup">Sign up</a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
