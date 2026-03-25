"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextReveal } from "@/components/effects/TextReveal";
import { useTranslation } from "@/lib/i18n";

const serviceIcons = {
  reels: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  stories: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  tiktoks: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  metaAds: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  ambassador: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const serviceKeys = ["reels", "stories", "tiktoks", "metaAds", "ambassador"] as const;

export function Services() {
  const { t } = useTranslation();

  const workTypes = serviceKeys.map((key) => ({
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
    icon: serviceIcons[key],
  }));

  if (workTypes.length === 0) return null;

  return (
    <section id="work" className="py-10 md:py-14 px-6">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            {t("services.label")}
          </p>
          <TextReveal
            text={`${t("services.title")} ${t("services.titleHighlight")}`}
            as="h2"
            gradientWords={[2]}
            className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {workTypes.map((work) => (
            <motion.div
              key={work.title}
              variants={fadeInUp}
              className="group p-6 rounded-xl border border-[var(--border-color)] hover:border-[#C13584]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#C13584]/5"
            >
              <div className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors mb-4">
                {work.icon}
              </div>
              <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-lg mb-2 tracking-[0.02em]">
                {work.title}
              </h3>
              <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] leading-relaxed">
                {work.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
