"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticElement } from "@/components/effects/MagneticElement";
import { useTranslation } from "@/lib/i18n";

export function CTA() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-10 md:py-14 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#C13584]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <TextReveal
          text={`${t("cta.title")} ${t("cta.titleHighlight")}`}
          as="h2"
          gradientWords={[2]}
          className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl tracking-[0.02em] mb-6"
        />
        <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] mb-10 leading-relaxed max-w-lg mx-auto">
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticElement as="div" strength={0.25} radius={120} className="inline-block">
            <a
              href="mailto:osvaldas@reelize.lt"
              className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-10 py-4 rounded-full text-base transition-transform hover:scale-105 inline-flex items-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t("cta.emailLabel")}
            </a>
          </MagneticElement>
          <MagneticElement as="div" strength={0.25} radius={120} className="inline-block">
            <a
              href="https://instagram.com/jasnauskaite"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-10 py-4 rounded-full text-base hover:bg-[var(--surface)] transition-colors inline-block"
            >
              {t("cta.instagramLabel")}
            </a>
          </MagneticElement>
        </div>
      </motion.div>
    </section>
  );
}
