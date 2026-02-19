"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { searchSiteIndex } from "@/lib/site-search";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiSearchIcon } from "@hugeicons/core-free-icons";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  const results = useMemo(() => (query ? searchSiteIndex(query) : []), [query]);

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 p-6 itutoros-soft-gradient">
        <div className="mx-auto w-full max-w-[900px]">
          <h1 className="m-0 text-4xl font-extrabold">Search</h1>
          <p className="mt-2 text-base text-gray-700">Find pages, features, and resources across iTutorOS.</p>

          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              const next = value.trim();
              router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
            }}
          >
            <label className="relative block w-full">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7200dc]">
                <HugeiconsIcon icon={AiSearchIcon} size={16} />
              </span>
              <input
                type="search"
                name="q"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search iTutorOS"
                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm"
              />
            </label>
          </form>

          <div className="mt-8">
            {query ? (
              results.length ? (
                <div className="grid gap-4">
                  {results.map((result) => (
                    <a
                      key={result.href}
                      href={result.href}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5"
                    >
                      <div className="text-lg font-extrabold text-[#7200dc]">{result.title}</div>
                      <p className="mt-1 text-sm text-gray-700">{result.description}</p>
                      <div className="mt-2 text-xs text-gray-500">{result.href}</div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No results found for "{query}".</p>
              )
            ) : (
              <p className="text-sm text-gray-600">Type a keyword to start searching.</p>
            )}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SearchPageContent />
    </Suspense>
  );
}
