"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/_components/AppHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import {
  PARENT_FIELDS,
  STUDENT_FIELDS,
  defaultClientFieldPrefs,
  loadClientFieldPrefs,
} from "@/lib/client-fields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClampedCell } from "@/components/ui/clamped-cell";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  UserAdd01Icon,
  UserGroupIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "@/lib/use-toast";
import { DEFAULT_DATE_FORMAT, formatDateWithPattern, normalizeDateFormat } from "@/lib/date-format";

type Location = { id: string; location_name: string; archived_at?: string | null };
type Parent = {
  id: string;
  parent1_first_name?: string | null;
  parent1_last_name?: string | null;
  parent1_email?: string | null;
  parent1_phone?: string | null;
  parent1_address_1?: string | null;
  parent1_address_2?: string | null;
  parent1_city?: string | null;
  parent1_state?: string | null;
  parent1_zip?: string | null;
  parent2_first_name?: string | null;
  parent2_last_name?: string | null;
  parent2_email?: string | null;
  parent2_phone?: string | null;
  parent2_address_1?: string | null;
  parent2_address_2?: string | null;
  parent2_city?: string | null;
  parent2_state?: string | null;
  parent2_zip?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  archived_at?: string | null;
  students?: Array<{ id: string; first_name: string; last_name: string; archived_at?: string | null; location_id?: string }>;
};
type Student = {
  id: string;
  location_id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  dob?: string | null;
  school?: string | null;
  iep?: boolean | null;
  allergies?: boolean | null;
  medical_condition?: boolean | null;
  behaviorial_issue?: boolean | null;
  vision_issue?: boolean | null;
  hearing_issue?: boolean | null;
  in_person?: boolean | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  archived_at?: string | null;
  parent?: Parent;
};

type ClientTab = "ADD_FAMILY" | "ADD_STUDENT" | "PARENTS" | "STUDENTS";

const CLIENT_TABS: { key: ClientTab; label: string; icon: any }[] = [
  { key: "ADD_FAMILY", label: "Add New Family", icon: UserAdd01Icon },
  { key: "ADD_STUDENT", label: "Add New Student", icon: UserAdd01Icon },
  { key: "PARENTS", label: "Parents", icon: UserGroupIcon },
  { key: "STUDENTS", label: "Students", icon: UserIcon },
];

const CLIENT_TAB_ICON_COLORS: Record<ClientTab, string> = {
  ADD_FAMILY: "#04ff1c",
  ADD_STUDENT: "#1604ff",
  PARENTS: "#ffa904",
  STUDENTS: "#ff04f0",
};

