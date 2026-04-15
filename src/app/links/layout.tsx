import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links — @jasnauskaite",
  description:
    "All links in one place. Instagram (359K), TikTok (125K), portfolio, and more.",
  openGraph: {
    title: "Links — @jasnauskaite",
    description: "All links in one place. Instagram, TikTok, portfolio, and more.",
    url: "https://jasnauskaite.lt/links/",
    type: "website",
    siteName: "Inidė Jasnauskaitė-Jonaitė",
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
