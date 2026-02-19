import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getWebsiteConfigForOrg,
  normalizeWebsitePageName,
  sanitizeWebsiteConfig,
  type WebsiteBuilderObject,
  type WebsiteConfigPayload,
  type WebsiteSectionId,
  type WebsiteThemeKey,
} from "@/lib/website-config-store";

type PublicWebsitePageProps = {
  params: {
    slug: string;
  };
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseWebsiteLayout(layoutKey: string | null | undefined) {
  return (layoutKey ?? "").toLowerCase().includes("menu")
    ? "MENU_BASED"
    : "ONE_PAGE";
}

function parseWebsiteThemeFromPalette(
  paletteColor1: string | null | undefined,
): WebsiteThemeKey {
  const value = (paletteColor1 ?? "").toLowerCase();
  if (value === "#67e8f9") return "OCEAN_ZINC";
  if (value === "#86efac") return "FOREST_ZINC";
  return "FUCHSIA_ZINC";
}

function getWebsiteThemeColors(theme: WebsiteThemeKey): [string, string, string, string, string] {
  if (theme === "OCEAN_ZINC") {
    return ["#67e8f9", "#0f172a", "#e0f2fe", "#dbeafe", "#1e293b"];
  }
  if (theme === "FOREST_ZINC") {
    return ["#86efac", "#14532d", "#ecfdf5", "#dcfce7", "#14532d"];
  }
  return ["#ff9df9", "#0b1f5f", "#dff8ff", "#f5e9ff", "#1f2937"];
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getWebsiteBuilderObjectText(
  objectId: WebsiteBuilderObject["id"],
  websiteConfig: WebsiteConfigPayload,
  businessName: string | null | undefined,
) {
  if (objectId === "company-name") {
    return (businessName ?? "").trim() || "Business name";
  }
  if (objectId === "headline-text") {
    return websiteConfig.headline_text || "Your headline";
  }
  if (objectId === "subheadline-text") {
    return websiteConfig.subheadline_text || "Your subheadline";
  }
  if (objectId === "cta-button") {
    return websiteConfig.cta_text || "Get Started";
  }
  return "";
}

function estimateWebsiteBuilderMinRowPercent(
  object: WebsiteBuilderObject,
  textValue: string,
  stageWidth: number,
  stageHeight: number,
) {
  if (stageWidth <= 0 || stageHeight <= 0) return 0;
  if (object.id === "hero-image") {
    const heroWidthPercent = clampNumber(object.width, 8, 300);
    const heroWidthPx = (stageWidth * heroWidthPercent) / 100;
    const estimatedLogoAspectRatio = 3.2;
    const scaledHeightPx = heroWidthPx / estimatedLogoAspectRatio;
    const minPx = clampNumber(
      Math.max(140, stageHeight * 0.24, scaledHeightPx),
      140,
      stageHeight * 0.92,
    );
    return (minPx / stageHeight) * 100;
  }
  const horizontalPadding = object.id === "cta-button" ? 34 : 20;
  const availableWidthPx = Math.max(
    40,
    (stageWidth * object.width) / 100 - horizontalPadding,
  );
  const avgCharPx = Math.max(7, object.fontSize * 0.62);
  const charsPerLine = Math.max(4, Math.floor(availableWidthPx / avgCharPx));
  const textLength = Math.max(1, textValue.length);
  const lines = Math.max(1, Math.ceil(textLength / charsPerLine));
  const verticalPadding = object.id === "cta-button" ? 24 : 18;
  const minPx = lines * object.fontSize * 1.35 + verticalPadding;
  return (minPx / stageHeight) * 100;
}

function estimateWebsiteBuilderMinWidthPercent(
  object: WebsiteBuilderObject,
  textValue: string,
  stageWidth: number,
) {
  if (object.id === "hero-image") {
    return clampNumber(object.width, 8, 300);
  }
  if (stageWidth <= 0) return object.width;
  const avgCharPx = Math.max(7, object.fontSize * 0.62);
  const horizontalPadding = object.id === "cta-button" ? 38 : 20;
  const minWidthPx = textValue.length * avgCharPx + horizontalPadding;
  const minWidthPercent = (minWidthPx / stageWidth) * 100;
  return clampNumber(Math.max(object.width, minWidthPercent), 8, 100);
}

function getWebsiteBuilderRows(
  objects: WebsiteBuilderObject[],
  websiteConfig: WebsiteConfigPayload,
  stageWidth: number,
  stageHeight: number,
  businessName: string | null | undefined,
) {
  const hiddenHeroObjects = new Set(websiteConfig.hidden_hero_object_ids);
  const visibleObjects = objects.filter((object) => {
    if (object.id === "cta-button") {
      return false;
    }
    if (hiddenHeroObjects.has(object.id)) {
      return false;
    }
    return true;
  });

  const totalHeightWeight = visibleObjects.reduce((sum, object) => {
    return sum + Math.max(6, object.height);
  }, 0);

  const withBaseHeights = visibleObjects.map((object) => {
    const textValue = getWebsiteBuilderObjectText(
      object.id,
      websiteConfig,
      businessName,
    );
    const basePercent =
      totalHeightWeight > 0
        ? (Math.max(6, object.height) / totalHeightWeight) * 100
        : 0;
    const minRowPercent = estimateWebsiteBuilderMinRowPercent(
      object,
      textValue,
      stageWidth,
      stageHeight,
    );
    const contentWidthPercent = estimateWebsiteBuilderMinWidthPercent(
      object,
      textValue,
      stageWidth,
    );
    return {
      object,
      minRowPercent,
      contentWidthPercent,
      rowHeight: Math.max(basePercent, minRowPercent),
    };
  });

  let overflow =
    withBaseHeights.reduce((sum, row) => sum + row.rowHeight, 0) - 100;
  let adjusted = withBaseHeights;
  let guard = 0;
  while (overflow > 0.001 && guard < 8) {
    const reducibleTotal = adjusted.reduce((sum, row) => {
      return sum + Math.max(0, row.rowHeight - row.minRowPercent);
    }, 0);
    if (reducibleTotal <= 0) break;
    adjusted = adjusted.map((row) => {
      const reducible = Math.max(0, row.rowHeight - row.minRowPercent);
      if (reducible <= 0) return row;
      const delta = (overflow * reducible) / reducibleTotal;
      return {
        ...row,
        rowHeight: row.rowHeight - Math.min(reducible, delta),
      };
    });
    overflow = adjusted.reduce((sum, row) => sum + row.rowHeight, 0) - 100;
    guard += 1;
  }

  const totalHeightPercent = adjusted.reduce((sum, row) => sum + row.rowHeight, 0);
  const safeTotalHeightPercent = totalHeightPercent > 0 ? totalHeightPercent : 100;
  let cursorY = 0;
  const rows = adjusted.map((row, index) => {
    const rowTop = (cursorY / safeTotalHeightPercent) * 100;
    const normalizedHeight = (row.rowHeight / safeTotalHeightPercent) * 100;
    cursorY += row.rowHeight;
    return {
      ...row,
      rowTop,
      rowHeight: normalizedHeight,
      zIndex: index + 1,
    };
  });
  return {
    rows,
    heightScale: Math.max(1, safeTotalHeightPercent / 100),
  };
}

function mergeWebsiteConfig(
  baseConfig: WebsiteConfigPayload,
  savedConfig: WebsiteConfigPayload | null,
): WebsiteConfigPayload {
  if (!savedConfig) return baseConfig;
  return sanitizeWebsiteConfig({
    ...baseConfig,
    ...savedConfig,
    content_flags: {
      ...baseConfig.content_flags,
      ...savedConfig.content_flags,
    },
    image_urls:
      savedConfig.image_urls.length > 0
        ? savedConfig.image_urls
        : baseConfig.image_urls,
    section_order:
      savedConfig.section_order.length > 0
        ? savedConfig.section_order
        : baseConfig.section_order,
    hero_image_url: savedConfig.hero_image_url || baseConfig.hero_image_url,
  });
}

function getSectionAnchor(sectionId: WebsiteSectionId) {
  return `section-${sectionId}`;
}

function renderWebsiteTextBlock(value: string, className: string) {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) {
    return <p className={className}>No content yet.</p>;
  }
  const isBulletList = lines.every((line) => /^[-*•]\s+/.test(line));
  if (isBulletList) {
    return (
      <ul className={`${className} list-disc pl-5`}>
        {lines.map((line, index) => (
          <li key={`line-${index}`}>{line.replace(/^[-*•]\s+/, "")}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <p key={`line-${index}`}>{line}</p>
      ))}
    </div>
  );
}

export default async function PublicWebsitePage({ params }: PublicWebsitePageProps) {
  const slug = normalizeWebsitePageName(params.slug);
  if (!slug || slug.length < 3) notFound();

  const organization = await prisma.organization.findFirst({
    where: {
      archived_at: null,
      website_slug: {
        equals: slug,
        mode: "insensitive",
      },
      layout_key: {
        contains: ":live",
      },
    },
    include: {
      products: {
        orderBy: { product_name: "asc" },
      },
      locations: {
        where: { archived_at: null },
        orderBy: { location_name: "asc" },
        include: {
          servicesOffered: {
            where: { is_active: true },
            orderBy: { service_code: "asc" },
          },
        },
      },
      tutors: {
        where: { archived_at: null },
        orderBy: { created_at: "asc" },
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      },
      parents: {
        where: { archived_at: null },
        select: { id: true },
      },
      students: {
        where: { archived_at: null },
        select: { id: true },
      },
      catalogMedia: {
        where: { archived_at: null, media_type: "PHOTO" },
        orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
      },
    },
  });

  if (!organization) notFound();

  const [subjects, topics, savedConfig] = await Promise.all([
    prisma.subject.findMany({
      where: {
        archived_at: null,
        OR: [{ organization_id: organization.id }, { organization_id: null }],
      },
      orderBy: [{ sort_order: "asc" }, { subject_name: "asc" }],
    }),
    prisma.topic.findMany({
      where: {
        archived_at: null,
        OR: [{ organization_id: organization.id }, { organization_id: null }],
      },
      orderBy: [{ sort_order: "asc" }, { topic_name: "asc" }],
    }),
    getWebsiteConfigForOrg(organization.id),
  ]);

  const baseConfig = sanitizeWebsiteConfig({
    page_name: slug,
    layout: parseWebsiteLayout(organization.layout_key),
    color_theme: parseWebsiteThemeFromPalette(organization.palette_color_1),
    headline_text: organization.headline_text ?? "",
    subheadline_text: organization.slogan_text ?? "",
    company_description_text: organization.company_description_text ?? "",
    mission_text: organization.mission_text ?? "",
    tutoring_style_text: organization.tutoring_style_text ?? "",
    about_us_text: organization.about_us_text ?? organization.about_text ?? "",
    cta_text: organization.cta_text ?? "Get Started",
    show_cta_button: true,
    show_contact_form: true,
    hero_image_url: organization.catalogMedia[0]?.media_url ?? "",
    image_urls: organization.catalogMedia.map((media) => media.media_url),
  });

  const websiteConfig = mergeWebsiteConfig(baseConfig, savedConfig);
  const themeColors = getWebsiteThemeColors(websiteConfig.color_theme);
  const isMenuLayout = websiteConfig.layout === "MENU_BASED";
  const heroImageUrl =
    websiteConfig.hero_image_url || websiteConfig.image_urls[0] || "";
  const heroStageWidth = 1200;
  const heroStageHeight = Math.round((heroStageWidth * 11) / 16);
  const websiteBuilderLayout = getWebsiteBuilderRows(
    websiteConfig.builder_objects,
    websiteConfig,
    heroStageWidth,
    heroStageHeight,
    organization.business_name,
  );
  const websiteCtaObject =
    websiteConfig.builder_objects.find((object) => object.id === "cta-button") ??
    null;

  const services = organization.locations
    .flatMap((location) => location.servicesOffered)
    .filter((service, index, items) => {
      const label = (service.display_name?.trim() || service.service_code).toLowerCase();
      return (
        items.findIndex(
          (item) =>
            (item.display_name?.trim() || item.service_code).toLowerCase() ===
            label,
        ) === index
      );
    });

  const tutorNames = organization.tutors
    .map((tutor) =>
      `${tutor.user.first_name ?? ""} ${tutor.user.last_name ?? ""}`.trim(),
    )
    .filter(Boolean);

  const sectionRows: Array<{
    id: WebsiteSectionId;
    title: string;
    enabled: boolean;
    summary: string;
  }> = [
    {
      id: "hero",
      title: "Hero",
      enabled: true,
      summary: websiteConfig.headline_text || organization.business_name || "Headline",
    },
    {
      id: "about",
      title: "About",
      enabled:
        websiteConfig.content_flags.company_description ||
        websiteConfig.content_flags.mission ||
        websiteConfig.content_flags.about ||
        websiteConfig.content_flags.teaching_style,
      summary:
        websiteConfig.company_description_text ||
        websiteConfig.about_us_text ||
        "Company story",
    },
    {
      id: "services",
      title: "Services",
      enabled: websiteConfig.content_flags.services && services.length > 0,
      summary: services
        .map((service) => service.display_name ?? service.service_code)
        .slice(0, 3)
        .join(", "),
    },
    {
      id: "subjects",
      title: "Subjects",
      enabled: websiteConfig.content_flags.subjects && subjects.length > 0,
      summary: subjects
        .map((subject) => subject.subject_name)
        .slice(0, 3)
        .join(", "),
    },
    {
      id: "topics",
      title: "Topics",
      enabled: websiteConfig.content_flags.topics && topics.length > 0,
      summary: topics.map((topic) => topic.topic_name).slice(0, 3).join(", "),
    },
    {
      id: "products",
      title: "Products",
      enabled:
        websiteConfig.content_flags.products && organization.products.length > 0,
      summary: organization.products
        .map((product) => product.product_name)
        .slice(0, 3)
        .join(", "),
    },
    {
      id: "locations",
      title: "Locations",
      enabled:
        websiteConfig.content_flags.locations && organization.locations.length > 0,
      summary: organization.locations
        .map((location) => location.location_name)
        .slice(0, 3)
        .join(", "),
    },
    {
      id: "tutors",
      title: "Tutors",
      enabled: websiteConfig.content_flags.tutors && tutorNames.length > 0,
      summary: tutorNames.slice(0, 3).join(", "),
    },
    {
      id: "clients",
      title: "Clients",
      enabled:
        websiteConfig.content_flags.clients &&
        (organization.parents.length > 0 || organization.students.length > 0),
      summary: `${organization.parents.length} families - ${organization.students.length} students`,
    },
    {
      id: "contact",
      title: "Contact form",
      enabled: websiteConfig.show_contact_form,
      summary: "Lead capture form",
    },
  ];

  const sectionRowsWithSummary = sectionRows.map((section) => {
    const override = (websiteConfig.section_summaries[section.id] ?? "").trim();
    return {
      ...section,
      summary: override || section.summary,
    };
  });

  const orderedSections = [...sectionRowsWithSummary].sort((a, b) => {
    const aIndex = websiteConfig.section_order.indexOf(a.id);
    const bIndex = websiteConfig.section_order.indexOf(b.id);
    const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return safeA - safeB;
  });
  const visibleSections = orderedSections.filter((section) => section.enabled);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: themeColors[2],
        color: themeColors[4],
      }}
    >
      {isMenuLayout ? (
        <header
          className="sticky top-0 z-20 border-b border-white/20 px-4 py-3 text-sm font-semibold text-white sm:px-6"
          style={{ backgroundColor: themeColors[1] }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2">
            <span className="mr-3 text-base">{organization.business_name}</span>
            {visibleSections.map((section) => (
              <a
                key={`website-nav-${section.id}`}
                href={`#${getSectionAnchor(section.id)}`}
                className="rounded-full bg-white/15 px-3 py-1"
              >
                {section.title}
              </a>
            ))}
          </div>
        </header>
      ) : null}

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div
          className="overflow-hidden rounded-2xl border border-gray-200"
          style={{ backgroundColor: themeColors[2] }}
        >
          <section
            id={getSectionAnchor("hero")}
            className="overflow-hidden rounded-xl border-b border-gray-200 bg-white"
          >
            <div
              className="relative overflow-hidden border-b border-gray-200 bg-white"
              style={{ aspectRatio: `16 / ${11 * websiteBuilderLayout.heightScale}` }}
            >
              {websiteBuilderLayout.rows.map((row) => {
                const { object } = row;
                const textValue = getWebsiteBuilderObjectText(
                  object.id,
                  websiteConfig,
                  organization.business_name,
                );
                const fontWeight = object.bold ? 700 : 500;
                const textDecoration = object.underline ? "underline" : "none";
                const fontStyle = object.italic ? "italic" : "normal";
                const justifyContent =
                  object.alignX === "left"
                    ? "flex-start"
                    : object.alignX === "right"
                      ? "flex-end"
                      : "center";
                const alignItems =
                  object.alignY === "top"
                    ? "flex-start"
                    : object.alignY === "bottom"
                      ? "flex-end"
                      : "center";
                const contentWidth = `${row.contentWidthPercent}%`;
                return (
                  <div
                    key={`website-live-row-${object.id}`}
                    className="absolute left-0 w-full border-b border-gray-100 last:border-b-0"
                    style={{
                      top: `${row.rowTop}%`,
                      height: `${row.rowHeight}%`,
                      zIndex: row.zIndex,
                    }}
                  >
                    <div
                      className={`flex h-full w-full ${
                        object.id === "hero-image" ? "" : "p-1"
                      }`}
                      style={{ justifyContent, alignItems }}
                    >
                      <div
                        className={`${
                          object.id === "cta-button"
                            ? "rounded-full px-4 py-2"
                            : "rounded-md"
                        }`}
                        style={{
                          width: contentWidth,
                          height: "auto",
                          maxHeight: object.id === "hero-image" ? "none" : "100%",
                          overflow: "visible",
                          backgroundColor:
                            object.kind === "button" ? themeColors[0] : undefined,
                        }}
                      >
                        {object.id === "hero-image" ? (
                          heroImageUrl ? (
                            <img
                              src={heroImageUrl}
                              alt={`${organization.business_name} hero`}
                              className="block h-auto w-full object-contain"
                            />
                          ) : (
                            <div
                              className="h-[140px] w-full"
                              style={{ backgroundColor: themeColors[3] }}
                            />
                          )
                        ) : object.id === "cta-button" ? (
                          <a
                            href={`#${getSectionAnchor("contact")}`}
                            className="flex h-full w-full items-center justify-center"
                            style={{
                              color: object.color,
                              fontSize: `${object.fontSize}px`,
                              fontWeight,
                              fontStyle,
                              textDecoration,
                              lineHeight: 1.2,
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              overflowWrap: "anywhere",
                              textAlign: "center",
                            }}
                          >
                            {textValue || object.label}
                          </a>
                        ) : (
                          <div
                            className="h-full w-full px-2 py-1"
                            style={{
                              color: object.color,
                              fontSize: `${object.fontSize}px`,
                              fontWeight,
                              fontStyle,
                              textDecoration,
                              lineHeight: 1.2,
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {textValue || object.label}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid gap-3 p-4">
            {orderedSections
              .filter((section) => section.enabled && section.id !== "hero")
              .map((section) => (
                <section
                  key={`website-section-${section.id}`}
                  id={getSectionAnchor(section.id)}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <h2 className="text-sm font-semibold text-[#0b1f5f]">
                    {section.title}
                  </h2>
                  <div className="mt-1 text-sm text-gray-600">
                    {renderWebsiteTextBlock(section.summary || "", "space-y-1")}
                  </div>
                  {(websiteConfig.section_image_urls[section.id] ?? []).length > 0 ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(websiteConfig.section_image_urls[section.id] ?? []).map(
                        (url, imageIndex) => (
                          <div
                            key={`live-section-image-${section.id}-${imageIndex}-${url}`}
                            className="aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                          >
                            <img
                              src={url}
                              alt={`${section.title} media`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  ) : null}
                  {section.id === "contact" ? (
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      <input
                        className="h-10 rounded-xl border border-gray-200 px-3 text-sm"
                        placeholder="Parent name"
                      />
                      <input
                        className="h-10 rounded-xl border border-gray-200 px-3 text-sm"
                        placeholder="Email"
                      />
                      <input
                        className="h-10 rounded-xl border border-gray-200 px-3 text-sm"
                        placeholder="Phone"
                      />
                      <input
                        className="h-10 rounded-xl border border-gray-200 px-3 text-sm"
                        placeholder="Student needs"
                      />
                      {websiteConfig.show_cta_button ? (
                        <div
                          className="mt-2 md:col-span-2"
                          style={{
                            textAlign:
                              websiteCtaObject?.alignX === "right"
                                ? "right"
                                : websiteCtaObject?.alignX === "center"
                                  ? "center"
                                  : "left",
                          }}
                        >
                          <a
                            href={`#${getSectionAnchor("contact")}`}
                            className="inline-flex items-center justify-center rounded-full px-4 py-2"
                            style={{
                              backgroundColor: themeColors[0],
                              color: websiteCtaObject?.color ?? "#111827",
                              fontSize: `${websiteCtaObject?.fontSize ?? 18}px`,
                              fontWeight: websiteCtaObject?.bold ? 700 : 500,
                              fontStyle: websiteCtaObject?.italic
                                ? "italic"
                                : "normal",
                              textDecoration: websiteCtaObject?.underline
                                ? "underline"
                                : "none",
                            }}
                          >
                            {websiteConfig.cta_text || "Get Started"}
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </section>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
