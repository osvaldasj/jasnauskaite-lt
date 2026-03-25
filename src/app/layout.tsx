import type { Metadata } from "next";
import { Outfit, Inter, Syne, DM_Sans, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GoogleAnalytics } from "@/components/providers/GoogleAnalytics";
import { GrainOverlay } from "@/components/v2/effects/GrainOverlay";
import "./globals.css";
import "./v2-globals.css";

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

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Inidė Jasnauskaitė-Jonaitė — Content Creator",
  description:
    "Fashion, Beauty & Lifestyle Content Creator. 358K+ Instagram followers. Working with the biggest Lithuanian and international brands.",
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
  authors: [{ name: "Inidė Jasnauskaitė-Jonaitė" }],
  creator: "Inidė Jasnauskaitė-Jonaitė",
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
    title: "Inidė Jasnauskaitė-Jonaitė — Content Creator",
    description:
      "Fashion, Beauty & Lifestyle Content Creator. 358K+ Instagram followers. Creating content that delivers results.",
    locale: "lt_LT",
    alternateLocale: "en_US",
    siteName: "Inidė Jasnauskaitė-Jonaitė",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inidė Jasnauskaitė-Jonaitė — Content Creator",
    description:
      "Fashion, Beauty & Lifestyle Content Creator. 358K+ Instagram followers.",
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
  name: "Inidė Jasnauskaitė-Jonaitė",
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
    "Fashion, Beauty & Lifestyle Content Creator with 358K+ Instagram followers.",
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
      <body className={`${outfit.variable} ${inter.variable} ${syne.variable} ${dmSans.variable} ${spaceMono.variable} v2-layout`}>
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
              {children}
              <GrainOverlay />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
