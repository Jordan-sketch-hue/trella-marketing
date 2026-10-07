import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading, Button, Card, CoverTile, Stat, Eyebrow } from "@/components/ui";
import { caseStudies, heroStats } from "@/lib/data";

export const metadata = {
  title: "Our Work — Trella Marketing Consultant",
  description:
    "Real campaigns, real numbers. See how Trella has grown restaurants, retailers, fintechs, and tour operators across the Caribbean.",
};

export default function WorkPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Selected work</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Results we&apos;re <span className="text-gradient">proud to put our name on</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              We measure success the way you do — in bookings, leads, and revenue. Here&apos;s a look at what
              that&apos;s meant for the brands we partner with.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book" size="lg">Start your story <ArrowRight className="size-4" /></Button>
              <Button href="/services" variant="outline" size="lg">Browse services</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- CASE STUDY GRID ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Case studies"
            title="Growth, by the numbers"
            lead="Every engagement is different — but the throughline is the same: a clear plan, consistent execution, and measurable results."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
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
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:gap-2">
                      Read the story <ArrowRight className="size-4 transition-all" />
                    </span>
                  </div>
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

      {/* ---------- CTA ---------- */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Your brand could be next</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call. We&apos;ll audit your marketing and show you exactly where
                the opportunities are.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/services" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Explore services</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
