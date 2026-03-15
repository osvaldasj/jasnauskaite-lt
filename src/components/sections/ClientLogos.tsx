"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";

const partners = [
  { name: "Akropolis", logo: "akropolis.svg" },
  { name: "Mionetto", logo: "mionetto.svg" },
  { name: "Maxima", logo: "maxima.svg" },
  { name: "Nissan", logo: "nissan.svg" },
  { name: "GoVilnius", logo: "govilnius.svg" },
  { name: "Perfectil", logo: "perfectil.svg" },
  { name: "Hellmann's", logo: "hellmanns.svg" },
  { name: "Stiliaus kodas", logo: "stiliaus-kodas.svg" },
  { name: "Daily Spoon", logo: "daily-spoon.svg" },
  { name: "Aruelle", logo: "aruelle.svg" },
  { name: "Eurovaistinė", logo: "eurovaistine.svg" },
];

export function ClientLogos() {
  const { t } = useTranslation();

  if (partners.length === 0) return null;

  return (
    <section className="py-6 overflow-hidden">
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mb-8 tracking-widest uppercase"
      >
        {t("clients.label")}
      </motion.p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 animate-marquee items-center">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 select-none cursor-default opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={`/logos/${partner.logo}`}
                alt={partner.name}
                className="h-8 w-auto object-contain"
                style={{ filter: "var(--logo-filter, none)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
