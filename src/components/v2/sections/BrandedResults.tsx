"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const STATS = [
  { value: "69+", key: "brandedResults.brands" },
  { value: "787", key: "brandedResults.posts" },
  { value: "493K", key: "brandedResults.avgViews" },
];

export default function BrandedResults() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="py-8 md:py-12 px-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-3xl flex items-center justify-center gap-6 md:gap-12">
        {STATS.map((stat, i) => (
          <div key={stat.key} className="flex items-center gap-6 md:gap-12">
            {i > 0 && (
              <span className="text-[var(--v2-border)] text-lg select-none">
                ·
              </span>
            )}
            <div className="text-center">
              <span className="block text-xl md:text-2xl font-bold v2-gradient-text font-[family-name:var(--font-heading)]">
                {stat.value}
              </span>
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)] mt-1">
                {t(stat.key)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
