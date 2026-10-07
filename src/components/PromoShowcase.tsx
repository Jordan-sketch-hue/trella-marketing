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
const TOTAL = SLIDES.length * DURATION; // 20s

export function PromoShowcase() {
  const waBase = "https://wa.me/18763149024?text=";

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "min(92vh, 720px)" }}
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
        @keyframes trella-text-start {
          0%, 20%    { opacity: 1; transform: translateY(0); }
          25%, 100%  { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes trella-text {
          0%, 6%     { opacity: 0; transform: translateY(12px); }
          12%, 20%   { opacity: 1; transform: translateY(0); }
          25%, 100%  { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes trella-label-start {
          0%, 22%    { color: #f5a623; border-color: #f5a623; background: rgba(245,166,35,0.15); }
          27%, 100%  { color: rgba(255,255,255,0.38); border-color: rgba(255,255,255,0.15); background: transparent; }
        }
        @keyframes trella-label {
          0%, 6%     { color: rgba(255,255,255,0.38); border-color: rgba(255,255,255,0.15); background: transparent; }
          10%, 22%   { color: #f5a623; border-color: #f5a623; background: rgba(245,166,35,0.15); }
          27%, 100%  { color: rgba(255,255,255,0.38); border-color: rgba(255,255,255,0.15); background: transparent; }
        }
        @keyframes trella-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── SLIDE LAYERS ── */}
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
          {/*
           * MOBILE: stacked — flyer on top (60%), CTA below (40%)
           * DESKTOP (sm+): side-by-side — dark CTA left 38%, flyer right 62%
           */}

          {/* MOBILE ONLY: flyer on top */}
          <div className="relative h-[55%] w-full shrink-0 sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.bg}
              alt={s.service}
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            {/* Bottom fade into CTA panel below */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          </div>

          {/* DESKTOP: dark CTA panel on the left */}
          <div className="relative hidden sm:flex w-[38%] shrink-0 flex-col justify-center px-10 py-16 lg:px-14 bg-black/95">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-r from-black/95 to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]">{s.service}</p>
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
                className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                876-314-9024
              </a>
            </div>
          </div>

          {/* DESKTOP: full flyer on the right */}
          <div className="relative hidden flex-1 overflow-hidden sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.bg}
              alt={s.service}
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent" />
          </div>

          {/* MOBILE: CTA panel below the flyer */}
          <div className="flex min-h-0 flex-1 flex-col justify-center px-6 pb-14 pt-2 sm:hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5a623]">{s.service}</p>
            <h2 className="mt-1.5 text-2xl font-bold leading-snug text-white">
              {s.headline}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={`${waBase}${encodeURIComponent(s.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#f5a623] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#e09410]"
              >
                Book Now — WhatsApp
              </a>
              <a
                href="tel:+18763149024"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
              >
                876-314-9024
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* ── SERVICE LABEL PILLS ── */}
      <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap gap-1.5 sm:left-8 sm:top-5 sm:gap-2">
        {SLIDES.map((s, i) => (
          <span
            key={i}
            className="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest sm:px-3 sm:text-[10px]"
            style={i === 0 ? {
              animation: `trella-label-start ${TOTAL}s linear infinite`,
            } : {
              animation: `trella-label ${TOTAL}s linear infinite`,
              animationDelay: `${i * DURATION}s`,
              animationFillMode: "backwards",
              color: "rgba(255,255,255,0.38)",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            {s.service}
          </span>
        ))}
      </div>

      {/* ── SCROLLING TICKER ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/90 py-2">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "trella-ticker 22s linear infinite" }}
        >
          {[...SLIDES, ...SLIDES].map((s, i) => (
            <span key={i} className="mx-8 text-[9px] font-bold uppercase tracking-[0.22em] text-[#f5a623] sm:text-[10px]">
              {s.service} <span className="mx-3 text-white/25">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}