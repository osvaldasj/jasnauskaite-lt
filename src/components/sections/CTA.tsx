"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#C13584]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        {/* Text reveal effect */}
        <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl tracking-[0.02em] mb-6 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 60, skewY: 2 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            Let&apos;s create{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60, skewY: 2 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block ig-gradient-text"
          >
            together
          </motion.span>
        </h2>
        <p className="text-[var(--muted)] font-[family-name:var(--font-inter)] mb-10 leading-relaxed max-w-lg mx-auto">
          Looking for a content creator for your brand? Get in touch and let&apos;s
          discuss how I can help you reach your goals with authentic, effective content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/collaborate"
            className="shimmer-button text-white font-[family-name:var(--font-inter)] font-medium px-10 py-4 rounded-full text-base transition-transform hover:scale-105 inline-block"
          >
            Collaborate
          </a>
          <a
            href="https://instagram.com/jasnauskaite"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--border-color)] text-[var(--foreground)] font-[family-name:var(--font-inter)] font-medium px-10 py-4 rounded-full text-base hover:bg-[var(--surface)] transition-colors inline-block"
          >
            @jasnauskaite
          </a>
        </div>
      </motion.div>
    </section>
  );
}
