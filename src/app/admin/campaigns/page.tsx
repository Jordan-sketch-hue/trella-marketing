"use client";
import { useMemo, useState } from "react";
import { DollarSign, MousePointerClick, TrendingUp, Megaphone } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { campaigns, getClient } from "@/lib/data";
import type { CampaignStatus } from "@/lib/types";
import { usd, cn } from "@/lib/utils";

const STATUSES: (CampaignStatus | "All")[] = ["All", "Active", "Planning", "Paused", "Completed"];

function statusTone(s: string) {
  return s === "Active" ? "good" : s === "Planning" ? "info" : s === "Completed" ? "neutral" : "warn";
}

export default function CampaignsPage() {
  const [status, setStatus] = useState<CampaignStatus | "All">("All");

  const filtered = useMemo(
    () => (status === "All" ? campaigns : campaigns.filter((c) => c.status === status)),
    [status],
  );

  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const liveCampaigns = campaigns.filter((c) => c.status === "Active");
  const avgRoas = liveCampaigns.reduce((s, c) => s + c.roas, 0) / liveCampaigns.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <p className="mt-1 text-sm text-ink-soft">Every paid and organic campaign across the portfolio.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total spend" value={usd(totalSpend)} delta="all campaigns" icon={DollarSign} tone="brand" />
        <StatCard label="Total conversions" value={totalConversions.toLocaleString()} up icon={MousePointerClick} tone="accent" />
        <StatCard label="Avg ROAS · active" value={`${avgRoas.toFixed(1)}x`} up icon={TrendingUp} tone="good" />
        <StatCard label="Active campaigns" value={String(liveCampaigns.length)} delta={`${campaigns.length} total`} icon={Megaphone} tone="ink" />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold transition",
              status === s ? "bg-brand text-white" : "border border-line text-ink-soft hover:bg-surface-2",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Channels</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-44">Spend / budget</th>
                <th className="px-4 py-3">ROAS</th>
                <th className="px-4 py-3">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((c) => {
                const client = getClient(c.clientId);
                return (
                  <tr key={c.id} className="transition hover:bg-surface-2">
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-ink">{c.name}</span>
                      <span className="block text-xs text-ink-soft">{c.objective}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{client?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.channels.map((ch) => (
                          <span key={ch} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft">{ch}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between text-xs text-ink-soft">
                        <span>{usd(c.spend)}</span>
                        <span>{usd(c.budget)}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                        <span className="block h-full rounded-full bg-brand" style={{ width: `${Math.min(100, c.budget ? (c.spend / c.budget) * 100 : 0)}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{c.roas ? `${c.roas}x` : "—"}</td>
                    <td className="px-4 py-3 font-semibold">{c.conversions.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-ink-soft">
            <Megaphone className="size-8" />
            <p className="text-sm">No campaigns in this status.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
