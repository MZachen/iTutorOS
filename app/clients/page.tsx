"use client";

import { useEffect, useMemo, useState } from "react";
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
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { toast } from "@/lib/use-toast";

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
  vision_ok?: boolean | null;
  hearing_ok?: boolean | null;
  in_person?: boolean | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  archived_at?: string | null;
  parent?: Parent;
};

type ClientTab = "ADD" | "PARENTS" | "STUDENTS";

export default function ClientsPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ClientTab>("STUDENTS");

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
  });
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    location_id: "",
    in_person: true,
  });

  const locationMap = useMemo(() => {
    const map = new Map<string, string>();
    locations.forEach((l) => map.set(l.id, l.location_name));
    return map;
  }, [locations]);

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
    const [locRes, parentRes, studentRes] = await Promise.all([
      fetch("/locations", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/parents", { headers: { Authorization: `Bearer ${accessToken}` } }),
      fetch("/students", { headers: { Authorization: `Bearer ${accessToken}` } }),
    ]);

    if (locRes.ok) setLocations((await locRes.json()) as Location[]);
    if (parentRes.ok) setParents((await parentRes.json()) as Parent[]);
    if (studentRes.ok) setStudents((await studentRes.json()) as Student[]);
  }

  function parentDisplayName(parent?: Parent | null) {
    const name = [parent?.parent1_first_name, parent?.parent1_last_name].filter(Boolean).join(" ");
    return name || "Parent";
  }

  function formatDate(value: any) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString();
  }

  function getParentValue(parent: Parent, key: string) {
    if (key === "created_at" || key === "updated_at" || key === "archived_at") {
      return formatDate((parent as any)[key]);
    }
    return (parent as any)[key] ?? "";
  }

  function getStudentValue(student: Student, key: string) {
    if (key === "parent") return parentDisplayName(student.parent);
    if (key === "location") return locationMap.get(student.location_id) ?? "";
    if (key === "created_at" || key === "updated_at" || key === "archived_at") {
      return formatDate((student as any)[key]);
    }
    return (student as any)[key] ?? "";
  }

  const sortedParents = useMemo(() => {
    const rows = [...parents];
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
  }, [parents, parentSort]);

  const sortedStudents = useMemo(() => {
    const rows = [...students];
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
  }, [students, studentSort, locationMap]);

  function toggleSort(type: "parent" | "student", key: string) {
    if (type === "parent") {
      setParentSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    } else {
      setStudentSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    }
  }

  async function addClient(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
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
        student: {
          location_id: newStudent.location_id,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          in_person: newStudent.in_person,
        },
      }),
    });
    if (!res.ok) {
      toast({ title: "Client create failed", description: await res.text(), variant: "destructive" });
      return;
    }
    toast({ title: "Client added", description: "Parent and student created successfully." });
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
    });
    setNewStudent({ first_name: "", last_name: "", location_id: newStudent.location_id, in_person: true });
    await loadData(token);
    setActiveTab("PARENTS");
  }

  if (loading) {
    return (
      <div className="min-h-screen itutoros-soft-gradient">
        <AppHeader />
        <main className="mx-auto w-full max-w-[1200px] p-6">Loading clients…</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen itutoros-soft-gradient">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1200px] p-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-xl bg-white p-4 shadow-[4px_0_16px_rgba(0,0,0,0.08)]">
            <div className="text-sm font-semibold text-gray-600">Clients</div>
            <div className="mt-3 grid gap-2 text-sm font-semibold">
              {[
                { key: "ADD", label: "Add New Client" },
                { key: "PARENTS", label: "Parents" },
                { key: "STUDENTS", label: "Students" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as ClientTab)}
                  className={`rounded-lg px-3 py-2 text-left ${
                    activeTab === tab.key ? "bg-[#e0fde5] text-[#0b1f5f]" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="itutoros-card-2 p-6">
            {activeTab === "ADD" ? (
              <div className="grid gap-6">
                <div className="text-xl font-extrabold">Add New Client</div>
                <form onSubmit={addClient} className="grid gap-6">
                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Parent Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Parent first name</Label>
                        <Input
                          value={newParent.parent1_first_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_first_name: e.target.value }))}
                          className="bg-indigo-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent last name</Label>
                        <Input
                          value={newParent.parent1_last_name}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_last_name: e.target.value }))}
                          className="bg-indigo-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent email</Label>
                        <Input
                          type="email"
                          value={newParent.parent1_email}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_email: e.target.value }))}
                          className="bg-indigo-50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Parent phone</Label>
                        <Input
                          value={newParent.parent1_phone}
                          onChange={(e) => setNewParent((prev) => ({ ...prev, parent1_phone: e.target.value }))}
                          className="bg-indigo-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-semibold text-gray-700">Student Information</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label>Student first name</Label>
                        <Input
                          value={newStudent.first_name}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, first_name: e.target.value }))}
                          className="bg-indigo-50"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Student last name</Label>
                        <Input
                          value={newStudent.last_name}
                          onChange={(e) => setNewStudent((prev) => ({ ...prev, last_name: e.target.value }))}
                          className="bg-indigo-50"
                          required
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
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="itutoros-settings-btn itutoros-settings-btn-primary">
                      Add client
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {activeTab === "PARENTS" ? (
              <div className="grid gap-4">
                <div className="text-sm text-gray-600">Sortable parent grid. Columns follow Settings → Clients.</div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-[900px] border-collapse text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {visibleParentFields.map((field) => (
                          <th key={field.key} className="px-3 py-2 text-left">
                            <button
                              type="button"
                              className="flex items-center gap-1 font-semibold"
                              onClick={() => toggleSort("parent", field.key)}
                            >
                              {field.label}
                              {parentSort.key === field.key ? (
                                <HugeiconsIcon icon={parentSort.dir === "asc" ? ArrowUp01Icon : ArrowDown01Icon} size={16} />
                              ) : null}
                            </button>
                          </th>
                        ))}
                        <th className="px-3 py-2 text-left">
                          <span className="font-semibold">Students</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedParents.map((parent) => (
                        <tr key={parent.id} className="border-t border-gray-100">
                          {visibleParentFields.map((field) => (
                            <td key={field.key} className="px-3 py-2">
                              {String(getParentValue(parent, field.key) || "—")}
                            </td>
                          ))}
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary"
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
            ) : null}

            {activeTab === "STUDENTS" ? (
              <div className="grid gap-4">
                <div className="text-sm text-gray-600">Sortable student grid. Columns follow Settings → Clients.</div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-[900px] border-collapse text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {visibleStudentFields.map((field) => (
                          <th key={field.key} className="px-3 py-2 text-left">
                            <button
                              type="button"
                              className="flex items-center gap-1 font-semibold"
                              onClick={() => toggleSort("student", field.key)}
                            >
                              {field.label}
                              {studentSort.key === field.key ? (
                                <HugeiconsIcon icon={studentSort.dir === "asc" ? ArrowUp01Icon : ArrowDown01Icon} size={16} />
                              ) : null}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStudents.map((student) => (
                        <tr key={student.id} className="border-t border-gray-100">
                          {visibleStudentFields.map((field) => {
                            const value = getStudentValue(student, field.key);
                            if (typeof (student as any)[field.key] === "boolean") {
                              return (
                                <td key={field.key} className="px-3 py-2">
                                  <input type="checkbox" checked={Boolean((student as any)[field.key])} readOnly />
                                </td>
                              );
                            }
                            if (field.key === "parent") {
                              return (
                                <td key={field.key} className="px-3 py-2">
                                  <button
                                    type="button"
                                    className="text-left text-[#7200dc] underline"
                                    onClick={() => setParentModal(student.parent ?? null)}
                                  >
                                    {value || "—"}
                                  </button>
                                </td>
                              );
                            }
                            return (
                              <td key={field.key} className="px-3 py-2">
                                {String(value || "—")}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
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
                    {s.location_id ? `(${locationMap.get(s.location_id) ?? "Location"})` : ""}
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
