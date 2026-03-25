"use client";

import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import { CursorGlow } from "@/components/v2/effects/CursorGlow";
import Link from "next/link";
import { getInsightBySlug, INSIGHTS } from "@/lib/insights";
import { useTranslation } from "@/lib/i18n";

function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
          {line.slice(3)}
        </h2>
      );
      i++; continue;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="text-base font-semibold mt-6 mb-2 text-[var(--v2-text)] font-[family-name:var(--font-body)]">
          {line.slice(2, -2)}
        </p>
      );
      i++; continue;
    }

    if (line.startsWith("**") && line.includes(":**")) {
      const match = line.match(/^\*\*(.+?):\*\*\s*(.*)/);
      if (match) {
        elements.push(
          <p key={i} className="text-base font-semibold mt-6 mb-2 text-[var(--v2-text)] font-[family-name:var(--font-body)]">
            {match[1]}:{match[2] ? ` ${match[2]}` : ""}
          </p>
        );
        i++; continue;
      }
    }

    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 my-4 ml-4">
          {listItems.map((item, j) => (
            <li key={j} className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] flex gap-2">
              <span className="text-[var(--v2-ig-purple)] shrink-0 mt-1.5">&bull;</span>
              <span dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--v2-text)] font-semibold">$1</strong>')
                  .replace(/\*(.+?)\*/g, "<em>$1</em>"),
              }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-3 my-4 ml-4 list-decimal list-inside">
          {listItems.map((item, j) => (
            <li key={j} className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
              <span dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--v2-text)] font-semibold">$1</strong>')
                  .replace(/\*(.+?)\*/g, "<em>$1</em>"),
              }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Markdown table
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|") && lines[i].endsWith("|")) {
        const row = lines[i].split("|").slice(1, -1).map((c) => c.trim());
        // Skip separator row (|---|---|---|)
        if (row.every((c) => /^[-:]+$/.test(c))) { i++; continue; }
        tableRows.push(row);
        i++;
      }
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(1);
        elements.push(
          <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-[var(--v2-border)]">
            <table className="w-full text-sm font-[family-name:var(--font-body)]">
              <thead>
                <tr className="border-b border-[var(--v2-border)] bg-[var(--v2-surface)]">
                  {header.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.12em] text-[var(--v2-text-muted)] font-semibold font-[family-name:var(--font-mono)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, j) => (
                  <tr key={j} className="border-b border-[var(--v2-border)] last:border-0">
                    {row.map((cell, k) => (
                      <td key={k} className={`px-4 py-3 ${k === 0 ? "text-[var(--v2-text)] font-medium" : "text-[var(--v2-text-muted)]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    elements.push(
      <p key={i} className="text-sm md:text-base leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] my-4">
        <span dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--v2-text)] font-semibold">$1</strong>')
            .replace(/\*(.+?)\*/g, "<em>$1</em>"),
        }} />
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}

export default function InsightArticleClient({ slug }: { slug: string }) {
  const { language, t } = useTranslation();
  const article = getInsightBySlug(slug, language);

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-20 px-6 text-center">
          <h1 className="text-2xl font-bold text-[var(--v2-text)]">{t("insights.notFound")}</h1>
          <Link href="/insights" className="mt-4 inline-block text-[var(--v2-ig-purple)] hover:underline">
            {t("insights.backToInsights")}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const currentIndex = INSIGHTS.findIndex((a) => a.slug === slug);
  const nextRaw = INSIGHTS[(currentIndex + 1) % INSIGHTS.length];
  const nextArticle = nextRaw ? getInsightBySlug(nextRaw.slug, language) : undefined;

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20 px-6">
        <article className="mx-auto max-w-3xl">
          <div className="animate-[v2-fade-in_0.4s_ease_both]">
            <Link href="/insights" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[var(--v2-text-muted)] hover:text-[var(--v2-ig-purple)] transition-colors font-[family-name:var(--font-mono)] mb-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
              {t("insights.allInsights")}
            </Link>
          </div>

          <header className="mb-12 animate-[v2-fade-in_0.6s_0.1s_ease_both]">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[var(--v2-border)] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
                {article.category}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
                {article.readTime} read
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)] leading-tight">
              {article.title}
            </h1>
            <div className="mt-8 h-[2px] w-24 rounded-full" style={{ background: "var(--v2-gradient)" }} />
          </header>

          <div className="animate-[v2-fade-in_0.6s_0.2s_ease_both]">
            <ArticleContent content={article.content} />
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-[var(--v2-border)] text-center animate-[v2-fade-in_0.5s_0.3s_ease_both]" style={{ background: "var(--v2-surface)" }}>
            <p className="text-lg font-bold text-[var(--v2-text)] font-[family-name:var(--font-heading)] mb-2">
              {t("insights.ctaTitle")}
            </p>
            <p className="text-sm text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] mb-6">
              {t("insights.ctaSubtitle")}
            </p>
            <a href="mailto:osvaldas@reelize.lt" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium" style={{ background: "var(--v2-gradient)" }}>
              {t("insights.ctaButton")}
            </a>
          </div>

          {nextArticle && nextArticle.slug !== slug && (
            <div className="mt-12 pt-8 border-t border-[var(--v2-border)] animate-[v2-fade-in_0.5s_0.4s_ease_both]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)] mb-4">{t("insights.readNext")}</p>
              <Link href={`/insights/${nextArticle.slug}`} className="group flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-[var(--v2-text)] font-[family-name:var(--font-heading)] group-hover:v2-gradient-text transition-colors">
                  {nextArticle.title}
                </h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-[var(--v2-text-muted)] group-hover:text-[var(--v2-ig-purple)] shrink-0 transition-colors">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
