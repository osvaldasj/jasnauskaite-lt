"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";

const platformIcons = {
  instagram: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  tiktok: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
};

export function SocialFeed() {
  const { t } = useTranslation();

  const platforms = [
    {
      name: "Instagram",
      handle: "@jasnauskaite",
      url: "https://instagram.com/jasnauskaite",
      description: t("social.instagram.description"),
      followers: "354K+",
      cta: t("social.instagram.cta"),
      gradient: "linear-gradient(135deg, #833AB4, #C13584, #E1306C, #F77737)",
      icon: platformIcons.instagram,
    },
    {
      name: "TikTok",
      handle: "@jasnauskaite",
      url: "https://tiktok.com/@jasnauskaite",
      description: t("social.tiktok.description"),
      followers: "125K+",
      cta: t("social.tiktok.cta"),
      gradient: "linear-gradient(135deg, #010101, #25F4EE, #FE2C55)",
      icon: platformIcons.tiktok,
    },
  ];

  if (platforms.length === 0) return null;

  return (
    <section id="social" className="py-10 md:py-14 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[800px] mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            {t("social.title")}{" "}
            <span className="ig-gradient-text">{t("social.titleHighlight")}</span>
          </h2>
          <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] text-sm mt-3 max-w-md mx-auto">
            {t("social.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-transparent transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Gradient background on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: platform.gradient }}
              />

              <div className="relative p-8 flex flex-col items-center text-center gap-5">
                {/* Icon with gradient circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{ background: platform.gradient }}
                >
                  {platform.icon}
                </div>

                {/* Platform info */}
                <div>
                  <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-xl mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] text-sm">
                    {platform.handle}
                  </p>
                </div>

                {/* Followers */}
                {platform.followers && (
                  <div className="text-2xl font-[family-name:var(--font-outfit)] font-bold ig-gradient-text">
                    {platform.followers}
                  </div>
                )}

                {/* Description */}
                <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] text-sm leading-relaxed max-w-[280px]">
                  {platform.description}
                </p>

                {/* CTA button */}
                <div className="shimmer-button px-6 py-2.5 rounded-full text-white font-[family-name:var(--font-inter)] font-medium text-sm inline-flex items-center gap-2 group-hover:shadow-lg transition-shadow">
                  {platform.cta}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-0.5 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
