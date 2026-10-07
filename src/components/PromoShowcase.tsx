"use client";

const SLIDES = [
  {
    bg: "/images/trella/professional-models.webp",
    pill: "Professional Models",
    headline: "Beauty. Confidence. Impact.",
    sub: "Top-tier models for your brand campaigns, activations & shoots.",
    wa: "I'm interested in Professional Models for my brand",
  },
  {
    bg: "/images/trella/dancers-promo-rep.webp",
    pill: "Dancers & Promo Reps",
    headline: "Energy, Style & Brand Impact.",
    sub: "Dancers & promotional reps that make your event unforgettable.",
    wa: "I'd like to book Dancers & Promo Reps",
  },
  {
    bg: "/images/trella/green-dress-promo.webp",
    pill: "Event Staffing",
    headline: "Let's Work Together!",
    sub: "Pole events, club openings, bachelor parties & stage performances.",
    wa: "I need Event Staffing for my event",
  },
  {
    bg: "/images/trella/brand-ambassador.webp",
    pill: "Brand Ambassador",
    headline: "Your Brand. Our Mission.",
    sub: "We create awareness, drive sales & build trust for your brand.",
    wa: "I want to discuss Brand Ambassador services",
  },
];

const DURATION = 5; // seconds per slide
const TOTAL = SLIDES.length * DURATION;
const TICKER_ITEMS = ["Brand Ambassador", "Dancers & Promo Reps", "Event Staffing", "Marketing & Advertising"];

export function PromoShowcase() {
  const waBase = "https://wa.me/18763149024?text=";

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "min(90vh,680px)" }}>
      <style>{`
        @keyframes slide-in {
          0%,100%   { opacity:0; transform:scale(1.04); }
          8%,88%    { opacity:1; transform:scale(1); }
        }
        @keyframes slide-text {
          0%,100%   { opacity:0; transform:translateY(14px); }
          10%,85%   { opacity:1; transform:translateY(0); }
        }
        @keyframes ticker {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
      `}</style>

      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: `slide-in ${TOTAL}s linear infinite`,
            animationDelay: `${i * DURATION}s`,
            opacity: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.bg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Content */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14"
            style={{ animation: `slide-text ${TOTAL}s linear infinite`, animationDelay: `${i * DURATION}s`, opacity: 0 }}
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-[#f5a623] px-4 py-1 text-xs font-bold uppercase tracking-widest text-black">
              {s.pill}
            </span>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{s.headline}</h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80">{s.sub}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`${waBase}${encodeURIComponent(s.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5a623] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#e09410]"
              >
                Book Now — WhatsApp
              </a>
              <a
                href="tel:+18763149024"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                876-314-9024
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Slide dots */}
      <div className="absolute bottom-24 right-6 flex flex-col gap-1.5 sm:bottom-20 sm:right-8">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/40"
            style={{
              animation: `slide-in ${TOTAL}s linear infinite`,
              animationDelay: `${i * DURATION}s`,
            }}
          />
        ))}
      </div>

      {/* Scrolling ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/10 bg-black/70 py-2.5">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "ticker 18s linear infinite" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((label, i) => (
            <span key={i} className="mx-8 text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]">
              {label} <span className="mx-3 text-white/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
