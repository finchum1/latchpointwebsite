"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "./button";
import { Magnetic } from "./magnetic";
import { HeroGraphic } from "./hero-graphic";

const headline = "We build the software your business runs on.".split(" ");

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Background glow drifts slower than the page scrolls -- a small depth
  // cue, motivated purely by parallax being cheap here (one transform, one
  // element) and appropriate for a hero that's otherwise fairly still.
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div className="lg:col-span-3">
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-top">
                <motion.span
                  className="inline-block"
                  initial={reduce ? undefined : { y: "110%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                  {i < headline.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.5)}
            className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Websites, apps, dashboards, client portals, and CRMs, designed
            and shipped by one studio, usually in weeks, not quarters.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href="/contact">Start a project</Button>
            </Magnetic>
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
