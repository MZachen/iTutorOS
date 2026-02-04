"use client";

import { useMemo, useState, type FormEvent, type CSSProperties } from "react";
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

  const inputStyle: CSSProperties = {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    background: "#eef2ff",
    outline: "none",
  };

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
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: 24,
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        backgroundImage: "url(/pencilBG.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <a
        href="/"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "#111",
        }}
      >
        <img src="/logo1.png" alt="iTutorOS" width={32} height={32} style={{ display: "block" }} />
        <span style={{ fontWeight: 600 }}>iTutorOS</span>
      </a>

      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.96)",
          border: "1px solid #e6e6e6",
          boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
          padding: 24,
        }}
      >
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
              style={inputStyle}
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
              style={inputStyle}
              autoComplete="current-password"
            />
          </label>

          <button
            disabled={busy}
            type="submit"
            style={{
              padding: 10,
              border: "1px solid #cbd5e1",
              background: "#f3f4f6",
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        {status ? <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p> : null}

        <p style={{ marginTop: 16 }}>
          Need an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </main>
  );
}
