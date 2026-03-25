"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Letter-level parallax component                                    */
/* ------------------------------------------------------------------ */

function ParallaxLetters({
  text,
  className,
  scrollProgress,
  spread,
}: {
  text: string;
  className?: string;
  scrollProgress: import("framer-motion").MotionValue<number>;
  spread: number;
}) {
  const letters = text.split("");
  const mid = (letters.length - 1) / 2;

  return (
    <span className={className} aria-label={text}>
      {letters.map((char, i) => {
        const offset = (i - mid) * spread;
        return (
          <ParallaxLetter
            key={`${char}-${i}`}
            char={char}
            offset={offset}
            scrollProgress={scrollProgress}
          />
        );
      })}
    </span>
  );
}

function ParallaxLetter({
  char,
  offset,
  scrollProgress,
}: {
  char: string;
  offset: number;
  scrollProgress: import("framer-motion").MotionValue<number>;
}) {
  const x = useTransform(scrollProgress, [0, 1], [0, offset]);
  const y = useTransform(scrollProgress, [0, 1], [0, Math.abs(offset) * 0.3]);

  return (
    <motion.span
      className="inline-block"
      style={{ x, y }}
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "358K", label: "Followers" },
  { value: "5.2%", label: "Engagement", sublabel: "rolling 12 months" },
  { value: "315M+", label: "Total views" },
  { value: "8+", label: "Years" },
];

/* ------------------------------------------------------------------ */
/*  Shimmer button                                                     */
/* ------------------------------------------------------------------ */

function ShimmerButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const base =
    "relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-wider rounded-full transition-all duration-300 overflow-hidden";

  if (variant === "secondary") {
    return (
      <a
        href={href}
        className={`${base} border border-[var(--v2-border)] text-[var(--v2-text)] hover:border-[var(--v2-text-muted)] hover:bg-[var(--v2-surface)]`}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`${base} text-white`}
      style={{ background: "var(--v2-gradient)" }}
    >
      {/* Shimmer overlay */}
      <span
        className="absolute inset-0 animate-[shimmer_2.5s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)",
          backgroundSize: "250% 100%",
        }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll indicator                                                   */
/* ------------------------------------------------------------------ */

function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[v2-fade-in_0.8s_1s_ease_both]"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
        Scroll
      </span>
      <motion.svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        className="text-[var(--v2-text-muted)]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 4L8 18M8 18L14 12M8 18L2 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function KineticHero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Ambient glow pulse
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20"
      style={{ background: "var(--v2-bg)" }}
    >
      {/* Ambient IG gradient glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--v2-glow-purple) 0%, var(--v2-glow-magenta) 50%, transparent 100%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Name block */}
      <div className="relative z-10 flex flex-col items-center text-center animate-[v2-fade-in_0.6s_ease_both]">
        {/* Subtitle */}
        <div className="mb-6 md:mb-8 animate-[v2-fade-in_0.6s_0.1s_ease_both]">
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
            {t("hero.subtitle")}
          </span>
          <div
            className="mt-2 mx-auto h-[2px] rounded-full animate-[v2-fade-in_0.8s_0.5s_ease_both]"
            style={{ background: "var(--v2-gradient)" }}
          />
        </div>

        {/* INIDE */}
        <div
          className="leading-[0.85] font-[family-name:var(--font-heading)] font-bold text-black dark:text-[var(--v2-text)] animate-[v2-fade-in_0.7s_0.2s_ease_both]"
          style={{ fontSize: "clamp(60px, 12vw, 150px)" }}
        >
          <ParallaxLetters
            text={t("hero.firstName").toUpperCase()}
            scrollProgress={scrollYProgress}
            spread={8}
          />
        </div>

        {/* JASNAUSKAITĖ — main brand name */}
        <motion.div
          className="leading-[0.85] font-[family-name:var(--font-heading)] font-bold mt-1 md:mt-2 animate-[v2-fade-in_0.7s_0.3s_ease_both] v2-gradient-text-animated"
          style={{ fontSize: "clamp(28px, 8vw, 150px)" }}
        >
          JASNAUSKAITĖ
        </motion.div>
        {/* -JONAITĖ — secondary, understated */}
        <motion.div
          className="font-[family-name:var(--font-mono)] font-normal tracking-[0.3em] text-[var(--v2-text-muted)] uppercase animate-[v2-fade-in_0.6s_0.4s_ease_both]"
          style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}
        >
          Jonaitė
        </motion.div>

        {/* Description */}
        <p
          className="mt-6 md:mt-10 max-w-xl text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] animate-[v2-fade-in_0.6s_0.5s_ease_both]"
        >
          {t("hero.description")}
        </p>

        {/* CTAs */}
        <div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-[v2-fade-in_0.6s_0.6s_ease_both]"
        >
          <ShimmerButton href="#contact">
            {t("hero.cta")}
          </ShimmerButton>
          <ShimmerButton href="#work" variant="secondary">
            {t("hero.portfolio")}
          </ShimmerButton>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="relative z-10 mt-12 md:mt-16 w-full px-6 animate-[v2-fade-in_0.6s_0.8s_ease_both]"
      >
        <div className="mx-auto max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {stats.map((stat: { value: string; label: string; sublabel?: string }, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 ${
                i < stats.length - 1
                  ? "md:border-r md:border-[var(--v2-border)]"
                  : ""
              }`}
            >
              <span
                className="text-lg md:text-xl font-[family-name:var(--font-mono)] font-bold v2-gradient-text"
              >
                {stat.value}
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                {stat.label}
              </span>
              {stat.sublabel && (
                <span className="text-[8px] text-[var(--v2-text-muted)] opacity-60 font-[family-name:var(--font-body)] -mt-0.5">
                  {stat.sublabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Shimmer keyframe — injected once */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );
}
