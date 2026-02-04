"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function AuthCallbackPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [status, setStatus] = useState("Finishing sign-in...");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // If Supabase redirected back with tokens in the URL hash, persist them into a session first.
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
      }

      // Clear URL hash to avoid tokens lingering in the address bar/history.
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;
      if (error) {
        setStatus(error.message);
        return;
      }
      const session = data.session;
      if (!session?.access_token) {
        setStatus("No session found. Try logging in.");
        return;
      }

      try {
        const registered = await userIsRegistered(session.access_token);
        if (!cancelled) router.replace(registered ? "/dashboard" : "/onboarding");
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Auth callback failed");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0 }}>Auth</h1>
      <p style={{ marginTop: 8 }}>{status}</p>
    </main>
  );
}
