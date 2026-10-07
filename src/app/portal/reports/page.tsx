import { Download, FileBarChart, Calendar } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { PORTAL_CLIENT_ID, clientReports } from "@/lib/data";
import { shortDate } from "@/lib/utils";
import type { Report } from "@/lib/types";

export const metadata = { title: "Reports · Client Portal" };

const TYPE_TONE: Record<Report["type"], "brand" | "accent" | "info"> = {
  Monthly: "brand",
  Quarterly: "accent",
  Campaign: "info",
};

export default function ReportsPage() {
  const reports = [...clientReports(PORTAL_CLIENT_ID)].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Reports</h2>
        <p className="mt-1 text-sm text-ink-soft">Performance reports and strategy reviews for your account.</p>
      </div>

      {reports.length === 0 ? (
        <Card className="p-8 text-center text-sm text-ink-soft">No reports published yet.</Card>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id} className="p-5 transition hover:shadow-brand sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
                    <FileBarChart className="size-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{r.title}</h3>
                      <Badge tone={TYPE_TONE[r.type]}>{r.type}</Badge>
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                      <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" /> {r.period}</span>
                      <span>Published {shortDate(r.date)}</span>
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="size-4" /> Download PDF
                </Button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{r.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {r.kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-line bg-surface-2 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">{k.label}</p>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-base font-bold">{k.value}</span>
                      <span className="text-xs font-medium text-emerald-600">{k.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
