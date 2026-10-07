import { CalendarDays, User } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { contentItems, getClient } from "@/lib/data";
import type { ContentStatus } from "@/lib/types";
import { shortDate } from "@/lib/utils";

export const metadata = { title: "Content · Team Admin" };

const COLUMNS: { key: ContentStatus; tone: "neutral" | "info" | "warn" | "accent" | "brand" | "good"; bar: string }[] = [
  { key: "Idea", tone: "neutral", bar: "bg-slate-300" },
  { key: "Drafting", tone: "info", bar: "bg-sky-400" },
  { key: "In Review", tone: "warn", bar: "bg-amber-400" },
  { key: "Needs Changes", tone: "accent", bar: "bg-accent" },
  { key: "Approved", tone: "brand", bar: "bg-brand" },
  { key: "Scheduled", tone: "info", bar: "bg-indigo-400" },
  { key: "Published", tone: "good", bar: "bg-emerald-500" },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content board</h2>
        <p className="mt-1 text-sm text-ink-soft">Every piece in production across all clients.</p>
      </div>

      {/* Status counts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {COLUMNS.map((col) => {
          const count = contentItems.filter((c) => c.status === col.key).length;
          return (
            <Card key={col.key} className="p-3">
              <div className={`mb-2 h-1 w-full rounded-full ${col.bar}`} />
              <p className="text-xs font-semibold text-ink-soft">{col.key}</p>
              <p className="mt-0.5 text-xl font-bold">{count}</p>
            </Card>
          );
        })}
      </div>

      {/* Columns */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const items = contentItems.filter((c) => c.status === col.key);
          return (
            <div key={col.key} className="flex flex-col rounded-2xl border border-line bg-surface-2/60">
              <div className="flex items-center justify-between rounded-t-2xl border-b border-line bg-white px-4 py-3">
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.bar}`} />
                  <span className="text-sm font-bold">{col.key}</span>
                </span>
                <Badge tone={col.tone}>{items.length}</Badge>
              </div>
              <div className="flex-1 space-y-3 p-3">
                {items.map((item) => {
                  const client = getClient(item.clientId);
                  return (
                    <Card key={item.id} className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-brand">
                      <div className="h-1 w-full" style={{ backgroundColor: item.accent }} />
                      <div className="p-3">
                        <p className="text-sm font-bold leading-snug">{item.title}</p>
                        <p className="mt-1 text-xs font-medium" style={{ color: item.accent }}>{client?.name ?? "—"}</p>
                        <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-ink-soft">{item.caption}</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          <Badge tone="brand">{item.type}</Badge>
                          <Badge tone="neutral">{item.channel}</Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-[11px] text-ink-soft">
                          <span className="flex items-center gap-1"><CalendarDays className="size-3" /> {shortDate(item.scheduledFor)}</span>
                          <span className="flex items-center gap-1"><User className="size-3" /> {item.author.split(" ")[0]}</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                {items.length === 0 && (
                  <p className="px-1 py-6 text-center text-xs text-ink-soft">Nothing here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
