"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CASE_STUDIES = [
  {
    name: "Mionetto",
    tag: "Lifestyle · Events",
    stats: "6.5M views · 1.1M likes",
    posts: "18 posts",
    objective:
      "Long-term lifestyle and events partnership — consistent brand presence across seasons with premium content.",
  },
  {
    name: "Akropolis",
    tag: "Fashion · Shopping",
    stats: "3.7M views · 163K likes",
    posts: "31 posts",
    objective:
      "Ongoing fashion retail partnership — seasonal lookbooks, store events, and lifestyle content driving foot traffic.",
  },
  {
    name: "Maxima",
    tag: "FMCG · Lifestyle",
    stats: "1.1M views · 59K likes",
    posts: "9 posts",
    objective:
      "Authentic lifestyle integration showcasing everyday moments with the brand — relatable, high-engagement content.",
  },
];

// ---------------------------------------------------------------------------
// Compact horizontal scroll cards
// ---------------------------------------------------------------------------

export default function EditorialCaseStudies() {
  return (
    <section className="py-14 md:py-20">
      {/* Header */}
      <div className="px-6 mx-auto max-w-5xl mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
          Case studies
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
          Selected{" "}
          <span className="v2-gradient-text">work</span>
        </h2>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-4 md:gap-6 px-6 pb-4" style={{ width: "max-content" }}>
          {CASE_STUDIES.map((study, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={study.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group w-[300px] md:w-[360px] shrink-0 p-6 md:p-8 rounded-2xl border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-all"
                style={{ background: "var(--v2-surface)" }}
              >
                {/* Number + gradient line */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-3xl font-bold v2-gradient-text font-[family-name:var(--font-mono)]">
                    {num}
                  </span>
                  <div className="flex-1 h-[2px] rounded-full" style={{ background: "var(--v2-gradient)" }} />
                </div>

                {/* Brand name */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 v2-gradient-text font-[family-name:var(--font-heading)]">
                  {study.name}
                </h3>

                {/* Tag */}
                <span className="inline-block mb-3 px-3 py-1 text-[10px] uppercase tracking-[0.15em] rounded-full border border-[var(--v2-border)] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
                  {study.tag}
                </span>

                {/* Stats */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm font-bold v2-gradient-text font-[family-name:var(--font-mono)]">
                    {study.stats}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)] mb-3">
                  {study.posts}
                </p>

                {/* Objective */}
                <p className="text-sm leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                  {study.objective}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <p className="mt-4 px-6 text-center text-xs text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)] md:hidden">
        Swipe to explore →
      </p>
    </section>
  );
}
