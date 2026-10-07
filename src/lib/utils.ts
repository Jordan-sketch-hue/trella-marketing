import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jmd(n: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function usd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Compact number: 12.4K, 1.2M */
export function compact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function pct(n: number, digits = 1) {
  return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function shortDate(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("en-JM", { day: "numeric", month: "short", year: "numeric" });
}

export function relTime(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  const diff = (dt.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const f = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (abs < 60) return f.format(Math.round(diff), "second");
  if (abs < 3600) return f.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return f.format(Math.round(diff / 3600), "hour");
  if (abs < 2592000) return f.format(Math.round(diff / 86400), "day");
  return f.format(Math.round(diff / 2592000), "month");
}

export function initials(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}
