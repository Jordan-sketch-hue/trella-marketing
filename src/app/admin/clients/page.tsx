"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Users } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { clients, teamMember } from "@/lib/data";
import type { ClientStatus } from "@/lib/types";
import { usd, cn } from "@/lib/utils";

const STATUSES: (ClientStatus | "All")[] = ["All", "Active", "Onboarding", "Paused"];

function statusTone(s: string) {
  return s === "Active" ? "good" : s === "Onboarding" ? "info" : "warn";
}
function healthTone(h: number) {
  return h >= 85 ? "bg-emerald-500" : h >= 70 ? "bg-amber-500" : "bg-rose-500";
}
function tile(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
      const matchS = status === "All" || c.status === status;
      return matchQ && matchS;
    });
  }, [query, status]);

  const totalMrr = clients.reduce((s, c) => s + c.mrr, 0);
  const avgHealth = Math.round(clients.reduce((s, c) => s + c.health, 0) / clients.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Clients</h2>
          <p className="mt-1 text-sm text-ink-soft">Every account, owner, and retainer at a glance.</p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:text-xs">Total clients</p>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">{clients.length}</p>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:text-xs">Combined MRR</p>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">{usd(totalMrr)}</p>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:text-xs">Avg health</p>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">{avgHealth}%</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 sm:max-w-xs">
          <Search className="size-4 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or industry…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>
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
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">MRR</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Retainer</th>
                <th className="px-4 py-3">Health</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((c) => {
                const owner = teamMember(c.owner);
                return (
                  <tr key={c.id} className="group transition hover:bg-surface-2">
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${c.id}`} className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: c.accent }}>
                          {tile(c.name)}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{c.name}</span>
                          <span className="block text-xs text-ink-soft">{c.industry}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3"><Badge tone="brand">{c.plan}</Badge></td>
                    <td className="px-4 py-3 font-semibold">{c.mrr ? usd(c.mrr) : "—"}</td>
                    <td className="px-4 py-3 text-ink-soft">{owner?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-ink-soft">{c.hoursUsed}/{c.retainerHours}h</span>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                        <span className="block h-full rounded-full bg-brand" style={{ width: `${Math.min(100, (c.hoursUsed / c.retainerHours) * 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-ink-soft">{c.health}%</span>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                        <span className={cn("block h-full rounded-full", healthTone(c.health))} style={{ width: `${c.health}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge tone={statusTone(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/clients/${c.id}`} className="inline-flex text-ink-soft opacity-0 transition group-hover:opacity-100">
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-ink-soft">
            <Users className="size-8" />
            <p className="text-sm">No clients match your filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
