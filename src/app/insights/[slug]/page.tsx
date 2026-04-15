import { Metadata } from "next";
import { INSIGHTS } from "@/lib/insights";
import InsightArticleClient from "./InsightArticleClient";

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article not found — Inidė Jasnauskaitė-Jonaitė" };
  }

  return {
    title: `${article.title} — Inidė Jasnauskaitė-Jonaitė`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://jasnauskaite.lt/insights/${slug}/`,
      type: "article",
      siteName: "Inidė Jasnauskaitė-Jonaitė",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.excerpt,
    },
    other: {
      "article:published_time": article.date,
      "article:author": "Inidė Jasnauskaitė-Jonaitė",
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InsightArticleClient slug={slug} />;
}
