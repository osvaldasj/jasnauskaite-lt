"use client";

import { motion } from "framer-motion";
import { IGGradientLine } from "@/components/layout/IGGradientLine";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { useTranslation } from "@/lib/i18n";

const linkIcons = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  tiktok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  closet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
  portfolio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  collaborate: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

export default function LinksPage() {
  const { t } = useTranslation();

  const links = [
    {
      title: "Instagram",
      subtitle: "@jasnauskaite",
      href: "https://instagram.com/jasnauskaite",
      icon: linkIcons.instagram,
    },
    {
      title: "TikTok",
      subtitle: "@jasnauskaite",
      href: "https://tiktok.com/@jasnauskaite",
      icon: linkIcons.tiktok,
    },
    {
      title: t("links.inCloset"),
      subtitle: t("links.inClosetSub"),
      href: "https://www.rentboutique.com/lt/katalogas/inides-spinta/",
      icon: linkIcons.closet,
    },
    {
      title: t("links.portfolio"),
      subtitle: t("links.portfolioSub"),
      href: "/portfolio",
      icon: linkIcons.portfolio,
    },
    {
      title: t("links.collaborate"),
      subtitle: "osvaldas@reelize.lt",
      href: "mailto:osvaldas@reelize.lt",
      icon: linkIcons.collaborate,
    },
  ];
  return (
    <>
      <CursorGlow />
      <GrainTexture />
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Theme toggle top-right */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-10"
        >
          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #833AB4, #C13584, #F77737)' }}>
            {/* Will be replaced with photo */}
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-2xl tracking-[0.02em]">
            {t("links.title")}
          </h1>
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mt-1">
            {t("links.subtitle")}
          </p>
        </motion.div>

        {/* Links with staggered entrance */}
        <div className="w-full max-w-md space-y-3">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-color)] hover:border-[#C13584]/30 hover:shadow-lg hover:shadow-[#C13584]/5 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                {link.icon}
              </div>
              <div className="flex-1">
                <p className="font-[family-name:var(--font-outfit)] font-semibold text-sm">
                  {link.title}
                </p>
                <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)]">
                  {link.subtitle}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Animated IG Gradient Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="w-24 mx-auto mb-4 h-[2px] animated-ig-gradient-line" />
          <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-inter)]">
            @jasnauskaite
          </p>
        </motion.div>
      </div>
    </>
  );
}
