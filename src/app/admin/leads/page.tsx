import { Mail, Phone, DollarSign, Trophy, Target, UserPlus } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { leads, teamMember } from "@/lib/data";
import type { LeadStage } from "@/lib/types";
import { usd } from "@/lib/utils";

export const metadata = { title: "Leads · Team Admin" };

const STAGES: { key: LeadStage; tone: "info" | "warn" | "brand" | "accent" | "good" | "bad"; bar: string }[] = [
  { key: "New", tone: "info", bar: "bg-sky-400" },
  { key: "Contacted", tone: "warn", bar: "bg-amber-400" },
  { key: "Qualified", tone: "brand", bar: "bg-brand" },
  { key: "Proposal", tone: "accent", bar: "bg-accent" },
  { key: "Won", tone: "good", bar: "bg-emerald-500" },
  { key: "Lost", tone: "bad", bar: "bg-rose-400" },
];

export default function LeadsPage() {
  const openLeads = leads.filter((l) => l.stage !== "Won" && l.stage !== "Lost");
  const pipelineValue = openLeads.reduce((s, l) => s + l.value, 0);
  const wonLeads = leads.filter((l) => l.stage === "Won");
  const wonValue = wonLeads.reduce((s, l) => s + l.value, 0);
  const decided = leads.filter((l) => l.stage === "Won" || l.stage === "Lost").length;
  const winRate = decided ? Math.round((wonLeads.length / decided) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sales pipeline</h2>
        <p className="mt-1 text-sm text-ink-soft">Track every prospect from first touch to signed retainer.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Open pipeline value" value={usd(pipelineValue)} delta={`${openLeads.length} open leads`} icon={DollarSign} tone="brand" />
        <StatCard label="Total leads" value={String(leads.length)} delta="all stages" icon={UserPlus} tone="ink" />
        <StatCard label="Won this cycle" value={String(wonLeads.length)} delta={`${usd(wonValue)} MRR`} up icon={Trophy} tone="good" />
        <StatCard label="Win rate" value={`${winRate}%`} delta={`${decided} decided`} icon={Target} tone="accent" />
      </div>

      {/* Kanban */}
      <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {STAGES.map((stage) => {
          const items = leads.filter((l) => l.stage === stage.key);
          const total = items.reduce((s, l) => s + l.value, 0);
          return (
            <div key={stage.key} className="flex flex-col rounded-2xl border border-line bg-surface-2/60">
              <div className="rounded-t-2xl border-b border-line bg-white px-4 py-3">
                <div className={`mb-2 h-1 w-full rounded-full ${stage.bar}`} />
                <div className="flex items-center justify-between">
                  <Badge tone={stage.tone}>{stage.key}</Badge>
                  <span className="text-xs font-semibold text-ink-soft">{items.length}</span>
                </div>
                <p className="mt-2 text-sm font-bold">{total ? usd(total) : "—"}</p>
              </div>
              <div className="flex-1 space-y-3 p-3">
                {items.map((l) => {
                  const owner = teamMember(l.owner);
                  return (
                    <Card key={l.id} className="p-3 transition hover:-translate-y-0.5 hover:shadow-brand">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold leading-snug">{l.company}</p>
                        <Badge tone="neutral">{l.source}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-soft">{l.contact}</p>
                      <div className="mt-2 flex flex-col gap-1 text-[11px] text-ink-soft">
                        <a href={`mailto:${l.email}`} className="flex items-center gap-1 hover:text-brand"><Mail className="size-3" /> {l.email}</a>
                        <a href={`tel:${l.phone}`} className="flex items-center gap-1 hover:text-brand"><Phone className="size-3" /> {l.phone}</a>
                      </div>
                      <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-ink-soft">{l.note}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                        <span className="text-sm font-bold text-brand">{usd(l.value)}</span>
                        <span className="text-[11px] font-medium text-ink-soft">{owner?.name ?? "—"}</span>
                      </div>
                    </Card>
                  );
                })}
                {items.length === 0 && (
                  <p className="px-1 py-6 text-center text-xs text-ink-soft">No leads</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
