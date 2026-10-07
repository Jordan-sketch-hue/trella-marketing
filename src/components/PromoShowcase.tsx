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
        /*
         * Split hero: flyer image is CONTAINED (no crop/zoom) on the right.
         * Left dark panel holds the CTA.
         * Slide 0 (trella-*-start) is immediately visible; slides 1-3 wait.
         */
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
          className="absolute inset-0 flex"
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
          {/* LEFT: dark CTA panel — stays clear of the flyer art */}
          <div className="relative z-10 flex w-2/5 shrink-0 flex-col justify-center px-8 py-16 lg:px-14 bg-black/95 lg:w-[38%]">
            {/* Subtle diagonal blend into the image */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-black/95 to-transparent" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]">{s.service}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {s.headline}
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href={`${waBase}${encodeURIComponent(s.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#f5a623] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#e09410]"
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

          {/* RIGHT: full flyer at object-contain — no cropping */}
          <div className="relative flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.bg}
              alt={s.service}
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            {/* Blend edge on the left where it meets the CTA panel */}
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
        </div>
      ))}

      {/* ── SERVICE LABEL PILLS ── */}
      <div className="absolute left-6 right-6 top-5 z-20 flex flex-wrap gap-2 sm:left-8 sm:top-6">
        {SLIDES.map((s, i) => (
          <span
            key={i}
            className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
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
            <span key={i} className="mx-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5a623]">
              {s.service} <span className="mx-3 text-white/25">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}