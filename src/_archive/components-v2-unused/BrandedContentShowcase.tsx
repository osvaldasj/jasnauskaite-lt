"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Top branded content showcase — horizontal scroll cards              */
/* ------------------------------------------------------------------ */

const TOP_CONTENT = [
  {
    brand: "Mionetto",
    views: "3.2M",
    tag: "Lifestyle · Events",
    image: "/images/branded/mionetto-DNXetzOMT__.jpg",
    gradient: "from-[#E1306C] to-[#F77737]",
    url: "https://www.instagram.com/reel/DNXetzOMT__/",
  },
  {
    brand: "Mionetto",
    views: "2.2M",
    tag: "Lifestyle · Events",
    image: "/images/branded/mionetto-C4SX92Zt6pN.jpg",
    gradient: "from-[#833AB4] to-[#E1306C]",
    url: "https://www.instagram.com/reel/C4SX92Zt6pN/",
  },
  {
    brand: "Akropolis",
    views: "563K",
    tag: "Fashion · Shopping",
    image: "/images/branded/akropolis-DPDlAeZiEuJ.jpg",
    gradient: "from-[#C13584] to-[#E1306C]",
    url: "https://www.instagram.com/reel/DPDlAeZiEuJ/",
  },
  {
    brand: "Maxima",
    views: "542K",
    tag: "FMCG · Lifestyle",
    image: "/images/branded/maxima-DMK9spgtfv-.jpg",
    gradient: "from-[#FCAF45] to-[#F77737]",
    url: "https://www.instagram.com/reel/DMK9spgtfv-/",
  },
  {
    brand: "Akropolis",
    views: "511K",
    tag: "Fashion · Shopping",
    image: "/images/branded/akropolis-DRjZN_fCLXa.jpg",
    gradient: "from-[#F77737] to-[#FCAF45]",
    url: "https://www.instagram.com/reel/DRjZN_fCLXa/",
  },
  {
    brand: "Akropolis",
    views: "425K",
    tag: "Fashion · Shopping",
    image: "/images/branded/akropolis-DR6npUDCK23.jpg",
    gradient: "from-[#833AB4] to-[#C13584]",
    url: "https://www.instagram.com/reel/DR6npUDCK23/",
  },
];

export default function BrandedContentShowcase() {
  return (
    <section className="py-14 md:py-20">
      {/* Header */}
      <div className="px-6 mx-auto max-w-5xl mb-12">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)]">
          Top content
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
          Best performing{" "}
          <span className="v2-gradient-text">branded posts</span>
        </h2>
      </div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-4 md:gap-5 px-6 pb-4" style={{ width: "max-content" }}>
          {TOP_CONTENT.map((item, i) => (
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={`${item.brand}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative w-[240px] md:w-[280px] shrink-0 rounded-2xl overflow-hidden border border-[var(--v2-border)] hover:border-[var(--v2-ig-magenta)]/30 transition-all cursor-pointer"
              style={{ background: "var(--v2-surface)" }}
            >
              {/* Visual area — real image with gradient fallback */}
              <div
                className={`relative h-[280px] md:h-[320px] bg-gradient-to-br ${item.gradient} flex items-end p-5 overflow-hidden`}
              >
                {/* Cover image */}
                <Image
                  src={item.image}
                  alt={`${item.brand} branded content`}
                  fill
                  className="object-cover"
                  sizes="280px"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Views badge */}
                <div className="relative z-10 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-white text-sm font-bold font-[family-name:var(--font-mono)]">
                    {item.views}
                  </span>
                </div>
              </div>

              {/* Info area */}
              <div className="p-4">
                <h3 className="text-base font-bold text-[var(--v2-text)] font-[family-name:var(--font-heading)]">
                  {item.brand}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-mono)]">
                  {item.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Mobile scroll hint */}
      <p className="mt-4 px-6 text-center text-xs text-[var(--v2-text-dim)] font-[family-name:var(--font-mono)] md:hidden">
        Swipe to explore →
      </p>
    </section>
  );
}
