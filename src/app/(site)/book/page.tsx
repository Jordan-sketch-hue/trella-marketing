import { Search, Map, TrendingUp, Quote } from "lucide-react";
import { Container, Card, Stars, IconTile, Eyebrow } from "@/components/ui";
import { testimonials } from "@/lib/data";
import { BookForm } from "./BookForm";

export const metadata = {
  title: "Book a Free Call — Trella Marketing Consultant",
  description:
    "Book a free 30-minute marketing strategy call with Trella. We'll audit your marketing and show you exactly where the growth opportunities are.",
};

const steps = [
  { Icon: Search, title: "We listen & audit", body: "Tell us about your business and goals. We'll review your current marketing before the call so it's time well spent." },
  { Icon: Map, title: "You get a game plan", body: "We'll walk through the biggest opportunities we see and a clear, prioritised path to grow — yours to keep." },
  { Icon: TrendingUp, title: "Decide at your pace", body: "If we're a fit, we'll map out next steps. If not, you'll still leave with ideas you can action right away." },
];

export default function BookPage() {
  const t = testimonials[0];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient-soft" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* ---------- LEFT: what happens ---------- */}
          <div>
            <Eyebrow>Free strategy call</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Book a free <span className="text-gradient">strategy call</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Thirty focused minutes with a senior strategist. No pitch deck, no jargon — just a clear read on
              where your marketing could grow and how to get there.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map(({ Icon, title, body }, i) => (
                <div key={title} className="flex gap-4">
                  <IconTile tone={i === 1 ? "accent" : "brand"}><Icon className="size-5" /></IconTile>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-8 p-6">
              <Quote className="size-7 text-accent" />
              <p className="mt-3 text-[15px] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.role}, {t.company}</p>
                </div>
                <Stars n={t.rating} />
              </div>
            </Card>
          </div>

          {/* ---------- RIGHT: form ---------- */}
          <div>
            <BookForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
