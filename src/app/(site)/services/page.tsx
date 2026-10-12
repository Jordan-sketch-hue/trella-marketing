import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading, Button, Card, IconTile, Eyebrow } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { serviceCategories, processSteps } from "@/lib/data";
import { usd } from "@/lib/utils";

export const metadata = {
  title: "Services — Trella Marketing Consultant",
  description:
    "Brand strategy, social media, paid ads, content, web & SEO, and analytics — one connected marketing engine, all measured against real results.",
};

const promoServices = [
  {
    id: "professional-models",
    slug: "professional-models",
    image: "/images/trella/professional-models.webp",
    title: "Professional Models",
    headline: "Beauty. Confidence. Impact.",
    description: "Polished, professional models that represent your brand with presence and authenticity — at events, campaigns, shoots, and activations.",
    wa: "I'm interested in Professional Models for my brand",
  },
  {
    id: "dancers-promo-reps",
    slug: "dancers-promo-reps",
    image: "/images/trella/dancers-promo-rep.webp",
    title: "Dancers & Promo Reps",
    headline: "Energy That Stops the Scroll.",
    description: "High-energy performers and promo reps who turn heads, draw crowds, and make your brand impossible to ignore.",
    wa: "I'd like to book Dancers & Promo Reps",
  },
  {
    id: "event-staffing",
    slug: "event-staffing",
    image: "/images/trella/green-dress-promo.webp",
    title: "Event Staffing",
    headline: "Every Room. Every Event.",
    description: "Professional, brand-trained staff who manage your event floor, guide guests, and ensure every touch point reflects your brand.",
    wa: "I need Event Staffing for my event",
  },
  {
    id: "brand-ambassador",
    slug: "brand-ambassador",
    image: "/images/trella/brand-ambassador.webp",
    title: "Brand Ambassador",
    headline: "Your Brand. Our Mission.",
    description: "Dedicated ambassadors who live your brand on and off the stage — in-store, online, and at every consumer touchpoint.",
    wa: "I want Brand Ambassador services",
  },
];

const WA_BASE = "https://wa.me/18763149024?text=";

export default function ServicesPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>What we do</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Every part of your marketing, <span className="text-gradient">pulling in one direction</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Pick a single service or hand us the whole funnel. Either way, the strategy, the creative, the
              spend, and the numbers stay connected — so growth compounds instead of leaking.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
              <Button href="/pricing" variant="outline" size="lg">See pricing</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- PROMO & TALENT SERVICES ---------- */}
      <section className="py-20" style={{ backgroundColor: "#060612" }}>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Talent & activations"
            title={<span className="text-white">Promo &amp; Talent Services</span>}
            lead={<span style={{ color: "rgba(255,255,255,0.55)" }}>Models, dancers, promo reps, and brand ambassadors — the faces and energy that bring your brand to life in the real world.</span>}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {promoServices.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10"
                style={{ backgroundColor: "#0d0d22" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-56 w-full object-cover object-top transition group-hover:scale-105"
                  style={{ transition: "transform 0.4s ease" }}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#f5a623" }}>
                    {s.title}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{s.headline}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {s.description}
                  </p>
                  <a
                    href={`${WA_BASE}${encodeURIComponent(s.wa)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold text-black transition hover:opacity-90"
                    style={{ background: "linear-gradient(90deg,#f5a623,#e8900a)" }}
                  >
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- MARKETING SERVICE GRID ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Six ways we grow brands"
            title="Services built to connect"
            lead="Each service is a complete capability on its own — and a force multiplier when combined with the rest."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                <Card className="flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-brand">
                  <IconTile tone={s.accent}><Icon name={s.icon} /></IconTile>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand">{s.tagline}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-sm font-semibold text-ink">
                      from <span className="text-brand">{usd(s.priceFrom)}</span>/mo
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:gap-2">
                      Explore <ArrowRight className="size-4 transition-all" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- PROCESS RECAP ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="A clear, repeatable process"
            lead="No guesswork. Every engagement follows the same proven path from audit to compounding growth."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {processSteps.map((p) => (
              <div key={p.step} className="relative rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <IconTile tone={p.step % 2 ? "brand" : "accent"}><Icon name={p.icon} /></IconTile>
                  <span className="text-3xl font-bold text-gray-300">0{p.step}</span>
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>
              </div>
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
              <h2 className="text-3xl font-bold sm:text-4xl">Not sure where to start?</h2>
              <p className="mt-4 text-white/75">
                Tell us your goals and we&apos;ll recommend the right mix. Book a free 30-minute strategy call —
                no pressure, no jargon.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/book" variant="white" size="lg">Book a free call <ArrowRight className="size-4" /></Button>
                <Button href="/work" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">See our work</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
