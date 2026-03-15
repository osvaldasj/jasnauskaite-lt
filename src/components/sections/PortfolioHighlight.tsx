"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TiltCard } from "@/components/effects/TiltCard";
import { TextReveal } from "@/components/effects/TextReveal";
import { useTranslation } from "@/lib/i18n";
import { usePortfolio, type PortfolioItem } from "@/hooks/useSanity";

const gradientColors = [
  "from-ig-purple/20 to-ig-magenta/10",
  "from-ig-magenta/20 to-ig-pink/10",
  "from-ig-pink/20 to-ig-orange/10",
  "from-ig-purple/15 to-ig-pink/10",
  "from-ig-magenta/15 to-ig-purple/10",
  "from-ig-orange/15 to-ig-yellow/10",
  "from-ig-yellow/20 to-ig-orange/10",
  "from-ig-orange/20 to-ig-yellow/10",
  "from-ig-pink/15 to-ig-magenta/10",
];

export function PortfolioHighlight() {
  const { t } = useTranslation();

  const fallbackItems: PortfolioItem[] = [
    { title: "Stiliaus kodas", type: t("portfolio.longTermPartner"), color: "from-ig-purple/20 to-ig-magenta/10", longterm: true },
    { title: "Aruelle", type: t("portfolio.longTermPartner"), color: "from-ig-magenta/20 to-ig-pink/10", longterm: true },
    { title: "Eurovaistine", type: t("portfolio.longTermPartner"), color: "from-ig-pink/20 to-ig-orange/10", longterm: true },
    { title: "ODORO", type: t("portfolio.longTermPartner"), color: "from-ig-purple/15 to-ig-pink/10", longterm: true },
    { title: "Perfectil", type: t("portfolio.longTermPartner"), color: "from-ig-magenta/15 to-ig-purple/10", longterm: true },
    { title: "Lancome", type: t("portfolio.campaign"), color: "from-ig-orange/15 to-ig-yellow/10", longterm: false },
    { title: "Hellmann's", type: t("portfolio.campaign"), color: "from-ig-yellow/20 to-ig-orange/10", longterm: false },
    { title: "McDonald's", type: t("portfolio.campaign"), color: "from-ig-orange/20 to-ig-yellow/10", longterm: false },
    { title: "Barbora", type: t("portfolio.campaign"), color: "from-ig-pink/15 to-ig-magenta/10", longterm: false },
  ];

  const { data: portfolioItems } = usePortfolio(fallbackItems);

  if (portfolioItems.length === 0) return null;

  return (
    <section id="portfolio" className="py-8 md:py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-10"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            {t("portfolio.label")}
          </p>
          <TextReveal
            text={`${t("portfolio.title")} ${t("portfolio.titleHighlight")}`}
            as="h2"
            gradientWords={[1]}
            className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard>
                <div className="group relative bg-[var(--surface)] rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color || gradientColors[i % gradientColors.length]} opacity-50`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="font-[family-name:var(--font-outfit)] font-semibold text-lg md:text-2xl text-[var(--foreground)]/15 group-hover:text-[var(--foreground)]/10 transition-all duration-500 text-center px-2">
                      {item.title}
                    </span>
                    {item.longterm && (
                      <span className="text-[10px] font-[family-name:var(--font-inter)] tracking-widest uppercase ig-gradient-text opacity-40">
                        {t("portfolio.longTermPartner")}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                    <p className="text-white font-[family-name:var(--font-outfit)] font-semibold text-base md:text-xl">
                      {item.title}
                    </p>
                    <p className="text-white/70 font-[family-name:var(--font-inter)] text-xs mt-1">
                      {item.type}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
