"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";
import { HeroGraphic } from "./hero-graphic";

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div className="lg:col-span-3">
          <motion.h1
            {...fadeUp(0)}
            className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]"
          >
            We build the software your business runs on.
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Websites, apps, dashboards, client portals, and CRMs, designed
            and shipped by one studio, usually in weeks, not quarters.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="secondary" showArrow={false}>
              See our work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center lg:col-span-2 lg:justify-end"
        >
          <HeroGraphic />
        </motion.div>
      </div>
    </section>
  );
}
