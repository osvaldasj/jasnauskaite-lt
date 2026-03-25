"use client";

/* ------------------------------------------------------------------ */
/*  StatsTicker — full-width kinetic stats band                        */
/* ------------------------------------------------------------------ */

const STATS_TEXT =
  "358K FOLLOWERS \u00B7 6.8% ENGAGEMENT \u00B7 295M+ VIEWS \u00B7 217M+ REACH \u00B7 25+ BRANDS \u00B7 125K TIKTOK \u00B7 ";

// Repeat enough times to fill wide screens seamlessly
const REPETITIONS = 8;

export default function StatsTicker() {
  const repeatedText = Array(REPETITIONS).fill(STATS_TEXT).join("");

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--v2-surface)]"
      aria-label="Statistics"
    >
      {/* Top gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)",
        }}
      />

      {/* Ticker content */}
      <div className="py-4 overflow-hidden">
        <div
          className="flex w-max"
          style={{
            animation: "v2-marquee 35s linear infinite",
          }}
        >
          {/* Two identical blocks — when first scrolls out, second takes over */}
          <span
            className="v2-gradient-text font-[family-name:var(--font-mono)] uppercase whitespace-nowrap tracking-[0.15em] font-medium shrink-0"
            style={{
              fontSize: "clamp(14px, 2vw, 20px)",
            }}
          >
            {repeatedText}
          </span>
          <span
            className="v2-gradient-text font-[family-name:var(--font-mono)] uppercase whitespace-nowrap tracking-[0.15em] font-medium shrink-0"
            style={{
              fontSize: "clamp(14px, 2vw, 20px)",
            }}
          >
            {repeatedText}
          </span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)",
        }}
      />
    </section>
  );
}
