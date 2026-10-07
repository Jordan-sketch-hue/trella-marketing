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

const DURATION = 5; // seconds per slide
const TOTAL = SLIDES.length * DURATION; // 20s

function delay(i: number) {
  // Negative delay pre-rolls each slide to the right point in the 20s cycle.
  // Slide 0 => delay 0s (visible at t=0)
  // Slide 1 => delay -15s (animation 75% done at t=0, wraps visible at t=5s)
  // Slide 2 => delay -10s (50% done, wraps visible at t=10s)
  // Slide 3 => delay -5s  (25% done, wraps visible at t=15s)
  const offset = ((SLIDES.length - i) % SLIDES.length) * DURATION;
  return offset === 0 ? "0s" : `-${offset}s`;
}

export function PromoShowcase() {
  const waBase = "https://wa.me/18763149024?text=";

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "min(92vh, 720px)" }}
    >
      <style>{`
        /* BG: visible 0-22%, fades out 22-25%, hidden 25-100% */
        @keyframes trella-bg {
          0%, 22%  { opacity: 1; transform: scale(1); }
          25%, 100% { opacity: 0; transform: scale(1.05); }
        }
        /* CONTENT: visible 0-20%, fades out 20-25%, hidden 25-100% */
        @keyframes trella-content {
          0%, 20%  { opacity: 1; transform: translateY(0); }
          25%, 100% { opacity: 0; transform: translateY(-10px); }
        }
        /* LABEL: gold + bright 0-22%, dim 25-100% */
        @keyframes trella-label {
          0%, 22%  {
            color: #f5a623;
            border-color: #f5a623;
            background: rgba(245,166,35,0.18);
            opacity: 1;
          }
          25%, 100% {
            color: rgba(255,255,255,0.45);
            border-color: rgba(255,255,255,0.18);
            background: transparent;
            opacity: 1;
          }
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
            animationDelay: delay(i),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.bg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
        </div>
      ))}

      {/* ── SERVICE LABEL INDICATORS (highlight per slide) ── */}
      <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap gap-2 sm:top-8 sm:left-10">
        {SLIDES.map((s, i) => (
          <span
            key={i}
            className="rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              animation: `trella-label ${TOTAL}s linear infinite`,
              animationDelay: delay(i),
            }}
          >
            {s.service}
          </span>
        ))}
      </div>

      {/* ── SLIDE CONTENT ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-20 sm:p-10 sm:pb-20 lg:p-16 lg:pb-20"
          style={{
            animation: `trella-content ${TOTAL}s linear infinite`,
            animationDelay: delay(i),
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

      {/* ── TICKER ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/70 py-2.5">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "trella-ticker 20s linear infinite" }}
        >
          {[...SLIDES, ...SLIDES].map((s, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]"
            >
              {s.service} <span className="mx-3 text-white/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}