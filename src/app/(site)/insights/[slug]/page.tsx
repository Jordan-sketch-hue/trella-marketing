import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container, Button, Card, Badge, CoverTile, Eyebrow, SectionHeading } from "@/components/ui";
import { posts, getPost } from "@/lib/data";
import { shortDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — Trella Marketing Consultant" };
  return {
    title: `${post.title} — Trella Marketing Consultant`,
    description: post.excerpt,
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* ---------- ARTICLE HEADER ---------- */}
      <article>
        <section className="py-10 lg:py-14">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2">
                <ArrowLeft className="size-4" /> All insights
              </Link>
              <div className="mt-5">
                <Badge tone="brand">{post.category}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{post.author}</span>
                <span aria-hidden>·</span>
                <span>{shortDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readMins} min read</span>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-4xl">
              <CoverTile hex={post.cover} className="aspect-[2.2/1]" />
            </div>
          </Container>
        </section>

        {/* ---------- BODY ---------- */}
        <section className="pb-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                {post.body.map((para, i) => (
                  <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : undefined}>{para}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                {post.tags.map((t) => (
                  <Badge key={t} tone="neutral">#{t}</Badge>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </article>

      {/* ---------- RELATED ---------- */}
      <section className="border-t border-line bg-surface-2 py-16">
        <Container>
          <SectionHeading eyebrow="Keep reading" title="Related insights" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
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
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Put these ideas to work</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call and we&apos;ll show you exactly how this applies to your brand.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/insights" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">More insights</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
