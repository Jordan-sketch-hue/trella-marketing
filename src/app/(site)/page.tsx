import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, IconTile, Stars, Stat, CoverTile } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PromoShowcase } from "@/components/PromoShowcase";
import {
  brand, heroStats, serviceCategories, processSteps, caseStudies, packages, testimonials, clients,
} from "@/lib/data";
import { usd } from "@/lib/utils";

export default function HomePage() {
  const featured = caseStudies.slice(0, 3);
  return (
    <>
      {/* ---------- HERO: PROMO SHOWCASE ---------- */}
      <PromoShowcase />

      {/* ---------- TRUSTED BY ---------- */}
      <section className="border-y border-line bg-white py-8">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Trusted by growing Caribbean brands</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {clients.slice(0, 7).map((c) => (
              <span key={c.id} className="text-sm font-bold text-ink/40">{c.name}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="What we do" title="One partner for the whole funnel" lead="Pick a single service or let us run the entire engine. Everything connects — and everything is measured." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                <Card className="h-full p-6 transition hover:-translate-y-1 hover:shadow-brand">
                  <IconTile tone={s.accent}><Icon name={s.icon} /></IconTile>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand">{s.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:gap-2">
                    Learn more <ArrowRight className="size-4 transition-all" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- STATS BAND ---------- */}
      <section className="brand-gradient py-16 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {heroStats.map((s) => <Stat key={s.label} value={s.value} label={s.label} sub={s.sub} onDark />)}
          </div>
        </Container>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading align="center" eyebrow="How it works" title="A clear, repeatable process" lead="No guesswork. Every engagement follows the same proven path from audit to compounding growth." />
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {processSteps.map((p) => (
              <div key={p.step} className="relative rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <IconTile tone={p.step % 2 ? "brand" : "accent"}><Icon name={p.icon} /></IconTile>
                  <span className="text-3xl font-bold" style={{color:"rgba(22,1,154,0.22)"}}>0{p.step}</span>
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- FEATURED WORK ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="Results we are proud of" />
            <Button href="/work" variant="ghost" className="hidden sm:inline-flex">All case studies <ArrowRight className="size-4" /></Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((cs) => (
              <Link key={cs.slug} href={`/work/${cs.slug}`} className="group">
                <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-brand">
                  <CoverTile hex={cs.cover} img={(cs as any).cover_img} label={cs.industry} className="aspect-[16/10]">
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-lg font-bold text-white">{cs.client}</p>
                    </div>
                  </CoverTile>
                  <div className="p-5">
                    <h3 className="font-bold leading-snug">{cs.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cs.results.slice(0, 2).map((r) => (
                        <span key={r.label} className="rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">{r.value} {r.label}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading align="center" eyebrow="Client love" title="Don't take our word for it" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <Card key={t.id} className="flex h-full flex-col p-6">
                <Quote className="size-7 text-accent" />
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">"{t.quote}"</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.role}, {t.company}</p>
                  </div>
                  <Stars n={t.rating} />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- PRICING TEASER ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <SectionHeading align="center" eyebrow="Simple pricing" title="Plans that grow with you" lead="Transparent monthly retainers. No long contracts. Cancel with 30 days notice." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <Card key={p.id} className={`relative flex h-full flex-col p-6 ${p.popular ? "ring-2 ring-brand shadow-brand" : ""}`}>
                {p.popular && <Badge tone="brand">Most popular</Badge>}
                <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.audience}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{usd(p.priceMonthly)}</span>
                  <span className="text-sm text-ink-soft">/ month</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-soft"><Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}</li>
                  ))}
                </ul>
                <Button href="/pricing" variant={p.popular ? "primary" : "outline"} className="mt-6 w-full">Choose {p.name}</Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to grow on purpose?</h2>
              <p className="mt-4 text-white/75">Book a free 30-minute strategy call. We will audit your marketing and show you exactly where the opportunities are.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href={`https://wa.me/${brand.whatsapp}`} target="_blank" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">WhatsApp us</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}