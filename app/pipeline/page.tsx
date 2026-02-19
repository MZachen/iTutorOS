"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { loadPipelineSources, type PipelineSourceSetting } from "@/lib/pipeline-sources";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClampedCell } from "@/components/ui/clamped-cell";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BookOpen01Icon,
  PipelineIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "@/lib/use-toast";
import { DEFAULT_DATE_FORMAT, formatDateWithPattern, normalizeDateFormat } from "@/lib/date-format";

const LEAD_STAGES = [
  { value: "NEW", label: "New" },
  { value: "CONTACT_ATTEMPTED", label: "Contact Attempted" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "FOLLOW_UP_ATTEMPTED", label: "Follow-up Attempted" },
  { value: "FOLLOWED_UP", label: "Followed-up" },
  { value: "COMMITTED", label: "Committed" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "ASSESSED", label: "Assessed" },
  { value: "ACTIVE", label: "Active" },
  { value: "COLD", label: "Cold" },
];

const LEAD_TEMPERATURES = [
  { value: "HOT", label: "Hot" },
  { value: "WARM", label: "Warm" },
  { value: "COLD", label: "Cold" },
];

const CONTACT_METHODS = [
  { value: "PHONE", label: "Phone" },
  { value: "EMAIL", label: "Email" },
  { value: "DM", label: "DM" },
];

const SOURCE_LABELS: Record<string, string> = {
  WEB: "Web",
  WALK_IN: "Walk-in",
  PHONE: "Phone",
  EMAIL: "Email",
  SOCIAL: "Social",
};

const PIPELINE_TABS = [
  { key: "PIPELINE", label: "Pipeline", icon: PipelineIcon },
  { key: "ADD_LEAD", label: "Add New Lead", icon: UserAdd01Icon },
  { key: "IMPORT", label: "Import New Leads", icon: ArrowDown01Icon },
  { key: "HELP", label: "Help", icon: BookOpen01Icon },
] as const;

type PipelineTab = (typeof PIPELINE_TABS)[number]["key"];

const PIPELINE_TAB_ICON_COLORS: Record<PipelineTab, string> = {
  PIPELINE: "#04c1ff",
  ADD_LEAD: "#ff2204",
  IMPORT: "#ff2204",
  HELP: "#6e4305",
};

type Location = { id: string; location_name: string; archived_at?: string | null };

type LeadStudentDraft = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  school: string;
  iep: boolean;
  allergies: boolean;
  medical_condition: boolean;
  behaviorial_issue: boolean;
  vision_issue: boolean;
  hearing_issue: boolean;
  in_person: boolean;
  notes: string;
};

type Lead = {
  id: string;
  stage?: string | null;
  source?: string | null;
  source_detail?: string | null;
  temperature?: string | null;
  last_contact_method?: string | null;
  last_contact_at?: string | null;
  reason_lost?: string | null;
  notes?: string | null;
  lead_location_id?: string | null;
  owner_user_id?: string | null;
  parent_first_name?: string | null;
  parent_last_name?: string | null;
  parent_email?: string | null;
  parent_phone?: string | null;
  parent_address_1?: string | null;
  parent_address_2?: string | null;
  parent_city?: string | null;
  parent_state?: string | null;
  parent_zip?: string | null;
  lead_students?: LeadStudentDraft[] | null;
  created_at?: string | null;
  archived_at?: string | null;
};

type ImportRow = {
  id: string;
  parent_first_name: string | null;
  parent_last_name: string | null;
  parent_email?: string | null;
  source: string | null;
  source_detail: string | null;
  created_at: string;
  include: boolean;
  notes?: string | null;
};

function planLeadLimit(plan: string | null | undefined) {
  const key = (plan ?? "basic").toLowerCase();
  if (key === "basic") return 10;
  if (key === "basic-plus") return 25;
  if (key === "pro") return 100;
  return null;
}

const PIPELINE_GRID_PAGE_SIZE = 50;

function paginateRows<T>(rows: T[], page: number, pageSize: number) {
  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  return {
    items: rows.slice(startIndex, endIndex),
    total,
    pageCount,
    page: currentPage,
    startIndex,
    endIndex,
  };
}


function leadSourceLabel(lead: Lead) {
  if (lead.source_detail) return lead.source_detail;
  if (!lead.source) return "--";
  return SOURCE_LABELS[lead.source] ?? lead.source;
}

function leadStageLabel(value?: string | null) {
  if (!value) return "--";
  const match = LEAD_STAGES.find((s) => s.value === value);
  return match?.label ?? value;
}

function leadTempLabel(value?: string | null) {
  if (!value) return "--";
  const match = LEAD_TEMPERATURES.find((s) => s.value === value);
  return match?.label ?? value;
}

function contactMethodLabel(value?: string | null) {
  if (!value) return "--";
  const match = CONTACT_METHODS.find((s) => s.value === value);
  return match?.label ?? value;
}

