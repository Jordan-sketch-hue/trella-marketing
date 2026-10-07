"use client";
import { PortalShell, type ShellNavItem } from "@/components/PortalShell";
import {
  LayoutDashboard, Users, UserPlus, Target, CalendarDays, FileBarChart, Receipt, BarChart3, UsersRound, Settings,
} from "lucide-react";

const nav: ShellNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/leads", label: "Leads", icon: UserPlus, badge: "3" },
  { href: "/admin/campaigns", label: "Campaigns", icon: Target },
  { href: "/admin/content", label: "Content", icon: CalendarDays },
  { href: "/admin/reports", label: "Reports", icon: FileBarChart },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt, badge: "1" },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/team", label: "Team", icon: UsersRound },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      title="Team Admin"
      subtitle="Trella Marketing Consultant"
      nav={nav}
      who={{ name: "Tanya Reid", role: "Founder · Admin" }}
      accent="accent"
      storageKey="tm-admin-sidebar"
    >
      {children}
    </PortalShell>
  );
}
