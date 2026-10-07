import Link from "next/link";
import {
  ArrowRight, Eye, Heart, CalendarCheck, TrendingUp, Sparkles, MessageSquare, FileBarChart,
  Receipt, Target, Clock, type LucideIcon,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { AreaTrend, MultiLine } from "@/components/charts";
import {
  PORTAL_CLIENT_ID, getClient, clientCampaigns, clientContent, activities, monthlyTrend,
} from "@/lib/data";
import { compact, usd, relTime, shortDate } from "@/lib/utils";

export const metadata = { title: "Dashboard · Client Portal" };

const ACTIVITY_ICON: Record<string, LucideIcon> = {
  content: Sparkles, campaign: Target, invoice: Receipt, lead: TrendingUp,
  message: MessageSquare, report: FileBarChart,
};

export default function PortalDashboard() {
  const client = getClient(PORTAL_CLIENT_ID)!;
  const campaigns = clientCampaigns(PORTAL_CLIENT_ID);
  const content = clientContent(PORTAL_CLIENT_ID);

  // Derive headline metrics from this client's campaigns
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const spent = campaigns.filter((c) => c.spend > 0);
  const avgRoas = spent.length ? spent.reduce((s, c) => s + c.roas, 0) / spent.length : 0;
  const engagementRate = totalImpressions ? (totalClicks / totalImpressions) * 100 : 0;

  const activeCampaigns = campaigns.filter((c) => c.status === "Active");
  const needsApproval = content.filter((c) => c.status === "In Review" || c.status === "Needs Changes");
  const scheduled = content
    .filter((c) => c.status === "Scheduled" || c.status === "Approved")
    .sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor));

  // Activity: this client's events first, then general agency events
  const feed = [...activities]
    .filter((a) => a.clientId === PORTAL_CLIENT_ID || !a.clientId)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{shortDate("2026-05-29")}</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Welcome back, Andre 👋</h2>
          <p className="mt-1 text-sm text-ink-soft">Here's how {client.name} is performing this month.</p>
        </div>
        <Button href="/portal/reports" variant="outline" size="sm">
          View reports <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total reach" value={compact(totalImpressions)} delta="+22% vs last month" up icon={Eye} tone="brand" />
        <StatCard label="Engagement rate" value={`${engagementRate.toFixed(1)}%`} delta="+0.4pp" up icon={Heart} tone="accent" />
        <StatCard label="Reservations" value={compact(totalConversions)} delta="+38% MoM" up icon={CalendarCheck} tone="ink" />
        <StatCard label="Avg ROAS" value={`${avgRoas.toFixed(1)}x`} delta="across active campaigns" icon={TrendingUp} tone="good" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Reach</p>
              <p className="text-sm font-semibold">Monthly reach · last 12 months</p>
            </div>
            <Badge tone="good">Trending up</Badge>
          </div>
          <div className="p-3">
            <AreaTrend data={monthlyTrend} dataKey="reach" height={240} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Audience</p>
            <p className="text-sm font-semibold">Engagement vs leads</p>
          </div>
          <div className="p-3">
            <MultiLine
              data={monthlyTrend}
              height={240}
              lines={[
                { key: "engagement", color: "#16019a", name: "Engagement" },
                { key: "leads", color: "#ed1c24", name: "Leads" },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active campaigns */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Live now</p>
              <p className="text-sm font-semibold">Active campaigns</p>
            </div>
            <Button href="/portal/campaigns" variant="ghost" size="sm">All <ArrowRight className="size-4" /></Button>
          </div>
          <div className="divide-y divide-line">
            {activeCampaigns.length === 0 && (
              <p className="p-5 text-sm text-ink-soft">No active campaigns right now.</p>
            )}
            {activeCampaigns.map((c) => {
              const usedPct = c.budget ? Math.round((c.spend / c.budget) * 100) : 0;
              return (
                <Link key={c.id} href={`/portal/campaigns/${c.id}`} className="block p-5 transition hover:bg-surface-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{c.name}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">{c.objective} · {c.channels.join(", ")}</p>
                    </div>
                    <span className="rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">{c.roas.toFixed(1)}x ROAS</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-ink-soft">
                    <span>{usd(c.spend)} of {usd(c.budget)} spent</span>
                    <span>{usedPct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${usedPct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Needs approval */}
        <Card>
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Action needed</p>
              <p className="text-sm font-semibold">Needs your approval</p>
            </div>
            {needsApproval.length > 0 && <Badge tone="accent">{needsApproval.length}</Badge>}
          </div>
          <div className="p-3">
            {needsApproval.length === 0 ? (
              <p className="p-2 text-sm text-ink-soft">You're all caught up — nothing waiting on you.</p>
            ) : (
              <ul className="space-y-2">
                {needsApproval.map((c) => (
                  <li key={c.id}>
                    <Link
                      href="/portal/content"
                      className="block rounded-xl border border-line p-3 transition hover:border-ink hover:bg-surface-2"
                      style={{ borderLeftColor: c.accent, borderLeftWidth: 3 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{c.title}</p>
                        <Badge tone={c.status === "Needs Changes" ? "warn" : "info"}>{c.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-soft">{c.channel} · {c.type} · {shortDate(c.scheduledFor)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Button href="/portal/content" variant="outline" size="sm" className="mt-3 w-full">Open content calendar</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity feed */}
        <Card className="lg:col-span-2">
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Latest</p>
            <p className="text-sm font-semibold">Recent activity</p>
          </div>
          <ul className="divide-y divide-line">
            {feed.map((a) => {
              const ActIcon = ACTIVITY_ICON[a.type] ?? Sparkles;
              return (
                <li key={a.id} className="flex items-start gap-3 p-4">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <ActIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm"><span className="font-semibold">{a.who}</span> {a.text}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{relTime(a.at)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Upcoming scheduled */}
        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">On the calendar</p>
            <p className="text-sm font-semibold">Upcoming content</p>
          </div>
          <ul className="divide-y divide-line">
            {scheduled.length === 0 && <li className="p-5 text-sm text-ink-soft">Nothing scheduled yet.</li>}
            {scheduled.map((c) => (
              <li key={c.id} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-soft">
                  <Clock className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{shortDate(c.scheduledFor)} · {c.channel}</p>
                </div>
                <Badge tone={c.status === "Approved" ? "good" : "neutral"}>{c.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
