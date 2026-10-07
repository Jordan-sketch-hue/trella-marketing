import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, Stat, CoverTile, Stars, Eyebrow } from "@/components/ui";
import { caseStudies, getCaseStudy, getTestimonial } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case study not found — Trella Marketing Consultant" };
  return {
    title: `${cs.client} — ${cs.title} | Trella Marketing Consultant`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const testimonial = cs.testimonial ? getTestimonial(cs.testimonial) : undefined;
  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : caseStudies[caseStudies.length - 1];
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : caseStudies[0];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="py-10 lg:py-14">
        <Container>
          <Link href="/work" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <div className="mt-5">
            <CoverTile hex={cs.cover} label={cs.industry} className="aspect-[16/9] sm:aspect-[2.4/1]">
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10">
                <Eyebrow onDark>{cs.client}</Eyebrow>
                <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {cs.title}
                </h1>
              </div>
            </CoverTile>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span><span className="font-semibold text-ink">Client:</span> {cs.client}</span>
            <span><span className="font-semibold text-ink">Industry:</span> {cs.industry}</span>
            <span><span className="font-semibold text-ink">Duration:</span> {cs.duration}</span>
          </div>
        </Container>
      </section>

      {/* ---------- RESULTS ROW ---------- */}
      <section className="border-y border-line bg-surface-2 py-12">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">The results</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {cs.results.map((r) => (
              <Stat key={r.label} value={r.value} label={r.label} sub={r.delta} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- NARRATIVE ---------- */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-12">
              <div>
                <Eyebrow>The challenge</Eyebrow>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{cs.challenge}</p>
              </div>

              <div>
                <Eyebrow>Our approach</Eyebrow>
                <ol className="mt-5 space-y-4">
                  {cs.approach.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="pt-1 leading-relaxed text-ink">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <Eyebrow>The outcome</Eyebrow>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{cs.outcome}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Services used</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.services.map((s) => (
                    <Badge key={s} tone="brand">{s}</Badge>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-ink-soft">{cs.summary}</p>
                <Button href="/book" className="mt-6 w-full">Get results like these <ArrowRight className="size-4" /></Button>
              </Card>

              {testimonial && (
                <Card className="brand-gradient p-6 text-white shadow-brand">
                  <Quote className="size-7 text-white/80" />
                  <p className="mt-3 text-[15px] leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <div>
                      <p className="text-sm font-bold">{testimonial.name}</p>
                      <p className="text-xs text-white/70">{testimonial.role}, {testimonial.company}</p>
                    </div>
                    <Stars n={testimonial.rating} className="text-white" />
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- PREV / NEXT ---------- */}
      <section className="border-t border-line py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="group">
              <Card className="flex h-full items-center gap-4 p-5 transition hover:-translate-y-1 hover:shadow-brand">
                <ArrowLeft className="size-5 shrink-0 text-brand" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Previous</p>
                  <p className="truncate font-bold">{prev.client}</p>
                  <p className="truncate text-sm text-ink-soft">{prev.title}</p>
                </div>
              </Card>
            </Link>
            <Link href={`/work/${next.slug}`} className="group">
              <Card className="flex h-full items-center justify-end gap-4 p-5 text-right transition hover:-translate-y-1 hover:shadow-brand">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Next</p>
                  <p className="truncate font-bold">{next.client}</p>
                  <p className="truncate text-sm text-ink-soft">{next.title}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-brand" />
              </Card>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to write your own results?</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call. We&apos;ll audit your marketing and map the fastest path to growth.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/work" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">More case studies</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
