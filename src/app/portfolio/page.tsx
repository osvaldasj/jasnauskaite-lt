"use client";

import { motion } from "framer-motion";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTranslation } from "@/lib/i18n";

export default function PortfolioPage() {
  const { t } = useTranslation();

  return (
    <>
      <CursorGlow />
      <GrainTexture />
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Theme toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="w-16 mx-auto mb-6 h-[2px] animated-ig-gradient-line" />

          <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em] mb-3">
            {t("comingSoon.title")}
          </h1>

          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] max-w-sm mx-auto leading-relaxed mb-8">
            {t("comingSoon.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://instagram.com/jasnauskaite"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @jasnauskaite
            </a>
            <a
              href="/"
              className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-6 py-3 rounded-full text-sm hover:bg-[var(--surface)] transition-colors inline-flex items-center gap-2 justify-center"
            >
              {t("comingSoon.back")}
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
