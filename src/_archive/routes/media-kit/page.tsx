"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTranslation } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const METRICS = [
  { key: "followers", value: 354, suffix: "K+", icon: InstagramIcon },
  { key: "tiktok", value: 125, suffix: "K+", icon: TikTokIcon },
  { key: "engagement", value: 4.2, suffix: "%", decimals: 1, icon: HeartIcon },
  { key: "brands", value: 50, suffix: "+", icon: BriefcaseIcon },
  { key: "experience", value: 8, suffix: "+", icon: CalendarIcon },
  { key: "reach", value: 2.1, suffix: "M+", decimals: 1, icon: EyeIcon },
];

const DEMOGRAPHICS = {
  gender: [
    { label: "Female", percentage: 78 },
    { label: "Male", percentage: 22 },
  ],
  age: [
    { label: "18-24", percentage: 15 },
    { label: "25-34", percentage: 52 },
    { label: "35-44", percentage: 23 },
    { label: "45+", percentage: 10 },
  ],
  locations: [
    { label: "Lithuania", percentage: 68 },
    { label: "Latvia", percentage: 8 },
    { label: "Estonia", percentage: 5 },
    { label: "Other", percentage: 19 },
  ],
};

const SERVICES = [
  { key: "reels", icon: ReelIcon },
  { key: "stories", icon: StoriesIcon },
  { key: "tiktok", icon: TikTokServiceIcon },
  { key: "posts", icon: PostIcon },
  { key: "ambassador", icon: AmbassadorIcon },
  { key: "campaign", icon: CampaignIcon },
];

const BRAND_PARTNERS = [
  "Stiliaus kodas",
  "Aruelle",
  "Eurovaistine",
  "ODORO",
  "Perfectil",
  "Lancome",
  "Hellmann's",
  "McDonald's",
  "Barbora",
  "Akropolis",
  "Mionetto",
  "Maxima",
  "Nissan",
  "GoVilnius",
  "DailySpoon",
];

// ---------------------------------------------------------------------------
// Icons (inline SVGs)
// ---------------------------------------------------------------------------

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ReelIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function StoriesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TikTokServiceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function PostIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function AmbassadorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CampaignIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(
  end: number,
  duration: number,
  isInView: boolean,
  decimals = 0
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView, decimals]);

  return count;
}

// ---------------------------------------------------------------------------
// Animated bar component
// ---------------------------------------------------------------------------

