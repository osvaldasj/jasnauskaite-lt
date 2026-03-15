"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const clients = [
  { name: "Stiliaus kodas", longterm: true },
  { name: "Aruelle", longterm: true },
  { name: "Eurovaistine", longterm: true },
  { name: "ODORO", longterm: true },
  { name: "Perfectil", longterm: true },
  { name: "GymPlius", longterm: true },
  { name: "Barbora", longterm: true },
  { name: "DailySpoon", longterm: true },
  { name: "Lancome", longterm: false },
  { name: "McDonald's", longterm: false },
  { name: "Tele2", longterm: false },
  { name: "Maxima", longterm: false },
  { name: "Boozt", longterm: false },
  { name: "Hellmann's", longterm: false },
  { name: "Mionetto", longterm: false },
  { name: "Armani Beauty", longterm: false },
  { name: "SAKAI", longterm: false },
  { name: "Mova", longterm: false },
  { name: "Hover Air", longterm: false },
  { name: "Milka", longterm: false },
  { name: "Donum", longterm: false },
  { name: "Livly", longterm: false },
];

export function ClientLogos() {
  return (
    <section className="py-10 overflow-hidden">
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-8 tracking-widest uppercase"
      >
        Trusted by
      </motion.p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 animate-marquee">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className={`flex-shrink-0 text-lg font-[family-name:var(--font-outfit)] font-medium whitespace-nowrap select-none cursor-default transition-colors duration-300 ${
                client.longterm
                  ? "text-[var(--foreground)]/40 hover:text-[var(--foreground)]"
                  : "text-[var(--muted)]/25 hover:text-[var(--foreground)]"
              }`}
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
