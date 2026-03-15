"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-15 dark:opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(131,58,180,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(247,119,55,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/50" />

      {/* Content with text reveal effect */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase"
        >
          Content Creator
        </motion.p>

        {/* Text reveal — words appear with stagger and skew */}
        <h1 className="font-[family-name:var(--font-outfit)] font-semibold text-5xl md:text-7xl lg:text-8xl tracking-[0.02em] leading-tight overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            Inide{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block ig-gradient-text"
          >
            Jasnauskaite
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[var(--muted)] font-[family-name:var(--font-inter)] mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Fashion, beauty &amp; lifestyle content creator with 354K+ Instagram followers.
          Creating content that doesn&apos;t just look good — it delivers results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/collaborate"
            className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm transition-transform hover:scale-105 inline-block"
          >
            Collaborate
          </a>
          <a
            href="#portfolio"
            className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-8 py-3.5 rounded-full text-sm hover:bg-[var(--surface)] transition-colors inline-block"
          >
            Portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-[var(--muted)] flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
