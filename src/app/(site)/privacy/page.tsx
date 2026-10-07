import { Container, Eyebrow } from "@/components/ui";
import { brand } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy — Trella Marketing Consultant",
  description:
    "How Trella Marketing Consultant collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "May 1, 2026";

const sections = [
  {
    h: "1. Introduction",
    p: [
      `This Privacy Policy explains how ${brand.name} ("Trella", "we", "us", or "our") collects, uses, and safeguards your information when you visit our website, contact us, or engage our marketing services.`,
      "By using our website or services, you consent to the practices described in this policy. If you do not agree, please discontinue use of the site.",
    ],
  },
  {
    h: "2. Information We Collect",
    p: [
      "Information you provide directly: your name, business name, email address, phone number, and any details you include when you complete a form, book a call, or correspond with us.",
      "Information collected automatically: device and browser type, IP address, pages viewed, and similar analytics data gathered through cookies and comparable technologies.",
      "Information from engagements: where you become a client, we may process content, campaign data, and account access you authorise us to manage on your behalf.",
    ],
  },
  {
    h: "3. How We Use Your Information",
    p: [
      "To respond to enquiries, schedule strategy calls, and provide the marketing services you request.",
      "To deliver, maintain, and improve our website and reporting, and to personalise your experience.",
      "To send service updates and, where you have opted in, occasional marketing communications. You can unsubscribe at any time.",
      "To meet legal, accounting, and regulatory obligations.",
    ],
  },
  {
    h: "4. Cookies & Analytics",
    p: [
      "We use cookies and analytics tools to understand how visitors use our site so we can improve it. You can control cookies through your browser settings, though disabling them may affect some functionality.",
    ],
  },
  {
    h: "5. Sharing Your Information",
    p: [
      "We do not sell your personal information. We may share it with trusted service providers (such as hosting, analytics, email, and advertising platforms) who process data on our behalf under appropriate confidentiality obligations.",
      "We may also disclose information where required by law or to protect our rights, safety, or property.",
    ],
  },
  {
    h: "6. Data Retention",
    p: [
      "We retain personal information only for as long as necessary to fulfil the purposes set out in this policy, to comply with our legal obligations, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    h: "7. Your Rights",
    p: [
      "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and you may object to or restrict certain processing. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    h: "8. Data Security",
    p: [
      "We apply reasonable technical and organisational measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    h: "9. Your Responsibilities",
    p: [
      "You are responsible for the accuracy of the information you provide, for activity under your account, and for keeping your login details secure. You agree to use our website and services only for lawful purposes, and that any content, account access, or materials you authorise us to manage on your behalf are yours to share and free of third-party restrictions.",
    ],
  },
  {
    h: "10. Service Provided As Is",
    p: [
      "Our website and services are provided on an as-is and as-available basis, without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant uninterrupted, secure, or error-free operation, and we do not guarantee any particular marketing result, ranking, reach, or return on investment.",
    ],
  },
  {
    h: "11. Limitation of Liability",
    p: [
      `To the maximum extent permitted by law, ${brand.name} and its owners, officers, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, goodwill, or business, arising out of or relating to your use of our website or services. Our total aggregate liability for any claim shall not exceed the greater of the fees you paid us in the three (3) months before the claim or ten thousand Jamaican dollars (J$10,000). Nothing limits liability that cannot lawfully be limited.`,
    ],
  },
  {
    h: "12. Indemnity",
    p: [
      `You agree to indemnify and hold harmless ${brand.name} and its representatives from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of your use of our services, the content or access you provide, or your breach of this policy or applicable law.`,
    ],
  },
  {
    h: "13. Our Rights",
    p: [
      "We may add, change, suspend, or discontinue any part of our website or services at any time, and may suspend or terminate any account or engagement at our discretion and without liability, including where we reasonably suspect misuse, non-payment, or a breach of this policy. We may use aggregated and de-identified information to operate, analyse, and improve our services.",
    ],
  },
  {
    h: "14. Changes & Governing Law",
    p: [
      "We may update this Privacy Policy from time to time; the latest version is always posted on this page with a revised effective date, and continued use constitutes acceptance. This policy and any dispute relating to it or our services are governed by the laws of Jamaica, and you submit to the exclusive jurisdiction of its courts.",
    ],
  },
  {
    h: "15. Contact Us",
    p: [
      `If you have questions about this Privacy Policy or how we handle your information, contact us at ${brand.email} or ${brand.phone}, or write to us at ${brand.address}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient-soft" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <Container className="relative py-14 lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Privacy Policy</h1>
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
