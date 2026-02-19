"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/app/_components/BrandLogo";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const APP_HEADER_CACHE_TTL_MS = 5 * 60 * 1000;
type AppHeaderCache = {
  roleLabel: string;
  businessName: string | null;
  businessLogoUrl: string | null;
  fetchedAt: number;
};
let appHeaderCache: AppHeaderCache | null = null;

export default function AppHeader() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [roleLabel, setRoleLabel] = useState("User");
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [businessLogoUrl, setBusinessLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("itutoros-post-login");
    return () => {
      document.body.classList.remove("itutoros-post-login");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (appHeaderCache && Date.now() - appHeaderCache.fetchedAt < APP_HEADER_CACHE_TTL_MS) {
      setRoleLabel(appHeaderCache.roleLabel);
      setBusinessName(appHeaderCache.businessName);
      setBusinessLogoUrl(appHeaderCache.businessLogoUrl);
      return () => {
        cancelled = true;
      };
    }

    async function run() {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.access_token) return;

      const orgRes = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      const orgs = orgRes.ok ? await orgRes.json() : [];
      const org = orgs?.[0];
      const logo = Array.isArray(org?.images)
        ? org.images.find((img: any) => img.image_type === "BUSINESS_LOGO" && !img.archived_at)?.image_url
        : null;
      if (org && !cancelled) {
        setBusinessName(typeof org.business_name === "string" ? org.business_name : null);
        setBusinessLogoUrl(typeof logo === "string" ? logo : null);
      }
      // Fetch user roles
      const meRes = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (meRes.ok) {
        const me = await meRes.json();
        const label = me.isOwner ? "Owner" : me.isAdmin ? "Admin" : me.isTutor ? "Tutor" : "User";
        if (!cancelled) {
          setRoleLabel(label);
          appHeaderCache = {
            roleLabel: label,
            businessName: typeof org?.business_name === "string" ? org.business_name : null,
            businessLogoUrl: typeof logo === "string" ? logo : null,
            fetchedAt: Date.now(),
          };
        }
      } else if (!cancelled) {
        appHeaderCache = {
          roleLabel,
          businessName: typeof org?.business_name === "string" ? org.business_name : null,
          businessLogoUrl: typeof logo === "string" ? logo : null,
          fetchedAt: Date.now(),
        };
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

  const settingsLabel = `${roleLabel} Settings`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#dff8ff] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex min-h-[56px] w-full max-w-[1200px] items-center justify-between px-4 py-2 sm:px-6">
        {businessLogoUrl ? (
          <Link href="/dashboard" className="inline-flex items-center">
            <img
              src={businessLogoUrl}
              alt={businessName ? `${businessName} logo` : "Business logo"}
              className="block h-10 w-auto max-h-10 max-w-[220px] object-contain"
            />
          </Link>
        ) : (
          <BrandLogo href="/dashboard" width={150} />
        )}
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
          <span className="inline-flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer">
              <img src="/itutoros_icon.png" alt="iTutorOS" className="h-5 w-auto object-contain" />
            </a>
            <Link href="/dashboard" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
              Dashboard
            </Link>
          </span>
          <Link href="/clients" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Clients
          </Link>
          <Link href="/pipeline" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Pipeline
          </Link>
          <Link href="/schedule" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Schedule
          </Link>
          <Link href="/marketing" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            Marketing
          </Link>
          <Link href="/settings" className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
            {settingsLabel}
          </Link>
          <button
            type="button"
            onClick={() => {
              onLogout();
            }}
            className="text-[#7200dc] transition-colors hover:text-[#00c5dc]"
          >
            Log out
          </button>
        </nav>
      </div>
      {menuOpen ? (
        <div className="border-t border-gray-100 bg-[#dff8ff] md:hidden">
          <nav className="mx-auto grid w-full max-w-[1200px] gap-2 px-4 py-3 text-sm font-semibold sm:px-6">
            <div className="flex items-center gap-3">
              <a href="/" target="_blank" rel="noreferrer" className="inline-flex">
                <img src="/itutoros_icon.png" alt="iTutorOS" className="h-5 w-auto object-contain" />
              </a>
              <Link
                href="/dashboard"
                className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
            <Link
              href="/clients"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Clients
            </Link>
            <Link
              href="/pipeline"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Pipeline
            </Link>
            <Link
              href="/schedule"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link
              href="/marketing"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              Marketing
            </Link>
            <Link
              href="/settings"
              className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
              onClick={() => setMenuOpen(false)}
            >
              {settingsLabel}
            </Link>
            <button
              type="button"
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="rounded-lg px-2 py-1 text-left text-[#7200dc] hover:bg-[#00c5dc]/10"
            >
              Log out
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