function AnimatedBar({
  percentage,
  label,
  delay = 0,
}: {
  percentage: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-[family-name:var(--font-inter)] text-[var(--foreground)]">
          {label}
        </span>
        <span className="text-sm font-[family-name:var(--font-inter)] font-medium text-[var(--muted)]">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--surface)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #833AB4, #C13584, #F77737)",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay,
            ease: EASE,
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Metric card component
// ---------------------------------------------------------------------------

function MetricCard({
  metricKey,
  value,
  suffix,
  decimals = 0,
  Icon,
  label,
  index,
}: {
  metricKey: string;
  value: number;
  suffix: string;
  decimals?: number;
  Icon: () => React.JSX.Element;
  label: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const count = useAnimatedCounter(value, 1800, isInView, decimals);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="relative group p-6 md:p-8 rounded-2xl border border-[var(--border-color)] hover:border-[#C13584]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#C13584]/5"
    >
      <div className="text-[var(--muted)] mb-4 group-hover:text-[var(--foreground)] transition-colors">
        <Icon />
      </div>
      <div className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-tight">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        <span className="ig-gradient-text">{suffix}</span>
      </div>
      <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mt-1">
        {label}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Service card component
// ---------------------------------------------------------------------------

function ServiceCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: () => React.JSX.Element;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="group p-6 md:p-8 rounded-2xl border border-[var(--border-color)] hover:border-[#C13584]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#C13584]/5"
    >
      <div className="text-[var(--muted)] mb-4 group-hover:text-[var(--foreground)] transition-colors">
        <Icon />
      </div>
      <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg mb-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`w-full max-w-5xl mx-auto px-6 md:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section label
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-8 h-[2px] ig-gradient-line rounded-full" />
      <span className="text-xs font-[family-name:var(--font-inter)] font-medium tracking-widest uppercase text-[var(--muted)]">
        {children}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function MediaKitPage() {
  const { t } = useTranslation();

  // Set document title on mount
  useEffect(() => {
    document.title = "Media Kit — Inide Jasnauskaite";
  }, []);

  // Refs for sections
  const metricsRef = useRef(null);
  const demographicsRef = useRef(null);
  const servicesRef = useRef(null);
  const partnersRef = useRef(null);
  const ctaRef = useRef(null);

  const metricsInView = useInView(metricsRef, { once: true, margin: "-50px" });
  const demographicsInView = useInView(demographicsRef, { once: true, margin: "-50px" });
  const partnersInView = useInView(partnersRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <>
      <CursorGlow />
      <GrainTexture />

      <div className="min-h-screen bg-[var(--background)] relative">
        {/* Theme toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* ============================================ */}
        {/* Section 1: Header                            */}
        {/* ============================================ */}
        <Section className="pt-20 md:pt-32 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <p className="text-xs font-[family-name:var(--font-inter)] font-medium tracking-widest uppercase text-[var(--muted)] mb-4">
              {t("mediaKit.header.label")}
            </p>

            <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-3">
              {t("mediaKit.header.name")}
            </h1>

            <div className="w-24 mx-auto my-6 h-[2px] animated-ig-gradient-line" />

            <p className="text-base md:text-lg text-[var(--muted)] font-[family-name:var(--font-inter)] max-w-lg mx-auto leading-relaxed">
              {t("mediaKit.header.positioning")}
            </p>
          </motion.div>
        </Section>

        {/* ============================================ */}
        {/* Section 2: Key metrics (bento grid)          */}
        {/* ============================================ */}
        <Section className="pb-20 md:pb-28" id="metrics">
          <div ref={metricsRef}>
            <SectionLabel>{t("mediaKit.metrics.label")}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl tracking-tight mb-10"
            >
              {t("mediaKit.metrics.title")}{" "}
              <span className="ig-gradient-text">
                {t("mediaKit.metrics.titleHighlight")}
              </span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {METRICS.map((metric, i) => (
                <MetricCard
                  key={metric.key}
                  metricKey={metric.key}
                  value={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                  Icon={metric.icon}
                  label={t(`mediaKit.metrics.${metric.key}`)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* Section 3: Audience demographics              */}
        {/* ============================================ */}
        <Section className="pb-20 md:pb-28" id="audience">
          <div ref={demographicsRef}>
            <SectionLabel>{t("mediaKit.audience.label")}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={demographicsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl tracking-tight mb-10"
            >
              {t("mediaKit.audience.title")}{" "}
              <span className="ig-gradient-text">
                {t("mediaKit.audience.titleHighlight")}
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Gender */}
              <div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-base mb-5 text-[var(--foreground)]">
                  {t("mediaKit.audience.gender")}
                </h3>
                <div className="space-y-4">
                  {DEMOGRAPHICS.gender.map((item, i) => (
                    <AnimatedBar
                      key={item.label}
                      label={t(`mediaKit.audience.${item.label.toLowerCase()}`)}
                      percentage={item.percentage}
                      delay={i * 0.15}
                    />
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-base mb-5 text-[var(--foreground)]">
                  {t("mediaKit.audience.age")}
                </h3>
                <div className="space-y-4">
                  {DEMOGRAPHICS.age.map((item, i) => (
                    <AnimatedBar
                      key={item.label}
                      label={item.label}
                      percentage={item.percentage}
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-base mb-5 text-[var(--foreground)]">
                  {t("mediaKit.audience.topLocations")}
                </h3>
                <div className="space-y-4">
                  {DEMOGRAPHICS.locations.map((item, i) => (
                    <AnimatedBar
                      key={item.label}
                      label={t(`mediaKit.audience.loc_${item.label.toLowerCase()}`)}
                      percentage={item.percentage}
                      delay={i * 0.1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* Section 4: Content formats and pricing        */}
        {/* ============================================ */}
        <Section className="pb-20 md:pb-28" id="services">
          <SectionLabel>{t("mediaKit.services.label")}</SectionLabel>
          <motion.h2
            ref={servicesRef}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl tracking-tight mb-10"
          >
            {t("mediaKit.services.title")}{" "}
            <span className="ig-gradient-text">
              {t("mediaKit.services.titleHighlight")}
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.key}
                title={t(`mediaKit.services.${service.key}.title`)}
                description={t(`mediaKit.services.${service.key}.description`)}
                Icon={service.icon}
                index={i}
              />
            ))}
          </div>
        </Section>

        {/* ============================================ */}
        {/* Section 5: Brand partners                     */}
        {/* ============================================ */}
        <Section className="pb-20 md:pb-28" id="partners">
          <div ref={partnersRef}>
            <SectionLabel>{t("mediaKit.partners.label")}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl tracking-tight mb-10"
            >
              {t("mediaKit.partners.title")}{" "}
              <span className="ig-gradient-text">
                {t("mediaKit.partners.titleHighlight")}
              </span>
            </motion.h2>

            <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 justify-center">
              {BRAND_PARTNERS.map((brand, i) => (
                <motion.span
                  key={brand}
                  initial={{ opacity: 0, y: 10 }}
                  animate={partnersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.04,
                    ease: EASE,
                  }}
                  className="font-[family-name:var(--font-outfit)] font-medium text-base md:text-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300 cursor-default select-none"
                >
                  {brand}
                </motion.span>
              ))}
            </div>
          </div>
        </Section>

        {/* ============================================ */}
        {/* Section 6: CTA                                */}
        {/* ============================================ */}
        <Section className="pb-24 md:pb-36" id="contact">
          <div ref={ctaRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center"
            >
              <div className="w-16 mx-auto mb-8 h-[2px] animated-ig-gradient-line" />

              <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-5xl tracking-tight mb-4">
                {t("mediaKit.cta.title")}
              </h2>

              <p className="text-sm md:text-base text-[var(--muted)] font-[family-name:var(--font-inter)] max-w-md mx-auto leading-relaxed mb-10">
                {t("mediaKit.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:osvaldas@reelize.lt"
                  className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2 justify-center"
                >
                  <MailIcon />
                  osvaldas@reelize.lt
                </a>
                <a
                  href="https://instagram.com/jasnauskaite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm hover:bg-[var(--surface)] transition-colors inline-flex items-center gap-2 justify-center"
                >
                  <InstagramIcon />
                  @jasnauskaite
                </a>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Footer note */}
        <div className="pb-8 text-center">
          <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)]">
            @jasnauskaite
          </p>
        </div>
      </div>
    </>
  );
}
