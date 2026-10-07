"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-6 py-3">
        <Link href="/" aria-label="Trella Marketing Consultant — home">
          <Logo priority height={36} />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink-soft">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link key={n.href} href={n.href} className={cn("transition hover:text-ink", active && "text-brand")}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/portal" className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-ink-soft hover:text-ink">
            <LayoutDashboard className="size-4" /> Client Login
          </Link>
          <Button href="/book" size="sm">Book a call <ArrowRight className="size-4" /></Button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="lg:hidden rounded-md border border-line p-2" aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-2">
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <Button href="/portal" variant="outline" size="md"><LayoutDashboard className="size-4" /> Client Login</Button>
              <Button href="/book" size="md">Book a call</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
