"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stack = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Vercel", slug: "vercel" },
  { name: "Stripe", slug: "stripe" },
];

/**
 * The one marquee on the site (Marquee Max-One-Per-Page). Motivated by
 * storytelling continuity from the hero: it names the tools the studio
 * actually builds with, directly beneath the fold, before any claim is made.
 *
 * It scrolls continuously and never runs out: the strip is several copies of the list, and it moves by exactly one copy's
 * width before restarting. The animation only runs while the strip is on screen (IntersectionObserver
 * toggles a class), so it never keeps repainting behind other content or a
 * backgrounded tab.
 */
// How many identical copies of the stack are laid end to end. One copy is about 1,450px wide, and at any moment
// the strip needs enough to fill the screen while one copy's width has scrolled away: four covers anything up to a very wide monitor.
const COPIES = 4;

export function TechMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.01,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
          The stack we build with
        </p>
      </div>
      <div
        ref={ref}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {/* Each copy carries its own trailing gap (pr-16), so one copy's width is exactly the distance between
            matching items. The strip slides by exactly that, then snaps back: the swap is invisible. */}
        <div
          className="flex w-max motion-reduce:animate-none"
          style={{
            animation: "marquee-loop 28s linear infinite",
            animationPlayState: inView ? "running" : "paused",
            ["--copies" as string]: COPIES,
          }}
        >
          {Array.from({ length: COPIES }, (_, c) => (
            <div key={c} className="flex shrink-0 gap-16 pr-16" aria-hidden={c > 0 ? true : undefined}>
              {stack.map((t) => (
                <div key={t.slug} className="flex items-center gap-3 opacity-60">
                  <Image
                    src={`https://cdn.simpleicons.org/${t.slug}/ffffff`}
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="size-6"
                    unoptimized
                  />
                  <span className="whitespace-nowrap text-sm text-text-muted">{t.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
