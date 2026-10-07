import Link from "next/link";
import { Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

export function Eyebrow({ children, className, onDark }: { children: ReactNode; className?: string; onDark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]", onDark ? "text-white/80" : "text-brand", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", onDark ? "bg-accent" : "bg-accent")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, lead, align = "left", onDark, className,
}: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; onDark?: boolean; className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 className={cn("mt-3 text-3xl sm:text-4xl font-bold", onDark ? "text-white" : "text-ink")}>{title}</h2>
      {lead && <p className={cn("mt-4 text-base sm:text-lg leading-relaxed", onDark ? "text-white/70" : "text-ink-soft")}>{lead}</p>}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "accent" | "dark" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  target?: string;
};

export function Button({ children, href, variant = "primary", size = "md", className, type, target }: ButtonProps) {
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-700",
    accent: "bg-accent text-white hover:bg-accent-700",
    dark: "bg-ink text-white hover:bg-ink-soft",
    outline: "border border-line text-ink hover:border-ink hover:bg-surface-2",
    ghost: "text-brand hover:bg-brand-soft",
    white: "bg-white text-brand hover:bg-white/90",
  } as const;
  const sizes = { sm: "px-3.5 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3 text-base" } as const;
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
    variants[variant], sizes[size], className,
  );
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel") || href.startsWith("https://wa.me");
    if (external) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls}>{children}</a>;
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button type={type ?? "button"} className={cls}>{children}</button>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-line bg-white", className)}>{children}</div>;
}

export function Badge({
  children, tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "accent" | "good" | "warn" | "bad" | "dark" | "info";
}) {
  const t = {
    neutral: "bg-surface-3 text-ink-soft",
    brand: "bg-brand-soft text-brand",
    accent: "bg-accent-soft text-accent-700",
    good: "bg-emerald-100 text-emerald-700",
    warn: "bg-amber-100 text-amber-700",
    bad: "bg-rose-100 text-rose-700",
    info: "bg-sky-100 text-sky-700",
    dark: "bg-ink text-white",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap", t[tone])}>
      {children}
    </span>
  );
}

export function IconTile({ children, tone = "brand", className }: { children: ReactNode; tone?: "brand" | "accent" | "ink"; className?: string }) {
  const tones = { brand: "bg-brand text-white", accent: "bg-accent text-white", ink: "bg-ink text-white" } as const;
  return (
    <span className={cn("inline-flex size-11 items-center justify-center rounded-xl shadow-sm [&_svg]:size-5", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Stars({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-accent", className)}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
    </span>
  );
}

/** Big marketing stat */
export function Stat({ value, label, sub, onDark }: { value: string; label: string; sub?: string; onDark?: boolean }) {
  return (
    <div>
      <div className={cn("text-3xl sm:text-4xl font-bold tracking-tight", onDark ? "text-white" : "text-gradient")}>{value}</div>
      <div className={cn("mt-1 text-sm font-semibold", onDark ? "text-white/90" : "text-ink")}>{label}</div>
      {sub && <div className={cn("text-xs", onDark ? "text-white/55" : "text-ink-soft")}>{sub}</div>}
    </div>
  );
}

/** Gradient-tinted cover tile from a hex (no external images) */
export function CoverTile({ hex, label, className, children }: { hex: string; label?: string; className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${hex} 0%, ${hex}cc 55%, #08013f 140%)` }}
    >
      <div className="absolute inset-0 dot-grid opacity-30" />
      {label && <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{label}</span>}
      {children}
    </div>
  );
}

/** Dashboard stat card (server-safe — can be rendered from server pages with an icon) */
export function StatCard({
  label, value, delta, icon: Icon, tone = "brand", up,
}: {
  label: string; value: string; delta?: string; icon?: LucideIcon; tone?: "brand" | "accent" | "ink" | "good" | "warn"; up?: boolean;
}) {
  const tones = {
    brand: "bg-brand text-white", accent: "bg-accent text-white", ink: "bg-ink text-white",
    good: "bg-emerald-500 text-white", warn: "bg-amber-500 text-white",
  } as const;
  return (
    <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:text-xs">{label}</span>
        {Icon && <span className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-lg", tones[tone])}><Icon className="size-4" /></span>}
      </div>
      <div className="mt-3 text-xl font-bold text-ink sm:text-2xl md:text-3xl">{value}</div>
      {delta && <div className={cn("mt-1 text-xs font-medium", up === undefined ? "text-ink-soft" : up ? "text-emerald-600" : "text-rose-600")}>{delta}</div>}
    </div>
  );
}
