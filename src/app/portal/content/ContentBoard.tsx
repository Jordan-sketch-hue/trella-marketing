"use client";

import { useState } from "react";
import { Check, X, Calendar, CheckCircle2, MessageSquareWarning } from "lucide-react";
import { Badge } from "@/components/ui";
import { shortDate } from "@/lib/utils";
import type { ContentItem, ContentStatus } from "@/lib/types";

const STATUS_TONE: Record<ContentStatus, "good" | "info" | "warn" | "neutral" | "brand"> = {
  Idea: "neutral",
  Drafting: "neutral",
  "In Review": "info",
  "Needs Changes": "warn",
  Approved: "good",
  Scheduled: "brand",
  Published: "neutral",
};

type LocalItem = ContentItem & { note?: string };

function ContentCard({
  item, onApprove, onRequest,
}: {
  item: LocalItem;
  onApprove?: (id: string) => void;
  onRequest?: (id: string) => void;
}) {
  const reviewable = item.status === "In Review" || item.status === "Needs Changes";
  return (
    <div
      // colored left border from item.accent
      className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition hover:shadow-brand"
      style={{ borderLeftWidth: 4, borderLeftColor: item.accent }}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug">{item.title}</h3>
          <Badge tone={STATUS_TONE[item.status]}>{item.status}</Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">{item.channel}</span>
          <span className="rounded-md bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-ink-soft">{item.type}</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
          <Calendar className="size-3.5" /> {shortDate(item.scheduledFor)} · by {item.author}
        </p>
        <p className="mt-3 line-clamp-3 rounded-lg bg-surface-2 p-3 text-sm leading-relaxed text-ink">
          {item.caption}
        </p>
      </div>

      {reviewable && onApprove && onRequest && (
        <div className="mt-4 flex gap-2 border-t border-line pt-4">
          <button
            onClick={() => onApprove(item.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Check className="size-4" /> Approve
          </button>
          <button
            onClick={() => onRequest(item.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink transition hover:border-ink hover:bg-surface-2"
          >
            <X className="size-4" /> Request changes
          </button>
        </div>
      )}

      {item.note && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="size-4 shrink-0" /> {item.note}
        </div>
      )}
    </div>
  );
}

function Section({
  title, icon: Icon, count, children,
}: {
  title: string;
  icon: typeof Calendar;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-brand" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink-soft">{title}</h3>
        <span className="rounded-full bg-surface-3 px-2 py-0.5 text-xs font-semibold text-ink-soft">{count}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  );
}

export default function ContentBoard({ items }: { items: ContentItem[] }) {
  const [state, setState] = useState<LocalItem[]>(items);

  const approve = (id: string) =>
    setState((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Approved", note: "Approved — scheduled to publish." } : c)));
  const requestChanges = (id: string) =>
    setState((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Needs Changes", note: "Changes requested — the team has been notified." } : c)));

  const needsApproval = state.filter((c) => c.status === "In Review" || c.status === "Needs Changes");
  const upcoming = state.filter((c) => c.status === "Scheduled" || c.status === "Approved");
  const published = state.filter((c) => c.status === "Published");
  const drafts = state.filter((c) => c.status === "Idea" || c.status === "Drafting");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Content & approvals</h2>
        <p className="mt-1 text-sm text-ink-soft">Review what's coming up and approve content before it goes live.</p>
      </div>

      <Section title="Needs your approval" icon={MessageSquareWarning} count={needsApproval.length}>
        {needsApproval.map((c) => (
          <ContentCard key={c.id} item={c} onApprove={approve} onRequest={requestChanges} />
        ))}
      </Section>

      {needsApproval.length === 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-emerald-50 p-5">
          <CheckCircle2 className="size-6 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold text-emerald-800">You're all caught up</p>
            <p className="text-sm text-emerald-700">No content is waiting on your approval right now.</p>
          </div>
        </div>
      )}

      <Section title="Scheduled & approved" icon={Calendar} count={upcoming.length}>
        {upcoming.map((c) => <ContentCard key={c.id} item={c} />)}
      </Section>

      <Section title="Drafts & ideas" icon={MessageSquareWarning} count={drafts.length}>
        {drafts.map((c) => <ContentCard key={c.id} item={c} />)}
      </Section>

      <Section title="Published" icon={CheckCircle2} count={published.length}>
        {published.map((c) => <ContentCard key={c.id} item={c} />)}
      </Section>
    </div>
  );
}
