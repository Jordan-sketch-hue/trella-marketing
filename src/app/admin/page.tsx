import Link from "next/link";
import {
  DollarSign, Users, UserPlus, TrendingUp, ArrowUpRight, Activity as ActivityIcon,
  CalendarCheck, Megaphone, FileBarChart, Receipt, MessageSquare, Sparkles,
} from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { AreaTrend, MultiLine, Donut, BRAND, BRIGHT, ACCENT } from "@/components/charts";
import { clients, leads, campaigns, monthlyTrend, channelMix, activities } from "@/lib/data";
import type { LeadStage } from "@/lib/types";
import { usd, relTime, cn } from "@/lib/utils";

export const metadata = { title: "Dashboard · Team Admin" };

const STAGE_TONE: Record<LeadStage, "info" | "warn" | "brand" | "accent" | "good" | "bad"> = {
  New: "info", Contacted: "warn", Qualified: "brand", Proposal: "accent", Won: "good", Lost: "bad",
};
const ACT_ICON = {
  content: CalendarCheck, campaign: Megaphone, report: FileBarChart,
  invoice: Receipt, message: MessageSquare, lead: UserPlus,
} as const;

function healthTone(h: number) {
  return h >= 85 ? "bg-emerald-500" : h >= 70 ? "bg-amber-500" : "bg-rose-500";
}
function statusTone(s: string) {
  return s === "Active" ? "good" : s === "Onboarding" ? "info" : "warn";
}

export default function AdminDashboard() {
  const mrr = clients.reduce((s, c) => s + c.mrr, 0);
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const openLeads = leads.filter((l) => l.stage !== "Won" && l.stage !== "Lost");
  const activeCampaigns = campaigns.filter((c) => c.status === "Active");
  const avgRoas = activeCampaigns.reduce((s, c) => s + c.roas, 0) / activeCampaigns.length;

  const stages: LeadStage[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
  const pipeline = stages.map((stage) => ({
    stage,
    count: leads.filter((l) => l.stage === stage).length,
    value: leads.filter((l) => l.stage === stage).reduce((s, l) => s + l.value, 0),
  }));
  const pipelineValue = openLeads.reduce((s, l) => s + l.value, 0);

  const donutData = channelMix.map((c) => ({ name: c.channel, value: c.value }));
  const sortedClients = [...clients].sort((a, b) => b.mrr - a.mrr);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Agency overview</h2>
          <p className="mt-1 text-sm text-ink-soft">Performance across every client, campaign, and channel.</p>
        </div>
        <Badge tone="good">All systems healthy</Badge>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Monthly recurring revenue" value={usd(mrr)} delta="+8.4% vs last month" up icon={DollarSign} tone="brand" />
        <StatCard label="Active clients" value={String(activeClients)} delta={`${clients.length} total accounts`} icon={Users} tone="accent" />
        <StatCard label="Open leads" value={String(openLeads.length)} delta={`${usd(pipelineValue)} potential`} up icon={UserPlus} tone="ink" />
        <StatCard label="Avg ROAS · active" value={`${avgRoas.toFixed(1)}x`} delta="across live campaigns" up icon={TrendingUp} tone="good" />
      </div>

      {/* Revenue + channel mix */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Revenue attributed</p>
              <p className="text-sm font-semibold">Last 12 months</p>
            </div>
            <Badge tone="good">+111% YoY</Badge>
          </div>
          <div className="p-3">
            <AreaTrend data={monthlyTrend} dataKey="revenue" money height={260} />
          </div>
        </Card>

        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Channel mix</p>
            <p className="text-sm font-semibold">Share of engagement</p>
          </div>
          <div className="p-3">
            <Donut data={donutData} height={244} />
          </div>
        </Card>
      </div>

      {/* Engagement multiline */}
      <Card>
        <div className="border-b border-line p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Audience & demand</p>
          <p className="text-sm font-semibold">Reach, engagement & leads · trailing 12 months</p>
        </div>
        <div className="p-3">
          <MultiLine
            data={monthlyTrend}
            lines={[
              { key: "reach", color: BRAND, name: "Reach" },
              { key: "engagement", color: BRIGHT, name: "Engagement" },
              { key: "leads", color: ACCENT, name: "Leads" },
            ]}
            height={280}
          />
        </div>
      </Card>

      {/* Client health + pipeline */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Client health</p>
              <p className="text-sm font-semibold">{clients.length} accounts</p>
            </div>
            <Link href="/admin/clients" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">
              View all <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="divide-y divide-line">
            {sortedClients.map((c) => (
              <Link key={c.id} href={`/admin/clients/${c.id}`} className="flex items-center gap-4 p-4 transition hover:bg-surface-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: c.accent }}>
                  {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <span className={cn("block h-full rounded-full", healthTone(c.health))} style={{ width: `${c.health}%` }} />
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">{c.mrr ? usd(c.mrr) : "—"}</p>
                  <p className="text-xs text-ink-soft">{c.health}% health</p>
                </div>
                <Badge tone={statusTone(c.status)}>{c.status}</Badge>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Pipeline</p>
              <p className="text-sm font-semibold">{usd(pipelineValue)} in play</p>
            </div>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">
              Open <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="space-y-1 p-3">
            {pipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-surface-2">
                <span className="flex items-center gap-2">
                  <Badge tone={STAGE_TONE[p.stage]}>{p.stage}</Badge>
                  <span className="text-sm text-ink-soft">{p.count} {p.count === 1 ? "lead" : "leads"}</span>
                </span>
                <span className="text-sm font-semibold">{p.value ? usd(p.value) : "—"}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card>
        <div className="flex items-center gap-2 border-b border-line p-5">
          <ActivityIcon className="size-4 text-brand" />
          <p className="text-sm font-semibold">Recent activity</p>
        </div>
        <div className="divide-y divide-line">
          {activities.map((a) => {
            const Icon = ACT_ICON[a.type] ?? Sparkles;
            return (
              <div key={a.id} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{a.who}</span> <span className="text-ink-soft">{a.text}</span>
                  </p>
                  <p className="text-xs text-ink-soft">{relTime(a.at)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
