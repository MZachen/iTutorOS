export const DATE_FORMAT_OPTIONS = [
  { value: "m/d/yy", label: "M/D/YY" },
  { value: "m/d/yyyy", label: "M/D/YYYY" },
  { value: "mm/dd/yy", label: "MM/DD/YY" },
  { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
  { value: "d/m/yy", label: "D/M/YY" },
  { value: "d/m/yyyy", label: "D/M/YYYY" },
  { value: "dd/mm/yy", label: "DD/MM/YY" },
  { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
] as const;

export type DateFormat = (typeof DATE_FORMAT_OPTIONS)[number]["value"];

export const DEFAULT_DATE_FORMAT: DateFormat = "mm/dd/yyyy";

const DATE_FORMAT_SET = new Set<string>(DATE_FORMAT_OPTIONS.map((opt) => opt.value));

export function normalizeDateFormat(value?: string | null): DateFormat {
  if (!value) return DEFAULT_DATE_FORMAT;
  const normalized = value.trim().toLowerCase();
  return (DATE_FORMAT_SET.has(normalized) ? normalized : DEFAULT_DATE_FORMAT) as DateFormat;
}

function parseDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = trimmed.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]) - 1;
      const day = Number(match[3]);
      const date = new Date(year, month, day);
      return Number.isNaN(date.getTime()) ? null : date;
    }
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function tokenValue(token: string, parts: { day: number; month: number; year: number }) {
  switch (token) {
    case "m":
      return String(parts.month);
    case "mm":
      return String(parts.month).padStart(2, "0");
    case "d":
      return String(parts.day);
    case "dd":
      return String(parts.day).padStart(2, "0");
    case "yy":
      return String(parts.year).slice(-2);
    case "yyyy":
      return String(parts.year);
    default:
      return token;
  }
}

export function formatDateWithPattern(value: any, pattern?: string | null) {
  const date = parseDate(value);
  if (!date) return value == null ? "" : String(value);
  const safePattern = normalizeDateFormat(pattern);
  const parts = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
  const tokens = safePattern.split("/");
  return tokens.map((token) => tokenValue(token, parts)).join("/");
}

export function formatTime(value: any) {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTimeWithPattern(value: any, pattern?: string | null) {
  if (!value) return "";
  return `${formatDateWithPattern(value, pattern)} ${formatTime(value)}`.trim();
}
