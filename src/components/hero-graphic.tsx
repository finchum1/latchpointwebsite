"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The brand mark, built out: a field of connection points with one point
 * that locks into place, tracing the lines that lead to it. Motivated by
 * storytelling -- it dramatizes the studio's name on the one page where
 * that's worth doing, and nowhere else on the site.
 */
export function HeroGraphic() {
  const reduce = useReducedMotion();

  const nodes: [number, number][] = [
    [40, 60], [120, 30], [200, 90], [90, 140], [230, 170],
    [30, 200], [170, 230], [260, 60], [140, 190], [260, 220],
  ];
  const latch: [number, number] = [190, 130];
  const lines = nodes.slice(0, 6);

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
        <g opacity={0.5}>
          {lines.map(([x, y], i) => (
            <motion.line
              key={i}
              x1={x}
              y1={y}
              x2={latch[0]}
              y2={latch[1]}
              stroke="var(--border-strong)"
              strokeWidth={1}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>

        {nodes.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill="var(--text-faint)"
            initial={reduce ? undefined : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        <motion.circle
          cx={latch[0]}
          cy={latch[1]}
          r={16}
          fill="var(--accent-soft)"
          initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={latch[0]}
          cy={latch[1]}
          r={7}
          fill="var(--accent)"
          initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [0.4, 1.15, 1] }
          }
          transition={{ duration: 0.7, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {!reduce && (
          <motion.circle
            cx={latch[0]}
            cy={latch[1]}
            r={7}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.5}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 3.2 }}
            transition={{ duration: 2.2, delay: 1.6, repeat: 2, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}
