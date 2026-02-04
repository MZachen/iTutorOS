"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function DashboardPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [status, setStatus] = useState("Loading...");
  const [orgsJson, setOrgsJson] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }

      const res = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.status === 403) {
        router.replace("/onboarding");
        return;
      }
      if (!res.ok) {
        setStatus(`Failed to load org (${res.status})`);
        return;
      }
      const json = await res.json();
      if (cancelled) return;
      setOrgsJson(JSON.stringify(json, null, 2));
      setStatus("Ready");
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function onLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <p style={{ marginTop: 8 }}>{status}</p>
      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <a href="/">Home</a>
        <a href="/settings/organization">Organization settings</a>
        <a href="/setup">Setup wizard</a>
        <button onClick={onLogout} style={{ padding: "6px 10px" }}>
          Log out
        </button>
      </div>
      {orgsJson ? (
        <pre style={{ marginTop: 16, padding: 12, background: "#0b1020", color: "#e6e6e6", overflow: "auto" }}>
          {orgsJson}
        </pre>
      ) : null}
    </main>
  );
}
