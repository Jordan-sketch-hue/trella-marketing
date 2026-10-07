"use client";
import Link from "next/link";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Bell, Search, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Logo } from "./Logo";
import { cn, initials } from "@/lib/utils";

export type ShellNavItem = { href: string; label: string; icon: LucideIcon; badge?: string };

export function PortalShell({
  title, subtitle, nav, who, children, accent = "brand", storageKey = "tm-sidebar", exitHref = "/",
}: {
  title: string;
  subtitle?: string;
  nav: ShellNavItem[];
  who: { name: string; role: string };
  children: ReactNode;
  accent?: "brand" | "accent" | "ink";
  storageKey?: string;
  exitHref?: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try { if (localStorage.getItem(storageKey) === "1") setCollapsed(true); } catch {}
  }, [storageKey]);

  const toggleCollapse = () => setCollapsed((c) => {
    const next = !c;
    try { localStorage.setItem(storageKey, next ? "1" : "0"); } catch {}
    return next;
  });

  const accentChip = accent === "accent" ? "bg-accent-soft text-accent-700" : accent === "ink" ? "bg-surface-3 text-ink" : "bg-brand-soft text-brand";
  const accentDot = accent === "accent" ? "bg-accent" : accent === "ink" ? "bg-ink" : "bg-brand";
  const sidebarWidth = collapsed ? "lg:w-20" : "lg:w-72";
  const contentPad = collapsed ? "lg:pl-20" : "lg:pl-72";

  return (
    <div className="min-h-screen bg-surface-2">
      {mobileOpen && <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-line bg-white transition-all duration-200 lg:translate-x-0",
        sidebarWidth, mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className={cn("flex h-16 items-center border-b border-line", collapsed ? "lg:justify-center lg:px-2 px-5 justify-between" : "justify-between px-5")}>
          <Link href="/" className="flex items-center lg:overflow-hidden">
            {collapsed ? <span className="hidden lg:inline-flex"><Logo variant="mark" height={30} /></span> : null}
            <span className={collapsed ? "lg:hidden" : ""}><Logo height={30} /></span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-2 lg:hidden"><X className="size-5" /></button>
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-20 z-10 hidden size-6 items-center justify-center rounded-full border border-line bg-white shadow-sm hover:border-ink lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
          </button>
        </div>

        <div className={cn("px-4 pb-3 pt-4", collapsed && "lg:hidden")}>
          <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", accentChip)}>
            <span className={cn("size-1.5 rounded-full", accentDot)} /> {title}
          </div>
        </div>

        <nav className={cn("space-y-0.5 py-2", collapsed ? "lg:px-2 px-3" : "px-3")}>
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/portal" && n.href !== "/admin" && pathname.startsWith(n.href));
            const Icon = n.icon;
            return (
              <Link
                key={n.href} href={n.href} title={collapsed ? n.label : undefined} onClick={() => setMobileOpen(false)}
                className={cn(
                  "group relative flex items-center rounded-lg text-sm transition",
                  collapsed ? "lg:justify-center lg:px-2 lg:py-3 px-3 py-2.5 justify-between gap-3" : "justify-between gap-3 px-3 py-2.5",
                  active ? "bg-brand text-white shadow-sm" : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                )}
              >
                <span className={cn("flex items-center", collapsed ? "lg:gap-0 gap-3" : "gap-3")}>
                  <Icon className="size-4 shrink-0" />
                  <span className={collapsed ? "lg:hidden" : ""}>{n.label}</span>
                </span>
                {n.badge && (
                  <span className={cn("rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white", collapsed && "lg:absolute lg:right-1 lg:top-1 lg:px-1 lg:py-0 lg:text-[9px]")}>
                    {n.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={cn("absolute inset-x-0 bottom-0 border-t border-line", collapsed ? "lg:p-2 p-4" : "p-4")}>
          <div className={cn("flex items-center", collapsed ? "lg:justify-center lg:gap-0 gap-3" : "gap-3")}>
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-white" title={collapsed ? `${who.name} · ${who.role}` : undefined}>
              {initials(who.name)}
            </div>
            <div className={cn("min-w-0 flex-1", collapsed && "lg:hidden")}>
              <div className="truncate text-sm font-semibold">{who.name}</div>
              <div className="truncate text-xs text-ink-soft">{who.role}</div>
            </div>
            <Link href={exitHref} className={cn("rounded p-2 hover:bg-surface-2", collapsed && "lg:hidden")} title="Exit"><LogOut className="size-4" /></Link>
          </div>
        </div>
      </aside>

      <div className={cn("transition-all duration-200", contentPad)}>
        <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
            <button onClick={() => setMobileOpen(true)} className="-ml-2 p-2 lg:hidden"><Menu className="size-5" /></button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-sm font-semibold md:text-base">{title}</h1>
              {subtitle && <p className="hidden truncate text-xs text-ink-soft sm:block">{subtitle}</p>}
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-line px-3 py-1.5 md:flex lg:w-72 w-48">
              <Search className="size-4 text-ink-soft" />
              <input placeholder="Search…" className="w-full bg-transparent text-sm focus:outline-none" />
            </div>
            <button className="relative rounded p-2 hover:bg-surface-2" aria-label="Notifications">
              <Bell className="size-5" />
              <span className="absolute right-1 top-1 size-2 rounded-full bg-accent" />
            </button>
          </div>
        </header>
        <main className="max-w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
