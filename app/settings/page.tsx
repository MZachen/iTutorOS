"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useSettingsForm } from "@/lib/useSettingsForm";
import { makeUniqueServiceCode } from "@/lib/utils";
import {
  CLIENT_FIELDS_STORAGE_KEY,
  PARENT_FIELDS,
  STUDENT_FIELDS,
  defaultClientFieldPrefs,
  normalizeClientFieldPrefs,
  saveClientFieldPrefs,
  type ClientFieldPrefs,
} from "@/lib/client-fields";
import { DEFAULT_SERVICE_NAMES, DEFAULT_SUBJECTS } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

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
  business_address_1: string | null;
  business_address_2: string | null;
  business_city: string | null;
  business_state: string | null;
  business_zip: string | null;
  subscription_plan?: string | null;
};

type Location = {
  id: string;
  location_name: string;
  is_virtual: boolean;
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

type ServiceOffered = {
  id: string;
  location_id: string;
  service_code: string;
  hourly_rate_cents: number;
  display_name?: string | null;
  is_active: boolean;
};

type Subject = {
  id: string;
  subject_name: string;
  archived_at?: string | null;
};

type Topic = {
  id: string;
  subject_id: string;
  topic_name: string;
  archived_at?: string | null;
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

type ServiceDraft = {
  key: string;
  id?: string;
  name: string;
  is_active: boolean;
  hourly_rate_dollars: string;
  is_catalog: boolean;
  existing?: ServiceOffered | null;
};

type SettingsTab =
  | "ACCOUNT"
  | "BUSINESS"
  | "LOCATIONS"
  | "CLIENTS"
  | "SERVICES"
  | "SUBJECTS_TOPICS"
  | "PRODUCTS"
  | "SCHEDULE"
  | "PIPELINE"
  | "MARKETING"
  | "WEBSITE";

const ALL_TABS: { key: SettingsTab; label: string }[] = [
  { key: "ACCOUNT", label: "Account and Billing" },
  { key: "BUSINESS", label: "Business Info" },
  { key: "LOCATIONS", label: "Locations" },
  { key: "CLIENTS", label: "Clients" },
  { key: "SERVICES", label: "Services" },
  { key: "SUBJECTS_TOPICS", label: "Subjects/Topics" },
  { key: "PRODUCTS", label: "Products" },
  { key: "SCHEDULE", label: "Schedule" },
  { key: "PIPELINE", label: "Pipeline" },
  { key: "MARKETING", label: "Marketing" },
  { key: "WEBSITE", label: "Website" },
];

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

function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

function dollarsToCents(value: string) {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

function buildSubjectDrafts(existingSubjects: Subject[], topicsBySubject: Record<string, Topic[]>): SubjectDraft[] {
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
    const existingTopics = existing ? topicsBySubject[existing.id] ?? [] : [];
    const topicsByName = new Map<string, Topic>();
    existingTopics.forEach((t) => topicsByName.set(normalizeKey(t.topic_name), t));
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

export default function SettingsPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [org, setOrg] = useState<Org | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [roomsByLocation, setRoomsByLocation] = useState<Record<string, Room[]>>({});
  const [servicesByLocation, setServicesByLocation] = useState<Record<string, ServiceOffered[]>>({});
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topicsBySubject, setTopicsBySubject] = useState<Record<string, Topic[]>>({});
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<SettingsTab>("ACCOUNT");
  const [status, setStatus] = useState<string | null>(null);

  const isTutorOnly = Boolean(me?.isTutor && !me?.isOwner && !me?.isAdmin);
  const tabs = isTutorOnly ? ALL_TABS.filter((t) => t.key === "ACCOUNT") : ALL_TABS;

  const timezones = useMemo(() => {
    const supported =
      typeof Intl !== "undefined" && typeof (Intl as any).supportedValuesOf === "function"
        ? ((Intl as any).supportedValuesOf("timeZone") as string[])
        : ["UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"];
    return Array.from(new Set(supported)).sort((a, b) => a.localeCompare(b));
  }, []);

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

  const [serviceLocationId, setServiceLocationId] = useState("");
  const [serviceEdits, setServiceEdits] = useState<Record<string, { hourly_rate_dollars: string; is_active: boolean }>>(
    {},
  );
  const [serviceCatalogDrafts, setServiceCatalogDrafts] = useState<
    Record<string, Record<string, { hourly_rate_dollars: string; is_active: boolean }>>
  >({});
  const [newService, setNewService] = useState<{ location_id: string; name: string; price: string }>({
    location_id: "",
    name: "",
    price: "",
  });

  const [subjectDrafts, setSubjectDrafts] = useState<SubjectDraft[]>([]);
  const subjectDraftsInitialRef = useRef<SubjectDraft[]>([]);
  const [subjectDraftsInitialKey, setSubjectDraftsInitialKey] = useState("[]");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicDrafts, setNewTopicDrafts] = useState<Record<string, string>>({});

  const [serviceSort, setServiceSort] = useState<{ key: "active" | "name" | "price"; dir: "asc" | "desc" }>({
    key: "active",
    dir: "desc",
  });
  const [subjectSort, setSubjectSort] = useState<{ key: "included" | "name"; dir: "asc" | "desc" }>({
    key: "included",
    dir: "desc",
  });

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

  const clientsForm = useSettingsForm<ClientFieldPrefs>(defaultClientFieldPrefs());

  const subjectDraftsKey = useMemo(() => JSON.stringify(subjectDrafts), [subjectDrafts]);

  const dirtyTabs = useMemo(() => {
    const servicesDirty =
      Object.keys(serviceEdits).length > 0 ||
      Object.values(serviceCatalogDrafts).some((byLocation) => Object.keys(byLocation).length > 0);
    const subjectsDirty = subjectDraftsKey !== subjectDraftsInitialKey;
    return {
      ACCOUNT: false,
      BUSINESS: businessForm.hasChanges,
      LOCATIONS: false,
      CLIENTS: clientsForm.hasChanges,
      SERVICES: servicesDirty,
      SUBJECTS_TOPICS: subjectsDirty,
      PRODUCTS: false,
      SCHEDULE: scheduleForm.hasChanges,
      PIPELINE: false,
      MARKETING: false,
      WEBSITE: false,
    } as Record<SettingsTab, boolean>;
  }, [
    businessForm.hasChanges,
    clientsForm.hasChanges,
    scheduleForm.hasChanges,
    serviceEdits,
    serviceCatalogDrafts,
    subjectDraftsKey,
    subjectDraftsInitialKey,
  ]);

  const anyDirty = useMemo(() => Object.values(dirtyTabs).some(Boolean), [dirtyTabs]);
  const anyDirtyRef = useRef(anyDirty);
  useEffect(() => {
    anyDirtyRef.current = anyDirty;
  }, [anyDirty]);

  const plan = org?.subscription_plan ?? "basic";
  const activeLocations = locations.filter((l) => !l.archived_at);
  const locLimit = planLocationLimit(plan);
  const canAddLocation = locLimit === null || activeLocations.length < locLimit;

  const selectedServiceLocationId = serviceLocationId || activeLocations[0]?.id || "";

  useEffect(() => {
    if (!selectedServiceLocationId) return;
    setNewService((prev) => ({ ...prev, location_id: selectedServiceLocationId }));
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
        ? { is_active: match.is_active, hourly_rate_dollars: centsToDollars(match.hourly_rate_cents) }
        : { is_active: false, hourly_rate_dollars: "" };
      const draft = match ? serviceEdits[match.id] ?? base : catalogDrafts[name] ?? base;
      return {
        key: match?.id ?? `catalog:${normalizeKey(name)}`,
        id: match?.id,
        name: match?.display_name ?? name,
        is_active: draft.is_active,
        hourly_rate_dollars: draft.hourly_rate_dollars,
        is_catalog: !match,
        existing: match ?? null,
      };
    });

    const customRows = existing
      .filter((s) => !usedExistingIds.has(s.id))
      .map((s) => {
        const base = { is_active: s.is_active, hourly_rate_dollars: centsToDollars(s.hourly_rate_cents) };
        const draft = serviceEdits[s.id] ?? base;
        return {
          key: s.id,
          id: s.id,
          name: s.display_name ?? s.service_code,
          is_active: draft.is_active,
          hourly_rate_dollars: draft.hourly_rate_dollars,
          is_catalog: false,
          existing: s,
        } satisfies ServiceDraft;
      });

    return [...rows, ...customRows];
  }, [selectedServiceLocationId, servicesByLocation, serviceEdits, serviceCatalogDrafts]);

  const sortedServiceRows = useMemo(() => {
    const rows = [...serviceRows];
    rows.sort((a, b) => {
      if (serviceSort.key === "active") {
        const aActive = Number(a.existing?.is_active ?? false);
        const bActive = Number(b.existing?.is_active ?? false);
        const diff = aActive - bActive;
        if (diff !== 0) return serviceSort.dir === "asc" ? diff : -diff;
      } else if (serviceSort.key === "price") {
        const aPrice = Number.parseFloat(a.hourly_rate_dollars || "0") || 0;
        const bPrice = Number.parseFloat(b.hourly_rate_dollars || "0") || 0;
        if (aPrice !== bPrice) return serviceSort.dir === "asc" ? aPrice - bPrice : bPrice - aPrice;
      } else {
        const diff = a.name.localeCompare(b.name);
        if (diff !== 0) return serviceSort.dir === "asc" ? diff : -diff;
      }
      return a.name.localeCompare(b.name);
    });
    return rows;
  }, [serviceRows, serviceSort]);

  function toggleServiceSort(key: "active" | "name" | "price") {
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

  const renderSortIcons = (active: boolean, dir: "asc" | "desc") => (
    <span className="ml-2 inline-flex items-center gap-1">
      {active ? (
        <HugeiconsIcon icon={dir === "asc" ? ArrowUp01Icon : ArrowDown01Icon} size={14} className="text-[#ff9df9]" />
      ) : (
        <>
          <HugeiconsIcon icon={ArrowUp01Icon} size={12} className="text-gray-400" />
          <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-gray-400" />
        </>
      )}
    </span>
  );

  function updateServiceDraft(row: ServiceDraft, updates: { is_active?: boolean; hourly_rate_dollars?: string }) {
    if (row.id) {
      const id = row.id;
      setServiceEdits((prev) => {
        const existing = prev[id] ?? {
          hourly_rate_dollars: row.hourly_rate_dollars,
          is_active: row.is_active,
        };
        return {
          ...prev,
          [id]: {
            hourly_rate_dollars: updates.hourly_rate_dollars ?? existing.hourly_rate_dollars,
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
        is_active: row.is_active,
      };
      return {
        ...prev,
        [selectedServiceLocationId]: {
          ...byLocation,
          [row.name]: {
            hourly_rate_dollars: updates.hourly_rate_dollars ?? existing.hourly_rate_dollars,
            is_active: updates.is_active ?? existing.is_active,
          },
        },
      };
    });
  }

  const sortedSubjectDrafts = useMemo(() => {
    const rows = [...subjectDrafts];
    const dir = subjectSort.dir === "asc" ? 1 : -1;
    const baselineMap = new Map(subjectDraftsInitialRef.current.map((subject) => [subject.key, subject]));
    rows.sort((a, b) => {
      if (subjectSort.key === "included") {
        const aBaseline = baselineMap.get(a.key);
        const bBaseline = baselineMap.get(b.key);
        const aIncluded = (aBaseline?.included ?? false) || (aBaseline?.topics ?? []).some((t) => t.included);
        const bIncluded = (bBaseline?.included ?? false) || (bBaseline?.topics ?? []).some((t) => t.included);
        const diff = Number(aIncluded) - Number(bIncluded);
        if (diff !== 0) return diff * dir;
      }
      const diff = a.name.localeCompare(b.name);
      if (diff !== 0) return diff * dir;
      return 0;
    });
    return rows;
  }, [subjectDrafts, subjectSort]);

  useEffect(() => {
    let cancelled = false;

    async function loadAll(accessToken: string, email: string | null) {
      setStatus(null);
      setLoading(true);
      try {
        const meRes = await fetch("/api/me", { headers: { Authorization: `Bearer ${accessToken}` } });
        const meJson = meRes.ok ? ((await meRes.json()) as Me) : null;
        if (cancelled) return;
        setMe(meJson);

        const orgRes = await fetch("/organizations", { headers: { Authorization: `Bearer ${accessToken}` } });
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

        const locRes = await fetch("/locations?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } });
        const locs = locRes.ok ? ((await locRes.json()) as Location[]) : [];
        if (cancelled) return;
        const locList = Array.isArray(locs) ? locs : [];
        setLocations(locList);
        const activeLocs = locList.filter((l) => !l.archived_at);
        if (!serviceLocationId && activeLocs[0]) {
          setServiceLocationId(activeLocs[0].id);
        }

        const roomsNext: Record<string, Room[]> = {};
        const servicesNext: Record<string, ServiceOffered[]> = {};
        await Promise.all(
          locList.map(async (loc) => {
            const [roomRes, svcRes] = await Promise.all([
              fetch(`/rooms?location_id=${encodeURIComponent(loc.id)}&archived=all`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              }),
              fetch(`/services-offered?location_id=${encodeURIComponent(loc.id)}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              }),
            ]);
            if (roomRes.ok) roomsNext[loc.id] = (await roomRes.json()) as Room[];
            if (svcRes.ok) servicesNext[loc.id] = (await svcRes.json()) as ServiceOffered[];
          }),
        );
        if (cancelled) return;
        setRoomsByLocation(roomsNext);
        setServicesByLocation(servicesNext);

        const subjRes = await fetch("/subjects?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } });
        const subjList = subjRes.ok ? ((await subjRes.json()) as Subject[]) : [];
        if (cancelled) return;
        const subj = Array.isArray(subjList) ? subjList : [];
        setSubjects(subj);

        const topicsNext: Record<string, Topic[]> = {};
        await Promise.all(
          subj.map(async (s) => {
            const tRes = await fetch(`/topics?subject_id=${encodeURIComponent(s.id)}&archived=all`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (tRes.ok) topicsNext[s.id] = (await tRes.json()) as Topic[];
          }),
        );
        if (cancelled) return;
        setTopicsBySubject(topicsNext);

        const drafts = buildSubjectDrafts(subj, topicsNext);
        setSubjectDrafts(drafts);
        subjectDraftsInitialRef.current = drafts;
        setSubjectDraftsInitialKey(JSON.stringify(drafts));

        if (email) {
          setNewService((prev) => ({
            ...prev,
            location_id: prev.location_id || (activeLocs[0]?.id ?? ""),
          }));
        }
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
      if (!window.confirm("You have unsaved changes. Leave Settings without saving?")) {
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
  }

  function switchTab(next: SettingsTab) {
    if (next === activeTab) return;
    if (dirtyTabs[activeTab]) {
      const ok = window.confirm("You have unsaved changes. Discard them and switch tabs?");
      if (!ok) return;
      discardActive();
    }
    setStatus(null);
    setActiveTab(next);
  }

  async function sendResetEmail() {
    if (!userEmail) return;
    setStatus(null);
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, { redirectTo });
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
      body: JSON.stringify({ email: userEmail, returnUrl: `${window.location.origin}/settings` }),
    });
    const json = (await res.json()) as any;
    if (!res.ok || !json?.url) {
      setStatus(json?.error ? String(json.error) : `Billing portal failed (${res.status})`);
      return;
    }
    window.location.href = json.url;
  }

  async function saveBusiness() {
    if (!token) return;
    setStatus(null);
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
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
    const res = await fetch("/organizations", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ default_buffer_minutes: scheduleForm.formData.default_buffer_minutes }),
    });
    if (!res.ok) {
      setStatus(`Save failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Org;
    setOrg((prev) => (prev ? { ...prev, ...updated } : updated));
    scheduleForm.commit({ default_buffer_minutes: updated.default_buffer_minutes ?? 15 });
    setStatus("Saved.");
  }

  async function saveServices() {
    if (!token) return;
    setStatus(null);
    const locId = selectedServiceLocationId;
    if (!locId) {
      setStatus("Choose a location.");
      return;
    }

    const existingServices = servicesByLocation[locId] ?? [];
    const existingById = new Map(existingServices.map((s) => [s.id, s]));
    const existingCodes = new Set(existingServices.map((s) => s.service_code));

    for (const [id, patch] of Object.entries(serviceEdits)) {
      const svc = existingById.get(id);
      if (!svc) continue;
      const cents = dollarsToCents(patch.hourly_rate_dollars);
      if (cents == null) {
        setStatus("Please enter valid prices (e.g. 99.95).");
        return;
      }
      const res = await fetch("/services-offered", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({
          service_offered_id: id,
          display_name: svc.display_name ?? svc.service_code,
          hourly_rate_cents: cents,
          is_active: patch.is_active,
        }),
      });
      if (!res.ok) {
        setStatus(`Service save failed (${res.status}): ${await res.text()}`);
        return;
      }
    }

    const catalogDrafts = serviceCatalogDrafts[locId] ?? {};
    for (const [name, patch] of Object.entries(catalogDrafts)) {
      if (!patch.is_active) continue;
      const exists = existingServices.find(
        (s) => normalizeKey(s.display_name ?? s.service_code) === normalizeKey(name),
      );
      if (exists) continue;
      const cents = dollarsToCents(patch.hourly_rate_dollars);
      if (cents == null) {
        setStatus("Please enter valid prices (e.g. 99.95).");
        return;
      }
      const service_code = makeUniqueServiceCode(name, existingCodes);
      existingCodes.add(service_code);
      const res = await fetch("/services-offered", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({
          location_id: locId,
          service_code,
          display_name: name,
          hourly_rate_cents: cents,
          is_active: true,
        }),
      });
      if (!res.ok) {
        setStatus(`Add service failed (${res.status}): ${await res.text()}`);
        return;
      }
    }

    const refreshRes = await fetch(`/services-offered?location_id=${encodeURIComponent(locId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (refreshRes.ok) {
      const refreshed = (await refreshRes.json()) as ServiceOffered[];
      setServicesByLocation((prev) => ({ ...prev, [locId]: refreshed }));
    }

    setServiceEdits({});
    setServiceCatalogDrafts((prev) => ({ ...prev, [locId]: {} }));
    setStatus("Saved.");
  }

  async function saveSubjectsTopics() {
    if (!token) return;
    setStatus(null);
    const nextDrafts: SubjectDraft[] = subjectDrafts.map((s) => ({
      ...s,
      topics: s.topics.map((t) => ({ ...t })),
    }));

    for (const subject of nextDrafts) {
      const shouldInclude = subject.included || subject.topics.some((t) => t.included);
      if (!subject.id && shouldInclude) {
        const res = await fetch("/subjects", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({ subject_name: subject.name }),
        });
        if (!res.ok) {
          setStatus(`Add subject failed (${res.status}): ${await res.text()}`);
          return;
        }
        const created = (await res.json()) as Subject;
        subject.id = created.id;
      }

      if (subject.id) {
        const res = await fetch("/subjects", {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({ subject_id: subject.id, subject_name: subject.name, archived: !subject.included }),
        });
        if (!res.ok) {
          setStatus(`Subject save failed (${res.status}): ${await res.text()}`);
          return;
        }
      }

      if (!subject.id) continue;
      for (const topic of subject.topics) {
        if (!topic.id && !topic.included) continue;
        if (!topic.id) {
          const res = await fetch("/topics", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
            body: JSON.stringify({ subject_id: subject.id, topic_name: topic.name }),
          });
          if (!res.ok) {
            setStatus(`Add topic failed (${res.status}): ${await res.text()}`);
            return;
          }
          const created = (await res.json()) as Topic;
          topic.id = created.id;
          continue;
        }
        const res = await fetch("/topics", {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({ topic_id: topic.id, topic_name: topic.name, archived: !topic.included }),
        });
        if (!res.ok) {
          setStatus(`Topic save failed (${res.status}): ${await res.text()}`);
          return;
        }
      }
    }

    setSubjectDrafts(nextDrafts);
    subjectDraftsInitialRef.current = nextDrafts;
    setSubjectDraftsInitialKey(JSON.stringify(nextDrafts));
    setStatus("Saved.");
  }

  function updateClientField(group: "parents" | "students", key: string, value: boolean) {
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

  async function onSave() {
    if (activeTab === "BUSINESS") return saveBusiness();
    if (activeTab === "SCHEDULE") return saveSchedule();
    if (activeTab === "SERVICES") return saveServices();
    if (activeTab === "SUBJECTS_TOPICS") return saveSubjectsTopics();
    if (activeTab === "CLIENTS") return saveClientFields();
  }

  async function addService(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setStatus(null);
    const locId = selectedServiceLocationId || newService.location_id;
    const name = newService.name.trim();
    const cents = dollarsToCents(newService.price);
    if (!locId) return setStatus("Choose a location.");
    if (!name) return setStatus("Enter a service name.");
    if (cents == null) return setStatus("Enter a valid price (e.g. 99.95).");

    const existingCodes = new Set((servicesByLocation[locId] ?? []).map((s) => s.service_code));
    const service_code = makeUniqueServiceCode(name, existingCodes);

    const res = await fetch("/services-offered", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        location_id: locId,
        service_code,
        hourly_rate_cents: cents,
        display_name: name,
        is_active: true,
      }),
    });
    if (!res.ok) {
      setStatus(`Add service failed (${res.status}): ${await res.text()}`);
      return;
    }
    const created = (await res.json()) as ServiceOffered;
    setServicesByLocation((prev) => ({ ...prev, [locId]: [...(prev[locId] ?? []), created] }));
    setNewService({ location_id: locId, name: "", price: "" });
    setStatus("Service added.");
  }

  async function addSubject(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    const subject_name = newSubjectName.trim();
    if (!subject_name) return setStatus("Enter a subject name.");
    const newKey = `custom:${normalizeKey(subject_name)}:${Date.now()}`;
    setSubjectDrafts((prev) => [
      ...prev,
      { key: newKey, name: subject_name, included: true, topics: [], is_catalog: false },
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
    const password = window.prompt("Enter your password to confirm this action:");
    if (!password) return null;
    const { error } = await supabase.auth.signInWithPassword({ email: userEmail, password });
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
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setStatus(`Location update failed (${res.status}): ${await res.text()}`);
      return;
    }
    const updated = (await res.json()) as Location;
    setLocations((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)));
    cancelEditLocation();
    setStatus("Location updated.");
  }

  async function archiveLocation(locId: string) {
    const accessToken = (await confirmWithPassword()) ?? token;
    if (!accessToken) return;
    const res = await fetch("/locations", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
      body: JSON.stringify({ location_id: locId }),
    });
    if (!res.ok) {
      setStatus(`Archive failed (${res.status}): ${await res.text()}`);
      return;
    }
    setLocations((prev) => prev.map((l) => (l.id === locId ? { ...l, archived_at: new Date().toISOString() } : l)));
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
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
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
      [updated.location_id]: (prev[updated.location_id] ?? []).map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    }));
    cancelEditRoom();
    setStatus("Room updated.");
  }

  async function archiveRoom(room: Room) {
    const accessToken = (await confirmWithPassword()) ?? token;
    if (!accessToken) return;
    const res = await fetch("/rooms", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
      body: JSON.stringify({ room_id: room.id }),
    });
    if (!res.ok) {
      setStatus(`Archive failed (${res.status}): ${await res.text()}`);
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
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => switchTab(t.key)}
                    className={[
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      t.key === activeTab ? "bg-gray-100 font-semibold" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {t.label}
                    {dirtyTabs[t.key] ? <span className="ml-2 text-xs text-purple-700">(unsaved)</span> : null}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <section className="min-w-0 flex-1 bg-white">
            <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h1 className="m-0 text-xl font-bold">{tabs.find((t) => t.key === activeTab)?.label ?? "Settings"}</h1>
                <p className="mt-1 text-sm text-gray-600">Save or discard changes before switching sections.</p>
              </div>

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
            </div>

            <div className="px-4 py-6 sm:px-6">
              {loading ? <p>Loading…</p> : null}
              {status ? <p className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

              {!loading && activeTab === "ACCOUNT" ? (
                <div className="grid gap-6">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-600">Logged in as</div>
                    <div className="text-base font-semibold">{userEmail ?? "—"}</div>
                  </div>

                  {!isTutorOnly ? (
                    <div className="grid gap-1">
                      <div className="text-sm text-gray-600">Plan</div>
                      <div className="flex items-center gap-3 text-base font-semibold">
                        {planLabel(org?.subscription_plan)}
                        <a
                          href={`/checkout?plan=${encodeURIComponent(plan ?? "basic")}${
                            org?.id ? `&org=${encodeURIComponent(org.id)}` : ""
                          }`}
                          className="text-sm font-semibold text-[#7200dc] transition-colors hover:text-[#00c5dc]"
                        >
                          Change plan
                        </a>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={() => sendResetEmail()}
                    >
                      Reset password
                    </button>
                    {!isTutorOnly ? (
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                        onClick={() => openBillingPortal()}
                      >
                        Manage billing
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === "BUSINESS" ? (
                <form
                  className="grid w-full max-w-[720px] gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSave();
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="business_name">Business name</Label>
                    <Input
                      id="business_name"
                      value={businessForm.formData.business_name}
                      onChange={(e) => businessForm.updateField("business_name", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                      value={businessForm.formData.timezone}
                      onChange={(e) => businessForm.updateField("timezone", e.target.value)}
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="business_phone">Business phone number</Label>
                      <Input
                        id="business_phone"
                        value={businessForm.formData.business_phone}
                        onChange={(e) => businessForm.updateField("business_phone", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="business_email">Business email</Label>
                      <Input
                        id="business_email"
                        type="email"
                        value={businessForm.formData.business_email}
                        onChange={(e) => businessForm.updateField("business_email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="addr1">Business address line 1</Label>
                    <Input
                      id="addr1"
                      value={businessForm.formData.business_address_1}
                      onChange={(e) => businessForm.updateField("business_address_1", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addr2">Business address line 2</Label>
                    <Input
                      id="addr2"
                      value={businessForm.formData.business_address_2}
                      onChange={(e) => businessForm.updateField("business_address_2", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="grid gap-2 sm:col-span-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={businessForm.formData.business_city}
                        onChange={(e) => businessForm.updateField("business_city", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <select
                        id="state"
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                        value={businessForm.formData.business_state}
                        onChange={(e) => businessForm.updateField("business_state", e.target.value)}
                      >
                        <option value="">—</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP</Label>
                    <Input
                      id="zip"
                      value={businessForm.formData.business_zip}
                      onChange={(e) => businessForm.updateField("business_zip", e.target.value)}
                    />
                  </div>
                </form>
              ) : null}

              {!loading && activeTab === "LOCATIONS" ? (
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Locations</div>
                      <div className="text-xs text-gray-600">
                        Plan limit: {locLimit === null ? "Unlimited" : `${locLimit}`} · Current: {activeLocations.length}
                      </div>
                    </div>
                    <a
                      href={canAddLocation ? "/setup" : "#"}
                      onClick={(e) => {
                        if (!canAddLocation) e.preventDefault();
                      }}
                      className={[
                        "itutoros-settings-btn itutoros-settings-btn-primary inline-flex items-center justify-center no-underline",
                        canAddLocation ? "" : "pointer-events-none opacity-50",
                      ].join(" ")}
                    >
                      Add location (opens Setup)
                    </a>
                  </div>

                  <div className="grid gap-4">
                    {locations.length === 0 ? <p className="text-sm text-gray-600">No locations yet.</p> : null}
                    {locations
                      .slice()
                      .sort((a, b) => Number(Boolean(a.archived_at)) - Number(Boolean(b.archived_at)))
                      .map((loc) => {
                        const rooms = roomsByLocation[loc.id] ?? [];
                        const isEditing = editLocationId === loc.id && editLocationDraft;
                        const locationIsVirtual = isEditing ? editLocationDraft.is_virtual : loc.is_virtual;
                        return (
                          <div key={loc.id} className="rounded-xl border border-gray-200 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold">
                                  {loc.location_name}{" "}
                                  {loc.archived_at ? <span className="text-xs text-gray-500">(archived)</span> : null}
                                </div>
                                <div className="text-xs text-gray-600">{loc.is_virtual ? "Virtual" : "In-person"}</div>
                              </div>
                              {!loc.archived_at ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                    onClick={() => startEditLocation(loc)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                    onClick={() => archiveLocation(loc.id)}
                                  >
                                    Archive
                                  </button>
                                </div>
                              ) : null}
                            </div>

                            {isEditing ? (
                              <div className="mt-4 grid gap-3">
                                <div className="grid gap-2">
                                  <Label>Location name</Label>
                                  <Input
                                    value={editLocationDraft.location_name}
                                    onChange={(e) =>
                                      setEditLocationDraft((prev) => (prev ? { ...prev, location_name: e.target.value } : prev))
                                    }
                                  />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={editLocationDraft.is_virtual}
                                    onChange={(e) =>
                                      setEditLocationDraft((prev) => (prev ? { ...prev, is_virtual: e.target.checked } : prev))
                                    }
                                  />
                                  This is a virtual / online location
                                </label>
                                {editLocationDraft.is_virtual ? (
                                  <div className="grid gap-2">
                                    <Label>Virtual location link (Zoom/Meet/etc.)</Label>
                                    <Input
                                      value={editLocationDraft.location_address_1}
                                      onChange={(e) =>
                                        setEditLocationDraft((prev) =>
                                          prev ? { ...prev, location_address_1: e.target.value } : prev,
                                        )
                                      }
                                      placeholder="https://zoom.us/j/..."
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="grid gap-2">
                                      <Label>Address line 1</Label>
                                      <Input
                                        value={editLocationDraft.location_address_1}
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev ? { ...prev, location_address_1: e.target.value } : prev,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>Address line 2</Label>
                                      <Input
                                        value={editLocationDraft.location_address_2}
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev ? { ...prev, location_address_2: e.target.value } : prev,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                      <div className="grid gap-2 sm:col-span-2">
                                        <Label>City</Label>
                                        <Input
                                          value={editLocationDraft.location_city}
                                          onChange={(e) =>
                                            setEditLocationDraft((prev) =>
                                              prev ? { ...prev, location_city: e.target.value } : prev,
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label>State</Label>
                                        <select
                                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                          value={editLocationDraft.location_state}
                                          onChange={(e) =>
                                            setEditLocationDraft((prev) =>
                                              prev ? { ...prev, location_state: e.target.value } : prev,
                                            )
                                          }
                                        >
                                          <option value="">—</option>
                                          {US_STATES.map((s) => (
                                            <option key={s} value={s}>
                                              {s}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>ZIP</Label>
                                      <Input
                                        value={editLocationDraft.location_zip}
                                        onChange={(e) =>
                                          setEditLocationDraft((prev) =>
                                            prev ? { ...prev, location_zip: e.target.value } : prev,
                                          )
                                        }
                                      />
                                    </div>
                                  </>
                                )}
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                    onClick={() => saveEditLocation()}
                                  >
                                    Save location
                                  </button>
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                    onClick={() => cancelEditLocation()}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : null}

                            <div className="mt-4">
                              <div className="text-xs font-semibold text-gray-600">Rooms</div>
                              {locationIsVirtual ? (
                                <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                                  Virtual locations don't use rooms. Any existing rooms will be archived.
                                </div>
                              ) : (
                                <>
                                  {rooms.length === 0 ? <div className="text-sm text-gray-600">No rooms.</div> : null}
                                  <ul className="mt-2 grid gap-2">
                                    {rooms
                                      .slice()
                                      .sort((a, b) => Number(Boolean(a.archived_at)) - Number(Boolean(b.archived_at)))
                                      .map((room) => {
                                        const roomEditing = editRoomId === room.id && editRoomDraft;
                                        return (
                                          <li key={room.id} className="rounded-lg border border-gray-100 p-2">
                                            {roomEditing ? (
                                              <div className="grid gap-2 sm:grid-cols-4 sm:items-end">
                                                <div className="grid gap-1 sm:col-span-2">
                                                  <Label>Room name</Label>
                                                  <Input
                                                    value={editRoomDraft.room_name}
                                                    onChange={(e) =>
                                                      setEditRoomDraft((prev) =>
                                                        prev ? { ...prev, room_name: e.target.value } : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="grid gap-1">
                                                  <Label>Room #</Label>
                                                  <Input
                                                    value={editRoomDraft.room_number}
                                                    onChange={(e) =>
                                                      setEditRoomDraft((prev) =>
                                                        prev ? { ...prev, room_number: e.target.value } : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="grid gap-1">
                                                  <Label>Floor</Label>
                                                  <Input
                                                    value={editRoomDraft.floor_number}
                                                    onChange={(e) =>
                                                      setEditRoomDraft((prev) =>
                                                        prev ? { ...prev, floor_number: e.target.value } : prev,
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="flex gap-2 sm:col-span-4">
                                                  <button
                                                    type="button"
                                                    className="itutoros-settings-btn itutoros-settings-btn-primary"
                                                    onClick={() => saveEditRoom()}
                                                  >
                                                    Save room
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                                    onClick={() => cancelEditRoom()}
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="flex items-center justify-between gap-3">
                                                <div className="text-sm">
                                                  {room.room_name}{" "}
                                                  {room.archived_at ? (
                                                    <span className="text-xs text-gray-500">(archived)</span>
                                                  ) : null}
                                                </div>
                                                {!room.archived_at ? (
                                                  <div className="flex items-center gap-2">
                                                    <button
                                                      type="button"
                                                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                                      onClick={() => startEditRoom(room)}
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                                                      onClick={() => archiveRoom(room)}
                                                    >
                                                      Archive
                                                    </button>
                                                  </div>
                                                ) : null}
                                              </div>
                                            )}
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === "CLIENTS" ? (
                <div className="grid gap-6">
                  <div className="text-sm text-gray-600">
                    Choose which fields appear in the Clients page grids. Save or discard changes before switching sections.
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="text-sm font-semibold">Parent fields</div>
                      <div className="mt-3 grid gap-2">
                        {PARENT_FIELDS.map((field) => (
                          <label key={field.key} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={clientsForm.formData.parents[field.key]}
                              onChange={(e) => updateClientField("parents", field.key, e.target.checked)}
                            />
                            {field.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Student fields</div>
                      <div className="mt-3 grid gap-2">
                        {STUDENT_FIELDS.map((field) => (
                          <label key={field.key} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={clientsForm.formData.students[field.key]}
                              onChange={(e) => updateClientField("students", field.key, e.target.checked)}
                            />
                            {field.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === "SERVICES" ? (
                <div className="grid gap-6">
                  <div className="text-sm text-gray-600">
                    Active services appear first. Check a service to include it and set an hourly price.
                  </div>

                  <div className="flex flex-wrap items-end gap-4">
                    <div className="grid gap-2">
                      <Label>Location</Label>
                      <select
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                        value={selectedServiceLocationId}
                        onChange={(e) => {
                          setServiceLocationId(e.target.value);
                          setNewService((prev) => ({ ...prev, location_id: e.target.value }));
                        }}
                      >
                        {activeLocations.length === 0 ? <option value="">—</option> : null}
                        {activeLocations.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.location_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-[720px] border-collapse text-sm md:min-w-[900px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left">
                            <button
                              type="button"
                              className={`flex items-center gap-1 font-semibold ${serviceSort.key === "name" ? "text-[#ff9df9]" : "text-gray-900"}`}
                              onClick={() => toggleServiceSort("name")}
                            >
                              Service
                              {renderSortIcons(serviceSort.key === "name", serviceSort.dir)}
                            </button>
                          </th>
                          <th className="px-3 py-2 text-left">
                            <button
                              type="button"
                              className={`flex items-center gap-1 font-semibold ${serviceSort.key === "active" ? "text-[#ff9df9]" : "text-gray-900"}`}
                              onClick={() => toggleServiceSort("active")}
                            >
                              Included
                              {renderSortIcons(serviceSort.key === "active", serviceSort.dir)}
                            </button>
                          </th>
                          <th className="px-3 py-2 text-left">
                            <button
                              type="button"
                              className={`flex items-center gap-1 font-semibold ${serviceSort.key === "price" ? "text-[#ff9df9]" : "text-gray-900"}`}
                              onClick={() => toggleServiceSort("price")}
                            >
                              Price ($/hr)
                              {renderSortIcons(serviceSort.key === "price", serviceSort.dir)}
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedServiceRows.map((row) => (
                          <tr key={row.key} className="border-t border-gray-100">
                            <td className="px-3 py-2 font-medium">{row.name}</td>
                            <td className="px-3 py-2">
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-[#0b1f5f]"
                                checked={row.is_active}
                                onChange={(e) => updateServiceDraft(row, { is_active: e.target.checked })}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <Input
                                value={row.hourly_rate_dollars}
                                onChange={(e) => updateServiceDraft(row, { hourly_rate_dollars: e.target.value })}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <form onSubmit={addService} className="grid w-full max-w-[720px] gap-3 rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold">Add a new service</div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Location</Label>
                        <select
                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                          value={newService.location_id}
                          onChange={(e) => setNewService((prev) => ({ ...prev, location_id: e.target.value }))}
                        >
                          <option value="">—</option>
                          {activeLocations.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.location_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Service name</Label>
                        <Input
                          value={newService.name}
                          onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Price ($/hr)</Label>
                        <Input
                          value={newService.price}
                          onChange={(e) => setNewService((prev) => ({ ...prev, price: e.target.value }))}
                        />
                      </div>
                      <div className="flex items-end">
                        <button type="submit" className="itutoros-settings-btn itutoros-settings-btn-primary">
                          Add service
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}

              {!loading && activeTab === "SUBJECTS_TOPICS" ? (
                <div className="grid gap-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span>Checkboxes control whether a subject/topic is included.</span>
                    <div className="ml-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleSubjectSort("included")}
                        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${
                          subjectSort.key === "included" ? "text-[#ff9df9]" : "text-gray-600"
                        }`}
                      >
                        Included {renderSortIcons(subjectSort.key === "included", subjectSort.dir)}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSubjectSort("name")}
                        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${
                          subjectSort.key === "name" ? "text-[#ff9df9]" : "text-gray-600"
                        }`}
                      >
                        Subject {renderSortIcons(subjectSort.key === "name", subjectSort.dir)}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {sortedSubjectDrafts.map((subject) => {
                      const subjectIncluded = subject.included || subject.topics.some((t) => t.included);
                      const sortedTopics = [...subject.topics].sort((a, b) => {
                        const diff = Number(b.included) - Number(a.included);
                        if (diff !== 0) return diff;
                        return a.name.localeCompare(b.name);
                      });
                      return (
                        <div key={subject.key} className="rounded-xl border border-gray-200 p-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                              <div className="grid gap-2">
                                <Label>Subject</Label>
                                <Input
                                  value={subject.name}
                                  onChange={(e) =>
                                    setSubjectDrafts((prev) =>
                                      prev.map((s) => (s.key === subject.key ? { ...s, name: e.target.value } : s)),
                                    )
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Label className="text-sm">Included</Label>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 accent-[#0b1f5f]"
                                  checked={subjectIncluded}
                                  onChange={(e) =>
                                    setSubjectDrafts((prev) =>
                                      prev.map((s) => {
                                        if (s.key !== subject.key) return s;
                                        const included = e.target.checked;
                                        return {
                                          ...s,
                                          included,
                                          topics: included ? s.topics : s.topics.map((t) => ({ ...t, included: false })),
                                        };
                                      }),
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="mt-4 grid gap-2">
                              <div className="text-xs font-semibold text-gray-600">Topics</div>
                              <div className="grid gap-2">
                                {sortedTopics.map((topic) => (
                                  <div key={topic.key} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                                    <Input
                                      value={topic.name}
                                      onChange={(e) =>
                                        setSubjectDrafts((prev) =>
                                          prev.map((s) => {
                                            if (s.key !== subject.key) return s;
                                            return {
                                              ...s,
                                              topics: s.topics.map((t) =>
                                                t.key === topic.key ? { ...t, name: e.target.value } : t,
                                              ),
                                            };
                                          }),
                                        )
                                      }
                                      disabled={!subjectIncluded}
                                    />
                                    <div className="flex items-center gap-2">
                                      <Label className="text-sm">Included</Label>
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 accent-[#0b1f5f]"
                                      checked={topic.included}
                                      disabled={!subjectIncluded}
                                        onChange={(e) =>
                                          setSubjectDrafts((prev) =>
                                            prev.map((s) => {
                                              if (s.key !== subject.key) return s;
                                              return {
                                                ...s,
                                                included: e.target.checked ? true : s.included,
                                                topics: s.topics.map((t) =>
                                                  t.key === topic.key ? { ...t, included: e.target.checked } : t,
                                                ),
                                              };
                                            }),
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-2 flex flex-wrap gap-2">
                                <Input
                                  placeholder="Add a topic…"
                                  value={newTopicDrafts[subject.key] ?? ""}
                                  onChange={(e) =>
                                    setNewTopicDrafts((prev) => ({ ...prev, [subject.key]: e.target.value }))
                                  }
                                  disabled={!subjectIncluded}
                                  className="max-w-[420px]"
                                />
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-primary"
                                  onClick={() => addTopic(subject.key)}
                                  disabled={!subjectIncluded}
                                >
                                  Add topic
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <form onSubmit={addSubject} className="flex flex-wrap gap-2">
                    <Input
                      placeholder="Add a subject…"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="max-w-[420px]"
                    />
                    <button type="submit" className="itutoros-settings-btn itutoros-settings-btn-primary">
                      Add subject
                    </button>
                  </form>
                </div>
              ) : null}

              {!loading && activeTab === "SCHEDULE" ? (
                <div className="grid max-w-[520px] gap-2">
                  <Label htmlFor="buffer">Default schedule buffer (minutes)</Label>
                  <Input
                    id="buffer"
                    type="number"
                    min={0}
                    value={String(scheduleForm.formData.default_buffer_minutes)}
                    onChange={(e) =>
                      scheduleForm.updateField("default_buffer_minutes", Number.parseInt(e.target.value || "0", 10))
                    }
                  />
                </div>
              ) : null}

              {!loading && activeTab === "PIPELINE" ? (
                <div className="grid gap-2">
                  <div className="text-sm text-gray-600">Lead pipeline capacity</div>
                  <div className="text-2xl font-extrabold">
                    {planLeadLimit(plan) === null ? "Unlimited" : String(planLeadLimit(plan))}
                  </div>
                </div>
              ) : null}

              {!loading && (activeTab === "PRODUCTS" || activeTab === "MARKETING" || activeTab === "WEBSITE") ? (
                <div className="text-sm text-gray-600">Coming soon.</div>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
