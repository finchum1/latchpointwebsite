"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { Compass, PenNib, Code, RocketLaunch } from "@phosphor-icons/react";

const steps = [
  {
    icon: Compass,
    name: "Discover",
    description:
      "A short call to figure out what the software actually needs to do, and what it can skip.",
  },
  {
    icon: PenNib,
    name: "Design",
    description: "A real interface to react to, not a wireframe, before a line of production code exists.",
  },
  {
    icon: Code,
    name: "Build",
    description: "The product gets built in the open, with a working preview you can check on anytime.",
  },
  {
    icon: RocketLaunch,
    name: "Ship",
    description: "Live on your domain, handed off with the access and docs to keep running it yourself.",
  },
];

/**
 * The connecting line grows with scroll progress through the section --
 * state transition, mirroring the sequence the copy describes. Bound to a
 * scoped ref via useScroll, never a window scroll listener.
 */
export function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-xl">
        <h2 className="text-3xl font-medium tracking-tight text-text sm:text-4xl">How we work</h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Four steps, one point of contact, no handoffs between teams that
          have never met.
        </p>
      </div>

      <div ref={ref} className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block" />
        <motion.div
          className="absolute left-0 top-6 hidden h-px bg-accent sm:block"
          style={{ scaleX: reduce ? 1 : scrollYProgress, transformOrigin: "left" }}
        />

        {steps.map((s) => (
          <div key={s.name} className="relative">
            <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-border-strong bg-bg text-text">
              <s.icon weight="light" className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-text">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
