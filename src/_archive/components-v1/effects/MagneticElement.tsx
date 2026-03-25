"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  /** Attraction strength — how far the element moves toward cursor. Default: 0.3 */
  strength?: number;
  /** Distance in px at which the magnetic pull activates. Default: 100 */
  radius?: number;
  /** HTML tag to render. Default: "div" */
  as?: "div" | "span" | "button";
}

export function MagneticElement({
  children,
  className = "",
  strength = 0.3,
  radius = 100,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength, radius]);

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
