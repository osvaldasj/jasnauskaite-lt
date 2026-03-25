"use client";

import { useEffect, useState } from "react";

/**
 * GrainOverlay — cinematic film grain texture over the entire viewport.
 *
 * Uses an inline SVG feTurbulence filter for the noise pattern and a CSS
 * animation to subtly shift it, creating the look of analogue film grain.
 * Disabled on mobile to save GPU cycles.
 */
export function GrainOverlay() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch, wider screens
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setEnabled(mq.matches);

    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        opacity: 0.035,
        animation: "v2-grain 8s steps(10) infinite",
        willChange: "transform",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="v2-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          width: "calc(100% + 40px)",
          height: "calc(100% + 40px)",
          marginLeft: "-20px",
          marginTop: "-20px",
          filter: "url(#v2-grain-filter)",
        }}
      />
    </div>
  );
}
