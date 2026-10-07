import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Eye, MousePointerClick, CalendarCheck, TrendingUp, DollarSign, Wallet,
} from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { Bars } from "@/components/charts";
import { PORTAL_CLIENT_ID, clientCampaigns } from "@/lib/data";
import { usd, compact, shortDate } from "@/lib/utils";
import type { CampaignStatus } from "@/lib/types";

const STATUS_TONE: Record<CampaignStatus, "good" | "info" | "warn" | "neutral"> = {
  Active: "good",
  Planning: "info",
  Paused: "warn",
  Completed: "neutral",
};

export function generateStaticParams() {
  return clientCampaigns(PORTAL_CLIENT_ID).map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = clientCampaigns(PORTAL_CLIENT_ID).find((x) => x.id === id);
  return { title: c ? `${c.name} · Campaigns` : "Campaign · Client Portal" };
}

/** Deterministic 6-week distribution from a total — weights sum to 1, no randomness. */
const WEIGHTS = [0.13, 0.15, 0.17, 0.18, 0.19, 0.18];
function weekly(total: number) {
  return WEIGHTS.map((w, i) => ({ label: `Wk ${i + 1}`, value: Math.round(total * w) }));
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = clientCampaigns(PORTAL_CLIENT_ID).find((c) => c.id === id);
  if (!campaign) notFound();

  const usedPct = campaign.budget ? Math.round((campaign.spend / campaign.budget) * 100) : 0;
  const ctr = campaign.impressions ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const convRate = campaign.clicks ? (campaign.conversions / campaign.clicks) * 100 : 0;
  const series = weekly(campaign.conversions);
  const hasData = campaign.impressions > 0;

  return (
    <div className="space-y-6">
      <Link href="/portal/campaigns" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-brand">
        <ArrowLeft className="size-4" /> Back to campaigns
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold sm:text-3xl">{campaign.name}</h2>
            <Badge tone={STATUS_TONE[campaign.status]}>{campaign.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {campaign.objective} · {shortDate(campaign.start)} – {shortDate(campaign.end)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {campaign.channels.map((ch) => (
            <span key={ch} className="rounded-lg bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">{ch}</span>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Impressions" value={compact(campaign.impressions)} icon={Eye} tone="brand" />
        <StatCard label="Clicks" value={compact(campaign.clicks)} delta={`${ctr.toFixed(1)}% CTR`} icon={MousePointerClick} tone="accent" />
        <StatCard label="Conversions" value={compact(campaign.conversions)} delta={`${convRate.toFixed(1)}% conv.`} icon={CalendarCheck} tone="ink" />
        <StatCard label="ROAS" value={campaign.roas ? `${campaign.roas.toFixed(1)}x` : "—"} icon={TrendingUp} tone="good" />
        <StatCard label="Spend" value={usd(campaign.spend)} icon={DollarSign} tone="warn" />
        <StatCard label="Budget" value={usd(campaign.budget)} icon={Wallet} tone="ink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly performance */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Performance</p>
              <p className="text-sm font-semibold">Conversions by week</p>
            </div>
            <Badge tone="brand">{compact(campaign.conversions)} total</Badge>
          </div>
          <div className="p-3">
            {hasData ? (
              <Bars data={series} dataKey="value" height={260} />
            ) : (
              <div className="grid h-[260px] place-items-center text-center">
                <div>
                  <p className="text-sm font-semibold">No data yet</p>
                  <p className="mt-1 text-xs text-ink-soft">This campaign hasn't launched — metrics will appear once it goes live.</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Details */}
        <div className="space-y-6">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Budget pacing</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold">{usd(campaign.spend)}</span>
              <span className="text-sm text-ink-soft">of {usd(campaign.budget)}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-brand" style={{ width: `${usedPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-ink-soft">{usedPct}% of budget spent · {usd(campaign.budget - campaign.spend)} remaining</p>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Details</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Objective</dt>
                <dd className="font-semibold">{campaign.objective}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Channels</dt>
                <dd className="font-semibold">{campaign.channels.join(", ")}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Start</dt>
                <dd className="font-semibold">{shortDate(campaign.start)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">End</dt>
                <dd className="font-semibold">{shortDate(campaign.end)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Progress</dt>
                <dd className="font-semibold">{campaign.progress}%</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
