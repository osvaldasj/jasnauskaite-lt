"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TiltCard } from "@/components/effects/TiltCard";

const portfolioItems = [
  { title: "Stiliaus kodas", type: "Long-term partner", color: "from-ig-purple/20 to-ig-magenta/10", span: "md:col-span-2 md:row-span-2", height: "min-h-[400px]", longterm: true },
  { title: "Aruelle", type: "Long-term partner", color: "from-ig-magenta/20 to-ig-pink/10", span: "md:col-span-2", height: "min-h-[200px]", longterm: true },
  { title: "Eurovaistine", type: "Long-term partner", color: "from-ig-pink/20 to-ig-orange/10", span: "", height: "min-h-[200px]", longterm: true },
  { title: "ODORO", type: "Long-term partner", color: "from-ig-purple/15 to-ig-pink/10", span: "", height: "min-h-[200px]", longterm: true },
  { title: "Perfectil", type: "Long-term partner", color: "from-ig-magenta/15 to-ig-purple/10", span: "", height: "min-h-[200px]", longterm: true },
  { title: "Lancome", type: "Campaign", color: "from-ig-orange/15 to-ig-yellow/10", span: "", height: "min-h-[200px]", longterm: false },
  { title: "Hellmann's", type: "Campaign", color: "from-ig-yellow/20 to-ig-orange/10", span: "", height: "min-h-[200px]", longterm: false },
  { title: "McDonald's", type: "Campaign", color: "from-ig-orange/20 to-ig-yellow/10", span: "", height: "min-h-[200px]", longterm: false },
  { title: "Barbora", type: "Campaign", color: "from-ig-pink/15 to-ig-magenta/10", span: "md:col-span-2", height: "min-h-[200px]", longterm: false },
];

export function PortfolioHighlight() {
  return (
    <section id="portfolio" className="py-12 md:py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-10"
        >
          <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-4 tracking-widest uppercase">
            Portfolio
          </p>
          <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-3xl md:text-4xl tracking-[0.02em]">
            Selected{" "}
            <span className="ig-gradient-text">work</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {portfolioItems.map((item) => (
            <motion.div key={item.title} variants={fadeInUp} className={`${item.span} ${item.height}`}>
              <TiltCard className="h-full">
                <div className="group relative bg-[var(--surface)] rounded-xl overflow-hidden cursor-pointer h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="font-[family-name:var(--font-outfit)] font-semibold text-xl md:text-2xl text-[var(--foreground)]/20 group-hover:text-[var(--foreground)]/10 transition-all duration-300">
                      {item.title}
                    </span>
                    {item.longterm && (
                      <span className="text-xs font-[family-name:var(--font-inter)] tracking-widest uppercase ig-gradient-text opacity-40">
                        Long-term partner
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                    <p className="text-white font-[family-name:var(--font-outfit)] font-semibold text-lg">
                      {item.title}
                    </p>
                    <p className="text-white/70 font-[family-name:var(--font-inter)] text-sm">
                      {item.type}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
