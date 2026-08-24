"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Next.js remounts `template.tsx` on every navigation (unlike layout.tsx),
 * so this gives every route a consistent soft entrance instead of a hard
 * cut. Motivated by state transition: it marks "you're on a new page" the
 * same way throughout the site.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
