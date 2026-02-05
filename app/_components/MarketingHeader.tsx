"use client";

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
  return (
    <>
      <header className="sticky top-0 z-50 h-[50px] w-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-6">
          <BrandLogo href="/" width={150} />

          <nav className="flex items-center gap-6 text-sm font-semibold">
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
      </header>
      {showSocial ? <FloatingSocial /> : null}
    </>
  );
}
