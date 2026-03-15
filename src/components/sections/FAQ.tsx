"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";
import { useFAQ } from "@/hooks/useSanity";
import { en, lt } from "@/translations";

const translationData = { en, lt } as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const answerVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease } },
};

export function FAQ() {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fallbackItems = translationData[language].faq.items;
  const { data: faqItems } = useFAQ(fallbackItems);

  if (!faqItems || faqItems.length === 0) return null;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 md:py-12 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            {t("faq.title")}{" "}
            <span className="ig-gradient-text">{t("faq.titleHighlight")}</span>
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-[var(--border-color)] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[var(--surface)]"
              >
                <span className="font-[family-name:var(--font-inter)] font-medium text-[var(--foreground)] pr-4">
                  {item.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="w-5 h-5 text-[var(--muted)] flex-shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div variants={answerVariants} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                    <p className="px-6 pb-5 text-[var(--muted)] font-[family-name:var(--font-inter)] leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
