"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle magnetic pull toward the cursor. Motivated by feedback: primary
 * calls to action get a physical response to the intent of hovering them,
 * which is what makes premium interfaces feel tactile instead of flat.
 * Spring-smoothed motion values only, no state, no layout cost.
 */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Cache the resting (untransformed) rect on enter. Two reasons: (1) a
  // flex parent with the default `align-items: stretch` will stretch this
  // wrapper to fill the cross axis -- reading the rect once up front, and
  // pairing it with `w-fit` below, keeps the magnetic center locked to the
  // actual button instead of the stretched box. (2) re-querying mid-drag
  // would read a rect that already includes our own transform, feeding
  // back into itself.
  const restRect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleEnter() {
    if (reduce || !ref.current) return;
    restRect.current = ref.current.getBoundingClientRect();
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = restRect.current ?? ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    restRect.current = null;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { x: springX, y: springY }}
      className="inline-block w-fit self-start"
    >
      {children}
    </motion.div>
  );
}
