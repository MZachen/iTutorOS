"use client";

import {
  Fragment,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useSettingsForm } from "@/lib/useSettingsForm";
import { makeUniqueServiceCode } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DATE_FORMAT_OPTIONS,
  DEFAULT_DATE_FORMAT,
  formatDateWithPattern,
  normalizeDateFormat,
} from "@/lib/date-format";
import {
  CLIENT_FIELDS_STORAGE_KEY,
  PARENT_FIELDS,
  STUDENT_FIELDS,
  defaultClientFieldPrefs,
  normalizeClientFieldPrefs,
  saveClientFieldPrefs,
  type ClientFieldPrefs,
} from "@/lib/client-fields";
import {
  defaultPipelineSources,
  loadPipelineSources,
  makeEmailSource,
  savePipelineSources,
  type PipelineSourceSetting,
} from "@/lib/pipeline-sources";
import {
  CONNECTION_PROVIDERS,
  getConnectionProvider,
  type ConnectionProviderId,
} from "@/lib/connections";
import { DEFAULT_SERVICE_NAMES, DEFAULT_SUBJECTS } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClampedCell } from "@/components/ui/clamped-cell";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArchiveIcon,
  BookOpen01Icon,
  Building04Icon,
  Calendar01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Copy01Icon,
  CreditCardIcon,
  Link01Icon,
  Location01Icon,
  MarketingIcon,
  PackageIcon,
  PipelineIcon,
  ServiceIcon,
  UserGroupIcon,
  WebDesign01Icon,
} from "@hugeicons/core-free-icons";

type Me = {
  user_id: string;
  organization_id: string;
  roles: string[];
  isOwner: boolean;
  isAdmin: boolean;
  isTutor: boolean;
};

type Org = {
  id: string;
  business_name: string;
  timezone: string;
  default_buffer_minutes: number;
  business_phone: string | null;
  business_email: string | null;
  date_format?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  business_address_1: string | null;
  business_address_2: string | null;
  business_city: string | null;
  business_state: string | null;
  business_zip: string | null;
  subscription_plan?: string | null;
  company_description_text?: string | null;
  about_us_text?: string | null;
  slogan_text?: string | null;
  headline_text?: string | null;
  about_text?: string | null;
  mission_text?: string | null;
  tutoring_style_text?: string | null;
  testimonials_text?: string | null;
  cta_text?: string | null;
  images?: Array<{
    id: string;
    image_url: string;
    image_type?: string | null;
    archived_at?: string | null;
  }>;
};

type Location = {
  id: string;
  location_name: string;
  is_virtual: boolean;
  is_system?: boolean | null;
  location_address_1?: string | null;
  location_address_2?: string | null;
  location_city?: string | null;
  location_state?: string | null;
  location_zip?: string | null;
  archived_at?: string | null;
};

type Room = {
  id: string;
  location_id: string;
  room_name: string;
  room_number?: string | null;
  floor_number?: string | null;
  archived_at?: string | null;
};

type Parent = {
  id: string;
  parent1_first_name?: string | null;
  parent1_last_name?: string | null;
  archived_at?: string | null;
  students?: Array<{
    id: string;
    first_name: string;
    last_name: string;
    archived_at?: string | null;
    location_id?: string;
  }>;
};

type Student = {
  id: string;
  parent_id: string;
  location_id?: string | null;
  first_name: string;
  last_name: string;
  archived_at?: string | null;
};

type Lead = {
  id: string;
  parent_first_name?: string | null;
  parent_last_name?: string | null;
  created_at?: string | null;
  archived_at?: string | null;
};

type EmailInbox = {
  id: string;
  provider: "GMAIL" | "OUTLOOK" | "IMAP";
  auth_type: "OAUTH" | "IMAP";
  address: string;
  label?: string | null;
  enabled: boolean;
  daily_scan_enabled: boolean;
  daily_scan_time?: string | null;
  last_scan_at?: string | null;
  has_credentials?: boolean;
  archived_at?: string | null;
  imap_host?: string | null;
  imap_port?: number | null;
  imap_secure?: boolean | null;
};

type Tutor = {
  id: string;
  color_hex?: string | null;
  archived_at?: string | null;
  user?: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
  };
};

type ServiceOffered = {
  id: string;
  location_id: string;
  service_code: string;
  hourly_rate_cents: number;
  capacity: number;
  unit_length_minutes?: number | null;
  display_name?: string | null;
  description_text?: string | null;
  service_logo_url?: string | null;
  is_active: boolean;
};

type Subject = {
  id: string;
  subject_name: string;
  description_text?: string | null;
  archived_at?: string | null;
};

type Topic = {
  id: string;
  subject_id: string;
  topic_name: string;
  description_text?: string | null;
  archived_at?: string | null;
};

type Product = {
  id: string;
  product_name: string;
  product_type: string;
  product_slogan_text?: string | null;
  product_description_text?: string | null;
  product_logo_url?: string | null;
  service_code?: string | null;
  subject_id?: string | null;
  topic_id?: string | null;
};

type CatalogMedia = {
  id: string;
  media_type: "PHOTO" | "VIDEO";
  media_url: string;
  caption_text?: string | null;
  sort_order?: number | null;
  archived_at?: string | null;
};

type MarketingTab =
  | "IMAGE_LIBRARY"
  | "SERVICES"
  | "SUBJECTS"
  | "TOPICS"
  | "COMPANY"
  | "PRODUCTS";
type MarketingSection = "PLATFORMS" | "POST_BUILDER";
type SocialSourceType = "" | "PRODUCTS" | "SERVICES" | "SUBJECTS" | "TOPICS";

type ProductDraft = {
  id?: string | null;
  product_name: string;
  product_slogan_text: string;
  product_description_text: string;
  product_logo_url: string;
  service_code: string;
  subject_id: string;
  topic_id: string;
};

type SocialPostDraft = {
  platform_ids: ConnectionProviderId[];
  product_id: string;
  subject_id: string;
  topic_id: string;
  service_code: string;
  template_style: string;
  layout_preset: string;
  aspect_ratio: string;
  headline: string;
  call_to_action: string;
  start_date: string;
  end_date: string;
  age_range: string;
  price_detail: string;
  location_detail: string;
  enrollment_link: string;
  company_description: string;
  about_us: string;
  slogan: string;
  hashtags: string;
  extra_notes: string;
  generated_copy: string;
  generated_image_url: string;
  selected_media_ids: string[];
  selected_template_id: string;
};

type SocialTemplateAsset = {
  id: string;
  name: string;
  data_url: string;
};

type TopicDraft = {
  key: string;
  id?: string;
  name: string;
  included: boolean;
  is_catalog: boolean;
};

type SubjectDraft = {
  key: string;
  id?: string;
  name: string;
  included: boolean;
  topics: TopicDraft[];
  is_catalog: boolean;
};

type PipelineSettings = {
  sources: PipelineSourceSetting[];
};

type ConnectionFieldSnapshot = {
  has_value: boolean;
  value?: string;
};

type ConnectionSnapshot = {
  provider: ConnectionProviderId;
  fields: Record<string, ConnectionFieldSnapshot>;
  connected: boolean;
  connected_at: string | null;
  updated_at: string | null;
};

type ServiceDraft = {
  key: string;
  id?: string;
  name: string;
  is_active: boolean;
  hourly_rate_dollars: string;
  unit_length_minutes: string;
  capacity: string;
  is_catalog: boolean;
  existing?: ServiceOffered | null;
};

type ArchiveType =
  | "PARENTS"
  | "STUDENTS"
  | "LEADS"
  | "LOCATIONS"
  | "ROOMS"
  | "SERVICES"
  | "SUBJECTS"
  | "TOPICS";

type ArchiveRow = {
  id: string;
  label: string;
  archived: boolean;
  type: ArchiveType;
  locked?: boolean;
};

type ArchiveOp = {
  type: ArchiveType;
  id: string;
  archived: boolean;
  label: string;
};

type SettingsTab =
  | "ACCOUNT"
  | "BUSINESS"
  | "LOCATIONS"
  | "CLIENTS"
  | "TUTORS"
  | "SERVICES"
  | "SUBJECTS_TOPICS"
  | "PRODUCTS"
  | "SCHEDULE"
  | "PIPELINE"
  | "CONNECTIONS"
  | "MARKETING"
  | "WEBSITE"
  | "ARCHIVE";

const ALL_TABS: { key: SettingsTab; label: string; icon: any }[] = [
  { key: "ACCOUNT", label: "Account and Billing", icon: CreditCardIcon },
  { key: "BUSINESS", label: "Business Info", icon: Building04Icon },
  { key: "LOCATIONS", label: "Locations", icon: Location01Icon },
  { key: "CLIENTS", label: "Clients", icon: UserGroupIcon },
  { key: "TUTORS", label: "Tutors", icon: UserGroupIcon },
  { key: "SERVICES", label: "Services", icon: ServiceIcon },
  { key: "SUBJECTS_TOPICS", label: "Subjects/Topics", icon: BookOpen01Icon },
  { key: "SCHEDULE", label: "Schedule", icon: Calendar01Icon },
  { key: "PIPELINE", label: "Pipeline", icon: PipelineIcon },
  { key: "CONNECTIONS", label: "Connections", icon: Link01Icon },
  { key: "PRODUCTS", label: "Content Studio", icon: PackageIcon },
  { key: "MARKETING", label: "Marketing", icon: MarketingIcon },
  { key: "WEBSITE", label: "Website", icon: WebDesign01Icon },
  { key: "ARCHIVE", label: "Archive", icon: ArchiveIcon },
];

const TAB_HEADINGS: Partial<Record<SettingsTab, string>> = {
  PRODUCTS: "Content Studio",
};

const TAB_DIVIDERS = new Set<SettingsTab>(["PRODUCTS", "ARCHIVE"]);

const SETTINGS_TAB_ICON_COLORS: Record<SettingsTab, string> = {
  ACCOUNT: "#048519",
  BUSINESS: "#0a8e96",
  LOCATIONS: "#960a2e",
  CLIENTS: "#af88e9",
  TUTORS: "#d1f604",
  SERVICES: "#ff0000",
  SUBJECTS_TOPICS: "#00ffb4",
  PRODUCTS: "#857046",
  SCHEDULE: "#c00f5e",
  PIPELINE: "#04c1ff",
  CONNECTIONS: "#d77400",
  MARKETING: "#ffc000",
  WEBSITE: "#c000ff",
  ARCHIVE: "#ff0060",
};

const CONTENT_STUDIO_TABS: { key: MarketingTab; label: string }[] = [
  { key: "IMAGE_LIBRARY", label: "Image Library" },
  { key: "SERVICES", label: "Services" },
  { key: "SUBJECTS", label: "Subjects" },
  { key: "TOPICS", label: "Topics" },
  { key: "COMPANY", label: "Company" },
  { key: "PRODUCTS", label: "Products" },
];
const MARKETING_SECTIONS: { key: MarketingSection; label: string }[] = [
  { key: "POST_BUILDER", label: "Social Media Post Builder" },
  { key: "PLATFORMS", label: "Marketing Platforms" },
];

const SOCIAL_DRAFT_STORAGE_KEY = "itutoros:social-post-draft";

const SOCIAL_TEMPLATE_STYLES = [
  "Class announcement",
  "Enrollment reminder",
  "Seasonal promo",
  "Open house invite",
  "Success story",
  "New product launch",
] as const;

const SOCIAL_LAYOUT_PRESETS = [
  "Bold headline",
  "Band rows",
  "Photo + footer",
  "Schedule list",
] as const;

type SocialLayoutPreset = (typeof SOCIAL_LAYOUT_PRESETS)[number];

const SOCIAL_LAYOUT_PRESET_FILE_KEYS: Record<SocialLayoutPreset, string> = {
  "Bold headline": "bold_headline",
  "Band rows": "band_rows",
  "Photo + footer": "photo_footer",
  "Schedule list": "schedule_list",
};

const SOCIAL_ASPECT_RATIOS = [
  { value: "1:1", label: "Square 1:1 (1080x1080)", width: 1080, height: 1080 },
  {
    value: "4:5",
    label: "Portrait 4:5 (1080x1350)",
    width: 1080,
    height: 1350,
  },
  {
    value: "16:9",
    label: "Landscape 16:9 (1600x900)",
    width: 1600,
    height: 900,
  },
  { value: "9:16", label: "Story 9:16 (1080x1920)", width: 1080, height: 1920 },
] as const;

type SocialAspectRatioValue = (typeof SOCIAL_ASPECT_RATIOS)[number]["value"];

const SOCIAL_ASPECT_RATIO_FILE_KEYS: Record<SocialAspectRatioValue, string> = {
  "1:1": "square",
  "4:5": "portrait",
  "16:9": "landscape",
  "9:16": "story",
};

const SOCIAL_PRESET_CAROUSEL_ITEMS: Array<{
  id: string;
  layout_preset: SocialLayoutPreset;
  aspect_ratio: SocialAspectRatioValue;
  selected_src: string;
  unselected_src: string;
  label: string;
}> = (
  Object.keys(SOCIAL_ASPECT_RATIO_FILE_KEYS) as SocialAspectRatioValue[]
).flatMap((ratio) =>
  SOCIAL_LAYOUT_PRESETS.map((preset) => {
    const ratioKey = SOCIAL_ASPECT_RATIO_FILE_KEYS[ratio];
    const presetKey = SOCIAL_LAYOUT_PRESET_FILE_KEYS[preset];
    return {
      id: `${ratio}|${preset}`,
      layout_preset: preset,
      aspect_ratio: ratio,
      selected_src: `/social-template-presets/${ratioKey}_social_template_${presetKey}_selected.png`,
      unselected_src: `/social-template-presets/${ratioKey}_social_template_${presetKey}_unselected.png`,
      label: `${ratio} · ${preset}`,
    };
  }),
);

const SOCIAL_PLATFORM_SPECS: Record<
  ConnectionProviderId,
  { sizes: string[]; ratios: string[]; notes: string[] }
> = {
  facebook: {
    sizes: ["1080x1080", "1200x630"],
    ratios: ["1:1", "1.91:1"],
    notes: ["Feed posts, link shares"],
  },
  messenger: {
    sizes: ["1080x1080"],
    ratios: ["1:1"],
    notes: ["Message attachments"],
  },
  instagram: {
    sizes: ["1080x1350", "1080x1080"],
    ratios: ["4:5", "1:1"],
    notes: ["Feed, carousel cover"],
  },
  tiktok: {
    sizes: ["1080x1920"],
    ratios: ["9:16"],
    notes: ["Vertical video cover"],
  },
  x: {
    sizes: ["1600x900", "1080x1080"],
    ratios: ["16:9", "1:1"],
    notes: ["Timeline images"],
  },
  linkedin: {
    sizes: ["1200x627", "1080x1080"],
    ratios: ["1.91:1", "1:1"],
    notes: ["Company or personal posts"],
  },
  snapchat: {
    sizes: ["1080x1920"],
    ratios: ["9:16"],
    notes: ["Story formats"],
  },
  pinterest: {
    sizes: ["1000x1500"],
    ratios: ["2:3"],
    notes: ["Pins"],
  },
  youtube: {
    sizes: ["1280x720", "1080x1920"],
    ratios: ["16:9", "9:16"],
    notes: ["Community post, Shorts"],
  },
  whatsapp: {
    sizes: ["1080x1080", "1080x1920"],
    ratios: ["1:1", "9:16"],
    notes: ["Broadcasts, status"],
  },
};

const EMPTY_PRODUCT_DRAFT: ProductDraft = {
  id: null,
  product_name: "",
  product_slogan_text: "",
  product_description_text: "",
  product_logo_url: "",
  service_code: "",
  subject_id: "",
  topic_id: "",
};

const EMPTY_SOCIAL_DRAFT: SocialPostDraft = {
  platform_ids: [],
  product_id: "",
  subject_id: "",
  topic_id: "",
  service_code: "",
  template_style: "",
  layout_preset: "",
  aspect_ratio: "",
  headline: "",
  call_to_action: "",
  start_date: "",
  end_date: "",
  age_range: "",
  price_detail: "",
  location_detail: "",
  enrollment_link: "",
  company_description: "",
  about_us: "",
  slogan: "",
  hashtags: "",
  extra_notes: "",
  generated_copy: "",
  generated_image_url: "",
  selected_media_ids: [],
  selected_template_id: "",
};

const UNIT_LENGTH_TOOLTIP =
  "A unit length is not necessarily the full session duration. Example: Private tutoring can be priced at $100 per 45-minute unit. Camps can use a 60-minute unit at $25; an 8-hour day would be 8 units x $25 = $200.";

const DEFAULT_TUTOR_COLOR = "#7c3aed";

const ARCHIVE_OPTIONS: { key: ArchiveType; label: string }[] = [
  { key: "PARENTS", label: "Parents" },
  { key: "STUDENTS", label: "Students" },
  { key: "LEADS", label: "Leads" },
  { key: "LOCATIONS", label: "Locations" },
  { key: "ROOMS", label: "Rooms" },
  { key: "SERVICES", label: "Services" },
  { key: "SUBJECTS", label: "Subjects" },
  { key: "TOPICS", label: "Topics" },
];

const ARCHIVE_LABELS = ARCHIVE_OPTIONS.reduce(
  (acc, option) => {
    acc[option.key] = option.label;
    return acc;
  },
  {} as Record<ArchiveType, string>,
);

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function planLabel(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic-plus") return "Basic+";
  if (key === "pro") return "Pro";
  if (key === "enterprise") return "Enterprise";
  return "Basic";
}

function planLocationLimit(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "enterprise") return null;
  return 1;
}

function planLeadLimit(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic") return 10;
  if (key === "basic-plus") return 25;
  if (key === "pro") return 100;
  return null;
}

function planTutorLimit(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic") return 1;
  if (key === "basic-plus") return 3;
  if (key === "pro") return 10;
  return null;
}

type PlanKey = "basic" | "basic-plus" | "pro" | "enterprise";

const PLAN_ORDER: PlanKey[] = ["basic", "basic-plus", "pro", "enterprise"];

function normalizePlanKey(plan: string | null | undefined): PlanKey {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic-plus" || key === "pro" || key === "enterprise") return key;
  return "basic";
}

function formatPlanLimit(value: number | null) {
  return value == null ? "Unlimited" : String(value);
}

function planSpecsFor(plan: PlanKey) {
  return [
    { label: "Locations", value: formatPlanLimit(planLocationLimit(plan)) },
    { label: "Lead capacity", value: formatPlanLimit(planLeadLimit(plan)) },
    { label: "Tutors", value: formatPlanLimit(planTutorLimit(plan)) },
  ];
}

function planCardColor(plan: PlanKey) {
  if (plan === "basic") return "#ffeaea";
  if (plan === "basic-plus") return "#fffde3";
  if (plan === "pro") return "#f0f0ff";
  return "#e7fee8";
}

function connectionCardGradient(providerId: ConnectionProviderId) {
  switch (providerId) {
    case "facebook":
      return "linear-gradient(to bottom right, #20a2f0, #006cee)";
    case "messenger":
      return "linear-gradient(to bottom right, #1f87f8 0%, #9f3dec 50%, #f05672 100%)";
    case "instagram":
      return "linear-gradient(to bottom right, #1c8bf7 0%, #b938db 40%, #fc4061 70%, #f7dd0c 100%)";
    case "tiktok":
      return "linear-gradient(to bottom right, #65efe0 0%, #000000 50%, #d73355 100%)";
    case "x":
      return "linear-gradient(to bottom right, #000000 0%, #ffffff 50%, #000000 100%)";
    case "linkedin":
      return "linear-gradient(to bottom right, #0f63c3 0%, #ffffff 50%, #0f63c3 100%)";
    case "snapchat":
      return "linear-gradient(to bottom right, #feff01 0%, #ffffff 50%, #feff01 100%)";
    case "pinterest":
      return "linear-gradient(to bottom right, #b8001f 0%, #ffffff 50%, #e60023 100%)";
    case "youtube":
      return "linear-gradient(to bottom right, #ff0000 0%, #ffffff 50%, #ff0000 100%)";
    case "whatsapp":
      return "linear-gradient(to bottom right, #25d366 0%, #ffffff 50%, #25d366 100%)";
    default:
      return "linear-gradient(to bottom right, #ffffff, #ffffff)";
  }
}

function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

function formatCurrencyFromCents(cents?: number | null) {
  if (cents == null || !Number.isFinite(cents)) return "--";
  return `$${(cents / 100).toFixed(2)}`;
}

