"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { AiSearchIcon } from "@hugeicons/core-free-icons";

export default function MarketingFooter() {
  return (
    <footer
      className="relative bg-[#ff9df9] px-6 py-6 text-sm text-gray-900 shadow-[0_-14px_40px_rgba(0,0,0,0.28)] before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-6 before:w-full before:-translate-y-6 before:bg-gradient-to-t before:from-black/30 before:to-transparent"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <form action="/search" method="get" className="relative w-full max-w-[320px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7200dc]">
            <HugeiconsIcon icon={AiSearchIcon} size={16} />
          </span>
          <input
            type="search"
            name="q"
            placeholder="Search iTutorOS"
            className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm"
          />
        </form>
        <div className="text-sm font-semibold">{"\u00A9"} 2026 iTutorOS</div>
      </div>
    </footer>
  );
}
