"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./close-process.css";

/**
 * Wraps the "what each link shows" table. The first time it scrolls into view its check marks pop in row by row
 * (CSS, keyed to data-in), the way the studio's cards and steps arrive one after another.
 */
export function CompareReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="cmp mt-8 overflow-hidden rounded-[20px] border border-border" data-in={inView}>
      {children}
    </div>
  );
}
