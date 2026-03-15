"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { MagneticElement } from "@/components/effects/MagneticElement";

/* ─── Phone mockup ──────────────────────────────────────────────── */

interface PhoneMockupProps {
  videoSrc?: string;
  instagramUrl?: string;
  /** Fallback gradient when no video is provided */
  gradient: string;
  label: string;
  delay: number;
  className?: string;
}

function getInstagramEmbedUrl(url: string): string | null {
  // Extract shortcode from Instagram URL: /p/SHORTCODE/ or /reel/SHORTCODE/
  const match = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (!match) return null;
  return `https://www.instagram.com/p/${match[1]}/embed/`;
}

function PhoneMockup({ videoSrc, instagramUrl, gradient, label, delay, className = "" }: PhoneMockupProps) {
  const embedUrl = instagramUrl ? getInstagramEmbedUrl(instagramUrl) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {/* Phone frame */}
      <div
        className="phone-mockup relative rounded-[2.5rem] overflow-hidden border-[3px] border-[var(--foreground)]/10 shadow-2xl shadow-black/20 block"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[28px] bg-[var(--foreground)]/10 rounded-b-2xl z-20" />

        {/* Screen content */}
        <div className="aspect-[9/16] w-full relative overflow-hidden bg-[var(--surface)]">
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : embedUrl ? (
            /* Instagram embed */
            <div className="absolute inset-0">
              {/* Gradient loading background */}
              <div className="absolute inset-0 phone-gradient-bg" style={{ background: gradient }} />
              {/* Instagram iframe */}
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0 z-10"
                loading="lazy"
                allowTransparency
                allow="encrypted-media"
                style={{ transform: "scale(1.02)", transformOrigin: "center center" }}
              />
              {/* Clickable overlay that opens Instagram */}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 opacity-0"
                  aria-label="Open on Instagram"
                />
              )}
            </div>
          ) : (
            /* Animated gradient placeholder */
            <div className="absolute inset-0 phone-gradient-bg" style={{ background: gradient }}>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm mb-3" />
                <div className="w-24 h-2 rounded-full bg-white/30 mb-2" />
                <div className="w-16 h-2 rounded-full bg-white/20" />
              </div>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Label underneath */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.5 }}
        className="text-center text-xs text-[var(--muted)] font-[family-name:var(--font-inter)] mt-4 tracking-wider uppercase"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────── */

/*
 * INSTRUKCIJA: Norėdamas pridėti video, pakeisk instagramUrl į Instagram reel/post nuorodą.
 * Vėliau, kai turėsi optimizuotus video failus, pridėk juos į /public/videos/
 * ir nurodyk videoSrc: "/videos/hero-reel-1.mp4"
 */

export function PhoneHero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const phones = [
    {
      gradient: "linear-gradient(180deg, #833AB4 0%, #C13584 50%, #E1306C 100%)",
      label: t("portfolioHero.phone1Label"),
      videoSrc: "",
      instagramUrl: "https://www.instagram.com/p/DTpUe_fiBCu/",
    },
    {
      gradient: "linear-gradient(180deg, #F77737 0%, #C13584 50%, #833AB4 100%)",
      label: t("portfolioHero.phone2Label"),
      videoSrc: "",
      instagramUrl: "https://www.instagram.com/p/DU8dRwACHxK/",
    },
    {
      gradient: "linear-gradient(180deg, #FCAF45 0%, #F77737 50%, #E1306C 100%)",
      label: t("portfolioHero.phone3Label"),
      videoSrc: "",
      instagramUrl: "https://www.instagram.com/p/DTFSasOiIL0/",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-16"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 dark:opacity-15">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 20% 40%, rgba(131,58,180,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(247,119,55,0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(193,53,132,0.2) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase"
          >
            {t("portfolioHero.subtitle")}
          </motion.p>

          <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-6xl lg:text-7xl tracking-[0.02em] leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {t("portfolioHero.title1")}{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block ig-gradient-text"
            >
              {t("portfolioHero.title2")}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-[var(--muted)] font-[family-name:var(--font-inter)] mt-5 max-w-xl mx-auto leading-relaxed"
          >
            {t("portfolioHero.description")}
          </motion.p>
        </motion.div>

        {/* 3 Phone mockups */}
        <motion.div style={{ y: y1 }} className="flex items-end justify-center gap-4 md:gap-8 lg:gap-12 perspective-[1200px]">
          {/* Left phone - slightly smaller, tilted */}
          <PhoneMockup
            gradient={phones[0].gradient}
            label={phones[0].label}
            videoSrc={phones[0].videoSrc || undefined}
            instagramUrl={phones[0].instagramUrl || undefined}
            delay={0.3}
            className="w-[28%] max-w-[180px] md:max-w-[200px] transform -rotate-3 translate-y-4"
          />

          {/* Center phone - larger, prominent */}
          <PhoneMockup
            gradient={phones[1].gradient}
            label={phones[1].label}
            videoSrc={phones[1].videoSrc || undefined}
            instagramUrl={phones[1].instagramUrl || undefined}
            delay={0.15}
            className="w-[34%] max-w-[220px] md:max-w-[240px] z-10"
          />

          {/* Right phone - slightly smaller, tilted */}
          <PhoneMockup
            gradient={phones[2].gradient}
            label={phones[2].label}
            videoSrc={phones[2].videoSrc || undefined}
            instagramUrl={phones[2].instagramUrl || undefined}
            delay={0.45}
            className="w-[28%] max-w-[180px] md:max-w-[200px] transform rotate-3 translate-y-4"
          />
        </motion.div>

        {/* CTA buttons below phones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          <MagneticElement as="div" strength={0.25} radius={120} className="inline-block">
            <a
              href="#contact"
              className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {t("portfolioHero.cta")}
            </a>
          </MagneticElement>
          <MagneticElement as="div" strength={0.25} radius={120} className="inline-block">
            <a
              href="#portfolio"
              className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm hover:bg-[var(--surface)] transition-colors inline-flex items-center gap-2"
            >
              {t("portfolioHero.viewWork")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </MagneticElement>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-[var(--muted)]/50 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--muted)]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
