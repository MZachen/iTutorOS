import { promises as fs } from "fs";
import path from "path";

export type WebsiteLayoutKey = "ONE_PAGE" | "MENU_BASED";
export type WebsiteThemeKey = "FUCHSIA_ZINC" | "OCEAN_ZINC" | "FOREST_ZINC";
export type WebsiteContentKey =
  | "business_info"
  | "locations"
  | "clients"
  | "tutors"
  | "services"
  | "subjects"
  | "topics"
  | "products"
  | "mission"
  | "about"
  | "teaching_style"
  | "company_description"
  | "images";
export type WebsiteSectionId =
  | "hero"
  | "about"
  | "services"
  | "subjects"
  | "topics"
  | "products"
  | "locations"
  | "tutors"
  | "clients"
  | "contact";
export type WebsiteBuilderAlignX = "left" | "center" | "right";
export type WebsiteBuilderAlignY = "top" | "middle" | "bottom";
export type WebsiteBuilderObjectId =
  | "hero-image"
  | "company-name"
  | "headline-text"
  | "subheadline-text"
  | "cta-button"
  | `custom-image-${string}`
  | `custom-text-${string}`
  | `custom-list-${string}`;
export type WebsiteBuilderObjectKind = "image" | "text" | "button";
export type WebsiteBuilderObject = {
  id: WebsiteBuilderObjectId;
  label: string;
  kind: WebsiteBuilderObjectKind;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignX: WebsiteBuilderAlignX;
  alignY: WebsiteBuilderAlignY;
  text_content?: string;
  image_url?: string;
  bg_color?: string;
};
export type WebsiteSectionImageLayout = {
  placement: "above" | "below";
  alignX: WebsiteBuilderAlignX;
  widthPercent: number;
};

export type WebsiteContentFlags = Record<WebsiteContentKey, boolean>;

export type WebsiteConfigPayload = {
  page_name: string;
  layout: WebsiteLayoutKey;
  color_theme: WebsiteThemeKey;
  content_flags: WebsiteContentFlags;
  headline_text: string;
  subheadline_text: string;
  company_description_text: string;
  mission_text: string;
  tutoring_style_text: string;
  about_us_text: string;
  cta_text: string;
  show_cta_button: boolean;
  show_contact_form: boolean;
  hero_image_url: string;
  image_urls: string[];
  section_order: WebsiteSectionId[];
  section_summaries: Partial<Record<WebsiteSectionId, string>>;
  section_image_urls: Partial<Record<WebsiteSectionId, string[]>>;
  section_image_layouts: Partial<Record<WebsiteSectionId, WebsiteSectionImageLayout>>;
  hidden_hero_object_ids: WebsiteBuilderObjectId[];
  builder_objects: WebsiteBuilderObject[];
  updated_at: string;
};

type WebsiteConfigStore = Record<string, WebsiteConfigPayload>;

const WEBSITE_CONTENT_KEYS: WebsiteContentKey[] = [
  "business_info",
  "locations",
  "clients",
  "tutors",
  "services",
  "subjects",
  "topics",
  "products",
  "mission",
  "about",
  "teaching_style",
  "company_description",
  "images",
];

