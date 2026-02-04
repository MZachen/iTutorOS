"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

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
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 520 }}>
      <h1 style={{ margin: 0 }}>Log in</h1>
      <p style={{ marginTop: 8 }}>Log in with your email and password.</p>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div>Email</div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="email"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Password</div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="current-password"
          />
        </label>

        <button disabled={busy} type="submit" style={{ padding: 10 }}>
          {busy ? "Logging in..." : "Log in"}
        </button>
      </form>

      {status ? (
        <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p>
      ) : null}

      <p style={{ marginTop: 16 }}>
        Need an account? <a href="/signup">Sign up</a>
      </p>
    </main>
  );
}
