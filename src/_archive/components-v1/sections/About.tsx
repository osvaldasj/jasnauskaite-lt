"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextReveal } from "@/components/effects/TextReveal";
import { useTranslation } from "@/lib/i18n";

export function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-10 md:py-14 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[800px] mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Image placeholder */}
        <motion.div
          variants={fadeInUp}
          className="aspect-[3/4] bg-[var(--surface)] rounded-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #833AB4, #C13584, #F77737)' }} />
              <span className="text-[var(--muted)] font-[family-name:var(--font-inter)] text-sm">
                {t("about.handle")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div variants={fadeInUp}>
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            {t("about.label")}
          </p>
          <TextReveal
            text={`${t("about.title")} ${t("about.titleHighlight")}`}
            as="h2"
            gradientWords={[3]}
            className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em] mb-6"
          />
          <div className="space-y-4 text-[var(--muted)] font-[family-name:var(--font-inter)] leading-relaxed">
            <p>
              {t("about.paragraph1")}
            </p>
            <p>
              {t("about.paragraph2")}
            </p>
            <p>
              {t("about.paragraph3Pre")}{" "}
              <span className="text-[var(--foreground)] font-medium">
                {t("about.paragraph3Company")}
              </span>{" "}
              {t("about.paragraph3Post")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