const WEBSITE_SECTION_IDS: WebsiteSectionId[] = [
  "hero",
  "about",
  "services",
  "subjects",
  "topics",
  "products",
  "locations",
  "tutors",
  "clients",
  "contact",
];
const DEFAULT_SECTION_IMAGE_LAYOUT: WebsiteSectionImageLayout = {
  placement: "below",
  alignX: "left",
  widthPercent: 60,
};
const WEBSITE_HEADLINE_MAX_CHARS = 50;
const WEBSITE_SUBHEADLINE_MAX_CHARS = 100;
const WEBSITE_CTA_MAX_CHARS = 10;
const WEBSITE_BUILDER_OBJECT_IDS: WebsiteBuilderObjectId[] = [
  "hero-image",
  "company-name",
  "headline-text",
  "subheadline-text",
  "cta-button",
];
const WEBSITE_HERO_OBJECT_IDS: WebsiteBuilderObjectId[] = [
  "hero-image",
  "company-name",
  "headline-text",
  "subheadline-text",
];
const WEBSITE_BUILDER_OBJECTS_DEFAULT: WebsiteBuilderObject[] = [
  {
    id: "hero-image",
    label: "Hero image",
    kind: "image",
    x: 0,
    y: 0,
    width: 100,
    height: 48,
    fontSize: 16,
    color: "#1f2937",
    bold: false,
    italic: false,
    underline: false,
    alignX: "center",
    alignY: "middle",
  },
  {
    id: "company-name",
    label: "Company name",
    kind: "text",
    x: 4,
    y: 52,
    width: 92,
    height: 10,
    fontSize: 50,
    color: "#0b1f5f",
    bold: true,
    italic: false,
    underline: false,
    alignX: "left",
    alignY: "top",
  },
  {
    id: "headline-text",
    label: "Headline",
    kind: "text",
    x: 4,
    y: 63,
    width: 92,
    height: 11,
    fontSize: 40,
    color: "#111827",
    bold: true,
    italic: false,
    underline: false,
    alignX: "left",
    alignY: "top",
  },
  {
    id: "subheadline-text",
    label: "Subheadline",
    kind: "text",
    x: 4,
    y: 75,
    width: 92,
    height: 8,
    fontSize: 23,
    color: "#374151",
    bold: false,
    italic: false,
    underline: false,
    alignX: "left",
    alignY: "top",
  },
  {
    id: "cta-button",
    label: "CTA button",
    kind: "button",
    x: 4,
    y: 85,
    width: 30,
    height: 8,
    fontSize: 20,
    color: "#111827",
    bold: true,
    italic: false,
    underline: false,
    alignX: "left",
    alignY: "middle",
  },
];

const EMPTY_CONTENT_FLAGS: WebsiteContentFlags = {
  business_info: true,
  locations: true,
  clients: false,
  tutors: true,
  services: true,
  subjects: true,
  topics: true,
  products: true,
  mission: true,
  about: true,
  teaching_style: true,
  company_description: true,
  images: true,
};

const STORE_PATH = path.join(process.cwd(), ".cache", "website-configs.json");

export function normalizeWebsitePageName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function readText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim();
}

function readBoolean(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function readLayout(value: unknown): WebsiteLayoutKey {
  return value === "MENU_BASED" ? "MENU_BASED" : "ONE_PAGE";
}

function readTheme(value: unknown): WebsiteThemeKey {
  return value === "OCEAN_ZINC" || value === "FOREST_ZINC"
    ? value
    : "FUCHSIA_ZINC";
}

function readStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function clampLine(value: string, maxChars: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxChars);
}

function readNumber(value: unknown, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return value;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isBuilderObjectKind(value: unknown): value is WebsiteBuilderObjectKind {
  return value === "image" || value === "text" || value === "button";
}

function isBuilderAlignX(value: unknown): value is WebsiteBuilderAlignX {
  return value === "left" || value === "center" || value === "right";
}

function isBuilderAlignY(value: unknown): value is WebsiteBuilderAlignY {
  return value === "top" || value === "middle" || value === "bottom";
}

function isCustomBuilderObjectId(value: unknown): value is WebsiteBuilderObjectId {
  return (
    typeof value === "string" &&
    (value.startsWith("custom-image-") ||
      value.startsWith("custom-text-") ||
      value.startsWith("custom-list-"))
  );
}

function normalizeBuilderObject(
  raw: unknown,
  fallback: WebsiteBuilderObject,
): WebsiteBuilderObject {
  const input =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Partial<WebsiteBuilderObject>)
      : {};
  const widthMax = fallback.id === "hero-image" ? 300 : 100;
  const width = clampNumber(readNumber(input.width, fallback.width), 8, widthMax);
  const height = clampNumber(readNumber(input.height, fallback.height), 6, 300);
  const x = clampNumber(readNumber(input.x, fallback.x), 0, Math.max(0, 100 - width));
  const y = clampNumber(readNumber(input.y, fallback.y), 0, Math.max(0, 100 - height));
  return {
    id: fallback.id,
    label: readText(input.label, fallback.label),
    kind: isBuilderObjectKind(input.kind) ? input.kind : fallback.kind,
    x,
    y,
    width,
    height,
    fontSize: clampNumber(readNumber(input.fontSize, fallback.fontSize), 10, 120),
    color: readText(input.color, fallback.color),
    bold: readBoolean(input.bold, fallback.bold),
    italic: readBoolean(input.italic, fallback.italic),
    underline: readBoolean(input.underline, fallback.underline),
    alignX: isBuilderAlignX(input.alignX) ? input.alignX : fallback.alignX,
    alignY: isBuilderAlignY(input.alignY) ? input.alignY : fallback.alignY,
    text_content: readText(input.text_content, fallback.text_content ?? "").slice(
      0,
      5000,
    ),
    image_url: readText(input.image_url, fallback.image_url ?? ""),
    bg_color: readText(input.bg_color, fallback.bg_color ?? "transparent"),
  };
}

