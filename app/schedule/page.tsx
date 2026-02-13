"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_DATE_FORMAT, formatDateTimeWithPattern, formatDateWithPattern, normalizeDateFormat } from "@/lib/date-format";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, Calendar01Icon, CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type { EventClickArg, EventInput } from "@fullcalendar/core";
import type { DateClickArg } from "@fullcalendar/interaction";
import { toast } from "@/lib/use-toast";

type ScheduleTab = "CALENDAR" | "NEW" | "CONFLICTS";

const SCHEDULE_TABS: { key: ScheduleTab; label: string; icon: any }[] = [
  { key: "CALENDAR", label: "Calendar", icon: Calendar01Icon },
  { key: "NEW", label: "New Schedule Entry", icon: CalendarAdd01Icon },
  { key: "CONFLICTS", label: "Conflicts", icon: Alert01Icon },
];

const SCHEDULE_TAB_ICON_COLORS: Record<ScheduleTab, string> = {
  CALENDAR: "#c00f5e",
  NEW: "#ff4800",
  CONFLICTS: "#ffde00",
};

const RECURRENCE_OPTIONS = [
  { value: "AD_HOC", label: "Ad-hoc (one-off)" },
  { value: "WEEKLY", label: "Weekly recurring" },
  { value: "DAILY", label: "Daily recurring" },
];

const DAY_OPTIONS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

type Location = {
  id: string;
  location_name: string;
  is_virtual?: boolean;
  is_system?: boolean;
  archived_at?: string | null;
  location_address_1?: string | null;
  location_address_2?: string | null;
  location_city?: string | null;
  location_state?: string | null;
  location_zip?: string | null;
};

type Tutor = {
  id: string;
  user?: { first_name?: string | null; last_name?: string | null; email?: string | null };
  color_hex?: string | null;
};

type ServiceOffered = {
  id: string;
  location_id: string;
  service_code: string;
  display_name?: string | null;
  hourly_rate_cents?: number | null;
  unit_length_minutes?: number | null;
  capacity?: number | null;
  is_active?: boolean | null;
};

type Product = {
  id: string;
  product_name: string;
  service_code?: string | null;
};

type Room = { id: string; room_name: string; archived_at?: string | null };

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  parent_id?: string | null;
  archived_at?: string | null;
  parent?: Parent | null;
};

type Parent = {
  id: string;
  parent1_first_name?: string | null;
  parent1_last_name?: string | null;
  parent1_address_1?: string | null;
  parent1_address_2?: string | null;
  parent1_city?: string | null;
  parent1_state?: string | null;
  parent1_zip?: string | null;
};

type Subject = { id: string; subject_name: string };

type Topic = { id: string; topic_name: string; subject_id?: string };

type LocationDetailMode = "online" | "student_home" | "other";

type ScheduleEntry = {
  id: string;
  location_id: string;
  service_offered_id: string;
  product_id?: string | null;
  tutor_id: string;
  start_at: string;
  end_at: string;
  blocked_end_at: string;
  duration_minutes: number;
  include_buffer: boolean;
  capacity: number;
  recurrence_type?: string | null;
  recurrence_interval?: number | null;
  recurrence_days_of_week?: string | null;
  series_id?: string | null;
  series_end_date?: string | null;
  occurrence_count?: number | null;
  location_detail?: string | null;
  subject_id?: string | null;
  topic_id?: string | null;
  resources_text?: string | null;
  rooms?: Array<{ room_id: string }>;
  attendees?: Array<{ student_id: string }>;
  archived_at?: string | null;
};

type ScheduleConflict = {
  id: string;
  message?: string | null;
  conflict_tags?: string[] | null;
  resolved_at?: string | null;
  schedule_entry_id: string;
  conflicting_schedule_entry_id: string;
  scheduleEntry?: ScheduleEntry;
  conflictingScheduleEntry?: ScheduleEntry;
  created_at?: string | null;
};

type ConflictPayload = {
  message?: string;
  conflict_tags?: string[];
  conflicting_schedule_entry_id?: string;
  resource?: Record<string, any>;
};

type ScheduleFormState = {
  location_id: string;
  location_detail: string;
  service_offered_id: string;
  product_id: string;
  tutor_id: string;
  subject_id: string;
  topic_id: string;
  attendee_student_ids: string[];
  room_ids: string[];
  resources_text: string;
  start_at_local: string;
  duration_minutes: number;
  include_buffer: boolean;
  recurrence_type: "AD_HOC" | "WEEKLY" | "DAILY";
  recurrence_interval: number;
  recurrence_days_of_week: number[];
  schedule_end_mode: "count" | "date";
  occurrence_count: number;
  series_end_date_local: string;
};

const DEFAULT_SCHEDULE_FORM: ScheduleFormState = {
  location_id: "",
  location_detail: "",
  service_offered_id: "",
  product_id: "",
  tutor_id: "",
  subject_id: "",
  topic_id: "",
  attendee_student_ids: [],
  room_ids: [],
  resources_text: "",
  start_at_local: "",
  duration_minutes: 60,
  include_buffer: true,
  recurrence_type: "AD_HOC",
  recurrence_interval: 1,
  recurrence_days_of_week: [],
  schedule_end_mode: "count",
  occurrence_count: 12,
  series_end_date_local: "",
};

function toDateTimeLocal(value: Date) {
  const offset = value.getTimezoneOffset();
  const local = new Date(value.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function parseDateTimeLocal(value: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

function formatCurrencyFromCents(cents: number) {
  const amount = Number.isFinite(cents) ? cents / 100 : 0;
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function serviceKey(service: ServiceOffered) {
  return normalizeKey(service.display_name || service.service_code || "");
}

const PRODUCT_OPTION_PREFIX = "product:";

function productOptionKey(productId: string) {
  return `${PRODUCT_OPTION_PREFIX}${productId}`;
}

function isProductOption(key: string) {
  return key.startsWith(PRODUCT_OPTION_PREFIX);
}

function productIdFromOption(key: string) {
  return isProductOption(key) ? key.slice(PRODUCT_OPTION_PREFIX.length) : "";
}

function tutorLabel(tutor?: Tutor | null) {
  if (!tutor) return "Unassigned";
  const first = tutor.user?.first_name ?? "";
  const last = tutor.user?.last_name ?? "";
  const full = `${first} ${last}`.trim();
  return full || tutor.user?.email || "Tutor";
}

function serviceLabel(service?: ServiceOffered | null) {
  if (!service) return "Service";
  return service.display_name || service.service_code;
}

function studentLabel(student?: Student | null) {
  if (!student) return "Student";
  return `${student.first_name} ${student.last_name}`.trim();
}

function parentLabel(parent?: Parent | null) {
  if (!parent) return "Parent";
  const first = parent.parent1_first_name ?? "";
  const last = parent.parent1_last_name ?? "";
  const full = `${last}, ${first}`.trim().replace(/^,\\s*/, "");
  return full || "Parent";
}

function formatParentAddress(parent?: Parent | null) {
  if (!parent) return "";
  const lines: string[] = [];
  if (parent.parent1_address_1) lines.push(parent.parent1_address_1);
  if (parent.parent1_address_2) lines.push(parent.parent1_address_2);
  const cityStateZip = [parent.parent1_city, parent.parent1_state, parent.parent1_zip]
    .filter(Boolean)
    .join(" ");
  if (cityStateZip) lines.push(cityStateZip);
  return lines.join(", ");
}

function locationDetailLabel(mode: LocationDetailMode) {
  switch (mode) {
    case "online":
      return "Online meeting URL";
    case "student_home":
      return "Student's home address";
    case "other":
      return "Other address";
    default:
      return "Location detail";
  }
}

function normalizeConflictTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t));
  return [];
}

const UUID_PATTERN = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const UUID_REGEX = new RegExp(UUID_PATTERN, "gi");
const UUID_PARENS_REGEX = new RegExp(`\\([^)]*${UUID_PATTERN}[^)]*\\)`, "gi");

function formatConflictMessage(message?: string | null) {
  if (!message) return "This schedule overlaps another entry.";
  let sanitized = message.replace(UUID_PARENS_REGEX, "").replace(UUID_REGEX, "");
  sanitized = sanitized.replace(/\s{2,}/g, " ").replace(/\(\s*\)/g, "").trim();
  return sanitized || "This schedule overlaps another entry.";
}

function conflictPairKey(row: ScheduleConflict) {
  const ids = [row.schedule_entry_id, row.conflicting_schedule_entry_id].filter(Boolean).sort();
  return ids.join("|");
}

function parseRecurrenceDays(value: any): number[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => Number(v)).filter((v) => Number.isFinite(v));
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => Number.isFinite(v));
  }
  return [];
}

function normalizeHexColor(value?: string | null) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function getContrastText(hex: string) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "#ffffff";
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111827" : "#ffffff";
}

function lightenHexColor(hex: string, amount = 0.75) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "#f3e9ff";
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

function tutorOptionLabel(tutor: Tutor) {
  return `● ${tutorLabel(tutor)}`;
}

