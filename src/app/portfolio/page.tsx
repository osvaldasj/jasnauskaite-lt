import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { About } from "@/components/sections/About";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { SocialFeed } from "@/components/sections/SocialFeed";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { FloatingCTA } from "@/components/layout/FloatingCTA";

export default function PortfolioPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ClientLogos />
        <About />
        <PortfolioHighlight />
        <Stats />
        <Services />
        <SocialFeed />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
