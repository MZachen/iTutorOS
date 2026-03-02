// @ts-nocheck
"use client";

export type SettingsWebsiteTabProps = {
  ctx: Record<string, any>;
};

type WebsitePage = "WEBSITE_DESIGNER" | "SETTINGS_INFO";

const WEBSITE_SLUG_REGEX = /^[a-z0-9-]{3,40}$/;
const WEBSITE_SLUG_COOLDOWN_DAYS = 60;
const WEBSITE_PALETTE_OPTIONS = [
  { key: "PALETTE_1", colors: ["#0b1f5f", "#2d0a7d", "#7dd3fc", "#f8fafc", "#f59e0b"] },
  { key: "PALETTE_2", colors: ["#1f2937", "#10b981", "#d1fae5", "#f9fafb", "#f97316"] },
  { key: "PALETTE_3", colors: ["#1e3a8a", "#2563eb", "#93c5fd", "#eff6ff", "#f43f5e"] },
  { key: "PALETTE_4", colors: ["#3f0d12", "#7f1d1d", "#fecaca", "#fff7ed", "#fb7185"] },
  { key: "PALETTE_5", colors: ["#022c22", "#15803d", "#86efac", "#f0fdf4", "#ca8a04"] },
  { key: "PALETTE_6", colors: ["#312e81", "#7c3aed", "#c4b5fd", "#faf5ff", "#ec4899"] },
  { key: "PALETTE_7", colors: ["#172554", "#0ea5e9", "#bae6fd", "#f8fafc", "#14b8a6"] },
  { key: "PALETTE_8", colors: ["#3b0764", "#a21caf", "#f5d0fe", "#fdf4ff", "#fb7185"] },
  { key: "PALETTE_9", colors: ["#111827", "#4b5563", "#d1d5db", "#f9fafb", "#22c55e"] },
  { key: "PALETTE_10", colors: ["#431407", "#ea580c", "#fdba74", "#fff7ed", "#2563eb"] },
];

function normalizeWebsiteSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function SettingsWebsiteTab({ ctx }: SettingsWebsiteTabProps) {
  const {
    activeTab,
    Copy01Icon,
    HugeiconsIcon,
    loading,
    marketingServices,
    openProductsTab,
    org,
    products,
    setOrg,
    setStatus,
    subjects,
    token,
    topicsBySubject,
    useEffect,
    useRef,
    useState,
  } = ctx;

  const [websitePage, setWebsitePage] =
    useState<WebsitePage>("WEBSITE_DESIGNER");
  const [websiteSlugDraft, setWebsiteSlugDraft] = useState("");
  const [websiteSlugEditing, setWebsiteSlugEditing] = useState(false);
  const [websiteSlugChecking, setWebsiteSlugChecking] = useState(false);
  const [websiteSlugCheck, setWebsiteSlugCheck] = useState<{
    available: boolean;
    message: string;
    slug: string;
  }>({
    available: false,
    message: "Enter a slug to check availability.",
    slug: "",
  });
  const [openContentSourcePopup, setOpenContentSourcePopup] =
    useState<string | null>(null);
  const [websiteLayoutMode, setWebsiteLayoutMode] =
    useState<"SINGLE_PAGE" | "MENU_STYLE">("SINGLE_PAGE");
  const [websitePaletteChoice, setWebsitePaletteChoice] =
    useState<string>("PALETTE_1");
  const [customWebsitePalette, setCustomWebsitePalette] = useState<string[]>([
    "#0b1f5f",
    "#2d0a7d",
    "#7dd3fc",
    "#f8fafc",
    "#f59e0b",
  ]);
  const openContentSourcePopupRef = useRef<HTMLDivElement | null>(null);

  const savedSlug = String(org?.website_slug ?? "").trim();
  const normalizedDraft = normalizeWebsiteSlug(websiteSlugDraft);
  const effectiveSlug = normalizeWebsiteSlug(savedSlug || websiteSlugDraft);
  const activeSubjects = subjects.filter((subject) => !subject.archived_at);
  const activeTopics = Object.values(topicsBySubject)
    .flat()
    .filter((topic) => !topic.archived_at);
  const websiteBaseUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? window.location.origin
      : "https://itutoros.com";
  const fullWebsiteUrl = effectiveSlug
    ? `${websiteBaseUrl}/${effectiveSlug}`
    : `${websiteBaseUrl}/your-slug`;

  const slugUpdatedAt = org?.website_slug_updated_at
    ? new Date(org.website_slug_updated_at)
    : null;
  const nextSlugChangeAt = slugUpdatedAt
    ? new Date(
        slugUpdatedAt.getTime() +
          WEBSITE_SLUG_COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
      )
    : null;
  const canEditSavedSlug =
    !savedSlug || !nextSlugChangeAt || nextSlugChangeAt.getTime() <= Date.now();
  const slugInputDisabled = Boolean(savedSlug) && !websiteSlugEditing;
  const canAcceptSlug =
    !slugInputDisabled &&
    Boolean(normalizedDraft) &&
    WEBSITE_SLUG_REGEX.test(normalizedDraft) &&
    websiteSlugCheck.available &&
    normalizedDraft !== savedSlug;

  useEffect(() => {
    setWebsiteSlugDraft(savedSlug);
    setWebsiteSlugEditing(false);
  }, [savedSlug, org?.updated_at]);

  useEffect(() => {
    if (slugInputDisabled) {
      if (savedSlug) {
        setWebsiteSlugCheck({
          available: true,
          message: "Current slug is active.",
          slug: savedSlug,
        });
      } else {
        setWebsiteSlugCheck({
          available: false,
          message: "Enter a slug to check availability.",
          slug: "",
        });
      }
      setWebsiteSlugChecking(false);
      return;
    }

    if (!normalizedDraft) {
      setWebsiteSlugCheck({
        available: false,
        message: "Enter a slug to check availability.",
        slug: "",
      });
      setWebsiteSlugChecking(false);
      return;
    }

    if (!WEBSITE_SLUG_REGEX.test(normalizedDraft)) {
      setWebsiteSlugCheck({
        available: false,
        message:
          "Use 3-40 characters: lowercase letters, numbers, and hyphens only.",
        slug: normalizedDraft,
      });
      setWebsiteSlugChecking(false);
      return;
    }

    if (!token) return;

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setWebsiteSlugChecking(true);
      try {
        const res = await fetch(
          `/api/website-slug-check?slug=${encodeURIComponent(normalizedDraft)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const payload = await res.json().catch(() => null);
        if (cancelled) return;
        if (!res.ok) {
          setWebsiteSlugCheck({
            available: false,
            message:
              payload?.message || "Unable to check slug availability right now.",
            slug: normalizedDraft,
          });
          return;
        }
        setWebsiteSlugCheck({
          available: Boolean(payload?.available),
          message:
            payload?.message ||
            (payload?.available ? "Slug is available." : "Slug is unavailable."),
          slug: payload?.slug || normalizedDraft,
        });
      } catch {
        if (cancelled) return;
        setWebsiteSlugCheck({
          available: false,
          message: "Unable to check slug availability right now.",
          slug: normalizedDraft,
        });
      } finally {
        if (!cancelled) {
          setWebsiteSlugChecking(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [normalizedDraft, savedSlug, slugInputDisabled, token]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!openContentSourcePopupRef.current) {
        setOpenContentSourcePopup(null);
        return;
      }
      if (
        event.target instanceof Node &&
        openContentSourcePopupRef.current.contains(event.target)
      ) {
        return;
      }
      setOpenContentSourcePopup(null);
    }

    if (!openContentSourcePopup) return;
    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [openContentSourcePopup]);

  function openCompanyContentStudio() {
    openProductsTab("COMPANY");
  }

  function renderCompanyCopyValue(value: string | null | undefined) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
    return (
      <button
        type="button"
        onClick={openCompanyContentStudio}
        className="text-left font-medium text-purple-700 underline underline-offset-2 hover:text-purple-800"
      >
        Not Set
      </button>
    );
  }

  function renderContentSourceTile(
    label: string,
    count: number,
    items: string[],
  ) {
    const hasItems = items.length > 0;
    const isOpen = openContentSourcePopup === label;
    return (
      <div
        className="relative"
        ref={isOpen ? openContentSourcePopupRef : null}
      >
        <button
          type="button"
          onClick={() =>
            setOpenContentSourcePopup((prev) => (prev === label ? null : label))
          }
          className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-left outline-none transition hover:border-fuchsia-300 focus:border-fuchsia-400"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
          </div>
          <div className="mt-1 text-base font-semibold">{count}</div>
        </button>
        {isOpen ? (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 shadow-xl">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {label} content
            </div>
            {hasItems ? (
              <div className="mt-2 max-h-56 overflow-y-auto pr-1">
                <div className="grid gap-1">
                  {items.map((item, index) => (
                    <div
                      key={`${label}-${index}`}
                      className="rounded-lg bg-gray-50 px-2 py-1"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 text-gray-500">No active items.</div>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  async function copyWebsiteUrl() {
    if (!effectiveSlug) return;
    try {
      await navigator.clipboard.writeText(fullWebsiteUrl);
      setStatus("Website URL copied.");
    } catch {
      setStatus("Unable to copy website URL.");
    }
  }

  async function saveWebsiteSlug() {
    if (!token || !canAcceptSlug) return;
    const ok = window.confirm(
      "Saving this slug updates your public website URL. You can only change it once every 60 days. Continue?",
    );
    if (!ok) return;

    setStatus(null);
    try {
      const res = await fetch("/organizations", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website_slug: normalizedDraft,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus(
          payload?.message || `Website slug save failed (${res.status}).`,
        );
        return;
      }
      setOrg(payload);
      setWebsiteSlugEditing(false);
      setStatus("Website slug saved.");
    } catch {
      setStatus("Unable to save website slug.");
    }
  }

  if (loading || activeTab !== "WEBSITE") return null;

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {[
            {
              key: "WEBSITE_DESIGNER" as WebsitePage,
              label: "Website Designer",
            },
            {
              key: "SETTINGS_INFO" as WebsitePage,
              label: "Settings and Info",
            },
          ].map((page) => (
            <button
              key={page.key}
              type="button"
              onClick={() => setWebsitePage(page.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                websitePage === page.key
                  ? "bg-[#2d0a7d] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              ].join(" ")}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {websitePage === "WEBSITE_DESIGNER" ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-base font-semibold text-[#0b1f5f]">
            Website Designer
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Website builder and layout tools will live here.
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-500">
            Coming soon...
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-[#0b1f5f]">
              Website URL
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Choose the website slug for your public iTutorOS page. Allowed:
              lowercase letters, numbers, and hyphens. Not allowed: spaces,
              uppercase letters, and other special characters.
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                  https://itutoros.com/
                </div>
                <input
                  value={websiteSlugDraft}
                  onChange={(e) =>
                    setWebsiteSlugDraft(normalizeWebsiteSlug(e.target.value))
                  }
                  disabled={slugInputDisabled}
                  placeholder="your-slug"
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-fuchsia-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
                {savedSlug && canEditSavedSlug && !websiteSlugEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setWebsiteSlugDraft(savedSlug);
                      setWebsiteSlugEditing(true);
                    }}
                    className="rounded-xl bg-gray-700 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Change slug
                  </button>
                ) : null}
                {!slugInputDisabled ? (
                  <button
                    type="button"
                    onClick={saveWebsiteSlug}
                    disabled={!canAcceptSlug}
                    className="rounded-xl bg-[#2d0a7d] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Accept
                  </button>
                ) : null}
              </div>
              <div className="text-sm">
                {websiteSlugChecking ? (
                  <span className="text-gray-500">Checking availability...</span>
                ) : (
                  <span
                    className={
                      websiteSlugCheck.available
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {websiteSlugCheck.message}
                  </span>
                )}
              </div>
              {savedSlug && !canEditSavedSlug && nextSlugChangeAt ? (
                <div className="text-sm text-amber-700">
                  You can change your slug again on{" "}
                  {nextSlugChangeAt.toLocaleDateString()}.
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                <span className="font-medium">Your website address:</span>
                <span className="rounded-lg bg-gray-50 px-3 py-2 font-mono text-gray-600">
                  {fullWebsiteUrl}
                </span>
                <button
                  type="button"
                  onClick={copyWebsiteUrl}
                  disabled={!effectiveSlug}
                  className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Copy website URL"
                >
                  <HugeiconsIcon icon={Copy01Icon} size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-[#0b1f5f]">
              Website layout
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Choose how your public iTutorOS website is structured.
            </div>
            <div className="mt-4 grid gap-3">
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <input
                  type="radio"
                  name="website-layout"
                  checked={websiteLayoutMode === "SINGLE_PAGE"}
                  onChange={() => setWebsiteLayoutMode("SINGLE_PAGE")}
                  className="h-4 w-4 accent-[#2d0a7d]"
                />
                <span className="font-medium">Single page</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <input
                  type="radio"
                  name="website-layout"
                  checked={websiteLayoutMode === "MENU_STYLE"}
                  onChange={() => setWebsiteLayoutMode("MENU_STYLE")}
                  className="h-4 w-4 accent-[#2d0a7d]"
                />
                <span className="font-medium">Menu style</span>
              </label>
            </div>
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="text-sm font-semibold text-[#0b1f5f]">
                Color palette
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Select one of the preset palettes or build your own five-color palette.
              </div>
              <div className="mt-4 grid gap-3">
                {WEBSITE_PALETTE_OPTIONS.map((palette, index) => (
                  <label
                    key={palette.key}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="website-palette"
                      checked={websitePaletteChoice === palette.key}
                      onChange={() => setWebsitePaletteChoice(palette.key)}
                      className="h-4 w-4 accent-[#2d0a7d]"
                    />
                    <span className="w-24 font-medium">{`Palette ${index + 1}`}</span>
                    <span className="flex flex-wrap gap-2">
                      {palette.colors.map((color) => (
                        <span
                          key={`${palette.key}-${color}`}
                          className="h-6 w-6 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                  </label>
                ))}
                <label className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="website-palette"
                      checked={websitePaletteChoice === "CUSTOM"}
                      onChange={() => setWebsitePaletteChoice("CUSTOM")}
                      className="h-4 w-4 accent-[#2d0a7d]"
                    />
                    <span className="font-medium">Build your own palette</span>
                  </div>
                  {websitePaletteChoice === "CUSTOM" ? (
                    <div className="mt-4 grid grid-cols-5 gap-3">
                      {customWebsitePalette.map((color, index) => (
                        <label
                          key={`custom-palette-${index}`}
                          className="grid gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          <span>{`Color ${index + 1}`}</span>
                          <input
                            type="color"
                            value={color}
                            onChange={(e) =>
                              setCustomWebsitePalette((prev) =>
                                prev.map((entry, entryIndex) =>
                                  entryIndex === index ? e.target.value : entry,
                                ),
                              )
                            }
                            className="h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                          />
                        </label>
                      ))}
                    </div>
                  ) : null}
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-[#0b1f5f]">
              Website content sources
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Website builder content is sourced from Content Studio and Company
              content.
            </div>
            <div className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
              {renderContentSourceTile(
                "Products",
                products.length,
                products
                  .map((product) => String(product?.product_name || "").trim())
                  .filter(Boolean),
              )}
              {renderContentSourceTile(
                "Services",
                marketingServices.length,
                marketingServices
                  .map((service) =>
                    String(
                      service?.display_name ||
                        service?.service_code ||
                        "Unnamed service",
                    ).trim(),
                  )
                  .filter(Boolean),
              )}
              {renderContentSourceTile(
                "Subjects",
                activeSubjects.length,
                activeSubjects
                  .map((subject) =>
                    String(subject?.subject_name || "Unnamed subject").trim(),
                  )
                  .filter(Boolean),
              )}
              {renderContentSourceTile(
                "Topics",
                activeTopics.length,
                activeTopics
                  .map((topic) =>
                    String(topic?.topic_name || "Unnamed topic").trim(),
                  )
                  .filter(Boolean),
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-[#0b1f5f]">
              Company profile for website copy
            </div>
            <div className="mt-4 grid gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Slogan
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {renderCompanyCopyValue(org?.slogan_text)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Company description
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {renderCompanyCopyValue(org?.company_description_text)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Mission statement
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {renderCompanyCopyValue(org?.mission_text)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Teaching style
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {renderCompanyCopyValue(org?.tutoring_style_text)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  About us
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {renderCompanyCopyValue(
                    org?.about_us_text || org?.about_text,
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
