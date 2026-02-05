"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/app/_components/BrandLogo";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AppHeader() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [showSetup, setShowSetup] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.access_token) return;

      const orgRes = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      const orgs = orgRes.ok ? await orgRes.json() : [];
      const org = orgs?.[0];
      const plan = typeof org?.subscription_plan === "string" ? org.subscription_plan : "basic";
      const limit = plan === "enterprise" ? null : 1;

      const locRes = await fetch("/locations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (!locRes.ok) return;
      const locs = await locRes.json();
      if (cancelled) return;
      const count = Array.isArray(locs) ? locs.length : 0;
      const canAdd = limit === null || count < limit;
      setShowSetup(canAdd);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function onLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-[56px] w-full max-w-[1200px] items-center justify-between px-6">
        <BrandLogo href="/dashboard" width={150} />
        <nav className="flex items-center gap-6 text-sm font-semibold">
          {showSetup ? (
            <a href="/setup" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
              Setup
            </a>
          ) : null}
          <a href="/dashboard" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Dashboard
          </a>
          <a href="/settings/organization" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Organization settings
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onLogout();
            }}
            className="text-[#7200dc] transition-colors hover:text-[#00c5dc]"
          >
            Log out
          </a>
        </nav>
      </div>
    </header>
  );
}
