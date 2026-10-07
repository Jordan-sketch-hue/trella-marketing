"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Card, Button } from "@/components/ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft">
          <CheckCircle2 className="size-7 text-brand" />
        </span>
        <h3 className="mt-5 text-xl font-bold">Message sent — thank you!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Thanks {form.name ? form.name.split(" ")[0] : "there"}, we&apos;ve got your message and a member of the
          Trella team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => { setSent(false); setForm({ name: "", business: "", email: "", message: "" }); }}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink hover:bg-surface-2"
        >
          Send another message
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-brand sm:p-8">
      <h2 className="text-xl font-bold">Send us a message</h2>
      <p className="mt-1 text-sm text-ink-soft">Fill in the form and we&apos;ll be in touch within one business day.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className={labelCls} htmlFor="name">Your name</label>
          <input id="name" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Jane Brown" />
        </div>
        <div>
          <label className={labelCls} htmlFor="business">Business name</label>
          <input id="business" value={form.business} onChange={set("business")} className={inputCls} placeholder="Your company" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="you@company.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="message">How can we help?</label>
          <textarea id="message" required rows={5} value={form.message} onChange={set("message")} className={inputCls} placeholder="Tell us a little about your goals…" />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Send message <Send className="size-4" />
        </Button>
      </form>
    </Card>
  );
}
