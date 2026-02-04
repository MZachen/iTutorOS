"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function HomePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      router.replace(data.session?.access_token ? "/dashboard" : "/login");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: 0 }}>iTutorOS</h1>
      <p style={{ marginTop: 8 }}>Redirecting...</p>
    </main>
  );
}

