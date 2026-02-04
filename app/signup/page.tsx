"use client";

import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";

export default function SignupPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
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
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <BrandLogo href="/" />
      </div>

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
        <h1 style={{ margin: 0 }}>Sign up</h1>
        <p style={{ marginTop: 8 }}>Create an account. You’ll receive a confirmation email.</p>

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
              autoComplete="new-password"
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
            {busy ? "Creating..." : "Create account"}
          </button>
        </form>

        {status ? <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p> : null}

        <p style={{ marginTop: 16 }}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </main>
  );
}

