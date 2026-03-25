"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  /** If true, renders as h1 */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Gradient class applied to specific word indices (0-based) */
  gradientWords?: number[];
  /** Scroll offset range — [start, end] where the reveal happens. Default: ["start 0.9", "start 0.3"] */
  scrollOffset?: [string, string];
}

export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
  gradientWords = [],
  scrollOffset = ["start 0.9", "start 0.3"],
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset as ["start end", "start start"],
  });

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          const isGradient = gradientWords.includes(i);

          return (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              isGradient={isGradient}
            />
          );
        })}
      </Tag>
    </div>
  );
}

interface WordProps {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  isGradient: boolean;
}

function Word({ word, progress, range, isGradient }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block", willChange: "opacity, transform" }}
      className={isGradient ? "ig-gradient-text" : ""}
    >
      {word}&nbsp;
    </motion.span>
  );
}
