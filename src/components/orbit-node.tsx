import type { CSSProperties } from "react";
import "./orbit-node.css";

/**
 * A node that travels around the border of the card it sits in, and the
 * border lights up behind it like an outline being drawn: the same orange node as the hero map. Put it inside an
 * element that is `relative` and has the class `orbit-wrap`, but not inside
 * one with `overflow: hidden`, so the glow isn't clipped at the edge.
 *
 * `duration` is seconds per lap; give wider cards longer laps so every
 * node moves at about the same speed. `delay` (negative) offsets the start
 * so the cards never move in step.
 */
/** Lengths (percent of the border) of the stacked trail dashes, longest first. */
const TRAIL = [44, 33, 23, 14, 7];

export function OrbitNode({ radius = 20, duration = 12, delay = 0 }: { radius?: number; duration?: number; delay?: number }) {
  const style = { ["--dur" as string]: `${duration}s`, ["--delay" as string]: `${delay}s` } as CSSProperties;
  return (
    <svg className="orbit" style={style} aria-hidden="true">
      {TRAIL.map((len) => (
        <rect key={len} className="orbit-trail" rx={radius} pathLength={100} strokeDasharray={`0 ${100 - len} ${len} 0`} />
      ))}
      <rect className="orbit-near" rx={radius} pathLength={100} />
      <rect className="orbit-head" rx={radius} pathLength={100} />
    </svg>
  );
}
