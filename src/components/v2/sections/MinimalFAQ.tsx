"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Fallback data
// ---------------------------------------------------------------------------

const FALLBACK_FAQ = [
  {
    question: "How does the collaboration process work?",
    answer:
      "It starts with a brief conversation about your brand goals and target audience. From there, I create a content proposal with creative direction, timeline, and deliverables. Once approved, I handle everything from concept to final delivery -- filming, editing, and optimizing for each platform.",
  },
  {
    question: "What types of content do you create?",
    answer:
      "I specialize in Instagram Reels, Stories, TikTok videos, static posts, and long-form collaborations. Each piece is crafted to feel authentic to my audience while meeting your brand objectives. I also offer Meta Ads content optimized for paid campaigns.",
  },
  {
    question: "Can I see results from previous campaigns?",
    answer:
      "Absolutely. I provide detailed case studies with reach, engagement, and conversion metrics from past collaborations. During our initial call, I'll share relevant examples that match your industry and goals.",
  },
  {
    question: "What's the minimum collaboration budget?",
    answer:
      "Budgets vary based on scope and deliverables. A single Reel starts at a baseline rate, while long-term partnerships and ambassador programs offer better value per deliverable. I'm happy to create a custom proposal that fits your budget.",
  },
  {
    question: "Do you work with international brands?",
    answer:
      "Yes, I work with both Lithuanian and international brands. For EU-based companies, invoicing is handled through my registered business entities with proper VAT documentation. Communication and deliverables can be in English or Lithuanian.",
  },
];

// ---------------------------------------------------------------------------
// Accordion item
// ---------------------------------------------------------------------------

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative border-b border-[var(--v2-border)]"
    >
      {/* Active gradient left border */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full w-[3px] origin-top"
            style={{ background: "var(--v2-gradient)" }}
          />
        )}
      </AnimatePresence>

      {/* Question button */}
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-4 py-6 text-left transition-colors duration-200 hover:opacity-80 pl-5"
      >
        {/* Number */}
        <span className="shrink-0 text-sm text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
          {num}
        </span>

        {/* Question */}
        <span className="flex-1 text-base font-medium text-[var(--v2-text)] md:text-lg font-[family-name:var(--font-heading)]">
          {question}
        </span>

        {/* Plus/minus icon */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-[var(--v2-text-muted)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="7" y1="0" x2="7" y2="14" />
            <line x1="0" y1="7" x2="14" y2="7" />
          </svg>
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-14 pr-10 text-sm leading-relaxed text-[var(--v2-text-muted)] md:text-base font-[family-name:var(--font-body)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MinimalFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Try to get FAQ items from translations, fall back to hardcoded
  let faqItems: { question: string; answer: string }[];

  const rawItems = t("faq.items");
  if (rawItems === "faq.items" || typeof rawItems !== "string") {
    // Translation key not found or returned the key itself — use fallback
    faqItems = FALLBACK_FAQ;
  } else {
    // If somehow it's a serialized array (unlikely with this i18n), try parsing
    try {
      const parsed = JSON.parse(rawItems);
      faqItems = Array.isArray(parsed) ? parsed : FALLBACK_FAQ;
    } catch {
      faqItems = FALLBACK_FAQ;
    }
  }

  const faqTitle = t("faq.title");
  const faqHighlight = t("faq.titleHighlight");
  const hasTitleTranslation = faqTitle !== "faq.title";

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="px-5 py-14 md:py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: top header */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
              {hasTitleTranslation ? faqTitle : "FAQ"}
            </h2>
            <p className="v2-gradient-text text-lg font-medium font-[family-name:var(--font-body)]">
              {hasTitleTranslation ? faqHighlight : "Frequently asked questions"}
            </p>
          </motion.div>
        )}

        <div className="flex gap-16 lg:gap-24">
          {/* Desktop: left sticky column */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-32 h-fit w-[240px] shrink-0"
            >
              <h2 className="mb-3 text-6xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
                {hasTitleTranslation ? faqTitle : "FAQ"}
              </h2>
              <p className="v2-gradient-text text-lg font-medium font-[family-name:var(--font-body)]">
                {hasTitleTranslation ? faqHighlight : "Frequently asked questions"}
              </p>
            </motion.div>
          )}

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {/* Top border */}
            <div className="border-t border-[var(--v2-border)]" />

            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
