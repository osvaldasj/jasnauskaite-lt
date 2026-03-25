"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTranslation } from "@/lib/i18n";

function AnimatedNumber({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useTranslation();

  const stats = [
    { value: 354, suffix: "K+", decimals: 0, label: t("stats.followers") },
    { value: 4.2, suffix: "%", decimals: 1, label: t("stats.engagement") },
    { value: 50, suffix: "+", decimals: 0, label: t("stats.brands") },
    { value: 8, suffix: "+", decimals: 0, label: t("stats.experience") },
  ];

  if (stats.length === 0) return null;

  return (
    <section className="py-10 md:py-14 px-6 bg-[var(--surface)]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp} className="text-center">
            <p className="font-[family-name:var(--font-outfit)] font-semibold text-4xl md:text-5xl tracking-[0.02em]">
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </p>
            <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-inter)] mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
