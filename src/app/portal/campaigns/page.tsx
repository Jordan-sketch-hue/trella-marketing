import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { PORTAL_CLIENT_ID, clientCampaigns } from "@/lib/data";
import { usd, compact, shortDate } from "@/lib/utils";
import type { CampaignStatus } from "@/lib/types";

export const metadata = { title: "Campaigns · Client Portal" };

const STATUS_TONE: Record<CampaignStatus, "good" | "info" | "warn" | "neutral"> = {
  Active: "good",
  Planning: "info",
  Paused: "warn",
  Completed: "neutral",
};

export default function CampaignsPage() {
  const campaigns = clientCampaigns(PORTAL_CLIENT_ID);
  const active = campaigns.filter((c) => c.status === "Active").length;
  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const spent = campaigns.filter((c) => c.spend > 0);
  const avgRoas = spent.length ? spent.reduce((s, c) => s + c.roas, 0) / spent.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Campaigns</h2>
        <p className="mt-1 text-sm text-ink-soft">Every paid and organic campaign we're running for your brand.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active campaigns" value={String(active)} icon={Target} tone="brand" />
        <StatCard label="Total spend" value={usd(totalSpend)} tone="ink" />
        <StatCard label="Conversions" value={compact(totalConversions)} tone="accent" />
        <StatCard label="Avg ROAS" value={`${avgRoas.toFixed(1)}x`} tone="good" />
      </div>

      {/* Desktop table */}
      <Card className="hidden overflow-hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3">Channels</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 w-48">Budget</th>
              <th className="px-5 py-3 text-right">ROAS</th>
              <th className="px-5 py-3 text-right">Conversions</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {campaigns.map((c) => {
              const usedPct = c.budget ? Math.round((c.spend / c.budget) * 100) : 0;
              return (
                <tr key={c.id} className="group transition hover:bg-surface-2">
                  <td className="px-5 py-4">
                    <Link href={`/portal/campaigns/${c.id}`} className="font-semibold hover:text-brand">{c.name}</Link>
                    <p className="mt-0.5 text-xs text-ink-soft">{c.objective}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.channels.map((ch) => (
                        <span key={ch} className="rounded-md bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-ink-soft">{ch}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-between text-xs text-ink-soft">
                      <span>{usd(c.spend)} / {usd(c.budget)}</span>
                      <span>{usedPct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${usedPct}%` }} />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-bold">{c.roas ? `${c.roas.toFixed(1)}x` : "—"}</td>
                  <td className="px-5 py-4 text-right">{compact(c.conversions)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/portal/campaigns/${c.id}`} className="inline-flex text-ink-soft transition group-hover:text-brand">
                      <ArrowRight className="size-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Mobile cards */}
      <div className="grid gap-4 lg:hidden">
        {campaigns.map((c) => {
          const usedPct = c.budget ? Math.round((c.spend / c.budget) * 100) : 0;
          return (
            <Link key={c.id} href={`/portal/campaigns/${c.id}`}>
              <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-brand">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{c.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{c.objective}</p>
                  </div>
                  <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.channels.map((ch) => (
                    <span key={ch} className="rounded-md bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-ink-soft">{ch}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-soft">
                  <span>{usd(c.spend)} / {usd(c.budget)}</span>
                  <span>{usedPct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${usedPct}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
                  <span className="text-ink-soft">{shortDate(c.start)} – {shortDate(c.end)}</span>
                  <span className="font-bold text-brand">{c.roas ? `${c.roas.toFixed(1)}x ROAS` : "—"}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
