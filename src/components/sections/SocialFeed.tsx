"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tabContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

const instagramPosts = Array.from({ length: 6 }, (_, i) => ({
  id: `ig-${i + 1}`,
  caption: `Instagram post #${i + 1}`,
  postUrl: "https://instagram.com/jasnauskaite",
}));

const tiktokPosts = Array.from({ length: 6 }, (_, i) => ({
  id: `tt-${i + 1}`,
  caption: `TikTok video #${i + 1}`,
  postUrl: "https://tiktok.com/@jasnauskaite",
}));

const gradients = [
  "linear-gradient(135deg, #833AB4, #C13584)",
  "linear-gradient(135deg, #C13584, #E1306C)",
  "linear-gradient(135deg, #E1306C, #F77737)",
  "linear-gradient(135deg, #F77737, #FCAF45)",
  "linear-gradient(135deg, #833AB4, #F77737)",
  "linear-gradient(135deg, #C13584, #FCAF45)",
];

type Platform = "instagram" | "tiktok";

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState<Platform>("instagram");
  const posts = activeTab === "instagram" ? instagramPosts : tiktokPosts;
  const profileUrl =
    activeTab === "instagram"
      ? "https://instagram.com/jasnauskaite"
      : "https://tiktok.com/@jasnauskaite";

  return (
    <section id="social" className="py-12 md:py-16 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            Social{" "}
            <span className="ig-gradient-text">feed</span>
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("instagram")}
            className={`px-6 py-2.5 rounded-full text-sm font-[family-name:var(--font-inter)] font-medium transition-all duration-300 ${
              activeTab === "instagram"
                ? "shimmer-button text-white"
                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Instagram
          </button>
          <button
            onClick={() => setActiveTab("tiktok")}
            className={`px-6 py-2.5 rounded-full text-sm font-[family-name:var(--font-inter)] font-medium transition-all duration-300 ${
              activeTab === "tiktok"
                ? "shimmer-button text-white"
                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            TikTok
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={gridItem}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0" style={{ background: gradients[index % gradients.length] }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/40 font-[family-name:var(--font-outfit)] text-5xl font-bold">{index + 1}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {activeTab === "tiktok" ? (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-[family-name:var(--font-inter)]">{post.caption}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div variants={fadeInUp} className="text-center mt-10">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-[family-name:var(--font-inter)] font-medium text-sm transition-all"
          >
            Follow @jasnauskaite
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