export default function SchedulePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const lastDateClickRef = useRef<{ ts: number; dateStr: string } | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ScheduleTab>("CALENDAR");

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [servicesByLocation, setServicesByLocation] = useState<Record<string, ServiceOffered[]>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [parents, setParents] = useState<Parent[]>([]);
  const [locationChoice, setLocationChoice] = useState<string>("");
  const [selectedServiceKey, setSelectedServiceKey] = useState<string>("");
  const [dateFormat, setDateFormat] = useState(DEFAULT_DATE_FORMAT);

  const [activeConflicts, setActiveConflicts] = useState<ScheduleConflict[]>([]);
  const [conflictRows, setConflictRows] = useState<ScheduleConflict[]>([]);
  const [conflictView, setConflictView] = useState<"active" | "resolved" | "all">("active");

  const [selectedTutorId, setSelectedTutorId] = useState<string>("all");
  const [showConflictsOnly, setShowConflictsOnly] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [pendingConflict, setPendingConflict] = useState<ConflictPayload | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [calendarLocationChoice, setCalendarLocationChoice] = useState<string>("all");
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [deleteScope, setDeleteScope] = useState<"THIS" | "ALL">("THIS");
  const [deleteStep, setDeleteStep] = useState<"choose" | "confirm">("choose");
  const [deleteBusy, setDeleteBusy] = useState(false);

  const [attendeeQuery, setAttendeeQuery] = useState("");
  const [attendeeOpen, setAttendeeOpen] = useState(false);

  const formatDate = (value: any) => formatDateWithPattern(value, dateFormat);
  const formatDateTime = (value: any) => formatDateTimeWithPattern(value, dateFormat);

  const [form, setForm] = useState<ScheduleFormState>({ ...DEFAULT_SCHEDULE_FORM });

  const locationMap = useMemo(() => new Map(locations.map((l) => [l.id, l])), [locations]);
  const subjectMap = useMemo(() => new Map(subjects.map((s) => [s.id, s])), [subjects]);
  const topicMap = useMemo(() => new Map(topics.map((t) => [t.id, t])), [topics]);
  const setupLocations = useMemo(
    () => locations.filter((loc) => !loc.archived_at && !loc.is_system),
    [locations],
  );
  const systemVirtualLocation = useMemo(() => {
    return (
      locations.find((loc) => loc.is_system && loc.is_virtual) ??
      locations.find((loc) => loc.is_system && loc.location_name.toLowerCase().includes("virtual")) ??
      locations.find((loc) => loc.location_name.toLowerCase().includes("web meeting")) ??
      null
    );
  }, [locations]);
  const systemOffsiteLocation = useMemo(() => {
    return (
      locations.find((loc) => loc.is_system && !loc.is_virtual) ??
      locations.find((loc) => loc.is_system && loc.location_name.toLowerCase().includes("offsite")) ??
      locations.find((loc) => loc.location_name.toLowerCase().includes("homebound")) ??
      null
    );
  }, [locations]);
  const primarySetupLocationId =
    setupLocations[0]?.id ?? locations.find((loc) => !loc.archived_at && !loc.is_system)?.id ?? "";

  const allServices = useMemo(() => Object.values(servicesByLocation).flat(), [servicesByLocation]);
  const serviceMap = useMemo(() => new Map(allServices.map((s) => [s.id, s])), [allServices]);
  const activeServicesByLocation = useMemo(() => {
    const next: Record<string, ServiceOffered[]> = {};
    Object.entries(servicesByLocation).forEach(([locId, list]) => {
      next[locId] = list.filter(
        (svc) => svc.is_active === true && typeof svc.hourly_rate_cents === "number" && svc.hourly_rate_cents > 0,
      );
    });
    return next;
  }, [servicesByLocation]);
  const allActiveServices = useMemo(
    () => Object.values(activeServicesByLocation).flat(),
    [activeServicesByLocation],
  );
  const serviceKeyByCode = useMemo(() => {
    const map = new Map<string, string>();
    allActiveServices.forEach((svc) => {
      const key = serviceKey(svc);
      if (key && !map.has(svc.service_code)) {
        map.set(svc.service_code, key);
      }
    });
    return map;
  }, [allActiveServices]);
  const activeServiceCodes = useMemo(
    () => new Set(allActiveServices.map((svc) => svc.service_code)),
    [allActiveServices],
  );
  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const tutorMap = useMemo(() => new Map(tutors.map((t) => [t.id, t])), [tutors]);
  const studentMap = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const entryMap = useMemo(() => new Map(entries.map((entry) => [entry.id, entry])), [entries]);
  const parentMap = useMemo(() => new Map(parents.map((p) => [p.id, p])), [parents]);
  const selectedAttendees = useMemo(
    () => form.attendee_student_ids.map((id) => studentMap.get(id)).filter(Boolean) as Student[],
    [form.attendee_student_ids, studentMap],
  );
  const attendeeSuggestions = useMemo(() => {
    const query = attendeeQuery.trim().toLowerCase();
    return students.filter((student) => {
      if (form.attendee_student_ids.includes(student.id)) return false;
      if (!query) return true;
      const studentName = studentLabel(student).toLowerCase();
      const parentName = parentLabel(student.parent ?? (student.parent_id ? parentMap.get(student.parent_id) : null)).toLowerCase();
      return studentName.includes(query) || parentName.includes(query);
    });
  }, [students, form.attendee_student_ids, attendeeQuery, parentMap]);

  const selectedService = useMemo(
    () => serviceMap.get(form.service_offered_id) ?? null,
    [serviceMap, form.service_offered_id],
  );
  const serviceCapacity = useMemo(() => Number(selectedService?.capacity ?? 1), [selectedService]);
  const serviceUnitLength = useMemo(
    () => Number(selectedService?.unit_length_minutes ?? 60),
    [selectedService],
  );
  const serviceUnitPriceCents = useMemo(() => Number(selectedService?.hourly_rate_cents ?? 0), [selectedService]);
  const attendeeCount = form.attendee_student_ids.length;
  const sessionUnits =
    serviceUnitLength > 0 ? Math.max(0, Number(form.duration_minutes || 0)) / serviceUnitLength : 0;
  const sessionRevenueCents = Math.round(serviceUnitPriceCents * sessionUnits * attendeeCount);

  useEffect(() => {
    if (!selectedService) return;
    if (editingEntryId) return;
    const unitLength = Number(selectedService.unit_length_minutes ?? 60);
    if (!Number.isFinite(unitLength) || unitLength < 1) return;
    setForm((prev) => ({ ...prev, duration_minutes: unitLength }));
  }, [selectedService?.id, editingEntryId]);

  useEffect(() => {
    if (form.product_id) {
      const nextKey = productOptionKey(form.product_id);
      if (nextKey && nextKey !== selectedServiceKey) {
        setSelectedServiceKey(nextKey);
      }
      return;
    }
    if (!form.service_offered_id) return;
    const svc = serviceMap.get(form.service_offered_id);
    if (!svc) return;
    const key = serviceKey(svc);
    if (key && key !== selectedServiceKey) {
      setSelectedServiceKey(key);
    }
  }, [form.product_id, form.service_offered_id, productMap, serviceMap, selectedServiceKey]);

  const selectedServiceFilterKey = useMemo(() => {
    if (!selectedServiceKey) return "";
    if (isProductOption(selectedServiceKey)) {
      const productId = productIdFromOption(selectedServiceKey);
      const product = productMap.get(productId);
      if (!product?.service_code) return "";
      return serviceKeyByCode.get(product.service_code) ?? "";
    }
    return selectedServiceKey;
  }, [selectedServiceKey, productMap, serviceKeyByCode]);

  const locationDetailMode = useMemo<null | LocationDetailMode>(() => {
    const selected = selectedLocationId ? locationMap.get(selectedLocationId) : null;
    if (locationChoice === "online") return "online";
    if (locationChoice === "student_home") return "student_home";
    if (locationChoice === "other") return "other";
    if (selected?.is_virtual) return "online";
    if (selected?.is_system) return "other";
    return null;
  }, [locationChoice, selectedLocationId, locationMap]);

  const servicesForSelectedLocation = useMemo(
    () => (selectedLocationId ? activeServicesByLocation[selectedLocationId] ?? [] : []),
    [selectedLocationId, activeServicesByLocation],
  );

  const serviceOptions = useMemo(() => {
    const source = selectedLocationId ? servicesForSelectedLocation : allActiveServices;
    const seen = new Set<string>();
    const options: Array<{ key: string; label: string }> = [];
    source.forEach((svc) => {
      const key = serviceKey(svc);
      if (!key) return;
      if (seen.has(key)) return;
      seen.add(key);
      options.push({ key, label: serviceLabel(svc) });
    });

    const productOptions = products.filter((product) => {
      if (!product.service_code) return false;
      if (!activeServiceCodes.has(product.service_code)) return false;
      if (!selectedLocationId) return true;
      return servicesForSelectedLocation.some((svc) => svc.service_code === product.service_code);
    });
    productOptions.forEach((product) => {
      options.push({
        key: productOptionKey(product.id),
        label: `Product: ${product.product_name}`,
      });
    });

    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  }, [selectedLocationId, servicesForSelectedLocation, allActiveServices, products, activeServiceCodes]);

  const locationsForSelectedService = useMemo(() => {
    if (!selectedServiceFilterKey) return null;
    const allowed = new Set<string>();
    Object.entries(activeServicesByLocation).forEach(([locId, list]) => {
      if (list.some((svc) => serviceKey(svc) === selectedServiceFilterKey)) {
        allowed.add(locId);
      }
    });
    return allowed;
  }, [selectedServiceFilterKey, activeServicesByLocation]);

  const baseLocationOptions = useMemo(
    () => [
      { value: "", label: "Select a location" },
      ...setupLocations.map((loc) => ({ value: `setup:${loc.id}`, label: loc.location_name })),
      { value: "online", label: "Online / Web meeting" },
      { value: "student_home", label: "Student's home" },
      { value: "other", label: "Other location" },
    ],
    [setupLocations],
  );

  const calendarLocationOptions = useMemo(
    () => [{ value: "all", label: "All locations" }, ...baseLocationOptions.filter((option) => option.value)],
    [baseLocationOptions],
  );

  const locationChoiceOptions = useMemo(() => {
    if (!locationsForSelectedService) return baseLocationOptions;
    return baseLocationOptions.filter((option) => {
      if (!option.value) return true;
      const locId = resolveLocationChoice(option.value);
      return locId ? locationsForSelectedService.has(locId) : true;
    });
  }, [baseLocationOptions, locationsForSelectedService, systemVirtualLocation, systemOffsiteLocation, primarySetupLocationId]);

  useEffect(() => {
    if (!locationChoice) return;
    if (locationChoiceOptions.some((option) => option.value === locationChoice)) return;
    handleLocationChoiceChange("");
  }, [locationChoice, locationChoiceOptions]);

  useEffect(() => {
    if (!locationChoice) return;
    if (calendarLocationChoice === "all") return;
    if (calendarLocationChoice === locationChoice) return;
    setCalendarLocationChoice(locationChoice);
  }, [locationChoice, calendarLocationChoice]);

  useEffect(() => {
    if (!selectedServiceKey) return;
    if (isProductOption(selectedServiceKey)) {
      const productId = productIdFromOption(selectedServiceKey);
      if (!productMap.has(productId)) return;
    }
    if (serviceOptions.some((option) => option.key === selectedServiceKey)) return;
    setSelectedServiceKey("");
    setForm((prev) => ({ ...prev, service_offered_id: "", product_id: "" }));
  }, [selectedServiceKey, serviceOptions, productMap]);

  const dataLocationId = useMemo(() => {
    if (!selectedLocationId) return primarySetupLocationId;
    const selected = locationMap.get(selectedLocationId);
    if (selected?.is_system) return primarySetupLocationId || selectedLocationId;
    return selectedLocationId;
  }, [selectedLocationId, primarySetupLocationId, locationMap]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      if (cancelled) return;
      setToken(session.access_token);
      try {
        const [locationRes, subjectsRes, orgRes, productsRes] = await Promise.all([
          fetch("/locations?archived=all", { headers: { Authorization: `Bearer ${session.access_token}` } }),
          fetch("/subjects", { headers: { Authorization: `Bearer ${session.access_token}` } }),
          fetch("/organizations", { headers: { Authorization: `Bearer ${session.access_token}` } }),
          fetch("/products", { headers: { Authorization: `Bearer ${session.access_token}` } }),
        ]);
        const locationData = locationRes.ok ? ((await locationRes.json()) as Location[]) : [];
        const subjectData = subjectsRes.ok ? ((await subjectsRes.json()) as Subject[]) : [];
        const orgData =
          orgRes.ok ? ((await orgRes.json()) as Array<{ id: string; date_format?: string | null }>) : [];
        const productData = productsRes.ok ? ((await productsRes.json()) as Product[]) : [];
        if (!cancelled) {
          setLocations(locationData);
          setSubjects(subjectData);
          setProducts(Array.isArray(productData) ? productData : []);
          setOrgId(orgData[0]?.id ?? null);
          setDateFormat(normalizeDateFormat(orgData[0]?.date_format));
          const defaultLocation =
            locationData.find((l) => !l.archived_at && !l.is_system) ??
            locationData.find((l) => !l.archived_at) ??
            locationData[0];
          if (defaultLocation) {
            setSelectedLocationId(defaultLocation.id);
            setForm((prev) => ({ ...prev, location_id: defaultLocation.id }));
            if (defaultLocation.is_system) {
              setLocationChoice(defaultLocation.is_virtual ? "online" : "other");
            } else {
              setLocationChoice(`setup:${defaultLocation.id}`);
            }
          }

          void (async () => {
            const nextServices: Record<string, ServiceOffered[]> = {};
            await Promise.all(
              locationData.map(async (loc) => {
                const res = await fetch(`/services-offered?location_id=${encodeURIComponent(loc.id)}`, {
                  headers: { Authorization: `Bearer ${session.access_token}` },
                });
                if (res.ok) {
                  nextServices[loc.id] = (await res.json()) as ServiceOffered[];
                }
              }),
            );
            if (!cancelled) setServicesByLocation(nextServices);
          })();
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    if (!token) return;
    async function loadConflicts() {
      const res = await fetch("/schedule-conflicts?resolved=false", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const rows = (await res.json()) as ScheduleConflict[];
      setActiveConflicts(rows);
    }
    loadConflicts();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const resolvedParam =
      conflictView === "active" ? "false" : conflictView === "resolved" ? "true" : "all";
    async function loadConflictRows() {
      const res = await fetch(`/schedule-conflicts?resolved=${resolvedParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const rows = (await res.json()) as ScheduleConflict[];
      setConflictRows(rows);
    }
    loadConflictRows();
  }, [token, conflictView]);

  useEffect(() => {
    if (!token || !selectedLocationId) return;
    let cancelled = false;
    async function loadLocationData() {
      try {
        const lookupLocationId = dataLocationId || selectedLocationId;
        const entryPromise = (async () => {
          if (calendarLocationChoice === "all") {
            const activeLocationIds = locations.filter((loc) => !loc.archived_at).map((loc) => loc.id);
            if (!activeLocationIds.length) return [];
            const results = await Promise.all(
              activeLocationIds.map(async (locId) => {
                const res = await fetch(`/schedule-entries?location_id=${locId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                return res.ok ? ((await res.json()) as ScheduleEntry[]) : [];
              }),
            );
            const merged = results.flat();
            merged.sort(
              (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
            );
            return merged;
          }
          const res = await fetch(`/schedule-entries?location_id=${selectedLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.ok ? ((await res.json()) as ScheduleEntry[]) : [];
        })();

        const tutorUrl =
          calendarLocationChoice === "all"
            ? "/tutors"
            : `/tutors?location_id=${lookupLocationId}`;

        const [entryData, serviceRes, tutorRes, roomRes, studentRes] = await Promise.all([
          entryPromise,
          fetch(`/services-offered?location_id=${encodeURIComponent(selectedLocationId)}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(tutorUrl, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`/rooms?location_id=${lookupLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/students`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const serviceData = serviceRes.ok ? ((await serviceRes.json()) as ServiceOffered[]) : [];
        const tutorData = tutorRes.ok ? ((await tutorRes.json()) as Tutor[]) : [];
        const roomData = roomRes.ok ? ((await roomRes.json()) as Room[]) : [];
        const studentData = studentRes.ok ? ((await studentRes.json()) as Student[]) : [];

        if (cancelled) return;
        setEntries(entryData);
        setSelectedEntryId((prev) => {
          if (prev && entryData.some((entry) => entry.id === prev)) return prev;
          const now = Date.now();
          const nextUpcoming = entryData.find((entry) => {
            const start = new Date(entry.start_at).getTime();
            return Number.isFinite(start) && start >= now;
          });
          return nextUpcoming?.id ?? entryData[0]?.id ?? null;
        });
        setServicesByLocation((prev) => ({ ...prev, [selectedLocationId]: serviceData }));
        setTutors(tutorData);
        setRooms(roomData);
        setStudents(studentData);
        setSelectedTutorId((prev) =>
          prev === "all" || tutorData.find((t) => t.id === prev) ? prev : "all",
        );

        setForm((prev) => {
          const next: ScheduleFormState = { ...prev, location_id: selectedLocationId };
          const hasService = serviceData.some((s) => s.id === next.service_offered_id);
          if (!hasService) {
            next.service_offered_id = "";
            next.product_id = "";
          }
          if (!tutorData.find((t) => t.id === next.tutor_id)) {
            next.tutor_id = tutorData[0]?.id ?? "";
          }
          if (roomData.every((r) => !next.room_ids.includes(r.id))) {
            next.room_ids = [];
          }
          if (studentData.every((s) => !next.attendee_student_ids.includes(s.id))) {
            next.attendee_student_ids = [];
          }
          return next;
        });
      } catch (err) {
        console.error(err);
      }
    }
    loadLocationData();
    return () => {
      cancelled = true;
    };
  }, [token, selectedLocationId, dataLocationId, calendarLocationChoice, locations]);

  useEffect(() => {
    if (!selectedLocationId || !selectedServiceKey) return;
    if (form.service_offered_id) return;
    const list = activeServicesByLocation[selectedLocationId] ?? [];
    let match: ServiceOffered | undefined;
    if (isProductOption(selectedServiceKey)) {
      const productId = productIdFromOption(selectedServiceKey);
      const product = productMap.get(productId);
      if (product?.service_code) {
        match = list.find((svc) => svc.service_code === product.service_code);
      }
    } else {
      match = list.find((svc) => serviceKey(svc) === selectedServiceKey);
    }
    if (match) {
      setForm((prev) => ({ ...prev, service_offered_id: match.id }));
    }
  }, [selectedLocationId, selectedServiceKey, activeServicesByLocation, form.service_offered_id, productMap]);

  useEffect(() => {
    if (!token) return;
    if (!form.subject_id) {
      setTopics([]);
      setForm((prev) => ({ ...prev, topic_id: "" }));
      return;
    }
    let cancelled = false;
    async function loadTopics() {
      const res = await fetch(`/topics?subject_id=${form.subject_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const rows = (await res.json()) as Topic[];
      if (!cancelled) {
        setTopics(rows);
        setForm((prev) => {
          if (rows.find((t) => t.id === prev.topic_id)) return prev;
          return { ...prev, topic_id: rows[0]?.id ?? "" };
        });
      }
    }
    loadTopics();
    return () => {
      cancelled = true;
    };
  }, [token, form.subject_id]);

  useEffect(() => {
    if (!token || !orgId) return;
    let cancelled = false;
    async function loadParents() {
      const res = await fetch(`/parents?organization_id=${orgId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const rows = (await res.json()) as Parent[];
      if (!cancelled) {
        setParents(rows);
      }
    }
    loadParents();
    return () => {
      cancelled = true;
    };
  }, [token, orgId]);

  useEffect(() => {
    if (locationDetailMode !== "student_home") return;
    if (form.location_detail.trim()) return;
    if (!form.attendee_student_ids.length) return;
    const firstStudent = form.attendee_student_ids
      .map((id) => studentMap.get(id))
      .find((student) => Boolean(student));
    if (!firstStudent) return;
    const parent = firstStudent.parent ?? (firstStudent.parent_id ? parentMap.get(firstStudent.parent_id) : null);
    const address = formatParentAddress(parent);
    if (!address) return;
    setForm((prev) => ({ ...prev, location_detail: address }));
  }, [locationDetailMode, form.attendee_student_ids, form.location_detail, studentMap, parentMap]);

  useEffect(() => {
    if (form.recurrence_type !== "WEEKLY") return;
    if (!form.start_at_local) return;
    if (form.recurrence_days_of_week.length) return;
    const startIso = parseDateTimeLocal(form.start_at_local);
    if (!startIso) return;
    const day = new Date(startIso).getUTCDay();
    setForm((prev) => ({ ...prev, recurrence_days_of_week: [day] }));
  }, [form.recurrence_type, form.start_at_local, form.recurrence_days_of_week.length]);

  const conflictTagMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    activeConflicts.forEach((conflict) => {
      if (conflict.resolved_at) return;
      const tags = normalizeConflictTags(conflict.conflict_tags);
      const pushTags = (id: string) => {
        if (!id) return;
        const existing = map.get(id) ?? new Set<string>();
        tags.forEach((t) => existing.add(t));
        map.set(id, existing);
      };
      pushTags(conflict.schedule_entry_id);
      pushTags(conflict.conflicting_schedule_entry_id);
    });
    return map;
  }, [activeConflicts]);

  const calendarEvents = useMemo(() => {
    const events: EventInput[] = [];
    entries.forEach((entry) => {
      if (selectedTutorId !== "all" && entry.tutor_id !== selectedTutorId) return;
      const tags = conflictTagMap.get(entry.id);
      if (showConflictsOnly && (!tags || tags.size === 0)) return;
      const service = serviceMap.get(entry.service_offered_id);
      const product = entry.product_id ? productMap.get(entry.product_id) : null;
      const tutor = tutorMap.get(entry.tutor_id);
      const title = `${product?.product_name ?? serviceLabel(service)} - ${tutorLabel(tutor)}`;
      const tutorColor = normalizeHexColor(tutor?.color_hex) || "#7c3aed";
      const textColor = getContrastText(tutorColor);
      const hasConflict = Boolean(tags && tags.size > 0);
      events.push({
        id: entry.id,
        title,
        start: entry.start_at,
        end: entry.end_at,
        classNames: hasConflict ? ["itutoros-fc-conflict"] : [],
        backgroundColor: tutorColor,
        borderColor: tutorColor,
        textColor,
        extendedProps: {
          entry,
          conflictTags: tags ? Array.from(tags) : [],
        },
      });
      if (entry.include_buffer && entry.blocked_end_at && entry.end_at) {
        const endAt = new Date(entry.end_at);
        const blockedAt = new Date(entry.blocked_end_at);
        if (!Number.isNaN(endAt.getTime()) && !Number.isNaN(blockedAt.getTime()) && blockedAt > endAt) {
          events.push({
            id: `${entry.id}-buffer`,
            title: "",
            start: entry.end_at,
            end: entry.blocked_end_at,
            display: "background",
            backgroundColor: tutorColor,
            classNames: ["itutoros-fc-buffer"],
            extendedProps: {
              entry,
              isBuffer: true,
            },
          });
        }
      }
    });
    return events;
  }, [entries, selectedTutorId, showConflictsOnly, conflictTagMap, serviceMap, tutorMap, productMap]);

  const dedupedConflictRows = useMemo(() => {
    const map = new Map<string, ScheduleConflict>();
    conflictRows.forEach((row) => {
      const key = conflictPairKey(row);
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...row, conflict_tags: normalizeConflictTags(row.conflict_tags) });
        return;
      }
      const mergedTags = new Set([
        ...normalizeConflictTags(existing.conflict_tags),
        ...normalizeConflictTags(row.conflict_tags),
      ]);
      const existingCreated = existing.created_at ? new Date(existing.created_at).getTime() : Infinity;
      const nextCreated = row.created_at ? new Date(row.created_at).getTime() : Infinity;
      map.set(key, {
        ...existing,
        conflict_tags: Array.from(mergedTags),
        created_at: nextCreated < existingCreated ? row.created_at : existing.created_at,
        resolved_at: existing.resolved_at && row.resolved_at ? existing.resolved_at : null,
        scheduleEntry: existing.scheduleEntry ?? row.scheduleEntry,
        conflictingScheduleEntry: existing.conflictingScheduleEntry ?? row.conflictingScheduleEntry,
        message: existing.message || row.message,
      });
    });
    return Array.from(map.values());
  }, [conflictRows]);

  const visibleConflictRows = useMemo(() => {
    return dedupedConflictRows.filter((row) => {
      const schedule = row.scheduleEntry;
      const conflict = row.conflictingScheduleEntry;
      if (!schedule || !conflict) return false;
      return !schedule.archived_at && !conflict.archived_at;
    });
  }, [dedupedConflictRows]);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedEntryId) ?? null,
    [entries, selectedEntryId],
  );

  const editingEntry = useMemo(
    () => entries.find((entry) => entry.id === editingEntryId) ?? null,
    [entries, editingEntryId],
  );

  const entryServiceLine = (entry?: ScheduleEntry | null) => {
    if (!entry) return "--";
    return entry.product_id
      ? productMap.get(entry.product_id)?.product_name ?? serviceLabel(serviceMap.get(entry.service_offered_id))
      : serviceLabel(serviceMap.get(entry.service_offered_id));
  };

  const entryLineOne = (entry?: ScheduleEntry | null) => {
    if (!entry) return "--";
    const resolved = entryMap.get(entry.id) ?? entry;
    const attendees = resolved.attendees ?? entry.attendees ?? [];
    const attendeeCount = attendees.length;
    const serviceCapacity = serviceMap.get(entry.service_offered_id)?.capacity ?? entry.capacity ?? null;
    const isPrivate = attendeeCount === 1 || (attendeeCount === 0 && serviceCapacity === 1);
    if (isPrivate) {
      const studentId = attendees[0]?.student_id;
      return studentId ? studentLabel(studentMap.get(studentId)) : "Student";
    }
    const subjectName = entry.subject_id ? subjectMap.get(entry.subject_id)?.subject_name : null;
    const topicName = entry.topic_id ? topicMap.get(entry.topic_id)?.topic_name : null;
    if (subjectName && topicName) return `${subjectName} / ${topicName}`;
    return subjectName || topicName || "Group session";
  };

  const entrySummaryLines = (entry?: ScheduleEntry | null) => ({
    line1: entryLineOne(entry),
    line2: entryServiceLine(entry),
    line3: entry ? formatDateTime(entry.start_at) : "--",
  });

  const selectedLocation = selectedLocationId ? locationMap.get(selectedLocationId) : null;
  const locationDetailRequired = Boolean(locationDetailMode);
  const showRooms = Boolean(locationChoice.startsWith("setup:") && selectedLocation && !selectedLocation.is_system);

  function resetFormState(overrides: Partial<ScheduleFormState> = {}) {
    setForm({ ...DEFAULT_SCHEDULE_FORM, ...overrides });
  }

  function clearNewEntryForm() {
    setPendingConflict(null);
    setEditingEntryId(null);
    setSelectedServiceKey("");
    setLocationChoice("");
    setAttendeeQuery("");
    setAttendeeOpen(false);
    resetFormState();
  }

  function buildEventDetails(entry: ScheduleEntry) {
    const service = serviceMap.get(entry.service_offered_id);
    const product = entry.product_id ? productMap.get(entry.product_id) : null;
    const tutor = tutorMap.get(entry.tutor_id);
    const location = locationMap.get(entry.location_id);
    const attendees =
      entry.attendees?.length
        ? entry.attendees.map((att) => studentLabel(studentMap.get(att.student_id))).join(", ")
        : "No attendees";
    return [
      `Service: ${product?.product_name ?? serviceLabel(service)}`,
      `Tutor: ${tutorLabel(tutor)}`,
      `Start: ${formatDateTime(entry.start_at)}`,
      `End: ${formatDateTime(entry.end_at)}`,
      `Location: ${location?.location_name ?? "Location"}`,
      entry.location_detail ? `Detail: ${entry.location_detail}` : null,
      `Attendees: ${attendees}`,
    ].filter(Boolean) as string[];
  }

  function startEditEntry(entryId: string) {
    const entry = entries.find((item) => item.id === entryId);
    if (!entry) return;
    setEditingEntryId(entryId);
    setSelectedEntryId(entryId);
    setActiveTab("NEW");
    const location = locationMap.get(entry.location_id);
    if (location) {
      if (location.is_system) {
        setLocationChoice(location.is_virtual ? "online" : "other");
      } else {
        setLocationChoice(`setup:${entry.location_id}`);
      }
      setSelectedLocationId(entry.location_id);
    }
    const svc = serviceMap.get(entry.service_offered_id);
    const nextKey = entry.product_id ? productOptionKey(entry.product_id) : svc ? serviceKey(svc) : "";
    setSelectedServiceKey(nextKey);
    resetFormState({
      location_id: entry.location_id,
      location_detail: entry.location_detail ?? "",
      service_offered_id: entry.service_offered_id,
      product_id: entry.product_id ?? "",
      tutor_id: entry.tutor_id,
      subject_id: entry.subject_id ?? "",
      topic_id: entry.topic_id ?? "",
      attendee_student_ids: entry.attendees?.map((att) => att.student_id) ?? [],
      room_ids: entry.rooms?.map((room) => room.room_id) ?? [],
      resources_text: entry.resources_text ?? "",
      start_at_local: entry.start_at ? toDateTimeLocal(new Date(entry.start_at)) : "",
      duration_minutes: Number(entry.duration_minutes ?? 60),
      include_buffer: Boolean(entry.include_buffer),
      recurrence_type: (entry.recurrence_type as ScheduleFormState["recurrence_type"]) ?? "AD_HOC",
      recurrence_interval: Number(entry.recurrence_interval ?? 1),
      recurrence_days_of_week: parseRecurrenceDays(entry.recurrence_days_of_week),
      schedule_end_mode: entry.series_end_date ? "date" : "count",
      occurrence_count: Number(entry.occurrence_count ?? 12),
      series_end_date_local: entry.series_end_date ? toDateTimeLocal(new Date(entry.series_end_date)) : "",
    });
  }

  async function refreshLocationData() {
    if (!token || !selectedLocationId) return;
    if (calendarLocationChoice === "all") {
      const activeLocationIds = locations.filter((loc) => !loc.archived_at).map((loc) => loc.id);
      const results = await Promise.all(
        activeLocationIds.map(async (locId) => {
          const res = await fetch(`/schedule-entries?location_id=${locId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.ok ? ((await res.json()) as ScheduleEntry[]) : [];
        }),
      );
      const merged = results.flat();
      merged.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
      setEntries(merged);
    } else {
      const res = await fetch(`/schedule-entries?location_id=${selectedLocationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEntries((await res.json()) as ScheduleEntry[]);
      }
    }
    const conflictRes = await fetch("/schedule-conflicts?resolved=false", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (conflictRes.ok) {
      setActiveConflicts((await conflictRes.json()) as ScheduleConflict[]);
    }
    await refreshConflictRows();
  }

  async function refreshConflictRows() {
    if (!token) return;
    const resolvedParam =
      conflictView === "active" ? "false" : conflictView === "resolved" ? "true" : "all";
    const res = await fetch(`/schedule-conflicts?resolved=${resolvedParam}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setConflictRows((await res.json()) as ScheduleConflict[]);
    }
  }

  async function handleResolveConflict(id: string, resolved: boolean) {
    if (!token) return;
    const res = await fetch(`/schedule-conflicts/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ resolved }),
    });
    if (!res.ok) {
      const text = await res.text();
      toast({ title: "Unable to update conflict", description: text });
      return;
    }
    await refreshConflictRows();
    const activeRes = await fetch("/schedule-conflicts?resolved=false", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (activeRes.ok) {
      setActiveConflicts((await activeRes.json()) as ScheduleConflict[]);
    }
  }

  function resolveLocationChoice(choice: string) {
    if (!choice) return "";
    if (choice.startsWith("setup:")) return choice.replace("setup:", "");
    if (choice === "online") return systemVirtualLocation?.id ?? primarySetupLocationId ?? "";
    if (choice === "student_home" || choice === "other") return systemOffsiteLocation?.id ?? primarySetupLocationId ?? "";
    return primarySetupLocationId ?? "";
  }

  function handleCalendarLocationChange(choice: string) {
    setCalendarLocationChoice(choice);
    if (choice === "all") return;
    handleLocationChoiceChange(choice);
  }

  function handleLocationChoiceChange(choice: string) {
    const nextLocationId = resolveLocationChoice(choice);
    setLocationChoice(choice);
    if (!nextLocationId) {
      setSelectedLocationId("");
      setForm((prev) => ({
        ...prev,
        location_id: "",
        service_offered_id: "",
        product_id: "",
        room_ids: [],
        location_detail: "",
      }));
      return;
    }
    const servicesForLocation = activeServicesByLocation[nextLocationId] ?? [];
    let matchedService: ServiceOffered | null = null;
    let nextProductId = "";
    if (selectedServiceKey) {
      if (isProductOption(selectedServiceKey)) {
        const productId = productIdFromOption(selectedServiceKey);
        const product = productMap.get(productId);
        if (product?.service_code) {
          matchedService =
            servicesForLocation.find((svc) => svc.service_code === product.service_code) ?? null;
          if (matchedService) nextProductId = productId;
        }
      } else {
        matchedService =
          servicesForLocation.find((svc) => serviceKey(svc) === selectedServiceKey) ?? null;
      }
    }
    setSelectedLocationId(nextLocationId);
    setForm((prev) => ({
      ...prev,
      location_id: nextLocationId,
      service_offered_id: matchedService?.id ?? "",
      product_id: nextProductId,
      room_ids: choice.startsWith("setup:") ? prev.room_ids : [],
      location_detail: choice.startsWith("setup:") ? "" : "",
    }));
    if (selectedServiceKey && servicesForLocation && !matchedService) {
      setSelectedServiceKey("");
    }
  }

  function handleServiceChoiceChange(nextKey: string) {
    setSelectedServiceKey(nextKey);
    if (!nextKey) {
      setForm((prev) => ({ ...prev, service_offered_id: "", product_id: "" }));
      return;
    }
    const nextProductId = isProductOption(nextKey) ? productIdFromOption(nextKey) : "";
    if (!selectedLocationId) {
      setForm((prev) => ({ ...prev, service_offered_id: "", product_id: nextProductId }));
      return;
    }
    const servicesForLocation = activeServicesByLocation[selectedLocationId] ?? [];
    let match: ServiceOffered | undefined;
    if (nextProductId) {
      const product = productMap.get(nextProductId);
      if (product?.service_code) {
        match = servicesForLocation.find((svc) => svc.service_code === product.service_code);
      }
    } else {
      match = servicesForLocation.find((svc) => serviceKey(svc) === nextKey);
    }
    if (!match) {
      setLocationChoice("");
      setSelectedLocationId("");
      setForm((prev) => ({
        ...prev,
        location_id: "",
        service_offered_id: "",
        product_id: nextProductId,
        room_ids: [],
        location_detail: "",
      }));
      return;
    }
    setForm((prev) => ({ ...prev, service_offered_id: match.id, product_id: nextProductId }));
  }

  function addAttendee(studentId: string) {
    setForm((prev) => {
      if (prev.attendee_student_ids.includes(studentId)) return prev;
      return { ...prev, attendee_student_ids: [...prev.attendee_student_ids, studentId] };
    });
  }

  function removeAttendee(studentId: string) {
    setForm((prev) => ({
      ...prev,
      attendee_student_ids: prev.attendee_student_ids.filter((id) => id !== studentId),
    }));
  }

  async function submitSchedule(overrideConflicts = false) {
    if (!token) return;
    const isEditing = Boolean(editingEntryId);
    if (!form.location_id) {
      toast({ title: "Location is required" });
      return;
    }
    if (!form.service_offered_id) {
      toast({ title: "Service type is required" });
      return;
    }
    if (!form.tutor_id) {
      toast({ title: "Tutor is required" });
      return;
    }
    if (!form.start_at_local) {
      toast({ title: "Start date/time is required" });
      return;
    }
    if (locationDetailRequired && !form.location_detail.trim()) {
      toast({ title: "Please add the virtual/offsite address." });
      return;
    }
    if (form.recurrence_type === "WEEKLY" && form.recurrence_days_of_week.length === 0) {
      toast({ title: "Pick at least one day of the week." });
      return;
    }
    if (form.recurrence_type !== "AD_HOC" && form.schedule_end_mode === "count" && form.occurrence_count < 1) {
      toast({ title: "Occurrence count must be at least 1." });
      return;
    }
    if (form.recurrence_type !== "AD_HOC" && form.schedule_end_mode === "date" && !form.series_end_date_local) {
      toast({ title: "Please choose a series end date." });
      return;
    }

    const startIso = parseDateTimeLocal(form.start_at_local);
    if (!startIso) {
      toast({ title: "Start date/time is invalid." });
      return;
    }

    setSaving(true);
    try {
      if (isEditing && editingEntryId) {
        const updatePayload: Record<string, any> = {
          start_at: startIso,
          duration_minutes: Number(form.duration_minutes || 60),
          include_buffer: Boolean(form.include_buffer),
          location_detail: form.location_detail.trim() || null,
          service_offered_id: form.service_offered_id,
          product_id: form.product_id || null,
          subject_id: form.subject_id || null,
          topic_id: form.topic_id || null,
          attendee_student_ids: form.attendee_student_ids,
          room_ids: form.room_ids,
          resources_text: form.resources_text.trim() || null,
          allow_conflicts: overrideConflicts,
        };
        const res = await fetch(`/schedule-entries/${editingEntryId}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(updatePayload),
        });
        if (res.status === 409) {
          const body = (await res.json()) as ConflictPayload;
          setPendingConflict(body);
          toast({ title: "Conflict detected", description: formatConflictMessage(body.message) });
          return;
        }
        if (!res.ok) {
          const text = await res.text();
          toast({ title: "Unable to update schedule entry", description: text });
          return;
        }
        setPendingConflict(null);
        toast({ title: "Schedule entry updated" });
        clearNewEntryForm();
        await refreshLocationData();
        setActiveTab("CALENDAR");
      } else {
        const payload: Record<string, any> = {
          location_id: form.location_id,
          location_detail: form.location_detail.trim() || null,
          service_offered_id: form.service_offered_id,
          product_id: form.product_id || null,
          tutor_id: form.tutor_id,
          subject_id: form.subject_id || null,
          topic_id: form.topic_id || null,
          attendee_student_ids: form.attendee_student_ids,
          room_ids: form.room_ids,
          resources_text: form.resources_text.trim() || null,
          start_at: startIso,
          duration_minutes: Number(form.duration_minutes || 60),
          include_buffer: Boolean(form.include_buffer),
          recurrence_type: form.recurrence_type,
          allow_conflicts: overrideConflicts,
        };

        if (form.recurrence_type !== "AD_HOC") {
          payload.recurrence_interval = Number(form.recurrence_interval || 1);
          payload.recurrence_days_of_week = form.recurrence_type === "WEEKLY" ? form.recurrence_days_of_week : undefined;
          if (form.schedule_end_mode === "count") {
            payload.occurrence_count = Number(form.occurrence_count || 1);
          } else {
            payload.series_end_date = parseDateTimeLocal(form.series_end_date_local);
          }
        }

        const res = await fetch("/schedule-entries", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.status === 409) {
          const body = (await res.json()) as ConflictPayload;
          setPendingConflict(body);
          toast({ title: "Conflict detected", description: formatConflictMessage(body.message) });
          return;
        }
        if (!res.ok) {
          const text = await res.text();
          toast({ title: "Unable to save schedule entry", description: text });
          return;
        }
        setPendingConflict(null);
        toast({ title: "Schedule entry saved" });
        clearNewEntryForm();
        await refreshLocationData();
        setActiveTab("CALENDAR");
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Unable to save schedule entry" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteScheduleEntry() {
    if (!editingEntryId || !token) return;
    setDeleteBusy(true);
    try {
      const res = await fetch(`/schedule-entries/${editingEntryId}/archive?scope=${deleteScope}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const text = await res.text();
        toast({ title: "Unable to delete schedule entry", description: text, variant: "destructive" });
        return;
      }
      toast({
        title: deleteScope === "ALL" ? "Schedule series deleted" : "Schedule entry deleted",
      });
      setDeletePromptOpen(false);
      setDeleteStep("choose");
      clearNewEntryForm();
      await refreshLocationData();
      setActiveTab("CALENDAR");
    } catch (err) {
      console.error(err);
      toast({ title: "Unable to delete schedule entry", variant: "destructive" });
    } finally {
      setDeleteBusy(false);
    }
  }

  function openNewEntryAt(date: Date) {
    clearNewEntryForm();
    setActiveTab("NEW");
    const startLocal = toDateTimeLocal(date);
    setForm((prev) => ({
      ...prev,
      start_at_local: startLocal,
      recurrence_type: "AD_HOC",
    }));
  }

  function handleDateClick(info: DateClickArg) {
    const now = Date.now();
    const dateStr = info.dateStr;
    const last = lastDateClickRef.current;
    if (last && now - last.ts < 400 && last.dateStr === dateStr) {
      lastDateClickRef.current = null;
      openNewEntryAt(info.date);
      return;
    }
    lastDateClickRef.current = { ts: now, dateStr };
  }

  function handleEventClick(info: EventClickArg) {
    const id = info.event.id;
    setSelectedEntryId(id);
    setActiveTab("CALENDAR");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">Loading schedule...</main>
      </div>
    );
  }

  const activeTabLabel =
    activeTab === "NEW"
      ? editingEntryId
        ? "Edit Schedule Entry"
        : "New Schedule Entry"
      : SCHEDULE_TABS.find((tab) => tab.key === activeTab)?.label ?? "Schedule";

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[700px] flex-col gap-6 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 bg-white lg:w-[280px]">
            <div className="h-full border-b border-gray-200 shadow-[8px_0_18px_rgba(0,0,0,0.06)] lg:border-b-0 lg:border-r">
              <div className="p-4 text-sm font-semibold text-gray-600">Schedule</div>
              <nav className="grid gap-1 p-2">
                {SCHEDULE_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      if (tab.key === "NEW") {
                        clearNewEntryForm();
                        setActiveTab("NEW");
                        return;
                      }
                      setActiveTab(tab.key);
                    }}
                    style={{ "--tab-icon-color": SCHEDULE_TAB_ICON_COLORS[tab.key] } as CSSProperties}
                    className={[
                      "group w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      activeTab === tab.key ? "bg-gray-100 font-semibold" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={tab.icon}
                        size={16}
                        className={[
                          "transition-colors",
                          activeTab === tab.key
                            ? "text-[var(--tab-icon-color)]"
                            : "text-gray-500 group-hover:text-[var(--tab-icon-color)]",
                        ].join(" ")}
                      />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <section className="min-w-0 flex-1 bg-white">
            <div className="flex flex-col gap-2 border-b border-gray-200 px-4 py-4 sm:px-6">
              <h1 className="m-0 text-xl font-bold">{activeTabLabel}</h1>
              <p className="text-sm text-gray-600">
                Build recurring tutoring schedules, track conflicts, and keep sessions aligned across locations.
              </p>
            </div>

            <div className="px-4 py-6 sm:px-6">
              {activeTab === "CALENDAR" ? (
                <div className="grid gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="grid gap-1">
                        <Label htmlFor="calendar-location">Location</Label>
                        <select
                          id="calendar-location"
                          className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={calendarLocationChoice || locationChoice}
                          onChange={(e) => handleCalendarLocationChange(e.target.value)}
                        >
                          {calendarLocationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="calendar-tutor">Tutor filter</Label>
                        <select
                          id="calendar-tutor"
                          className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={selectedTutorId}
                          onChange={(e) => setSelectedTutorId(e.target.value)}
                        >
                          <option value="all">All tutors</option>
                          {tutors.map((tutor) => (
                            <option
                              key={tutor.id}
                              value={tutor.id}
                              style={{ color: normalizeHexColor(tutor.color_hex) || "#7c3aed" }}
                            >
                              {tutorOptionLabel(tutor)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={showConflictsOnly}
                          onChange={(e) => setShowConflictsOnly(e.target.checked)}
                        />
                        Show conflicts only
                      </label>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                      onClick={() => {
                        clearNewEntryForm();
                        setActiveTab("NEW");
                      }}
                      >
                        New schedule entry
                      </button>
                    </div>
                  </div>

                  <div className="itutoros-calendar rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <FullCalendar
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                      initialView="timeGridWeek"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,print",
                      }}
                      customButtons={{
                        print: {
                          text: "print",
                          click: () => window.print(),
                        },
                      }}
                      height={720}
                      dateClick={handleDateClick}
                      eventClick={handleEventClick}
                      eventDidMount={(info) => {
                        const entry = info.event.extendedProps.entry as ScheduleEntry | undefined;
                        if (!entry) return;
                        const isBuffer = Boolean(info.event.extendedProps?.isBuffer);
                        const tutor = tutorMap.get(entry.tutor_id);
                        const tutorColor = normalizeHexColor(tutor?.color_hex) || "#7c3aed";
                        const tooltipBg = lightenHexColor(tutorColor, 0.78);

                        const el = info.el as HTMLElement;
                        let tooltipEl: HTMLDivElement | null = null;
                        let lastPoint: { x: number; y: number } | null = null;
                        let repositionHandler: (() => void) | null = null;

                        const buildTooltipHtml = () => {
                          if (isBuffer) {
                            const endAt = entry.end_at ? new Date(entry.end_at) : null;
                            const blockedAt = entry.blocked_end_at ? new Date(entry.blocked_end_at) : null;
                            const minutes =
                              endAt && blockedAt ? Math.max(0, Math.round((blockedAt.getTime() - endAt.getTime()) / 60000)) : 0;
                            return `<div>Buffer time: ${minutes} minutes</div>`;
                          }
                          return buildEventDetails(entry)
                            .map((line) => `<div>${line}</div>`)
                            .join("");
                        };

                        const positionTooltip = (point?: { x: number; y: number }) => {
                          if (!tooltipEl) return;
                          const scrollX = window.scrollX || document.documentElement.scrollLeft || 0;
                          const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
                          const rect = el.getBoundingClientRect();
                          const tipRect = tooltipEl.getBoundingClientRect();
                          const margin = 8;
                          const anchorX = point ? point.x : rect.left + rect.width / 2;
                          const anchorY = point ? point.y : rect.top;
                          let top = anchorY - tipRect.height - margin;
                          if (top < margin) {
                            top = anchorY + margin;
                          }
                          let left = anchorX - tipRect.width / 2;
                          left = Math.max(margin, Math.min(left, window.innerWidth - tipRect.width - margin));
                          tooltipEl.style.top = `${Math.round(top + scrollY)}px`;
                          tooltipEl.style.left = `${Math.round(left + scrollX)}px`;
                        };

                        const showTooltip = () => {
                          if (tooltipEl) return;
                          tooltipEl = document.createElement("div");
                          tooltipEl.className = "itutoros-fc-tooltip";
                          tooltipEl.style.backgroundColor = tooltipBg;
                          tooltipEl.style.borderColor = tutorColor;
                          tooltipEl.style.color = "#111827";
                          tooltipEl.innerHTML = buildTooltipHtml();
                          document.body.appendChild(tooltipEl);
                          const doPosition = () => positionTooltip(lastPoint ?? undefined);
                          requestAnimationFrame(doPosition);
                          requestAnimationFrame(doPosition);
                          repositionHandler = () => positionTooltip(lastPoint ?? undefined);
                          window.addEventListener("scroll", repositionHandler, true);
                          window.addEventListener("resize", repositionHandler);
                        };

                        const hideTooltip = () => {
                          if (!tooltipEl) return;
                          tooltipEl.remove();
                          tooltipEl = null;
                          if (repositionHandler) {
                            window.removeEventListener("scroll", repositionHandler, true);
                            window.removeEventListener("resize", repositionHandler);
                            repositionHandler = null;
                          }
                        };

                        const handleEnter = (event: MouseEvent) => {
                          lastPoint = { x: event.clientX, y: event.clientY };
                          showTooltip();
                        };
                        const handleLeave = () => {
                          hideTooltip();
                        };

                        const renderCapacityFlag = () => {
                          const existingFlag = el.querySelector(".itutoros-fc-capacity-flag");
                          if (existingFlag) existingFlag.remove();
                          if (isBuffer) return;
                          const attendees = entry.attendees ?? [];
                          const attendeeCount = attendees.length;
                          const serviceCapacity =
                            serviceMap.get(entry.service_offered_id)?.capacity ?? entry.capacity ?? null;
                          if (!serviceCapacity || attendeeCount <= serviceCapacity) return;

                          el.style.position = "relative";
                          const flag = document.createElement("span");
                          flag.className = "itutoros-fc-capacity-flag";
                          flag.setAttribute("aria-label", "Over capacity");
                          flag.title = "Over capacity";
                          flag.style.position = "absolute";
                          flag.style.top = "2px";
                          flag.style.right = "2px";
                          flag.style.height = "18px";
                          flag.style.width = "18px";
                          flag.style.borderRadius = "9999px";
                          flag.style.display = "flex";
                          flag.style.alignItems = "center";
                          flag.style.justifyContent = "center";
                          flag.style.background = "rgba(255,255,255,0.9)";
                          flag.style.border = "1px solid rgba(219, 39, 119, 0.6)";
                          flag.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.2)";
                          flag.style.pointerEvents = "none";
                          flag.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z" stroke="rgba(219, 39, 119, 0.95)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                              <path d="M12 17V12.5" stroke="rgba(219, 39, 119, 0.95)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                              <path d="M12 8.99828V8.98828" stroke="rgba(219, 39, 119, 0.95)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
                            </svg>
                          `;
                          el.appendChild(flag);
                        };

                        el.addEventListener("mouseenter", handleEnter);
                        el.addEventListener("mouseleave", handleLeave);

                        if (!isBuffer) {
                          el.ondblclick = (event) => {
                            event.preventDefault();
                            startEditEntry(entry.id);
                          };
                        }

                        renderCapacityFlag();

                        (el as any).__itutorosCleanup = () => {
                          hideTooltip();
                          el.removeEventListener("mouseenter", handleEnter);
                          el.removeEventListener("mouseleave", handleLeave);
                          const existingFlag = el.querySelector(".itutoros-fc-capacity-flag");
                          if (existingFlag) existingFlag.remove();
                        };
                      }}
                      eventWillUnmount={(info) => {
                        const cleanup = (info.el as any).__itutorosCleanup;
                        if (typeof cleanup === "function") cleanup();
                      }}
                      events={calendarEvents}
                      eventMinHeight={2}
                      nowIndicator
                    />
                  </div>

                  {selectedEntry ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-[#0b1f5f]">Entry details</h2>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="itutoros-settings-btn itutoros-settings-btn-primary"
                            onClick={() => startEditEntry(selectedEntry.id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="itutoros-settings-btn itutoros-settings-btn-secondary"
                            onClick={() => setSelectedEntryId(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-xs uppercase text-gray-500">Service</div>
                          <div className="text-sm font-semibold">
                            {selectedEntry.product_id
                              ? productMap.get(selectedEntry.product_id)?.product_name ??
                                serviceLabel(serviceMap.get(selectedEntry.service_offered_id))
                              : serviceLabel(serviceMap.get(selectedEntry.service_offered_id))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-500">Tutor</div>
                          <div className="text-sm font-semibold">{tutorLabel(tutorMap.get(selectedEntry.tutor_id))}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-500">Start</div>
                          <div className="text-sm font-semibold">{formatDateTime(selectedEntry.start_at)}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-500">End</div>
                          <div className="text-sm font-semibold">{formatDateTime(selectedEntry.end_at)}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-500">Location</div>
                          <div className="text-sm font-semibold">
                            {locationMap.get(selectedEntry.location_id)?.location_name ?? "Location"}
                          </div>
                          {selectedEntry.location_detail ? (
                            <div className="text-sm text-gray-600">{selectedEntry.location_detail}</div>
                          ) : null}
                        </div>
                        <div>
                          <div className="text-xs uppercase text-gray-500">Capacity</div>
                          <div className="text-sm font-semibold">{selectedEntry.capacity}</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs uppercase text-gray-500">Attendees</div>
                          <div className="text-sm text-gray-700">
                            {selectedEntry.attendees?.length
                              ? selectedEntry.attendees
                                  .map((att) => studentLabel(studentMap.get(att.student_id)))
                                  .join(", ")
                              : "No attendees"}
                          </div>
                        </div>
                        {selectedEntry.resources_text ? (
                          <div className="md:col-span-2">
                            <div className="text-xs uppercase text-gray-500">Resources</div>
                            <div className="text-sm text-gray-700">{selectedEntry.resources_text}</div>
                          </div>
                        ) : null}
                        {conflictTagMap.get(selectedEntry.id)?.size ? (
                          <div className="md:col-span-2">
                            <div className="text-xs uppercase text-gray-500">Conflicts</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {Array.from(conflictTagMap.get(selectedEntry.id) ?? []).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {activeTab === "NEW" ? (
                <div className="grid gap-6">
                  {editingEntry ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-red-800">Delete schedule entry</div>
                            <div className="text-xs text-red-700">
                              {entryServiceLine(editingEntry)} - {formatDateTime(editingEntry.start_at)}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="itutoros-settings-btn itutoros-settings-btn-danger"
                            onClick={() => {
                              setDeleteScope("THIS");
                              setDeleteStep("choose");
                              setDeletePromptOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-indigo-800">Editing schedule entry</div>
                            <div className="text-xs text-indigo-700">
                              {entryServiceLine(editingEntry)} - {formatDateTime(editingEntry.start_at)}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="itutoros-settings-btn itutoros-settings-btn-secondary"
                            onClick={() => {
                              clearNewEntryForm();
                              setActiveTab("CALENDAR");
                            }}
                          >
                            Cancel edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">Session basics</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="service-offered">Service type</Label>
                        <select
                          id="service-offered"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={selectedServiceKey}
                          onChange={(e) => handleServiceChoiceChange(e.target.value)}
                          disabled={serviceOptions.length === 0}
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((service) => (
                            <option key={service.key} value={service.key}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-location">Location</Label>
                        <select
                          id="new-location"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={locationChoice}
                          onChange={(e) => handleLocationChoiceChange(e.target.value)}
                          disabled={Boolean(editingEntryId)}
                        >
                          {locationChoiceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {locationDetailMode ? (
                        <div className="grid gap-2">
                          <Label htmlFor="location-detail">{locationDetailLabel(locationDetailMode)}</Label>
                          <Input
                            id="location-detail"
                            value={form.location_detail}
                            onChange={(e) => setForm((prev) => ({ ...prev, location_detail: e.target.value }))}
                            placeholder={locationDetailLabel(locationDetailMode)}
                          />
                        </div>
                      ) : null}
                      <div className="grid gap-2">
                        <Label htmlFor="tutor-select">Tutor</Label>
                        <select
                          id="tutor-select"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={form.tutor_id}
                          onChange={(e) => setForm((prev) => ({ ...prev, tutor_id: e.target.value }))}
                          disabled={Boolean(editingEntryId)}
                        >
                          <option value="">Select a tutor</option>
                          {tutors.map((tutor) => (
                            <option
                              key={tutor.id}
                              value={tutor.id}
                              style={{ color: normalizeHexColor(tutor.color_hex) || "#7c3aed" }}
                            >
                              {tutorOptionLabel(tutor)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="subject-select">Subject</Label>
                        <select
                          id="subject-select"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={form.subject_id}
                          onChange={(e) => setForm((prev) => ({ ...prev, subject_id: e.target.value }))}
                        >
                          <option value="">--</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.subject_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="topic-select">Topic</Label>
                        <select
                          id="topic-select"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={form.topic_id}
                          onChange={(e) => setForm((prev) => ({ ...prev, topic_id: e.target.value }))}
                          disabled={!form.subject_id}
                        >
                          <option value="">--</option>
                          {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                              {topic.topic_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="start-at">Start date and time</Label>
                        <Input
                          id="start-at"
                          type="datetime-local"
                          value={form.start_at_local}
                          onChange={(e) => setForm((prev) => ({ ...prev, start_at_local: e.target.value }))}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min={1}
                          step={1}
                          inputMode="numeric"
                          value={form.duration_minutes || ""}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const next = raw === "" ? 0 : Number(raw);
                            setForm((prev) => ({ ...prev, duration_minutes: Number.isNaN(next) ? 0 : next }));
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={form.include_buffer}
                          onChange={(e) => setForm((prev) => ({ ...prev, include_buffer: e.target.checked }))}
                        />
                        Include buffer time
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">Recurrence</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="recurrence-type">Schedule pattern</Label>
                        <select
                          id="recurrence-type"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={form.recurrence_type}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              recurrence_type: e.target.value as ScheduleFormState["recurrence_type"],
                            }))
                          }
                          disabled={Boolean(editingEntryId)}
                        >
                          {RECURRENCE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {form.recurrence_type !== "AD_HOC" ? (
                        <div className="grid gap-2">
                          <Label htmlFor="recurrence-interval">Every</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="recurrence-interval"
                              type="number"
                              min={1}
                              value={form.recurrence_interval}
                              onChange={(e) =>
                                setForm((prev) => ({ ...prev, recurrence_interval: Number(e.target.value || 1) }))
                              }
                              disabled={Boolean(editingEntryId)}
                            />
                            <span className="text-sm text-gray-600">
                              {form.recurrence_type === "DAILY" ? "day(s)" : "week(s)"}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      {form.recurrence_type === "WEEKLY" ? (
                        <div className="md:col-span-2">
                          <div className="text-sm font-semibold text-gray-700">Days of week</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {DAY_OPTIONS.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                className={[
                                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                                  form.recurrence_days_of_week.includes(day.value)
                                    ? "border-[#0b1f5f] bg-[#0b1f5f] text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400",
                                ].join(" ")}
                                onClick={() =>
                                  setForm((prev) => {
                                    const has = prev.recurrence_days_of_week.includes(day.value);
                                    const next = has
                                      ? prev.recurrence_days_of_week.filter((d) => d !== day.value)
                                      : [...prev.recurrence_days_of_week, day.value];
                                    return { ...prev, recurrence_days_of_week: next.sort((a, b) => a - b) };
                                  })
                                }
                                disabled={Boolean(editingEntryId)}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {form.recurrence_type !== "AD_HOC" ? (
                        <div className="md:col-span-2">
                          <div className="text-sm font-semibold text-gray-700">Schedule length</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <button
                              type="button"
                              className={[
                                "rounded-full border px-3 py-1 text-xs font-semibold transition",
                                form.schedule_end_mode === "count"
                                  ? "border-[#0b1f5f] bg-[#0b1f5f] text-white"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400",
                              ].join(" ")}
                              onClick={() => setForm((prev) => ({ ...prev, schedule_end_mode: "count" }))}
                              disabled={Boolean(editingEntryId)}
                            >
                              End after # occurrences
                            </button>
                            <button
                              type="button"
                              className={[
                                "rounded-full border px-3 py-1 text-xs font-semibold transition",
                                form.schedule_end_mode === "date"
                                  ? "border-[#0b1f5f] bg-[#0b1f5f] text-white"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400",
                              ].join(" ")}
                              onClick={() => setForm((prev) => ({ ...prev, schedule_end_mode: "date" }))}
                              disabled={Boolean(editingEntryId)}
                            >
                              End on date
                            </button>
                          </div>
                          {form.schedule_end_mode === "count" ? (
                            <div className="mt-3 max-w-[220px]">
                              <Input
                                type="number"
                                min={1}
                                value={form.occurrence_count}
                                onChange={(e) =>
                                  setForm((prev) => ({ ...prev, occurrence_count: Number(e.target.value || 1) }))
                                }
                                disabled={Boolean(editingEntryId)}
                              />
                            </div>
                          ) : (
                            <div className="mt-3 max-w-[240px]">
                              <Input
                                type="datetime-local"
                                value={form.series_end_date_local}
                                onChange={(e) => setForm((prev) => ({ ...prev, series_end_date_local: e.target.value }))}
                                disabled={Boolean(editingEntryId)}
                              />
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">Attendees and rooms</h2>
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Attendees</div>
                        <div className="mt-2 rounded-xl border border-gray-200 p-3">
                          <div className="flex flex-wrap gap-2">
                            {selectedAttendees.length === 0 ? (
                              <div className="text-sm text-gray-500">No students selected yet.</div>
                            ) : (
                              selectedAttendees.map((student) => (
                                <span
                                  key={student.id}
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm"
                                >
                                  {studentLabel(student)}
                                  <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-800"
                                    onClick={() => removeAttendee(student.id)}
                                    aria-label={`Remove ${studentLabel(student)}`}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))
                            )}
                          </div>
                          <div className="relative mt-3">
                            <Input
                              placeholder="Search students to add..."
                              value={attendeeQuery}
                              onChange={(e) => {
                                setAttendeeQuery(e.target.value);
                                setAttendeeOpen(true);
                              }}
                              onFocus={() => setAttendeeOpen(true)}
                              onBlur={() => {
                                window.setTimeout(() => setAttendeeOpen(false), 150);
                              }}
                              onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                e.preventDefault();
                                const next = attendeeSuggestions[0];
                                if (next) {
                                  addAttendee(next.id);
                                  setAttendeeQuery("");
                                  setAttendeeOpen(false);
                                }
                              }}
                            />
                            {attendeeOpen ? (
                              <div className="absolute z-20 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                                {attendeeSuggestions.length === 0 ? (
                                  <div className="p-3 text-sm text-gray-500">No matches found.</div>
                                ) : (
                                  attendeeSuggestions.map((student) => {
                                    const parentName = parentLabel(
                                      student.parent ?? (student.parent_id ? parentMap.get(student.parent_id) : null),
                                    );
                                    return (
                                      <button
                                        key={student.id}
                                        type="button"
                                        className="flex w-full flex-col gap-1 px-3 py-2 text-left text-sm hover:bg-gray-50"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                          addAttendee(student.id);
                                          setAttendeeQuery("");
                                          setAttendeeOpen(false);
                                        }}
                                      >
                                        <span className="font-medium text-gray-800">{studentLabel(student)}</span>
                                        {parentName ? (
                                          <span className="text-xs text-gray-500">Parent: {parentName}</span>
                                        ) : null}
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                            ) : null}
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Start typing a name and press Enter to add a student.
                          </div>
                        </div>
                        {form.service_offered_id && form.attendee_student_ids.length > serviceCapacity ? (
                          <div className="mt-2 text-xs font-semibold text-red-600">
                            Attendees exceed capacity. You can still save, but it will be flagged.
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-gray-700">Room assignments</div>
                        <div className="mt-2 max-h-[220px] overflow-y-auto rounded-xl border border-gray-200 p-2">
                          {!showRooms ? (
                            <div className="p-2 text-sm text-gray-500">Virtual/offsite sessions do not use rooms.</div>
                          ) : rooms.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500">No rooms available for this location.</div>
                          ) : (
                            rooms.map((room) => (
                              <label key={room.id} className="flex items-center gap-2 px-2 py-1 text-sm">
                                <input
                                  type="checkbox"
                                  checked={form.room_ids.includes(room.id)}
                                  onChange={(e) =>
                                    setForm((prev) => {
                                      const has = prev.room_ids.includes(room.id);
                                      const next = e.target.checked
                                        ? [...prev.room_ids, room.id]
                                        : prev.room_ids.filter((id) => id !== room.id);
                                      return { ...prev, room_ids: next };
                                    })
                                  }
                                  disabled={!showRooms}
                                />
                                {room.room_name}
                              </label>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">Resources</h2>
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor="resources">Links, materials, or notes</Label>
                      <textarea
                        id="resources"
                        className="min-h-[120px] rounded-xl border border-gray-200 bg-zinc-50 px-3 py-2 text-sm"
                        value={form.resources_text}
                        onChange={(e) => setForm((prev) => ({ ...prev, resources_text: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">Session revenue</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-700">Unit Price x Duration x Attendees =</span>
                      <Input
                        id="session-revenue"
                        readOnly
                        value={formatCurrencyFromCents(sessionRevenueCents)}
                        className="w-40 bg-zinc-50 text-gray-700"
                      />
                    </div>
                  </div>

                  {pendingConflict ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <div className="text-sm font-semibold text-red-700">Conflict detected</div>
                      <div className="mt-1 text-sm text-red-700">
                        {formatConflictMessage(pendingConflict.message)}
                      </div>
                      {pendingConflict.conflict_tags?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {pendingConflict.conflict_tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-red-200 bg-white px-2 py-1 text-xs font-semibold text-red-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-primary"
                          onClick={() => submitSchedule(true)}
                        >
                          Save anyway
                        </button>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => setPendingConflict(null)}
                        >
                          Review schedule
                        </button>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => {
                            clearNewEntryForm();
                            setActiveTab("CALENDAR");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => {
                          clearNewEntryForm();
                          setActiveTab("CALENDAR");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                        disabled={saving}
                        onClick={() => submitSchedule(false)}
                      >
                        {saving ? "Saving..." : "Save schedule entry"}
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {activeTab === "CONFLICTS" ? (
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setConflictView("active")}
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          conflictView === "active" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        Active conflicts
                      </button>
                      <button
                        type="button"
                        onClick={() => setConflictView("resolved")}
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          conflictView === "resolved"
                            ? "bg-[#e0fde5] text-gray-900"
                            : "text-gray-600 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        Resolved
                      </button>
                      <button
                        type="button"
                        onClick={() => setConflictView("all")}
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          conflictView === "all" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        All conflicts
                      </button>
                    </div>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={refreshConflictRows}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <div className="max-h-[520px] overflow-y-auto">
                      <table className="min-w-[900px] border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left">Created</th>
                            <th className="px-3 py-2 text-left">Conflict</th>
                            <th className="px-3 py-2 text-left">Schedule Entry</th>
                            <th className="px-3 py-2 text-left">Conflicts With</th>
                            <th className="px-3 py-2 text-left">Status</th>
                            <th className="px-3 py-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleConflictRows.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-3 py-8 text-center text-sm text-gray-500">
                                No conflicts found.
                              </td>
                            </tr>
                          ) : (
                            visibleConflictRows.map((row) => {
                              const schedule = row.scheduleEntry;
                              const conflict = row.conflictingScheduleEntry;
                              const tags = normalizeConflictTags(row.conflict_tags);
                              const scheduleLines = entrySummaryLines(schedule);
                              const conflictLines = entrySummaryLines(conflict);
                              return (
                                <tr key={row.id} className="border-t border-gray-100">
                                  <td className="px-3 py-2 whitespace-nowrap">{formatDateTime(row.created_at)}</td>
                                  <td className="px-3 py-2">
                                    <div className="flex flex-wrap gap-1">
                                      {tags.length ? (
                                        tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="rounded-full border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"
                                          >
                                            {tag}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-xs text-gray-500">Conflict</span>
                                      )}
                                    </div>
                                    {row.message ? (
                                      <div className="mt-1 text-xs text-gray-600">
                                        {formatConflictMessage(row.message)}
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="px-3 py-2">
                                    <div className="flex flex-col gap-0.5 text-sm leading-snug">
                                      <div className="font-semibold text-gray-900">{scheduleLines.line1}</div>
                                      <div className="text-gray-700">{scheduleLines.line2}</div>
                                      <div className="text-xs text-gray-500">{scheduleLines.line3}</div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-2">
                                    <div className="flex flex-col gap-0.5 text-sm leading-snug">
                                      <div className="font-semibold text-gray-900">{conflictLines.line1}</div>
                                      <div className="text-gray-700">{conflictLines.line2}</div>
                                      <div className="text-xs text-gray-500">{conflictLines.line3}</div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-2">
                                    {row.resolved_at ? (
                                      <span className="text-xs font-semibold text-green-600">Resolved</span>
                                    ) : (
                                      <span className="text-xs font-semibold text-red-600">Active</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2">
                                    <button
                                      type="button"
                                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                      onClick={() => handleResolveConflict(row.id, !row.resolved_at)}
                                    >
                                      {row.resolved_at ? "Reopen" : "Resolve"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {deletePromptOpen && editingEntry ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-xl">
                  <div className="text-lg font-semibold text-gray-900">Delete schedule entry</div>
                  {deleteStep === "choose" ? (
                    <>
                      <div className="mt-2 text-sm text-gray-600">
                        Choose whether to delete just this instance or the entire series.
                      </div>
                      <div className="mt-4 grid gap-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3">
                          <input
                            type="radio"
                            name="delete-scope"
                            checked={deleteScope === "THIS"}
                            onChange={() => setDeleteScope("THIS")}
                          />
                          <div>
                            <div className="font-semibold text-gray-900">Delete this instance</div>
                            <div className="text-xs text-gray-500">{formatDateTime(editingEntry.start_at)}</div>
                          </div>
                        </label>
                        {editingEntry.series_id ? (
                          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3">
                            <input
                              type="radio"
                              name="delete-scope"
                              checked={deleteScope === "ALL"}
                              onChange={() => setDeleteScope("ALL")}
                            />
                            <div>
                              <div className="font-semibold text-gray-900">Delete entire series</div>
                              <div className="text-xs text-gray-500">Removes every occurrence in this series.</div>
                            </div>
                          </label>
                        ) : null}
                      </div>
                      <div className="mt-5 flex justify-end gap-2">
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => {
                            setDeletePromptOpen(false);
                            setDeleteStep("choose");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-danger"
                          onClick={() => setDeleteStep("confirm")}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {deleteScope === "ALL"
                          ? "This will permanently delete the entire series."
                          : `This will permanently delete the ${formatDateTime(editingEntry.start_at)} entry.`}
                      </div>
                      <div className="mt-5 flex justify-end gap-2">
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => setDeleteStep("choose")}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-danger"
                          disabled={deleteBusy}
                          onClick={handleDeleteScheduleEntry}
                        >
                          {deleteBusy ? "Deleting..." : "Confirm delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
