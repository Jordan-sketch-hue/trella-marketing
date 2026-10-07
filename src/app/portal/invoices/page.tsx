import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { PORTAL_CLIENT_ID, clientInvoices } from "@/lib/data";
import { usd, shortDate } from "@/lib/utils";
import type { InvoiceStatus } from "@/lib/types";

export const metadata = { title: "Invoices · Client Portal" };

const STATUS_TONE: Record<InvoiceStatus, "good" | "info" | "bad" | "neutral"> = {
  Paid: "good",
  Sent: "info",
  Overdue: "bad",
  Draft: "neutral",
};

export default function InvoicesPage() {
  const invoices = [...clientInvoices(PORTAL_CLIENT_ID)].sort((a, b) => b.issued.localeCompare(a.issued));

  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === "Sent" || i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Invoices</h2>
        <p className="mt-1 text-sm text-ink-soft">Your billing history and anything still due.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total paid" value={usd(paid)} icon={CheckCircle2} tone="good" />
        <StatCard label="Outstanding" value={usd(outstanding)} icon={Clock} tone="warn" />
        <StatCard label="Overdue" value={usd(overdue)} icon={AlertTriangle} tone="accent" />
      </div>

      {/* Desktop table */}
      <Card className="hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">
              <th className="px-5 py-3">Invoice</th>
              <th className="px-5 py-3">Issued</th>
              <th className="px-5 py-3">Due</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {invoices.map((inv) => {
              const unpaid = inv.status === "Sent" || inv.status === "Overdue";
              return (
                <tr key={inv.id} className="transition hover:bg-surface-2">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{inv.number}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{inv.items[0]?.desc}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-soft">{shortDate(inv.issued)}</td>
                  <td className="px-5 py-4 text-ink-soft">{shortDate(inv.due)}</td>
                  <td className="px-5 py-4 text-right font-bold">{usd(inv.amount)}</td>
                  <td className="px-5 py-4"><Badge tone={STATUS_TONE[inv.status]}>{inv.status}</Badge></td>
                  <td className="px-5 py-4 text-right">
                    {unpaid ? (
                      <Button variant={inv.status === "Overdue" ? "accent" : "primary"} size="sm">Pay now</Button>
                    ) : (
                      <span className="text-xs text-ink-soft">{inv.status === "Paid" ? "Paid" : "—"}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {invoices.map((inv) => {
          const unpaid = inv.status === "Sent" || inv.status === "Overdue";
          return (
            <Card key={inv.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{inv.number}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{inv.items[0]?.desc}</p>
                </div>
                <Badge tone={STATUS_TONE[inv.status]}>{inv.status}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <div>
                  <p className="text-2xl font-bold">{usd(inv.amount)}</p>
                  <p className="text-xs text-ink-soft">Due {shortDate(inv.due)}</p>
                </div>
                {unpaid && <Button variant={inv.status === "Overdue" ? "accent" : "primary"} size="sm">Pay now</Button>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
