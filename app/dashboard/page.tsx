"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import AppHeader from "@/app/_components/AppHeader";

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

  return (
    <div className="min-h-screen itutoros-soft-gradient">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1200px] p-6">
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <p style={{ marginTop: 8 }}>{status}</p>
        {orgsJson ? (
          <pre style={{ marginTop: 16, padding: 12, background: "#0b1020", color: "#e6e6e6", overflow: "auto" }}>
            {orgsJson}
          </pre>
        ) : null}
      </main>
    </div>
  );
}