function dollarsToCents(value: string) {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

function parseNonNegativeInt(value: string, fallback: number) {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return fallback;
  return Math.max(0, parsed);
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

function catalogMediaKey(
  kind: "product" | "subject" | "topic" | "service",
  id: string,
) {
  return `${kind}:${id}`;
}

function buildProductDraft(product?: Product | null): ProductDraft {
  return {
    id: product?.id ?? null,
    product_name: product?.product_name ?? "",
    product_slogan_text: product?.product_slogan_text ?? "",
    product_description_text: product?.product_description_text ?? "",
    product_logo_url: product?.product_logo_url ?? "",
    service_code: product?.service_code ?? "",
    subject_id: product?.subject_id ?? "",
    topic_id: product?.topic_id ?? "",
  };
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) reject(new Error("Unable to read file."));
      else resolve(result);
    };
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function parentDisplayName(parent?: Parent | null) {
  const name = [parent?.parent1_first_name, parent?.parent1_last_name]
    .filter(Boolean)
    .join(" ");
  return name || "Parent";
}

function leadDisplayName(lead?: Lead | null) {
  const name = [lead?.parent_first_name, lead?.parent_last_name]
    .filter(Boolean)
    .join(" ");
  return name || "Lead";
}

function studentDisplayName(student?: Student | null) {
  const name = [student?.first_name, student?.last_name]
    .filter(Boolean)
    .join(" ");
  return name || "Student";
}

function buildSubjectDrafts(
  existingSubjects: Subject[],
  topicsBySubject: Record<string, Topic[]>,
): SubjectDraft[] {
  const byName = new Map<string, Subject>();
  existingSubjects.forEach((s) => byName.set(normalizeKey(s.subject_name), s));
  const usedSubjectIds = new Set<string>();
  const drafts: SubjectDraft[] = [];

  DEFAULT_SUBJECTS.forEach((catalog) => {
    const norm = normalizeKey(catalog.subject_name);
    const existing = byName.get(norm);
    if (existing) usedSubjectIds.add(existing.id);

    const included = existing ? !existing.archived_at : false;
    const name = existing ? existing.subject_name : catalog.subject_name;
    const existingTopics = existing ? (topicsBySubject[existing.id] ?? []) : [];
    const topicsByName = new Map<string, Topic>();
    existingTopics.forEach((t) =>
      topicsByName.set(normalizeKey(t.topic_name), t),
    );
    const usedTopicIds = new Set<string>();

    const topicDrafts: TopicDraft[] = catalog.topics.map((topicName) => {
      const match = topicsByName.get(normalizeKey(topicName));
      if (match) usedTopicIds.add(match.id);
      return {
        key: match?.id ?? `catalog:${norm}:${normalizeKey(topicName)}`,
        id: match?.id,
        name: match?.topic_name ?? topicName,
        included: match ? !match.archived_at : false,
        is_catalog: true,
      };
    });

    existingTopics
      .filter((t) => !usedTopicIds.has(t.id))
      .forEach((t) =>
        topicDrafts.push({
          key: t.id,
          id: t.id,
          name: t.topic_name,
          included: !t.archived_at,
          is_catalog: false,
        }),
      );

    drafts.push({
      key: existing?.id ?? `catalog:${norm}`,
      id: existing?.id,
      name,
      included,
      topics: topicDrafts,
      is_catalog: !existing,
    });
  });

  existingSubjects
    .filter((s) => !usedSubjectIds.has(s.id))
    .forEach((s) => {
      const existingTopics = topicsBySubject[s.id] ?? [];
      const topicDrafts = existingTopics.map((t) => ({
        key: t.id,
        id: t.id,
        name: t.topic_name,
        included: !t.archived_at,
        is_catalog: false,
      }));
      drafts.push({
        key: s.id,
        id: s.id,
        name: s.subject_name,
        included: !s.archived_at,
        topics: topicDrafts,
        is_catalog: false,
      });
    });

  return drafts;
}

const LazySettingsTabPanels = dynamic(
  () => import("./components/SettingsTabPanels"),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-500">Loading section...</p>,
  },
);

