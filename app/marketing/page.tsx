"use client";

import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import {
  getConnectionProvider,
  type ConnectionProviderId,
} from "@/lib/connections";

type MarketingPost = {
  id: string;
  title: string;
  status: "DRAFT" | "READY" | "POSTED";
  platform_ids: string[];
  copy_text?: string | null;
  last_posted_at?: string | null;
  created_at?: string | null;
  views_count?: number | null;
  clicks_count?: number | null;
};

type ConnectionSnapshot = {
  provider: ConnectionProviderId;
  connected: boolean;
};

export default function MarketingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<MarketingPost[]>([]);
  const [connections, setConnections] = useState<ConnectionSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setToken(data.session?.access_token ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  useEffect(() => {
    let cancelled = false;
    async function loadAll(accessToken: string) {
      setLoading(true);
      setStatus(null);
      try {
        const [postsRes, connectionsRes] = await Promise.all([
          fetch("/marketing-posts", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch("/connections", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        if (!postsRes.ok) {
          setStatus(`Failed to load marketing posts (${postsRes.status}).`);
          return;
        }
        const postsJson = (await postsRes.json()) as MarketingPost[];
        if (!cancelled) setPosts(postsJson);

        if (connectionsRes.ok) {
          const connectionsJson =
            (await connectionsRes.json()) as ConnectionSnapshot[];
          if (!cancelled) setConnections(connectionsJson);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (token) void loadAll(token);
  }, [token]);

  const canShowMetrics = useMemo(
    () => connections.some((c) => c.connected),
    [connections],
  );

  async function archivePost(post: MarketingPost) {
    if (!token) return;
    const confirmed = window.confirm(
      `Archive "${post.title}"? This removes it from Marketing.`,
    );
    if (!confirmed) return;
    setStatus(null);
    const res = await fetch(`/marketing-posts/${encodeURIComponent(post.id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Archive failed (${res.status}): ${text}`);
      return;
    }
    setPosts((prev) => prev.filter((item) => item.id !== post.id));
    setStatus("Post archived.");
  }

  return (
    <div className="min-h-screen bg-[#f7f6fb]">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#0b1f5f]">Marketing</h1>
            <p className="mt-1 text-sm text-gray-600">
              Review social posts, track status, and jump into the builder.
            </p>
          </div>
          <a
            href="/settings?tab=MARKETING&section=POST_BUILDER"
            className="itutoros-settings-btn itutoros-settings-btn-primary"
          >
            Create post
          </a>
        </div>

        {status ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            {status}
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Post</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Platforms
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Last posted
                  </th>
                  {canShowMetrics ? (
                    <>
                      <th className="px-4 py-3 text-left font-semibold">
                        Views
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Clicks
                      </th>
                    </>
                  ) : null}
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={canShowMetrics ? 7 : 5}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Loading posts...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={canShowMetrics ? 7 : 5}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No marketing posts yet. Create your first post from
                      Settings to Marketing.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => {
                    const label =
                      post.status === "POSTED"
                        ? "Posted"
                        : post.status === "READY"
                          ? "Ready"
                          : "Unposted";
                    const tone =
                      post.status === "POSTED"
                        ? "text-emerald-600"
                        : post.status === "READY"
                          ? "text-amber-600"
                          : "text-gray-600";
                    const platformLabels = post.platform_ids
                      .map((id) => getConnectionProvider(id)?.label ?? id)
                      .join(", ");
                    return (
                      <tr key={post.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {post.copy_text ?? ""}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {platformLabels || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold ${tone}`}>
                            {label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {post.last_posted_at
                            ? new Date(post.last_posted_at).toLocaleString()
                            : "-"}
                        </td>
                        {canShowMetrics ? (
                          <>
                            <td className="px-4 py-3 text-gray-700">
                              {post.views_count ?? "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {post.clicks_count ?? "-"}
                            </td>
                          </>
                        ) : null}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`/settings?tab=MARKETING&section=POST_BUILDER&post_id=${encodeURIComponent(post.id)}`}
                              className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                              Edit
                            </a>
                            <button
                              type="button"
                              onClick={() => void archivePost(post)}
                              className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
