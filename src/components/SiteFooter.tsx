import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { brand, serviceCategories } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="brand-gradient text-white">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark height={38} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{brand.promise}</p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Instagram, href: brand.socials.instagram },
                { Icon: Facebook, href: brand.socials.facebook },
                { Icon: Linkedin, href: brand.socials.linkedin },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" links={serviceCategories.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
          <FooterCol title="Company" links={[
            { label: "About", href: "/about" }, { label: "Our Work", href: "/work" },
            { label: "Pricing", href: "/pricing" }, { label: "Insights", href: "/insights" },
            { label: "Brand", href: "/brand" }, { label: "Contact", href: "/contact" },
          ]} />
          <div>
            <h4 className="text-sm font-semibold text-white">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> {brand.address}</li>
              <li><a href={`tel:${brand.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-white"><Phone className="size-4" /> {brand.phone}</a></li>
              <li><a href={`mailto:${brand.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="size-4" /> {brand.email}</a></li>
            </ul>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <Link href="/portal" className="inline-flex items-center gap-1 font-semibold text-white hover:text-white/80">Client Portal <ArrowUpRight className="size-3.5" /></Link>
              <Link href="/admin" className="inline-flex items-center gap-1 text-white/60 hover:text-white">Team Admin <ArrowUpRight className="size-3.5" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {2026} {brand.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>Marketing that moves the needle.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.href + l.label}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
