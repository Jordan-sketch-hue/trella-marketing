import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Target } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, IconTile, CoverTile, Eyebrow } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { serviceCategories, caseStudies, getService } from "@/lib/data";
import { usd } from "@/lib/utils";

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found — Trella Marketing Consultant" };
  return {
    title: `${service.title} — Trella Marketing Consultant`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = caseStudies.filter((cs) => cs.services.includes(service.title));
  const others = serviceCategories.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=900&fit=crop&q=80"
          alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">
              <ArrowRight className="size-4 rotate-180" /> All services
            </Link>
            <div className="mt-4">
              <IconTile tone={service.accent}><Icon name={service.icon} /></IconTile>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">{service.title}</h1>
            <p className="mt-3 text-lg font-medium text-brand">{service.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{service.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="/book" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
              <span className="text-sm font-semibold text-ink">
                from <span className="text-brand">{usd(service.priceFrom)}</span>/mo
              </span>
            </div>
          </div>

          {/* Deliverables + outcomes card */}
          <Card className="shadow-brand">
            <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
              <div className="bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">What you get</p>
                <ul className="mt-4 space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Outcomes</p>
                <ul className="mt-4 space-y-3">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-ink">
                      <Target className="mt-0.5 size-4 shrink-0 text-accent" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* ---------- RELATED WORK ---------- */}
      {related.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="Proof" title={`${service.title} in action`} />
              <Button href="/work" variant="ghost" className="hidden sm:inline-flex">All case studies <ArrowRight className="size-4" /></Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((cs) => (
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
      )}

      {/* ---------- AMBASSADOR VISUAL ---------- */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=420&fit=crop&q=80"
              alt="Brand ambassador event"
              className="h-64 w-full rounded-3xl object-cover sm:h-80"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 sm:p-12">
              <div className="max-w-md text-white">
                <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold uppercase tracking-widest">Live Events &amp; Activations</span>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Brand moments that stop the scroll</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">From product launches to ambassador campaigns — we put your brand in front of the right people, in the right rooms.</p>
              </div>
            </div>
            {/* Floating team photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
              alt="Marketing professional"
              className="absolute bottom-4 right-4 hidden size-20 rounded-2xl object-cover ring-4 ring-white shadow-xl sm:block"
            />
          </div>
        </Container>
      </section>

      {/* ---------- OTHER SERVICES STRIP ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <SectionHeading eyebrow="Explore more" title="Other ways we can help" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                <Card className="flex h-full items-start gap-4 p-5 transition hover:-translate-y-1 hover:shadow-brand">
                  <IconTile tone={s.accent}><Icon name={s.icon} /></IconTile>
                  <div>
                    <h3 className="font-bold leading-snug">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{s.tagline}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2">
                      from {usd(s.priceFrom)}/mo <ArrowRight className="size-4 transition-all" />
                    </span>
                  </div>
                </Card>
              </Link>
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
              <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s talk {service.title.toLowerCase()}</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call and we&apos;ll map out exactly how this fits your goals and budget.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/pricing" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">See pricing</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
