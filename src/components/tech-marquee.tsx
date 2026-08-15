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
 * The animation only runs while the strip is on screen (IntersectionObserver
 * toggles a class), so it never keeps repainting behind other content or a
 * backgrounded tab.
 */
export function TechMarquee() {
  const track = [...stack, ...stack];
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
        <div
          className="flex w-max gap-16 motion-reduce:animate-none"
          style={{
            animation: "marquee 28s linear infinite",
            animationPlayState: inView ? "running" : "paused",
          }}
        >
          {track.map((t, i) => (
            <div key={`${t.slug}-${i}`} className="flex items-center gap-3 opacity-60">
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
      </div>
    </section>
  );
}
