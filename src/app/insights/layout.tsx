import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — Inidė Jasnauskaitė-Jonaitė",
  description:
    "Notes on creator partnerships, influencer marketing ROI, and what makes brand collaborations work — from a creator with 785+ branded posts across 69 brands.",
  openGraph: {
    title: "Insights — Inidė Jasnauskaitė-Jonaitė",
    description:
      "Notes on creator partnerships, influencer marketing ROI, and what makes brand collaborations work.",
    url: "https://jasnauskaite.lt/insights/",
    type: "website",
    siteName: "Inidė Jasnauskaitė-Jonaitė",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
