"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  /** Number of items to determine scroll distance */
  itemCount: number;
  className?: string;
}

export function HorizontalScroll({ children, itemCount, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translate the inner container horizontally based on vertical scroll
  // Each item is ~80vw, so total travel = (itemCount - 1) * 80vw
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(itemCount - 1) * 80}vw`]
  );

  return (
    <>
      {/* Desktop: horizontal scroll pinned section */}
      <div
        ref={containerRef}
        className={`hidden md:block relative ${className}`}
        style={{
          // Height determines how long the section stays pinned
          height: `${itemCount * 80}vh`,
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            ref={scrollRef}
            style={{ x, willChange: "transform" }}
            className="flex gap-8 pl-[10vw]"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical scroll fallback */}
      <div className="md:hidden flex flex-col gap-6 px-6">
        {children}
      </div>
    </>
  );
}

interface HorizontalScrollItemProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScrollItem({ children, className = "" }: HorizontalScrollItemProps) {
  return (
    <div
      className={`w-[80vw] md:min-w-[80vw] flex-shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}
