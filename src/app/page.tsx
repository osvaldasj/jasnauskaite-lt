"use client";

import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import { CursorGlow } from "@/components/v2/effects/CursorGlow";
import { KineticHero } from "@/components/v2/sections/KineticHero";
import { SplitAbout } from "@/components/v2/sections/SplitAbout";
import BrandWall from "@/components/v2/sections/BrandWall";
import PortfolioShowcase from "@/components/v2/sections/PortfolioShowcase";
import OrganicContent from "@/components/v2/sections/OrganicContent";
import StackedServices from "@/components/v2/sections/StackedServices";
import LatestInsights from "@/components/v2/sections/LatestInsights";
import MinimalFAQ from "@/components/v2/sections/MinimalFAQ";
import KineticCTA from "@/components/v2/sections/KineticCTA";
import BrandedResults from "@/components/v2/sections/BrandedResults";

/* Animated gradient divider between sections */
function GradientDivider() {
  return (
    <div className="relative mx-auto max-w-5xl px-6">
      <div
        className="h-[1px] w-full rounded-full opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, #833AB4, #C13584, #E1306C, #F77737, transparent)",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="main-content">
        <KineticHero />
        <SplitAbout />
        <GradientDivider />
        <div id="work">
          <BrandWall />
          <PortfolioShowcase />
          <BrandedResults />
        </div>
        <GradientDivider />
        <OrganicContent />
        <GradientDivider />
        <div id="services">
          <StackedServices />
        </div>
        <GradientDivider />
        <LatestInsights />
        <GradientDivider />
        <MinimalFAQ />
        <div id="contact">
          <KineticCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
