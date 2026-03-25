"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Working with Inide has been one of the best decisions for our brand. The content feels genuine, the audience trusts her, and the results speak for themselves.",
    name: "Marketing Manager",
    brand: "Mionetto",
  },
  {
    quote:
      "What sets Inide apart is her professionalism and creative vision. She understands our brand perfectly and consistently delivers content that exceeds expectations.",
    name: "Brand Manager",
    brand: "Akropolis",
  },
  {
    quote:
      "The engagement rates on Inide's content are consistently above industry benchmarks. She genuinely cares about delivering results, not just posting content.",
    name: "Digital Lead",
    brand: "Maxima",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
            What brands{" "}
            <span className="v2-gradient-text">say</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col p-6 md:p-8 rounded-2xl border border-[var(--v2-border)]"
              style={{ background: "var(--v2-surface)" }}
            >
              {/* Quote mark */}
              <span
                className="text-4xl font-bold leading-none mb-4 v2-gradient-text font-[family-name:var(--font-heading)]"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-[var(--v2-text-muted)] font-[family-name:var(--font-body)] flex-1 mb-6">
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="pt-4 border-t border-[var(--v2-border)]">
                <p className="text-sm font-semibold text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
                  {t.name}
                </p>
                <p className="text-xs text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)] uppercase tracking-[0.1em]">
                  {t.brand}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
