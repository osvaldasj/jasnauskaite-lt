"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { TiltCard } from "@/components/effects/TiltCard";

const testimonials = [
  {
    quote: "Inide always delivers the highest quality content that exceeds our expectations. The engagement results speak for themselves.",
    author: "Marketing Manager",
    company: "Aruelle",
  },
  {
    quote: "A professional process from start to finish. One of the few creators you can work with as a serious partner.",
    author: "Brand Manager",
    company: "Stiliaus kodas",
  },
  {
    quote: "Content that doesn't just look great but brings real results. We recommend without reservations.",
    author: "Marketing Department",
    company: "Eurovaistine",
  },
];

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 px-6 bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            What clients{" "}
            <span className="ig-gradient-text">say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:border-[var(--muted)]/30 transition-colors duration-300 h-full">
                  <div className="ig-gradient-text text-4xl font-serif mb-4 leading-none select-none">
                    &ldquo;
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[var(--foreground)] leading-relaxed mb-6">
                    {t.quote}
                  </p>
                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <p className="font-[family-name:var(--font-inter)] font-medium text-sm">{t.author}</p>
                    <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--muted)] mt-0.5">{t.company}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
