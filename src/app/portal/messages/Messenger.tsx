"use client";

import { useMemo, useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import type { MessageThread, ChatMessage } from "@/lib/types";

const CLIENT_NAME = "Andre Campbell";

// Locally-sent messages get this marker so we never depend on a live clock.
const JUST_NOW = "__now__";

function timeLabel(at: string) {
  if (at === JUST_NOW) return "Just now";
  const d = new Date(at);
  return d.toLocaleString("en-JM", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export default function Messenger({ threads }: { threads: MessageThread[] }) {
  const [data, setData] = useState<MessageThread[]>(threads);
  const [activeId, setActiveId] = useState<string | null>(threads[0]?.id ?? null);
  const [draft, setDraft] = useState("");

  const active = useMemo(() => data.find((t) => t.id === activeId) ?? null, [data, activeId]);

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    const msg: ChatMessage = { from: CLIENT_NAME, role: "client", text, at: JUST_NOW };
    setData((prev) => prev.map((t) => (t.id === active.id ? { ...t, messages: [...t.messages, msg], unread: 0 } : t)));
    setDraft("");
  };

  const openThread = (id: string) => {
    setActiveId(id);
    setData((prev) => prev.map((t) => (t.id === id ? { ...t, unread: 0 } : t)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Messages</h2>
        <p className="mt-1 text-sm text-ink-soft">Talk to your account team — approvals, questions, and updates in one place.</p>
      </div>

      <div className="grid gap-4 overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[20rem_1fr] lg:gap-0">
        {/* Thread list */}
        <aside className="border-line lg:border-r">
          <div className="border-b border-line px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Conversations</p>
          </div>
          <ul className="divide-y divide-line">
            {data.length === 0 && <li className="p-5 text-sm text-ink-soft">No conversations yet.</li>}
            {data.map((t) => {
              const last = t.messages[t.messages.length - 1];
              const isActive = t.id === activeId;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => openThread(t.id)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition",
                      isActive ? "bg-brand-soft" : "hover:bg-surface-2",
                    )}
                  >
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-brand text-xs font-semibold text-white">
                      {initials(last?.from ?? t.subject)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={cn("truncate text-sm", isActive ? "font-bold text-brand" : "font-semibold")}>{t.subject}</span>
                        {t.unread > 0 && (
                          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">{t.unread}</span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-ink-soft">{last?.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Conversation */}
        <section className="flex min-h-[28rem] flex-col">
          {active ? (
            <>
              <div className="border-b border-line px-5 py-3">
                <p className="font-semibold">{active.subject}</p>
                <p className="text-xs text-ink-soft">Blue Mahoe Bistro · Trella account team</p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-surface-2 p-5">
                {active.messages.map((m, i) => {
                  const mine = m.role === "client";
                  return (
                    <div key={i} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[80%] sm:max-w-[70%]")}>
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                            mine ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm border border-line bg-white text-ink",
                          )}
                        >
                          {m.text}
                        </div>
                        <p className={cn("mt-1 text-[11px] text-ink-soft", mine ? "text-right" : "text-left")}>
                          {m.from} · {timeLabel(m.at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                className="flex items-center gap-2 border-t border-line p-3"
                onSubmit={(e) => { e.preventDefault(); send(); }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message…"
                  className="flex-1 rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
                >
                  <Send className="size-4" /> Send
                </button>
              </form>
            </>
          ) : (
            <div className="grid flex-1 place-items-center p-10 text-center">
              <div>
                <MessageSquare className="mx-auto size-8 text-ink-soft" />
                <p className="mt-3 text-sm font-semibold">No conversation selected</p>
                <p className="mt-1 text-sm text-ink-soft">Pick a thread on the left to start chatting.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
