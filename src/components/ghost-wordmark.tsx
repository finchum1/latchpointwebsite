"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A word, huge and ghosted, resting on the very bottom edge of a footer: the same quiet watermark as the bottom of the
 * agent sites. The letters are outlined from Geist Bold into one vector path (passed in), so they stay sharp at any
 * size and need no font. It runs edge to edge, then rises out of the bottom edge and fades in the first time it
 * scrolls into view, and stays. Visitors who ask for less motion get it in place straight away.
 */
export function GhostWordmark({ view, path }: { view: string; path: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // overflow hidden: the word comes up out of the bottom edge of the page rather than sliding over the footer above it
    <div ref={ref} className="mt-10 overflow-hidden sm:mt-14" style={{ paddingInline: "clamp(10px, 1.6vw, 28px)", lineHeight: 0 }} aria-hidden="true">
      <div
        style={{
          transform: shown ? "none" : "translateY(34%)",
          opacity: shown ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <svg viewBox={view} style={{ display: "block", width: "100%", height: "auto" }}>
          <path fill="rgba(245, 245, 244, 0.1)" d={path} />
        </svg>
      </div>
    </div>
  );
}
