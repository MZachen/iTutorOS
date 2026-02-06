"use client";

import { useState } from "react";
import BrandLogo from "@/app/_components/BrandLogo";
import FloatingSocial from "@/app/_components/FloatingSocial";

const featureItems = [
  { href: "/features/scheduling", label: "Scheduling" },
  { href: "/features/marketing", label: "Marketing" },
  { href: "/features/sales", label: "Sales" },
  { href: "/features/custom-website", label: "Custom web site" },
  { href: "/features/support", label: "Support" },
];

const navItems: Array<{
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
}> = [
  { href: "/pricing", label: "Pricing" },
  { href: "/features", label: "Features", children: featureItems },
  { href: "/documentation", label: "Documentation" },
  { href: "/contact-us", label: "Contact us" },
  { href: "/login", label: "Log in" },
];

type MarketingHeaderProps = {
  showSocial?: boolean;
};

export default function MarketingHeader({ showSocial = true }: MarketingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex min-h-[50px] w-full max-w-[1200px] items-center justify-between px-4 py-2 sm:px-6">
          <BrandLogo href="/" width={150} />
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
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <a href={item.href} className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
                    {item.label}
                  </a>
                  <div className="invisible absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white p-2 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#7200dc] transition-colors hover:bg-[#00c5dc]/10 hover:text-[#00c5dc]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={item.href} href={item.href} className="text-[#7200dc] transition-colors hover:text-[#00c5dc]">
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
        {menuOpen ? (
          <div className="border-t border-gray-100 md:hidden">
            <nav className="mx-auto grid w-full max-w-[1200px] gap-2 px-4 py-3 text-sm font-semibold sm:px-6">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.href} className="grid gap-1">
                    <a
                      href={item.href}
                      className="text-[#7200dc]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    <div className="grid gap-1 pl-3 text-sm font-medium">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-2 py-1 text-[#7200dc] hover:bg-[#00c5dc]/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        ) : null}
      </header>
      {showSocial ? <FloatingSocial /> : null}
    </>
  );
}
