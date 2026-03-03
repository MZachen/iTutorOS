// @ts-nocheck
"use client";

export type SettingsWebsiteTabProps = {
  ctx: Record<string, any>;
};

type WebsitePage = "WEBSITE_DESIGNER" | "SETTINGS_INFO" | "WEBSITE_PREVIEW";

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
const WEBSITE_DESIGNER_STORAGE_KEY_PREFIX = "itutoros:website-designer:";
const WEBSITE_DESIGNER_SECTION_ORDER = [
  "home",
  "about",
  "services",
  "subjects",
  "topics",
  "products",
  "contact",
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
    useMemo,
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
  const [websiteDesignerSections, setWebsiteDesignerSections] = useState<any[]>([]);
  const [websiteDesignerSelectedSectionId, setWebsiteDesignerSelectedSectionId] =
    useState("");
  const [websiteDesignerSelectedItemId, setWebsiteDesignerSelectedItemId] =
    useState("");
  const [websiteDesignerDragState, setWebsiteDesignerDragState] =
    useState<any>(null);
  const [websiteDesignerMedia, setWebsiteDesignerMedia] = useState<any[]>([]);
  const [websiteDesignerMediaLoading, setWebsiteDesignerMediaLoading] =
    useState(false);
  const [websitePublishing, setWebsitePublishing] = useState(false);
  const openContentSourcePopupRef = useRef<HTMLDivElement | null>(null);
  const websiteDesignerStorageOrgRef = useRef("");
  const websiteDesignerIdCounterRef = useRef(1);

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
  const websiteDesignerStorageKey = org?.id
    ? `${WEBSITE_DESIGNER_STORAGE_KEY_PREFIX}${org.id}`
    : "";
  const activePaletteColors =
    websitePaletteChoice === "CUSTOM"
      ? customWebsitePalette
      : WEBSITE_PALETTE_OPTIONS.find((palette) => palette.key === websitePaletteChoice)
          ?.colors ?? WEBSITE_PALETTE_OPTIONS[0].colors;
  const companyLogoUrl = String(
    org?.images?.find((img) => !img.archived_at)?.image_url ?? "",
  ).trim();
  const websiteDesignerSelectedSection =
    websiteDesignerSections.find(
      (section) => section.id === websiteDesignerSelectedSectionId,
    ) ?? null;
  const websiteDesignerSelectedItem =
    websiteDesignerSelectedSection?.items?.find(
      (item) => item.id === websiteDesignerSelectedItemId,
    ) ?? null;

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

  useEffect(() => {
    if (!token || activeTab !== "WEBSITE") return;
    let cancelled = false;
    (async () => {
      setWebsiteDesignerMediaLoading(true);
      try {
        const res = await fetch("/catalog-media?scope=global", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const payload = await res.json().catch(() => []);
        if (cancelled) return;
        if (!res.ok) {
          setStatus(
            payload?.message || "Unable to load website designer image library.",
          );
          return;
        }
        setWebsiteDesignerMedia(Array.isArray(payload) ? payload : []);
      } catch {
        if (!cancelled) {
          setStatus("Unable to load website designer image library.");
        }
      } finally {
        if (!cancelled) {
          setWebsiteDesignerMediaLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeTab, setStatus, token]);

  useEffect(() => {
    if (!websiteDesignerStorageKey) return;
    if (websiteDesignerStorageOrgRef.current === websiteDesignerStorageKey) return;
    websiteDesignerStorageOrgRef.current = websiteDesignerStorageKey;
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(websiteDesignerStorageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setWebsiteLayoutMode(
        parsed?.websiteLayoutMode === "MENU_STYLE" ? "MENU_STYLE" : "SINGLE_PAGE",
      );
      if (
        typeof parsed?.websitePaletteChoice === "string" &&
        (parsed.websitePaletteChoice === "CUSTOM" ||
          WEBSITE_PALETTE_OPTIONS.some(
            (palette) => palette.key === parsed.websitePaletteChoice,
          ))
      ) {
        setWebsitePaletteChoice(parsed.websitePaletteChoice);
      }
      if (
        Array.isArray(parsed?.customWebsitePalette) &&
        parsed.customWebsitePalette.length === 5
      ) {
        setCustomWebsitePalette(
          parsed.customWebsitePalette.map((color: any, index: number) =>
            typeof color === "string"
              ? color
              : WEBSITE_PALETTE_OPTIONS[0].colors[index] ?? "#ffffff",
          ),
        );
      }
      if (Array.isArray(parsed?.websiteDesignerSections)) {
        setWebsiteDesignerSections(parsed.websiteDesignerSections);
        setWebsiteDesignerSelectedSectionId(
          parsed.websiteDesignerSections[0]?.id ?? "",
        );
        setWebsiteDesignerSelectedItemId(
          parsed.websiteDesignerSections[0]?.items?.[0]?.id ?? "",
        );
      }
    } catch {
      window.localStorage.removeItem(websiteDesignerStorageKey);
    }
  }, [websiteDesignerStorageKey]);

  useEffect(() => {
    if (!websiteDesignerStorageKey || typeof window === "undefined") return;
    window.localStorage.setItem(
      websiteDesignerStorageKey,
      JSON.stringify({
        websiteLayoutMode,
        websitePaletteChoice,
        customWebsitePalette,
        websiteDesignerSections,
      }),
    );
  }, [
    customWebsitePalette,
    websiteDesignerSections,
    websiteDesignerStorageKey,
    websiteLayoutMode,
    websitePaletteChoice,
  ]);

  function openCompanyContentStudio() {
    openProductsTab("COMPANY");
  }

  function nextWebsiteDesignerId(prefix: string) {
    const next = websiteDesignerIdCounterRef.current;
    websiteDesignerIdCounterRef.current += 1;
    return `${prefix}-${next}`;
  }

  function makeWebsiteDesignerSlogan() {
    const businessName = String(org?.business_name || "Your tutoring business").trim();
    const options = [
      `${businessName}: Personalized support that moves students forward.`,
      `Confidence, consistency, and growth with ${businessName}.`,
      `Learning that meets each student where they are.`,
      `Clear plans, stronger skills, better results.`,
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  function buildWebsiteDesignerSections() {
    const businessName =
      String(org?.business_name || "Your Business").trim() || "Your Business";
    const sloganText =
      String(org?.slogan_text || "").trim() || makeWebsiteDesignerSlogan();
    const aboutText = [
      String(org?.company_description_text || "").trim(),
      String(org?.mission_text || "").trim(),
      String(org?.tutoring_style_text || "").trim(),
      String(org?.about_us_text || org?.about_text || "").trim(),
    ]
      .filter(Boolean)
      .join("\n\n");
    const serviceList = marketingServices
      .map((service) => String(service?.display_name || service?.service_code || "").trim())
      .filter(Boolean);
    const subjectList = activeSubjects
      .map((subject) => String(subject?.subject_name || "").trim())
      .filter(Boolean);
    const topicList = activeTopics
      .map((topic) => String(topic?.topic_name || "").trim())
      .filter(Boolean);
    const productList = products
      .map((product) => String(product?.product_name || "").trim())
      .filter(Boolean);
    const addressLine = [
      String(org?.business_address_1 || "").trim(),
      String(org?.business_city || "").trim(),
      String(org?.business_state || "").trim(),
      String(org?.business_zip || "").trim(),
    ]
      .filter(Boolean)
      .join(", ");
    const homeItems: any[] = [];
    const brandVariant = companyLogoUrl ? Math.floor(Math.random() * 3) : 1;

    if (brandVariant === 0 && companyLogoUrl) {
      homeItems.push({
        id: nextWebsiteDesignerId("image"),
        kind: "image",
        label: "Logo",
        imageUrl: companyLogoUrl,
        align: "left",
        widthClass: "max-w-[220px]",
      });
    } else if (brandVariant === 1) {
      homeItems.push({
        id: nextWebsiteDesignerId("text"),
        kind: "text",
        label: "Company name",
        text: businessName,
        fontSize: 56,
        textColor: activePaletteColors[1] || "#2d0a7d",
        backgroundColor: "transparent",
        align: "left",
        bold: true,
      });
    } else {
      homeItems.push({
        id: nextWebsiteDesignerId("image"),
        kind: "image",
        label: "Logo",
        imageUrl: companyLogoUrl,
        align: "left",
        widthClass: "max-w-[160px]",
      });
      homeItems.push({
        id: nextWebsiteDesignerId("text"),
        kind: "text",
        label: "Company name",
        text: businessName,
        fontSize: 36,
        textColor: activePaletteColors[1] || "#2d0a7d",
        backgroundColor: "transparent",
        align: "left",
        bold: true,
      });
    }

    homeItems.push({
      id: nextWebsiteDesignerId("text"),
      kind: "text",
      label: "Slogan",
      text: sloganText,
      fontSize: 24,
      textColor: activePaletteColors[4] || "#1f2937",
      backgroundColor: "transparent",
      align: "left",
      bold: false,
    });

    const makeTitleItem = (label: string) => ({
      id: nextWebsiteDesignerId("text"),
      kind: "text",
      label: "Section title",
      text: label,
      fontSize: 34,
      textColor: activePaletteColors[1] || "#2d0a7d",
      backgroundColor: "transparent",
      align: "left",
      bold: true,
    });

    const makeTextItem = (label: string, text: string) => ({
      id: nextWebsiteDesignerId("text"),
      kind: "text",
      label,
      text,
      fontSize: 18,
      textColor: activePaletteColors[4] || "#1f2937",
      backgroundColor: "transparent",
      align: "left",
      bold: false,
    });

    const makeListItem = (label: string, entries: string[]) => ({
      id: nextWebsiteDesignerId("list"),
      kind: "list",
      label,
      entries,
      fontSize: 18,
      textColor: activePaletteColors[4] || "#1f2937",
      backgroundColor: "transparent",
      align: "left",
      bold: false,
    });

    setWebsiteDesignerSections([
      {
        id: "home",
        label: "Home",
        hideTitle: true,
        backgroundColor: activePaletteColors[3] || "#ffffff",
        items: homeItems,
      },
      {
        id: "about",
        label: "About",
        backgroundColor: activePaletteColors[2] || "#f8fafc",
        items: [
          makeTitleItem("About"),
          makeTextItem(
            "About copy",
            aboutText || "Add your company story, mission, and teaching style.",
          ),
        ],
      },
      {
        id: "services",
        label: "Services",
        backgroundColor: activePaletteColors[3] || "#ffffff",
        items: [
          makeTitleItem("Services"),
          makeListItem(
            "Service list",
            serviceList.length > 0
              ? serviceList
              : ["Add services in Content Studio and Settings."],
          ),
        ],
      },
      {
        id: "subjects",
        label: "Subjects",
        backgroundColor: activePaletteColors[2] || "#f8fafc",
        items: [
          makeTitleItem("Subjects"),
          makeListItem(
            "Subject list",
            subjectList.length > 0
              ? subjectList
              : ["Add subjects in Content Studio and Settings."],
          ),
        ],
      },
      {
        id: "topics",
        label: "Topics",
        backgroundColor: activePaletteColors[3] || "#ffffff",
        items: [
          makeTitleItem("Topics"),
          makeListItem(
            "Topic list",
            topicList.length > 0
              ? topicList
              : ["Add topics in Content Studio and Settings."],
          ),
        ],
      },
      {
        id: "products",
        label: "Products",
        backgroundColor: activePaletteColors[2] || "#f8fafc",
        items: [
          makeTitleItem("Products"),
          makeListItem(
            "Product list",
            productList.length > 0 ? productList : ["Add products in Content Studio."],
          ),
        ],
      },
      {
        id: "contact",
        label: "Contact",
        backgroundColor: activePaletteColors[3] || "#ffffff",
        items: [
          makeTitleItem("Contact"),
          {
            id: nextWebsiteDesignerId("social"),
            kind: "social",
            label: "Social links",
            entries: ["Facebook", "Instagram", "TikTok"],
            fontSize: 16,
            textColor: activePaletteColors[4] || "#1f2937",
            backgroundColor: "transparent",
            align: "left",
            bold: true,
          },
          {
            id: nextWebsiteDesignerId("map"),
            kind: "map",
            label: "Map",
            text: addressLine || "Add your business address in Business Info.",
            fontSize: 16,
            textColor: activePaletteColors[4] || "#1f2937",
            backgroundColor: "#ffffff",
            align: "left",
            bold: false,
          },
          makeTextItem(
            "Contact details",
            [String(org?.business_phone || "").trim(), String(org?.business_email || "").trim()]
              .filter(Boolean)
              .join("\n") || "Add a phone number or email in Business Info.",
          ),
        ],
      },
    ]);
    setWebsiteDesignerSelectedSectionId("home");
    setWebsiteDesignerSelectedItemId(homeItems[0]?.id ?? "");
    setStatus("Website layout generated.");
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

  function updateWebsiteDesignerItem(
    sectionId: string,
    itemId: string,
    updater: any,
  ) {
    setWebsiteDesignerSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.map((item: any) => {
            if (item.id !== itemId) return item;
            const patch =
              typeof updater === "function" ? updater(item) : updater;
            return {
              ...item,
              ...patch,
            };
          }),
        };
      }),
    );
  }

  function addWebsiteDesignerItem(kind: string) {
    const targetSectionId = websiteDesignerSelectedSectionId || "home";
    const defaultImageUrl =
      String(websiteDesignerMedia[0]?.media_url || "").trim() || companyLogoUrl;
    const nextItem =
      kind === "image"
        ? {
            id: nextWebsiteDesignerId("image"),
            kind: "image",
            label: "Image",
            imageUrl: defaultImageUrl,
            align: "left",
            widthClass: "max-w-full",
          }
        : kind === "list"
          ? {
              id: nextWebsiteDesignerId("list"),
              kind: "list",
              label: "Bulleted list",
              entries: ["New bullet"],
              fontSize: 18,
              textColor: activePaletteColors[4] || "#1f2937",
              backgroundColor: "transparent",
              align: "left",
              bold: false,
            }
          : kind === "social"
            ? {
                id: nextWebsiteDesignerId("social"),
                kind: "social",
                label: "Social links",
                entries: ["Facebook", "Instagram", "LinkedIn"],
                fontSize: 16,
                textColor: activePaletteColors[4] || "#1f2937",
                backgroundColor: "transparent",
                align: "left",
                bold: true,
              }
            : kind === "map"
              ? {
                  id: nextWebsiteDesignerId("map"),
                  kind: "map",
                  label: "Map",
                  text:
                    [
                      String(org?.business_address_1 || "").trim(),
                      String(org?.business_city || "").trim(),
                      String(org?.business_state || "").trim(),
                    ]
                      .filter(Boolean)
                      .join(", ") || "Add address details for your map.",
                  fontSize: 16,
                  textColor: activePaletteColors[4] || "#1f2937",
                  backgroundColor: "#ffffff",
                  align: "left",
                  bold: false,
                }
              : kind === "button"
                ? {
                    id: nextWebsiteDesignerId("button"),
                    kind: "button",
                    label: "Button",
                    text: "Get Started",
                    fontSize: 18,
                    textColor: "#ffffff",
                    backgroundColor: activePaletteColors[0] || "#0b1f5f",
                    align: "center",
                    bold: true,
                  }
                : {
                    id: nextWebsiteDesignerId("text"),
                    kind: "text",
                    label: "Text",
                    text: "New text",
                    fontSize: 20,
                    textColor: activePaletteColors[4] || "#1f2937",
                    backgroundColor: "transparent",
                    align: "left",
                    bold: false,
                  };

    setWebsiteDesignerSections((prev) =>
      prev.map((section) =>
        section.id === targetSectionId
          ? {
              ...section,
              items: [...section.items, nextItem],
            }
          : section,
      ),
    );
    setWebsiteDesignerSelectedSectionId(targetSectionId);
    setWebsiteDesignerSelectedItemId(nextItem.id);
  }

  function handleWebsiteDesignerSectionDrop(targetSectionId: string) {
    if (!websiteDesignerDragState || websiteDesignerDragState.type !== "section") {
      return;
    }
    const sourceSectionId = websiteDesignerDragState.sectionId;
    if (!sourceSectionId || sourceSectionId === "home" || sourceSectionId === targetSectionId) {
      setWebsiteDesignerDragState(null);
      return;
    }
    setWebsiteDesignerSections((prev) => {
      const homeSection = prev.find((section) => section.id === "home");
      const movable = prev.filter((section) => section.id !== "home");
      const sourceIndex = movable.findIndex((section) => section.id === sourceSectionId);
      const targetIndex = movable.findIndex((section) => section.id === targetSectionId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;
      const nextMovable = [...movable];
      const [moved] = nextMovable.splice(sourceIndex, 1);
      nextMovable.splice(targetIndex, 0, moved);
      return homeSection ? [homeSection, ...nextMovable] : nextMovable;
    });
    setWebsiteDesignerDragState(null);
  }

  function handleWebsiteDesignerItemDrop(
    targetSectionId: string,
    targetItemId?: string,
  ) {
    if (!websiteDesignerDragState || websiteDesignerDragState.type !== "item") {
      return;
    }
    const { sectionId: sourceSectionId, itemId: sourceItemId } =
      websiteDesignerDragState;
    if (!sourceSectionId || !sourceItemId) {
      setWebsiteDesignerDragState(null);
      return;
    }
    setWebsiteDesignerSections((prev) => {
      const next = prev.map((section) => ({
        ...section,
        items: [...section.items],
      }));
      const sourceSection = next.find((section) => section.id === sourceSectionId);
      const targetSection = next.find((section) => section.id === targetSectionId);
      if (!sourceSection || !targetSection) return prev;
      const sourceIndex = sourceSection.items.findIndex(
        (item: any) => item.id === sourceItemId,
      );
      if (sourceIndex === -1) return prev;
      const [moved] = sourceSection.items.splice(sourceIndex, 1);
      if (!moved) return prev;
      const targetIndex = targetItemId
        ? targetSection.items.findIndex((item: any) => item.id === targetItemId)
        : -1;
      if (targetIndex === -1) {
        targetSection.items.push(moved);
      } else {
        targetSection.items.splice(targetIndex, 0, moved);
      }
      return next;
    });
    setWebsiteDesignerSelectedSectionId(targetSectionId);
    setWebsiteDesignerSelectedItemId(sourceItemId);
    setWebsiteDesignerDragState(null);
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

  function renderWebsiteDesignerItem(section: any, item: any) {
    const isSelected =
      section.id === websiteDesignerSelectedSectionId &&
      item.id === websiteDesignerSelectedItemId;
    const alignClass =
      item.align === "center"
        ? "items-center text-center"
        : item.align === "right"
          ? "items-end text-right"
          : "items-start text-left";
    const wrapperClass = [
      "relative flex flex-col gap-3 rounded-xl border p-4 transition",
      isSelected
        ? "border-fuchsia-500 shadow-[0_0_0_2px_rgba(217,70,239,0.15)]"
        : "border-gray-200",
    ].join(" ");
    const wrapperStyle = {
      backgroundColor:
        item.kind === "image" && item.backgroundColor === "transparent"
          ? "#ffffff"
          : item.backgroundColor || "transparent",
    } as any;

    const handle = (
      <button
        type="button"
        draggable
        onDragStart={() =>
          setWebsiteDesignerDragState({
            type: "item",
            sectionId: section.id,
            itemId: item.id,
          })
        }
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs text-gray-500"
        title="Drag object"
      >
        :::
      </button>
    );

    const content = (() => {
      if (item.kind === "image") {
        return (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.label}
                className={`h-auto w-full object-contain ${item.widthClass || ""}`}
              />
            ) : (
              <div className="flex min-h-[120px] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                No image selected
              </div>
            )}
          </div>
        );
      }
      if (item.kind === "list") {
        return (
          <ul
            className={`list-disc space-y-1 pl-5 ${alignClass}`}
            style={{
              fontSize: `${item.fontSize || 18}px`,
              color: item.textColor || "#1f2937",
              fontWeight: item.bold ? 700 : 500,
            }}
          >
            {(item.entries || []).map((entry: string, index: number) => (
              <li key={`${item.id}-entry-${index}`}>{entry}</li>
            ))}
          </ul>
        );
      }
      if (item.kind === "social") {
        return (
          <div className={`flex flex-wrap gap-2 ${alignClass}`}>
            {(item.entries || []).map((entry: string, index: number) => (
              <span
                key={`${item.id}-social-${index}`}
                className="rounded-full border border-gray-200 bg-white px-3 py-1"
                style={{
                  fontSize: `${item.fontSize || 16}px`,
                  color: item.textColor || "#1f2937",
                  fontWeight: item.bold ? 700 : 500,
                }}
              >
                {entry}
              </span>
            ))}
          </div>
        );
      }
      if (item.kind === "map") {
        return (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Map
            </div>
            <div
              className="mt-2"
              style={{
                fontSize: `${item.fontSize || 16}px`,
                color: item.textColor || "#1f2937",
                fontWeight: item.bold ? 700 : 500,
              }}
            >
              {item.text}
            </div>
          </div>
        );
      }
      if (item.kind === "button") {
        return (
          <span
            className="inline-flex rounded-full px-4 py-2"
            style={{
              fontSize: `${item.fontSize || 18}px`,
              color: item.textColor || "#ffffff",
              backgroundColor: item.backgroundColor || "#0b1f5f",
              fontWeight: item.bold ? 700 : 500,
            }}
          >
            {item.text}
          </span>
        );
      }
      return (
        <div
          style={{
            fontSize: `${item.fontSize || 20}px`,
            color: item.textColor || "#1f2937",
            fontWeight: item.bold ? 700 : 500,
            lineHeight: 1.35,
            whiteSpace: "pre-wrap",
          }}
        >
          {item.text}
        </div>
      );
    })();

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        className={`${wrapperClass} text-left`}
        style={wrapperStyle}
        onClick={() => {
          setWebsiteDesignerSelectedSectionId(section.id);
          setWebsiteDesignerSelectedItemId(item.id);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setWebsiteDesignerSelectedSectionId(section.id);
            setWebsiteDesignerSelectedItemId(item.id);
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => handleWebsiteDesignerItemDrop(section.id, item.id)}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {item.label}
          </div>
          {handle}
        </div>
        <div className={`flex flex-col gap-2 ${alignClass}`}>{content}</div>
      </div>
    );
  }

  function renderWebsiteDesignerToolbar() {
    const selectedItem = websiteDesignerSelectedItem;
    const isTextLike = selectedItem && selectedItem.kind !== "image";

    return (
      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <div className="text-sm font-semibold text-[#0b1f5f]">Insert</div>
          <div className="mt-3 grid gap-2">
            {[
              { kind: "text", label: "Add text" },
              { kind: "list", label: "Add bulleted list" },
              { kind: "image", label: "Add image" },
              { kind: "social", label: "Add social links" },
              { kind: "map", label: "Add map" },
              { kind: "button", label: "Add button" },
            ].map((tool) => (
              <button
                key={tool.kind}
                type="button"
                onClick={() => addWebsiteDesignerItem(tool.kind)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="text-sm font-semibold text-[#0b1f5f]">
            {selectedItem ? `${selectedItem.label} settings` : "Object settings"}
          </div>
          {!selectedItem ? (
            <div className="mt-3 text-sm text-gray-500">
              Select an object in the canvas to edit it.
            </div>
          ) : selectedItem.kind === "image" ? (
            <div className="mt-3 grid gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Replace image
              </div>
              {websiteDesignerMediaLoading ? (
                <div className="text-sm text-gray-500">Loading images...</div>
              ) : websiteDesignerMedia.length > 0 ? (
                <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1">
                  {websiteDesignerMedia.map((media) => (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() =>
                        updateWebsiteDesignerItem(
                          websiteDesignerSelectedSectionId,
                          websiteDesignerSelectedItemId,
                          { imageUrl: media.media_url },
                        )
                      }
                      className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-1 hover:border-fuchsia-400"
                    >
                      <img
                        src={media.media_url}
                        alt={media.caption_text || "Website library image"}
                        className="aspect-square h-auto w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Upload images in Content Studio first.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 grid gap-3">
              <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Content
                <textarea
                  rows={selectedItem.kind === "list" ? 5 : 4}
                  value={
                    selectedItem.kind === "list" || selectedItem.kind === "social"
                      ? (selectedItem.entries || []).join("\n")
                      : selectedItem.text || ""
                  }
                  onChange={(event) => {
                    const value = event.target.value;
                    updateWebsiteDesignerItem(
                      websiteDesignerSelectedSectionId,
                      websiteDesignerSelectedItemId,
                      selectedItem.kind === "list" || selectedItem.kind === "social"
                        ? {
                            entries: value
                              .split(/\r?\n/)
                              .map((entry) => entry.trim())
                              .filter(Boolean),
                          }
                        : { text: value },
                    );
                  }}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-fuchsia-500"
                />
              </label>
              {isTextLike ? (
                <>
                  <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Font size
                    <input
                      type="number"
                      min={12}
                      max={160}
                      value={selectedItem.fontSize || 20}
                      onChange={(event) =>
                        updateWebsiteDesignerItem(
                          websiteDesignerSelectedSectionId,
                          websiteDesignerSelectedItemId,
                          {
                            fontSize: Math.max(
                              12,
                              Math.min(160, Number(event.target.value) || 20),
                            ),
                          },
                        )
                      }
                      className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-fuchsia-500"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Text color
                      <input
                        type="color"
                        value={selectedItem.textColor || "#1f2937"}
                        onChange={(event) =>
                          updateWebsiteDesignerItem(
                            websiteDesignerSelectedSectionId,
                            websiteDesignerSelectedItemId,
                            { textColor: event.target.value },
                          )
                        }
                        className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white p-1"
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Background
                      <input
                        type="color"
                        value={
                          selectedItem.backgroundColor === "transparent"
                            ? "#ffffff"
                            : selectedItem.backgroundColor || "#ffffff"
                        }
                        onChange={(event) =>
                          updateWebsiteDesignerItem(
                            websiteDesignerSelectedSectionId,
                            websiteDesignerSelectedItemId,
                            { backgroundColor: event.target.value },
                          )
                        }
                        className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white p-1"
                      />
                    </label>
                  </div>
                  <div className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Alignment
                    <div className="flex gap-2">
                      {[
                        { key: "left", label: "Left" },
                        { key: "center", label: "Center" },
                        { key: "right", label: "Right" },
                      ].map((alignOption) => (
                        <button
                          key={alignOption.key}
                          type="button"
                          onClick={() =>
                            updateWebsiteDesignerItem(
                              websiteDesignerSelectedSectionId,
                              websiteDesignerSelectedItemId,
                              { align: alignOption.key },
                            )
                          }
                          className={[
                            "rounded-xl px-3 py-2 text-sm font-medium",
                            selectedItem.align === alignOption.key
                              ? "bg-[#2d0a7d] text-white"
                              : "border border-gray-200 bg-gray-50 text-gray-700",
                          ].join(" ")}
                        >
                          {alignOption.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderWebsitePreviewItem(item: any) {
    const alignClass =
      item.align === "center"
        ? "items-center text-center"
        : item.align === "right"
          ? "items-end text-right"
          : "items-start text-left";

    if (item.kind === "image") {
      return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/70 p-2">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.label || "Website image"}
              className={`h-auto w-full object-contain ${item.widthClass || ""}`}
            />
          ) : (
            <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
              No image selected
            </div>
          )}
        </div>
      );
    }

    if (item.kind === "list") {
      return (
        <ul
          className={`list-disc space-y-1 pl-5 ${alignClass}`}
          style={{
            fontSize: `${item.fontSize || 18}px`,
            color: item.textColor || "#1f2937",
            fontWeight: item.bold ? 700 : 500,
          }}
        >
          {(item.entries || []).map((entry: string, index: number) => (
            <li key={`${item.id}-preview-entry-${index}`}>{entry}</li>
          ))}
        </ul>
      );
    }

    if (item.kind === "social") {
      return (
        <div className={`flex flex-wrap gap-2 ${alignClass}`}>
          {(item.entries || []).map((entry: string, index: number) => (
            <span
              key={`${item.id}-preview-social-${index}`}
              className="rounded-full border border-white/60 bg-white/70 px-3 py-1"
              style={{
                fontSize: `${item.fontSize || 16}px`,
                color: item.textColor || "#1f2937",
                fontWeight: item.bold ? 700 : 500,
              }}
            >
              {entry}
            </span>
          ))}
        </div>
      );
    }

    if (item.kind === "map") {
      return (
        <div className="rounded-xl border border-gray-200 bg-white/80 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Map
          </div>
          <div
            className="mt-2"
            style={{
              fontSize: `${item.fontSize || 16}px`,
              color: item.textColor || "#1f2937",
              fontWeight: item.bold ? 700 : 500,
            }}
          >
            {item.text}
          </div>
        </div>
      );
    }

    if (item.kind === "button") {
      return (
        <span
          className="inline-flex rounded-full px-5 py-2"
          style={{
            fontSize: `${item.fontSize || 18}px`,
            color: item.textColor || "#ffffff",
            backgroundColor: item.backgroundColor || "#0b1f5f",
            fontWeight: item.bold ? 700 : 500,
          }}
        >
          {item.text}
        </span>
      );
    }

    return (
      <div
        className={alignClass}
        style={{
          fontSize: `${item.fontSize || 20}px`,
          color: item.textColor || "#1f2937",
          fontWeight: item.bold ? 700 : 500,
          lineHeight: 1.35,
          whiteSpace: "pre-wrap",
          backgroundColor:
            item.backgroundColor && item.backgroundColor !== "transparent"
              ? item.backgroundColor
              : "transparent",
        }}
      >
        {item.text}
      </div>
    );
  }

  async function publishWebsite() {
    if (!token) return;
    if (!savedSlug || websiteSlugEditing) {
      window.alert("Set and accept a website slug before publishing.");
      return;
    }

    setStatus(null);
    setWebsitePublishing(true);
    try {
      const layout =
        websiteLayoutMode === "MENU_STYLE" ? "MENU_BASED" : "ONE_PAGE";
      const [configRes, orgRes] = await Promise.all([
        fetch("/api/website-config", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            config: {
              page_name: savedSlug,
              layout,
            },
          }),
        }),
        fetch("/organizations", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            layout_key:
              websiteLayoutMode === "MENU_STYLE"
                ? "menu-style:live"
                : "single-page:live",
          }),
        }),
      ]);

      const configPayload = await configRes.json().catch(() => null);
      const orgPayload = await orgRes.json().catch(() => null);

      if (!configRes.ok) {
        setStatus(
          configPayload?.message ||
            `Website publish failed (${configRes.status}).`,
        );
        return;
      }
      if (!orgRes.ok) {
        setStatus(
          orgPayload?.message || `Website publish failed (${orgRes.status}).`,
        );
        return;
      }

      if (orgPayload) {
        setOrg(orgPayload);
      }
      setStatus("Website published.");
    } catch {
      setStatus("Unable to publish website.");
    } finally {
      setWebsitePublishing(false);
    }
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
            {
              key: "WEBSITE_PREVIEW" as WebsitePage,
              label: "Website Preview",
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
        <div className="grid gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-base font-semibold text-[#0b1f5f]">
                  Website Designer
                </div>
                <div className="mt-2 max-w-4xl text-sm text-gray-600">
                  Build your website as draggable sections. Generate a layout,
                  then edit the content directly. Switching between Single Page
                  and Menu Style keeps the same content and changes only the
                  layout.
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {websiteLayoutMode === "MENU_STYLE"
                      ? "Menu style"
                      : "Single page"}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {websiteDesignerSections.length} sections
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    Drag sections and objects to reorder
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={buildWebsiteDesignerSections}
                className="rounded-xl bg-[#2d0a7d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#240863]"
              >
                Generate Website
              </button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {websiteDesignerSections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-sm text-gray-500">
                  Click Generate Website to create an editable website layout.
                </div>
              ) : (
                <div className="grid gap-5">
                  {websiteLayoutMode === "MENU_STYLE" ? (
                    <div className="sticky top-0 z-10 rounded-2xl border border-gray-200 bg-white/95 p-4 backdrop-blur">
                      <div className="flex flex-wrap items-center gap-2">
                        {websiteDesignerSections.map((section) => (
                          <button
                            key={`menu-${section.id}`}
                            type="button"
                            onClick={() => {
                              setWebsiteDesignerSelectedSectionId(section.id);
                              setWebsiteDesignerSelectedItemId(
                                section.items?.[0]?.id ?? "",
                              );
                              if (typeof document !== "undefined") {
                                document
                                  .getElementById(`website-designer-${section.id}`)
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                              }
                            }}
                            className={[
                              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                              websiteDesignerSelectedSectionId === section.id
                                ? "bg-[#2d0a7d] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            ].join(" ")}
                          >
                            {section.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-5">
                    {websiteDesignerSections.map((section) => {
                      const isSectionSelected =
                        section.id === websiteDesignerSelectedSectionId;
                      return (
                        <section
                          key={section.id}
                          id={`website-designer-${section.id}`}
                          className={[
                            "rounded-3xl border p-5 shadow-sm transition-colors",
                            isSectionSelected
                              ? "border-fuchsia-400"
                              : "border-gray-200",
                          ].join(" ")}
                          style={{
                            backgroundColor:
                              section.backgroundColor || activePaletteColors[3],
                          }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => handleWebsiteDesignerSectionDrop(section.id)}
                        >
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <button
                              type="button"
                              draggable={section.id !== "home"}
                              onDragStart={() =>
                                section.id !== "home" &&
                                setWebsiteDesignerDragState({
                                  type: "section",
                                  sectionId: section.id,
                                })
                              }
                              onClick={() => {
                                setWebsiteDesignerSelectedSectionId(section.id);
                                setWebsiteDesignerSelectedItemId(
                                  section.items?.[0]?.id ?? "",
                                );
                              }}
                              className={[
                                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide",
                                section.id === "home"
                                  ? "cursor-default border-gray-200 bg-white text-gray-400"
                                  : "cursor-grab border-gray-200 bg-white text-gray-600",
                              ].join(" ")}
                              title={
                                section.id === "home"
                                  ? "Top section stays first"
                                  : "Drag section"
                              }
                            >
                              <span aria-hidden="true">:::</span>
                              <span>
                                {section.id === "home"
                                  ? "Top section fixed"
                                  : "Drag section"}
                              </span>
                            </button>
                            {!section.hideTitle ? (
                              <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                {section.label}
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="grid gap-4"
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => handleWebsiteDesignerItemDrop(section.id)}
                          >
                            {section.items.map((item: any) =>
                              renderWebsiteDesignerItem(section, item),
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {renderWebsiteDesignerToolbar()}
          </div>
        </div>
      ) : websitePage === "WEBSITE_PREVIEW" ? (
        <div className="grid gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-base font-semibold text-[#0b1f5f]">
                  Website Preview
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Preview the current website build before publishing it live.
                </div>
                <div className="mt-3 text-sm text-gray-700">
                  Public URL:{" "}
                  <span className="font-mono text-gray-600">
                    {fullWebsiteUrl}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={publishWebsite}
                disabled={websitePublishing}
                className="rounded-xl bg-[#2d0a7d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#240863] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {websitePublishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {websiteDesignerSections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-sm text-gray-500">
                Generate a website in Website Designer first to preview it here.
              </div>
            ) : (
              <div
                className="rounded-3xl border border-gray-200 p-5"
                style={{
                  background:
                    websiteLayoutMode === "MENU_STYLE"
                      ? "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
                      : "#ffffff",
                }}
              >
                {websiteLayoutMode === "MENU_STYLE" ? (
                  <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      {websiteDesignerSections.map((section) => (
                        <span
                          key={`preview-menu-${section.id}`}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700"
                        >
                          {section.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-5">
                  {websiteDesignerSections.map((section) => (
                    <section
                      key={`preview-${section.id}`}
                      className="rounded-3xl border border-gray-200 p-5 shadow-sm"
                      style={{
                        backgroundColor:
                          section.backgroundColor || activePaletteColors[3],
                      }}
                    >
                      {!section.hideTitle ? (
                        <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                          {section.label}
                        </div>
                      ) : null}
                      <div className="grid gap-4">
                        {(section.items || []).map((item: any) => (
                          <div key={`preview-item-${item.id}`}>
                            {renderWebsitePreviewItem(item)}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}
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
