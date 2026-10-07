import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Mail, Phone, Building2, CalendarDays, DollarSign, Activity as ActivityIcon,
  Clock, Megaphone, CalendarCheck, FileBarChart, Receipt, UserRound,
} from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import {
  clients, getClient, clientCampaigns, clientContent, clientReports, clientInvoices, teamMember,
} from "@/lib/data";
import type { Metadata } from "next";
import { usd, shortDate, cn } from "@/lib/utils";

export function generateStaticParams() {
  return clients.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const client = getClient(id);
  return { title: client ? `${client.name} · Clients` : "Client · Admin" };
}

function statusTone(s: string) {
  return s === "Active" ? "good" : s === "Onboarding" ? "info" : "warn";
}
function healthTone(h: number) {
  return h >= 85 ? "bg-emerald-500" : h >= 70 ? "bg-amber-500" : "bg-rose-500";
}
function campaignTone(s: string) {
  return s === "Active" ? "good" : s === "Planning" ? "info" : s === "Completed" ? "neutral" : "warn";
}
const CONTENT_TONE: Record<string, "neutral" | "info" | "warn" | "brand" | "good" | "accent"> = {
  Idea: "neutral", Drafting: "info", "In Review": "warn", "Needs Changes": "accent",
  Approved: "brand", Scheduled: "info", Published: "good",
};
function invoiceTone(s: string) {
  return s === "Paid" ? "good" : s === "Overdue" ? "bad" : s === "Draft" ? "neutral" : "info";
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getClient(id);
  if (!client) notFound();

  const owner = teamMember(client.owner);
  const campaigns = clientCampaigns(id);
  const content = clientContent(id);
  const reports = clientReports(id);
  const invoices = clientInvoices(id);

  return (
    <div className="space-y-6">
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink">
        <ArrowLeft className="size-4" /> All clients
      </Link>

      {/* Header */}
      <Card className="overflow-hidden">
        <div className="h-2 w-full" style={{ backgroundColor: client.accent }} />
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white shadow-sm" style={{ backgroundColor: client.accent }}>
              {client.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">{client.name}</h2>
                <Badge tone={statusTone(client.status)}>{client.status}</Badge>
                <Badge tone="brand">{client.plan}</Badge>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                <Building2 className="size-3.5" /> {client.industry} · Client since {shortDate(client.since)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {client.tags.map((t) => (
                  <span key={t} className="rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-semibold text-ink-soft">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-2 text-sm sm:text-right">
            <span className="flex items-center gap-2 sm:justify-end"><UserRound className="size-3.5 text-ink-soft" /> {client.contactName}</span>
            <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-ink-soft hover:text-brand sm:justify-end"><Mail className="size-3.5" /> {client.email}</a>
            <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-ink-soft hover:text-brand sm:justify-end"><Phone className="size-3.5" /> {client.phone}</a>
            <span className="flex items-center gap-2 text-ink-soft sm:justify-end"><ActivityIcon className="size-3.5" /> Owner: {owner?.name ?? "—"}</span>
          </div>
        </div>
      </Card>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Monthly retainer" value={client.mrr ? usd(client.mrr) : "Paused"} icon={DollarSign} tone="brand" />
        <StatCard label="Account health" value={`${client.health}%`} icon={ActivityIcon} tone={client.health >= 85 ? "good" : client.health >= 70 ? "warn" : "accent"} />
        <StatCard label="Retainer hours" value={`${client.hoursUsed}/${client.retainerHours}h`} delta={`${Math.round((client.hoursUsed / client.retainerHours) * 100)}% used`} icon={Clock} tone="ink" />
        <StatCard label="Active campaigns" value={String(campaigns.filter((c) => c.status === "Active").length)} delta={`${campaigns.length} total`} icon={Megaphone} tone="accent" />
      </div>

      {/* Health + retainer detail */}
      <Card className="p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Account health</span>
              <span className="text-ink-soft">{client.health}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-3">
              <span className={cn("block h-full rounded-full", healthTone(client.health))} style={{ width: `${client.health}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Retainer utilisation</span>
              <span className="text-ink-soft">{client.hoursUsed} / {client.retainerHours} hrs</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-3">
              <span className="block h-full rounded-full bg-brand" style={{ width: `${Math.min(100, (client.hoursUsed / client.retainerHours) * 100)}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Campaigns */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Megaphone className="size-4 text-brand" />
          <h3 className="text-lg font-bold">Campaigns</h3>
          <span className="text-sm text-ink-soft">({campaigns.length})</span>
        </div>
        {campaigns.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {campaigns.map((c) => (
              <Card key={c.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-ink-soft">{c.objective} · {c.channels.join(", ")}</p>
                  </div>
                  <Badge tone={campaignTone(c.status)}>{c.status}</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span>{usd(c.spend)} / {usd(c.budget)}</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-surface-2 px-3 py-2"><span className="block text-xs text-ink-soft">ROAS</span><span className="font-bold">{c.roas ? `${c.roas}x` : "—"}</span></div>
                  <div className="rounded-lg bg-surface-2 px-3 py-2"><span className="block text-xs text-ink-soft">Conversions</span><span className="font-bold">{c.conversions.toLocaleString()}</span></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-sm text-ink-soft">No campaigns yet.</Card>
        )}
      </section>

      {/* Content */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarCheck className="size-4 text-brand" />
          <h3 className="text-lg font-bold">Content</h3>
          <span className="text-sm text-ink-soft">({content.length})</span>
        </div>
        {content.length ? (
          <Card className="divide-y divide-line">
            {content.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.title}</p>
                  <p className="text-xs text-ink-soft">{item.channel} · {item.type} · {item.author}</p>
                </div>
                <span className="text-xs text-ink-soft">{shortDate(item.scheduledFor)}</span>
                <Badge tone={CONTENT_TONE[item.status] ?? "neutral"}>{item.status}</Badge>
              </div>
            ))}
          </Card>
        ) : (
          <Card className="p-6 text-sm text-ink-soft">No content scheduled.</Card>
        )}
      </section>

      {/* Reports + Invoices */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <FileBarChart className="size-4 text-brand" />
            <h3 className="text-lg font-bold">Reports</h3>
            <span className="text-sm text-ink-soft">({reports.length})</span>
          </div>
          {reports.length ? (
            <Card className="divide-y divide-line">
              {reports.map((r) => (
                <div key={r.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-xs text-ink-soft">{r.period} · {shortDate(r.date)}</p>
                    </div>
                    <Badge tone="brand">{r.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{r.summary}</p>
                </div>
              ))}
            </Card>
          ) : (
            <Card className="p-6 text-sm text-ink-soft">No reports published.</Card>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Receipt className="size-4 text-brand" />
            <h3 className="text-lg font-bold">Invoices</h3>
            <span className="text-sm text-ink-soft">({invoices.length})</span>
          </div>
          {invoices.length ? (
            <Card className="divide-y divide-line">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-semibold">{inv.number}</p>
                    <p className="text-xs text-ink-soft flex items-center gap-1"><CalendarDays className="size-3" /> Due {shortDate(inv.due)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{usd(inv.amount)}</p>
                    <Badge tone={invoiceTone(inv.status)}>{inv.status}</Badge>
                  </div>
                </div>
              ))}
            </Card>
          ) : (
            <Card className="p-6 text-sm text-ink-soft">No invoices yet.</Card>
          )}
        </section>
      </div>
    </div>
  );
}
