"use client";

import { type ElementType, type ReactNode, type CSSProperties } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** HTML element to render. Default: "span" */
  as?: ElementType;
  /** Enable slow gradient position animation. Default: false */
  animated?: boolean;
  /** Custom gradient override (CSS value). Defaults to IG gradient. */
  gradient?: string;
  style?: CSSProperties;
}

/**
 * GradientText — reusable IG gradient text component.
 *
 * Renders children with the Instagram gradient applied as text color
 * via background-clip. Optionally animates the gradient position
 * for a living, shifting effect.
 */
export function GradientText({
  children,
  className = "",
  as: Tag = "span",
  animated = false,
  gradient,
  style,
}: GradientTextProps) {
  const baseClass = animated ? "v2-gradient-text-animated" : "v2-gradient-text";

  return (
    <Tag
      className={`${baseClass} ${className}`}
      style={
        gradient
          ? {
              background: gradient,
              backgroundSize: animated ? "300% 300%" : "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              ...style,
            }
          : style
      }
    >
      {children}
    </Tag>
  );
}
