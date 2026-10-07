import Link from "next/link";
import {
  ArrowRight, Smartphone, MonitorSmartphone, Database, Megaphone, Users, CheckCircle2,
  FileBarChart, Receipt, MessageSquare, Globe, ArrowLeftRight, ArrowDown, Sparkles,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container, Button, Badge, Eyebrow } from "@/components/ui";

export const metadata = {
  title: "App & Platform Walkthrough",
  description:
    "See how the Trella platform works end to end — the client app, the operator/admin app, and the full-stack architecture that connects them.",
};

const APP_URL = "https://trella-marketing-app.vercel.app";

const clientScreens = [
  { src: "/screens/02-client-dashboard.png", title: "Dashboard", desc: "Live reach, engagement, ROAS & conversions at a glance." },
  { src: "/screens/03-client-campaigns.png", title: "Campaigns", desc: "Every active campaign with spend, budget pacing & ROAS." },
  { src: "/screens/04-client-content.png", title: "Approvals", desc: "Approve or request changes on content — from the phone." },
  { src: "/screens/05-client-reports.png", title: "Reports", desc: "Monthly performance reports with the numbers that matter." },
  { src: "/screens/06-client-more.png", title: "More", desc: "Invoices, messages, profile & switch views anytime." },
];

const operatorScreens = [
  { src: "/screens/07-operator-dashboard.png", title: "Agency Dashboard", desc: "MRR, active clients, open leads & portfolio ROAS." },
  { src: "/screens/08-operator-clients.png", title: "Clients · CRM", desc: "Every account with plan, MRR & health — searchable." },
  { src: "/screens/09-operator-leads.png", title: "Leads", desc: "Sales pipeline by stage with potential value." },
  { src: "/screens/10-operator-content.png", title: "Content", desc: "Production board across all clients." },
  { src: "/screens/11-operator-more.png", title: "More", desc: "Campaigns, invoices, settings & role switch." },
];

const heroPhones = [
  "/screens/01-role-gate.png",
  "/screens/02-client-dashboard.png",
  "/screens/04-client-content.png",
  "/screens/07-operator-dashboard.png",
  "/screens/08-operator-clients.png",
];

function Phone({ src, title, desc, w = "w-[232px]" }: { src: string; title?: string; desc?: string; w?: string }) {
  return (
    <figure className={`shrink-0 snap-center ${w}`}>
      <div className="overflow-hidden rounded-[2.1rem] border-[7px] border-ink bg-ink shadow-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title || "Trella app screen"} className="block w-full" loading="lazy" />
      </div>
      {title && (
        <figcaption className="mt-4 px-1 text-center">
          <p className="text-sm font-bold text-ink">{title}</p>
          {desc && <p className="mt-1 text-[13px] leading-snug text-ink-soft">{desc}</p>}
        </figcaption>
      )}
    </figure>
  );
}

function FlowNode({ icon: Icon, title, lines, tone = "ink" }: { icon: any; title: string; lines: string[]; tone?: "ink" | "brand" | "accent" }) {
  const ring = tone === "brand" ? "border-brand/30 bg-brand-soft" : tone === "accent" ? "border-accent/30 bg-accent-soft" : "border-line bg-white";
  const chip = tone === "brand" ? "bg-brand text-white" : tone === "accent" ? "bg-accent text-white" : "bg-ink text-white";
  return (
    <div className={`rounded-2xl border ${ring} p-5`}>
      <div className="flex items-center gap-3">
        <span className={`inline-flex size-9 items-center justify-center rounded-lg ${chip}`}><Icon className="size-4" /></span>
        <h4 className="font-bold leading-tight">{title}</h4>
      </div>
      <ul className="mt-3 space-y-1.5">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-2 text-[13px] text-ink-soft"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand" /> {l}</li>
        ))}
      </ul>
    </div>
  );
}

