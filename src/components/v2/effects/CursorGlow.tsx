"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * CursorGlow — soft IG-gradient ambient light that follows the mouse.
 *
 * Uses Framer Motion springs for buttery-smooth delayed tracking.
 * Automatically disabled on touch devices to avoid phantom glows.
 */
export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [mouseX, mouseY, visible]
  );

  const handleMouseLeave = useCallback(() => setVisible(false), []);
  const handleMouseEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(193,53,132,0.07) 0%, rgba(131,58,180,0.04) 30%, rgba(247,119,55,0.02) 55%, transparent 70%)",
          filter: "blur(2px)",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
