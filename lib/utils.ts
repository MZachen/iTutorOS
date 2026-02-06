import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toServiceCode(value: string) {
  const raw = value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  const cleaned = raw.replace(/^_+|_+$/g, "");
  return cleaned || "SERVICE";
}

export function makeUniqueServiceCode(base: string, existing: Set<string>) {
  const trimmed = toServiceCode(base);
  if (!existing.has(trimmed)) return trimmed;
  let i = 2;
  while (existing.has(`${trimmed}_${i}`)) i++;
  return `${trimmed}_${i}`;
}
