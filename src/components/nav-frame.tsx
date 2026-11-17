"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * The frame every site header shares. At the top of the page the header is a
 * plain bar across the page's own width; once you scroll it condenses into a
 * floating glass pill. A passive scroll listener flips one boolean, and every
 * visual change is a CSS transition (the width and padding animate, and the
 * glass is its own layer that fades in, so the bar never snaps between looks).
 *
 * `children` is the row (logo, links, buttons). `panels` is anything that drops
 * below the bar (menus), rendered inside the frame so it lines up with the bar
 * but outside the row, so it isn't clipped.
 */
export function NavFrame({
  children,
  panels,
  pillWidth = "max-w-4xl",
  gap = "gap-4",
}: {
  children: ReactNode;
  panels?: ReactNode;
  /** Tailwind max-width of the pill once scrolled. */
  pillWidth?: string;
  /** Tailwind gap between the row's items. */
  gap?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 sm:top-6">
      {/* The page's own container at the top (same width and side padding as the content below), the narrower pill once scrolled. */}
      <div
        className={`mx-auto w-full transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? `${pillWidth} px-4` : "max-w-7xl px-6 lg:px-8"
        }`}
      >
        <div className="relative">
          <div
            className={`relative isolate flex items-center justify-between ${gap} rounded-full py-2 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled ? "pl-4 pr-2 sm:pl-5" : "pl-0 pr-0"
            }`}
          >
            <div
              aria-hidden="true"
              className={`glass-pill pointer-events-none absolute inset-0 -z-10 rounded-full transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />
            {children}
          </div>
          {panels}
        </div>
      </div>
    </header>
  );
}
