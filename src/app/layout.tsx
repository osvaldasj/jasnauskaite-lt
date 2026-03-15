import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransition } from "@/components/providers/PageTransition";
import { GoogleAnalytics } from "@/components/providers/GoogleAnalytics";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Inide Jasnauskaite — Content Creator",
  description:
    "Fashion, Beauty & Lifestyle Content Creator. 354K+ Instagram followers. Working with the biggest Lithuanian and international brands.",
  keywords: [
    "content creator",
    "influencer",
    "instagram",
    "fashion",
    "beauty",
    "lifestyle",
    "Lithuania",
    "reels",
    "jasnauskaite",
    "inide",
  ],
  authors: [{ name: "Inide Jasnauskaite" }],
  creator: "Inide Jasnauskaite",
  publisher: "Reelize",
  metadataBase: new URL("https://jasnauskaite.lt"),
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://jasnauskaite.lt",
    title: "Inide Jasnauskaite — Content Creator",
    description:
      "Fashion, Beauty & Lifestyle Content Creator. 354K+ Instagram followers. Creating content that delivers results.",
    locale: "lt_LT",
    alternateLocale: "en_US",
    siteName: "Inide Jasnauskaite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inide Jasnauskaite — Content Creator",
    description:
      "Fashion, Beauty & Lifestyle Content Creator. 354K+ Instagram followers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Inide Jasnauskaite",
  alternateName: "@jasnauskaite",
  url: "https://jasnauskaite.lt",
  jobTitle: "Content Creator",
  worksFor: {
    "@type": "Organization",
    name: "Reelize",
  },
  sameAs: [
    "https://instagram.com/jasnauskaite",
    "https://tiktok.com/@jasnauskaite",
  ],
  knowsAbout: [
    "Fashion",
    "Beauty",
    "Lifestyle",
    "Content Creation",
    "Social Media Marketing",
  ],
  description:
    "Fashion, Beauty & Lifestyle Content Creator with 354K+ Instagram followers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable}`}>
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="fixed -top-full left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-[family-name:var(--font-inter)] text-sm font-medium rounded-b-xl focus:top-0 transition-[top] duration-200"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <PageTransition>{children}</PageTransition>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
