"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getLatestInsights } from "@/lib/insights";
import { useTranslation } from "@/lib/i18n";

export default function LatestInsights() {
  const { language, t } = useTranslation();
  const articles = getLatestInsights(3, language);

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
              {t("insights.sectionLabel")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
              {t("insights.sectionTitle")}{" "}
              <span className="v2-gradient-text">{t("insights.sectionTitleAccent")}</span>
            </h2>
          </div>
          <Link
            href="/insights"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-purple)] transition-colors font-[family-name:var(--font-mono)]"
          >
            {t("insights.viewAll")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/insights/${article.slug}`}
                className="group flex flex-col h-full p-6 rounded-2xl border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-all"
                style={{ background: "var(--v2-surface)" }}
              >
                {/* Category */}
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)] mb-4">
                  {article.category} &middot; {article.readTime}
                </span>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-[var(--v2-text)] font-[family-name:var(--font-heading)] group-hover:v2-gradient-text transition-colors mb-3 flex-1">
                  {article.title}
                </h3>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-[var(--v2-text-muted)] group-hover:text-[var(--v2-ig-purple)] transition-colors text-xs font-[family-name:var(--font-mono)]">
                  {t("insights.readArticle")}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-purple)] transition-colors font-[family-name:var(--font-mono)]"
          >
            {t("insights.viewAll")} insights
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
