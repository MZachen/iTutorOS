"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClampedCell } from "@/components/ui/clamped-cell";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, Calendar01Icon, CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import { toast } from "@/lib/use-toast";

type ScheduleTab = "CALENDAR" | "NEW" | "CONFLICTS";

const SCHEDULE_TABS: { key: ScheduleTab; label: string; icon: any }[] = [
  { key: "CALENDAR", label: "Calendar", icon: Calendar01Icon },
  { key: "NEW", label: "New Schedule Entry", icon: CalendarAdd01Icon },
  { key: "CONFLICTS", label: "Conflicts", icon: Alert01Icon },
];

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

const DURATION_OPTIONS = [30, 45, 60, 75, 90, 120, 150, 180];

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
};

type ServiceOffered = {
  id: string;
  service_code: string;
  display_name?: string | null;
  hourly_rate_cents?: number | null;
  capacity?: number | null;
  is_active?: boolean | null;
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

function formatDate(value: any) {
  if (!value) return "";
  if (typeof value === "string") {
    const match = value.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
    if (match) {
      return `${match[3]}/${match[2]}/${match[1]}`;
    }
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(value: any) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDateTime(value: any) {
  if (!value) return "";
  return `${formatDate(value)} ${formatTime(value)}`;
}

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

export default function SchedulePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ScheduleTab>("CALENDAR");

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [services, setServices] = useState<ServiceOffered[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [parents, setParents] = useState<Parent[]>([]);
  const [locationChoice, setLocationChoice] = useState<string>("");

  const [activeConflicts, setActiveConflicts] = useState<ScheduleConflict[]>([]);
  const [conflictRows, setConflictRows] = useState<ScheduleConflict[]>([]);
  const [conflictView, setConflictView] = useState<"active" | "resolved" | "all">("active");

  const [selectedTutorId, setSelectedTutorId] = useState<string>("all");
  const [showConflictsOnly, setShowConflictsOnly] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [pendingConflict, setPendingConflict] = useState<ConflictPayload | null>(null);
  const [saving, setSaving] = useState(false);

  const [newStudent, setNewStudent] = useState({
    parent_id: "",
    location_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [savingStudent, setSavingStudent] = useState(false);

  const [form, setForm] = useState<ScheduleFormState>({
    location_id: "",
    location_detail: "",
    service_offered_id: "",
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
  });

  const locationMap = useMemo(() => new Map(locations.map((l) => [l.id, l])), [locations]);
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

  const serviceMap = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);
  const tutorMap = useMemo(() => new Map(tutors.map((t) => [t.id, t])), [tutors]);
  const studentMap = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const parentMap = useMemo(() => new Map(parents.map((p) => [p.id, p])), [parents]);

  const selectedService = useMemo(
    () => serviceMap.get(form.service_offered_id) ?? null,
    [serviceMap, form.service_offered_id],
  );
  const serviceCapacity = useMemo(() => Number(selectedService?.capacity ?? 1), [selectedService]);

  const locationDetailMode = useMemo<null | LocationDetailMode>(() => {
    const selected = selectedLocationId ? locationMap.get(selectedLocationId) : null;
    if (locationChoice === "online") return "online";
    if (locationChoice === "student_home") return "student_home";
    if (locationChoice === "other") return "other";
    if (selected?.is_virtual) return "online";
    if (selected?.is_system) return "other";
    return null;
  }, [locationChoice, selectedLocationId, locationMap]);

  const locationChoiceOptions = useMemo(
    () => [
      ...setupLocations.map((loc) => ({ value: `setup:${loc.id}`, label: loc.location_name })),
      { value: "online", label: "Online / Web meeting" },
      { value: "student_home", label: "Student's home" },
      { value: "other", label: "Other location" },
    ],
    [setupLocations],
  );

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
        const [locationRes, subjectsRes, orgRes] = await Promise.all([
          fetch("/locations?archived=all", { headers: { Authorization: `Bearer ${session.access_token}` } }),
          fetch("/subjects", { headers: { Authorization: `Bearer ${session.access_token}` } }),
          fetch("/organizations", { headers: { Authorization: `Bearer ${session.access_token}` } }),
        ]);
        const locationData = locationRes.ok ? ((await locationRes.json()) as Location[]) : [];
        const subjectData = subjectsRes.ok ? ((await subjectsRes.json()) as Subject[]) : [];
        const orgData = orgRes.ok ? ((await orgRes.json()) as Array<{ id: string }>) : [];
        if (!cancelled) {
          setLocations(locationData);
          setSubjects(subjectData);
          setOrgId(orgData[0]?.id ?? null);
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
        const [entryRes, serviceRes, tutorRes, roomRes, studentRes] = await Promise.all([
          fetch(`/schedule-entries?location_id=${selectedLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/services-offered?location_id=${lookupLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/tutors?location_id=${lookupLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/rooms?location_id=${lookupLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/students?location_id=${lookupLocationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const entryData = entryRes.ok ? ((await entryRes.json()) as ScheduleEntry[]) : [];
        const serviceData = serviceRes.ok ? ((await serviceRes.json()) as ServiceOffered[]) : [];
        const tutorData = tutorRes.ok ? ((await tutorRes.json()) as Tutor[]) : [];
        const roomData = roomRes.ok ? ((await roomRes.json()) as Room[]) : [];
        const studentData = studentRes.ok ? ((await studentRes.json()) as Student[]) : [];

        if (cancelled) return;
        setEntries(entryData);
        setServices(serviceData);
        setTutors(tutorData);
        setRooms(roomData);
        setStudents(studentData);
        setSelectedTutorId((prev) =>
          prev === "all" || tutorData.find((t) => t.id === prev) ? prev : "all",
        );

        setForm((prev) => {
          const next: ScheduleFormState = { ...prev, location_id: selectedLocationId };
          if (!serviceData.find((s) => s.id === next.service_offered_id)) {
            next.service_offered_id = serviceData[0]?.id ?? "";
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
  }, [token, selectedLocationId, dataLocationId]);

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
      const tutor = tutorMap.get(entry.tutor_id);
      const title = `${serviceLabel(service)} - ${tutorLabel(tutor)}`;
      events.push({
        id: entry.id,
        title,
        start: entry.start_at,
        end: entry.end_at,
        classNames: tags && tags.size > 0 ? ["itutoros-fc-conflict"] : [],
        extendedProps: {
          entry,
          conflictTags: tags ? Array.from(tags) : [],
        },
      });
    });
    return events;
  }, [entries, selectedTutorId, showConflictsOnly, conflictTagMap, serviceMap, tutorMap]);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedEntryId) ?? null,
    [entries, selectedEntryId],
  );

  const selectedLocation = selectedLocationId ? locationMap.get(selectedLocationId) : null;
  const locationDetailRequired = Boolean(locationDetailMode);
  const showRooms = Boolean(locationChoice.startsWith("setup:") && selectedLocation && !selectedLocation.is_system);

  async function refreshLocationData() {
    if (!token || !selectedLocationId) return;
    const res = await fetch(`/schedule-entries?location_id=${selectedLocationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setEntries((await res.json()) as ScheduleEntry[]);
    }
    const conflictRes = await fetch("/schedule-conflicts?resolved=false", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (conflictRes.ok) {
      setActiveConflicts((await conflictRes.json()) as ScheduleConflict[]);
    }
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
    if (choice.startsWith("setup:")) return choice.replace("setup:", "");
    if (choice === "online") return systemVirtualLocation?.id ?? primarySetupLocationId ?? "";
    if (choice === "student_home" || choice === "other") return systemOffsiteLocation?.id ?? primarySetupLocationId ?? "";
    return primarySetupLocationId ?? "";
  }

  function handleLocationChoiceChange(choice: string) {
    const nextLocationId = resolveLocationChoice(choice);
    setLocationChoice(choice);
    if (nextLocationId) {
      setSelectedLocationId(nextLocationId);
      setForm((prev) => ({
        ...prev,
        location_id: nextLocationId,
        room_ids: choice.startsWith("setup:") ? prev.room_ids : [],
        location_detail: choice.startsWith("setup:") ? "" : "",
      }));
    }
  }

  async function handleAddStudent(addAnother: boolean) {
    if (!token) return;
    if (!newStudent.parent_id) {
      toast({ title: "Parent is required" });
      return;
    }
    if (!newStudent.first_name.trim() || !newStudent.last_name.trim()) {
      toast({ title: "Student first and last name are required" });
      return;
    }

    const studentLocationId = dataLocationId || selectedLocationId;

    if (!studentLocationId) {
      toast({ title: "Select a location before adding students." });
      return;
    }

    setSavingStudent(true);
    try {
      const res = await fetch("/students", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({
          parent_id: newStudent.parent_id,
          location_id: studentLocationId,
          first_name: newStudent.first_name.trim(),
          last_name: newStudent.last_name.trim(),
          email: newStudent.email.trim() || null,
          phone: newStudent.phone.trim() || null,
          dob: newStudent.dob || null,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        toast({ title: "Student create failed", description: text });
        return;
      }
      const created = (await res.json()) as Student;
      setStudents((prev) => [created, ...prev]);
      setForm((prev) => ({
        ...prev,
        attendee_student_ids: prev.attendee_student_ids.includes(created.id)
          ? prev.attendee_student_ids
          : [...prev.attendee_student_ids, created.id],
      }));
      setNewStudent((prev) => ({
        ...prev,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        parent_id: addAnother ? prev.parent_id : prev.parent_id,
      }));
      toast({ title: "Student added" });
    } finally {
      setSavingStudent(false);
    }
  }

  async function submitSchedule(overrideConflicts = false) {
    if (!token) return;
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

    const payload: Record<string, any> = {
      location_id: form.location_id,
      location_detail: form.location_detail.trim() || null,
      service_offered_id: form.service_offered_id,
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

    setSaving(true);
    try {
      const res = await fetch("/schedule-entries", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        const body = (await res.json()) as ConflictPayload;
        setPendingConflict(body);
        toast({ title: "Conflict detected", description: body.message || "This schedule overlaps another entry." });
        return;
      }
      if (!res.ok) {
        const text = await res.text();
        toast({ title: "Unable to save schedule entry", description: text });
        return;
      }
      setPendingConflict(null);
      toast({ title: "Schedule entry saved" });
      await refreshLocationData();
      setActiveTab("CALENDAR");
    } catch (err) {
      console.error(err);
      toast({ title: "Unable to save schedule entry" });
    } finally {
      setSaving(false);
    }
  }

  function handleSelectSlot(info: DateSelectArg) {
    setActiveTab("NEW");
    const startLocal = toDateTimeLocal(info.start);
    const durationMinutes = Math.max(15, Math.round((info.end.getTime() - info.start.getTime()) / 60000));
    setForm((prev) => ({
      ...prev,
      start_at_local: startLocal,
      duration_minutes: durationMinutes,
      recurrence_type: "AD_HOC",
    }));
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

  const activeTabLabel = SCHEDULE_TABS.find((tab) => tab.key === activeTab)?.label ?? "Schedule";

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
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      activeTab === tab.key ? "bg-gray-100 font-semibold" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={tab.icon}
                        size={16}
                        className={activeTab === tab.key ? "text-[#0b1f5f]" : "text-gray-500"}
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
                          value={locationChoice}
                          onChange={(e) => handleLocationChoiceChange(e.target.value)}
                        >
                          {locationChoiceOptions.map((option) => (
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
                            <option key={tutor.id} value={tutor.id}>
                              {tutorLabel(tutor)}
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
                        onClick={() => setActiveTab("NEW")}
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
                          text: "Print",
                          click: () => window.print(),
                        },
                      }}
                      height={720}
                      selectable
                      selectMirror
                      eventClick={handleEventClick}
                      select={handleSelectSlot}
                      events={calendarEvents}
                      nowIndicator
                    />
                  </div>

                  {selectedEntry ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-[#0b1f5f]">Entry details</h2>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => setSelectedEntryId(null)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-xs uppercase text-gray-500">Service</div>
                          <div className="text-sm font-semibold">
                            {serviceLabel(serviceMap.get(selectedEntry.service_offered_id))}
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
                  {pendingConflict ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <div className="text-sm font-semibold text-red-700">Conflict detected</div>
                      <div className="mt-1 text-sm text-red-700">
                        {pendingConflict.message || "This schedule overlaps another entry."}
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
                          value={form.service_offered_id}
                          onChange={(e) => setForm((prev) => ({ ...prev, service_offered_id: e.target.value }))}
                          disabled={services.length === 0}
                        >
                          {services.length === 0 ? (
                            <option value="">No services available</option>
                          ) : (
                            services.map((service) => (
                              <option key={service.id} value={service.id}>
                                {serviceLabel(service)}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-location">Location</Label>
                        <select
                          id="new-location"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={locationChoice}
                          onChange={(e) => handleLocationChoiceChange(e.target.value)}
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
                        >
                          {tutors.map((tutor) => (
                            <option key={tutor.id} value={tutor.id}>
                              {tutorLabel(tutor)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
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
                      <div className="grid gap-2">
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
                        <Label htmlFor="duration">Duration</Label>
                        <select
                          id="duration"
                          className="h-10 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={form.duration_minutes}
                          onChange={(e) => setForm((prev) => ({ ...prev, duration_minutes: Number(e.target.value) }))}
                        >
                          {DURATION_OPTIONS.map((mins) => (
                            <option key={mins} value={mins}>
                              {mins} minutes
                            </option>
                          ))}
                        </select>
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
                              />
                            </div>
                          ) : (
                            <div className="mt-3 max-w-[240px]">
                              <Input
                                type="datetime-local"
                                value={form.series_end_date_local}
                                onChange={(e) => setForm((prev) => ({ ...prev, series_end_date_local: e.target.value }))}
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
                        <div className="mt-2 max-h-[220px] overflow-y-auto rounded-xl border border-gray-200 p-2">
                          {students.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500">No students yet.</div>
                          ) : (
                            students.map((student) => (
                              <label key={student.id} className="flex items-center gap-2 px-2 py-1 text-sm">
                                <input
                                  type="checkbox"
                                  checked={form.attendee_student_ids.includes(student.id)}
                                  onChange={(e) =>
                                    setForm((prev) => {
                                      const has = prev.attendee_student_ids.includes(student.id);
                                      const next = e.target.checked
                                        ? [...prev.attendee_student_ids, student.id]
                                        : prev.attendee_student_ids.filter((id) => id !== student.id);
                                      return { ...prev, attendee_student_ids: next };
                                    })
                                  }
                                />
                                {studentLabel(student)}
                              </label>
                            ))
                          )}
                        </div>
                        {form.service_offered_id && form.attendee_student_ids.length > serviceCapacity ? (
                          <div className="mt-2 text-xs font-semibold text-red-600">
                            Attendees exceed capacity. You can still save, but it will be flagged.
                          </div>
                        ) : null}

                        <div className="mt-4 rounded-xl border border-gray-200 bg-zinc-50 p-4">
                          <div className="text-sm font-semibold text-gray-700">Add student</div>
                          {parents.length === 0 ? (
                            <div className="mt-2 text-xs text-gray-500">Add a parent in Clients before creating students.</div>
                          ) : (
                            <div className="mt-3 grid gap-3">
                              <div className="grid gap-2">
                                <Label htmlFor="new-student-parent">Parent</Label>
                                <select
                                  id="new-student-parent"
                                  className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm"
                                  value={newStudent.parent_id}
                                  onChange={(e) => setNewStudent((prev) => ({ ...prev, parent_id: e.target.value }))}
                                >
                                  <option value="">Select parent</option>
                                  {parents.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                      {parentLabel(parent)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="grid gap-2 md:grid-cols-2">
                                <div className="grid gap-2">
                                  <Label htmlFor="new-student-first">First name</Label>
                                  <Input
                                    id="new-student-first"
                                    value={newStudent.first_name}
                                    onChange={(e) => setNewStudent((prev) => ({ ...prev, first_name: e.target.value }))}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="new-student-last">Last name</Label>
                                  <Input
                                    id="new-student-last"
                                    value={newStudent.last_name}
                                    onChange={(e) => setNewStudent((prev) => ({ ...prev, last_name: e.target.value }))}
                                  />
                                </div>
                              </div>
                              <div className="grid gap-2 md:grid-cols-2">
                                <div className="grid gap-2">
                                  <Label htmlFor="new-student-email">Email</Label>
                                  <Input
                                    id="new-student-email"
                                    type="email"
                                    value={newStudent.email}
                                    onChange={(e) => setNewStudent((prev) => ({ ...prev, email: e.target.value }))}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="new-student-phone">Phone</Label>
                                  <Input
                                    id="new-student-phone"
                                    value={newStudent.phone}
                                    onChange={(e) => setNewStudent((prev) => ({ ...prev, phone: e.target.value }))}
                                  />
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="new-student-dob">Date of birth</Label>
                                <Input
                                  id="new-student-dob"
                                  type="date"
                                  value={newStudent.dob}
                                  onChange={(e) => setNewStudent((prev) => ({ ...prev, dob: e.target.value }))}
                                />
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-primary"
                                  onClick={() => handleAddStudent(false)}
                                  disabled={savingStudent}
                                >
                                  {savingStudent ? "Saving..." : "Save student"}
                                </button>
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                  onClick={() => handleAddStudent(true)}
                                  disabled={savingStudent}
                                >
                                  {savingStudent ? "Saving..." : "Save & add another"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={() => {
                        setPendingConflict(null);
                        setForm((prev) => ({
                          ...prev,
                          start_at_local: "",
                          attendee_student_ids: [],
                          room_ids: [],
                          resources_text: "",
                          location_detail: "",
                          recurrence_type: "AD_HOC",
                        }));
                      }}
                    >
                      Reset
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
                          {conflictRows.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-3 py-8 text-center text-sm text-gray-500">
                                No conflicts found.
                              </td>
                            </tr>
                          ) : (
                            conflictRows.map((row) => {
                              const schedule = row.scheduleEntry;
                              const conflict = row.conflictingScheduleEntry;
                              const tags = normalizeConflictTags(row.conflict_tags);
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
                                      <div className="mt-1 text-xs text-gray-600">{row.message}</div>
                                    ) : null}
                                  </td>
                                  <td className="px-3 py-2">
                                    <ClampedCell
                                      text={
                                        schedule
                                          ? `${serviceLabel(serviceMap.get(schedule.service_offered_id))} - ${formatDateTime(
                                              schedule.start_at,
                                            )}`
                                          : "--"
                                      }
                                    />
                                  </td>
                                  <td className="px-3 py-2">
                                    <ClampedCell
                                      text={
                                        conflict
                                          ? `${serviceLabel(serviceMap.get(conflict.service_offered_id))} - ${formatDateTime(
                                              conflict.start_at,
                                            )}`
                                          : "--"
                                      }
                                    />
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
          </section>
        </div>
      </main>
    </div>
  );
}
