import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, CoverTile, Eyebrow } from "@/components/ui";
import { posts } from "@/lib/data";
import { shortDate } from "@/lib/utils";

export const metadata = {
  title: "Insights — Trella Marketing Consultant",
  description:
    "Practical marketing ideas for Caribbean businesses — social, paid ads, brand, email, SEO, and analytics, explained without the jargon.",
};

export default function InsightsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Marketing ideas that <span className="text-gradient">actually work</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Short, practical reads from our team — the same thinking we use to grow our clients, shared without
              the jargon.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- FEATURED ---------- */}
      <section className="pt-16">
        <Container>
          <Link href={`/insights/${featured.slug}`} className="group block">
            <Card className="grid overflow-hidden transition hover:shadow-brand lg:grid-cols-2">
              <CoverTile hex={featured.cover} label={featured.category} className="min-h-64 lg:min-h-full">
                <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Featured</span>
              </CoverTile>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <Badge tone="brand">{featured.category}</Badge>
                <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{featured.author}</span>
                  <span aria-hidden>·</span>
                  <span>{shortDate(featured.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readMins} min read</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2">
                  Read article <ArrowRight className="size-4 transition-all" />
                </span>
              </div>
            </Card>
          </Link>
        </Container>
      </section>

      {/* ---------- POST GRID ---------- */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="More reads" title="From the blog" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="group">
                <Card className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-brand">
                  <CoverTile hex={p.cover} label={p.category} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-soft">
                      <span className="font-semibold text-ink">{p.author}</span>
                      <span aria-hidden>·</span>
                      <span>{shortDate(p.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{p.readMins} min</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Want this applied to your brand?</h2>
              <p className="mt-4 text-white/75">
                Reading is good. Doing is better. Book a free strategy call and we&apos;ll put the ideas to work.
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
