"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--background)]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.h1
          variants={item}
          className="font-[family-name:var(--font-outfit)] font-bold text-8xl md:text-9xl ig-gradient-text mb-4"
        >
          404
        </motion.h1>

        <motion.p
          variants={item}
          className="font-[family-name:var(--font-outfit)] font-semibold text-2xl md:text-3xl text-[var(--foreground)] mb-3"
        >
          Puslapis nerastas
        </motion.p>

        <motion.p
          variants={item}
          className="font-[family-name:var(--font-inter)] text-[var(--muted)] mb-8 max-w-md mx-auto"
        >
          Atrodo, kad tokio puslapio nera. Gal adresas buvo pakeistas arba puslapis pašalintas.
        </motion.p>

        <motion.div variants={item}>
          <Link
            href="/"
            className="shimmer-button inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-[family-name:var(--font-inter)] font-medium text-sm transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Grizti i pradzia
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
