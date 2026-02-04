"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function HomeLinks() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setShowDashboard(Boolean(data.session?.access_token));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowDashboard(Boolean(session?.access_token));
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
      <a href="/signup">Sign up</a>
      <a href="/login">Log in</a>
      {showDashboard ? <a href="/dashboard">Dashboard</a> : null}
    </div>
  );
}

