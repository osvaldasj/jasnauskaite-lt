"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-12 md:py-16 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Image placeholder */}
        <motion.div
          variants={fadeInUp}
          className="aspect-[3/4] bg-[var(--surface)] rounded-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #833AB4, #C13584, #F77737)' }} />
              <span className="text-[var(--muted)] font-[family-name:var(--font-inter)] text-sm">
                @jasnauskaite
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div variants={fadeInUp}>
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            About me
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em] mb-6">
            Creating content that{" "}
            <span className="ig-gradient-text">delivers</span>
          </h2>
          <div className="space-y-4 text-[var(--muted)] font-[family-name:var(--font-inter)] leading-relaxed">
            <p>
              I&apos;m Inide Jasnauskaite — a content creator working with the biggest
              Lithuanian and international brands. Over 5+ years, I&apos;ve created hundreds
              of reels, story series and campaigns that reached millions of people.
            </p>
            <p>
              My goal isn&apos;t just beautiful content — it&apos;s real results. Every
              project is measured by numbers: engagement rate, reach, conversions.
              Brands come back because the content works.
            </p>
            <p>
              I work through{" "}
              <span className="text-[var(--foreground)] font-medium">
                Reelize
              </span>{" "}
              — my company that ensures a professional process from the first
              idea to the final result and report.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
