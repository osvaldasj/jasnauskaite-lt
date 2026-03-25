"use client";

import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import { CursorGlow } from "@/components/v2/effects/CursorGlow";
import Link from "next/link";
import { INSIGHTS, getLatestInsights } from "@/lib/insights";
import { useTranslation } from "@/lib/i18n";

export default function InsightsPage() {
  const { language, t } = useTranslation();
  const articles = getLatestInsights(INSIGHTS.length, language);
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 animate-[v2-fade-in_0.6s_ease-out_both]">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
              {t("insights.sectionLabel")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
              {t("insights.sectionTitle")}{" "}
              <span className="v2-gradient-text">{t("insights.sectionTitleAccent")}</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] max-w-xl">
              {t("insights.sectionSubtitle")}
            </p>
          </div>

          {/* Articles list */}
          <div className="flex flex-col gap-6">
            {articles.map((article, i) => (
              <div
                key={article.slug}
                className="animate-[v2-fade-in_0.4s_ease-out_both]"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <Link
                  href={`/insights/${article.slug}`}
                  className="group block p-6 md:p-8 rounded-2xl border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-all"
                  style={{ background: "var(--v2-surface)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Category + read time */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[var(--v2-border)] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
                          {article.category}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
                          {article.readTime} read
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-bold text-[var(--v2-text)] font-[family-name:var(--font-heading)] group-hover:v2-gradient-text transition-colors mb-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--v2-border)] group-hover:border-[var(--v2-ig-purple)] flex items-center justify-center transition-colors mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--v2-text-muted)] group-hover:text-[var(--v2-ig-purple)] transition-colors"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