function createLeadStudentDraft(): LeadStudentDraft {
  return {
    id: `lead-student-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    school: "",
    iep: false,
    allergies: false,
    medical_condition: false,
    behaviorial_issue: false,
    vision_issue: false,
    hearing_issue: false,
    in_person: true,
    notes: "",
  };
}

function sourceDetailForSetting(source: PipelineSourceSetting) {
  if (source.type === "SOCIAL") return source.label;
  if (source.type === "EMAIL" && source.id.startsWith("email:")) return source.address || source.label;
  return null;
}

function sourceDisplayLabel(source: PipelineSourceSetting) {
  if (source.type === "EMAIL") return source.address || source.label;
  return source.label;
}

export default function PipelinePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PipelineTab>("PIPELINE");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [plan, setPlan] = useState<string | null>("basic");
  const [dateFormat, setDateFormat] = useState(DEFAULT_DATE_FORMAT);
  const [pipelineSources, setPipelineSources] = useState<PipelineSourceSetting[]>(loadPipelineSources());

  const [leadSort, setLeadSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "created_at",
    dir: "desc",
  });
  const [leadPage, setLeadPage] = useState(1);
  const [leadView, setLeadView] = useState<"active" | "archived">("active");
  const [leadEditMode, setLeadEditMode] = useState(false);
  const [leadEdits, setLeadEdits] = useState<Record<string, Partial<Lead>>>({});
  const [leadStudentModal, setLeadStudentModal] = useState<Lead | null>(null);

  const [newLead, setNewLead] = useState({
    parent_first_name: "",
    parent_last_name: "",
    parent_email: "",
    parent_phone: "",
    parent_address_1: "",
    parent_address_2: "",
    parent_city: "",
    parent_state: "",
    parent_zip: "",
    notes: "",
    stage: "NEW",
    source_id: "",
    temperature: "",
    last_contact_method: "",
    last_contact_at: "",
    lead_location_id: "",
    reason_lost: "",
  });
  const [newLeadStudents, setNewLeadStudents] = useState<LeadStudentDraft[]>([createLeadStudentDraft()]);

  const [importSourceId, setImportSourceId] = useState("ALL");
  const [importStart, setImportStart] = useState("");
  const [importEnd, setImportEnd] = useState("");
  const [importRows, setImportRows] = useState<ImportRow[]>([]);
  const [importSort, setImportSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "created_at",
    dir: "desc",
  });
  const [importing, setImporting] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Pipeline Copilot. Ask me about lead stages, follow-up workflows, or how to move a lead through the funnel.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const formatDate = (value: any) => formatDateWithPattern(value, dateFormat);

  const locationMap = useMemo(() => {
    const map = new Map<string, string>();
    locations.forEach((l) => map.set(l.id, l.location_name));
    return map;
  }, [locations]);

  const activeLeadCount = useMemo(() => leads.filter((lead) => !lead.archived_at).length, [leads]);
  const leadLimit = useMemo(() => planLeadLimit(plan), [plan]);

  const enabledSources = useMemo(
    () => pipelineSources.filter((source) => source.enabled),
    [pipelineSources],
  );

  useEffect(() => {
    const onStorage = () => setPipelineSources(loadPipelineSources());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      if (cancelled) return;
      setToken(session.access_token);
      await loadData(session.access_token);
      if (!cancelled) setLoading(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function loadData(accessToken: string) {
    const [leadRes, locRes, orgRes] = await Promise.all([
      fetch("/leads?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/locations?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/organizations", { headers: { Authorization: `Bearer ${accessToken}` } }),
    ]);

    if (leadRes.ok) setLeads((await leadRes.json()) as Lead[]);
    if (locRes.ok) setLocations((await locRes.json()) as Location[]);
    if (orgRes.ok) {
      const orgs = (await orgRes.json()) as Array<{ subscription_plan?: string | null; date_format?: string | null }>;
      const org = orgs?.[0];
      setPlan(org?.subscription_plan ?? "basic");
      setDateFormat(normalizeDateFormat(org?.date_format));
    }
  }

  function toggleLeadSort(key: string) {
    setLeadSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  }

  function toggleImportSort(key: string) {
    setImportSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  }

  const renderSortIcons = (active: boolean, dir: "asc" | "desc") => (
    <span className="ml-2 inline-flex flex-col items-center gap-0">
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

  const visibleLeads = useMemo(() => {
    return leads.filter((lead) => (leadView === "archived" ? Boolean(lead.archived_at) : !lead.archived_at));
  }, [leads, leadView]);

  const sortedLeads = useMemo(() => {
    const rows = [...visibleLeads];
    const dir = leadSort.dir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      const getValue = (lead: Lead) => {
        switch (leadSort.key) {
          case "parent_first_name":
          case "parent_last_name":
            return (lead as any)[leadSort.key] ?? "";
          case "stage":
            return leadStageLabel(lead.stage);
          case "source":
            return leadSourceLabel(lead);
          case "temperature":
            return leadTempLabel(lead.temperature);
          case "last_contact_at":
            return lead.last_contact_at ?? "";
          case "lead_location_id":
            return lead.lead_location_id ? locationMap.get(lead.lead_location_id) ?? "" : "";
          case "created_at":
            return lead.created_at ?? "";
          default:
            return (lead as any)[leadSort.key] ?? "";
        }
      };
      const aVal = getValue(a);
      const bVal = getValue(b);
      if (typeof aVal === "string" && typeof bVal === "string") {
        const diff = aVal.localeCompare(bVal);
        if (diff !== 0) return diff * dir;
      }
      return 0;
    });
    return rows;
  }, [visibleLeads, leadSort, locationMap]);

  useEffect(() => {
    setLeadPage(1);
  }, [leadView, leadSort.key, leadSort.dir]);

  const leadPagination = useMemo(
    () => paginateRows(sortedLeads, leadPage, PIPELINE_GRID_PAGE_SIZE),
    [sortedLeads, leadPage],
  );

  useEffect(() => {
    if (leadPagination.page !== leadPage) {
      setLeadPage(leadPagination.page);
    }
  }, [leadPagination.page, leadPage]);

  const sortedImportRows = useMemo(() => {
    const rows = [...importRows];
    const dir = importSort.dir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      const getValue = (row: ImportRow) => {
        switch (importSort.key) {
          case "parent_first_name":
          case "parent_last_name":
            return (row as any)[importSort.key] ?? "";
          case "source":
            return row.source_detail ?? row.source ?? "";
          case "created_at":
            return row.created_at;
          default:
            return (row as any)[importSort.key] ?? "";
        }
      };
      const aVal = getValue(a);
      const bVal = getValue(b);
      if (typeof aVal === "string" && typeof bVal === "string") {
        const diff = aVal.localeCompare(bVal);
        if (diff !== 0) return diff * dir;
      }
      return 0;
    });
    return rows;
  }, [importRows, importSort]);

  function setLeadDraftValue(id: string, key: keyof Lead, value: any) {
    setLeadEdits((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {}),
        [key]: value,
      },
    }));
  }

  function updateLeadSourceDraft(id: string, sourceId: string) {
    const source = enabledSources.find((item) => item.id === sourceId);
    setLeadDraftValue(id, "source", source?.type ?? null);
    setLeadDraftValue(id, "source_detail", source ? sourceDetailForSetting(source) : null);
  }

  function leadDraftValue(lead: Lead, key: keyof Lead) {
    const draft = leadEdits[lead.id] ?? {};
    return (draft as any)[key] ?? (lead as any)[key];
  }

  async function saveLeadEdits() {
    if (!token) return;
    const entries = Object.entries(leadEdits);
    if (!entries.length) {
      setLeadEditMode(false);
      return;
    }

    for (const [leadId, changes] of entries) {
      const res = await fetch(`/leads/${leadId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (!res.ok) {
        toast({ title: "Lead update failed", description: await res.text(), variant: "destructive" });
        return;
      }
      const updated = (await res.json()) as Lead;
      setLeads((prev) => prev.map((lead) => (lead.id === updated.id ? { ...lead, ...updated } : lead)));
    }

    setLeadEdits({});
    setLeadEditMode(false);
    toast({ title: "Leads updated", description: "Pipeline changes saved." });
  }

  function discardLeadEdits() {
    setLeadEdits({});
    setLeadEditMode(false);
  }

  async function addLead() {
    if (!token) return;
    if (!newLead.parent_first_name.trim() || !newLead.parent_last_name.trim()) {
      toast({ title: "Missing parent name", description: "Parent first and last name are required.", variant: "destructive" });
      return;
    }
    const missing: string[] = [];
    if (!newLead.stage) missing.push("Stage");
    if (!newLead.source_id) missing.push("Source");
    if (!newLead.temperature) missing.push("Temperature");
    if (!newLead.last_contact_method) missing.push("Last contact method");
    if (!newLead.last_contact_at) missing.push("Last contact date");
    if (missing.length) {
      toast({
        title: "Missing required fields",
        description: `Please complete: ${missing.join(", ")}.`,
        variant: "destructive",
      });
      return;
    }

    if (leadLimit !== null && activeLeadCount >= leadLimit) {
      toast({
        title: "Lead limit reached",
        description: "Archive a lead or upgrade your plan to add more.",
        variant: "destructive",
      });
      return;
    }

    const source = enabledSources.find((item) => item.id === newLead.source_id);
    const leadStudentsPayload = newLeadStudents
      .map((student) => ({
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        phone: student.phone,
        dob: student.dob || null,
        school: student.school,
        iep: student.iep,
        allergies: student.allergies,
        medical_condition: student.medical_condition,
        behaviorial_issue: student.behaviorial_issue,
        vision_issue: student.vision_issue,
        hearing_issue: student.hearing_issue,
        in_person: student.in_person,
        notes: student.notes,
      }))
      .filter((student) => {
        const hasText = [
          student.first_name,
          student.last_name,
          student.email,
          student.phone,
          student.dob,
          student.school,
          student.notes,
        ].some((value) => typeof value === "string" && value.trim().length > 0);
        const hasFlags =
          student.iep ||
          student.allergies ||
          student.medical_condition ||
          student.behaviorial_issue ||
          student.vision_issue ||
          student.hearing_issue ||
          student.in_person === false;
        return hasText || hasFlags;
      });

    const payload: Record<string, any> = {
      parent_first_name: newLead.parent_first_name,
      parent_last_name: newLead.parent_last_name,
      parent_email: newLead.parent_email || null,
      parent_phone: newLead.parent_phone || null,
      parent_address_1: newLead.parent_address_1 || null,
      parent_address_2: newLead.parent_address_2 || null,
      parent_city: newLead.parent_city || null,
      parent_state: newLead.parent_state || null,
      parent_zip: newLead.parent_zip || null,
      notes: newLead.notes || null,
      stage: newLead.stage || "NEW",
      source: source?.type ?? null,
      source_detail: source ? sourceDetailForSetting(source) : null,
      temperature: newLead.temperature || null,
      last_contact_method: newLead.last_contact_method || null,
      last_contact_at: newLead.last_contact_at ? new Date(newLead.last_contact_at).toISOString() : null,
      lead_location_id: newLead.lead_location_id || null,
      reason_lost: newLead.reason_lost || null,
      lead_students: leadStudentsPayload,
    };

    const res = await fetch("/leads", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      toast({ title: "Lead create failed", description: await res.text(), variant: "destructive" });
      return;
    }
    const created = (await res.json()) as Lead;
    setLeads((prev) => [created, ...prev]);
    setNewLead({
      parent_first_name: "",
      parent_last_name: "",
      parent_email: "",
      parent_phone: "",
      parent_address_1: "",
      parent_address_2: "",
      parent_city: "",
      parent_state: "",
      parent_zip: "",
      notes: "",
      stage: "NEW",
      source_id: "",
      temperature: "",
      last_contact_method: "",
      last_contact_at: "",
      lead_location_id: "",
      reason_lost: "",
    });
    setNewLeadStudents([createLeadStudentDraft()]);
    toast({ title: "Lead created", description: "Lead record added to pipeline." });
    setActiveTab("PIPELINE");
  }

  function updateLeadStudent(id: string, updates: Partial<LeadStudentDraft>) {
    setNewLeadStudents((prev) => prev.map((student) => (student.id === id ? { ...student, ...updates } : student)));
  }

  function removeLeadStudent(id: string) {
    setNewLeadStudents((prev) => prev.filter((student) => student.id !== id));
  }

  function resetLeadForm() {
    setNewLead({
      parent_first_name: "",
      parent_last_name: "",
      parent_email: "",
      parent_phone: "",
      parent_address_1: "",
      parent_address_2: "",
      parent_city: "",
      parent_state: "",
      parent_zip: "",
      notes: "",
      stage: "NEW",
      source_id: "",
      temperature: "",
      last_contact_method: "",
      last_contact_at: "",
      lead_location_id: "",
      reason_lost: "",
    });
    setNewLeadStudents([createLeadStudentDraft()]);
  }

  function pickRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function normalizeDateRange() {
    if (!importStart || !importEnd) return null;
    const startDate = new Date(importStart);
    const endDate = new Date(importEnd);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
    if (startDate > endDate) {
      return { start: importEnd, end: importStart };
    }
    return { start: importStart, end: importEnd };
  }

  function generateImportRows() {
    const range = normalizeDateRange();
    if (!range) {
      toast({ title: "Select a date range", description: "Choose a valid start and end date first." });
      return;
    }
    const availableSources = importSourceId === "ALL" ? enabledSources : enabledSources.filter((s) => s.id === importSourceId);
    const sourcePool = availableSources.length ? availableSources : pipelineSources;
    const startDate = new Date(range.start);
    const endDate = new Date(range.end);
    const startTime = Math.min(startDate.getTime(), endDate.getTime());
    const endTime = Math.max(startDate.getTime(), endDate.getTime());
    const names = [
      { first: "Ava", last: "Johnson" },
      { first: "Liam", last: "Patel" },
      { first: "Mia", last: "Nguyen" },
      { first: "Noah", last: "Smith" },
      { first: "Sofia", last: "Garcia" },
      { first: "Ethan", last: "Brown" },
    ];
    const rows: ImportRow[] = Array.from({ length: 6 }).map((_, idx) => {
      const name = names[idx % names.length];
      const source = pickRandom(sourcePool);
      const createdAt = new Date(startTime + Math.random() * (endTime - startTime || 1));
      return {
        id: `import-${Date.now()}-${idx}`,
        parent_first_name: name.first,
        parent_last_name: name.last,
        parent_email: null,
        source: source?.type ?? null,
        source_detail: source ? sourceDetailForSetting(source) : null,
        created_at: createdAt.toISOString(),
        include: true,
        notes: null,
      };
    });
    setImportRows(rows);
  }

  async function stageEmailImportRows() {
    if (!token) return;
    const range = normalizeDateRange();
    if (!range) {
      toast({ title: "Select a date range", description: "Choose a valid start and end date first." });
      return;
    }

    const emailSources = enabledSources.filter((source) => source.type === "EMAIL" && source.id.startsWith("email:"));
    const selectedSources =
      importSourceId === "ALL" ? emailSources : emailSources.filter((source) => source.id === importSourceId);

    if (selectedSources.length === 0) {
      toast({
        title: "Email scan unavailable",
        description: "Select an email inbox source to scan. Other sources will use sample leads for now.",
      });
      generateImportRows();
      return;
    }

    setScanning(true);
    try {
      const staged: ImportRow[] = [];
      for (const source of selectedSources) {
        const inboxId = source.id.replace(/^email:/, "");
        const res = await fetch(`/email-inboxes/${inboxId}/scan`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({ start: range.start, end: range.end, stage_only: true }),
        });
        if (!res.ok) {
          toast({ title: "Scan failed", description: await res.text(), variant: "destructive" });
          return;
        }
        const json = (await res.json()) as { rows?: ImportRow[] };
        const rows = (json.rows ?? []).map((row, idx) => ({
          ...row,
          id: row.id ?? `stage-${Date.now()}-${idx}`,
          created_at: row.created_at ?? new Date().toISOString(),
          include: true,
        }));
        staged.push(...rows);
      }
      setImportRows(staged);
      toast({
        title: "Leads staged",
        description: staged.length ? `${staged.length} leads staged from email.` : "No leads found in that range.",
      });
    } finally {
      setScanning(false);
    }
  }

  async function commitImport() {
    if (!token) return;
    const included = importRows.filter((row) => row.include);
    if (leadLimit !== null && activeLeadCount + included.length > leadLimit) {
      toast({
        title: "Lead limit reached",
        description: "Reduce the import selection or archive leads before importing.",
        variant: "destructive",
      });
      return;
    }
    setImporting(true);
    try {
      for (const row of importRows) {
        const res = await fetch("/leads", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify({
            parent_first_name: row.parent_first_name,
            parent_last_name: row.parent_last_name,
            parent_email: row.parent_email ?? null,
            notes: row.notes ?? null,
            source: row.source,
            source_detail: row.source_detail,
            archived: !row.include,
          }),
        });
        if (!res.ok) {
          toast({ title: "Import failed", description: await res.text(), variant: "destructive" });
          return;
        }
      }
      await loadData(token);
      setImportRows([]);
      toast({ title: "Import complete", description: "Leads have been staged into the pipeline." });
    } finally {
      setImporting(false);
    }
  }

  async function sendChat() {
    const message = chatInput.trim();
    if (!message) return;
    setChatInput("");
    const nextMessages = [...chatMessages, { role: "user" as const, content: message }];
    setChatMessages(nextMessages);
    setChatLoading(true);
    try {
      const res = await fetch("/api/pipeline-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) {
        const detail = await res.text();
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Sorry, I couldn't respond (${res.status}). ${detail}` },
        ]);
        return;
      }
      const json = (await res.json()) as { message?: string };
      setChatMessages((prev) => [...prev, { role: "assistant", content: json.message || "" }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, the chat request failed. Please try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">Loading pipeline...</main>
      </div>
    );
  }

  const activeTabLabel = PIPELINE_TABS.find((tab) => tab.key === activeTab)?.label ?? "Pipeline";

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[700px] flex-col gap-6 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 bg-white lg:w-[280px]">
            <div className="h-full border-b border-gray-200 shadow-[8px_0_18px_rgba(0,0,0,0.06)] lg:border-b-0 lg:border-r">
              <div className="p-4 text-sm font-semibold text-gray-600">Pipeline</div>
              <nav className="grid gap-1 p-2">
                {PIPELINE_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    style={{ "--tab-icon-color": PIPELINE_TAB_ICON_COLORS[tab.key] } as CSSProperties}
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
              <p className="text-sm text-gray-600">Track, nurture, and convert leads into active students.</p>
            </div>

            <div className="px-4 py-6 sm:px-6">
              {activeTab === "PIPELINE" ? (
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setLeadView("active")}
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          leadView === "active" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        Active leads
                      </button>
                      <button
                        type="button"
                        onClick={() => setLeadView("archived")}
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold transition",
                          leadView === "archived" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        Archived leads
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className={[
                          "itutoros-settings-btn",
                          leadEditMode ? "itutoros-settings-btn-primary" : "itutoros-settings-btn-secondary",
                        ].join(" ")}
                        onClick={() => (leadEditMode ? saveLeadEdits() : setLeadEditMode(true))}
                      >
                        {leadEditMode ? "Save" : "Edit"}
                      </button>
                      {leadEditMode ? (
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={discardLeadEdits}
                        >
                          Discard
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <div className="max-h-[520px] overflow-y-auto">
                      <table className="min-w-[1200px] border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  leadSort.key === "parent_first_name" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleLeadSort("parent_first_name")}
                              >
                                Parent First
                                {renderSortIcons(leadSort.key === "parent_first_name", leadSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  leadSort.key === "parent_last_name" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleLeadSort("parent_last_name")}
                              >
                                Parent Last
                                {renderSortIcons(leadSort.key === "parent_last_name", leadSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  leadSort.key === "stage" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleLeadSort("stage")}
                              >
                                Stage
                                {renderSortIcons(leadSort.key === "stage", leadSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  leadSort.key === "source" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleLeadSort("source")}
                              >
                                Source
                                {renderSortIcons(leadSort.key === "source", leadSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  leadSort.key === "temperature" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleLeadSort("temperature")}
                              >
                                Temp
                                {renderSortIcons(leadSort.key === "temperature", leadSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">Last Contact</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">Location</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap itutoros-notes-col">Notes</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">Students</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leadPagination.items.map((lead) => (
                            <tr key={lead.id} className="border-t border-gray-100">
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <Input
                                    value={String(leadDraftValue(lead, "parent_first_name") ?? "")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "parent_first_name", e.target.value)}
                                    className="h-9"
                                  />
                                ) : (
                                  <ClampedCell text={lead.parent_first_name ?? ""} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <Input
                                    value={String(leadDraftValue(lead, "parent_last_name") ?? "")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "parent_last_name", e.target.value)}
                                    className="h-9"
                                  />
                                ) : (
                                  <ClampedCell text={lead.parent_last_name ?? ""} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <select
                                    className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                                    value={String(leadDraftValue(lead, "stage") ?? "NEW")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "stage", e.target.value)}
                                  >
                                    {LEAD_STAGES.map((stage) => (
                                      <option key={stage.value} value={stage.value}>
                                        {stage.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <ClampedCell text={leadStageLabel(lead.stage)} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <select
                                    className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                                    value={
                                      enabledSources.find((source) =>
                                        sourceDetailForSetting(source)
                                          ? sourceDetailForSetting(source) === leadDraftValue(lead, "source_detail")
                                          : source.type === leadDraftValue(lead, "source"),
                                      )?.id ?? ""
                                    }
                                    onChange={(e) => updateLeadSourceDraft(lead.id, e.target.value)}
                                  >
                                    <option value="">Select source</option>
                                    {enabledSources.map((source) => (
                                      <option key={source.id} value={source.id}>
                                        {sourceDisplayLabel(source)}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <ClampedCell text={leadSourceLabel(lead)} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <select
                                    className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                                    value={String(leadDraftValue(lead, "temperature") ?? "")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "temperature", e.target.value)}
                                  >
                                    <option value="">Select</option>
                                    {LEAD_TEMPERATURES.map((temp) => (
                                      <option key={temp.value} value={temp.value}>
                                        {temp.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <ClampedCell text={leadTempLabel(lead.temperature)} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <div className="grid gap-2">
                                    <select
                                      className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                                      value={String(leadDraftValue(lead, "last_contact_method") ?? "")}
                                      onChange={(e) => setLeadDraftValue(lead.id, "last_contact_method", e.target.value)}
                                    >
                                      <option value="">Method</option>
                                      {CONTACT_METHODS.map((method) => (
                                        <option key={method.value} value={method.value}>
                                          {method.label}
                                        </option>
                                      ))}
                                    </select>
                                    <Input
                                      type="date"
                                      value={
                                        leadDraftValue(lead, "last_contact_at")
                                          ? String(leadDraftValue(lead, "last_contact_at")).slice(0, 10)
                                          : ""
                                      }
                                      onChange={(e) =>
                                        setLeadDraftValue(
                                          lead.id,
                                          "last_contact_at",
                                          e.target.value ? new Date(e.target.value).toISOString() : null,
                                        )
                                      }
                                      className="h-9"
                                    />
                                  </div>
                                ) : (
                                  <div className="grid gap-1">
                                    <div>{contactMethodLabel(lead.last_contact_method)}</div>
                                    <div className="text-xs text-gray-500">{formatDate(lead.last_contact_at)}</div>
                                  </div>
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {leadEditMode ? (
                                  <select
                                    className="h-9 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                                    value={String(leadDraftValue(lead, "lead_location_id") ?? "")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "lead_location_id", e.target.value)}
                                  >
                                    <option value="">Unassigned</option>
                                    {locations
                                      .filter((loc) => !loc.archived_at)
                                      .map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                          {loc.location_name}
                                        </option>
                                      ))}
                                  </select>
                                ) : (
                                  <ClampedCell text={locationMap.get(lead.lead_location_id || "") ?? ""} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2 itutoros-notes-col">
                                {leadEditMode ? (
                                  <Input
                                    value={String(leadDraftValue(lead, "notes") ?? "")}
                                    onChange={(e) => setLeadDraftValue(lead.id, "notes", e.target.value)}
                                    className="h-9"
                                  />
                                ) : (
                                  <ClampedCell text={lead.notes ?? ""} fallback="--" />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-primary"
                                  onClick={() => setLeadStudentModal(lead)}
                                >
                                  View ({Array.isArray(lead.lead_students) ? lead.lead_students.length : 0})
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
                    <div>
                      Showing{" "}
                      {leadPagination.total
                        ? `${leadPagination.startIndex + 1}-${leadPagination.endIndex}`
                        : "0"}{" "}
                      of {leadPagination.total} leads
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => setLeadPage(1)}
                        disabled={leadPagination.page <= 1}
                      >
                        First
                      </button>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => setLeadPage((prev) => Math.max(1, prev - 1))}
                        disabled={leadPagination.page <= 1}
                      >
                        Previous
                      </button>
                      <span className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700">
                        Page {leadPagination.page} of {leadPagination.pageCount}
                      </span>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() =>
                          setLeadPage((prev) => Math.min(leadPagination.pageCount, prev + 1))
                        }
                        disabled={leadPagination.page >= leadPagination.pageCount}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => setLeadPage(leadPagination.pageCount)}
                        disabled={leadPagination.page >= leadPagination.pageCount}
                      >
                        Last
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "ADD_LEAD" ? (
                <div className="grid gap-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={() => setNewLeadStudents((prev) => [...prev, createLeadStudentDraft()])}
                    >
                      Add Student
                    </button>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={resetLeadForm}
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                      onClick={addLead}
                    >
                      Save Lead Record
                    </button>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Parent Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Parent first name</Label>
                        <Input
                          value={newLead.parent_first_name}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_first_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent last name</Label>
                        <Input
                          value={newLead.parent_last_name}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_last_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent email</Label>
                        <Input
                          type="email"
                          value={newLead.parent_email}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_email: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent phone</Label>
                        <Input
                          value={newLead.parent_phone}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_phone: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Address line 1</Label>
                        <Input
                          value={newLead.parent_address_1}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_address_1: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Address line 2</Label>
                        <Input
                          value={newLead.parent_address_2}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_address_2: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>City</Label>
                        <Input
                          value={newLead.parent_city}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_city: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>State</Label>
                        <Input
                          value={newLead.parent_state}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_state: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>ZIP</Label>
                        <Input
                          value={newLead.parent_zip}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, parent_zip: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Pipeline Details</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Stage *</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newLead.stage}
                          disabled
                          required
                        >
                          {LEAD_STAGES.map((stage) => (
                            <option key={stage.value} value={stage.value}>
                              {stage.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Source *</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newLead.source_id}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, source_id: e.target.value }))}
                          required
                        >
                          <option value="">Select source</option>
                          {enabledSources.map((source) => (
                            <option key={source.id} value={source.id}>
                              {sourceDisplayLabel(source)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Temperature *</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newLead.temperature}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, temperature: e.target.value }))}
                          required
                        >
                          <option value="">Select</option>
                          {LEAD_TEMPERATURES.map((temp) => (
                            <option key={temp.value} value={temp.value}>
                              {temp.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Lead location</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newLead.lead_location_id}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, lead_location_id: e.target.value }))}
                        >
                          <option value="">Unassigned</option>
                          {locations
                            .filter((loc) => !loc.archived_at)
                            .map((loc) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.location_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Last contact method *</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newLead.last_contact_method}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, last_contact_method: e.target.value }))}
                          required
                        >
                          <option value="">Select</option>
                          {CONTACT_METHODS.map((method) => (
                            <option key={method.value} value={method.value}>
                              {method.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Last contact date *</Label>
                        <Input
                          type="date"
                          value={newLead.last_contact_at}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, last_contact_at: e.target.value }))}
                          className="bg-zinc-50"
                          required
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Reason lost</Label>
                        <Input
                          value={newLead.reason_lost}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, reason_lost: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Lead notes</Label>
                        <textarea
                          className="min-h-[90px] rounded-xl border border-gray-200 bg-zinc-50 p-3 text-sm"
                          value={newLead.notes}
                          onChange={(e) => setNewLead((prev) => ({ ...prev, notes: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="text-sm font-semibold text-gray-700">Student Records</div>
                    {newLeadStudents.map((student, index) => (
                      <div key={student.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm font-semibold text-gray-700">Student {index + 1}</div>
                          {newLeadStudents.length > 1 ? (
                            <button
                              type="button"
                              className="text-xs font-semibold text-rose-500"
                              onClick={() => removeLeadStudent(student.id)}
                            >
                              Remove student
                            </button>
                          ) : null}
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>First name</Label>
                            <Input
                              value={student.first_name}
                              onChange={(e) => updateLeadStudent(student.id, { first_name: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Last name</Label>
                            <Input
                              value={student.last_name}
                              onChange={(e) => updateLeadStudent(student.id, { last_name: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input
                              value={student.email}
                              onChange={(e) => updateLeadStudent(student.id, { email: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input
                              value={student.phone}
                              onChange={(e) => updateLeadStudent(student.id, { phone: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Date of birth</Label>
                            <Input
                              type="date"
                              value={student.dob}
                              onChange={(e) => updateLeadStudent(student.id, { dob: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>School</Label>
                            <Input
                              value={student.school}
                              onChange={(e) => updateLeadStudent(student.id, { school: e.target.value })}
                              className="bg-zinc-50"
                            />
                          </div>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Student delivery</Label>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`in_person_${student.id}`}
                                  checked={student.in_person}
                                  onChange={() => updateLeadStudent(student.id, { in_person: true })}
                                />
                                In person
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`in_person_${student.id}`}
                                  checked={!student.in_person}
                                  onChange={() => updateLeadStudent(student.id, { in_person: false })}
                                />
                                Online
                              </label>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label>Needs and flags</Label>
                            <div className="grid gap-2 text-sm sm:grid-cols-2">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.iep}
                                  onChange={(e) => updateLeadStudent(student.id, { iep: e.target.checked })}
                                />
                                IEP
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.allergies}
                                  onChange={(e) => updateLeadStudent(student.id, { allergies: e.target.checked })}
                                />
                                Allergies
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.medical_condition}
                                  onChange={(e) =>
                                    updateLeadStudent(student.id, { medical_condition: e.target.checked })
                                  }
                                />
                                Medical condition
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.behaviorial_issue}
                                  onChange={(e) =>
                                    updateLeadStudent(student.id, { behaviorial_issue: e.target.checked })
                                  }
                                />
                                Behavioral issue
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.vision_issue}
                                  onChange={(e) => updateLeadStudent(student.id, { vision_issue: e.target.checked })}
                                />
                                Vision issue
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={student.hearing_issue}
                                  onChange={(e) => updateLeadStudent(student.id, { hearing_issue: e.target.checked })}
                                />
                                Hearing issue
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2">
                          <Label>Student notes</Label>
                          <textarea
                            className="min-h-[90px] rounded-xl border border-gray-200 bg-zinc-50 p-3 text-sm"
                            value={student.notes}
                            onChange={(e) => updateLeadStudent(student.id, { notes: e.target.value })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "IMPORT" ? (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Import settings</div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Lead source</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={importSourceId}
                          onChange={(e) => setImportSourceId(e.target.value)}
                        >
                          <option value="ALL">Import all</option>
                          {enabledSources.map((source) => (
                            <option key={source.id} value={source.id}>
                              {sourceDisplayLabel(source)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Start date</Label>
                        <Input
                          type="date"
                          value={importStart}
                          onChange={(e) => setImportStart(e.target.value)}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>End date</Label>
                        <Input
                          type="date"
                          value={importEnd}
                          onChange={(e) => setImportEnd(e.target.value)}
                          className="bg-zinc-50"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={stageEmailImportRows}
                        disabled={scanning}
                      >
                        {scanning ? "Scanning..." : "Import Leads"}
                      </button>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => setImportRows([])}
                        disabled={!importRows.length || scanning || importing}
                      >
                        Cancel Import
                      </button>
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                        disabled={!importRows.length || importing || scanning}
                        onClick={commitImport}
                      >
                        {importing ? "Importing..." : "Commit Import"}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <div className="max-h-[520px] overflow-y-auto">
                      <table className="min-w-[900px] border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">Import</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  importSort.key === "parent_first_name" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleImportSort("parent_first_name")}
                              >
                                Parent First
                                {renderSortIcons(importSort.key === "parent_first_name", importSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  importSort.key === "parent_last_name" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleImportSort("parent_last_name")}
                              >
                                Parent Last
                                {renderSortIcons(importSort.key === "parent_last_name", importSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  importSort.key === "source" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleImportSort("source")}
                              >
                                Source
                                {renderSortIcons(importSort.key === "source", importSort.dir)}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                                  importSort.key === "created_at" ? "text-[#ff9df9]" : "text-gray-900"
                                }`}
                                onClick={() => toggleImportSort("created_at")}
                              >
                                Created
                                {renderSortIcons(importSort.key === "created_at", importSort.dir)}
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedImportRows.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500">
                                No leads staged yet.
                              </td>
                            </tr>
                          ) : (
                            sortedImportRows.map((row) => (
                              <tr key={row.id} className="border-t border-gray-100">
                                <td className="px-3 py-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#ff9df9]"
                                    checked={row.include}
                                    onChange={(e) =>
                                      setImportRows((prev) =>
                                        prev.map((item) =>
                                          item.id === row.id ? { ...item, include: e.target.checked } : item,
                                        ),
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell text={row.parent_first_name ?? ""} fallback="--" />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell text={row.parent_last_name ?? ""} fallback="--" />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell text={row.source_detail ?? row.source ?? ""} fallback="--" />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell text={formatDate(row.created_at)} fallback="--" />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "HELP" ? (
                <div className="grid gap-6">
                  <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-[#f7f7ff] via-white to-[#e7fbff] p-6">
                    <div className="text-base font-semibold text-gray-900">Pipeline stages</div>
                    <ul className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      {LEAD_STAGES.map((stage) => (
                        <li key={stage.value} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                          {stage.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {[
                      {
                        id: "web",
                        title: "Web Form Lead",
                        summary: "Auto-recorded from your website form.",
                        steps: ["Lead created as New", "Owner assigned", "Contacted and follow-up", "Scheduled"],
                      },
                      {
                        id: "walkin",
                        title: "Walk-in Lead",
                        summary: "Captured in person and nurtured to commitment.",
                        steps: ["Lead created as New", "Location set", "Follow-up Attempted", "Committed"],
                      },
                      {
                        id: "phone",
                        title: "Phone Lead",
                        summary: "Logged after a call, tracked through follow-up.",
                        steps: ["Lead created as New", "Contacted", "Followed-up", "Active"],
                      },
                      {
                        id: "social",
                        title: "Social DM Lead",
                        summary: "DM captured with source-specific messaging.",
                        steps: ["Lead created as New", "Contacted", "Assessed", "Active"],
                      },
                    ].map((flow) => (
                      <button
                        key={flow.id}
                        type="button"
                        className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(11,31,95,0.12),_transparent_60%)]" />
                        </div>
                        <div className="relative z-10 grid gap-2">
                          <div className="text-lg font-bold text-gray-900">{flow.title}</div>
                          <div className="text-sm text-gray-600">{flow.summary}</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {flow.steps.map((step) => (
                              <span
                                key={step}
                                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700"
                              >
                                {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-gray-900">AI Pipeline Copilot</div>
                        <div className="text-xs text-gray-500">Connected to ChatGPT</div>
                      </div>
                      <div className="mt-4 flex max-h-[320px] flex-col gap-3 overflow-y-auto rounded-2xl bg-gray-50 p-4">
                        {chatMessages.map((msg, idx) => (
                          <div
                            key={`${msg.role}-${idx}`}
                            className={
                              msg.role === "user"
                                ? "self-end rounded-2xl bg-[#0b1f5f] px-4 py-2 text-sm text-white"
                                : "self-start rounded-2xl bg-white px-4 py-2 text-sm text-gray-700"
                            }
                          >
                            {msg.content}
                          </div>
                        ))}
                        {chatLoading ? (
                          <div className="self-start rounded-2xl bg-white px-4 py-2 text-sm text-gray-500">
                            Thinking...
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Input
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ask about lead stages, follow-ups, or conversion best practices..."
                          className="flex-1"
                        />
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-primary"
                          disabled={!chatInput.trim() || chatLoading}
                          onClick={sendChat}
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-[#0b1f5f] via-[#1d2f8a] to-[#00c5dc] p-6 text-white shadow-sm">
                      <div className="text-base font-semibold">Pipeline guidance</div>
                      <ul className="mt-4 grid gap-3 text-sm">
                        <li className="rounded-2xl bg-white/10 px-4 py-3">Always log contact method and last contact date.</li>
                        <li className="rounded-2xl bg-white/10 px-4 py-3">Update temperature after every conversation.</li>
                        <li className="rounded-2xl bg-white/10 px-4 py-3">Assign a lead location once the family commits.</li>
                        <li className="rounded-2xl bg-white/10 px-4 py-3">Move to Scheduled when assessment or tutoring is booked.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      {leadStudentModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[560px] rounded-xl bg-white p-6 shadow-xl">
            <div className="text-lg font-extrabold">Lead students</div>
            <div className="mt-1 text-sm text-gray-600">
              Parent: {leadStudentModal.parent_first_name} {leadStudentModal.parent_last_name}
            </div>
            <div className="mt-4 grid max-h-[320px] gap-2 overflow-y-auto text-sm text-gray-700">
              {(Array.isArray(leadStudentModal.lead_students) ? leadStudentModal.lead_students : []).map(
                (student, idx) => (
                  <div key={`${leadStudentModal.id}-student-${idx}`} className="rounded-lg border border-gray-200 p-3">
                    <div className="font-semibold">
                      {student.first_name || "Student"} {student.last_name || ""}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{student.school || "School not set"}</div>
                    {student.notes ? <div className="mt-2 text-xs text-gray-600">{student.notes}</div> : null}
                  </div>
                ),
              )}
              {(!leadStudentModal.lead_students || leadStudentModal.lead_students.length === 0) && (
                <div className="text-center text-sm text-gray-500">No student records added yet.</div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="itutoros-settings-btn itutoros-settings-btn-secondary"
                onClick={() => setLeadStudentModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
