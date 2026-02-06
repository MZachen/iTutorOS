export type ClientFieldGroup = "parents" | "students";

export type ClientFieldDef = {
  key: string;
  label: string;
  defaultVisible?: boolean;
};

export const PARENT_FIELDS: ClientFieldDef[] = [
  { key: "parent1_first_name", label: "Parent 1 First Name" },
  { key: "parent1_last_name", label: "Parent 1 Last Name" },
  { key: "parent1_email", label: "Parent 1 Email" },
  { key: "parent1_phone", label: "Parent 1 Phone" },
  { key: "parent1_address_1", label: "Parent 1 Address 1" },
  { key: "parent1_address_2", label: "Parent 1 Address 2" },
  { key: "parent1_city", label: "Parent 1 City" },
  { key: "parent1_state", label: "Parent 1 State" },
  { key: "parent1_zip", label: "Parent 1 ZIP" },
  { key: "parent2_first_name", label: "Parent 2 First Name" },
  { key: "parent2_last_name", label: "Parent 2 Last Name" },
  { key: "parent2_email", label: "Parent 2 Email" },
  { key: "parent2_phone", label: "Parent 2 Phone" },
  { key: "parent2_address_1", label: "Parent 2 Address 1" },
  { key: "parent2_address_2", label: "Parent 2 Address 2" },
  { key: "parent2_city", label: "Parent 2 City" },
  { key: "parent2_state", label: "Parent 2 State" },
  { key: "parent2_zip", label: "Parent 2 ZIP" },
  { key: "notes", label: "Notes" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
  { key: "archived_at", label: "Archived At" },
];

export const STUDENT_FIELDS: ClientFieldDef[] = [
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "dob", label: "Date of Birth" },
  { key: "school", label: "School" },
  { key: "iep", label: "IEP" },
  { key: "allergies", label: "Allergies" },
  { key: "medical_condition", label: "Medical Condition" },
  { key: "behaviorial_issue", label: "Behavioral Issue" },
  { key: "vision_ok", label: "Vision OK" },
  { key: "hearing_ok", label: "Hearing OK" },
  { key: "in_person", label: "In-person" },
  { key: "notes", label: "Notes" },
  { key: "parent", label: "Linked Parent" },
  { key: "location", label: "Location" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
  { key: "archived_at", label: "Archived At" },
];

export type ClientFieldPrefs = {
  parents: Record<string, boolean>;
  students: Record<string, boolean>;
};

export const CLIENT_FIELDS_STORAGE_KEY = "itutoros_client_fields";

export function defaultClientFieldPrefs(): ClientFieldPrefs {
  const parents: Record<string, boolean> = {};
  const students: Record<string, boolean> = {};
  PARENT_FIELDS.forEach((f) => {
    parents[f.key] = f.defaultVisible ?? true;
  });
  STUDENT_FIELDS.forEach((f) => {
    students[f.key] = f.defaultVisible ?? true;
  });
  return { parents, students };
}

export function normalizeClientFieldPrefs(raw: any): ClientFieldPrefs {
  const defaults = defaultClientFieldPrefs();
  const parents = { ...defaults.parents, ...(raw?.parents ?? {}) };
  const students = { ...defaults.students, ...(raw?.students ?? {}) };
  // Ensure only known keys
  Object.keys(parents).forEach((k) => {
    if (!(k in defaults.parents)) delete parents[k];
  });
  Object.keys(students).forEach((k) => {
    if (!(k in defaults.students)) delete students[k];
  });
  return { parents, students };
}

export function loadClientFieldPrefs(): ClientFieldPrefs {
  if (typeof window === "undefined") return defaultClientFieldPrefs();
  try {
    const raw = localStorage.getItem(CLIENT_FIELDS_STORAGE_KEY);
    if (!raw) return defaultClientFieldPrefs();
    return normalizeClientFieldPrefs(JSON.parse(raw));
  } catch {
    return defaultClientFieldPrefs();
  }
}

export function saveClientFieldPrefs(prefs: ClientFieldPrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLIENT_FIELDS_STORAGE_KEY, JSON.stringify(prefs));
}
