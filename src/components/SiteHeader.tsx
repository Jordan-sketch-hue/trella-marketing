"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LayoutDashboard, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

const serviceItems = [
  { href: "/services#professional-models", label: "Professional Models" },
  { href: "/services#dancers-promo-reps", label: "Dancers & Promo Reps" },
  { href: "/services#event-staffing", label: "Event Staffing" },
  { href: "/services#brand-ambassador", label: "Brand Ambassador" },
];

const nav = [
  { href: "/services", label: "Services", dropdown: serviceItems },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
            if (n.dropdown) {
              return (
                <div key={n.href} className="relative group">
                  <Link
                    href={n.href}
                    className={cn("inline-flex items-center gap-1 transition hover:text-ink", active && "text-brand")}
                  >
                    {n.label}
                    <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                    <div className="min-w-[200px] rounded-xl border border-line bg-white py-1.5 shadow-lg">
                      {n.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          className="block px-4 py-2.5 text-sm text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
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
            {nav.map((n) => {
              if (n.dropdown) {
                return (
                  <div key={n.href}>
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-2"
                    >
                      {n.label}
                      <ChevronDown className={cn("size-4 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    {servicesOpen && (
                      <div className="ml-4 flex flex-col gap-0.5 pb-1">
                        {n.dropdown.map((d) => (
                          <Link
                            key={d.href}
                            href={d.href}
                            onClick={() => { setOpen(false); setServicesOpen(false); }}
                            className="rounded-md px-2 py-2.5 text-sm text-ink-soft hover:bg-surface-2 hover:text-ink"
                          >
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-2">
                  {n.label}
                </Link>
              );
            })}
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
