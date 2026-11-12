"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";

/**
 * The dashboard at work, on a laptop screen: a short silent loop recorded from the real app (sample data only).
 * It plays while it is on screen, stops when scrolled away, and does not autoplay at all for visitors who ask their
 * system for reduced motion (they see the still poster and can press play). A pause button is always there.
 */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current && !reduced.current) run();
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      reduced.current = false;
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="relative mx-auto w-full">
      {/* The screen */}
      <div className="rounded-[18px] border border-border-strong bg-[#17181b] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:p-2.5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-bg-elevated">
          <video
            ref={ref}
            className="absolute inset-0 size-full object-cover"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause the demo video" : "Play the demo video"}
            className="absolute bottom-3 left-3 flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {playing ? <Pause weight="fill" className="size-3.5" /> : <Play weight="fill" className="size-3.5" />}
          </button>
        </div>
      </div>
      {/* The base */}
      <div aria-hidden="true" className="relative mx-auto -mt-px h-3.5 w-[112%] -translate-x-[5.4%] rounded-b-[18px] bg-gradient-to-b from-[#2b2d32] to-[#1a1b1f] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.55)]">
        <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-[#101114]" />
      </div>
    </figure>
  );
}