function SettingsPageContent() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryHandledRef = useRef(false);

  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [org, setOrg] = useState<Org | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [roomsByLocation, setRoomsByLocation] = useState<
    Record<string, Room[]>
  >({});
  const [servicesByLocation, setServicesByLocation] = useState<
    Record<string, ServiceOffered[]>
  >({});
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [tutorDrafts, setTutorDrafts] = useState<Record<string, string>>({});
  const tutorDraftsInitialRef = useRef<Record<string, string>>({});
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topicsBySubject, setTopicsBySubject] = useState<
    Record<string, Topic[]>
  >({});
  const [products, setProducts] = useState<Product[]>([]);
  const [marketingTab, setMarketingTab] =
    useState<MarketingTab>("IMAGE_LIBRARY");
  const [marketingSection, setMarketingSection] =
    useState<MarketingSection>("POST_BUILDER");
  const [productDraft, setProductDraft] = useState<ProductDraft>({
    ...EMPTY_PRODUCT_DRAFT,
  });
  const [productDraftInitial, setProductDraftInitial] = useState<ProductDraft>({
    ...EMPTY_PRODUCT_DRAFT,
  });
  const productAutoSelectedRef = useRef(false);
  const [socialDraft, setSocialDraft] = useState<SocialPostDraft>({
    ...EMPTY_SOCIAL_DRAFT,
  });
  const [socialTemplates, setSocialTemplates] = useState<SocialTemplateAsset[]>(
    [],
  );
  const [socialSourceType, setSocialSourceType] =
    useState<SocialSourceType>("");
  const socialPresetRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const socialPresetCarouselRef = useRef<HTMLDivElement | null>(null);
  const [companyDraft, setCompanyDraft] = useState({
    company_description_text: "",
    mission_text: "",
    tutoring_style_text: "",
    about_us_text: "",
    company_logo_url: "",
  });
  const [catalogMediaByKey, setCatalogMediaByKey] = useState<
    Record<string, CatalogMedia[]>
  >({});
  const [catalogMediaLoading, setCatalogMediaLoading] = useState<
    Record<string, boolean>
  >({});
  const [mediaUrlDrafts, setMediaUrlDrafts] = useState<Record<string, string>>(
    {},
  );
  const [serviceDescriptionDrafts, setServiceDescriptionDrafts] = useState<
    Record<string, string>
  >({});
  const [serviceLogoDrafts, setServiceLogoDrafts] = useState<
    Record<string, string>
  >({});
  const [subjectDescriptionDrafts, setSubjectDescriptionDrafts] = useState<
    Record<string, string>
  >({});
  const [topicDescriptionDrafts, setTopicDescriptionDrafts] = useState<
    Record<string, string>
  >({});
  const [aiRewrites, setAiRewrites] = useState<
    Record<string, { previous: string }>
  >({});
  const [aiRewriteLoading, setAiRewriteLoading] = useState<
    Record<string, boolean>
  >({});
  const [marketingSubjectId, setMarketingSubjectId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [newTutor, setNewTutor] = useState({
    first_name: "",
    last_name: "",
    email: "",
    color_hex: DEFAULT_TUTOR_COLOR,
  });

  const [activeTab, setActiveTab] = useState<SettingsTab>("ACCOUNT");
  const [status, setStatus] = useState<string | null>(null);

  const isTutorOnly = Boolean(me?.isTutor && !me?.isOwner && !me?.isAdmin);
  const tabs = isTutorOnly
    ? ALL_TABS.filter((t) => t.key === "ACCOUNT")
    : ALL_TABS;

  useEffect(() => {
    if (queryHandledRef.current) return;
    if (loading) return;
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.key === tabParam)) {
      setActiveTab(tabParam as SettingsTab);
    }
    const oauth = searchParams.get("oauth");
    const oauthKind = searchParams.get("kind");
    const oauthProvider = searchParams.get("provider") ?? "";
    if (oauth === "success") {
      if (oauthKind === "connections") {
        const label =
          getConnectionProvider(oauthProvider)?.label ?? "Connection";
        setStatus(`${label} connected.`);
      } else {
        setStatus("Email account connected.");
      }
    } else if (oauth === "error") {
      const message = searchParams.get("message");
      if (oauthKind === "connections") {
        const label =
          getConnectionProvider(oauthProvider)?.label ?? "Connection";
        setStatus(
          `${label} connection failed${message ? ` (${message})` : ""}.`,
        );
      } else {
        setStatus(`Email connection failed${message ? ` (${message})` : ""}.`);
      }
    }
    queryHandledRef.current = true;
  }, [loading, searchParams, tabs]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SOCIAL_DRAFT_STORAGE_KEY);
    setSocialDraft({ ...EMPTY_SOCIAL_DRAFT });
    setSocialSourceType("");
  }, []);

  useEffect(() => {
    if (!org) return;
    const activeLogo =
      org.images?.find((img) => !img.archived_at)?.image_url ?? "";
    setCompanyDraft({
      company_description_text: org.company_description_text ?? "",
      mission_text: org.mission_text ?? "",
      tutoring_style_text: org.tutoring_style_text ?? "",
      about_us_text: org.about_us_text ?? org.about_text ?? "",
      company_logo_url: activeLogo,
    });
  }, [org?.id, org?.updated_at]);

  const timezones = useMemo(() => {
    const supported =
      typeof Intl !== "undefined" &&
      typeof (Intl as any).supportedValuesOf === "function"
        ? ((Intl as any).supportedValuesOf("timeZone") as string[])
        : [
            "UTC",
            "America/New_York",
            "America/Chicago",
            "America/Denver",
            "America/Los_Angeles",
          ];
    return Array.from(new Set(supported)).sort((a, b) => a.localeCompare(b));
  }, []);

  const accountInitial = useMemo(
    () => ({
      date_format: normalizeDateFormat(org?.date_format),
    }),
    [org?.id, org?.date_format],
  );
  const accountForm = useSettingsForm(accountInitial);

  const businessInitial = useMemo(
    () => ({
      business_name: org?.business_name ?? "",
      timezone: org?.timezone ?? "America/New_York",
      business_phone: org?.business_phone ?? "",
      business_email: org?.business_email ?? "",
      business_address_1: org?.business_address_1 ?? "",
      business_address_2: org?.business_address_2 ?? "",
      business_city: org?.business_city ?? "",
      business_state: org?.business_state ?? "",
      business_zip: org?.business_zip ?? "",
    }),
    [
      org?.id,
      org?.business_name,
      org?.timezone,
      org?.business_phone,
      org?.business_email,
      org?.business_address_1,
      org?.business_address_2,
      org?.business_city,
      org?.business_state,
      org?.business_zip,
    ],
  );
  const businessForm = useSettingsForm(businessInitial);

  const scheduleInitial = useMemo(
    () => ({ default_buffer_minutes: org?.default_buffer_minutes ?? 15 }),
    [org?.id, org?.default_buffer_minutes],
  );
  const scheduleForm = useSettingsForm(scheduleInitial);
  const [bufferDraft, setBufferDraft] = useState(() =>
    String(scheduleInitial.default_buffer_minutes ?? 0),
  );
  const dateFormat = useMemo(
    () =>
      normalizeDateFormat(accountForm.formData.date_format ?? org?.date_format),
    [accountForm.formData.date_format, org?.date_format],
  );

  const [serviceLocationId, setServiceLocationId] = useState("");
  const [serviceEdits, setServiceEdits] = useState<
    Record<
      string,
      {
        hourly_rate_dollars: string;
        capacity: string;
        unit_length_minutes: string;
        is_active: boolean;
      }
    >
  >({});
  const [serviceCatalogDrafts, setServiceCatalogDrafts] = useState<
    Record<
      string,
      Record<
        string,
        {
          hourly_rate_dollars: string;
          capacity: string;
          unit_length_minutes: string;
          is_active: boolean;
        }
      >
    >
  >({});
  const [newService, setNewService] = useState<{
    location_id: string;
    name: string;
    price: string;
    capacity: string;
    unit_length_minutes: string;
  }>({
    location_id: "",
    name: "",
    price: "",
    capacity: "1",
    unit_length_minutes: "60",
  });

  const [subjectDrafts, setSubjectDrafts] = useState<SubjectDraft[]>([]);
  const subjectDraftsInitialRef = useRef<SubjectDraft[]>([]);
  const [subjectDraftsInitialKey, setSubjectDraftsInitialKey] = useState("[]");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicDrafts, setNewTopicDrafts] = useState<Record<string, string>>(
    {},
  );

  const [serviceSort, setServiceSort] = useState<{
    key: "active" | "name" | "price" | "capacity" | "unit_length";
    dir: "asc" | "desc";
  }>({
    key: "active",
    dir: "desc",
  });
  const [subjectSort, setSubjectSort] = useState<{
    key: "included" | "name";
    dir: "asc" | "desc";
  }>({
    key: "included",
    dir: "desc",
  });
  const [archiveType, setArchiveType] = useState<ArchiveType>("PARENTS");
  const [archiveSort, setArchiveSort] = useState<{
    key: "archived" | "name";
    dir: "asc" | "desc";
  }>({
    key: "name",
    dir: "asc",
  });
  const [archiveEdits, setArchiveEdits] = useState<
    Record<ArchiveType, Record<string, boolean>>
  >(() =>
    ARCHIVE_OPTIONS.reduce(
      (acc, option) => {
        acc[option.key] = {};
        return acc;
      },
      {} as Record<ArchiveType, Record<string, boolean>>,
    ),
  );

  const [editLocationId, setEditLocationId] = useState<string | null>(null);
  const [editLocationDraft, setEditLocationDraft] = useState<{
    location_name: string;
    is_virtual: boolean;
    location_address_1: string;
    location_address_2: string;
    location_city: string;
    location_state: string;
    location_zip: string;
  } | null>(null);
  const [editRoomId, setEditRoomId] = useState<string | null>(null);
  const [editRoomDraft, setEditRoomDraft] = useState<{
    location_id: string;
    room_name: string;
    room_number: string;
    floor_number: string;
  } | null>(null);
  const [newRoomDrafts, setNewRoomDrafts] = useState<
    Record<
      string,
      { room_name: string; room_number: string; floor_number: string }
    >
  >({});

  const clientsForm = useSettingsForm<ClientFieldPrefs>(
    defaultClientFieldPrefs(),
  );
  const pipelineForm = useSettingsForm<PipelineSettings>({
    sources: defaultPipelineSources(),
  });
  const [emailInboxes, setEmailInboxes] = useState<EmailInbox[]>([]);
  const [newEmailInbox, setNewEmailInbox] = useState({
    provider: "GMAIL" as EmailInbox["provider"],
    label: "",
    address: "",
    imap_host: "",
    imap_port: "993",
    imap_secure: true,
    password: "",
    daily_scan_enabled: false,
    daily_scan_time: "08:00",
  });
  const [connections, setConnections] = useState<
    Record<string, Record<string, string>>
  >({});
  const [connectionSnapshots, setConnectionSnapshots] = useState<
    Record<string, ConnectionSnapshot>
  >({});

  const connectionStatusById = useMemo(() => {
    const status: Record<string, boolean> = {};
    CONNECTION_PROVIDERS.forEach((provider) => {
      const values = connections[provider.id] ?? {};
      const snapshot = connectionSnapshots[provider.id];
      const required = provider.fields
        .filter((field) => field.required)
        .map((field) => field.key);
      status[provider.id] = required.every((key) => {
        if (values[key]?.trim()) return true;
        return snapshot?.fields?.[key]?.has_value ?? false;
      });
    });
    return status;
  }, [connections, connectionSnapshots]);

  const connectionStatusLabel = (source: PipelineSourceSetting) => {
    if (source.type === "EMAIL" && source.id.startsWith("email:")) {
      const inboxId = source.id.slice("email:".length);
      const inbox = emailInboxes.find((item) => item.id === inboxId);
      return inbox?.has_credentials
        ? "Connected"
        : "Need to Establish Connection";
    }
    if (source.type !== "SOCIAL") return "Connected";
    const connected = connectionStatusById[source.id] ?? false;
    return connected ? "Connected" : "Need to Establish Connection";
  };

  const updateConnectionField = (
    providerId: string,
    fieldKey: string,
    value: string,
  ) => {
    setConnections((prev) => ({
      ...prev,
      [providerId]: {
        ...(prev[providerId] ?? {}),
        [fieldKey]: value,
      },
    }));
  };

  const connectionsDirty = useMemo(
    () =>
      Object.values(connections).some((fields) =>
        Object.values(fields).some(
          (value) => typeof value === "string" && value.trim().length > 0,
        ),
      ),
    [connections],
  );

  const subjectDraftsKey = useMemo(
    () => JSON.stringify(subjectDrafts),
    [subjectDrafts],
  );
  const subjectBaselineMap = useMemo(
    () =>
      new Map(
        subjectDraftsInitialRef.current.map((subject) => [
          subject.key,
          subject,
        ]),
      ),
    [subjectDraftsInitialKey],
  );

  useEffect(() => {
    setBufferDraft(String(scheduleForm.formData.default_buffer_minutes ?? 0));
  }, [scheduleForm.formData.default_buffer_minutes]);

  const productDirty = useMemo(() => {
    const hasContent = Boolean(
      productDraft.product_name ||
      productDraft.product_slogan_text ||
      productDraft.product_description_text ||
      productDraft.product_logo_url ||
      productDraft.service_code ||
      productDraft.subject_id ||
      productDraft.topic_id,
    );
    if (!hasContent) return false;
    return JSON.stringify(productDraft) !== JSON.stringify(productDraftInitial);
  }, [productDraft, productDraftInitial]);

  const companyDirty = useMemo(() => {
    if (!org) return false;
    const activeLogo =
      org.images?.find((img) => !img.archived_at)?.image_url ?? "";
    const baseline = {
      company_description_text: org.company_description_text ?? "",
      mission_text: org.mission_text ?? "",
      tutoring_style_text: org.tutoring_style_text ?? "",
      about_us_text: org.about_us_text ?? org.about_text ?? "",
      company_logo_url: activeLogo,
    };
    return JSON.stringify(companyDraft) !== JSON.stringify(baseline);
  }, [companyDraft, org?.id, org?.updated_at]);

  const productMediaKey = productDraft.id
    ? catalogMediaKey("product", productDraft.id)
    : "";
  const productMedia = productMediaKey
    ? (catalogMediaByKey[productMediaKey] ?? [])
    : [];
  const productMediaLoading = productMediaKey
    ? Boolean(catalogMediaLoading[productMediaKey])
    : false;
  const productTopicOptions = useMemo(() => {
    if (!productDraft.subject_id) return [];
    return (topicsBySubject[productDraft.subject_id] ?? []).filter(
      (topic) => !topic.archived_at,
    );
  }, [productDraft.subject_id, topicsBySubject]);

  const socialTopicOptions = useMemo(() => {
    return Object.values(topicsBySubject)
      .flat()
      .filter((topic) => !topic.archived_at);
  }, [topicsBySubject]);

  const socialSelectedProduct = useMemo(
    () =>
      products.find((product) => product.id === socialDraft.product_id) ?? null,
    [products, socialDraft.product_id],
  );
  const socialSelectedSubject = useMemo(
    () =>
      subjects.find((subject) => subject.id === socialDraft.subject_id) ?? null,
    [subjects, socialDraft.subject_id],
  );
  const socialSelectedTopic = useMemo(
    () =>
      socialTopicOptions.find((topic) => topic.id === socialDraft.topic_id) ??
      null,
    [socialTopicOptions, socialDraft.topic_id],
  );
  const socialSelectedService = useMemo(() => {
    if (!socialDraft.service_code) return null;
    const byCode = new Map<string, ServiceOffered>();
    Object.values(servicesByLocation).forEach((list) => {
      list.forEach((svc) => {
        if (!svc.is_active) return;
        if (!byCode.has(svc.service_code)) byCode.set(svc.service_code, svc);
      });
    });
    return byCode.get(socialDraft.service_code) ?? null;
  }, [servicesByLocation, socialDraft.service_code]);

  const activeCompanyLogoUrl = useMemo(
    () => org?.images?.find((img) => !img.archived_at)?.image_url ?? "",
    [org?.id, org?.updated_at],
  );

  const socialMediaOptions = useMemo(() => {
    const items: Array<{
      id: string;
      url: string;
      type: CatalogMedia["media_type"];
      label: string;
    }> = [];
    if (activeCompanyLogoUrl) {
      items.push({
        id: "company-logo",
        url: activeCompanyLogoUrl,
        type: "PHOTO",
        label: "Company logo",
      });
    }
    if (socialSelectedProduct) {
      if (socialSelectedProduct.product_logo_url) {
        items.push({
          id: `product-logo:${socialSelectedProduct.id}`,
          url: socialSelectedProduct.product_logo_url,
          type: "PHOTO",
          label: `${socialSelectedProduct.product_name} logo`,
        });
      }
      const key = catalogMediaKey("product", socialSelectedProduct.id);
      (catalogMediaByKey[key] ?? []).forEach((media) =>
        items.push({
          id: media.id,
          url: media.media_url,
          type: media.media_type,
          label: `${socialSelectedProduct.product_name} media`,
        }),
      );
    }
    if (socialSelectedService) {
      if (socialSelectedService.service_logo_url) {
        items.push({
          id: `service-logo:${socialSelectedService.service_code}`,
          url: socialSelectedService.service_logo_url,
          type: "PHOTO",
          label: `${socialSelectedService.display_name ?? socialSelectedService.service_code} logo`,
        });
      }
      const key = catalogMediaKey(
        "service",
        socialSelectedService.service_code,
      );
      (catalogMediaByKey[key] ?? []).forEach((media) =>
        items.push({
          id: media.id,
          url: media.media_url,
          type: media.media_type,
          label: `${socialSelectedService.display_name ?? socialSelectedService.service_code} media`,
        }),
      );
    }
    if (socialSelectedSubject) {
      const key = catalogMediaKey("subject", socialSelectedSubject.id);
      (catalogMediaByKey[key] ?? []).forEach((media) =>
        items.push({
          id: media.id,
          url: media.media_url,
          type: media.media_type,
          label: `${socialSelectedSubject.subject_name} media`,
        }),
      );
    }
    if (socialSelectedTopic) {
      const key = catalogMediaKey("topic", socialSelectedTopic.id);
      (catalogMediaByKey[key] ?? []).forEach((media) =>
        items.push({
          id: media.id,
          url: media.media_url,
          type: media.media_type,
          label: `${socialSelectedTopic.topic_name} media`,
        }),
      );
    }
    return items;
  }, [
    activeCompanyLogoUrl,
    catalogMediaByKey,
    socialSelectedProduct,
    socialSelectedService,
    socialSelectedSubject,
    socialSelectedTopic,
  ]);

  const socialAspect = useMemo(() => {
    return (
      SOCIAL_ASPECT_RATIOS.find(
        (ratio) => ratio.value === socialDraft.aspect_ratio,
      ) ?? SOCIAL_ASPECT_RATIOS[0]
    );
  }, [socialDraft.aspect_ratio]);

  const selectedCarouselPresetId = useMemo(() => {
    const ratio = SOCIAL_ASPECT_RATIOS.find(
      (item) => item.value === socialDraft.aspect_ratio,
    )?.value;
    const preset = SOCIAL_LAYOUT_PRESETS.find(
      (item) => item === socialDraft.layout_preset,
    );
    if (!ratio || !preset) return "";
    return `${ratio}|${preset}`;
  }, [socialDraft.aspect_ratio, socialDraft.layout_preset]);

  const socialSelectedTemplate = useMemo(
    () =>
      socialTemplates.find(
        (item) => item.id === socialDraft.selected_template_id,
      ) ?? null,
    [socialTemplates, socialDraft.selected_template_id],
  );

  const socialPreviewMedia = useMemo(() => {
    if (socialSelectedTemplate) {
      return {
        url: socialSelectedTemplate.data_url,
        type: "PHOTO" as const,
        label: socialSelectedTemplate.name,
      };
    }
    if (!socialDraft.selected_media_ids.length) return null;
    const first = socialDraft.selected_media_ids[0];
    return socialMediaOptions.find((media) => media.id === first) ?? null;
  }, [
    socialSelectedTemplate,
    socialDraft.selected_media_ids,
    socialMediaOptions,
  ]);

  useEffect(() => {
    if (activeTab !== "MARKETING" || marketingSection !== "POST_BUILDER")
      return;
    if (!selectedCarouselPresetId) return;
    const container = socialPresetCarouselRef.current;
    const node = socialPresetRefs.current[selectedCarouselPresetId];
    if (!container || !node) return;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const targetLeft =
      container.scrollLeft +
      (nodeRect.left - containerRect.left) -
      (container.clientWidth / 2 - node.clientWidth / 2);
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [activeTab, marketingSection, selectedCarouselPresetId]);

  useEffect(() => {
    if (productAutoSelectedRef.current) return;
    if (productDraft.id || productDraft.product_name) {
      productAutoSelectedRef.current = true;
      return;
    }
    // Keep "Add new product" selected by default when entering Products.
    if (!products.length) return;
    productAutoSelectedRef.current = true;
  }, [products, productDraft.id, productDraft.product_name]);

  useEffect(() => {
    if (!token) return;
    if (!productDraft.id) return;
    void loadCatalogMedia({
      kind: "product",
      id: productDraft.id,
      product_id: productDraft.id,
    });
  }, [token, productDraft.id]);

  useEffect(() => {
    if (!token) return;
    if (activeTab !== "MARKETING") return;
    if (socialDraft.product_id) {
      void loadCatalogMedia({
        kind: "product",
        id: socialDraft.product_id,
        product_id: socialDraft.product_id,
      });
    }
    if (socialDraft.service_code) {
      void loadCatalogMedia({
        kind: "service",
        id: socialDraft.service_code,
        service_code: socialDraft.service_code,
      });
    }
    if (socialDraft.subject_id) {
      void loadCatalogMedia({
        kind: "subject",
        id: socialDraft.subject_id,
        subject_id: socialDraft.subject_id,
      });
    }
    if (socialDraft.topic_id) {
      void loadCatalogMedia({
        kind: "topic",
        id: socialDraft.topic_id,
        topic_id: socialDraft.topic_id,
      });
    }
  }, [
    token,
    activeTab,
    socialDraft.product_id,
    socialDraft.service_code,
    socialDraft.subject_id,
    socialDraft.topic_id,
  ]);

  useEffect(() => {
    if (activeTab === "PRODUCTS") {
      setMarketingTab("IMAGE_LIBRARY");
    }
    if (activeTab === "MARKETING") {
      setMarketingSection("POST_BUILDER");
    }
  }, [activeTab]);

  const socialBuilderHasContent = useMemo(() => {
    const hasTextField = [
      socialDraft.headline,
      socialDraft.call_to_action,
      socialDraft.start_date,
      socialDraft.end_date,
      socialDraft.age_range,
      socialDraft.price_detail,
      socialDraft.location_detail,
      socialDraft.enrollment_link,
      socialDraft.hashtags,
      socialDraft.extra_notes,
      socialDraft.generated_copy,
      socialDraft.generated_image_url,
      socialDraft.company_description,
      socialDraft.about_us,
      socialDraft.slogan,
      socialDraft.template_style,
      socialDraft.layout_preset,
      socialDraft.aspect_ratio,
    ].some((value) => String(value ?? "").trim().length > 0);

    return Boolean(
      hasTextField ||
        socialSourceType ||
        socialDraft.platform_ids.length ||
        socialDraft.selected_media_ids.length ||
        socialDraft.selected_template_id ||
        socialDraft.product_id ||
        socialDraft.service_code ||
        socialDraft.subject_id ||
        socialDraft.topic_id ||
        socialTemplates.length,
    );
  }, [socialDraft, socialSourceType, socialTemplates.length]);

  const dirtyTabs = useMemo(() => {
    const servicesDirty =
      Object.keys(serviceEdits).length > 0 ||
      Object.values(serviceCatalogDrafts).some(
        (byLocation) => Object.keys(byLocation).length > 0,
      );
    const subjectsDirty = subjectDraftsKey !== subjectDraftsInitialKey;
    const tutorsDirty =
      Object.keys(tutorDrafts).some(
        (id) => tutorDrafts[id] !== tutorDraftsInitialRef.current[id],
      ) ||
      Boolean(
        newTutor.email.trim() ||
        newTutor.first_name.trim() ||
        newTutor.last_name.trim(),
      );
    return {
      ACCOUNT: accountForm.hasChanges,
      BUSINESS: businessForm.hasChanges,
      LOCATIONS: false,
      CLIENTS: clientsForm.hasChanges,
      TUTORS: tutorsDirty,
      SERVICES: servicesDirty,
      SUBJECTS_TOPICS: subjectsDirty,
      PRODUCTS: productDirty || companyDirty,
      SCHEDULE: scheduleForm.hasChanges,
      PIPELINE: pipelineForm.hasChanges,
      CONNECTIONS: connectionsDirty,
      MARKETING: socialBuilderHasContent,
      WEBSITE: false,
      ARCHIVE: false,
    } as Record<SettingsTab, boolean>;
  }, [
    accountForm.hasChanges,
    businessForm.hasChanges,
    clientsForm.hasChanges,
    pipelineForm.hasChanges,
    scheduleForm.hasChanges,
    connectionsDirty,
    productDirty,
    companyDirty,
    serviceEdits,
    serviceCatalogDrafts,
    subjectDraftsKey,
    subjectDraftsInitialKey,
    tutorDrafts,
    newTutor.email,
    newTutor.first_name,
    newTutor.last_name,
    socialBuilderHasContent,
  ]);

  const anyDirty = useMemo(
    () => Object.values(dirtyTabs).some(Boolean),
    [dirtyTabs],
  );
  const anyDirtyRef = useRef(anyDirty);
  useEffect(() => {
    anyDirtyRef.current = anyDirty;
  }, [anyDirty]);

  const plan = org?.subscription_plan ?? "basic";
  const planKey = normalizePlanKey(plan);
  const checkoutHrefFor = (nextPlan: PlanKey) =>
    `/checkout?plan=${encodeURIComponent(nextPlan)}${org?.id ? `&org=${encodeURIComponent(org.id)}` : ""}`;
  const checkoutHref = checkoutHrefFor(planKey);
  const planSpecs = planSpecsFor(planKey);
  const otherPlans = PLAN_ORDER.filter((key) => key !== planKey);
  const activeLocations = locations.filter((l) => !l.archived_at);
  const billableLocations = activeLocations.filter((l) => !l.is_system);
  const locLimit = planLocationLimit(plan);
  const canAddLocation =
    locLimit === null || billableLocations.length < locLimit;
  const tutorLimit = planTutorLimit(plan);
  const activeTutorCount = tutors.length;
  const canAddTutor = tutorLimit === null || activeTutorCount < tutorLimit;
  const leadLimit = planLeadLimit(plan);
  const activeLeadCount = leads.filter((lead) => !lead.archived_at).length;
  const usageColorClass = (current: number, limit: number | null) => {
    if (limit === null) return "text-gray-600";
    if (current < limit) return "text-emerald-600";
    if (current === limit) return "text-amber-600";
    return "text-rose-600";
  };

  const marketingServices = useMemo(() => {
    const byCode = new Map<string, ServiceOffered>();
    Object.values(servicesByLocation).forEach((list) => {
      list.forEach((svc) => {
        if (!svc.is_active) return;
        if (!byCode.has(svc.service_code)) byCode.set(svc.service_code, svc);
      });
    });
    return Array.from(byCode.values()).sort((a, b) => {
      const aLabel = (a.display_name ?? a.service_code).toLowerCase();
      const bLabel = (b.display_name ?? b.service_code).toLowerCase();
      return aLabel.localeCompare(bLabel);
    });
  }, [servicesByLocation]);
  const marketingServiceByCode = useMemo(
    () => new Map(marketingServices.map((svc) => [svc.service_code, svc])),
    [marketingServices],
  );
  const selectedProductService = useMemo(
    () =>
      productDraft.service_code
        ? (marketingServiceByCode.get(productDraft.service_code) ?? null)
        : null,
    [productDraft.service_code, marketingServiceByCode],
  );

  useEffect(() => {
    if (!token) return;
    if (marketingTab !== "SERVICES") return;
    marketingServices.forEach((svc) => {
      void loadCatalogMedia({
        kind: "service",
        id: svc.service_code,
        service_code: svc.service_code,
      });
    });
  }, [marketingTab, marketingServices, token]);

  useEffect(() => {
    if (!token) return;
    if (marketingTab !== "SUBJECTS") return;
    subjects
      .filter((subject) => !subject.archived_at)
      .forEach((subject) => {
        void loadCatalogMedia({
          kind: "subject",
          id: subject.id,
          subject_id: subject.id,
        });
      });
  }, [marketingTab, subjects, token]);

  useEffect(() => {
    if (!token) return;
    if (marketingTab !== "TOPICS") return;
    const topics = topicsBySubject[marketingSubjectId] ?? [];
    topics
      .filter((topic) => !topic.archived_at)
      .forEach((topic) => {
        void loadCatalogMedia({
          kind: "topic",
          id: topic.id,
          topic_id: topic.id,
        });
      });
  }, [marketingTab, marketingSubjectId, topicsBySubject, token]);

  useEffect(() => {
    if (Object.keys(serviceDescriptionDrafts).length) return;
    if (!marketingServices.length) return;
    const next: Record<string, string> = {};
    const nextLogos: Record<string, string> = {};
    marketingServices.forEach((svc) => {
      next[svc.service_code] = svc.description_text ?? "";
      nextLogos[svc.service_code] = svc.service_logo_url ?? "";
    });
    setServiceDescriptionDrafts(next);
    setServiceLogoDrafts(nextLogos);
  }, [marketingServices, serviceDescriptionDrafts]);

  useEffect(() => {
    if (Object.keys(serviceLogoDrafts).length) return;
    if (!marketingServices.length) return;
    const next: Record<string, string> = {};
    marketingServices.forEach((svc) => {
      next[svc.service_code] = svc.service_logo_url ?? "";
    });
    setServiceLogoDrafts(next);
  }, [marketingServices, serviceLogoDrafts]);

  useEffect(() => {
    if (!subjects.length) return;
    if (!marketingSubjectId) {
      setMarketingSubjectId(
        subjects.find((s) => !s.archived_at)?.id ?? subjects[0]?.id ?? "",
      );
    }
    if (Object.keys(subjectDescriptionDrafts).length) return;
    const next: Record<string, string> = {};
    subjects.forEach((subject) => {
      next[subject.id] = subject.description_text ?? "";
    });
    setSubjectDescriptionDrafts(next);
  }, [subjects, marketingSubjectId, subjectDescriptionDrafts]);

  useEffect(() => {
    if (!marketingSubjectId) return;
    const topics = topicsBySubject[marketingSubjectId] ?? [];
    if (!topics.length) return;
    if (Object.keys(topicDescriptionDrafts).length) return;
    const next: Record<string, string> = {};
    topics.forEach((topic) => {
      next[topic.id] = topic.description_text ?? "";
    });
    setTopicDescriptionDrafts(next);
  }, [topicsBySubject, marketingSubjectId, topicDescriptionDrafts]);

  const selectedServiceLocationId =
    serviceLocationId ||
    billableLocations[0]?.id ||
    activeLocations[0]?.id ||
    "";

  useEffect(() => {
    if (!selectedServiceLocationId) return;
    setNewService((prev) => ({
      ...prev,
      location_id: selectedServiceLocationId,
    }));
  }, [selectedServiceLocationId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CLIENT_FIELDS_STORAGE_KEY);
      if (!raw) return;
      const parsed = normalizeClientFieldPrefs(JSON.parse(raw));
      clientsForm.commit(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    const sources = loadPipelineSources();
    pipelineForm.commit({ sources });
  }, []);

  const parentNameById = useMemo(() => {
    const map = new Map<string, string>();
    parents.forEach((parent) => {
      map.set(parent.id, parentDisplayName(parent));
    });
    return map;
  }, [parents]);

  const studentsByParentId = useMemo(() => {
    const map = new Map<string, Student[]>();
    students.forEach((student) => {
      const list = map.get(student.parent_id) ?? [];
      list.push(student);
      map.set(student.parent_id, list);
    });
    return map;
  }, [students]);

  const locationNameById = useMemo(() => {
    const map = new Map<string, string>();
    locations.forEach((location) => {
      map.set(location.id, location.location_name || "Location");
    });
    return map;
  }, [locations]);

  const activeEmailInboxes = useMemo(
    () => emailInboxes.filter((inbox) => !inbox.archived_at),
    [emailInboxes],
  );

  const subjectNameById = useMemo(() => {
    const map = new Map<string, string>();
    subjects.forEach((subject) => {
      map.set(subject.id, subject.subject_name || "Subject");
    });
    return map;
  }, [subjects]);

  const serviceById = useMemo(() => {
    const map = new Map<string, ServiceOffered>();
    Object.values(servicesByLocation).forEach((services) => {
      services.forEach((service) => {
        map.set(service.id, service);
      });
    });
    return map;
  }, [servicesByLocation]);

  const archiveMaps = useMemo<
    Record<ArchiveType, Map<string, ArchiveRow>>
  >(() => {
    const maps: Record<ArchiveType, Map<string, ArchiveRow>> = {
      PARENTS: new Map(),
      STUDENTS: new Map(),
      LEADS: new Map(),
      LOCATIONS: new Map(),
      ROOMS: new Map(),
      SERVICES: new Map(),
      SUBJECTS: new Map(),
      TOPICS: new Map(),
    };

    parents.forEach((parent) => {
      maps.PARENTS.set(parent.id, {
        id: parent.id,
        label: parentDisplayName(parent),
        archived: Boolean(parent.archived_at),
        type: "PARENTS",
      });
    });

    students.forEach((student) => {
      const parentIsArchived = Boolean(
        parents.find((p) => p.id === student.parent_id)?.archived_at,
      );
      const name = studentDisplayName(student);
      const parentLabel = parentNameById.get(student.parent_id);
      const label = parentLabel ? `${name} (${parentLabel})` : name;
      maps.STUDENTS.set(student.id, {
        id: student.id,
        label,
        archived: parentIsArchived ? true : Boolean(student.archived_at),
        type: "STUDENTS",
        locked: parentIsArchived,
      });
    });

    leads.forEach((lead) => {
      maps.LEADS.set(lead.id, {
        id: lead.id,
        label: leadDisplayName(lead),
        archived: Boolean(lead.archived_at),
        type: "LEADS",
      });
    });

    locations.forEach((location) => {
      maps.LOCATIONS.set(location.id, {
        id: location.id,
        label: location.location_name || "Location",
        archived: Boolean(location.archived_at),
        type: "LOCATIONS",
      });
    });

    Object.entries(roomsByLocation).forEach(([locationId, rooms]) => {
      const locationArchived = Boolean(
        locations.find((l) => l.id === locationId)?.archived_at,
      );
      const locationLabel = locationNameById.get(locationId) || "Location";
      rooms.forEach((room) => {
        const roomName = room.room_name || "Room";
        maps.ROOMS.set(room.id, {
          id: room.id,
          label: `${roomName} (${locationLabel})`,
          archived: locationArchived ? true : Boolean(room.archived_at),
          type: "ROOMS",
          locked: locationArchived,
        });
      });
    });

    Object.entries(servicesByLocation).forEach(([locationId, services]) => {
      const locationLabel = locationNameById.get(locationId) || "Location";
      services.forEach((service) => {
        const serviceName =
          service.display_name || service.service_code || "Service";
        maps.SERVICES.set(service.id, {
          id: service.id,
          label: `${serviceName} (${locationLabel})`,
          archived: !service.is_active,
          type: "SERVICES",
        });
      });
    });

    subjects.forEach((subject) => {
      maps.SUBJECTS.set(subject.id, {
        id: subject.id,
        label: subject.subject_name || "Subject",
        archived: Boolean(subject.archived_at),
        type: "SUBJECTS",
      });
    });

    Object.entries(topicsBySubject).forEach(([subjectId, topics]) => {
      const subjectArchived = Boolean(
        subjects.find((s) => s.id === subjectId)?.archived_at,
      );
      const subjectLabel = subjectNameById.get(subjectId) || "Subject";
      topics.forEach((topic) => {
        const topicName = topic.topic_name || "Topic";
        maps.TOPICS.set(topic.id, {
          id: topic.id,
          label: `${topicName} (${subjectLabel})`,
          archived: subjectArchived ? true : Boolean(topic.archived_at),
          type: "TOPICS",
          locked: subjectArchived,
        });
      });
    });

    return maps;
  }, [
    parents,
    students,
    leads,
    locations,
    roomsByLocation,
    servicesByLocation,
    subjects,
    topicsBySubject,
    parentNameById,
    locationNameById,
    subjectNameById,
  ]);

  const archiveRows = useMemo(
    () => Array.from(archiveMaps[archiveType].values()),
    [archiveMaps, archiveType],
  );

  const sortedArchiveRows = useMemo(() => {
    const rows = [...archiveRows];
    const dir = archiveSort.dir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      if (archiveSort.key === "archived") {
        const diff = Number(a.archived) - Number(b.archived);
        if (diff !== 0) return diff * dir;
      }
      const diff = a.label.localeCompare(b.label);
      if (diff !== 0) return diff * dir;
      return 0;
    });
    return rows;
  }, [archiveRows, archiveSort]);

  const archiveEditsForType = archiveEdits[archiveType] ?? {};
  const archiveHasChanges = Object.keys(archiveEditsForType).length > 0;

  const serviceRows = useMemo<ServiceDraft[]>(() => {
    if (!selectedServiceLocationId) return [];
    const existing = servicesByLocation[selectedServiceLocationId] ?? [];
    const existingByName = new Map<string, ServiceOffered>();
    existing.forEach((s) => {
      const key = normalizeKey(s.display_name ?? s.service_code);
      if (!existingByName.has(key)) existingByName.set(key, s);
    });
    const catalogDrafts = serviceCatalogDrafts[selectedServiceLocationId] ?? {};
    const usedExistingIds = new Set<string>();

    const rows: ServiceDraft[] = DEFAULT_SERVICE_NAMES.map((name) => {
      const match = existingByName.get(normalizeKey(name));
      if (match) usedExistingIds.add(match.id);
      const base = match
        ? {
            is_active: match.is_active,
            hourly_rate_dollars: centsToDollars(match.hourly_rate_cents),
            capacity: String(match.capacity ?? 1),
            unit_length_minutes: String(match.unit_length_minutes ?? 60),
          }
        : {
            is_active: false,
            hourly_rate_dollars: "",
            capacity: "1",
            unit_length_minutes: "60",
          };
      const draft = match
        ? (serviceEdits[match.id] ?? base)
        : (catalogDrafts[name] ?? base);
      return {
        key: match?.id ?? `catalog:${normalizeKey(name)}`,
        id: match?.id,
        name: match?.display_name ?? name,
        is_active: draft.is_active,
        hourly_rate_dollars: draft.hourly_rate_dollars,
        unit_length_minutes: draft.unit_length_minutes,
        capacity: draft.capacity,
        is_catalog: !match,
        existing: match ?? null,
      };
    });

    const customRows = existing
      .filter((s) => !usedExistingIds.has(s.id))
      .map((s) => {
        const base = {
          is_active: s.is_active,
          hourly_rate_dollars: centsToDollars(s.hourly_rate_cents),
          capacity: String(s.capacity ?? 1),
          unit_length_minutes: String(s.unit_length_minutes ?? 60),
        };
        const draft = serviceEdits[s.id] ?? base;
        return {
          key: s.id,
          id: s.id,
          name: s.display_name ?? s.service_code,
          is_active: draft.is_active,
          hourly_rate_dollars: draft.hourly_rate_dollars,
          unit_length_minutes: draft.unit_length_minutes,
          capacity: draft.capacity,
          is_catalog: false,
          existing: s,
        } satisfies ServiceDraft;
      });

    return [...rows, ...customRows];
  }, [
    selectedServiceLocationId,
    servicesByLocation,
    serviceEdits,
    serviceCatalogDrafts,
  ]);

  const sortedServiceRows = useMemo(() => {
    const rows = [...serviceRows];
    rows.sort((a, b) => {
      if (serviceSort.key === "active") {
        const aActive = Number(a.existing?.is_active ?? false);
        const bActive = Number(b.existing?.is_active ?? false);
        const diff = aActive - bActive;
        if (diff !== 0) return serviceSort.dir === "asc" ? diff : -diff;
      } else if (serviceSort.key === "capacity") {
        const aCap = Number.parseInt(a.capacity || "0", 10) || 0;
        const bCap = Number.parseInt(b.capacity || "0", 10) || 0;
        if (aCap !== bCap)
          return serviceSort.dir === "asc" ? aCap - bCap : bCap - aCap;
      } else if (serviceSort.key === "unit_length") {
        const aLen = Number.parseInt(a.unit_length_minutes || "0", 10) || 0;
        const bLen = Number.parseInt(b.unit_length_minutes || "0", 10) || 0;
        if (aLen !== bLen)
          return serviceSort.dir === "asc" ? aLen - bLen : bLen - aLen;
      } else if (serviceSort.key === "price") {
        const aPrice = Number.parseFloat(a.hourly_rate_dollars || "0") || 0;
        const bPrice = Number.parseFloat(b.hourly_rate_dollars || "0") || 0;
        if (aPrice !== bPrice)
          return serviceSort.dir === "asc" ? aPrice - bPrice : bPrice - aPrice;
      } else {
        const diff = a.name.localeCompare(b.name);
        if (diff !== 0) return serviceSort.dir === "asc" ? diff : -diff;
      }
      return a.name.localeCompare(b.name);
    });
    return rows;
  }, [serviceRows, serviceSort]);

  function toggleServiceSort(
    key: "active" | "name" | "price" | "capacity" | "unit_length",
  ) {
    setServiceSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: key === "active" ? "desc" : "asc" };
    });
  }

  function toggleSubjectSort(key: "included" | "name") {
    setSubjectSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: key === "included" ? "desc" : "asc" };
    });
  }

  function toggleArchiveSort(key: "archived" | "name") {
    setArchiveSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  }

  const renderSortIcons = (active: boolean, dir: "asc" | "desc") => (
    <span className="ml-2 inline-flex flex-col items-center gap-0">
      {active ? (
        <HugeiconsIcon
          icon={dir === "asc" ? ArrowUp01Icon : ArrowDown01Icon}
          size={14}
          className="text-[#ff9df9]"
        />
      ) : (
        <>
          <HugeiconsIcon
            icon={ArrowUp01Icon}
            size={12}
            className="text-gray-400"
          />
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={12}
            className="text-gray-400"
          />
        </>
      )}
    </span>
  );

  function updateServiceDraft(
    row: ServiceDraft,
    updates: {
      is_active?: boolean;
      hourly_rate_dollars?: string;
      capacity?: string;
      unit_length_minutes?: string;
    },
  ) {
    if (row.id) {
      const id = row.id;
      setServiceEdits((prev) => {
        const existing = prev[id] ?? {
          hourly_rate_dollars: row.hourly_rate_dollars,
          capacity: row.capacity,
          unit_length_minutes: row.unit_length_minutes,
          is_active: row.is_active,
        };
        return {
          ...prev,
          [id]: {
            hourly_rate_dollars:
              updates.hourly_rate_dollars ?? existing.hourly_rate_dollars,
            capacity: updates.capacity ?? existing.capacity,
            unit_length_minutes:
              updates.unit_length_minutes ?? existing.unit_length_minutes,
            is_active: updates.is_active ?? existing.is_active,
          },
        };
      });
      return;
    }
    if (!selectedServiceLocationId) return;
    setServiceCatalogDrafts((prev) => {
      const byLocation = prev[selectedServiceLocationId] ?? {};
      const existing = byLocation[row.name] ?? {
        hourly_rate_dollars: row.hourly_rate_dollars,
        capacity: row.capacity,
        unit_length_minutes: row.unit_length_minutes,
        is_active: row.is_active,
      };
      return {
        ...prev,
        [selectedServiceLocationId]: {
          ...byLocation,
          [row.name]: {
            hourly_rate_dollars:
              updates.hourly_rate_dollars ?? existing.hourly_rate_dollars,
            capacity: updates.capacity ?? existing.capacity,
            unit_length_minutes:
              updates.unit_length_minutes ?? existing.unit_length_minutes,
            is_active: updates.is_active ?? existing.is_active,
          },
        },
      };
    });
  }

  function updateArchiveDraft(row: ArchiveRow, archived: boolean) {
    if (row.locked) return;
    setArchiveEdits((prev) => {
      const nextForType = { ...(prev[archiveType] ?? {}) };
      if (archived === row.archived) {
        delete nextForType[row.id];
      } else {
        nextForType[row.id] = archived;
      }
      return { ...prev, [archiveType]: nextForType };
    });
  }

  const childPromptResolverRef = useRef<
    ((value: string[] | null) => void) | null
  >(null);
  const [childPrompt, setChildPrompt] = useState<{
    parentId: string;
    parentLabel: string;
    childTypeLabel: string;
    items: Array<{ id: string; label: string; archived: boolean }>;
    selectedIds: string[];
  } | null>(null);
  const passwordPromptResolverRef = useRef<
    ((value: string | null) => void) | null
  >(null);
  const [passwordPrompt, setPasswordPrompt] = useState<{
    actionLabel: string;
  } | null>(null);
  const [passwordDraft, setPasswordDraft] = useState("");

  function openChildUnarchivePrompt(
    parentId: string,
    parentLabel: string,
    childTypeLabel: string,
    items: Array<{ id: string; label: string; archived: boolean }>,
  ) {
    return new Promise<string[] | null>((resolve) => {
      childPromptResolverRef.current = resolve;
      setChildPrompt({
        parentId,
        parentLabel,
        childTypeLabel,
        items,
        selectedIds: items
          .filter((item) => item.archived)
          .map((item) => item.id),
      });
    });
  }

  function closeChildUnarchivePrompt(result: string[] | null) {
    const resolve = childPromptResolverRef.current;
    childPromptResolverRef.current = null;
    setChildPrompt(null);
    resolve?.(result);
  }

  function openPasswordPrompt(actionLabel: string) {
    return new Promise<string | null>((resolve) => {
      passwordPromptResolverRef.current = resolve;
      setPasswordDraft("");
      setPasswordPrompt({ actionLabel });
    });
  }

  function closePasswordPrompt(result: string | null) {
    const resolve = passwordPromptResolverRef.current;
    passwordPromptResolverRef.current = null;
    setPasswordPrompt(null);
    setPasswordDraft("");
    resolve?.(result);
  }

  const sortedSubjectDrafts = useMemo(() => {
    const rows = [...subjectDrafts];
    const dir = subjectSort.dir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      if (subjectSort.key === "included") {
        const aBaseline = subjectBaselineMap.get(a.key);
        const bBaseline = subjectBaselineMap.get(b.key);
        const aIncluded =
          (aBaseline?.included ?? false) ||
          (aBaseline?.topics ?? []).some((t) => t.included);
        const bIncluded =
          (bBaseline?.included ?? false) ||
          (bBaseline?.topics ?? []).some((t) => t.included);
        const diff = Number(aIncluded) - Number(bIncluded);
        if (diff !== 0) return diff * dir;
      }
      const diff = a.name.localeCompare(b.name);
      if (diff !== 0) return diff * dir;
      return 0;
    });
    return rows;
  }, [subjectDrafts, subjectSort, subjectBaselineMap]);

  useEffect(() => {
    let cancelled = false;

    async function loadAll(accessToken: string, email: string | null) {
      setStatus(null);
      setLoading(true);
      try {
        const meRes = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const meJson = meRes.ok ? ((await meRes.json()) as Me) : null;
        if (cancelled) return;
        setMe(meJson);

        const orgRes = await fetch("/organizations", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!orgRes.ok) {
          setStatus(`Failed to load organization (${orgRes.status})`);
          return;
        }
        const orgs = (await orgRes.json()) as Org[];
        const org0 = orgs[0] ?? null;
        if (!org0) {
          router.replace("/onboarding");
          return;
        }
        if (cancelled) return;
        setOrg(org0);

        const locRes = await fetch("/locations?archived=all", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const locs = locRes.ok ? ((await locRes.json()) as Location[]) : [];
        if (cancelled) return;
        const locList = Array.isArray(locs) ? locs : [];
        setLocations(locList);
        const activeLocs = locList.filter((l) => !l.archived_at);
        if (!serviceLocationId && activeLocs[0]) {
          setServiceLocationId(activeLocs[0].id);
        }
        if (email) {
          setNewService((prev) => ({
            ...prev,
            location_id: prev.location_id || (activeLocs[0]?.id ?? ""),
          }));
        }

        if (!cancelled) setLoading(false);

        const loadRoomsAndServices = async () => {
          const roomsNext: Record<string, Room[]> = {};
          const servicesNext: Record<string, ServiceOffered[]> = {};
          await Promise.all(
            locList.map(async (loc) => {
              const [roomRes, svcRes] = await Promise.all([
                fetch(
                  `/rooms?location_id=${encodeURIComponent(loc.id)}&archived=all`,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  },
                ),
                fetch(
                  `/services-offered?location_id=${encodeURIComponent(loc.id)}`,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  },
                ),
              ]);
              if (roomRes.ok)
                roomsNext[loc.id] = (await roomRes.json()) as Room[];
              if (svcRes.ok)
                servicesNext[loc.id] =
                  (await svcRes.json()) as ServiceOffered[];
            }),
          );
          if (cancelled) return;
          setRoomsByLocation(roomsNext);
          setServicesByLocation(servicesNext);
        };

        const loadSubjectsAndTopics = async () => {
          const subjRes = await fetch("/subjects?archived=all", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const subjList = subjRes.ok
            ? ((await subjRes.json()) as Subject[])
            : [];
          if (cancelled) return;
          const subj = Array.isArray(subjList) ? subjList : [];
          setSubjects(subj);

          const topicsNext: Record<string, Topic[]> = {};
          await Promise.all(
            subj.map(async (s) => {
              const tRes = await fetch(
                `/topics?subject_id=${encodeURIComponent(s.id)}&archived=all`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                },
              );
              if (tRes.ok) topicsNext[s.id] = (await tRes.json()) as Topic[];
            }),
          );
          if (cancelled) return;
          setTopicsBySubject(topicsNext);

          const drafts = buildSubjectDrafts(subj, topicsNext);
          setSubjectDrafts(drafts);
          subjectDraftsInitialRef.current = drafts;
          setSubjectDraftsInitialKey(JSON.stringify(drafts));
        };

        const loadProducts = async () => {
          const prodRes = await fetch("/products", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (cancelled) return;
          if (prodRes.ok) {
            const prodList = (await prodRes.json()) as Product[];
            setProducts(Array.isArray(prodList) ? prodList : []);
          }
        };

        const loadClients = async () => {
          const [parentRes, studentRes, leadRes] = await Promise.all([
            fetch("/parents?archived=all", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            fetch("/students?archived=all", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            fetch("/leads?archived=all", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
          ]);
          if (cancelled) return;
          if (parentRes.ok) {
            const parentList = (await parentRes.json()) as Parent[];
            setParents(Array.isArray(parentList) ? parentList : []);
          }
          if (studentRes.ok) {
            const studentList = (await studentRes.json()) as Student[];
            setStudents(Array.isArray(studentList) ? studentList : []);
          }
          if (leadRes.ok) {
            const leadList = (await leadRes.json()) as Lead[];
            setLeads(Array.isArray(leadList) ? leadList : []);
          }
        };

        const loadTutors = async () => {
          const tutorRes = await fetch("/tutors?archived=all", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (cancelled) return;
          if (tutorRes.ok) {
            const tutorList = (await tutorRes.json()) as Tutor[];
            const activeTutors = Array.isArray(tutorList)
              ? tutorList.filter((t) => !t.archived_at)
              : [];
            setTutors(activeTutors);
            const draftMap: Record<string, string> = {};
            activeTutors.forEach((t) => {
              draftMap[t.id] = t.color_hex ?? DEFAULT_TUTOR_COLOR;
            });
            setTutorDrafts(draftMap);
            tutorDraftsInitialRef.current = draftMap;
          }
        };

        const loadEmailInboxes = async () => {
          const inboxRes = await fetch("/email-inboxes?archived=all", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (cancelled) return;
          if (inboxRes.ok) {
            const inboxList = (await inboxRes.json()) as EmailInbox[];
            const inboxes = Array.isArray(inboxList) ? inboxList : [];
            setEmailInboxes(inboxes);
            const mergedSources = mergeEmailInboxSources(
              loadPipelineSources(),
              inboxes,
            );
            pipelineForm.commit({ sources: mergedSources });
            savePipelineSources(mergedSources);
          }
        };

        const loadConnections = async () => {
          const res = await fetch("/connections", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (cancelled) return;
          if (res.ok) {
            const list = (await res.json()) as ConnectionSnapshot[];
            const next: Record<string, ConnectionSnapshot> = {};
            list.forEach((entry) => {
              next[entry.provider] = entry;
            });
            setConnectionSnapshots(next);
          }
        };

        void loadRoomsAndServices();
        void loadSubjectsAndTopics();
        void loadProducts();
        void loadClients();
        void loadTutors();
        void loadEmailInboxes();
        void loadConnections();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      const accessToken = session.access_token;
      setToken(accessToken);
      const email = session.user?.email ?? null;
      setUserEmail(email);
      loadAll(accessToken, email);
    });

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    if (!anyDirty) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [anyDirty]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!anyDirtyRef.current) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("/") || href.startsWith("/settings")) return;
      if (
        !window.confirm(
          "You have unsaved changes. Leave Settings without saving?",
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  function discardActive() {
    if (activeTab === "BUSINESS") businessForm.reset();
    if (activeTab === "SCHEDULE") scheduleForm.reset();
    if (activeTab === "SERVICES") {
      setServiceEdits({});
      setServiceCatalogDrafts({});
    }
    if (activeTab === "SUBJECTS_TOPICS") {
      const reset = subjectDraftsInitialRef.current;
      setSubjectDrafts(reset);
      setSubjectDraftsInitialKey(JSON.stringify(reset));
      setNewSubjectName("");
      setNewTopicDrafts({});
    }
    if (activeTab === "CLIENTS") {
      clientsForm.reset();
    }
    if (activeTab === "PIPELINE") {
      pipelineForm.reset();
      setNewEmailInbox({
        provider: "GMAIL",
        label: "",
        address: "",
        imap_host: "",
        imap_port: "993",
        imap_secure: true,
        password: "",
        daily_scan_enabled: false,
        daily_scan_time: "08:00",
      });
    }
    if (activeTab === "CONNECTIONS") {
      setConnections({});
    }
    if (activeTab === "TUTORS") {
      setTutorDrafts(tutorDraftsInitialRef.current);
      setNewTutor({
        first_name: "",
        last_name: "",
        email: "",
        color_hex: DEFAULT_TUTOR_COLOR,
      });
    }
    if (activeTab === "PRODUCTS" && marketingTab === "PRODUCTS") {
      setProductDraft(productDraftInitial);
    }
    if (activeTab === "PRODUCTS" && marketingTab === "COMPANY") {
      if (org) {
        const activeLogo =
          org.images?.find((img) => !img.archived_at)?.image_url ?? "";
        setCompanyDraft({
          company_description_text: org.company_description_text ?? "",
          mission_text: org.mission_text ?? "",
          tutoring_style_text: org.tutoring_style_text ?? "",
          about_us_text: org.about_us_text ?? org.about_text ?? "",
          company_logo_url: activeLogo,
        });
      }
    }
    if (activeTab === "PRODUCTS" && marketingTab === "SERVICES") {
      const next: Record<string, string> = {};
      const nextLogos: Record<string, string> = {};
      marketingServices.forEach((svc) => {
        next[svc.service_code] = svc.description_text ?? "";
        nextLogos[svc.service_code] = svc.service_logo_url ?? "";
      });
      setServiceDescriptionDrafts(next);
      setServiceLogoDrafts(nextLogos);
    }
    if (activeTab === "PRODUCTS" && marketingTab === "SUBJECTS") {
      const next: Record<string, string> = {};
      subjects.forEach((subject) => {
        next[subject.id] = subject.description_text ?? "";
      });
      setSubjectDescriptionDrafts(next);
    }
    if (activeTab === "PRODUCTS" && marketingTab === "TOPICS") {
      const topics = topicsBySubject[marketingSubjectId] ?? [];
      const next: Record<string, string> = {};
      topics.forEach((topic) => {
        next[topic.id] = topic.description_text ?? "";
      });
      setTopicDescriptionDrafts(next);
    }
  }

  async function switchTab(next: SettingsTab) {
    if (next === activeTab) return;
    let shouldDiscard = false;
    if (dirtyTabs[activeTab]) {
      const ok = window.confirm(
        "You have unsaved changes. Discard them and switch tabs?",
      );
      if (!ok) return;
      shouldDiscard = true;
    }
    if (next === "ARCHIVE") {
      const accessToken = await confirmWithPassword();
      if (!accessToken) return;
    }
    if (shouldDiscard) {
      discardActive();
    }
    setStatus(null);
    setActiveTab(next);
  }

  async function sendResetEmail() {
    if (!userEmail) return;
    setStatus(null);
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo,
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus("Reset link sent. Check your inbox.");
  }

  async function openBillingPortal() {
    if (!userEmail) return;
    setStatus(null);
    const res = await fetch("/api/stripe/create-billing-portal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        returnUrl: `${window.location.origin}/settings`,
      }),
    });
    const json = (await res.json()) as any;
    if (!res.ok || !json?.url) {
      setStatus(
        json?.error
          ? String(json.error)
          : `Billing portal failed (${res.status})`,
      );
      return;
    }
    window.location.href = json.url;
  }

  async function saveAccount() {
    if (!token) return;
    setStatus(null);
    const date_format = normalizeDateFormat(accountForm.formData.date_format);
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ date_format }),
    });
    if (!res.ok) {
      setStatus(`Save failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Org;
    setOrg((prev) => (prev ? { ...prev, ...updated } : updated));
    accountForm.commit({
      date_format: normalizeDateFormat(updated.date_format),
    });
    setStatus("Saved.");
  }

  async function saveBusiness() {
    if (!token) return;
    setStatus(null);
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        business_name: businessForm.formData.business_name,
        timezone: businessForm.formData.timezone,
        business_phone: businessForm.formData.business_phone,
        business_email: businessForm.formData.business_email,
        business_address_1: businessForm.formData.business_address_1,
        business_address_2: businessForm.formData.business_address_2,
        business_city: businessForm.formData.business_city,
        business_state: businessForm.formData.business_state,
        business_zip: businessForm.formData.business_zip,
      }),
    });
    if (!res.ok) {
      setStatus(`Save failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Org;
    setOrg((prev) => (prev ? { ...prev, ...updated } : updated));
    businessForm.commit({
      business_name: updated.business_name ?? "",
      timezone: updated.timezone ?? "America/New_York",
      business_phone: updated.business_phone ?? "",
      business_email: updated.business_email ?? "",
      business_address_1: updated.business_address_1 ?? "",
      business_address_2: updated.business_address_2 ?? "",
      business_city: updated.business_city ?? "",
      business_state: updated.business_state ?? "",
      business_zip: updated.business_zip ?? "",
    });
    setStatus("Saved.");
  }

  async function saveSchedule() {
    if (!token) return;
    setStatus(null);
    const normalizedBuffer = parseNonNegativeInt(
      bufferDraft,
      scheduleForm.formData.default_buffer_minutes ?? 0,
    );
    if (String(normalizedBuffer) !== bufferDraft.trim()) {
      setBufferDraft(String(normalizedBuffer));
    }
    scheduleForm.updateField("default_buffer_minutes", normalizedBuffer);
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ default_buffer_minutes: normalizedBuffer }),
    });
    if (!res.ok) {
      setStatus(`Save failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Org;
    setOrg((prev) => (prev ? { ...prev, ...updated } : updated));
    scheduleForm.commit({
      default_buffer_minutes: updated.default_buffer_minutes ?? 15,
    });
    setStatus("Saved.");
  }

  async function saveServices() {
    if (!token) return;
    setStatus(null);
    const locationIds = new Set<string>();
    Object.keys(serviceEdits).forEach((id) => {
      const svc = serviceById.get(id);
      if (svc?.location_id) locationIds.add(svc.location_id);
    });
    Object.entries(serviceCatalogDrafts).forEach(([locId, drafts]) => {
      if (Object.keys(drafts).length > 0) locationIds.add(locId);
    });

    if (locationIds.size === 0) {
      setStatus("No changes to save.");
      return;
    }

    const savedLocationIds: string[] = [];

    for (const locId of locationIds) {
      const locationLabel = locationNameById.get(locId) ?? "Location";
      const existingServices = servicesByLocation[locId] ?? [];
      const existingById = new Map(existingServices.map((s) => [s.id, s]));
      const existingCodes = new Set(
        existingServices.map((s) => s.service_code),
      );

      const editsForLocation = Object.entries(serviceEdits).filter(([id]) => {
        const svc = serviceById.get(id);
        return svc?.location_id === locId;
      });

      for (const [id, patch] of editsForLocation) {
        const svc = existingById.get(id) ?? serviceById.get(id);
        if (!svc) continue;
        const desiredActive = patch.is_active;
        let cents = dollarsToCents(patch.hourly_rate_dollars);
        let capacity = Number.parseInt(patch.capacity || "0", 10);
        let unitLength = Number.parseInt(patch.unit_length_minutes || "0", 10);

        if (desiredActive) {
          if (cents == null) {
            setStatus(
              `${locationLabel}: please enter a valid unit price (e.g. 99.95).`,
            );
            return;
          }
          if (!Number.isInteger(capacity) || capacity < 1) {
            setStatus(
              `${locationLabel}: please enter a valid capacity (>= 1).`,
            );
            return;
          }
          if (!Number.isInteger(unitLength) || unitLength < 1) {
            setStatus(
              `${locationLabel}: please enter a valid unit length in minutes (>= 1).`,
            );
            return;
          }
        } else {
          if (cents == null) cents = svc.hourly_rate_cents;
          if (!Number.isInteger(capacity) || capacity < 1)
            capacity = svc.capacity ?? 1;
          if (!Number.isInteger(unitLength) || unitLength < 1)
            unitLength = svc.unit_length_minutes ?? 60;
        }
        const res = await fetch("/services-offered", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            service_offered_id: id,
            display_name: svc.display_name ?? svc.service_code,
            hourly_rate_cents: cents,
            capacity,
            unit_length_minutes: unitLength,
            is_active: patch.is_active,
          }),
        });
        if (!res.ok) {
          let message = "";
          try {
            const json = await res.json();
            message = typeof json?.message === "string" ? json.message : "";
          } catch {
            message = "";
          }
          const cleaned =
            message && message.length < 160
              ? message
              : "Please check your inputs and try again.";
          setStatus(
            `Service save failed for ${locationLabel} (${res.status}). ${cleaned}`,
          );
          return;
        }
      }

      const catalogDrafts = serviceCatalogDrafts[locId] ?? {};
      for (const [name, patch] of Object.entries(catalogDrafts)) {
        if (!patch.is_active) continue;
        const exists = existingServices.find(
          (s) =>
            normalizeKey(s.display_name ?? s.service_code) ===
            normalizeKey(name),
        );
        if (exists) continue;
        const cents = dollarsToCents(patch.hourly_rate_dollars);
        if (cents == null) {
          setStatus(
            `${locationLabel}: please enter a valid unit price (e.g. 99.95).`,
          );
          return;
        }
        const capacity = Number.parseInt(patch.capacity || "0", 10);
        if (!Number.isInteger(capacity) || capacity < 1) {
          setStatus(`${locationLabel}: please enter a valid capacity (>= 1).`);
          return;
        }
        const unitLength = Number.parseInt(
          patch.unit_length_minutes || "0",
          10,
        );
        if (!Number.isInteger(unitLength) || unitLength < 1) {
          setStatus(
            `${locationLabel}: please enter a valid unit length in minutes (>= 1).`,
          );
          return;
        }
        const service_code = makeUniqueServiceCode(name, existingCodes);
        existingCodes.add(service_code);
        const res = await fetch("/services-offered", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            location_id: locId,
            service_code,
            display_name: name,
            hourly_rate_cents: cents,
            capacity,
            unit_length_minutes: unitLength,
            is_active: true,
          }),
        });
        if (!res.ok) {
          let message = "";
          try {
            const json = await res.json();
            message = typeof json?.message === "string" ? json.message : "";
          } catch {
            message = "";
          }
          const cleaned =
            message && message.length < 160
              ? message
              : "Please check your inputs and try again.";
          setStatus(
            `Add service failed for ${locationLabel} (${res.status}). ${cleaned}`,
          );
          return;
        }
      }

      const refreshRes = await fetch(
        `/services-offered?location_id=${encodeURIComponent(locId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (refreshRes.ok) {
        const refreshed = (await refreshRes.json()) as ServiceOffered[];
        setServicesByLocation((prev) => ({ ...prev, [locId]: refreshed }));
      }

      savedLocationIds.push(locId);
    }

    setServiceEdits((prev) => {
      if (savedLocationIds.length === 0) return prev;
      const savedSet = new Set(savedLocationIds);
      const next: typeof prev = {};
      Object.entries(prev).forEach(([id, patch]) => {
        const svc = serviceById.get(id);
        if (!svc || !savedSet.has(svc.location_id)) {
          next[id] = patch;
        }
      });
      return next;
    });

    setServiceCatalogDrafts((prev) => {
      if (savedLocationIds.length === 0) return prev;
      const savedSet = new Set(savedLocationIds);
      const next: typeof prev = {};
      Object.entries(prev).forEach(([locId, drafts]) => {
        if (!savedSet.has(locId)) next[locId] = drafts;
      });
      return next;
    });

    setStatus(savedLocationIds.length > 1 ? "Saved all locations." : "Saved.");
  }

  async function saveSubjectsTopics() {
    setStatus(null);
    let accessToken = token;
    if (!accessToken) {
      const sessionRes = await supabase.auth.getSession();
      accessToken = sessionRes.data.session?.access_token ?? null;
    }
    if (!accessToken) {
      const refreshRes = await supabase.auth.refreshSession();
      accessToken = refreshRes.data.session?.access_token ?? null;
    }
    if (!accessToken) {
      setStatus("Session expired. Please log in again.");
      return;
    }
    if (accessToken !== token) setToken(accessToken);
    const nextDrafts: SubjectDraft[] = subjectDrafts.map((s) => ({
      ...s,
      topics: s.topics.map((t) => ({ ...t })),
    }));
    const baselineMap = subjectBaselineMap;
    const requestOrThrow = async (
      input: string,
      init: RequestInit,
      label: string,
    ) => {
      const res = await fetch(input, init);
      if (!res.ok) {
        const message = await res.text();
        throw new Error(`${label} (${res.status}): ${message}`);
      }
      return res;
    };

    try {
      const newSubjects = nextDrafts.filter(
        (subject) =>
          !subject.id &&
          (subject.included || subject.topics.some((t) => t.included)),
      );
      await Promise.all(
        newSubjects.map(async (subject) => {
          const res = await requestOrThrow(
            "/subjects",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "content-type": "application/json",
              },
              body: JSON.stringify({ subject_name: subject.name }),
            },
            "Add subject failed",
          );
          const created = (await res.json()) as Subject;
          subject.id = created.id;
        }),
      );

      const subjectUpdates: Promise<void>[] = [];
      nextDrafts.forEach((subject) => {
        if (!subject.id) return;
        const baseline = baselineMap.get(subject.key);
        if (!baseline) return;
        const includedChanged = baseline.included !== subject.included;
        const nameChanged = baseline.name !== subject.name;
        if (!includedChanged && !nameChanged) return;
        subjectUpdates.push(
          (async () => {
            await requestOrThrow(
              "/subjects",
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  subject_id: subject.id,
                  subject_name: subject.name,
                  archived: !subject.included,
                }),
              },
              "Subject save failed",
            );
          })(),
        );
      });

      const topicOps: Promise<void>[] = [];
      nextDrafts.forEach((subject) => {
        if (!subject.id) return;
        const baselineSubject = baselineMap.get(subject.key);
        const baselineTopicsByKey = new Map(
          (baselineSubject?.topics ?? []).map((topic) => [topic.key, topic]),
        );
        subject.topics.forEach((topic) => {
          const baselineTopic = baselineTopicsByKey.get(topic.key);
          if (!topic.id) {
            if (!topic.included) return;
            topicOps.push(
              (async () => {
                const res = await requestOrThrow(
                  "/topics",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      subject_id: subject.id,
                      topic_name: topic.name,
                    }),
                  },
                  "Add topic failed",
                );
                const created = (await res.json()) as Topic;
                topic.id = created.id;
              })(),
            );
            return;
          }
          const includedChanged =
            (baselineTopic?.included ?? false) !== topic.included;
          const nameChanged = (baselineTopic?.name ?? "") !== topic.name;
          if (!includedChanged && !nameChanged) return;
          topicOps.push(
            (async () => {
              await requestOrThrow(
                "/topics",
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    topic_id: topic.id,
                    topic_name: topic.name,
                    archived: !topic.included,
                  }),
                },
                "Topic save failed",
              );
            })(),
          );
        });
      });

      await Promise.all([...subjectUpdates, ...topicOps]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Save failed.");
      return;
    }

    setSubjectDrafts(nextDrafts);
    subjectDraftsInitialRef.current = nextDrafts;
    setSubjectDraftsInitialKey(JSON.stringify(nextDrafts));
    setStatus("Saved.");
  }

  function updateClientField(
    group: "parents" | "students",
    key: string,
    value: boolean,
  ) {
    clientsForm.setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }));
  }

  function saveClientFields() {
    saveClientFieldPrefs(clientsForm.formData);
    clientsForm.commit(clientsForm.formData);
    setStatus("Client fields saved.");
  }

  async function saveConnection(
    providerId: ConnectionProviderId,
    opts?: { silent?: boolean },
  ) {
    if (!token) return;
    const fields = connections[providerId] ?? {};
    const res = await fetch(`/connections/${providerId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) {
      const message = await res.text();
      setStatus(`Connection save failed (${res.status}): ${message}`);
      return;
    }
    const snapshot = (await res.json()) as ConnectionSnapshot;
    setConnectionSnapshots((prev) => ({ ...prev, [providerId]: snapshot }));
    setConnections((prev) => ({ ...prev, [providerId]: {} }));
    if (!opts?.silent) {
      const label = getConnectionProvider(providerId)?.label ?? "Connection";
      setStatus(`${label} saved.`);
    }
  }

  async function saveAllConnections() {
    const dirtyProviders = CONNECTION_PROVIDERS.filter((provider) =>
      Object.values(connections[provider.id] ?? {}).some(
        (value) => value.trim().length > 0,
      ),
    );
    if (dirtyProviders.length === 0) {
      setStatus("No connection changes to save.");
      return;
    }
    for (const provider of dirtyProviders) {
      await saveConnection(provider.id, { silent: true });
    }
    setStatus("Connections saved.");
  }

  async function startConnectionOAuth(providerId: ConnectionProviderId) {
    if (!token) return;
    const res = await fetch(`/connections/${providerId}/oauth/start`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const message = await res.text();
      setStatus(`OAuth start failed (${res.status}): ${message}`);
      return;
    }
    const json = (await res.json()) as { url?: string };
    if (json?.url && typeof window !== "undefined") {
      window.location.href = json.url;
    }
  }

  function updatePipelineSource(
    id: string,
    updates: Partial<PipelineSourceSetting>,
  ) {
    pipelineForm.setFormData((prev) => ({
      ...prev,
      sources: prev.sources.map((source) =>
        source.id === id ? { ...source, ...updates } : source,
      ),
    }));

    if (id.startsWith("email:") && typeof updates.enabled === "boolean") {
      const inboxId = id.slice("email:".length);
      void patchEmailInbox(inboxId, { enabled: updates.enabled });
    }
  }

  function removePipelineSource(id: string) {
    pipelineForm.setFormData((prev) => ({
      ...prev,
      sources: prev.sources.filter((source) => source.id !== id),
    }));

    if (id.startsWith("email:")) {
      const inboxId = id.slice("email:".length);
      void archiveEmailInbox(inboxId);
    }
  }

  function mergeEmailInboxSources(
    sources: PipelineSourceSetting[],
    inboxes: EmailInbox[],
  ) {
    const baseSources = sources.filter(
      (source) => !source.id.startsWith("email:"),
    );
    const emailSources = inboxes
      .filter((inbox) => !inbox.archived_at)
      .map((inbox) => {
        const label = inbox.label ?? "";
        const source = makeEmailSource(
          label,
          inbox.address,
          undefined,
          inbox.id,
        );
        return { ...source, enabled: inbox.enabled, address: inbox.address };
      });
    return [...baseSources, ...emailSources];
  }

  async function addEmailInbox() {
    if (!token) return;
    const address = newEmailInbox.address.trim();
    if (!address) {
      setStatus("Enter an email address.");
      return;
    }

    const provider = newEmailInbox.provider;
    const payload: Record<string, any> = {
      provider,
      auth_type: provider === "IMAP" ? "IMAP" : "OAUTH",
      address,
      label: newEmailInbox.label.trim() || null,
      enabled: true,
      daily_scan_enabled: newEmailInbox.daily_scan_enabled,
      daily_scan_time: newEmailInbox.daily_scan_time,
    };

    if (provider === "IMAP") {
      const host = newEmailInbox.imap_host.trim();
      const port = Number.parseInt(newEmailInbox.imap_port || "0", 10);
      if (!host || !port) {
        setStatus("IMAP host and port are required.");
        return;
      }
      if (!newEmailInbox.password.trim()) {
        setStatus("IMAP password is required.");
        return;
      }
      payload.imap_host = host;
      payload.imap_port = port;
      payload.imap_secure = newEmailInbox.imap_secure;
      payload.credentials = {
        username: address,
        password: newEmailInbox.password.trim(),
      };
    }

    const res = await fetch("/email-inboxes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setStatus(`Email inbox add failed (${res.status}): ${await res.text()}`);
      return;
    }
    const created = (await res.json()) as EmailInbox;
    const nextInboxes = [created, ...emailInboxes];
    setEmailInboxes(nextInboxes);

    const merged = mergeEmailInboxSources(
      pipelineForm.formData.sources,
      nextInboxes,
    );
    pipelineForm.setFormData((prev) => ({ ...prev, sources: merged }));
    savePipelineSources(merged);
    pipelineForm.commit({ sources: merged });

    setNewEmailInbox({
      provider: "GMAIL",
      label: "",
      address: "",
      imap_host: "",
      imap_port: "993",
      imap_secure: true,
      password: "",
      daily_scan_enabled: false,
      daily_scan_time: "08:00",
    });
    setStatus("Email inbox added.");
  }

  async function patchEmailInbox(
    id: string,
    updates: Partial<EmailInbox> & { credentials?: any },
  ) {
    if (!token) return;
    const res = await fetch(`/email-inboxes/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      setStatus(
        `Email inbox update failed (${res.status}): ${await res.text()}`,
      );
      return;
    }
    const updated = (await res.json()) as EmailInbox;
    setEmailInboxes((prev) =>
      prev.map((item) =>
        item.id === updated.id ? { ...item, ...updated } : item,
      ),
    );
    if (typeof updates.enabled === "boolean") {
      const sourceId = `email:${updated.id}`;
      const nextSources = pipelineForm.formData.sources.map((source) =>
        source.id === sourceId
          ? { ...source, enabled: updates.enabled ?? source.enabled }
          : source,
      );
      pipelineForm.setFormData((prev) => ({ ...prev, sources: nextSources }));
      savePipelineSources(nextSources);
      pipelineForm.commit({ sources: nextSources });
    }
  }

  async function archiveEmailInbox(id: string) {
    if (!token) return;
    const res = await fetch(`/email-inboxes/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ archived: true }),
    });
    if (!res.ok) {
      setStatus(
        `Email inbox archive failed (${res.status}): ${await res.text()}`,
      );
      return;
    }
    setEmailInboxes((prev) => prev.filter((item) => item.id !== id));
    const sourceId = `email:${id}`;
    const nextSources = pipelineForm.formData.sources.filter(
      (source) => source.id !== sourceId,
    );
    pipelineForm.setFormData((prev) => ({ ...prev, sources: nextSources }));
    savePipelineSources(nextSources);
    pipelineForm.commit({ sources: nextSources });
  }

  async function connectGoogleInbox(id: string) {
    if (!token) return;
    setStatus(null);
    const res = await fetch(`/email-inboxes/${id}/oauth/google`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setStatus(`Gmail connect failed (${res.status}): ${await res.text()}`);
      return;
    }
    const json = (await res.json()) as { url?: string };
    if (!json?.url) {
      setStatus("Gmail connect failed: missing authorization URL.");
      return;
    }
    window.location.href = json.url;
  }

  function providerLabel(value: EmailInbox["provider"]) {
    if (value === "GMAIL") return "Gmail";
    if (value === "OUTLOOK") return "Outlook";
    return "IMAP";
  }

  async function archiveTutor(id: string) {
    if (!token) return;
    setStatus(null);
    const res = await fetch("/tutors", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ tutor_id: id, archived: true }),
    });
    if (!res.ok) {
      setStatus(`Tutor archive failed (${res.status}): ${await res.text()}`);
      return;
    }
    setTutors((prev) => prev.filter((tutor) => tutor.id !== id));
    setTutorDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    const nextInitial = { ...tutorDraftsInitialRef.current };
    delete nextInitial[id];
    tutorDraftsInitialRef.current = nextInitial;
  }

  function savePipelineSettings() {
    savePipelineSources(pipelineForm.formData.sources);
    pipelineForm.commit(pipelineForm.formData);
    setStatus("Pipeline settings saved.");
  }

  async function saveProducts() {
    if (!token) return;
    setStatus(null);
    const name = productDraft.product_name.trim();
    if (!name) {
      setStatus("Enter a product name.");
      return;
    }

    const payload = {
      product_id: productDraft.id,
      product_name: name,
      product_slogan_text: productDraft.product_slogan_text,
      product_description_text: productDraft.product_description_text,
      product_logo_url: productDraft.product_logo_url,
      service_code: productDraft.service_code || null,
      subject_id: productDraft.subject_id || null,
      topic_id: productDraft.topic_id || null,
      product_type: "CLASS",
    };

    const method = productDraft.id ? "PATCH" : "POST";
    const res = await fetch("/products", {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Product save failed (${res.status}): ${text}`);
      return;
    }

    const saved = (await res.json()) as Product;
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      if (!exists)
        return [...prev, saved].sort((a, b) =>
          a.product_name.localeCompare(b.product_name),
        );
      return prev.map((p) => (p.id === saved.id ? saved : p));
    });
    const draft = buildProductDraft(saved);
    setProductDraft(draft);
    setProductDraftInitial(draft);
    setStatus("Product saved.");
  }

  function selectProduct(product: Product | null) {
    productAutoSelectedRef.current = true;
    const draft = product
      ? buildProductDraft(product)
      : { ...EMPTY_PRODUCT_DRAFT };
    setProductDraft(draft);
    setProductDraftInitial(draft);
    if (product?.id) {
      void loadCatalogMedia({
        kind: "product",
        id: product.id,
        product_id: product.id,
      });
    }
  }

  async function saveServiceDescription(service_code: string) {
    if (!token) return;
    const description_text = serviceDescriptionDrafts[service_code] ?? "";
    const service_logo_url =
      (serviceLogoDrafts[service_code] ?? "").trim() || null;
    const serviceIds = Object.values(servicesByLocation)
      .flat()
      .filter((svc) => svc.service_code === service_code)
      .map((svc) => svc.id);
    if (!serviceIds.length) return;
    for (const id of serviceIds) {
      const res = await fetch("/services-offered", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          service_offered_id: id,
          description_text,
          service_logo_url,
        }),
      });
      if (!res.ok) {
        setStatus(
          `Service description save failed (${res.status}): ${await res.text()}`,
        );
        return;
      }
    }
    setServicesByLocation((prev) => {
      const next: Record<string, ServiceOffered[]> = {};
      Object.entries(prev).forEach(([locId, list]) => {
        next[locId] = list.map((svc) =>
          svc.service_code === service_code
            ? { ...svc, description_text, service_logo_url }
            : svc,
        );
      });
      return next;
    });
    setStatus("Service description saved.");
  }

  async function saveSubjectDescription(subject_id: string) {
    if (!token) return;
    const description_text = subjectDescriptionDrafts[subject_id] ?? "";
    const res = await fetch("/subjects", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ subject_id, description_text }),
    });
    if (!res.ok) {
      setStatus(
        `Subject description save failed (${res.status}): ${await res.text()}`,
      );
      return;
    }
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subject_id ? { ...subject, description_text } : subject,
      ),
    );
    setStatus("Subject description saved.");
  }

  async function saveTopicDescription(topic_id: string) {
    if (!token) return;
    const description_text = topicDescriptionDrafts[topic_id] ?? "";
    const res = await fetch("/topics", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic_id, description_text }),
    });
    if (!res.ok) {
      setStatus(
        `Topic description save failed (${res.status}): ${await res.text()}`,
      );
      return;
    }
    setTopicsBySubject((prev) => {
      const next: Record<string, Topic[]> = {};
      Object.entries(prev).forEach(([subjectId, list]) => {
        next[subjectId] = list.map((topic) =>
          topic.id === topic_id ? { ...topic, description_text } : topic,
        );
      });
      return next;
    });
    setStatus("Topic description saved.");
  }

  async function saveTutors() {
    if (!token) return;
    setStatus(null);

    const updates = Object.entries(tutorDrafts).filter(
      ([id, color]) => color !== tutorDraftsInitialRef.current[id],
    );

    for (const [id, color_hex] of updates) {
      const res = await fetch("/tutors", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ tutor_id: id, color_hex }),
      });
      if (!res.ok) {
        setStatus(`Tutor update failed (${res.status}): ${await res.text()}`);
        return;
      }
    }

    const email = newTutor.email.trim();
    if (email) {
      const res = await fetch("/tutors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: newTutor.first_name.trim() || null,
          last_name: newTutor.last_name.trim() || null,
          color_hex: newTutor.color_hex,
        }),
      });
      if (!res.ok) {
        setStatus(`Tutor create failed (${res.status}): ${await res.text()}`);
        return;
      }
    }

    const tutorRes = await fetch("/tutors?archived=all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (tutorRes.ok) {
      const tutorList = (await tutorRes.json()) as Tutor[];
      const activeTutors = Array.isArray(tutorList)
        ? tutorList.filter((t) => !t.archived_at)
        : [];
      setTutors(activeTutors);
      const draftMap: Record<string, string> = {};
      activeTutors.forEach((t) => {
        draftMap[t.id] = t.color_hex ?? DEFAULT_TUTOR_COLOR;
      });
      setTutorDrafts(draftMap);
      tutorDraftsInitialRef.current = draftMap;
    }

    setNewTutor({
      first_name: "",
      last_name: "",
      email: "",
      color_hex: DEFAULT_TUTOR_COLOR,
    });
    setStatus("Tutors saved.");
  }

  async function updateArchive() {
    if (!token) return;
    setStatus(null);

    const editsForType = archiveEdits[archiveType] ?? {};
    if (Object.keys(editsForType).length === 0) {
      setStatus("No archive changes.");
      return;
    }

    const desiredByType = new Map<ArchiveType, Map<string, boolean>>();
    const setDesired = (type: ArchiveType, id: string, archived: boolean) => {
      const map = desiredByType.get(type) ?? new Map<string, boolean>();
      map.set(id, archived);
      desiredByType.set(type, map);
    };

    archiveRows.forEach((row) => {
      const next = editsForType[row.id];
      if (next === undefined) return;
      setDesired(archiveType, row.id, next);
    });

    if (archiveType === "PARENTS") {
      const parentDesired = desiredByType.get("PARENTS");
      if (parentDesired) {
        for (const [parentId, archived] of parentDesired.entries()) {
          if (archived) {
            (studentsByParentId.get(parentId) ?? []).forEach((student) => {
              setDesired("STUDENTS", student.id, true);
            });
          } else {
            const allChildren = studentsByParentId.get(parentId) ?? [];
            const hasArchived = allChildren.some(
              (student) => student.archived_at,
            );
            if (hasArchived) {
              const items = allChildren.map((student) => ({
                id: student.id,
                label: studentDisplayName(student),
                archived: Boolean(student.archived_at),
              }));
              const selected = await openChildUnarchivePrompt(
                parentId,
                parentNameById.get(parentId) ?? "Parent",
                "Students",
                items,
              );
              if (selected === null) return;
              selected.forEach((id) => setDesired("STUDENTS", id, false));
            }
          }
        }
      }
    }

    if (archiveType === "LOCATIONS") {
      const locationDesired = desiredByType.get("LOCATIONS");
      if (locationDesired) {
        for (const [locationId, archived] of locationDesired.entries()) {
          if (archived) {
            (roomsByLocation[locationId] ?? []).forEach((room) => {
              setDesired("ROOMS", room.id, true);
            });
          } else {
            const allChildren = roomsByLocation[locationId] ?? [];
            const hasArchived = allChildren.some((room) => room.archived_at);
            if (hasArchived) {
              const items = allChildren.map((room) => ({
                id: room.id,
                label: room.room_name || "Room",
                archived: Boolean(room.archived_at),
              }));
              const selected = await openChildUnarchivePrompt(
                locationId,
                locationNameById.get(locationId) ?? "Location",
                "Rooms",
                items,
              );
              if (selected === null) return;
              selected.forEach((id) => setDesired("ROOMS", id, false));
            }
          }
        }
      }
    }

    if (archiveType === "SUBJECTS") {
      const subjectDesired = desiredByType.get("SUBJECTS");
      if (subjectDesired) {
        for (const [subjectId, archived] of subjectDesired.entries()) {
          if (archived) {
            (topicsBySubject[subjectId] ?? []).forEach((topic) => {
              setDesired("TOPICS", topic.id, true);
            });
          } else {
            const allChildren = topicsBySubject[subjectId] ?? [];
            const hasArchived = allChildren.some((topic) => topic.archived_at);
            if (hasArchived) {
              const items = allChildren.map((topic) => ({
                id: topic.id,
                label: topic.topic_name || "Topic",
                archived: Boolean(topic.archived_at),
              }));
              const selected = await openChildUnarchivePrompt(
                subjectId,
                subjectNameById.get(subjectId) ?? "Subject",
                "Topics",
                items,
              );
              if (selected === null) return;
              selected.forEach((id) => setDesired("TOPICS", id, false));
            }
          }
        }
      }
    }

    if (archiveType === "LEADS") {
      const leadDesired = desiredByType.get("LEADS");
      const limit = planLeadLimit(plan);
      if (leadDesired && limit !== null) {
        const activeCount = leads.filter((lead) => !lead.archived_at).length;
        let archiveCount = 0;
        let unarchiveCount = 0;
        const archiveIds = new Set<string>();
        const unarchiveIds = new Set<string>();
        leadDesired.forEach((archived, id) => {
          if (archived) {
            archiveCount += 1;
            archiveIds.add(id);
          } else {
            unarchiveCount += 1;
            unarchiveIds.add(id);
          }
        });

        let projected = activeCount - archiveCount + unarchiveCount;
        if (projected > limit) {
          const needed = projected - limit;
          const candidates = leads
            .filter(
              (lead) =>
                !lead.archived_at &&
                !archiveIds.has(lead.id) &&
                !unarchiveIds.has(lead.id),
            )
            .sort((a, b) => {
              const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
              const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
              return aTime - bTime;
            });
          candidates.slice(0, needed).forEach((lead) => {
            setDesired("LEADS", lead.id, true);
          });
        }
      }
    }

    const ops: ArchiveOp[] = [];
    desiredByType.forEach((map, type) => {
      const baseMap = archiveMaps[type];
      map.forEach((desired, id) => {
        const baseRow = baseMap.get(id);
        if (!baseRow) return;
        if (desired === baseRow.archived) return;
        ops.push({ type, id, archived: desired, label: baseRow.label });
      });
    });

    if (ops.length === 0) {
      setStatus("No archive changes.");
      return;
    }

    const toArchive = ops.filter((op) => op.archived);
    const toUnarchive = ops.filter((op) => !op.archived);
    const formatLine = (op: ArchiveOp) =>
      `${ARCHIVE_LABELS[op.type]}: ${op.label}`;
    const summary = [
      `Archive (${toArchive.length}):`,
      toArchive.length
        ? toArchive.map((op) => `- ${formatLine(op)}`).join("\n")
        : "- None",
      "",
      `Unarchive (${toUnarchive.length}):`,
      toUnarchive.length
        ? toUnarchive.map((op) => `- ${formatLine(op)}`).join("\n")
        : "- None",
    ].join("\n");

    const confirmed = window.confirm(summary);
    if (!confirmed) return;

    const accessToken = (await confirmWithPassword()) ?? token;
    if (!accessToken) return;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    };

    const updatedByType = new Map<ArchiveType, Map<string, boolean>>();
    const recordUpdate = (type: ArchiveType, id: string, archived: boolean) => {
      const map = updatedByType.get(type) ?? new Map<string, boolean>();
      map.set(id, archived);
      updatedByType.set(type, map);
    };

    for (const op of ops) {
      let res: Response | null = null;
      if (op.type === "PARENTS") {
        res = await fetch("/parents", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ parent_id: op.id, archived: op.archived }),
        });
      } else if (op.type === "STUDENTS") {
        res = await fetch("/students", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ student_id: op.id, archived: op.archived }),
        });
      } else if (op.type === "LEADS") {
        res = await fetch(`/leads/${op.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ archived: op.archived }),
        });
      } else if (op.type === "LOCATIONS") {
        res = await fetch("/locations", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ location_id: op.id, archived: op.archived }),
        });
      } else if (op.type === "ROOMS") {
        res = await fetch("/rooms", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ room_id: op.id, archived: op.archived }),
        });
      } else if (op.type === "SERVICES") {
        const service = serviceById.get(op.id);
        if (!service) {
          setStatus("Service not found.");
          return;
        }
        res = await fetch("/services-offered", {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            service_offered_id: service.id,
            display_name: service.display_name ?? service.service_code,
            hourly_rate_cents: service.hourly_rate_cents,
            is_active: !op.archived,
          }),
        });
      } else if (op.type === "SUBJECTS") {
        res = await fetch("/subjects", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ subject_id: op.id, archived: op.archived }),
        });
      } else if (op.type === "TOPICS") {
        res = await fetch("/topics", {
          method: "PATCH",
          headers,
          body: JSON.stringify({ topic_id: op.id, archived: op.archived }),
        });
      }

      if (!res || !res.ok) {
        const detail = res ? await res.text() : "Unknown error";
        setStatus(
          `Archive update failed for ${ARCHIVE_LABELS[op.type]} (${res?.status ?? "?"}): ${detail}`,
        );
        return;
      }

      recordUpdate(op.type, op.id, op.archived);
    }

    const now = new Date().toISOString();

    if (updatedByType.has("PARENTS")) {
      const updates = updatedByType.get("PARENTS")!;
      const studentUpdates = updatedByType.get("STUDENTS");
      setParents((prev) =>
        prev.map((parent) => {
          const archived = updates.get(parent.id);
          const nextParent =
            archived === undefined
              ? parent
              : { ...parent, archived_at: archived ? now : null };
          if (!nextParent.students || !studentUpdates) return nextParent;
          return {
            ...nextParent,
            students: nextParent.students.map((student) => {
              const studentArchived = studentUpdates.get(student.id);
              return studentArchived === undefined
                ? student
                : { ...student, archived_at: studentArchived ? now : null };
            }),
          };
        }),
      );
    }

    if (updatedByType.has("STUDENTS")) {
      const updates = updatedByType.get("STUDENTS")!;
      setStudents((prev) =>
        prev.map((student) => {
          const archived = updates.get(student.id);
          return archived === undefined
            ? student
            : { ...student, archived_at: archived ? now : null };
        }),
      );
    }

    if (updatedByType.has("LEADS")) {
      const updates = updatedByType.get("LEADS")!;
      setLeads((prev) =>
        prev.map((lead) => {
          const archived = updates.get(lead.id);
          return archived === undefined
            ? lead
            : { ...lead, archived_at: archived ? now : null };
        }),
      );
    }

    if (updatedByType.has("LOCATIONS")) {
      const updates = updatedByType.get("LOCATIONS")!;
      setLocations((prev) =>
        prev.map((location) => {
          const archived = updates.get(location.id);
          return archived === undefined
            ? location
            : { ...location, archived_at: archived ? now : null };
        }),
      );
    }

    if (updatedByType.has("ROOMS")) {
      const updates = updatedByType.get("ROOMS")!;
      setRoomsByLocation((prev) => {
        const next: Record<string, Room[]> = {};
        Object.entries(prev).forEach(([locationId, rooms]) => {
          next[locationId] = rooms.map((room) => {
            const archived = updates.get(room.id);
            return archived === undefined
              ? room
              : { ...room, archived_at: archived ? now : null };
          });
        });
        return next;
      });
    }

    if (updatedByType.has("SERVICES")) {
      const updates = updatedByType.get("SERVICES")!;
      setServicesByLocation((prev) => {
        const next: Record<string, ServiceOffered[]> = {};
        Object.entries(prev).forEach(([locationId, services]) => {
          next[locationId] = services.map((service) => {
            const archived = updates.get(service.id);
            return archived === undefined
              ? service
              : { ...service, is_active: !archived };
          });
        });
        return next;
      });
    }

    let nextSubjects = subjects;
    let nextTopics = topicsBySubject;

    if (updatedByType.has("SUBJECTS")) {
      const updates = updatedByType.get("SUBJECTS")!;
      nextSubjects = subjects.map((subject) => {
        const archived = updates.get(subject.id);
        return archived === undefined
          ? subject
          : { ...subject, archived_at: archived ? now : null };
      });
      setSubjects(nextSubjects);
    }

    if (updatedByType.has("TOPICS")) {
      const updates = updatedByType.get("TOPICS")!;
      const updatedTopics: Record<string, Topic[]> = {};
      Object.entries(topicsBySubject).forEach(([subjectId, topics]) => {
        updatedTopics[subjectId] = topics.map((topic) => {
          const archived = updates.get(topic.id);
          return archived === undefined
            ? topic
            : { ...topic, archived_at: archived ? now : null };
        });
      });
      nextTopics = updatedTopics;
      setTopicsBySubject(updatedTopics);
    }

    if (updatedByType.has("SUBJECTS") || updatedByType.has("TOPICS")) {
      const drafts = buildSubjectDrafts(nextSubjects, nextTopics);
      setSubjectDrafts(drafts);
      subjectDraftsInitialRef.current = drafts;
      setSubjectDraftsInitialKey(JSON.stringify(drafts));
    }

    setArchiveEdits((prev) => {
      const next = { ...prev };
      updatedByType.forEach((_, type) => {
        next[type] = {};
      });
      return next;
    });

    setStatus("Archive updated.");
  }

  async function onSave() {
    if (activeTab === "ACCOUNT") return saveAccount();
    if (activeTab === "BUSINESS") return saveBusiness();
    if (activeTab === "SCHEDULE") return saveSchedule();
    if (activeTab === "SERVICES") return saveServices();
    if (activeTab === "SUBJECTS_TOPICS") return saveSubjectsTopics();
    if (activeTab === "CLIENTS") return saveClientFields();
    if (activeTab === "CONNECTIONS") {
      return saveAllConnections();
    }
    if (activeTab === "PIPELINE") return savePipelineSettings();
    if (activeTab === "TUTORS") return saveTutors();
    if (activeTab === "PRODUCTS") {
      if (marketingTab === "COMPANY") return saveCompanyContent();
      if (
        marketingTab === "SERVICES" ||
        marketingTab === "SUBJECTS" ||
        marketingTab === "TOPICS"
      ) {
        setStatus("Use the Save button on each card in this tab.");
        return;
      }
      return saveProducts();
    }
  }

  async function fetchWithFreshAuth(input: string, init: RequestInit = {}) {
    const withToken = async (accessToken: string) => {
      const headers = new Headers(init.headers ?? {});
      headers.set("Authorization", `Bearer ${accessToken}`);
      return fetch(input, {
        ...init,
        headers,
      });
    };

    let accessToken = token;
    if (!accessToken) {
      const sessionRes = await supabase.auth.getSession();
      accessToken = sessionRes.data.session?.access_token ?? null;
    }
    if (!accessToken) {
      const refreshRes = await supabase.auth.refreshSession();
      accessToken = refreshRes.data.session?.access_token ?? null;
    }
    if (!accessToken) {
      return {
        res: null as Response | null,
        error: "Session expired. Please log in again.",
      };
    }

    if (accessToken !== token) setToken(accessToken);

    let res = await withToken(accessToken);
    if (res.status !== 401) {
      return { res, error: null as string | null };
    }

    const refreshRes = await supabase.auth.refreshSession();
    const refreshedToken = refreshRes.data.session?.access_token ?? null;
    if (!refreshedToken) {
      return {
        res: null as Response | null,
        error: "Session expired. Please log in again.",
      };
    }
    if (refreshedToken !== token) setToken(refreshedToken);
    res = await withToken(refreshedToken);
    return { res, error: null as string | null };
  }

  async function loadCatalogMedia(params: {
    kind: "product" | "subject" | "topic" | "service";
    id: string;
    scope?: "global";
    product_id?: string;
    subject_id?: string;
    topic_id?: string;
    service_code?: string;
  }) {
    if (!params.id) return;
    const key = catalogMediaKey(params.kind, params.id);
    setCatalogMediaLoading((prev) => ({ ...prev, [key]: true }));
    const sp = new URLSearchParams();
    if (params.product_id) sp.set("product_id", params.product_id);
    if (params.subject_id) sp.set("subject_id", params.subject_id);
    if (params.topic_id) sp.set("topic_id", params.topic_id);
    if (params.service_code) sp.set("service_code", params.service_code);
    if (params.scope) sp.set("scope", params.scope);
    const { res, error } = await fetchWithFreshAuth(
      `/catalog-media?${sp.toString()}`,
    );
    if (!res) {
      setCatalogMediaLoading((prev) => ({ ...prev, [key]: false }));
      if (error) setStatus(error);
      return;
    }
    if (res.ok) {
      const rows = (await res.json()) as CatalogMedia[];
      setCatalogMediaByKey((prev) => ({ ...prev, [key]: rows }));
    }
    setCatalogMediaLoading((prev) => ({ ...prev, [key]: false }));
  }

  async function addCatalogMedia(params: {
    kind: "product" | "subject" | "topic" | "service";
    id: string;
    scope?: "global";
    media_url: string;
    media_type: "PHOTO" | "VIDEO";
    product_id?: string;
    subject_id?: string;
    topic_id?: string;
    service_code?: string;
  }) {
    const payload: Record<string, any> = {
      media_url: params.media_url,
      media_type: params.media_type,
    };
    if (params.product_id) payload.product_id = params.product_id;
    if (params.subject_id) payload.subject_id = params.subject_id;
    if (params.topic_id) payload.topic_id = params.topic_id;
    if (params.service_code) payload.service_code = params.service_code;
    const { res, error } = await fetchWithFreshAuth("/catalog-media", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res) {
      if (error) setStatus(error);
      return;
    }
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Media upload failed (${res.status}): ${text}`);
      return;
    }
    await loadCatalogMedia(params);
  }

  async function handleMediaFileUpload(params: {
    kind: "product" | "subject" | "topic" | "service";
    id: string;
    scope?: "global";
    file: File;
    media_type: "PHOTO" | "VIDEO";
    product_id?: string;
    subject_id?: string;
    topic_id?: string;
    service_code?: string;
  }) {
    try {
      const dataUrl = await readFileAsDataUrl(params.file);
      await addCatalogMedia({ ...params, media_url: dataUrl });
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to read file.");
    }
  }

  async function removeCatalogMedia(id: string, reload?: () => Promise<void>) {
    const { res, error } = await fetchWithFreshAuth("/catalog-media", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!res) {
      if (error) setStatus(error);
      return;
    }
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Remove media failed (${res.status}): ${text}`);
      return;
    }
    if (reload) await reload();
  }

  async function rewriteWithAi(prompt: string, current: string) {
    if (!token) return current;
    const res = await fetch("/api/ai-rewrite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt, current }),
    });
    if (!res.ok) {
      const text = await res.text();
      setStatus(`AI rewrite failed (${res.status}): ${text}`);
      return current;
    }
    const data = (await res.json()) as { message?: string };
    return data.message ?? current;
  }

  function setAiRewrite(key: string, previous: string, next: string) {
    if (next.trim() === previous.trim()) {
      setAiRewrites((prev) => {
        if (!prev[key]) return prev;
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      return;
    }
    setAiRewrites((prev) => ({ ...prev, [key]: { previous } }));
  }

  function clearAiRewrite(key: string) {
    setAiRewrites((prev) => {
      if (!prev[key]) return prev;
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }

  function setAiLoading(key: string, value: boolean) {
    setAiRewriteLoading((prev) => {
      if (!value && !prev[key]) return prev;
      const updated = { ...prev, [key]: value };
      if (!value) delete updated[key];
      return updated;
    });
  }

  const toggleSocialPlatform = (providerId: ConnectionProviderId) => {
    setSocialDraft((prev) => {
      const has = prev.platform_ids.includes(providerId);
      return {
        ...prev,
        platform_ids: has
          ? prev.platform_ids.filter((id) => id !== providerId)
          : [...prev.platform_ids, providerId],
      };
    });
  };

  const toggleSocialMedia = (mediaId: string) => {
    setSocialDraft((prev) => {
      const has = prev.selected_media_ids.includes(mediaId);
      return {
        ...prev,
        selected_media_ids: has
          ? prev.selected_media_ids.filter((id) => id !== mediaId)
          : [...prev.selected_media_ids, mediaId],
      };
    });
  };

  function setSocialSourceTypeSelection(next: SocialSourceType) {
    setSocialSourceType(next);
    setSocialDraft((prev) => ({
      ...prev,
      product_id: "",
      service_code: "",
      subject_id: "",
      topic_id: "",
      selected_media_ids: [],
      selected_template_id: "",
    }));
  }

  async function handleSocialTemplateUpload(file: File) {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setSocialTemplates((prev) => [
        ...prev,
        {
          id: `template-${Date.now()}-${file.name}`,
          name: file.name,
          data_url: dataUrl,
        },
      ]);
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Unable to read template file.",
      );
    }
  }

  function removeSocialTemplate(templateId: string) {
    setSocialTemplates((prev) => prev.filter((item) => item.id !== templateId));
  }

  async function generateSocialCopy() {
    const sanitizeGeneratedSocialCopy = (value: string) => {
      const text = String(value ?? "").replace(/\r\n/g, "\n");
      const withoutMarkdownBold = text.replace(/\*\*/g, "");
      const platformOnlyLine =
        /^(platform\s*:\s*)?(facebook|instagram|messenger|tiktok|x|twitter|linkedin|threads|general social post)\s*:?\s*$/i;
      const cleaned = withoutMarkdownBold
        .split("\n")
        .map((line) => line.replace(/^call\s*to\s*action\s*:?\s*/i, ""))
        .map((line) => line.replace(/^cta\s*:?\s*/i, ""))
        .filter((line) => !platformOnlyLine.test(line.trim()))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      return cleaned || withoutMarkdownBold.trim();
    };

    const selectedPlatforms = socialDraft.platform_ids
      .map((id) => getConnectionProvider(id)?.label ?? id)
      .filter(Boolean);
    const platforms = selectedPlatforms.length
      ? selectedPlatforms
      : ["General social post"];
    const serviceDescription =
      (socialDraft.service_code
        ? serviceDescriptionDrafts[socialDraft.service_code]
        : null) ??
      socialSelectedService?.description_text ??
      "";
    const companyDescription =
      org?.company_description_text?.trim() || socialDraft.company_description;
    const aboutUs =
      org?.about_us_text?.trim() ||
      org?.about_text?.trim() ||
      socialDraft.about_us;
    const slogan =
      org?.slogan_text?.trim() ||
      org?.headline_text?.trim() ||
      socialDraft.slogan;
    const subjectDescription = socialDraft.subject_id
      ? (subjectDescriptionDrafts[socialDraft.subject_id] ?? "")
      : "";
    const topicDescription = socialDraft.topic_id
      ? (topicDescriptionDrafts[socialDraft.topic_id] ?? "")
      : "";
    const promptLines = [
      "Create platform-specific social media post copy for a tutoring business.",
      `Platforms: ${platforms.join(", ")}.`,
      socialDraft.template_style
        ? `Template style: ${socialDraft.template_style}.`
        : "",
      socialSelectedProduct?.product_name
        ? `Product: ${socialSelectedProduct.product_name}.`
        : "",
      socialSelectedProduct?.product_slogan_text
        ? `Product slogan: ${socialSelectedProduct.product_slogan_text}.`
        : "",
      socialSelectedProduct?.product_description_text
        ? `Product description: ${socialSelectedProduct.product_description_text}.`
        : "",
      socialSelectedService
        ? `Service type: ${socialSelectedService.display_name ?? socialSelectedService.service_code}.`
        : "",
      serviceDescription ? `Service description: ${serviceDescription}.` : "",
      socialSelectedSubject
        ? `Subject: ${socialSelectedSubject.subject_name}.`
        : "",
      subjectDescription ? `Subject description: ${subjectDescription}.` : "",
      socialSelectedTopic ? `Topic: ${socialSelectedTopic.topic_name}.` : "",
      topicDescription ? `Topic description: ${topicDescription}.` : "",
      companyDescription ? `Company description: ${companyDescription}.` : "",
      aboutUs ? `About us: ${aboutUs}.` : "",
      slogan ? `Company slogan: ${slogan}.` : "",
      org?.mission_text ? `Mission: ${org.mission_text}.` : "",
      org?.tutoring_style_text
        ? `Tutoring style: ${org.tutoring_style_text}.`
        : "",
      org?.testimonials_text ? `Testimonials: ${org.testimonials_text}.` : "",
      org?.cta_text ? `Default CTA: ${org.cta_text}.` : "",
      socialDraft.start_date || socialDraft.end_date
        ? `Dates: ${socialDraft.start_date || "TBD"} to ${socialDraft.end_date || "TBD"}.`
        : "",
      socialDraft.age_range ? `Age range: ${socialDraft.age_range}.` : "",
      socialDraft.price_detail ? `Price: ${socialDraft.price_detail}.` : "",
      socialDraft.location_detail
        ? `Location: ${socialDraft.location_detail}.`
        : "",
      socialDraft.enrollment_link
        ? `Enrollment link: ${socialDraft.enrollment_link}.`
        : "",
      socialDraft.headline ? `Headline: ${socialDraft.headline}.` : "",
      socialDraft.call_to_action
        ? `Call to action: ${socialDraft.call_to_action}.`
        : "",
      socialDraft.hashtags
        ? `Suggested hashtags: ${socialDraft.hashtags}.`
        : "",
      socialDraft.extra_notes
        ? `Additional notes: ${socialDraft.extra_notes}.`
        : "",
      "Output requirements:",
      "- Return one polished post body.",
      "- Do not include platform names or platform headings.",
      "- Do not use markdown bold markers like '**'.",
      "- Do not include labels like 'Call to action:'; just write the sentence.",
      "- Keep length appropriate for each platform; keep X under 240 characters.",
      "- Include a clear CTA if provided.",
      "- Use friendly, confident tone for parents and students.",
    ].filter(Boolean);

    const aiKey = "social:copy";
    const previous = socialDraft.generated_copy;
    const localFallback = [
      `Headline: ${socialDraft.headline || "New program available"}`,
      socialDraft.start_date
        ? `Dates: ${socialDraft.start_date}${socialDraft.end_date ? ` - ${socialDraft.end_date}` : ""}`
        : "",
      socialDraft.age_range ? `Age range: ${socialDraft.age_range}` : "",
      socialDraft.price_detail ? `Price: ${socialDraft.price_detail}` : "",
      socialDraft.location_detail ? `Location: ${socialDraft.location_detail}` : "",
      socialDraft.call_to_action || "Reserve your spot today.",
      socialDraft.enrollment_link ? `Learn more: ${socialDraft.enrollment_link}` : "",
      socialDraft.hashtags || "#tutoring #education",
    ]
      .filter(Boolean)
      .join("\n");

    setAiLoading(aiKey, true);
    try {
      let next = previous;
      if (token) {
        next = await rewriteWithAi(promptLines.join("\n"), previous);
      } else {
        setStatus("No auth token detected. Generated local draft copy.");
      }

      // If AI failed or returned unchanged content, provide a deterministic fallback.
      if (!String(next || "").trim() || next.trim() === previous.trim()) {
        next = localFallback;
      }
      next = sanitizeGeneratedSocialCopy(next);

      setSocialDraft((prev) => ({ ...prev, generated_copy: next }));
      setAiRewrite(aiKey, previous, next);
    } finally {
      setAiLoading(aiKey, false);
    }
  }

  async function generateSocialImage() {
    const width = socialAspect.width;
    const height = socialAspect.height;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load image"));
        img.src = src;
      });

    const drawCover = (img: HTMLImageElement) => {
      const scale = Math.max(width / img.width, height / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    if (socialPreviewMedia?.url) {
      try {
        const img = await loadImage(socialPreviewMedia.url);
        drawCover(img);
      } catch {
        // ignore image load failure
      }
    }

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);

    const wrapText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
    ) => {
      const words = text.split(" ");
      let line = "";
      let cursorY = y;
      words.forEach((word, idx) => {
        const test = line ? `${line} ${word}` : word;
        const metrics = ctx.measureText(test);
        if (metrics.width > maxWidth && line) {
          ctx.fillText(line, x, cursorY);
          line = word;
          cursorY += lineHeight;
        } else {
          line = test;
        }
        if (idx === words.length - 1) {
          ctx.fillText(line, x, cursorY);
        }
      });
      return cursorY;
    };

    const headline =
      socialDraft.headline ||
      socialSelectedProduct?.product_name ||
      socialSelectedSubject?.subject_name ||
      "Program";

    if (socialDraft.layout_preset === "Bold headline") {
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `800 ${Math.round(height * 0.1)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      wrapText(headline, width / 2, height * 0.45, width * 0.8, height * 0.12);
      ctx.font = `600 ${Math.round(height * 0.04)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      ctx.fillText(
        socialDraft.call_to_action || "Enroll today",
        width / 2,
        height * 0.7,
      );
    } else if (socialDraft.layout_preset === "Band rows") {
      const bands = 4;
      const bandHeight = height / (bands + 1);
      const lines = [
        headline,
        socialDraft.start_date || "Dates",
        socialDraft.age_range || "Age range",
        socialDraft.call_to_action || "Call to action",
      ];
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      lines.forEach((line, idx) => {
        const y = bandHeight * (idx + 1);
        ctx.fillStyle = "rgba(255,157,249,0.7)";
        ctx.fillRect(
          width * 0.05,
          y - bandHeight * 0.4,
          width * 0.9,
          bandHeight * 0.8,
        );
        ctx.fillStyle = "#ffffff";
        ctx.font = `700 ${Math.round(height * 0.05)}px "Century Gothic", "Trebuchet MS", sans-serif`;
        wrapText(line, width * 0.08, y, width * 0.84, height * 0.06);
      });
    } else if (socialDraft.layout_preset === "Photo + footer") {
      ctx.fillStyle = "rgba(11,31,95,0.85)";
      ctx.fillRect(0, height * 0.72, width, height * 0.28);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `800 ${Math.round(height * 0.07)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      ctx.fillText(headline, width * 0.06, height * 0.76);
      ctx.font = `600 ${Math.round(height * 0.04)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      wrapText(
        socialDraft.call_to_action || socialDraft.location_detail || "Join us",
        width * 0.06,
        height * 0.86,
        width * 0.88,
        height * 0.05,
      );
    } else if (socialDraft.layout_preset === "Schedule list") {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, width, height * 0.2);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.round(height * 0.05)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      ctx.fillText(
        socialDraft.start_date
          ? `Dates: ${socialDraft.start_date}${socialDraft.end_date ? ` - ${socialDraft.end_date}` : ""}`
          : "Dates / schedule",
        width * 0.05,
        height * 0.1,
      );
      const lines = (
        socialDraft.extra_notes ||
        "Monday: Activity\nTuesday: Activity\nWednesday: Activity"
      )
        .split("\n")
        .slice(0, 5);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(width * 0.05, height * 0.25, width * 0.9, height * 0.55);
      ctx.fillStyle = "#ffffff";
      ctx.font = `500 ${Math.round(height * 0.04)}px "Century Gothic", "Trebuchet MS", sans-serif`;
      let y = height * 0.32;
      lines.forEach((line) => {
        ctx.fillText(line, width * 0.08, y);
        y += height * 0.08;
      });
    }

    const dataUrl = canvas.toDataURL("image/png");
    setSocialDraft((prev) => ({ ...prev, generated_image_url: dataUrl }));
  }

  async function saveSocialPost(status: "DRAFT" | "READY" = "READY") {
    if (!token) return;
    const title =
      socialDraft.headline ||
      socialSelectedProduct?.product_name ||
      socialSelectedSubject?.subject_name ||
      socialSelectedTopic?.topic_name ||
      "Social post";
    setStatus(null);
    const res = await fetch("/marketing-posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        status,
        platform_ids: socialDraft.platform_ids,
        template_style: socialDraft.template_style,
        layout_preset: socialDraft.layout_preset,
        aspect_ratio: socialDraft.aspect_ratio,
        copy_text: socialDraft.generated_copy,
        image_url: socialDraft.generated_image_url || null,
        media_selection: {
          selected_media_ids: socialDraft.selected_media_ids,
          selected_template_id: socialDraft.selected_template_id,
          product_id: socialDraft.product_id,
          subject_id: socialDraft.subject_id,
          topic_id: socialDraft.topic_id,
          service_code: socialDraft.service_code,
        },
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Save post failed (${res.status}): ${text}`);
      return;
    }
    setStatus(
      status === "DRAFT"
        ? "Draft saved to Marketing list."
        : "Post saved to Marketing list.",
    );
  }

  function discardSocialCopy() {
    setSocialDraft((prev) => ({ ...prev, generated_copy: "" }));
    clearAiRewrite("social:copy");
    setStatus("Copy discarded.");
  }

  function clearSocialBuilder() {
    setSocialDraft({ ...EMPTY_SOCIAL_DRAFT });
    setSocialTemplates([]);
    setSocialSourceType("");
    clearAiRewrite("social:copy");
    setStatus("Post builder discarded.");
  }

  async function addService(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setStatus(null);
    const locId = selectedServiceLocationId || newService.location_id;
    const name = newService.name.trim();
    const cents = dollarsToCents(newService.price);
    const capacity = Number.parseInt(newService.capacity || "0", 10);
    const unitLength = Number.parseInt(
      newService.unit_length_minutes || "0",
      10,
    );
    if (!locId) return setStatus("Choose a location.");
    if (!name) return setStatus("Enter a service name.");
    if (cents == null)
      return setStatus("Enter a valid unit price (e.g. 99.95).");
    if (!Number.isInteger(capacity) || capacity < 1)
      return setStatus("Enter a valid capacity (>= 1).");
    if (!Number.isInteger(unitLength) || unitLength < 1)
      return setStatus("Enter a valid unit length in minutes (>= 1).");

    const existingCodes = new Set(
      (servicesByLocation[locId] ?? []).map((s) => s.service_code),
    );
    const service_code = makeUniqueServiceCode(name, existingCodes);

    const res = await fetch("/services-offered", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        location_id: locId,
        service_code,
        hourly_rate_cents: cents,
        capacity,
        unit_length_minutes: unitLength,
        display_name: name,
        is_active: true,
      }),
    });
    if (!res.ok) {
      setStatus(`Add service failed (${res.status}): ${await res.text()}`);
      return;
    }
    const created = (await res.json()) as ServiceOffered;
    setServicesByLocation((prev) => ({
      ...prev,
      [locId]: [...(prev[locId] ?? []), created],
    }));
    setNewService({
      location_id: locId,
      name: "",
      price: "",
      capacity: "1",
      unit_length_minutes: "60",
    });
    setStatus("Service added.");
  }

  async function saveCompanyContent() {
    if (!token) return;
    setStatus(null);
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        company_description_text: companyDraft.company_description_text,
        mission_text: companyDraft.mission_text,
        tutoring_style_text: companyDraft.tutoring_style_text,
        about_us_text: companyDraft.about_us_text,
        company_logo_url: companyDraft.company_logo_url || null,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      setStatus(`Company content save failed (${res.status}): ${text}`);
      return;
    }
    const updated = (await res.json()) as Org;
    setOrg(updated);
    setStatus("Company content saved.");
  }

  async function addSubject(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    const subject_name = newSubjectName.trim();
    if (!subject_name) return setStatus("Enter a subject name.");
    const newKey = `custom:${normalizeKey(subject_name)}:${Date.now()}`;
    setSubjectDrafts((prev) => [
      ...prev,
      {
        key: newKey,
        name: subject_name,
        included: true,
        topics: [],
        is_catalog: false,
      },
    ]);
    setNewSubjectName("");
    setStatus("Subject added. Remember to Save.");
  }

  async function addTopic(subjectKey: string) {
    setStatus(null);
    const topic_name = (newTopicDrafts[subjectKey] ?? "").trim();
    if (!topic_name) return setStatus("Enter a topic name.");
    setSubjectDrafts((prev) =>
      prev.map((s) => {
        if (s.key !== subjectKey) return s;
        const newTopic: TopicDraft = {
          key: `custom:${normalizeKey(topic_name)}:${Date.now()}`,
          name: topic_name,
          included: true,
          is_catalog: false,
        };
        return { ...s, included: true, topics: [...s.topics, newTopic] };
      }),
    );
    setNewTopicDrafts((prev) => ({ ...prev, [subjectKey]: "" }));
    setStatus("Topic added. Remember to Save.");
  }

  async function confirmWithPassword() {
    if (!userEmail) {
      setStatus("Missing user email. Please log in again.");
      return null;
    }
    const password = await openPasswordPrompt("confirm this action");
    if (!password) return null;
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });
    if (error) {
      setStatus("Password is incorrect.");
      return null;
    }
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) {
      setStatus("Session expired. Please log in again.");
      return null;
    }
    setToken(data.session.access_token);
    return data.session.access_token;
  }

  function startEditLocation(loc: Location) {
    setEditLocationId(loc.id);
    setEditLocationDraft({
      location_name: loc.location_name ?? "",
      is_virtual: loc.is_virtual,
      location_address_1: loc.location_address_1 ?? "",
      location_address_2: loc.location_address_2 ?? "",
      location_city: loc.location_city ?? "",
      location_state: loc.location_state ?? "",
      location_zip: loc.location_zip ?? "",
    });
    setStatus(null);
  }

  function cancelEditLocation() {
    setEditLocationId(null);
    setEditLocationDraft(null);
  }

  function getNewRoomDraft(locationId: string) {
    return (
      newRoomDrafts[locationId] ?? {
        room_name: "",
        room_number: "",
        floor_number: "",
      }
    );
  }

  function updateNewRoomDraft(
    locationId: string,
    updates: Partial<{
      room_name: string;
      room_number: string;
      floor_number: string;
    }>,
  ) {
    setNewRoomDrafts((prev) => {
      const existing = prev[locationId] ?? {
        room_name: "",
        room_number: "",
        floor_number: "",
      };
      return { ...prev, [locationId]: { ...existing, ...updates } };
    });
  }

  async function saveEditLocation() {
    if (!token || !editLocationId || !editLocationDraft) return;
    setStatus(null);
    const payload: Record<string, any> = {
      location_id: editLocationId,
      location_name: editLocationDraft.location_name,
      is_virtual: editLocationDraft.is_virtual,
      location_address_1: editLocationDraft.location_address_1,
      location_address_2: editLocationDraft.location_address_2,
      location_city: editLocationDraft.location_city,
      location_state: editLocationDraft.location_state,
      location_zip: editLocationDraft.location_zip,
    };
    if (editLocationDraft.is_virtual) {
      payload.location_address_2 = null;
      payload.location_city = null;
      payload.location_state = null;
      payload.location_zip = null;
    }
    const res = await fetch("/locations", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setStatus(`Location update failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Location;
    setLocations((prev) =>
      prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)),
    );
    cancelEditLocation();
    setStatus("Location updated.");
  }

  async function addRoom(locationId: string) {
    if (!token) return;
    const draft = getNewRoomDraft(locationId);
    if (!draft.room_name.trim()) {
      setStatus("Room name is required.");
      return;
    }
    const res = await fetch("/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        location_id: locationId,
        room_name: draft.room_name.trim(),
        room_number: draft.room_number.trim() || null,
        floor_number: draft.floor_number.trim() || null,
      }),
    });
    if (!res.ok) {
      let message = "";
      try {
        const json = await res.json();
        message = typeof json?.message === "string" ? json.message : "";
      } catch {
        message = "";
      }
      const cleaned =
        message && message.length < 140 ? message : "Please try again.";
      setStatus(`Room add failed (${res.status}). ${cleaned}`);
      return;
    }
    const created = (await res.json()) as Room;
    setRoomsByLocation((prev) => ({
      ...prev,
      [locationId]: [created, ...(prev[locationId] ?? [])],
    }));
    setNewRoomDrafts((prev) => ({
      ...prev,
      [locationId]: { room_name: "", room_number: "", floor_number: "" },
    }));
    setStatus("Room added.");
  }

  async function archiveLocation(locId: string) {
    const accessToken = (await confirmWithPassword()) ?? token;
    if (!accessToken) return;
    const res = await fetch("/locations", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ location_id: locId }),
    });
    if (!res.ok) {
      let message = "";
      try {
        const json = await res.json();
        message = typeof json?.message === "string" ? json.message : "";
      } catch {
        message = "";
      }
      const cleaned =
        message && message.length < 140 ? message : "Please try again.";
      setStatus(`Archive failed (${res.status}). ${cleaned}`);
      return;
    }
    setLocations((prev) =>
      prev.map((l) =>
        l.id === locId ? { ...l, archived_at: new Date().toISOString() } : l,
      ),
    );
    setStatus("Location archived.");
  }

  function startEditRoom(room: Room) {
    setEditRoomId(room.id);
    setEditRoomDraft({
      location_id: room.location_id,
      room_name: room.room_name ?? "",
      room_number: room.room_number ?? "",
      floor_number: room.floor_number ?? "",
    });
    setStatus(null);
  }

  function cancelEditRoom() {
    setEditRoomId(null);
    setEditRoomDraft(null);
  }

  async function saveEditRoom() {
    if (!token || !editRoomId || !editRoomDraft) return;
    setStatus(null);
    const res = await fetch("/rooms", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        room_id: editRoomId,
        room_name: editRoomDraft.room_name,
        room_number: editRoomDraft.room_number,
        floor_number: editRoomDraft.floor_number,
      }),
    });
    if (!res.ok) {
      setStatus(`Room update failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Room;
    setRoomsByLocation((prev) => ({
      ...prev,
      [updated.location_id]: (prev[updated.location_id] ?? []).map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r,
      ),
    }));
    cancelEditRoom();
    setStatus("Room updated.");
  }

  async function archiveRoom(room: Room) {
    const accessToken = (await confirmWithPassword()) ?? token;
    if (!accessToken) return;
    const res = await fetch("/rooms", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ room_id: room.id }),
    });
    if (!res.ok) {
      let message = "";
      try {
        const json = await res.json();
        message = typeof json?.message === "string" ? json.message : "";
      } catch {
        message = "";
      }
      const cleaned =
        message && message.length < 140 ? message : "Please try again.";
      setStatus(`Archive failed (${res.status}). ${cleaned}`);
      return;
    }
    setRoomsByLocation((prev) => ({
      ...prev,
      [room.location_id]: (prev[room.location_id] ?? []).map((r) =>
        r.id === room.id ? { ...r, archived_at: new Date().toISOString() } : r,
      ),
    }));
    setStatus("Room archived.");
  }
    const settingsTabCtx = {
    accountForm,
    accountInitial,
    activeEmailInboxes,
    activeLeadCount,
    activeLocations,
    activeTab,
    activeTutorCount,
    addCatalogMedia,
    addEmailInbox,
    addRoom,
    addService,
    addSubject,
    addTopic,
    aiRewriteLoading,
    aiRewrites,
    ALL_TABS,
    anyDirty,
    anyDirtyRef,
    AppHeader,
    ARCHIVE_LABELS,
    ARCHIVE_OPTIONS,
    archiveEdits,
    archiveEditsForType,
    archiveEmailInbox,
    archiveHasChanges,
    ArchiveIcon,
    archiveLocation,
    archiveMaps,
    archiveRoom,
    archiveRows,
    archiveSort,
    archiveTutor,
    archiveType,
    ArrowDown01Icon,
    ArrowUp01Icon,
    billableLocations,
    BookOpen01Icon,
    bufferDraft,
    Building04Icon,
    buildProductDraft,
    buildSubjectDrafts,
    businessForm,
    businessInitial,
    Calendar01Icon,
    canAddLocation,
    canAddTutor,
    Cancel01Icon,
    cancelEditLocation,
    cancelEditRoom,
    catalogMediaByKey,
    catalogMediaKey,
    catalogMediaLoading,
    centsToDollars,
    CheckmarkCircle01Icon,
    checkoutHref,
    checkoutHrefFor,
    childPrompt,
    childPromptResolverRef,
    ClampedCell,
    clearAiRewrite,
    clearSocialBuilder,
    CLIENT_FIELDS_STORAGE_KEY,
    clientsForm,
    closeChildUnarchivePrompt,
    closePasswordPrompt,
    companyDirty,
    companyDraft,
    confirmWithPassword,
    connectGoogleInbox,
    CONNECTION_PROVIDERS,
    connectionCardGradient,
    connections,
    connectionsDirty,
    connectionSnapshots,
    connectionStatusById,
    connectionStatusLabel,
    CONTENT_STUDIO_TABS,
    Copy01Icon,
    CreditCardIcon,
    DATE_FORMAT_OPTIONS,
    dateFormat,
    DEFAULT_DATE_FORMAT,
    DEFAULT_SERVICE_NAMES,
    DEFAULT_SUBJECTS,
    DEFAULT_TUTOR_COLOR,
    defaultClientFieldPrefs,
    defaultPipelineSources,
    dirtyTabs,
    discardActive,
    discardSocialCopy,
    dollarsToCents,
    dynamic,
    editLocationDraft,
    editLocationId,
    editRoomDraft,
    editRoomId,
    emailInboxes,
    EMPTY_PRODUCT_DRAFT,
    EMPTY_SOCIAL_DRAFT,
    formatCurrencyFromCents,
    formatDateWithPattern,
    formatPlanLimit,
    Fragment,
    generateSocialCopy,
    generateSocialImage,
    getConnectionProvider,
    getNewRoomDraft,
    getSupabaseBrowserClient,
    handleMediaFileUpload,
    handleSocialTemplateUpload,
    HugeiconsIcon,
    Input,
    isTutorOnly,
    Label,
    LazySettingsTabPanels,
    leadDisplayName,
    leadLimit,
    leads,
    Link01Icon,
    loadCatalogMedia,
    loading,
    loadPipelineSources,
    Location01Icon,
    locationNameById,
    locations,
    locLimit,
    makeEmailSource,
    makeUniqueServiceCode,
    MARKETING_SECTIONS,
    MarketingIcon,
    marketingSection,
    marketingServiceByCode,
    marketingServices,
    marketingSubjectId,
    marketingTab,
    me,
    mediaUrlDrafts,
    mergeEmailInboxSources,
    newEmailInbox,
    newRoomDrafts,
    newService,
    newSubjectName,
    newTopicDrafts,
    newTutor,
    normalizeClientFieldPrefs,
    normalizeDateFormat,
    normalizeKey,
    normalizePlanKey,
    onSave,
    openBillingPortal,
    openChildUnarchivePrompt,
    openPasswordPrompt,
    org,
    otherPlans,
    PackageIcon,
    PARENT_FIELDS,
    parentDisplayName,
    parentNameById,
    parents,
    parseNonNegativeInt,
    passwordDraft,
    passwordPrompt,
    passwordPromptResolverRef,
    patchEmailInbox,
    pipelineForm,
    PipelineIcon,
    plan,
    PLAN_ORDER,
    planCardColor,
    planKey,
    planLabel,
    planLeadLimit,
    planLocationLimit,
    planSpecs,
    planSpecsFor,
    planTutorLimit,
    productAutoSelectedRef,
    productDirty,
    productDraft,
    productDraftInitial,
    productMedia,
    productMediaKey,
    productMediaLoading,
    products,
    productTopicOptions,
    providerLabel,
    queryHandledRef,
    readFileAsDataUrl,
    removeCatalogMedia,
    removePipelineSource,
    removeSocialTemplate,
    renderSortIcons,
    rewriteWithAi,
    roomsByLocation,
    router,
    saveAccount,
    saveAllConnections,
    saveBusiness,
    saveClientFieldPrefs,
    saveClientFields,
    saveCompanyContent,
    saveConnection,
    saveEditLocation,
    saveEditRoom,
    savePipelineSettings,
    savePipelineSources,
    saveProducts,
    saveSchedule,
    saveServiceDescription,
    saveServices,
    saveSocialPost,
    saveSubjectDescription,
    saveSubjectsTopics,
    saveTopicDescription,
    saveTutors,
    scheduleForm,
    scheduleInitial,
    searchParams,
    selectedCarouselPresetId,
    selectedProductService,
    selectedServiceLocationId,
    selectProduct,
    sendResetEmail,
    serviceById,
    serviceCatalogDrafts,
    serviceDescriptionDrafts,
    serviceEdits,
    ServiceIcon,
    serviceLocationId,
    serviceLogoDrafts,
    serviceRows,
    servicesByLocation,
    serviceSort,
    setActiveTab,
    setAiLoading,
    setAiRewrite,
    setAiRewriteLoading,
    setAiRewrites,
    setArchiveEdits,
    setArchiveSort,
    setArchiveType,
    setBufferDraft,
    setCatalogMediaByKey,
    setCatalogMediaLoading,
    setChildPrompt,
    setCompanyDraft,
    setConnections,
    setConnectionSnapshots,
    setEditLocationDraft,
    setEditLocationId,
    setEditRoomDraft,
    setEditRoomId,
    setEmailInboxes,
    setLeads,
    setLoading,
    setLocations,
    setMarketingSection,
    setMarketingSubjectId,
    setMarketingTab,
    setMe,
    setMediaUrlDrafts,
    setNewEmailInbox,
    setNewRoomDrafts,
    setNewService,
    setNewSubjectName,
    setNewTopicDrafts,
    setNewTutor,
    setOrg,
    setParents,
    setPasswordDraft,
    setPasswordPrompt,
    setProductDraft,
    setProductDraftInitial,
    setProducts,
    setRoomsByLocation,
    setServiceCatalogDrafts,
    setServiceDescriptionDrafts,
    setServiceEdits,
    setServiceLocationId,
    setServiceLogoDrafts,
    setServicesByLocation,
    setServiceSort,
    setSocialDraft,
    setSocialSourceType,
    setSocialSourceTypeSelection,
    setSocialTemplates,
    setStatus,
    setStudents,
    setSubjectDescriptionDrafts,
    setSubjectDrafts,
    setSubjectDraftsInitialKey,
    setSubjects,
    setSubjectSort,
    SETTINGS_TAB_ICON_COLORS,
    SettingsPage,
    setToken,
    setTopicDescriptionDrafts,
    setTopicsBySubject,
    setTutorDrafts,
    setTutors,
    setUserEmail,
    SOCIAL_ASPECT_RATIO_FILE_KEYS,
    SOCIAL_ASPECT_RATIOS,
    SOCIAL_DRAFT_STORAGE_KEY,
    SOCIAL_LAYOUT_PRESET_FILE_KEYS,
    SOCIAL_LAYOUT_PRESETS,
    SOCIAL_PLATFORM_SPECS,
    SOCIAL_PRESET_CAROUSEL_ITEMS,
    SOCIAL_TEMPLATE_STYLES,
    socialAspect,
    socialDraft,
    socialMediaOptions,
    socialPresetCarouselRef,
    socialPresetRefs,
    socialPreviewMedia,
    socialSelectedProduct,
    socialSelectedService,
    socialSelectedSubject,
    socialSelectedTemplate,
    socialSelectedTopic,
    socialSourceType,
    socialTemplates,
    socialTopicOptions,
    sortedArchiveRows,
    sortedServiceRows,
    sortedSubjectDrafts,
    startConnectionOAuth,
    startEditLocation,
    startEditRoom,
    status,
    STUDENT_FIELDS,
    studentDisplayName,
    students,
    studentsByParentId,
    subjectBaselineMap,
    subjectDescriptionDrafts,
    subjectDrafts,
    subjectDraftsInitialKey,
    subjectDraftsInitialRef,
    subjectDraftsKey,
    subjectNameById,
    subjects,
    subjectSort,
    supabase,
    switchTab,
    TAB_DIVIDERS,
    TAB_HEADINGS,
    tabs,
    Textarea,
    timezones,
    toggleArchiveSort,
    toggleServiceSort,
    toggleSocialMedia,
    toggleSocialPlatform,
    toggleSubjectSort,
    token,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    topicDescriptionDrafts,
    topicsBySubject,
    tutorDrafts,
    tutorDraftsInitialRef,
    tutorLimit,
    tutors,
    UNIT_LENGTH_TOOLTIP,
    updateArchive,
    updateArchiveDraft,
    updateClientField,
    updateConnectionField,
    updateNewRoomDraft,
    updatePipelineSource,
    updateServiceDraft,
    US_STATES,
    usageColorClass,
    useEffect,
    useMemo,
    useRef,
    userEmail,
    UserGroupIcon,
    useRouter,
    useSearchParams,
    useSettingsForm,
    useState,
    WebDesign01Icon,
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[700px] flex-col gap-6 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 bg-white lg:w-[280px]">
            <div className="h-full border-b border-gray-200 shadow-[8px_0_18px_rgba(0,0,0,0.06)] lg:border-b-0 lg:border-r">
              <div className="p-4 text-sm font-semibold text-gray-600">
                {isTutorOnly ? "Settings" : "Organization Settings"}
              </div>
              <nav className="grid gap-1 p-2">
                {tabs.map((t) => (
                  <Fragment key={t.key}>
                    {TAB_DIVIDERS.has(t.key) ? (
                      <div className="my-2 h-px bg-gray-200" />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => void switchTab(t.key)}
                      style={
                        {
                          "--tab-icon-color": SETTINGS_TAB_ICON_COLORS[t.key],
                        } as CSSProperties
                      }
                      className={[
                        "group w-full rounded-lg px-3 py-2 text-left text-sm transition",
                        t.key === activeTab
                          ? "bg-gray-100 font-semibold"
                          : "hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={t.icon}
                            size={16}
                            className={[
                              "transition-colors",
                              t.key === activeTab
                                ? "text-[var(--tab-icon-color)]"
                                : "text-gray-500 group-hover:text-[var(--tab-icon-color)]",
                            ].join(" ")}
                          />
                          <span>{t.label}</span>
                        </span>
                        {dirtyTabs[t.key] ? (
                          <span className="text-xs text-purple-700">
                            (unsaved)
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </nav>
            </div>
          </aside>

          <section className="min-w-0 flex-1 bg-white">
            <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h1 className="m-0 text-xl font-bold">
                  {TAB_HEADINGS[activeTab] ??
                    tabs.find((t) => t.key === activeTab)?.label ??
                    "Settings"}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {activeTab === "MARKETING"
                    ? "Build AI powered social posts and generate content for manual or direct posting."
                    : "Save or discard changes before switching sections."}
                </p>
              </div>

              {activeTab !== "MARKETING" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                    disabled={!dirtyTabs[activeTab]}
                    onClick={() => discardActive()}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                    disabled={!dirtyTabs[activeTab]}
                    onClick={() => onSave()}
                  >
                    Save
                  </button>
                </div>
              ) : null}
            </div>

            <div className="px-4 py-6 sm:px-6">
              {loading ? <p>Loading…</p> : null}
              {status ? (
                <p className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
                  {status}
                </p>
              ) : null}

              <LazySettingsTabPanels ctx={settingsTabCtx} />

            </div>
          </section>
        </div>
      </main>

      {childPrompt ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[560px] rounded-xl bg-white p-6 shadow-xl">
            <div className="text-lg font-extrabold">
              Unarchive {childPrompt.childTypeLabel}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Parent record: {childPrompt.parentLabel}
            </div>
            <div className="mt-4 grid max-h-[320px] gap-2 overflow-y-auto text-sm text-gray-700">
              {childPrompt.items.map((item) => {
                const isArchived = item.archived;
                const checked = isArchived
                  ? childPrompt.selectedIds.includes(item.id)
                  : true;
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2 ${isArchived ? "text-gray-700" : "text-gray-400"}`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#ff9df9]"
                      checked={checked}
                      disabled={!isArchived}
                      onChange={(e) =>
                        setChildPrompt((prev) => {
                          if (!prev) return prev;
                          if (!isArchived) return prev;
                          const selected = new Set(prev.selectedIds);
                          if (e.target.checked) {
                            selected.add(item.id);
                          } else {
                            selected.delete(item.id);
                          }
                          return { ...prev, selectedIds: Array.from(selected) };
                        })
                      }
                    />
                    {item.label}
                  </label>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="itutoros-settings-btn itutoros-settings-btn-secondary"
                onClick={() => closeChildUnarchivePrompt(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="itutoros-settings-btn itutoros-settings-btn-primary"
                onClick={() =>
                  closeChildUnarchivePrompt(childPrompt.selectedIds)
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {passwordPrompt ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-xl">
            <div className="text-lg font-extrabold">Confirm with password</div>
            <div className="mt-1 text-sm text-gray-600">
              Enter your password to {passwordPrompt.actionLabel}.
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="confirm-password">Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordDraft}
                onChange={(e) => setPasswordDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && passwordDraft.trim()) {
                    closePasswordPrompt(passwordDraft);
                  }
                }}
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="itutoros-settings-btn itutoros-settings-btn-secondary"
                onClick={() => closePasswordPrompt(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="itutoros-settings-btn itutoros-settings-btn-primary"
                onClick={() => closePasswordPrompt(passwordDraft)}
                disabled={!passwordDraft.trim()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SettingsPageContent />
    </Suspense>
  );
}
