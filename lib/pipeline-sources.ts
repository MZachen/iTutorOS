export type PipelineSourceType = "WEB" | "WALK_IN" | "PHONE" | "EMAIL" | "SOCIAL";

export type PipelineSourceSetting = {
  id: string;
  label: string;
  type: PipelineSourceType;
  enabled: boolean;
  address?: string | null;
  password?: string | null;
};

export const PIPELINE_SOURCES_STORAGE_KEY = "itutoros_pipeline_sources";

const BUILTIN_SOURCES: PipelineSourceSetting[] = [
  { id: "web", label: "Web", type: "WEB", enabled: true, address: "" },
  { id: "walk_in", label: "Walk-in", type: "WALK_IN", enabled: true, address: "" },
  { id: "phone", label: "Phone", type: "PHONE", enabled: true, address: "" },
  { id: "facebook", label: "Facebook", type: "SOCIAL", enabled: true, address: "" },
  { id: "instagram", label: "Instagram", type: "SOCIAL", enabled: true, address: "" },
  { id: "messenger", label: "Messenger", type: "SOCIAL", enabled: true, address: "" },
  { id: "tiktok", label: "TikTok", type: "SOCIAL", enabled: true, address: "" },
];

function normalizeEntry(entry: any): PipelineSourceSetting | null {
  if (!entry || typeof entry !== "object") return null;
  if (typeof entry.id !== "string" || typeof entry.label !== "string" || typeof entry.type !== "string") return null;
  if (!isPipelineSourceType(entry.type)) return null;
  return {
    id: entry.id,
    label: entry.label,
    type: entry.type,
    enabled: typeof entry.enabled === "boolean" ? entry.enabled : true,
    address: typeof entry.address === "string" ? entry.address : null,
    password: typeof entry.password === "string" ? entry.password : null,
  };
}

function isPipelineSourceType(value: string): value is PipelineSourceType {
  return value === "WEB" || value === "WALK_IN" || value === "PHONE" || value === "EMAIL" || value === "SOCIAL";
}

export function defaultPipelineSources(): PipelineSourceSetting[] {
  return BUILTIN_SOURCES.map((source) => ({ ...source }));
}

export function normalizePipelineSources(raw: any): PipelineSourceSetting[] {
  const stored = Array.isArray(raw)
    ? raw.map(normalizeEntry).filter((item): item is PipelineSourceSetting => Boolean(item))
    : [];
  const storedMap = new Map<string, PipelineSourceSetting>();
  stored.forEach((item) => {
    if (item) storedMap.set(item.id, item);
  });
  storedMap.delete("email");

  const normalized: PipelineSourceSetting[] = BUILTIN_SOURCES.map((builtin) => {
    const existing = storedMap.get(builtin.id);
    return {
      ...builtin,
      enabled: existing?.enabled ?? builtin.enabled,
      address: existing?.address ?? builtin.address ?? "",
      password: existing?.password ?? null,
    };
  });

  stored
    .filter((item) => item && item.id !== "email" && !BUILTIN_SOURCES.some((builtin) => builtin.id === item.id))
    .forEach((item) => {
      if (!item) return;
      normalized.push({ ...item });
    });

  return normalized;
}

export function loadPipelineSources(): PipelineSourceSetting[] {
  if (typeof window === "undefined") return defaultPipelineSources();
  try {
    const raw = localStorage.getItem(PIPELINE_SOURCES_STORAGE_KEY);
    if (!raw) return defaultPipelineSources();
    return normalizePipelineSources(JSON.parse(raw));
  } catch {
    return defaultPipelineSources();
  }
}

export function savePipelineSources(sources: PipelineSourceSetting[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PIPELINE_SOURCES_STORAGE_KEY, JSON.stringify(sources));
}

export function makeEmailSource(label: string, address: string, password?: string, idOverride?: string): PipelineSourceSetting {
  const id = idOverride ? `email:${idOverride}` : `email:${Date.now()}`;
  return {
    id,
    label: label || address || "Email",
    type: "EMAIL",
    enabled: true,
    address,
    password: password || null,
  };
}
