"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/app/_components/BrandLogo";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AppHeader() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [showSetup, setShowSetup] = useState(true);
  const [isTutor, setIsTutor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

      // Fetch user roles
      const meRes = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (meRes.ok) {
        const me = await meRes.json();
        setIsTutor(me.isTutor && !me.isOwner && !me.isAdmin);
      }
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

  const settingsLabel = isTutor ? "Settings" : "Organization Settings";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex min-h-[56px] w-full max-w-[1200px] items-center justify-between px-4 py-2 sm:px-6">
        <BrandLogo href="/dashboard" width={150} />
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d={
                menuOpen
                  ? "M6.5 5.5L12 11l5.5-5.5 1.5 1.5L13.5 12l5.5 5.5-1.5 1.5L12 13.5 6.5 19l-1.5-1.5L10.5 12 5 6.5z"
                  : "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
              }
            />
          </svg>
        </button>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {showSetup ? (
            <a href="/setup" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
              Setup
            </a>
          ) : null}
          <a href="/dashboard" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Dashboard
          </a>
          <a href="/clients" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Clients
          </a>
          <a href="/settings" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            {settingsLabel}
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
      {menuOpen ? (
        <div className="border-t border-gray-100 md:hidden">
          <nav className="mx-auto grid w-full max-w-[1200px] gap-2 px-4 py-3 text-sm font-semibold sm:px-6">
            {showSetup ? (
              <a
                href="/setup"
                className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
                onClick={() => setMenuOpen(false)}
              >
                Setup
              </a>
            ) : null}
            <a
              href="/dashboard"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="/clients"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Clients
            </a>
            <a
              href="/settings"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              {settingsLabel}
            </a>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onLogout();
                setMenuOpen(false);
              }}
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
            >
              Log out
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
