"use client";

import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { BentoHero } from "@/components/sections/BentoHero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Services } from "@/components/sections/Services";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { About } from "@/components/sections/About";
import { SocialFeed } from "@/components/sections/SocialFeed";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Navbar } from "@/components/layout/Navbar";
import { IGGradientLine } from "@/components/layout/IGGradientLine";

export default function PortfolioPage() {
  return (
    <>
      <CursorGlow />
      <GrainTexture />
      <Navbar />

      <main id="main-content">
        {/* Bento Grid Hero — main intro with stats */}
        <BentoHero />

        {/* Case Studies — horizontal scroll campaign results */}
        <CaseStudies />

        {/* Services — what I create */}
        <Services />

        {/* Portfolio Highlight — selected brand work */}
        <PortfolioHighlight />

        {/* Client Logos — partner marquee */}
        <ClientLogos />

        {/* About — personal story */}
        <About />

        {/* Social platforms */}
        <SocialFeed />

        {/* FAQ */}
        <FAQ />

        {/* CTA */}
        <CTA />

        {/* Footer line */}
        <div className="py-8 px-6">
          <IGGradientLine />
          <p className="text-center text-xs text-[var(--muted)] font-[family-name:var(--font-inter)] mt-4">
            @jasnauskaite
          </p>
        </div>
      </main>

      <FloatingCTA />
    </>
  );
}
