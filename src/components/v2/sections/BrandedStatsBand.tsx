"use client";

/* ------------------------------------------------------------------ */
/*  BrandedStatsBand — branded content performance stats band           */
/* ------------------------------------------------------------------ */

const BRANDED_STATS = [
  { value: "735", label: "Branded posts" },
  { value: "114K", label: "Avg views" },
  { value: "7.7K", label: "Avg likes" },
  { value: "24", label: "Brand partners" },
];

export default function BrandedStatsBand() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        {/* Label */}
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[var(--v2-ig-purple)] font-[family-name:var(--font-mono)] text-center">
          Branded content performance
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {BRANDED_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 ${
                i < BRANDED_STATS.length - 1
                  ? "md:border-r md:border-[var(--v2-border)]"
                  : ""
              }`}
            >
              <span
                className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-mono)] v2-gradient-text"
              >
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[var(--v2-text-muted)] font-[family-name:var(--font-body)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient line */}
        <div
          className="mt-10 mx-auto h-[2px] w-32 rounded-full"
          style={{ background: "var(--v2-gradient)" }}
        />
      </div>
    </section>
  );
}
