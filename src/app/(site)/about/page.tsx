import { ArrowRight, Heart, LineChart, Handshake, Eye } from "lucide-react";
import { Container, SectionHeading, Button, Card, Badge, IconTile, Stat, Eyebrow } from "@/components/ui";
import { brand, team, heroStats } from "@/lib/data";

export const metadata = {
  title: "About — Trella Marketing Consultant",
  description:
    "Trella is a Kingston-based marketing consultancy that acts as your full marketing team — pairing sharp strategy and creative with a relentless focus on the numbers.",
};

const values = [
  {
    icon: LineChart,
    title: "Results over vanity",
    body: "Followers feel good; revenue pays bills. We tie every activity to a business outcome and report on what actually moves the needle.",
    tone: "brand" as const,
  },
  {
    icon: Heart,
    title: "Brand with heart",
    body: "Great marketing sounds human. We learn your voice and tell stories people genuinely want to follow — never generic, never noisy.",
    tone: "accent" as const,
  },
  {
    icon: Handshake,
    title: "Partners, not vendors",
    body: "We work inside your accounts, hand over every asset, and treat your budget like our own. Your wins are the only scoreboard.",
    tone: "ink" as const,
  },
  {
    icon: Eye,
    title: "Radical clarity",
    body: "No jargon, no smoke. You always know what we're doing, why, what it costs, and what it's returning — in plain language.",
    tone: "brand" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- HERO / STORY ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              We built the agency we <span className="text-gradient">wished existed</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Trella started with a simple frustration: too many Caribbean businesses were paying for marketing
              they couldn&apos;t measure, from people who disappeared after the invoice cleared.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              So we built something different — a tight, senior team that plugs in as your whole marketing
              department, runs every channel as one connected engine, and proves the return every single month.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book" size="lg">Work with us <ArrowRight className="size-4" /></Button>
              <Button href="/work" variant="outline" size="lg">See our work</Button>
            </div>
          </div>

          <Card className="shadow-brand">
            <div className="brand-gradient rounded-t-2xl p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Our promise</p>
              <p className="mt-3 text-2xl font-bold leading-snug">&ldquo;{brand.promise}&rdquo;</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-2xl bg-line">
              {heroStats.map((s) => (
                <div key={s.label} className="bg-white p-5">
                  <div className="text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-sm font-semibold text-ink">{s.label}</div>
                  <div className="text-xs text-ink-soft">{s.sub}</div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      {/* ---------- MISSION + VALUES ---------- */}
      <section className="py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="A marketing partner you can actually trust"
            lead="Our mission is to make world-class marketing accessible to Caribbean brands — and to make it measurable, so growth is never a guess."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="flex h-full flex-col p-6">
                <IconTile tone={v.tone}><v.icon className="size-5" /></IconTile>
                <h3 className="mt-4 font-bold">{v.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="bg-surface-2 py-20">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Senior people, on your account"
            lead="No hand-offs to juniors. The people who pitch you are the people who do the work."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Card key={m.id} className="flex h-full flex-col p-6">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-white shadow-brand">
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="font-bold leading-tight">{m.name}</h3>
                    <p className="text-sm font-medium text-brand">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {m.focus.map((f) => (
                    <Badge key={f} tone="neutral">{f}</Badge>
                  ))}
                </div>
              </Card>
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
              <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s build something that lasts</h2>
              <p className="mt-4 text-white/75">
                Book a free 30-minute strategy call and meet the team that&apos;ll have your back.
              </p>
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
