"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { Project } from "@/lib/projects";

/**
 * Hover tilt is feedback: it tells you the whole card is a link before you
 * click it. Driven entirely by motion values, never React state, so it
 * costs nothing on re-render and collapses cleanly under reduced motion.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useTransform(my, [0, 1], [6, -6]);
  const rotateY = useTransform(mx, [0, 1], [-6, 6]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <Link href={`/work#${project.slug}`} className="group block">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated transition-colors duration-300 group-hover:border-border-strong"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-elevated-2">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-text-faint">{project.category}</p>
              <h3 className="mt-1.5 text-lg font-medium text-text">{project.name}</h3>
            </div>
            <ArrowUpRight
              weight="bold"
              className="mt-1 size-4 shrink-0 text-text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.summary}</p>
        </div>
      </motion.div>
    </Link>
  );
}
