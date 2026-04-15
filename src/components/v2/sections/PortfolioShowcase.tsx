"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Brand portfolio data — from Apify scrape                           */
/* ------------------------------------------------------------------ */

const PORTFOLIO = [
  {
    brand: "Mionetto",
    tag: "Lifestyle",
    image: "/images/branded/mionetto-DNXetzOMT__.jpg",
    url: "https://www.instagram.com/reel/DNXetzOMT__/",
    metrics: { posts: 22, views: "16.7M", likes: "1.1M", topPost: "6.9M", engagement: "6.8%" },
  },
  {
    brand: "Akropolis",
    tag: "Fashion",
    image: "/images/branded/akropolis-DPDlAeZiEuJ.jpg",
    url: "https://www.instagram.com/reel/DPDlAeZiEuJ/",
    metrics: { posts: 35, views: "13.2M", likes: "174K", topPost: "1.7M", engagement: "1.3%" },
  },
  {
    brand: "Maxima",
    tag: "FMCG",
    image: "/images/branded/maxima-DMK9spgtfv-.jpg",
    url: "https://www.instagram.com/reel/DMK9spgtfv-/",
    metrics: { posts: 9, views: "3.2M", likes: "59K", topPost: "1.2M", engagement: "1.8%" },
  },
  {
    brand: "Nissan",
    tag: "Automotive",
    image: "/images/branded/nissan.jpg",
    url: "https://www.instagram.com/reel/DUBIIXDj5AJ/",
    metrics: { posts: 38, views: "6.5M", likes: "79K", topPost: "3.5M", engagement: "1.2%" },
  },
  {
    brand: "Hellmann's",
    tag: "FMCG",
    image: "/images/branded/hellmanns.jpg",
    url: "https://www.instagram.com/reel/DD46xnfNBmJ/",
    metrics: { posts: 5, views: "15M", likes: "900K", topPost: "14M", engagement: "6.0%" },
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PortfolioShowcase() {
  const { t } = useTranslation();
  return (
    <section className="py-14 md:py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
            {t("portfolio.label")}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
            {t("portfolio.title")}{" "}
            <span className="v2-gradient-text">{t("portfolio.titleHighlight")}</span>
          </h2>
        </motion.div>

        {/* 5-column vertical cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {PORTFOLIO.map((item, i) => (
            <motion.a
              key={item.brand}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-all overflow-hidden cursor-pointer"
              style={{ background: "var(--v2-surface)" }}
            >
              {/* Image */}
              <div className="relative h-[200px] md:h-[260px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.brand} branded content`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Brand + tag */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-base md:text-lg font-bold font-[family-name:var(--font-heading)]">
                    {item.brand}
                  </h3>
                  <span className="text-white/70 text-[9px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Compact metrics */}
              <div className="p-3 md:p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-sm md:text-base font-bold v2-gradient-text font-[family-name:var(--font-mono)]">
                      {item.metrics.views}
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.1em] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)]">
                      {t("metrics.views")}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm md:text-base font-bold v2-gradient-text font-[family-name:var(--font-mono)]">
                      {item.metrics.likes}
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.1em] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)]">
                      {t("metrics.likes")}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm md:text-base font-bold text-[var(--v2-text)] font-[family-name:var(--font-mono)]">
                      {item.metrics.posts}
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.1em] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)]">
                      {t("metrics.posts")}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm md:text-base font-bold text-[var(--v2-text)] font-[family-name:var(--font-mono)]">
                      {item.metrics.engagement}
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.1em] text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)]">
                      {t("metrics.engRate")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
