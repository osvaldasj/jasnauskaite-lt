"use client";

import { Navbar } from "@/components/v2/layout/Navbar";
import Footer from "@/components/v2/layout/Footer";
import { CursorGlow } from "@/components/v2/effects/CursorGlow";
import { KineticHero } from "@/components/v2/sections/KineticHero";
import { SplitAbout } from "@/components/v2/sections/SplitAbout";
import BrandWall from "@/components/v2/sections/BrandWall";
import StackedServices from "@/components/v2/sections/StackedServices";
import EditorialCaseStudies from "@/components/v2/sections/EditorialCaseStudies";
import StatsTicker from "@/components/v2/sections/StatsTicker";
import MinimalFAQ from "@/components/v2/sections/MinimalFAQ";
import KineticCTA from "@/components/v2/sections/KineticCTA";

export default function V2PortfolioPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="main-content">
        <KineticHero />
        <StatsTicker />
        <SplitAbout />
        <div id="work">
          <BrandWall />
          <EditorialCaseStudies />
        </div>
        <div id="services">
          <StackedServices />
        </div>
        <MinimalFAQ />
        <div id="contact">
          <KineticCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
