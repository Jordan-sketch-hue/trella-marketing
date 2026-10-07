"use client";
import { useState } from "react";
import { Check, Building2, Palette, CreditCard, Bell } from "lucide-react";
import { Card, Button, Badge } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { brand } from "@/lib/data";
import { cn } from "@/lib/utils";

function Toggle({ on, onChange, label, desc }: { on: boolean; onChange: () => void; label: string; desc: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-ink-soft">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onChange}
        className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition", on ? "bg-brand" : "bg-surface-3")}
      >
        <span className={cn("inline-block size-5 transform rounded-full bg-white shadow transition", on ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({
    leads: true,
    invoices: true,
    reports: false,
    weekly: true,
  });

  const toggle = (k: keyof typeof notif) => {
    setNotif((n) => ({ ...n, [k]: !n[k] }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="mt-1 text-sm text-ink-soft">Manage your agency profile, branding, and notifications.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Check className="size-4" /> Changes saved
            </span>
          )}
          <Button type="submit">Save changes</Button>
        </div>
      </div>

      {/* Company profile */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Building2 className="size-4" /></span>
          <div>
            <h3 className="font-bold">Company profile</h3>
            <p className="text-xs text-ink-soft">Used across invoices, reports, and client comms.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name" defaultValue={brand.name} />
          <Field label="Public email" defaultValue={brand.email} type="email" />
          <Field label="Booking email" defaultValue={brand.bookingEmail} type="email" />
          <Field label="Phone" defaultValue={brand.phone} />
          <div className="sm:col-span-2"><Field label="Address" defaultValue={brand.address} /></div>
          <div className="sm:col-span-2"><Field label="Office hours" defaultValue={brand.hours} /></div>
        </div>
      </Card>

      {/* Branding */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Palette className="size-4" /></span>
          <div>
            <h3 className="font-bold">Branding</h3>
            <p className="text-xs text-ink-soft">Brand colours and logo applied across the workspace.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="rounded-xl border border-line bg-surface-2 px-5 py-4"><Logo height={32} /></div>
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-lg shadow-sm" style={{ backgroundColor: "#16019a" }} />
            <div>
              <p className="text-sm font-semibold">Ultramarine</p>
              <p className="text-xs text-ink-soft">#16019a · primary</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-lg shadow-sm" style={{ backgroundColor: "#ed1c24" }} />
            <div>
              <p className="text-sm font-semibold">Signal red</p>
              <p className="text-xs text-ink-soft">#ed1c24 · accent</p>
            </div>
          </div>
        </div>
        <p className="mt-4 rounded-lg bg-surface-2 p-3 text-xs text-ink-soft">
          Brand assets are managed by your design team. Contact an admin to upload a new logo or adjust the palette.
        </p>
      </Card>

      {/* Billing / plan */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><CreditCard className="size-4" /></span>
          <div>
            <h3 className="font-bold">Billing & plan</h3>
            <p className="text-xs text-ink-soft">Your Trella workspace subscription.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-ink-soft">Current plan</p>
            <p className="mt-1 flex items-center gap-2 font-bold">Agency <Badge tone="brand">Pro</Badge></p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-ink-soft">Billing cycle</p>
            <p className="mt-1 font-bold">Monthly</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-ink-soft">Payment method</p>
            <p className="mt-1 font-bold">•••• 4242</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm">Manage subscription</Button>
          <Button variant="ghost" size="sm">View invoices</Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Bell className="size-4" /></span>
          <div>
            <h3 className="font-bold">Notifications</h3>
            <p className="text-xs text-ink-soft">Choose what lands in your inbox.</p>
          </div>
        </div>
        <div className="divide-y divide-line">
          <Toggle on={notif.leads} onChange={() => toggle("leads")} label="New leads" desc="Email me when a new lead enters the pipeline." />
          <Toggle on={notif.invoices} onChange={() => toggle("invoices")} label="Invoice alerts" desc="Notify on overdue and paid invoices." />
          <Toggle on={notif.reports} onChange={() => toggle("reports")} label="Report ready" desc="Ping me when a client report is generated." />
          <Toggle on={notif.weekly} onChange={() => toggle("weekly")} label="Weekly digest" desc="A Monday summary of portfolio performance." />
        </div>
      </Card>
    </form>
  );
}
