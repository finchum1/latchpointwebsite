"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import "./featured-work.css";

/** Order the node visits the cards in when nobody is pointing at one. */
const TOUR = [0, 1, 2, 1];

/** Left offset of the centre of column i, matching the grid below (three columns, 1.5rem gaps). */
const colLeft = (i: number) => `calc(var(--col) * ${i + 0.5} + 1.5rem * ${i})`;

export function FeaturedWorkGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);
  const [tour, setTour] = useState(0);
  // The rail only exists where the cards sit side by side, so the self-guided tour only runs there too.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // While the section is on screen and nobody is pointing at a card, the node tours the three.
  useEffect(() => {
    if (reduce || !wide || !inView || hover !== null) return;
    let k = 0;
    setTour(TOUR[0]);
    const id = window.setInterval(() => {
      k = (k + 1) % TOUR.length;
      setTour(TOUR[k]);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce, wide, inView, hover]);

  // Reduced motion: no touring, the node only appears for the card you point at.
  const active = hover ?? (reduce || !wide ? null : tour);
  const shown = active ?? 0;

  const point = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType !== "touch" && setHover(i),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType !== "touch" && setHover((h) => (h === i ? null : h)),
    onFocus: () => setHover(i),
    onBlur: () => setHover((h) => (h === i ? null : h)),
  });

  const nodeStyle = { left: colLeft(shown) } as CSSProperties;

  return (
    <div ref={ref} className="mt-12 lg:mt-4">
      {/* the rail: lg and up only, where the cards sit side by side */}
      <div className="wr hidden lg:block" data-hover={hover !== null} data-idle={active === null} aria-hidden="true">
        <span className="wr-line" />
        {projects.map((p, i) => (
          <span key={p.slug}>
            <span className="wr-drop" data-on={active === i} style={{ left: colLeft(i) } as CSSProperties} />
            <span className="wr-port" data-on={active === i} style={{ left: colLeft(i) } as CSSProperties} />
          </span>
        ))}
        <span className="wr-node wr-ghost wr-ghost-2" style={nodeStyle} />
        <span className="wr-node wr-ghost wr-ghost-1" style={nodeStyle} />
        <span className="wr-node" style={nodeStyle} />
        <span className="wr-label" data-flip={shown === projects.length - 1} style={nodeStyle}>
          <b>{projects[shown]?.name}</b> &middot; view project &rarr;
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <div {...point(i)}>
              <ProjectCard project={p} priority={i === 0} active={active === i} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
