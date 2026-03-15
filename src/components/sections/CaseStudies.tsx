"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { fadeInUp } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CaseStudyMetric {
  value: number;
  suffix: string;
  label: string;
}

interface CaseStudy {
  brand: string;
  tagKey: string;
  objectiveKey: string;
  metrics: CaseStudyMetric[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const caseStudies: CaseStudy[] = [
  {
    brand: "Stiliaus kodas",
    tagKey: "caseStudies.tags.longTerm",
    objectiveKey: "caseStudies.studies.stiliausKodas.objective",
    metrics: [
      { value: 2.1, suffix: "M", label: "reach" },
      { value: 89, suffix: "K", label: "engagement" },
      { value: 12, suffix: "%", label: "conversionLift" },
    ],
  },
  {
    brand: "Aruelle",
    tagKey: "caseStudies.tags.campaign",
    objectiveKey: "caseStudies.studies.aruelle.objective",
    metrics: [
      { value: 1.8, suffix: "M", label: "reach" },
      { value: 156, suffix: "K", label: "storyViews" },
      { value: 340, suffix: "%", label: "roi" },
    ],
  },
  {
    brand: "ODORO",
    tagKey: "caseStudies.tags.ambassador",
    objectiveKey: "caseStudies.studies.odoro.objective",
    metrics: [
      { value: 3.2, suffix: "M", label: "reach" },
      { value: 4.8, suffix: "%", label: "engagementRate" },
      { value: 67, suffix: "%", label: "brandAwareness" },
    ],
  },
  {
    brand: "Eurovaistine",
    tagKey: "caseStudies.tags.contentSeries",
    objectiveKey: "caseStudies.studies.eurovaistine.objective",
    metrics: [
      { value: 1.5, suffix: "M", label: "reach" },
      { value: 12, suffix: "K", label: "linkClicks" },
      { value: 28, suffix: "%", label: "repeatCollab" },
    ],
  },
  {
    brand: "Hellmann's",
    tagKey: "caseStudies.tags.holidayCampaign",
    objectiveKey: "caseStudies.studies.hellmanns.objective",
    metrics: [
      { value: 890, suffix: "K", label: "views" },
      { value: 45, suffix: "K", label: "saves" },
      { value: 1, suffix: "st", label: "topCreator" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Animated Number
// ---------------------------------------------------------------------------

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, value]);

  // Format: show decimal only if original value has one
  const hasDecimal = value % 1 !== 0;
  const absDisplay = Math.max(0, display);
  const formatted = hasDecimal ? absDisplay.toFixed(1) : Math.round(absDisplay).toString();

  return (
    <span className="ig-gradient-text font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-[320px] md:w-[360px] snap-center"
    >
      <div className="h-full rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 md:p-8 hover:border-[var(--muted)]/30 transition-colors duration-300 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-xl md:text-2xl tracking-[0.02em] text-[var(--foreground)]">
            {study.brand}
          </h3>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium font-[family-name:var(--font-inter)] tracking-wide uppercase rounded-full border border-[var(--border-color)] text-[var(--muted)]">
            {t(study.tagKey)}
          </span>
        </div>

        {/* Objective */}
        <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--muted)] leading-relaxed mb-5 flex-grow">
          {t(study.objectiveKey)}
        </p>

        {/* Gradient divider */}
        <div className="ig-gradient-line w-full rounded-full mb-5" />

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <AnimatedNumber
                value={metric.value}
                suffix={metric.suffix}
                inView={isInView}
              />
              <p className="font-[family-name:var(--font-inter)] text-[10px] md:text-xs text-[var(--muted)] mt-1 leading-tight">
                {t(`caseStudies.metrics.${metric.label}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Scroll Progress Dots
// ---------------------------------------------------------------------------

function ScrollDots({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background:
              i === activeIndex
                ? "linear-gradient(135deg, #833AB4, #C13584, #F77737)"
                : "var(--border-color)",
            transform: i === activeIndex ? "scale(1.25)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CaseStudies() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  // Track scroll position to update dots
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector("div")?.children[0]
      ? 360 + 20 // card width + gap
      : 380;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, caseStudies.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Drag-to-scroll
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = container.scrollLeft;
    container.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const container = scrollContainerRef.current;
      if (!container) return;

      const dx = e.clientX - dragStartX.current;
      container.scrollLeft = scrollStartX.current - dx;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      {/* Section title */}
      <div className="px-6 max-w-[800px] mx-auto mb-12 text-center">
        <TextReveal
          text={`${t("caseStudies.title")} ${t("caseStudies.titleHighlight")}`}
          as="h2"
          className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-5xl tracking-[0.02em]"
          gradientWords={[1]}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-inter)] text-[var(--muted)] mt-4 text-sm md:text-base max-w-md mx-auto"
        >
          {t("caseStudies.subtitle")}
        </motion.p>
      </div>

      {/* Scrollable carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex gap-5 overflow-x-auto px-6 md:px-16 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Leading spacer for centering first card on large screens */}
          <div className="flex-shrink-0 w-0 md:w-[calc((100vw-360px*3-40px)/2-64px)] hidden md:block" />

          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.brand} study={study} index={i} />
          ))}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-0 md:w-[calc((100vw-360px*3-40px)/2-64px)] hidden md:block" />
        </div>
      </div>

      {/* Scroll dots */}
      <ScrollDots total={caseStudies.length} activeIndex={activeIndex} />
    </section>
  );
}
