"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Cursor-tracked spotlight glow, clipped to the card's own shape. Motivated
 * by feedback: it signals "this surface responds to you" more richly than a
 * flat border-color swap, the way premium product surfaces (Linear,
 * Vercel) do it. Pure motion values, never React state, so it costs
 * nothing on re-render and just doesn't move under reduced motion.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const background = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, var(--accent-soft), transparent 70%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  function handleLeave() {
    mx.set(-999);
    my.set(-999);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