function readBuilderObjects(value: unknown): WebsiteBuilderObject[] {
  const source = Array.isArray(value) ? value : [];
  const byId = new Map<WebsiteBuilderObjectId, unknown>();
  const orderedIds: WebsiteBuilderObjectId[] = [];

  source.forEach((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return;
    const id = (item as { id?: unknown }).id;
    if (typeof id !== "string") return;
    const typedId =
      WEBSITE_BUILDER_OBJECT_IDS.includes(id as WebsiteBuilderObjectId) ||
      isCustomBuilderObjectId(id)
        ? (id as WebsiteBuilderObjectId)
        : null;
    if (!typedId) return;
    if (!byId.has(typedId)) {
      byId.set(typedId, item);
      orderedIds.push(typedId);
    }
  });

  WEBSITE_BUILDER_OBJECT_IDS.forEach((id) => {
    if (!orderedIds.includes(id)) orderedIds.push(id);
  });

  return orderedIds.map((id) => {
    const fallback = WEBSITE_BUILDER_OBJECTS_DEFAULT.find((item) => item.id === id) ?? {
      id,
      label: id.startsWith("custom-image-")
        ? "Image"
        : id.startsWith("custom-list-")
          ? "Bulleted list"
          : "Text",
      kind: id.startsWith("custom-image-") ? "image" : "text",
      x: 0,
      y: 0,
      width: id.startsWith("custom-image-") ? 70 : 80,
      height: id.startsWith("custom-image-") ? 20 : 12,
      fontSize: 24,
      color: "#111827",
      bold: false,
      italic: false,
      underline: false,
      alignX: "center",
      alignY: "middle",
      text_content: id.startsWith("custom-list-") ? "- Item" : "",
      image_url: "",
      bg_color: "transparent",
    };
    return normalizeBuilderObject(byId.get(id), fallback);
  });
}

function readContentFlags(value: unknown): WebsiteContentFlags {
  const input =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Partial<Record<WebsiteContentKey, unknown>>)
      : {};
  const next = { ...EMPTY_CONTENT_FLAGS };
  WEBSITE_CONTENT_KEYS.forEach((key) => {
    if (typeof input[key] === "boolean") {
      next[key] = Boolean(input[key]);
    }
  });
  return next;
}

function readSectionOrder(value: unknown): WebsiteSectionId[] {
  const candidate = readStringArray(value).filter((item): item is WebsiteSectionId =>
    WEBSITE_SECTION_IDS.includes(item as WebsiteSectionId),
  );
  if (candidate.length !== WEBSITE_SECTION_IDS.length) {
    return [...WEBSITE_SECTION_IDS];
  }
  return candidate;
}

function readSectionSummaries(value: unknown): Partial<Record<WebsiteSectionId, string>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const input = value as Partial<Record<WebsiteSectionId, unknown>>;
  const next: Partial<Record<WebsiteSectionId, string>> = {};
  WEBSITE_SECTION_IDS.forEach((sectionId) => {
    const raw = input[sectionId];
    if (typeof raw !== "string") return;
    next[sectionId] = raw.slice(0, 5000);
  });
  return next;
}

function readSectionImageUrls(value: unknown): Partial<Record<WebsiteSectionId, string[]>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const input = value as Partial<Record<WebsiteSectionId, unknown>>;
  const next: Partial<Record<WebsiteSectionId, string[]>> = {};
  WEBSITE_SECTION_IDS.forEach((sectionId) => {
    const raw = input[sectionId];
    if (!Array.isArray(raw)) return;
    const urls = Array.from(
      new Set(
        raw
          .map((item) => (typeof item === "string" ? item.trim() : ""))
          .filter(Boolean),
      ),
    );
    if (urls.length > 0) next[sectionId] = urls;
  });
  return next;
}

