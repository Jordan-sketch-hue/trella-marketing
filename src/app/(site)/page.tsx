import Link from "next/link";
import { ArrowRight, Check, Quote, Star, TrendingUp, MousePointerClick } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, IconTile, Stars, Stat, CoverTile, Eyebrow } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { AreaTrend, Spark } from "@/components/charts";
import { PromoShowcase } from "@/components/PromoShowcase";
import {
  brand, heroStats, serviceCategories, processSteps, caseStudies, packages, testimonials, clients, monthlyTrend,
} from "@/lib/data";
import { usd } from "@/lib/utils";

export default function HomePage() {
  const featured = caseStudies.slice(0, 3);
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        {/* Hero background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/trella/professional-models.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-white/20" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Eyebrow>Marketing Consultant · Kingston, JA</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Marketing that <span className="text-gradient">moves the needle</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Trella is your full marketing team — strategy, social, paid ads, content, and analytics working together to grow your brand and your bottom line.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
              <Button href="/work" variant="outline" size="lg">See our work</Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Stars />
              <p className="text-sm text-ink-soft"><span className="font-semibold text-ink">94% retention</span> — clients stay because it works.</p>
            </div>
          </div>

          {/* Live-results visual */}
          <div className="relative">
              <Card className="shadow-brand">
              <div className="flex items-center justify-between border-b border-line p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Client results</p>
                  <p className="text-sm font-semibold">Revenue attributed · last 12 mo</p>
                </div>
                <Badge tone="good">+111%</Badge>
              </div>
              <div className="p-3">
                <AreaTrend data={monthlyTrend} dataKey="revenue" money height={200} />
              </div>
              <div className="grid grid-cols-2 gap-3 p-5 pt-0">
                <div className="rounded-xl border border-line p-3">
                  <div className="flex items-center gap-2 text-xs text-ink-soft"><TrendingUp className="size-3.5 text-brand" /> Avg ROAS</div>
                  <div className="mt-1 text-2xl font-bold">4.8x</div>
                  <Spark data={monthlyTrend} dataKey="leads" height={32} />
                </div>
                <div className="rounded-xl border border-line p-3">
                  <div className="flex items-center gap-2 text-xs text-ink-soft"><MousePointerClick className="size-3.5 text-accent" /> Leads / mo</div>
                  <div className="mt-1 text-2xl font-bold">861</div>
                  <Spark data={monthlyTrend} dataKey="engagement" color="#ed1c24" height={32} />
                </div>
              </div>
            </Card>
            <div className="absolute -right-3 -top-3 hidden rounded-xl bg-accent px-3 py-2 text-xs font-bold text-white shadow-lg sm:block">
              +6.1K followers
            </div>
          </div>
        </Container>
      </section>

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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                  <span className="text-3xl font-bold text-surface-3">0{p.step}</span>
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
            <SectionHeading eyebrow="Selected work" title="Results we're proud of" />
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
          <SectionHeading align="center" eyebrow="Simple pricing" title="Plans that grow with you" lead="Transparent monthly retainers. No long contracts. Cancel with 30 days' notice." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <Card key={p.id} className={`relative flex h-full flex-col p-6 ${p.popular ? "ring-2 ring-brand shadow-brand" : ""}`}>
                {p.popular && <Badge tone="brand" >Most popular</Badge>}
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
              <p className="mt-4 text-white/75">Book a free 30-minute strategy call. We'll audit your marketing and show you exactly where the opportunities are — no pressure, no jargon.</p>
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
