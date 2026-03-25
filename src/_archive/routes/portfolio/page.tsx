"use client";

import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { BentoHero } from "@/components/sections/BentoHero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Services } from "@/components/sections/Services";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
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
        {/* Hero — intro with stats + Instagram embed */}
        <BentoHero />

        {/* Case Studies — brand collaborations */}
        <CaseStudies />

        {/* Client Logos — social proof marquee */}
        <ClientLogos />

        {/* About — personal story */}
        <About />

        {/* Services — what I create */}
        <Services />

        {/* Testimonials — client quotes (renders null if no data) */}
        <Testimonials />

        {/* FAQ — objection handling */}
        <FAQ />

        {/* CTA — contact */}
        <CTA />

        {/* Footer line */}
        <div className="py-6 px-6">
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
