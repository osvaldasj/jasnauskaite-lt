import { INSIGHTS } from "@/lib/insights";
import InsightArticleClient from "./InsightArticleClient";

export function generateStaticParams() {
  return INSIGHTS.map((article) => ({
    slug: article.slug,
  }));
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InsightArticleClient slug={slug} />;
}