function readSectionImageLayouts(
  value: unknown,
): Partial<Record<WebsiteSectionId, WebsiteSectionImageLayout>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const input = value as Partial<Record<WebsiteSectionId, unknown>>;
  const next: Partial<Record<WebsiteSectionId, WebsiteSectionImageLayout>> = {};
  WEBSITE_SECTION_IDS.forEach((sectionId) => {
    const raw = input[sectionId];
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
    const record = raw as Partial<Record<string, unknown>>;
    const placement =
      record.placement === "above" || record.placement === "below"
        ? record.placement
        : DEFAULT_SECTION_IMAGE_LAYOUT.placement;
    const alignX =
      record.alignX === "left" || record.alignX === "center" || record.alignX === "right"
        ? record.alignX
        : DEFAULT_SECTION_IMAGE_LAYOUT.alignX;
    const widthRaw = Number(record.widthPercent);
    const widthPercent = Number.isFinite(widthRaw)
      ? Math.min(100, Math.max(20, widthRaw))
      : DEFAULT_SECTION_IMAGE_LAYOUT.widthPercent;
    next[sectionId] = {
      placement,
      alignX,
      widthPercent,
    };
  });
  return next;
}

function readHiddenHeroObjectIds(value: unknown): WebsiteBuilderObjectId[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value.filter((item): item is WebsiteBuilderObjectId =>
        typeof item === "string" &&
        WEBSITE_HERO_OBJECT_IDS.includes(item as WebsiteBuilderObjectId),
      ),
    ),
  );
}

export function sanitizeWebsiteConfig(value: unknown): WebsiteConfigPayload {
  const input =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Partial<WebsiteConfigPayload>)
      : {};
  return {
    page_name: normalizeWebsitePageName(readText(input.page_name)),
    layout: readLayout(input.layout),
    color_theme: readTheme(input.color_theme),
    content_flags: readContentFlags(input.content_flags),
    headline_text: clampLine(
      readText(input.headline_text),
      WEBSITE_HEADLINE_MAX_CHARS,
    ),
    subheadline_text: clampLine(
      readText(input.subheadline_text),
      WEBSITE_SUBHEADLINE_MAX_CHARS,
    ),
    company_description_text: readText(input.company_description_text),
    mission_text: readText(input.mission_text),
    tutoring_style_text: readText(input.tutoring_style_text),
    about_us_text: readText(input.about_us_text),
    cta_text: clampLine(readText(input.cta_text, "Get Started"), WEBSITE_CTA_MAX_CHARS),
    show_cta_button: readBoolean(input.show_cta_button, true),
    show_contact_form: readBoolean(input.show_contact_form, true),
    hero_image_url: readText(input.hero_image_url),
    image_urls: readStringArray(input.image_urls),
    section_order: readSectionOrder(input.section_order),
    section_summaries: readSectionSummaries(input.section_summaries),
    section_image_urls: readSectionImageUrls(input.section_image_urls),
    section_image_layouts: readSectionImageLayouts(input.section_image_layouts),
    hidden_hero_object_ids: readHiddenHeroObjectIds(input.hidden_hero_object_ids),
    builder_objects: readBuilderObjects(
      (input as Partial<WebsiteConfigPayload>).builder_objects,
    ),
    updated_at: new Date().toISOString(),
  };
}

async function readStore(): Promise<WebsiteConfigStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as WebsiteConfigStore;
  } catch {
    return {};
  }
}

async function writeStore(store: WebsiteConfigStore) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store), "utf8");
}

export async function getWebsiteConfigForOrg(orgId: string) {
  const store = await readStore();
  const existing = store[orgId];
  if (!existing) return null;
  return sanitizeWebsiteConfig(existing);
}

export async function saveWebsiteConfigForOrg(orgId: string, config: unknown) {
  const store = await readStore();
  const sanitized = sanitizeWebsiteConfig(config);
  store[orgId] = sanitized;
  await writeStore(store);
  return sanitized;
}
