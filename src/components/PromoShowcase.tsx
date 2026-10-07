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

const DURATION = 5;   // seconds each slide is "on"
const TOTAL = SLIDES.length * DURATION; // 20s full cycle

export function PromoShowcase() {
  const waBase = "https://wa.me/18763149024?text=";

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "min(92vh, 720px)" }}
    >
      <style>{`
        /*
         * Each slide owns 5s out of the 20s cycle (25%).
         * Keyframe windows (as % of 20s):
         *   0–3%   fade-in     (0–0.6s)
         *   3–22%  fully on    (0.6–4.4s)
         *   22–27% fade-out    (4.4–5.4s)  — overlaps next slide's fade-in
         *   27–100% hidden
         *
         * Slides are staggered with animation-delay 0s / 5s / 10s / 15s.
         * animation-fill-mode: backwards keeps each slide invisible
         * during its delay window (before it starts).
         */
        @keyframes trella-bg {
          0%, 3%     { opacity: 0; transform: scale(1.05); }
          7%, 22%    { opacity: 1; transform: scale(1);    }
          27%, 100%  { opacity: 0; transform: scale(1.03); }
        }
        @keyframes trella-text {
          0%, 5%     { opacity: 0; transform: translateY(14px); }
          10%, 20%   { opacity: 1; transform: translateY(0);    }
          25%, 100%  { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes trella-label {
          0%, 5%     { color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.18); background: transparent; }
          8%, 22%    { color: #f5a623; border-color: #f5a623; background: rgba(245,166,35,0.18); }
          27%, 100%  { color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.18); background: transparent; }
        }
        @keyframes trella-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── BACKGROUND SLIDES ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: `trella-bg ${TOTAL}s linear infinite`,
            animationDelay: `${i * DURATION}s`,
            animationFillMode: "backwards",
            opacity: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.bg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
        </div>
      ))}

      {/* ── SERVICE LABELS (glow gold on active slide) ── */}
      <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap gap-2 sm:top-8 sm:left-10">
        {SLIDES.map((s, i) => (
          <span
            key={i}
            className="rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              animation: `trella-label ${TOTAL}s linear infinite`,
              animationDelay: `${i * DURATION}s`,
              animationFillMode: "backwards",
              color: "rgba(255,255,255,0.4)",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            {s.service}
          </span>
        ))}
      </div>

      {/* ── SLIDE TEXT + CTA ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-20 sm:p-10 sm:pb-20 lg:p-16 lg:pb-20"
          style={{
            animation: `trella-text ${TOTAL}s linear infinite`,
            animationDelay: `${i * DURATION}s`,
            animationFillMode: "backwards",
            opacity: 0,
          }}
        >
          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {s.headline}
          </h2>
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
      ))}

      {/* ── SCROLLING TICKER ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/70 py-2.5">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "trella-ticker 20s linear infinite" }}
        >
          {[...SLIDES, ...SLIDES].map((s, i) => (
            <span key={i} className="mx-8 text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]">
              {s.service} <span className="mx-3 text-white/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}