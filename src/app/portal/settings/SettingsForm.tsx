"use client";

import { useState } from "react";
import { Check, Building2, CreditCard, Bell } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { cn, usd } from "@/lib/utils";
import type { Client } from "@/lib/types";

function Field({
  label, defaultValue, type = "text",
}: {
  label: string; defaultValue: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
      />
    </label>
  );
}

function Toggle({
  label, description, on, onToggle,
}: {
  label: string; description: string; on: boolean; onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-ink-soft">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition", on ? "bg-brand" : "bg-surface-3")}
      >
        <span className={cn("inline-block size-5 transform rounded-full bg-white shadow transition", on ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );
}

export default function SettingsForm({ client }: { client: Client }) {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    approvals: true,
    reports: true,
    campaigns: false,
    invoices: true,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
    setSaved(false);
  };

  const hoursPct = client.retainerHours ? Math.round((client.hoursUsed / client.retainerHours) * 100) : 0;

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Settings</h2>
        <p className="mt-1 text-sm text-ink-soft">Manage your business profile, plan, and notifications.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Business profile */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-line p-5">
            <Building2 className="size-4 text-brand" />
            <p className="text-sm font-semibold">Business profile</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Business name" defaultValue={client.name} />
            <Field label="Contact name" defaultValue={client.contactName} />
            <Field label="Email" type="email" defaultValue={client.email} />
            <Field label="Phone" type="tel" defaultValue={client.phone} />
            <div className="sm:col-span-2">
              <Field label="Industry" defaultValue={client.industry} />
            </div>
          </div>
        </Card>

        {/* Plan card */}
        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line p-5">
            <CreditCard className="size-4 text-brand" />
            <p className="text-sm font-semibold">Your plan</p>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{client.plan}</span>
              <Badge tone="brand">{client.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-ink-soft">{usd(client.mrr)} / month</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink-soft">Retainer hours</span>
                <span className="text-ink-soft">{client.hoursUsed} / {client.retainerHours} hrs</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-3">
                <div className={cn("h-full rounded-full", hoursPct > 90 ? "bg-accent" : "bg-brand")} style={{ width: `${hoursPct}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-ink-soft">{client.retainerHours - client.hoursUsed} hours remaining this month</p>
            </div>

            <Button href="/pricing" variant="outline" size="sm" className="mt-5 w-full">Change plan</Button>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 border-b border-line p-5">
          <Bell className="size-4 text-brand" />
          <p className="text-sm font-semibold">Notifications</p>
        </div>
        <div className="divide-y divide-line px-5 py-2">
          <Toggle label="Content approvals" description="Email me when content needs my approval." on={notifications.approvals} onToggle={() => toggle("approvals")} />
          <Toggle label="Monthly reports" description="Notify me when a new report is published." on={notifications.reports} onToggle={() => toggle("reports")} />
          <Toggle label="Campaign updates" description="Get alerts on campaign milestones and changes." on={notifications.campaigns} onToggle={() => toggle("campaigns")} />
          <Toggle label="Invoices" description="Remind me about new and overdue invoices." on={notifications.invoices} onToggle={() => toggle("invoices")} />
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit">Save changes</Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="size-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
