"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextReveal } from "@/components/effects/TextReveal";
import { useTranslation } from "@/lib/i18n";

/* ─── Types ──────────────────────────────────────────────────────── */

interface ShowcaseItem {
  id: string;
  title: string;
  client: string;
  type: string;
  videoSrc?: string;
  thumbnailSrc?: string;
  instagramUrl?: string;
  gradient: string;
  stats?: {
    views?: string;
    likes?: string;
    reach?: string;
  };
}

/* ─── Video Card ─────────────────────────────────────────────────── */

function VideoCard({ item }: { item: ShowcaseItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const Wrapper = item.instagramUrl ? "a" : "div";
  const wrapperProps = item.instagramUrl
    ? { href: item.instagramUrl, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Wrapper
        {...wrapperProps}
        className="group relative cursor-pointer block"
      >
        {/* Card with 9:16 aspect ratio */}
        <div className="relative rounded-2xl overflow-hidden aspect-[9/14] border border-[var(--border-color)] hover:border-[#C13584]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#C13584]/10">
          {/* Video / Gradient placeholder */}
          {item.videoSrc ? (
            <video
              src={item.videoSrc}
              autoPlay={isHovered}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: item.gradient }}>
              {/* Simulated content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Top: client badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm" />
                    <div>
                      <div className="w-14 h-1.5 rounded-full bg-white/30 mb-1" />
                      <div className="w-10 h-1.5 rounded-full bg-white/20" />
                    </div>
                  </div>
                  {/* Instagram icon if linked */}
                  {item.instagramUrl && (
                    <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Center: play indicator */}
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom: engagement bars */}
                <div className="space-y-1.5">
                  <div className="w-[70%] h-1.5 rounded-full bg-white/25" />
                  <div className="w-[50%] h-1.5 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          )}

          {/* Hover overlay with info */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5"
          >
            <p className="text-white font-[family-name:var(--font-outfit)] font-semibold text-base">
              {item.title}
            </p>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-xs mt-1">
              {item.client} &mdash; {item.type}
            </p>
            {item.stats && (
              <div className="flex gap-4 mt-3">
                {item.stats.views && (
                  <div className="text-white/80 text-xs font-[family-name:var(--font-inter)]">
                    <span className="font-semibold">{item.stats.views}</span> views
                  </div>
                )}
                {item.stats.likes && (
                  <div className="text-white/80 text-xs font-[family-name:var(--font-inter)]">
                    <span className="font-semibold">{item.stats.likes}</span> likes
                  </div>
                )}
              </div>
            )}
            {item.instagramUrl && (
              <div className="flex items-center gap-1.5 mt-3 text-white/50 text-[10px] font-[family-name:var(--font-inter)]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
                View on Instagram
              </div>
            )}
          </motion.div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

/*
 * INSTRUKCIJA: Kiekvienai kortelei pridėk instagramUrl su nuoroda į reel/post.
 * Pavyzdys: instagramUrl: "https://www.instagram.com/reel/ABC123/"
 *
 * Vėliau, kai turėsi optimizuotus video, pridėk:
 * videoSrc: "/videos/showcase-1.mp4"
 */

export function VideoShowcase() {
  const { t } = useTranslation();

  const showcaseItems: ShowcaseItem[] = [
    {
      id: "1",
      title: "Summer Collection Launch",
      client: "Stiliaus kodas",
      type: "Reel",
      gradient: "linear-gradient(170deg, #833AB4 0%, #C13584 40%, #E1306C 100%)",
      stats: { views: "1.2M", likes: "45K" },
      instagramUrl: "", // <- Pridėk IG nuorodą
    },
    {
      id: "2",
      title: "Brand Ambassador",
      client: "Aruelle",
      type: "Story Series",
      gradient: "linear-gradient(170deg, #F77737 0%, #E1306C 40%, #C13584 100%)",
      stats: { views: "890K", likes: "32K" },
      instagramUrl: "",
    },
    {
      id: "3",
      title: "Product Review",
      client: "Eurovaistine",
      type: "Reel",
      gradient: "linear-gradient(170deg, #FCAF45 0%, #F77737 40%, #E1306C 100%)",
      stats: { views: "650K", likes: "28K" },
      instagramUrl: "",
    },
    {
      id: "4",
      title: "Seasonal Campaign",
      client: "Hellmann's",
      type: "Reel",
      gradient: "linear-gradient(170deg, #C13584 0%, #833AB4 50%, #405DE6 100%)",
      stats: { views: "1.5M", likes: "52K" },
      instagramUrl: "",
    },
    {
      id: "5",
      title: "Fashion Haul",
      client: "BOOZT",
      type: "Story Series",
      gradient: "linear-gradient(170deg, #E1306C 0%, #F77737 50%, #FCAF45 100%)",
      stats: { views: "780K", likes: "35K" },
      instagramUrl: "",
    },
    {
      id: "6",
      title: "Lifestyle Campaign",
      client: "ODORO",
      type: "Reel + Stories",
      gradient: "linear-gradient(170deg, #405DE6 0%, #833AB4 50%, #C13584 100%)",
      stats: { views: "920K", likes: "41K" },
      instagramUrl: "",
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            {t("videoShowcase.label")}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <TextReveal
              text={`${t("videoShowcase.title")} ${t("videoShowcase.titleHighlight")}`}
              as="h2"
              gradientWords={[1]}
              className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]"
            />
            <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] max-w-sm leading-relaxed">
              {t("videoShowcase.description")}
            </p>
          </div>
        </motion.div>

        {/* Video grid - 3 columns for vertical content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {showcaseItems.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* "View all" link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/jasnauskaite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] font-[family-name:var(--font-inter)] transition-colors group"
          >
            {t("videoShowcase.viewAll")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