export default function ClientsPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ClientTab>("STUDENTS");
  const [dateFormat, setDateFormat] = useState(DEFAULT_DATE_FORMAT);

  const [locations, setLocations] = useState<Location[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [fieldPrefs, setFieldPrefs] = useState(defaultClientFieldPrefs());

  const [parentSort, setParentSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "parent1_last_name",
    dir: "asc",
  });
  const [studentSort, setStudentSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "last_name",
    dir: "asc",
  });
  const [parentView, setParentView] = useState<"active" | "archived">("active");
  const [studentView, setStudentView] = useState<"active" | "archived">("active");
  const [parentEditMode, setParentEditMode] = useState(false);
  const [studentEditMode, setStudentEditMode] = useState(false);
  const [parentEdits, setParentEdits] = useState<Record<string, Partial<Parent>>>({});
  const [studentEdits, setStudentEdits] = useState<Record<string, Partial<Student>>>({});

  const [parentModal, setParentModal] = useState<Parent | null>(null);
  const [studentModal, setStudentModal] = useState<{ parent: Parent; students: Student[] } | null>(null);

  const [newParent, setNewParent] = useState({
    parent1_first_name: "",
    parent1_last_name: "",
    parent1_email: "",
    parent1_phone: "",
    parent1_address_1: "",
    parent1_address_2: "",
    parent1_city: "",
    parent1_state: "",
    parent1_zip: "",
    parent2_first_name: "",
    parent2_last_name: "",
    parent2_email: "",
    parent2_phone: "",
    parent2_address_1: "",
    parent2_address_2: "",
    parent2_city: "",
    parent2_state: "",
    parent2_zip: "",
    notes: "",
  });
  const [newStudent, setNewStudent] = useState({
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
    notes: "",
    location_id: "",
    in_person: true,
  });
  const [newStudentParentId, setNewStudentParentId] = useState("");
  const [newChild, setNewChild] = useState({
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
    notes: "",
    location_id: "",
    in_person: true,
  });

  const locationMap = useMemo(() => {
    const map = new Map<string, string>();
    locations.forEach((l) => map.set(l.id, l.location_name));
    return map;
  }, [locations]);
  const activeParents = useMemo(() => parents.filter((p) => !p.archived_at), [parents]);

  const visibleParentFields = PARENT_FIELDS.filter((f) => fieldPrefs.parents[f.key]);
  const visibleStudentFields = STUDENT_FIELDS.filter((f) => fieldPrefs.students[f.key]);

  useEffect(() => {
    const prefs = loadClientFieldPrefs();
    setFieldPrefs(prefs);
    const onStorage = () => setFieldPrefs(loadClientFieldPrefs());
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
    const [locRes, parentRes, studentRes, orgRes] = await Promise.all([
      fetch("/locations", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/parents?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/students?archived=all", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/organizations", { headers: { Authorization: `Bearer ${accessToken}` } }),
    ]);

    if (locRes.ok) setLocations((await locRes.json()) as Location[]);
    if (parentRes.ok) setParents((await parentRes.json()) as Parent[]);
    if (studentRes.ok) setStudents((await studentRes.json()) as Student[]);
    if (orgRes.ok) {
      const orgs = (await orgRes.json()) as Array<{ date_format?: string | null }>;
      setDateFormat(normalizeDateFormat(orgs?.[0]?.date_format));
    }
  }

  function parentDisplayName(parent?: Parent | null) {
    const name = [parent?.parent1_first_name, parent?.parent1_last_name].filter(Boolean).join(" ");
    return name || "Parent";
  }

  function parentOptionLabel(parent: Parent) {
    const last = parent.parent1_last_name?.trim() ?? "";
    const first = parent.parent1_first_name?.trim() ?? "";
    const name = [last, first].filter(Boolean).join(", ");
    const email = parent.parent1_email ? ` - ${parent.parent1_email}` : "";
    return `${name || "Parent"}${email}`;
  }

  function studentAgeLabel(dob?: string | null) {
    if (!dob) return "— years old";
    const date = new Date(dob);
    if (Number.isNaN(date.getTime())) return "— years old";
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age -= 1;
    }
    if (age < 0) return "— years old";
    return `${age} years old`;
  }

  function formatDate(value: any) {
    return formatDateWithPattern(value, dateFormat);
  }


  function getParentValue(parent: Parent, key: string) {
    if (key === "created_at" || key === "updated_at") {
      return formatDate((parent as any)[key]);
    }
    return (parent as any)[key] ?? "";
  }

  function getStudentValue(student: Student, key: string) {
    if (key === "parent") return parentDisplayName(student.parent);
    if (key === "location") return locationMap.get(student.location_id) ?? "";
    if (key === "dob") {
      return formatDate((student as any)[key]);
    }
    if (key === "created_at" || key === "updated_at") {
      return formatDate((student as any)[key]);
    }
    return (student as any)[key] ?? "";
  }

  const sortedParents = useMemo(() => {
    const rows = parents.filter((p) => (parentView === "archived" ? Boolean(p.archived_at) : !p.archived_at));
    rows.sort((a, b) => {
      const rawA = (a as any)[parentSort.key];
      const rawB = (b as any)[parentSort.key];
      const isDateKey = parentSort.key.endsWith("_at");
      const av = isDateKey ? new Date(rawA || 0).getTime() : String(getParentValue(a, parentSort.key) ?? "").toLowerCase();
      const bv = isDateKey ? new Date(rawB || 0).getTime() : String(getParentValue(b, parentSort.key) ?? "").toLowerCase();
      if (av === bv) return 0;
      return parentSort.dir === "asc" ? (av > bv ? 1 : -1) : av > bv ? -1 : 1;
    });
    return rows;
  }, [parents, parentSort, parentView]);

  const sortedStudents = useMemo(() => {
    const rows = students.filter((s) => (studentView === "archived" ? Boolean(s.archived_at) : !s.archived_at));
    rows.sort((a, b) => {
      const rawA = (a as any)[studentSort.key];
      const rawB = (b as any)[studentSort.key];
      const isDateKey = studentSort.key.endsWith("_at") || studentSort.key === "dob";
      const av = isDateKey ? new Date(rawA || 0).getTime() : String(getStudentValue(a, studentSort.key) ?? "").toLowerCase();
      const bv = isDateKey ? new Date(rawB || 0).getTime() : String(getStudentValue(b, studentSort.key) ?? "").toLowerCase();
      if (av === bv) return 0;
      return studentSort.dir === "asc" ? (av > bv ? 1 : -1) : av > bv ? -1 : 1;
    });
    return rows;
  }, [students, studentSort, locationMap, studentView]);

  function toggleSort(type: "parent" | "student", key: string) {
    if (type === "parent") {
      setParentSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    } else {
      setStudentSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    }
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

  const parentReadOnlyKeys = new Set(["created_at", "updated_at"]);
  const studentReadOnlyKeys = new Set(["created_at", "updated_at", "parent", "location"]);

  function setParentDraftValue(id: string, key: string, value: string) {
    setParentEdits((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [key]: value },
    }));
  }

  function setStudentDraftValue(id: string, key: string, value: any) {
    setStudentEdits((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [key]: value },
    }));
  }

  async function saveParentEdits() {
    if (!token) return;
    const entries = Object.entries(parentEdits);
    if (entries.length === 0) {
      setParentEditMode(false);
      return;
    }

    for (const [id, edits] of entries) {
      const original = parents.find((p) => p.id === id);
      if (!original) continue;
      const payload: Record<string, any> = { parent_id: id };
      Object.entries(edits).forEach(([key, value]) => {
        const originalValue = (original as any)[key];
        const next = typeof value === "string" ? (value.trim() || null) : value ?? null;
        const prev = typeof originalValue === "string" ? (originalValue.trim() || null) : originalValue ?? null;
        if (next !== prev) payload[key] = next;
      });
      if (Object.keys(payload).length <= 1) continue;
      const res = await fetch("/parents", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast({ title: "Parent update failed", description: await res.text(), variant: "destructive" });
        return;
      }
    }

    setParentEdits({});
    setParentEditMode(false);
    await loadData(token);
    toast({ title: "Parents updated", description: "Changes saved successfully." });
  }

  async function saveStudentEdits() {
    if (!token) return;
    const entries = Object.entries(studentEdits);
    if (entries.length === 0) {
      setStudentEditMode(false);
      return;
    }

    for (const [id, edits] of entries) {
      const original = students.find((s) => s.id === id);
      if (!original) continue;
      const payload: Record<string, any> = { student_id: id };
      Object.entries(edits).forEach(([key, value]) => {
        const originalValue = (original as any)[key];
        let next: any = value;
        if (typeof value === "string") next = value.trim() || null;
        const prev = typeof originalValue === "string" ? (originalValue.trim() || null) : originalValue ?? null;
        if (next !== prev) payload[key] = next;
      });
      if (Object.keys(payload).length <= 1) continue;
      const res = await fetch("/students", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast({ title: "Student update failed", description: await res.text(), variant: "destructive" });
        return;
      }
    }

    setStudentEdits({});
    setStudentEditMode(false);
    await loadData(token);
    toast({ title: "Students updated", description: "Changes saved successfully." });
  }

  async function addFamily(goToAddStudent: boolean) {
    if (!token) return;
    const email = newParent.parent1_email.trim().toLowerCase();
    const phone = newParent.parent1_phone.trim();
    if (email && parents.some((p) => String(p.parent1_email || "").toLowerCase() === email)) {
      toast({ title: "Duplicate email", description: "Parent 1 email already exists.", variant: "destructive" });
      return;
    }
    if (phone && parents.some((p) => String(p.parent1_phone || "") === phone)) {
      toast({ title: "Duplicate phone", description: "Parent 1 phone already exists.", variant: "destructive" });
      return;
    }
    if (!newStudent.location_id) {
      toast({ title: "Choose a location", description: "Select a location before creating the student.", variant: "destructive" });
      return;
    }
    const res = await fetch("/parents/with-student", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        parent1: {
          first_name: newParent.parent1_first_name,
          last_name: newParent.parent1_last_name,
          email: newParent.parent1_email,
          phone: newParent.parent1_phone,
          address_1: newParent.parent1_address_1,
          address_2: newParent.parent1_address_2,
          city: newParent.parent1_city,
          state: newParent.parent1_state,
          zip: newParent.parent1_zip,
        },
        parent2: {
          first_name: newParent.parent2_first_name,
          last_name: newParent.parent2_last_name,
          email: newParent.parent2_email,
          phone: newParent.parent2_phone,
          address_1: newParent.parent2_address_1,
          address_2: newParent.parent2_address_2,
          city: newParent.parent2_city,
          state: newParent.parent2_state,
          zip: newParent.parent2_zip,
        },
        notes: newParent.notes,
        student: {
          location_id: newStudent.location_id,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          email: newStudent.email,
          phone: newStudent.phone,
          dob: newStudent.dob,
          school: newStudent.school,
          iep: newStudent.iep,
          allergies: newStudent.allergies,
          medical_condition: newStudent.medical_condition,
          behaviorial_issue: newStudent.behaviorial_issue,
          vision_issue: newStudent.vision_issue,
          hearing_issue: newStudent.hearing_issue,
          in_person: newStudent.in_person,
          notes: newStudent.notes,
        },
      }),
    });
    if (!res.ok) {
      toast({ title: "Client create failed", description: await res.text(), variant: "destructive" });
      return;
    }
    const created = await res.json();
    toast({ title: "Family added", description: "Parent and student created successfully." });
    setNewParent({
      parent1_first_name: "",
      parent1_last_name: "",
      parent1_email: "",
      parent1_phone: "",
      parent1_address_1: "",
      parent1_address_2: "",
      parent1_city: "",
      parent1_state: "",
      parent1_zip: "",
      parent2_first_name: "",
      parent2_last_name: "",
      parent2_email: "",
      parent2_phone: "",
      parent2_address_1: "",
      parent2_address_2: "",
      parent2_city: "",
      parent2_state: "",
      parent2_zip: "",
      notes: "",
    });
    setNewStudent({
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
      notes: "",
      location_id: newStudent.location_id,
      in_person: true,
    });
    await loadData(token);
    if (goToAddStudent) {
      setNewStudentParentId(created?.parent?.id ?? "");
      if (newStudent.location_id) {
        setNewChild((prev) => ({ ...prev, location_id: newStudent.location_id }));
      }
      setActiveTab("ADD_STUDENT");
    } else {
      setActiveTab("PARENTS");
    }
  }

  async function submitStudent(exitAfter: boolean) {
    if (!token) return;
    if (!newStudentParentId) {
      toast({ title: "Choose a parent", description: "Select an existing parent first.", variant: "destructive" });
      return;
    }
    if (!newChild.first_name || !newChild.last_name) {
      toast({ title: "Missing student name", description: "Student first and last name are required.", variant: "destructive" });
      return;
    }
    if (!newChild.location_id) {
      toast({ title: "Choose a location", description: "Select a location before creating the student.", variant: "destructive" });
      return;
    }
    const res = await fetch("/students", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        parent_id: newStudentParentId,
        location_id: newChild.location_id,
        first_name: newChild.first_name,
        last_name: newChild.last_name,
        email: newChild.email,
        phone: newChild.phone,
        dob: newChild.dob,
        school: newChild.school,
        iep: newChild.iep,
        allergies: newChild.allergies,
        medical_condition: newChild.medical_condition,
        behaviorial_issue: newChild.behaviorial_issue,
        vision_issue: newChild.vision_issue,
        hearing_issue: newChild.hearing_issue,
        in_person: newChild.in_person,
        notes: newChild.notes,
      }),
    });
    if (!res.ok) {
      toast({ title: "Student create failed", description: await res.text(), variant: "destructive" });
      return;
    }
    toast({ title: "Student added", description: "Student record created successfully." });
    setNewChild({
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
      notes: "",
      location_id: newChild.location_id,
      in_person: true,
    });
    await loadData(token);
    if (exitAfter) {
      setActiveTab("STUDENTS");
    }
  }

  async function addStudentForParent(e: React.FormEvent) {
    e.preventDefault();
    await submitStudent(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">Loading clients…</main>
      </div>
    );
  }

  const activeTabLabel = CLIENT_TABS.find((t) => t.key === activeTab)?.label ?? "Clients";

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[700px] flex-col gap-6 lg:flex-row lg:gap-0">
          <aside className="w-full shrink-0 bg-white lg:w-[280px]">
            <div className="h-full border-b border-gray-200 shadow-[8px_0_18px_rgba(0,0,0,0.06)] lg:border-b-0 lg:border-r">
              <div className="p-4 text-sm font-semibold text-gray-600">Clients</div>
              <nav className="grid gap-1 p-2">
                {CLIENT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    style={{ "--tab-icon-color": CLIENT_TAB_ICON_COLORS[tab.key] } as CSSProperties}
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
              <p className="text-sm text-gray-600">Manage parents and students in your organization.</p>
            </div>

            <div className="px-4 py-6 sm:px-6">
            {activeTab === "ADD_FAMILY" ? (
              <div className="grid gap-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addFamily(false);
                  }}
                  className="grid gap-6"
                >
                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Parent 1 Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Parent 1 first name</Label>
                        <Input
                          value={newParent.parent1_first_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_first_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 last name</Label>
                        <Input
                          value={newParent.parent1_last_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_last_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 email</Label>
                        <Input
                          type="email"
                          value={newParent.parent1_email}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_email: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 phone</Label>
                        <Input
                          value={newParent.parent1_phone}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_phone: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Parent 1 address line 1</Label>
                        <Input
                          value={newParent.parent1_address_1}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_address_1: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Parent 1 address line 2</Label>
                        <Input
                          value={newParent.parent1_address_2}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_address_2: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 city</Label>
                        <Input
                          value={newParent.parent1_city}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_city: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 state</Label>
                        <Input
                          value={newParent.parent1_state}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_state: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 1 ZIP</Label>
                        <Input
                          value={newParent.parent1_zip}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_zip: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Parent 2 Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Parent 2 first name</Label>
                        <Input
                          value={newParent.parent2_first_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_first_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 last name</Label>
                        <Input
                          value={newParent.parent2_last_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_last_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 email</Label>
                        <Input
                          type="email"
                          value={newParent.parent2_email}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_email: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 phone</Label>
                        <Input
                          value={newParent.parent2_phone}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_phone: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Parent 2 address line 1</Label>
                        <Input
                          value={newParent.parent2_address_1}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_address_1: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Parent 2 address line 2</Label>
                        <Input
                          value={newParent.parent2_address_2}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_address_2: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 city</Label>
                        <Input
                          value={newParent.parent2_city}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_city: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 state</Label>
                        <Input
                          value={newParent.parent2_state}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_state: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent 2 ZIP</Label>
                        <Input
                          value={newParent.parent2_zip}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent2_zip: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Parent notes</Label>
                    <textarea
                      className="min-h-[90px] rounded-xl border border-gray-200 bg-zinc-50 p-3 text-sm"
                      value={newParent.notes}
                      onChange={(e) => setNewParent((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Student Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Student first name</Label>
                        <Input
                          value={newStudent.first_name}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, first_name: e.target.value }))}
                          className="bg-zinc-50"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student last name</Label>
                        <Input
                          value={newStudent.last_name}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, last_name: e.target.value }))}
                          className="bg-zinc-50"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student email</Label>
                        <Input
                          type="email"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student phone</Label>
                        <Input
                          value={newStudent.phone}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Date of birth</Label>
                        <Input
                          type="date"
                          value={newStudent.dob}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, dob: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>School</Label>
                        <Input
                          value={newStudent.school}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, school: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Location</Label>
                        <select
                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                          value={newStudent.location_id}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, location_id: e.target.value }))}
                          required
                        >
                          <option value="">—</option>
                          {locations
                            .filter((l) => !l.archived_at)
                            .map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.location_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.in_person}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, in_person: e.target.checked }))}
                        />
                        In-person student
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.iep}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, iep: e.target.checked }))}
                        />
                        IEP
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.allergies}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, allergies: e.target.checked }))}
                        />
                        Allergies
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.medical_condition}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, medical_condition: e.target.checked }))}
                        />
                        Medical condition
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.behaviorial_issue}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, behaviorial_issue: e.target.checked }))}
                        />
                        Behavioral issue
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.vision_issue}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, vision_issue: e.target.checked }))}
                        />
                        Vision Issue
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newStudent.hearing_issue}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, hearing_issue: e.target.checked }))}
                        />
                        Hearing Issue
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Student notes</Label>
                    <textarea
                      className="min-h-[90px] rounded-xl border border-gray-200 bg-zinc-50 p-3 text-sm"
                      value={newStudent.notes}
                      onChange={(e) => setNewStudent((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={() => addFamily(true)}
                    >
                      Save and add another student
                    </button>
                    <button type="submit" className="itutoros-settings-btn itutoros-settings-btn-primary">
                      Save Family Record
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {activeTab === "ADD_STUDENT" ? (
              <div className="grid gap-6">
                <form onSubmit={addStudentForParent} className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Existing parent</Label>
                    <select
                      className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                      value={newStudentParentId}
                      onChange={(e) => setNewStudentParentId(e.target.value)}
                    >
                      <option value="">Select a parent</option>
                      {activeParents.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parentOptionLabel(parent)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Student Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Student first name</Label>
                        <Input
                          value={newChild.first_name}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, first_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student last name</Label>
                        <Input
                          value={newChild.last_name}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, last_name: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student email</Label>
                        <Input
                          type="email"
                          value={newChild.email}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student phone</Label>
                        <Input
                          value={newChild.phone}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Date of birth</Label>
                        <Input
                          type="date"
                          value={newChild.dob}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, dob: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>School</Label>
                        <Input
                          value={newChild.school}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, school: e.target.value }))}
                          className="bg-zinc-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Location</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newChild.location_id}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, location_id: e.target.value }))}
                        >
                          <option value="">Select location</option>
                          {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.location_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>In-person</Label>
                        <select
                          className="h-11 rounded-xl border border-gray-200 bg-zinc-50 px-3 text-sm"
                          value={newChild.in_person ? "yes" : "no"}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, in_person: e.target.value === "yes" }))}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Student Support Flags</div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.iep}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, iep: e.target.checked }))}
                        />
                        IEP
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.allergies}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, allergies: e.target.checked }))}
                        />
                        Allergies
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.medical_condition}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, medical_condition: e.target.checked }))}
                        />
                        Medical condition
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.behaviorial_issue}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, behaviorial_issue: e.target.checked }))}
                        />
                        Behavioral issue
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.vision_issue}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, vision_issue: e.target.checked }))}
                        />
                        Vision Issue
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newChild.hearing_issue}
                          onChange={(e) => setNewChild((prev) => ({ ...prev, hearing_issue: e.target.checked }))}
                        />
                        Hearing Issue
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Student notes</Label>
                    <textarea
                      className="min-h-[90px] rounded-xl border border-gray-200 bg-zinc-50 p-3 text-sm"
                      value={newChild.notes}
                      onChange={(e) => setNewChild((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="itutoros-settings-btn itutoros-settings-btn-primary">
                      Save Student Record
                    </button>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                      onClick={() => void submitStudent(true)}
                    >
                      Save Student Record and Exit
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {activeTab === "PARENTS" ? (
              <div className="grid gap-4">

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setParentView("active")}
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        parentView === "active" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      Active parents
                    </button>
                    <button
                      type="button"
                      onClick={() => setParentView("archived")}
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        parentView === "archived" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      Archived parents
                    </button>
                  </div>
                  <button
                    type="button"
                    className={[
                      "itutoros-settings-btn",
                      parentEditMode ? "itutoros-settings-btn-primary" : "itutoros-settings-btn-secondary",
                    ].join(" ")}
                    onClick={() => (parentEditMode ? saveParentEdits() : setParentEditMode(true))}
                  >
                    {parentEditMode ? "Save" : "Edit"}
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <div className="max-h-[520px] overflow-y-auto">
                    <table className="min-w-[900px] border-collapse text-sm">
                      <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                      <tr>
                        {visibleParentFields.map((field) => (
                          <th
                            key={field.key}
                            className={[
                              "px-3 py-2 text-left whitespace-nowrap",
                              field.key === "notes" ? "itutoros-notes-col" : "",
                            ].join(" ")}
                          >
                            <button
                              type="button"
                              className={`flex items-center gap-1 whitespace-nowrap font-semibold ${parentSort.key === field.key ? "text-[#ff9df9]" : "text-gray-900"}`}
                              onClick={() => toggleSort("parent", field.key)}
                            >
                              {field.label}
                              {renderSortIcons(parentSort.key === field.key, parentSort.dir)}
                            </button>
                          </th>
                        ))}
                        <th className="px-3 py-2 text-left whitespace-nowrap">
                          <span className="font-semibold">Students</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedParents.map((parent) => (
                        <tr key={parent.id} className="border-t border-gray-100">
                          {visibleParentFields.map((field) => {
                            const draft = parentEdits[parent.id] ?? {};
                            const value = (draft as any)[field.key] ?? getParentValue(parent, field.key);
                            if (parentEditMode && !parentReadOnlyKeys.has(field.key)) {
                              return (
                                <td key={field.key} className="px-3 py-2">
                                  <Input
                                    value={String(value ?? "")}
                                    onChange={(e) => setParentDraftValue(parent.id, field.key, e.target.value)}
                                    className="h-9"
                                  />
                                </td>
                              );
                            }
                            return (
                              <td
                                key={field.key}
                                className={[
                                  "px-3 py-2",
                                  field.key === "notes" ? "itutoros-notes-col" : "",
                                ].join(" ")}
                              >
                                <ClampedCell text={value !== null && value !== undefined ? String(value) : ""} />
                              </td>
                            );
                          })}
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-primary"
                              onClick={() =>
                                setStudentModal({
                                  parent,
                                  students: students.filter((s) => s.parent_id === parent.id),
                                })
                              }
                            >
                              View ({students.filter((s) => s.parent_id === parent.id).length})
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "STUDENTS" ? (
              <div className="grid gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setStudentView("active")}
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        studentView === "active" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      Active students
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentView("archived")}
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        studentView === "archived" ? "bg-[#e0fde5] text-gray-900" : "text-gray-600 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      Archived students
                    </button>
                  </div>
                  <button
                    type="button"
                    className={[
                      "itutoros-settings-btn",
                      studentEditMode ? "itutoros-settings-btn-primary" : "itutoros-settings-btn-secondary",
                    ].join(" ")}
                    onClick={() => (studentEditMode ? saveStudentEdits() : setStudentEditMode(true))}
                  >
                    {studentEditMode ? "Save" : "Edit"}
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <div className="max-h-[520px] overflow-y-auto">
                    <table className="min-w-[900px] border-collapse text-sm">
                      <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                      <tr>
                        {visibleStudentFields.map((field) => (
                          <th
                            key={field.key}
                            className={[
                              "px-3 py-2 text-left whitespace-nowrap",
                              field.key === "notes" ? "itutoros-notes-col" : "",
                            ].join(" ")}
                          >
                            <button
                              type="button"
                              className={`flex items-center gap-1 whitespace-nowrap font-semibold ${studentSort.key === field.key ? "text-[#ff9df9]" : "text-gray-900"}`}
                              onClick={() => toggleSort("student", field.key)}
                            >
                              {field.label}
                              {renderSortIcons(studentSort.key === field.key, studentSort.dir)}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                        {sortedStudents.map((student) => (
                          <tr key={student.id} className="border-t border-gray-100">
                            {visibleStudentFields.map((field) => {
                              const draft = studentEdits[student.id] ?? {};
                              const value = (draft as any)[field.key] ?? getStudentValue(student, field.key);
                              const isBooleanField = typeof (student as any)[field.key] === "boolean";
                              const isReadOnly = studentReadOnlyKeys.has(field.key);

                              if (studentEditMode && !isReadOnly) {
                                if (isBooleanField) {
                                  return (
                                    <td key={field.key} className="px-3 py-2">
                                      <input
                                        type="checkbox"
                                        checked={Boolean(value)}
                                        onChange={(e) => setStudentDraftValue(student.id, field.key, e.target.checked)}
                                      />
                                    </td>
                                  );
                                }
                                if (field.key === "dob") {
                                  return (
                                    <td key={field.key} className="px-3 py-2">
                                      <Input
                                        type="date"
                                        value={value ? String(value).slice(0, 10) : ""}
                                        onChange={(e) => setStudentDraftValue(student.id, field.key, e.target.value)}
                                        className="h-9"
                                      />
                                    </td>
                                  );
                                }
                                return (
                                  <td key={field.key} className="px-3 py-2">
                                    <Input
                                      value={String(value ?? "")}
                                      onChange={(e) => setStudentDraftValue(student.id, field.key, e.target.value)}
                                      className="h-9"
                                    />
                                  </td>
                                );
                              }

                              if (isBooleanField) {
                                return (
                                  <td key={field.key} className="px-3 py-2">
                                    <input type="checkbox" checked={Boolean((student as any)[field.key])} readOnly />
                                  </td>
                                );
                              }
                              if (field.key === "parent") {
                                const parentText = typeof value === "string" ? value : "";
                                return (
                                  <td key={field.key} className="px-3 py-2">
                                    <button
                                      type="button"
                                      className="text-left text-[#7200dc] underline"
                                      onClick={() => setParentModal(student.parent ?? null)}
                                    >
                                      <ClampedCell text={parentText} />
                                    </button>
                                  </td>
                                );
                              }
                              return (
                                <td
                                  key={field.key}
                                  className={[
                                    "px-3 py-2",
                                    field.key === "notes" ? "itutoros-notes-col" : "",
                                  ].join(" ")}
                                >
                                  <ClampedCell text={value !== null && value !== undefined ? String(value) : ""} />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
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

      {parentModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-xl">
            <div className="text-lg font-extrabold">{parentDisplayName(parentModal)}</div>
            <div className="mt-3 grid gap-1 text-sm text-gray-700">
              {PARENT_FIELDS.map((field) => (
                <div key={field.key}>
                  <span className="font-semibold">{field.label}:</span> {String(getParentValue(parentModal, field.key) || "—")}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="itutoros-settings-btn itutoros-settings-btn-secondary" onClick={() => setParentModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {studentModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-xl">
            <div className="text-lg font-extrabold">Students for {parentDisplayName(studentModal.parent)}</div>
            <ul className="mt-3 grid gap-2 text-sm text-gray-700">
              {studentModal.students.map((s) => (
                <li key={s.id}>
                  {s.first_name} {s.last_name}{" "}
                  <span className="text-xs text-gray-500">
                    ({studentAgeLabel(s.dob)})
                  </span>
                </li>
              ))}
              {studentModal.students.length === 0 ? <li>No students found.</li> : null}
            </ul>
            <div className="mt-4 flex justify-end">
              <button className="itutoros-settings-btn itutoros-settings-btn-secondary" onClick={() => setStudentModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
