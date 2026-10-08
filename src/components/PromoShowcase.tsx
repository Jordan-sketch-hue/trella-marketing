"use client";

const SLIDES = [
  {
    bg: "/images/trella/professional-models.webp",
    service: "Professional Models",
    headline: "Beauty. Confidence. Impact.",
    wa: "I'm interested in Professional Models for my brand",
  },
  {
    bg: "/images/trella/dancers-promo-rep.webp",
    service: "Dancers & Promo Reps",
    headline: "Energy That Stops the Scroll.",
    wa: "I'd like to book Dancers & Promo Reps",
  },
  {
    bg: "/images/trella/green-dress-promo.webp",
    service: "Event Staffing",
    headline: "Every Room. Every Event.",
    wa: "I need Event Staffing for my event",
  },
  {
    bg: "/images/trella/brand-ambassador.webp",
    service: "Brand Ambassador",
    headline: "Your Brand. Our Mission.",
    wa: "I want Brand Ambassador services",
  },
];

const DURATION = 5;
const TOTAL = SLIDES.length * DURATION;

const CTA_BG: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
    "radial-gradient(ellipse 80% 55% at 5% 100%, rgba(245,166,35,0.13) 0%, transparent 60%)",
    "radial-gradient(ellipse 55% 40% at 95% 5%, rgba(22,1,154,0.18) 0%, transparent 55%)",
  ].join(", "),
  backgroundSize: "22px 22px, auto, auto",
  backgroundColor: "#060612",
};

export function PromoShowcase() {
  const waBase = "https://wa.me/18763149024?text=";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "min(96vh, 860px)", backgroundColor: "#060612" }}
    >
      <style>{`
        @keyframes trella-slide-start {
          0%, 22%    { opacity: 1; }
          27%, 100%  { opacity: 0; }
        }
        @keyframes trella-slide {
          0%, 3%     { opacity: 0; }
          8%, 22%    { opacity: 1; }
          27%, 100%  { opacity: 0; }
        }
        @keyframes trella-label-start {
          0%, 22%    { color: #f5a623; border-color: #f5a623; background: rgba(245,166,35,0.14); }
          27%, 100%  { color: rgba(255,255,255,0.35); border-color: rgba(255,255,255,0.12); background: transparent; }
        }
        @keyframes trella-label {
          0%, 6%     { color: rgba(255,255,255,0.35); border-color: rgba(255,255,255,0.12); background: transparent; }
          10%, 22%   { color: #f5a623; border-color: #f5a623; background: rgba(245,166,35,0.14); }
          27%, 100%  { color: rgba(255,255,255,0.35); border-color: rgba(255,255,255,0.12); background: transparent; }
        }
        @keyframes trella-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 flex flex-col sm:flex-row"
          style={i === 0 ? {
            animation: `trella-slide-start ${TOTAL}s linear infinite`,
            opacity: 1,
          } : {
            animation: `trella-slide ${TOTAL}s linear infinite`,
            animationDelay: `${i * DURATION}s`,
            animationFillMode: "backwards",
            opacity: 0,
          }}
        >
          {/* ── MOBILE: flyer fills space above the CTA strip ── */}
          <div className="relative min-h-0 flex-1 overflow-hidden sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.bg}
              alt={s.service}
              className="absolute inset-0 h-full w-full object-contain object-top"
            />
            {/* Color grade: warm tint + dark vignette at bottom → blends into CTA */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(6,6,18,0.08) 0%, transparent 25%, rgba(6,6,18,0.50) 78%, rgba(6,6,18,0.95) 100%)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(20,8,0,0.10)", mixBlendMode: "multiply" } as React.CSSProperties}
            />
          </div>

          {/* ── DESKTOP: dark textured CTA panel left ── */}
          <div
            className="relative hidden sm:flex w-[38%] shrink-0 flex-col justify-center px-10 py-16 lg:px-14"
            style={CTA_BG}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-[#060612]/90 to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#f5a623" }}>
              {s.service}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl">
              {s.headline}
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`${waBase}${encodeURIComponent(s.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#f5a623] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#e09410]"
              >
                Book Now — WhatsApp
              </a>
              <a
                href="tel:+18763149024"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                876-314-9024
              </a>
            </div>
          </div>

          {/* ── DESKTOP: full flyer right — image offset from top to clear label pills ── */}
          <div className="relative hidden flex-1 overflow-hidden sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.bg}
              alt={s.service}
              className="absolute left-0 right-0 bottom-0 w-full object-contain object-top"
              style={{ top: "44px" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(20,8,0,0.08)", mixBlendMode: "multiply" } as React.CSSProperties}
            />
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#060612]/70 to-transparent" />
          </div>

          {/* ── MOBILE: CTA strip — fixed minimum height so buttons always show ── */}
          <div
            className="shrink-0 flex flex-col justify-center px-5 sm:hidden"
            style={{ ...CTA_BG, minHeight: "210px", paddingBottom: "52px", paddingTop: "16px" }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: "#f5a623" }}>
              {s.service}
            </p>
            <h2 className="mt-1.5 text-xl font-bold leading-snug text-white">
              {s.headline}
            </h2>
            {/* Single wide gold CTA */}
            <a
              href={`${waBase}${encodeURIComponent(s.wa)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center rounded-xl py-3.5 text-[15px] font-bold text-black"
              style={{ background: "linear-gradient(90deg, #f5a623 0%, #e8900a 100%)" }}
            >
              Book Now on WhatsApp →
            </a>
            <a
              href="tel:+18763149024"
              className="mt-2.5 block text-center text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              or call  876-314-9024
            </a>
          </div>
        </div>
      ))}

      {/* ── SERVICE LABEL PILLS ── */}
      <div className="absolute left-3 right-3 top-3 z-20 flex flex-wrap gap-1 sm:left-8 sm:top-5 sm:gap-2">
        {SLIDES.map((s, i) => (
          <span
            key={i}
            className="rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[10px]"
            style={i === 0 ? {
              animation: `trella-label-start ${TOTAL}s linear infinite`,
            } : {
              animation: `trella-label ${TOTAL}s linear infinite`,
              animationDelay: `${i * DURATION}s`,
              animationFillMode: "backwards",
              color: "rgba(255,255,255,0.35)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            {s.service}
          </span>
        ))}
      </div>

      {/* ── SCROLLING TICKER ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 py-2"
        style={{ backgroundColor: "rgba(6,6,18,0.92)" }}
      >
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "trella-ticker 22s linear infinite" }}
        >
          {[...SLIDES, ...SLIDES].map((s, i) => (
            <span
              key={i}
              className="mx-8 text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px]"
              style={{ color: "#f5a623" }}
            >
              {s.service}{" "}
              <span className="mx-3" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}