export default function WalkthroughPage() {
  return (
    <div className="bg-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/"><Logo height={34} /></Link>
          <div className="flex items-center gap-2">
            <Button href="/" variant="outline" size="sm">View site</Button>
            <Button href={APP_URL} target="_blank" size="sm">Open the app <ArrowRight className="size-4" /></Button>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden brand-gradient text-white">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <Container className="relative py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow onDark>Product Walkthrough</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">See how Trella works — <span className="text-white">end to end</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
              One platform, two apps, and a shared data core. Here's the client experience, the team experience, and exactly how every piece talks to the others.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={APP_URL} target="_blank" variant="white" size="lg">Launch the live app <ArrowRight className="size-4" /></Button>
              <Button href="/admin" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Open Admin / CRM</Button>
            </div>
          </div>
          {/* hero phones */}
          <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-3 lg:justify-center">
            {heroPhones.map((src, i) => (
              <div key={src} className={i % 2 ? "lg:translate-y-3" : "lg:-translate-y-1"}><Phone src={src} w="w-[190px] sm:w-[210px]" /></div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-white/50">Swipe to browse · real screens from the live build</p>
        </Container>
      </section>

      {/* Client app */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand text-white"><Smartphone className="size-5" /></span>
            <div>
              <Eyebrow>For your clients</Eyebrow>
              <h2 className="mt-1 text-3xl font-bold sm:text-4xl">The Client App</h2>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Your clients log in to one place to watch their marketing work — track results, approve content in a tap, read reports, see invoices, and message your team. No more screenshots over WhatsApp.
          </p>
          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
            {clientScreens.map((s) => <Phone key={s.src} {...s} />)}
          </div>
        </Container>
      </section>

      {/* Operator app */}
      <section className="bg-surface-2 py-16 lg:py-20">
        <Container>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-white"><MonitorSmartphone className="size-5" /></span>
            <div>
              <Eyebrow>For the Trella team</Eyebrow>
              <h2 className="mt-1 text-3xl font-bold sm:text-4xl">The Operator App</h2>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-ink-soft">
            The same app, a different view. Switch to the team role to run the whole agency on the go — clients, the leads pipeline, the content production board, campaigns, and billing.
          </p>
          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
            {operatorScreens.map((s) => <Phone key={s.src} {...s} />)}
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Full-stack architecture</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How it all communicates</h2>
            <p className="mt-4 text-ink-soft">Every surface reads and writes to one shared, Supabase-ready data core — so clients and the team always see the same truth, in real time.</p>
          </div>

          {/* diagram */}
          <div className="mx-auto mt-12 max-w-5xl">
            {/* marketing -> data */}
            <div className="mx-auto max-w-md">
              <FlowNode icon={Megaphone} title="Marketing Website" tone="ink" lines={["Public site: services, work, pricing", "Lead & booking forms capture demand"]} />
            </div>
            <div className="flex justify-center py-2 text-ink-soft"><ArrowDown className="size-6" /></div>

            {/* hub */}
            <div className="rounded-3xl border-2 border-brand/30 bg-brand-soft p-6 text-center shadow-brand">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-white"><Database className="size-6" /></span>
              <h3 className="mt-3 text-xl font-bold text-brand">Shared Data Core</h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">Clients · campaigns · content · reports · invoices · leads · messages. One source of truth (mock data today, Supabase-ready) with role-based access.</p>
            </div>

            {/* two-way arrows */}
            <div className="grid gap-2 py-3 sm:grid-cols-2">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand"><ArrowLeftRight className="size-4" /> two-way sync</div>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-accent"><ArrowLeftRight className="size-4" /> two-way sync</div>
            </div>

            {/* client & team */}
            <div className="grid gap-6 lg:grid-cols-2">
              <FlowNode icon={Smartphone} tone="brand" title="Client App + Web Portal" lines={["See live campaign performance", "Approve / reject content", "Read reports, pay invoices, message"]} />
              <FlowNode icon={Users} tone="accent" title="Operator App + Admin / CRM" lines={["Manage clients, leads & campaigns", "Schedule content, build reports", "Issue invoices & track revenue"]} />
            </div>
          </div>

          {/* data-flow story */}
          <div className="mx-auto mt-14 max-w-4xl">
            <h3 className="text-center text-lg font-bold">A request flows through the whole stack</h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Globe, t: "Lead arrives", d: "A visitor submits the site's booking form → it lands in the Admin CRM pipeline." },
                { icon: Users, t: "Onboard", d: "The team converts the lead into a client; their workspace spins up instantly." },
                { icon: Sparkles, t: "Create", d: "The team schedules a post on the content board and sends it for approval." },
                { icon: CheckCircle2, t: "Approve", d: "The client gets an approval card in the app and taps Approve — the team sees it live." },
                { icon: FileBarChart, t: "Report", d: "Performance flows back into the client's dashboard and monthly report automatically." },
                { icon: Receipt, t: "Bill", d: "An invoice raised in Admin appears in the client's portal, paid in a tap." },
              ].map((s, i) => (
                <div key={s.t} className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-ink text-white"><s.icon className="size-4" /></span>
                    <span className="text-2xl font-bold text-surface-3">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="mt-3 font-bold">{s.t}</h4>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">{s.d}</p>
                </div>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* One platform */}
      <section className="bg-surface-2 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>One connected platform</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Four surfaces, one system</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, t: "Marketing Site", d: "Win attention & capture leads.", href: "/", tone: "ink" as const, cta: "Open" },
              { icon: Smartphone, t: "Client App", d: "Clients track & approve.", href: APP_URL, tone: "brand" as const, cta: "Launch app", ext: true },
              { icon: Users, t: "Admin / CRM", d: "The team runs the agency.", href: "/admin", tone: "accent" as const, cta: "Open" },
              { icon: MessageSquare, t: "Client Portal", d: "The web companion to the app.", href: "/portal", tone: "ink" as const, cta: "Open" },
            ].map((c) => (
              <div key={c.t} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <span className={`inline-flex size-11 items-center justify-center rounded-xl text-white ${c.tone === "brand" ? "bg-brand" : c.tone === "accent" ? "bg-accent" : "bg-ink"}`}><c.icon className="size-5" /></span>
                <h3 className="mt-4 font-bold">{c.t}</h3>
                <p className="mt-1 flex-1 text-sm text-ink-soft">{c.d}</p>
                <Button href={c.href} target={c.ext ? "_blank" : undefined} variant="outline" size="sm" className="mt-4">{c.cta} <ArrowRight className="size-4" /></Button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink-soft">Live demo with realistic sample data · no login required · Supabase-ready for real accounts.</p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">Try it yourself</h2>
              <p className="mt-4 text-white/75">Open the app, switch between the client and team views, and click through the whole platform.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href={APP_URL} target="_blank" variant="white" size="lg">Open the app <ArrowRight className="size-4" /></Button>
                <Button href="/" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Back to site</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
