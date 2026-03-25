"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  LithuaniaImpact — Lithuanian market relevance section               */
/* ------------------------------------------------------------------ */

const LT_STATS = [
  { value: "358K", label: "LT reach / month" },
  { value: "~1.3M", label: "LT views / month" },
  { value: "89", label: "Viral posts (500K+)" },
  { value: "1,000+", label: "Total posts" },
];

export default function LithuaniaImpact() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{
            background: "radial-gradient(circle, #833AB4, #C13584, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
            Lithuania impact
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--v2-text)] leading-tight">
            Content that reaches{" "}
            <span className="v2-gradient-text">all of Lithuania</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {LT_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 ${
                i < LT_STATS.length - 1
                  ? "md:border-r md:border-[var(--v2-border)]"
                  : ""
              }`}
            >
              <span className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-mono)] v2-gradient-text">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Key insight card */}
        <motion.div
          className="relative mx-auto max-w-2xl p-8 md:p-10 rounded-2xl border border-[var(--v2-border)]"
          style={{ background: "var(--v2-surface)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Gradient top line */}
          <div
            className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
            style={{ background: "var(--v2-gradient)" }}
          />

          <div className="text-center">
            <span className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-mono)] v2-gradient-text">
              4.3x
            </span>
            <p className="mt-4 text-base md:text-lg text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] leading-relaxed">
              More Lithuanians see the content than follow the account.{" "}
              <span className="text-[var(--v2-text)] font-medium">
                28% of Lithuanian Instagram users
              </span>{" "}
              see the content monthly.
            </p>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center text-sm text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Performance data based on Instagram Insights
        </motion.p>
      </div>
    </section>
  );
}
