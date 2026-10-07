"use client";
import { useState } from "react";
import { ArrowRight, Check, Plus, Minus, Sparkles } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, IconTile, Eyebrow } from "@/components/ui";
import { packages, faqs, serviceCategories } from "@/lib/data";
import { usd } from "@/lib/utils";

const addOns = [
  { title: "Photo / video shoot", body: "A half-day on-location production with edited deliverables ready to publish." },
  { title: "Landing page build", body: "A fast, conversion-focused page for a campaign, launch, or lead magnet." },
  { title: "Email automation", body: "Welcome, abandoned-cart, and post-purchase flows set up in your platform." },
  { title: "Brand refresh", body: "Positioning, messaging, and a refreshed visual identity system." },
];

const included = [
  "A dedicated account manager",
  "Access to your client portal",
  "Monthly performance reporting",
  "All assets handed over to you",
  "No long-term contract",
  "30-day notice to cancel",
];

export function PricingClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Simple pricing</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Plans that <span className="text-gradient">grow with you</span>.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Transparent monthly retainers — for less than the cost of one in-house hire. No long contracts,
              cancel with 30 days&apos; notice. Ad spend is always separate and goes straight to the platforms.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- PRICING CARDS ---------- */}
      <section className="pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <Card key={p.id} className={`relative flex h-full flex-col p-7 ${p.popular ? "ring-2 ring-brand shadow-brand" : ""}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="brand">Most popular</Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.audience}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{usd(p.priceMonthly)}</span>
                  <span className="text-sm text-ink-soft">/ month</span>
                </div>
                <p className="mt-1 text-xs text-ink-soft">
                  {p.setup ? `+ ${usd(p.setup)} one-time setup` : "No setup fee"}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
                <Button href="/book" variant={p.popular ? "primary" : "outline"} className="mt-7 w-full">
                  Choose {p.name} <ArrowRight className="size-4" />
                </Button>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">
            Need something in between?{" "}
            <a href="/book" className="font-semibold text-brand hover:underline">Let&apos;s build a custom plan</a>.
          </p>
        </Container>
      </section>

      {/* ---------- INCLUDED + ADD-ONS ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading eyebrow="Every plan includes" title="The essentials, as standard" />
              <ul className="mt-8 space-y-3">
                {included.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                      <Check className="size-3.5 text-brand" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Add-ons" title="Bolt on what you need" lead="Mix any service into your plan as a one-off or recurring add-on." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {addOns.map((a) => (
                  <Card key={a.title} className="flex h-full flex-col p-5">
                    <IconTile tone="accent"><Sparkles className="size-5" /></IconTile>
                    <h3 className="mt-3 font-bold">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                  </Card>
                ))}
              </div>
              <p className="mt-5 text-sm text-ink-soft">
                Looking for a single service? See{" "}
                {serviceCategories.slice(0, 3).map((s, i) => (
                  <span key={s.slug}>
                    <a href={`/services/${s.slug}`} className="font-semibold text-brand hover:underline">{s.title}</a>
                    {i < 2 ? ", " : " "}
                  </span>
                ))}
                and more on the{" "}
                <a href="/services" className="font-semibold text-brand hover:underline">services page</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- FAQ ACCORDION ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading align="center" eyebrow="Questions" title="Everything you need to know" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-surface-2"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-ink">{f.q}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Still weighing it up?</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call. We&apos;ll recommend the right plan for your goals — no pressure.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/work" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">See the results</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
