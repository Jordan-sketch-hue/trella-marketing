import { UsersRound, Briefcase, DollarSign } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { StatCard } from "@/components/ui";
import { team, clients } from "@/lib/data";
import { usd, initials } from "@/lib/utils";

export const metadata = { title: "Team · Team Admin" };

export default function TeamPage() {
  const activeClients = clients.filter((c) => c.status !== "Paused");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Team</h2>
        <p className="mt-1 text-sm text-ink-soft">Who does what, and who owns which accounts.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Team members" value={String(team.length)} icon={UsersRound} tone="brand" />
        <StatCard label="Accounts managed" value={String(activeClients.length)} delta={`${clients.length} total`} icon={Briefcase} tone="accent" />
        <StatCard label="Avg book / member" value={`${(clients.length / team.length).toFixed(1)}`} delta="clients each" icon={DollarSign} tone="ink" />
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {team.map((m) => {
          const book = clients.filter((c) => c.owner === m.id);
          const bookMrr = book.reduce((s, c) => s + c.mrr, 0);
          return (
            <Card key={m.id} className="flex flex-col p-6">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand text-lg font-bold text-white shadow-sm">
                  {m.initials ?? initials(m.name)}
                </span>
                <div>
                  <p className="text-lg font-bold leading-tight">{m.name}</p>
                  <p className="text-sm font-medium text-brand">{m.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{m.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.focus.map((f) => (
                  <Badge key={f} tone="brand">{f}</Badge>
                ))}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Workload</p>
                  <span className="text-xs font-semibold text-ink-soft">
                    {book.length} {book.length === 1 ? "client" : "clients"}{bookMrr ? ` · ${usd(bookMrr)} MRR` : ""}
                  </span>
                </div>
                {book.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {book.map((c) => (
                      <span key={c.id} className="inline-flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink">
                        <span className="size-2 rounded-full" style={{ backgroundColor: c.accent }} />
                        {c.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-ink-soft">No accounts assigned.</p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
