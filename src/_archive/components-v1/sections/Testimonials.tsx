"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { TiltCard } from "@/components/effects/TiltCard";
import { useTranslation } from "@/lib/i18n";
import { useTestimonials } from "@/hooks/useSanity";

export function Testimonials() {
  const { t } = useTranslation();

  const { data: items } = useTestimonials([]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-10 md:py-14 px-6 bg-[var(--surface)]">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            {t("testimonials.label")}
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            {t("testimonials.title")}{" "}
            <span className="ig-gradient-text">{t("testimonials.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:border-[var(--muted)]/30 transition-colors duration-300 h-full">
                  <div className="ig-gradient-text text-4xl font-serif mb-4 leading-none select-none">
                    &ldquo;
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[var(--foreground)] leading-relaxed mb-6">
                    {item.quote}
                  </p>
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="font-[family-name:var(--font-inter)] font-medium text-sm">{item.author}</p>
                    <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--muted)] mt-0.5">{item.company}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
