"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { fadeInUp } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CaseStudy {
  brand: string;
  tagKey: string;
  objectiveKey: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const caseStudies: CaseStudy[] = [
  {
    brand: "Stiliaus kodas",
    tagKey: "caseStudies.tags.longTerm",
    objectiveKey: "caseStudies.studies.stiliausKodas.objective",
  },
  {
    brand: "Aruelle",
    tagKey: "caseStudies.tags.campaign",
    objectiveKey: "caseStudies.studies.aruelle.objective",
  },
  {
    brand: "ODORO",
    tagKey: "caseStudies.tags.ambassador",
    objectiveKey: "caseStudies.studies.odoro.objective",
  },
  {
    brand: "Eurovaistine",
    tagKey: "caseStudies.tags.contentSeries",
    objectiveKey: "caseStudies.studies.eurovaistine.objective",
  },
  {
    brand: "Hellmann's",
    tagKey: "caseStudies.tags.holidayCampaign",
    objectiveKey: "caseStudies.studies.hellmanns.objective",
  },
];

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-[280px] md:w-[320px] snap-center"
    >
      <div className="h-full rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-6 hover:border-[var(--muted)]/30 transition-colors duration-300 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg md:text-xl tracking-[0.02em] text-[var(--foreground)]">
            {study.brand}
          </h3>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium font-[family-name:var(--font-inter)] tracking-wide uppercase rounded-full border border-[var(--border-color)] text-[var(--muted)]">
            {t(study.tagKey)}
          </span>
        </div>

        {/* Gradient divider */}
        <div className="ig-gradient-line w-full rounded-full mb-3" />

        {/* Objective */}
        <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--muted)] leading-relaxed">
          {t(study.objectiveKey)}
        </p>
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
    <section className="py-10 md:py-14 overflow-hidden">
      {/* Section title */}
      <div className="px-6 max-w-[800px] mx-auto mb-8 text-center">
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
            overscrollBehaviorX: "contain",
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
