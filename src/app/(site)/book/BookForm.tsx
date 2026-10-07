"use client";
import { useState } from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { serviceCategories } from "@/lib/data";

const budgets = [
  "Under $850 / month",
  "$850 – $1,950 / month",
  "$1,950 – $3,800 / month",
  "$3,800+ / month",
  "Not sure yet",
];

const times = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Flexible — surprise me",
];

export function BookForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "",
    service: serviceCategories[0].title, budget: budgets[1], time: times[0], notes: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputCls =
    "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
  const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

  if (sent) {
    return (
      <Card className="flex flex-col items-center justify-center p-10 text-center shadow-brand">
        <span className="flex size-16 items-center justify-center rounded-2xl brand-gradient text-white shadow-brand">
          <CalendarCheck className="size-8" />
        </span>
        <h3 className="mt-5 text-2xl font-bold">You&apos;re on the calendar!</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
          Thanks {form.name ? form.name.split(" ")[0] : "there"} — we&apos;ve received your request for a free
          strategy call. A member of the Trella team will email <span className="font-semibold text-ink">{form.email || "you"}</span> within
          one business day to confirm a time that suits you.
        </p>
        <div className="mt-6 w-full max-w-sm rounded-xl border border-line bg-surface-2 p-4 text-left text-sm">
          <div className="flex justify-between py-1"><span className="text-ink-soft">Interested in</span><span className="font-semibold text-ink">{form.service}</span></div>
          <div className="flex justify-between py-1"><span className="text-ink-soft">Budget</span><span className="font-semibold text-ink">{form.budget}</span></div>
          <div className="flex justify-between py-1"><span className="text-ink-soft">Preferred time</span><span className="font-semibold text-ink">{form.time}</span></div>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink hover:bg-surface-2"
        >
          Book another call
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-brand sm:p-8">
      <h2 className="text-xl font-bold">Book your free strategy call</h2>
      <p className="mt-1 text-sm text-ink-soft">No cost, no obligation. 30 minutes that could change your numbers.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="name">Your name</label>
            <input id="name" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Jane Brown" />
          </div>
          <div>
            <label className={labelCls} htmlFor="business">Business name</label>
            <input id="business" required value={form.business} onChange={set("business")} className={inputCls} placeholder="Your company" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="email">Email</label>
            <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="you@company.com" />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">Phone</label>
            <input id="phone" type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+1 (876) 000-0000" />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="service">Service of interest</label>
          <select id="service" value={form.service} onChange={set("service")} className={inputCls}>
            {serviceCategories.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="budget">Monthly budget</label>
            <select id="budget" value={form.budget} onChange={set("budget")} className={inputCls}>
              {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="time">Preferred day / time</label>
            <select id="time" value={form.time} onChange={set("time")} className={inputCls}>
              {times.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="notes">Anything we should know?</label>
          <textarea id="notes" rows={4} value={form.notes} onChange={set("notes")} className={inputCls} placeholder="A little about your goals, timeline, or current challenges…" />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Request my free call <ArrowRight className="size-4" />
        </Button>
        <p className="text-center text-xs text-ink-soft">We&apos;ll never share your details. Unsubscribe anytime.</p>
      </form>
    </Card>
  );
}
