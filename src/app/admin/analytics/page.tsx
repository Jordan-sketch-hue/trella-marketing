import { DollarSign, Eye, Users, TrendingUp } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { AreaTrend, Bars, Donut, MultiLine, BRAND, BRIGHT, ACCENT } from "@/components/charts";
import { monthlyTrend, channelMix, campaigns, getClient } from "@/lib/data";
import { usd, compact } from "@/lib/utils";

export const metadata = { title: "Analytics · Team Admin" };

export default function AnalyticsPage() {
  const totalRevenue = monthlyTrend.reduce((s, m) => s + m.revenue, 0);
  const totalSpend = monthlyTrend.reduce((s, m) => s + m.spend, 0);
  const totalLeads = monthlyTrend.reduce((s, m) => s + m.leads, 0);
  const blendedRoas = totalSpend ? totalRevenue / totalSpend : 0;

  const donutData = channelMix.map((c) => ({ name: c.channel, value: c.value }));
  const ranked = [...campaigns].filter((c) => c.roas > 0).sort((a, b) => b.roas - a.roas);
  const maxRoas = ranked[0]?.roas ?? 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="mt-1 text-sm text-ink-soft">Cross-client performance across the whole portfolio.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue · 12 mo" value={usd(totalRevenue)} delta="attributed" up icon={DollarSign} tone="brand" />
        <StatCard label="Ad spend · 12 mo" value={usd(totalSpend)} icon={TrendingUp} tone="ink" />
        <StatCard label="Leads · 12 mo" value={compact(totalLeads)} up icon={Users} tone="accent" />
        <StatCard label="Blended ROAS" value={`${blendedRoas.toFixed(1)}x`} delta="revenue ÷ spend" up icon={Eye} tone="good" />
      </div>

      {/* Revenue + spend */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Revenue attributed</p>
            <p className="text-sm font-semibold">Trailing 12 months</p>
          </div>
          <div className="p-3"><AreaTrend data={monthlyTrend} dataKey="revenue" money height={260} /></div>
        </Card>
        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Ad spend</p>
            <p className="text-sm font-semibold">Trailing 12 months</p>
          </div>
          <div className="p-3"><Bars data={monthlyTrend} dataKey="spend" money color={ACCENT} height={260} /></div>
        </Card>
      </div>

      {/* Channel mix + engagement */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Channel mix</p>
            <p className="text-sm font-semibold">Share of engagement</p>
          </div>
          <div className="p-3"><Donut data={donutData} height={260} /></div>
        </Card>
        <Card>
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Audience & demand</p>
            <p className="text-sm font-semibold">Reach, engagement & leads</p>
          </div>
          <div className="p-3">
            <MultiLine
              data={monthlyTrend}
              lines={[
                { key: "reach", color: BRAND, name: "Reach" },
                { key: "engagement", color: BRIGHT, name: "Engagement" },
                { key: "leads", color: ACCENT, name: "Leads" },
              ]}
              height={260}
            />
          </div>
        </Card>
      </div>

      {/* Top campaigns by ROAS */}
      <Card>
        <div className="flex items-center justify-between border-b border-line p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Leaderboard</p>
            <p className="text-sm font-semibold">Top campaigns by ROAS</p>
          </div>
          <Badge tone="good">{ranked.length} ranked</Badge>
        </div>
        <div className="divide-y divide-line">
          {ranked.map((c, i) => {
            const client = getClient(c.clientId);
            return (
              <div key={c.id} className="flex items-center gap-4 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-sm font-bold text-ink-soft">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-ink-soft">{client?.name ?? "—"} · {c.channels.join(", ")}</p>
                </div>
                <div className="hidden w-40 sm:block">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${(c.roas / maxRoas) * 100}%` }} />
                  </div>
                </div>
                <span className="w-14 text-right text-sm font-bold text-brand">{c.roas}x</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
