import { Download, Check, X } from "lucide-react";
import { Container, SectionHeading, Card, Badge, Eyebrow, Button } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { brand } from "@/lib/data";

export const metadata = {
  title: "Brand Guidelines — Trella Marketing Consultant",
  description:
    "The Trella brand identity suite — logo usage, colour palette, typography, and voice. The same brand-identity deliverable we build for our clients.",
};

const palette = [
  { name: "Ultramarine", hex: "#16019a", token: "bg-brand", className: "bg-brand", onDark: true },
  { name: "Ultramarine 700", hex: "#11017a", token: "bg-brand-700", className: "bg-brand-700", onDark: true },
  { name: "Midnight", hex: "#08013f", token: "bg-brand-900", className: "bg-brand-900", onDark: true },
  { name: "Bright Blue", hex: "#2e1fe0", token: "bg-brand-bright", className: "bg-brand-bright", onDark: true },
  { name: "Signal Red", hex: "#ed1c24", token: "bg-accent", className: "bg-accent", onDark: true },
  { name: "Ink", hex: "#0c0c14", token: "bg-ink", className: "bg-ink", onDark: true },
];

const neutrals = [
  { name: "Ink Soft", hex: "#4b4b57", token: "text-ink-soft", className: "bg-ink-soft", onDark: true },
  { name: "Surface 2", hex: "#f6f6fb", token: "bg-surface-2", className: "bg-surface-2", onDark: false },
  { name: "Surface 3", hex: "#ececf4", token: "bg-surface-3", className: "bg-surface-3", onDark: false },
  { name: "Line", hex: "#e6e6ef", token: "border-line", className: "bg-line", onDark: false },
];

const dos = [
  "Give the logo room — keep clear space equal to the height of the monogram on all sides.",
  "Use the white-chip lockup when placing the logo on photography or dark brand panels.",
  "Lead with ultramarine; use Signal Red as a deliberate accent, never as a background wash.",
  "Keep headlines in Sora and body copy in Inter for a consistent, confident voice.",
];

const donts = [
  "Don't stretch, rotate, recolour, or add effects (shadows, gradients, outlines) to the logo.",
  "Don't place the colour logo on a busy or low-contrast background without the white chip.",
  "Don't pair red text on the ultramarine background — it vibrates and hurts legibility.",
  "Don't swap the typefaces or use more than two weights in a single layout.",
];

function Swatch({ name, hex, token, className, onDark }: { name: string; hex: string; token: string; className: string; onDark: boolean }) {
  return (
    <Card className="overflow-hidden">
      <div className={`flex h-24 items-end p-3 ${className}`}>
        <span className={`text-xs font-bold ${onDark ? "text-white/80" : "text-ink-soft"}`}>{hex.toUpperCase()}</span>
      </div>
      <div className="p-4">
        <p className="text-sm font-bold">{name}</p>
        <code className="mt-1 inline-block rounded bg-surface-2 px-1.5 py-0.5 text-xs text-ink-soft">{token}</code>
      </div>
    </Card>
  );
}

export default function BrandPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Brand identity suite</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              The Trella <span className="text-gradient">brand guidelines</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              A living style guide — logo, colour, type, and voice. It&apos;s also a sample of the brand-identity
              system we build for every client, so your whole team can stay on-brand everywhere.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- LOGO ---------- */}
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Logo" title="The mark & the lockup" lead="Our logo comes as a full wordmark lockup and a standalone monogram. Use the white chip on dark or photographic backgrounds." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col items-center justify-center gap-4 p-8">
              <Logo height={56} />
              <Badge tone="neutral">Primary lockup</Badge>
            </Card>
            <Card className="flex flex-col items-center justify-center gap-4 p-8">
              <Logo variant="mark" height={64} />
              <Badge tone="neutral">Monogram</Badge>
            </Card>
            <Card className="relative flex flex-col items-center justify-center gap-4 overflow-hidden p-8 text-white">
              <div className="absolute inset-0 brand-gradient" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative"><Logo onDark height={48} /></div>
              <span className="relative"><Badge tone="dark">On dark / white chip</Badge></span>
            </Card>
          </div>

          <Card className="mt-6 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-bold">Logo files</p>
              <p className="mt-1 text-sm text-ink-soft">
                Download the full-colour assets. Files: <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">/logo.png</code> and{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">/monogram.png</code>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href="/logo.png" target="_blank" variant="outline"><Download className="size-4" /> Logo PNG</Button>
              <Button href="/monogram.png" target="_blank" variant="outline"><Download className="size-4" /> Monogram PNG</Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* ---------- COLOUR ---------- */}
      <section className="bg-surface-2 py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Colour" title="A confident, electric palette" lead="Deep ultramarine carries the brand; a single Signal Red accent adds energy. Neutrals keep everything clean and white-dominant." />
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Core</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {palette.map((c) => <Swatch key={c.hex} {...c} />)}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Neutrals</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {neutrals.map((c) => <Swatch key={c.hex} {...c} />)}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- TYPOGRAPHY ---------- */}
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Typography" title="Sora for impact, Inter for clarity" lead="Headlines use Sora — geometric and confident. Body copy uses Inter for effortless reading at any size." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Display — Sora</p>
                <Badge tone="brand">Headings</Badge>
              </div>
              <p className="mt-6 text-5xl font-bold leading-none">Aa</p>
              <p className="mt-4 text-2xl font-bold leading-tight">Marketing that moves the needle.</p>
              <div className="mt-6 space-y-1 border-t border-line pt-4 text-ink-soft">
                <p className="text-lg font-normal">Regular 400 — the quick brown fox</p>
                <p className="text-lg font-semibold">Semibold 600 — the quick brown fox</p>
                <p className="text-lg font-bold">Bold 700 — the quick brown fox</p>
              </div>
            </Card>
            <Card className="p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Body — Inter</p>
                <Badge tone="neutral">Paragraphs & UI</Badge>
              </div>
              <p className="mt-6 font-sans text-5xl font-bold leading-none">Aa</p>
              <p className="mt-4 font-sans leading-relaxed text-ink-soft">
                Trella is your full marketing team — strategy, social, paid ads, content, and analytics working
                together to grow your brand and your bottom line. Clear, human, and always measured.
              </p>
              <div className="mt-6 space-y-1 border-t border-line pt-4 font-sans text-ink-soft">
                <p className="font-normal">Regular 400 — the quick brown fox jumps</p>
                <p className="font-medium">Medium 500 — the quick brown fox jumps</p>
                <p className="font-semibold">Semibold 600 — the quick brown fox jumps</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* ---------- VOICE / USAGE ---------- */}
      <section className="bg-surface-2 py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Voice & usage" title="How the brand should feel" lead={`Our voice: ${brand.promise} Confident, clear, and human — never hypey, never cold.`} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-7">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-4" /></span>
                <h3 className="font-bold">Do</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {d}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-7">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-rose-100 text-rose-700"><X className="size-4" /></span>
                <h3 className="font-bold">Don&apos;t</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                    <X className="mt-0.5 size-4 shrink-0 text-rose-500" /> {d}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Want a brand system like this?</h2>
              <p className="mt-4 text-white/75">
                A full brand-identity suite is part of our Brand Strategy &amp; Identity service. Let&apos;s build yours.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/services/brand-strategy" variant="white" size="lg">Explore brand strategy</Button>
                <Button href="/book" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Book a free call</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
