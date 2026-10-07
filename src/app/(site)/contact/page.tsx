import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container, Card, Button, IconTile, Eyebrow } from "@/components/ui";
import { brand } from "@/lib/data";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact — Trella Marketing Consultant",
  description:
    "Get in touch with Trella Marketing Consultant in New Kingston. Call, email, WhatsApp, or send us a message and we'll respond within one business day.",
};

const socials = [
  { label: "Instagram", href: brand.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: brand.socials.facebook, Icon: Facebook },
  { label: "LinkedIn", href: brand.socials.linkedin, Icon: Linkedin },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-16 lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Let&apos;s start a <span className="text-gradient">conversation</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Questions, a project in mind, or just want to say hello? We&apos;d love to hear from you. Drop us a
              line and we&apos;ll reply within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- FORM + INFO ---------- */}
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />

            <div className="space-y-6">
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-bold">Contact details</h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-4">
                    <IconTile tone="brand"><MapPin className="size-5" /></IconTile>
                    <div>
                      <p className="text-sm font-semibold text-ink">Visit us</p>
                      <p className="text-sm text-ink-soft">{brand.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconTile tone="accent"><Phone className="size-5" /></IconTile>
                    <div>
                      <p className="text-sm font-semibold text-ink">Call us</p>
                      <a href={`tel:${brand.phone}`} className="text-sm text-ink-soft hover:text-brand">{brand.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconTile tone="brand"><Mail className="size-5" /></IconTile>
                    <div>
                      <p className="text-sm font-semibold text-ink">Email us</p>
                      <a href={`mailto:${brand.email}`} className="text-sm text-ink-soft hover:text-brand">{brand.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconTile tone="ink"><Clock className="size-5" /></IconTile>
                    <div>
                      <p className="text-sm font-semibold text-ink">Office hours</p>
                      <p className="text-sm text-ink-soft">{brand.hours}</p>
                    </div>
                  </li>
                </ul>

                <Button href={`https://wa.me/${brand.whatsapp}`} target="_blank" variant="accent" className="mt-7 w-full">
                  <MessageCircle className="size-4" /> Chat on WhatsApp
                </Button>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">Follow along</p>
                  <div className="mt-3 flex gap-2">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-line text-ink-soft transition hover:border-brand hover:text-brand"
                      >
                        <Icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- MAP PLACEHOLDER ---------- */}
      <section className="pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl brand-gradient p-10 text-white shadow-brand sm:p-16">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-md">
                <Eyebrow onDark>Find us</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">New Kingston, Jamaica</h2>
                <p className="mt-3 flex items-start gap-2 text-white/80">
                  <MapPin className="mt-0.5 size-5 shrink-0" /> {brand.address}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(brand.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:bg-white/90"
              >
                Open in Maps <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
