"use client";
import { PortalShell, type ShellNavItem } from "@/components/PortalShell";
import {
  LayoutDashboard, Target, Images, FileBarChart, Receipt, MessageSquare, FolderOpen, Settings,
} from "lucide-react";

const nav: ShellNavItem[] = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/campaigns", label: "Campaigns", icon: Target },
  { href: "/portal/content", label: "Content", icon: Images, badge: "1" },
  { href: "/portal/reports", label: "Reports", icon: FileBarChart },
  { href: "/portal/invoices", label: "Invoices", icon: Receipt },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare, badge: "2" },
  { href: "/portal/files", label: "Files", icon: FolderOpen },
  { href: "/portal/settings", label: "Settings", icon: Settings },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      title="Client Portal"
      subtitle="Blue Mahoe Bistro"
      nav={nav}
      who={{ name: "Andre Campbell", role: "Blue Mahoe Bistro" }}
      accent="brand"
      storageKey="tm-portal-sidebar"
    >
      {children}
    </PortalShell>
  );
}
