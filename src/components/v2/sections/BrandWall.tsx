"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Brand data split into 3 rows                                       */
/* ------------------------------------------------------------------ */

const ROW_1 = ["Akropolis", "Mionetto", "Maxima", "Nissan", "Barbora", "Lancôme", "McDonald's", "Tele2", "Milka"];
const ROW_2 = ["GoVilnius", "Perfectil", "Hellmann's", "Stiliaus kodas", "Boozt", "Hover Air", "GymPlius", "MOVA"];
const ROW_3 = ["Daily Spoon", "Aruelle", "Eurovaistine", "Donum", "Livly", "NewCrush", "ODORO", "Rent Boutique"];

/* ------------------------------------------------------------------ */
/*  Single logo item                                                   */
/* ------------------------------------------------------------------ */

function BrandItem({ name }: { name: string }) {
  return (
    <span className="group inline-flex items-center gap-6 md:gap-10 shrink-0">
      <span className="text-lg md:text-2xl lg:text-3xl uppercase font-[family-name:var(--font-heading)] font-semibold tracking-[0.2em] text-[var(--v2-text-muted)] transition-all duration-500 group-hover:v2-gradient-text cursor-default whitespace-nowrap">
        {name}
      </span>
      <span
        className="text-[var(--v2-border)] text-xl md:text-2xl select-none"
        aria-hidden="true"
      >
        &middot;
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee row                                                        */
/* ------------------------------------------------------------------ */

function MarqueeRow({
  brands,
  direction = "left",
  duration,
  className,
}: {
  brands: string[];
  direction?: "left" | "right";
  duration: number;
  className?: string;
}) {
  // Triple the items for seamless looping
  const items = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];
  const animationName =
    direction === "left" ? "v2-marquee" : "v2-marquee-reverse";

  return (
    <div className={`overflow-hidden relative ${className ?? ""}`}>
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--v2-bg), transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--v2-bg), transparent)",
        }}
      />

      <div
        className="flex items-center gap-6 md:gap-10 w-max"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {items.map((brand, i) => (
          <BrandItem key={`${brand}-${i}`} name={brand} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BrandWall section                                                  */
/* ------------------------------------------------------------------ */

export default function BrandWall() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-[var(--v2-bg)]">
      {/* Header */}
      <motion.div
        className="text-center mb-8 md:mb-14 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-[family-name:var(--font-mono)] text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--v2-ig-purple)] mb-4">
          Partners
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-bold text-[var(--v2-text)]">
          Brands I&apos;ve{" "}
          <span className="v2-gradient-text">worked with</span>
        </h2>
      </motion.div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Row 1 — left, normal speed */}
        <MarqueeRow brands={ROW_1} direction="left" duration={35} />

        {/* Row 2 — right, slower */}
        <MarqueeRow brands={ROW_2} direction="right" duration={45} />

        {/* Row 3 — left, faster (hidden on mobile — 2 rows only) */}
        <MarqueeRow
          brands={ROW_3}
          direction="left"
          duration={28}
          className="hidden md:block"
        />
      </div>
    </section>
  );
}
