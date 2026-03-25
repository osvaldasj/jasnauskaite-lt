import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransition } from "@/components/providers/PageTransition";
import { GrainOverlay } from "@/components/v2/effects/GrainOverlay";
import "./v2-globals.css";

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
  title: "Inide Jasnauskaite — Content Creator",
  description:
    "Fashion, Beauty & Lifestyle Content Creator. 354K+ Instagram followers. Premium portfolio experience.",
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} v2-layout`}
    >
      <ThemeProvider>
        <LanguageProvider>
          <SmoothScroll>
            <PageTransition>
              {children}
              <GrainOverlay />
            </PageTransition>
          </SmoothScroll>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}
