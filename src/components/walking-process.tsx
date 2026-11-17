"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./process-steps.css"; // the rail, node and step styles

export type WalkStep = { marker: string; title: string; body: string; caption: string };

/**
 * The orange node walks the steps as you scroll, lighting the line behind it, and a preview beside them (passed in,
 * given the current step) fills in to match. Point at a step to jump to it. The current step is the one crossing a
 * band near the middle of the screen, found with an IntersectionObserver; the node's position is measured from the
 * real step markers, so it stays on them at any width. The preview is desktop only and sticks while the steps scroll.
 */
export function WalkingProcess({
  steps,
  preview,
  lastMinHeight = "22rem",
}: {
  steps: WalkStep[];
  preview: (stage: number) => ReactNode;
  /** CSS min-height for the last step on desktop, so the preview stays in view while it's current. */
  lastMinHeight?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const markerEls = useRef<(HTMLDivElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [ys, setYs] = useState<number[]>([]);
  const stage = hover ?? scrolled;

  // While the node travels it rides the rail; once it arrives it docks on the corner of its marker so the marker stays readable.
  const [moving, setMoving] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setMoving(true);
    const t = window.setTimeout(() => setMoving(false), 950);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setScrolled(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    stepEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const root = wrap.current;
      if (!root) return;
      const top = root.getBoundingClientRect().top;
      setYs(markerEls.current.map((m) => (m ? m.getBoundingClientRect().top - top + m.offsetHeight / 2 : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ready = ys.length === steps.length;
  const y0 = ys[0] ?? 0;
  const yEnd = ys[steps.length - 1] ?? 0;
  const yNow = ys[stage] ?? 0;

  return (
    <div className="mt-14 grid grid-cols-1 gap-x-12 lg:grid-cols-12">
      <div ref={wrap} className="pp-steps relative lg:col-span-5" data-ready={ready}>
        {ready && (
          <>
            <span className="pp-rail" style={{ top: y0, height: yEnd - y0 }} aria-hidden="true" />
            <span className="pp-rail pp-rail-fill" style={{ top: y0, height: yNow - y0 }} aria-hidden="true" />
            <span className="pp-ghost pp-ghost-2" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
            <span className="pp-ghost pp-ghost-1" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
            <span className="pp-node" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
          </>
        )}

        {steps.map((s, i) => (
          <div
            key={s.marker + s.title}
            ref={(el) => {
              stepEls.current[i] = el;
            }}
            data-step={i}
            data-state={i < stage ? "done" : i === stage ? "now" : "next"}
            className={`pp-step relative pb-14 pl-[4.5rem] last:pb-0 lg:pb-0 ${i === steps.length - 1 ? "lg:min-h-(--last-min)" : "lg:min-h-[14rem]"}`}
            style={i === steps.length - 1 ? ({ ["--last-min" as string]: lastMinHeight } as React.CSSProperties) : undefined}
            onPointerEnter={(e) => e.pointerType !== "touch" && setHover(i)}
            onPointerLeave={(e) => e.pointerType !== "touch" && setHover((h) => (h === i ? null : h))}
            onFocus={() => setHover(i)}
            onBlur={() => setHover((h) => (h === i ? null : h))}
            tabIndex={0}
          >
            <div
              ref={(el) => {
                markerEls.current[i] = el;
              }}
              className="pp-marker absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-sm text-text"
            >
              {s.marker}
            </div>
            <p className="pp-num font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">Step {i + 1}</p>
            <h3 className="mt-1 text-xl font-medium text-text">{s.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 hidden lg:col-span-7 lg:mt-0 lg:block">
        <div className="sticky top-28">{preview(stage)}</div>
      </div>
    </div>
  );
}
