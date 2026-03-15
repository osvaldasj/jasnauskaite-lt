"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const answerVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease } },
};

const faqItems = [
  {
    question: "How does the collaboration process work?",
    answer: "After receiving your inquiry, I'll get back to you within 24 hours with a proposal. We'll discuss the concept, timeline, and budget. After approval, I create content according to the agreed brief with the option to review before publishing.",
  },
  {
    question: "What types of content do you create?",
    answer: "I create Instagram Reels, Story series, TikTok videos, product photo shoots, and long-term ambassador programs. Each format is tailored to your brand's goals.",
  },
  {
    question: "Can I see results from previous campaigns?",
    answer: "Yes! My media kit includes detailed campaign results with reach, engagement, and other metrics. Get in touch and I'll send it over.",
  },
  {
    question: "What's the minimum collaboration budget?",
    answer: "The budget depends on the content type and scope. Reach out through the form and I'll prepare an individual proposal based on your needs.",
  },
  {
    question: "Do you work with international brands?",
    answer: "Yes, I work with both Lithuanian and international brands. I can create content in Lithuanian and English.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 md:py-16 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            Frequently asked{" "}
            <span className="ig-gradient-text">questions</span>
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
