"use client";
import { useMemo, useState } from "react";
import { Receipt, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { invoices, getClient } from "@/lib/data";
import type { InvoiceStatus } from "@/lib/types";
import { usd, shortDate, cn } from "@/lib/utils";

const STATUSES: (InvoiceStatus | "All")[] = ["All", "Draft", "Sent", "Paid", "Overdue"];

function statusTone(s: string) {
  return s === "Paid" ? "good" : s === "Overdue" ? "bad" : s === "Draft" ? "neutral" : "info";
}

export default function InvoicesPage() {
  const [status, setStatus] = useState<InvoiceStatus | "All">("All");

  const filtered = useMemo(
    () => (status === "All" ? invoices : invoices.filter((i) => i.status === status)),
    [status],
  );

  const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status === "Sent" || i.status === "Overdue")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Billing</h2>
        <p className="mt-1 text-sm text-ink-soft">Invoices issued across all clients.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total invoiced" value={usd(totalInvoiced)} delta={`${invoices.length} invoices`} icon={Receipt} tone="brand" />
        <StatCard label="Paid" value={usd(paid)} up icon={CheckCircle2} tone="good" />
        <StatCard label="Outstanding" value={usd(outstanding)} icon={Clock} tone="warn" />
        <StatCard label="Overdue" value={usd(overdue)} delta={overdue > 0 ? "needs follow-up" : "all clear"} up={overdue === 0} icon={AlertTriangle} tone="accent" />
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
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((inv) => {
                const client = getClient(inv.clientId);
                return (
                  <tr key={inv.id} className="transition hover:bg-surface-2">
                    <td className="px-4 py-3 font-semibold text-ink">{inv.number}</td>
                    <td className="px-4 py-3 text-ink-soft">{client?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-ink-soft">{shortDate(inv.issued)}</td>
                    <td className="px-4 py-3 text-ink-soft">{shortDate(inv.due)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{usd(inv.amount)}</td>
                    <td className="px-4 py-3"><Badge tone={statusTone(inv.status)}>{inv.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-ink-soft">
            <Receipt className="size-8" />
            <p className="text-sm">No invoices in this status.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
