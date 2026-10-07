import { FileBarChart, Plus, Download } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { reports, getClient } from "@/lib/data";
import { shortDate } from "@/lib/utils";

export const metadata = { title: "Reports · Team Admin" };

function typeTone(t: string) {
  return t === "Monthly" ? "brand" : t === "Quarterly" ? "accent" : "info";
}

export default function ReportsPage() {
  const monthly = reports.filter((r) => r.type === "Monthly").length;
  const quarterly = reports.filter((r) => r.type === "Quarterly").length;
  const campaign = reports.filter((r) => r.type === "Campaign").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="mt-1 text-sm text-ink-soft">Performance reports delivered to clients.</p>
        </div>
        <Button>
          <Plus className="size-4" /> Generate report
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total reports" value={String(reports.length)} icon={FileBarChart} tone="brand" />
        <StatCard label="Monthly" value={String(monthly)} tone="ink" />
        <StatCard label="Quarterly" value={String(quarterly)} tone="accent" />
        <StatCard label="Campaign" value={String(campaign)} tone="good" />
      </div>

      {/* Report cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => {
          const client = getClient(r.clientId);
          return (
            <Card key={r.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <FileBarChart className="size-5" />
                  </span>
                  <div>
                    <p className="font-bold leading-snug">{r.title}</p>
                    <p className="text-xs text-ink-soft">{client?.name ?? "—"} · {r.period}</p>
                  </div>
                </div>
                <Badge tone={typeTone(r.type)}>{r.type}</Badge>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{r.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {r.kpis.map((k) => (
                  <span key={k.label} className="rounded-lg bg-surface-2 px-2.5 py-1.5 text-xs">
                    <span className="text-ink-soft">{k.label}: </span>
                    <span className="font-bold text-ink">{k.value}</span>
                    <span className="ml-1 font-semibold text-emerald-600">{k.delta}</span>
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <span className="text-xs text-ink-soft">Published {shortDate(r.date)}</span>
                <Button variant="outline" size="sm"><Download className="size-3.5" /> PDF</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
