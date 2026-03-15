"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cellVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  },
});

// ---------------------------------------------------------------------------
// AnimatedNumber — inline utility
// ---------------------------------------------------------------------------

function AnimatedNumber({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          decimals > 0
            ? parseFloat(current.toFixed(decimals))
            : Math.floor(current)
        );
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Service icons for the quick-services cell
// ---------------------------------------------------------------------------

const serviceIcons = {
  reels: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  stories: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  tiktok: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  posts: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  ambassador: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// StatCell — reusable stat card with glow hover
// ---------------------------------------------------------------------------

function StatCell({
  value,
  suffix,
  decimals,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={cellVariant(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-transparent"
    >
      {/* IG gradient glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(131,58,180,0.08), rgba(193,53,132,0.08), rgba(247,119,55,0.08))",
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, #833AB4, #C13584, #F77737)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <p className="relative font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl tracking-[0.02em] ig-gradient-text">
        <AnimatedNumber target={value} suffix={suffix} decimals={decimals} />
      </p>
      <p className="relative text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mt-2">
        {label}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// BentoHero
// ---------------------------------------------------------------------------

export function BentoHero() {
  const { t } = useTranslation();

  const services = [
    { key: "reels", icon: serviceIcons.reels },
    { key: "stories", icon: serviceIcons.stories },
    { key: "tiktoks", icon: serviceIcons.tiktok },
    { key: "posts", icon: serviceIcons.posts },
    { key: "ambassador", icon: serviceIcons.ambassador },
  ];

  return (
    <section className="w-full px-4 md:px-6 pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(160px,auto)]">
        {/* ---------------------------------------------------------------
            Cell 1 — Main intro (2 cols x 2 rows)
        --------------------------------------------------------------- */}
        <motion.div
          variants={cellVariant(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-8 md:p-10 flex flex-col justify-center"
        >
          {/* Subtle radial glow */}
          <div
            className="pointer-events-none absolute top-0 right-0 w-[70%] h-[70%] opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, #C13584, transparent 70%)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase"
          >
            {t("bento.subtitle")}
          </motion.p>

          <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] leading-[1.1]">
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease }}
              className="inline-block"
            >
              {t("hero.firstName")}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="inline-block ig-gradient-text"
            >
              {t("hero.lastName")}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease }}
            className="text-base md:text-lg text-[var(--muted)] font-[family-name:var(--font-inter)] mt-5 max-w-md leading-relaxed"
          >
            {t("bento.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-7 py-3 rounded-full text-sm transition-transform hover:scale-105 inline-block"
            >
              {t("bento.cta")}
            </a>
            <a
              href="#portfolio"
              className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-7 py-3 rounded-full text-sm hover:bg-[var(--surface)] transition-colors inline-block"
            >
              {t("bento.viewWork")}
            </a>
          </motion.div>
        </motion.div>

        {/* ---------------------------------------------------------------
            Cell 2 — Instagram followers
        --------------------------------------------------------------- */}
        <StatCell
          value={354}
          suffix="K+"
          decimals={0}
          label={t("bento.followers")}
          delay={0.15}
        />

        {/* ---------------------------------------------------------------
            Cell 3 — Engagement rate
        --------------------------------------------------------------- */}
        <StatCell
          value={4.2}
          suffix="%"
          decimals={1}
          label={t("bento.engagement")}
          delay={0.25}
        />

        {/* ---------------------------------------------------------------
            Cell 4 — Brands
        --------------------------------------------------------------- */}
        <StatCell
          value={50}
          suffix="+"
          decimals={0}
          label={t("bento.brands")}
          delay={0.35}
        />

        {/* ---------------------------------------------------------------
            Cell 5 — Years experience
        --------------------------------------------------------------- */}
        <StatCell
          value={8}
          suffix="+"
          decimals={0}
          label={t("bento.experience")}
          delay={0.45}
        />

        {/* ---------------------------------------------------------------
            Cell 6 — Instagram embed (2 cols)
        --------------------------------------------------------------- */}
        <motion.div
          variants={cellVariant(0.55)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="md:col-span-2 relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--background)] min-h-[320px]"
        >
          <iframe
            src="https://www.instagram.com/p/DTpUe_fiBCu/embed/"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allowTransparency
            title="Instagram post by @jasnauskaite"
          />

          {/* Bottom gradient overlay with link */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent flex items-end justify-center pb-4 z-10">
            <a
              href="https://www.instagram.com/p/DTpUe_fiBCu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-[family-name:var(--font-inter)] font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              {t("bento.viewInstagram")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------
            Cell 7 — Quick services (2 cols)
        --------------------------------------------------------------- */}
        <motion.div
          variants={cellVariant(0.65)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="md:col-span-2 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 md:p-8 flex flex-col justify-center"
        >
          <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)] tracking-widest uppercase mb-5">
            {t("bento.services")}
          </p>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {services.map((svc) => (
              <div
                key={svc.key}
                className="group flex flex-col items-center gap-2 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl border border-[var(--border-color)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:border-[#C13584]/30 group-hover:shadow-md group-hover:shadow-[#C13584]/5 transition-all duration-300">
                  {svc.icon}
                </div>
                <span className="text-xs font-[family-name:var(--font-inter)] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  {t(`services.${svc.key}.title`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
