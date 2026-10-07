import { Container, Eyebrow } from "@/components/ui";
import { brand } from "@/lib/data";

export const metadata = {
  title: "Terms of Service — Trella Marketing Consultant",
  description:
    "The terms and conditions governing your use of the Trella Marketing Consultant website and services.",
};

const LAST_UPDATED = "May 1, 2026";

const sections = [
  {
    h: "1. Agreement to Terms",
    p: [
      `These Terms of Service ("Terms") govern your access to and use of the ${brand.name} website and the marketing services we provide. By using our site or engaging our services, you agree to be bound by these Terms.`,
    ],
  },
  {
    h: "2. Our Services",
    p: [
      "Trella provides marketing consulting and execution services, including brand strategy, social media management, paid advertising, content creation, website and SEO, and analytics.",
      "The specific scope, deliverables, fees, and timelines for any engagement are set out in a separate written proposal or statement of work agreed between you and Trella, which forms part of these Terms.",
    ],
  },
  {
    h: "3. Engagements & Billing",
    p: [
      "Services are typically provided on a rolling monthly retainer. Retainers are billed in advance and are due on the date stated on each invoice.",
      "One-time setup fees, where applicable, are billed at the start of an engagement. Advertising spend paid to third-party platforms is separate from our management fees and is your responsibility.",
      "Either party may end a retainer with 30 days' written notice. Fees for the notice period remain payable.",
    ],
  },
  {
    h: "4. Client Responsibilities",
    p: [
      "You agree to provide timely access, approvals, brand assets, and information reasonably required for us to perform the services.",
      "You are responsible for the accuracy and legality of materials you supply and for ensuring you hold the necessary rights to any content you ask us to publish.",
    ],
  },
  {
    h: "5. Intellectual Property & Ownership",
    p: [
      "Upon full payment, deliverables we create specifically for you in the course of an engagement become your property. We retain ownership of our pre-existing tools, templates, and know-how.",
      "We may showcase non-confidential work we produce for you in our portfolio and marketing unless you request otherwise in writing.",
    ],
  },
  {
    h: "6. Results & Disclaimer",
    p: [
      "Marketing outcomes depend on many factors outside our control, including market conditions and third-party platforms. While we work diligently toward agreed objectives, we do not guarantee specific results, revenue, or rankings.",
      'The website and services are provided "as is" without warranties of any kind, whether express or implied, to the fullest extent permitted by law.',
    ],
  },
  {
    h: "7. Limitation of Liability",
    p: [
      "To the maximum extent permitted by law, Trella will not be liable for any indirect, incidental, or consequential losses. Our total liability arising out of any engagement will not exceed the fees paid by you to us in the three months preceding the claim.",
    ],
  },
  {
    h: "8. Confidentiality",
    p: [
      "Each party agrees to keep confidential the non-public information of the other disclosed in connection with an engagement and to use it only for the purposes of that engagement.",
    ],
  },
  {
    h: "9. Third-Party Platforms",
    p: [
      "Our services may involve third-party platforms such as social networks, ad networks, and analytics providers. Your use of those platforms is subject to their own terms, and we are not responsible for their availability or actions.",
    ],
  },
  {
    h: "10. Changes to These Terms",
    p: [
      "We may update these Terms from time to time. The current version will always be posted on this page with a revised effective date. Continued use of our site or services constitutes acceptance of the updated Terms.",
    ],
  },
  {
    h: "11. Governing Law",
    p: [
      "These Terms are governed by the laws of Jamaica, and any disputes will be subject to the exclusive jurisdiction of the Jamaican courts.",
    ],
  },
  {
    h: "12. Contact Us",
    p: [
      `Questions about these Terms can be sent to ${brand.email} or ${brand.phone}, or by post to ${brand.address}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-14 lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-sm text-ink-soft">Last updated: {LAST_UPDATED}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-bold">{s.h}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">
                  {s.p.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
