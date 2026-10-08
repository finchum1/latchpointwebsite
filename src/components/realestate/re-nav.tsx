"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logomark } from "../logomark";
import { Button } from "../button";
import { Magnetic } from "../magnetic";
import { ThemeToggle } from "../theme-toggle";

const links = [
  { href: "#website", label: "Website" },
  { href: "#back-office", label: "Back office" },
  { href: "#who", label: "Who it's for" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

/** Focused nav for the real estate page: anchors down the page instead of
 *  the studio site's section links, with the wordmark leading back out. */
export function RealEstateNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      {/* Wider than the studio site's pill (max-w-4xl): this one carries the
          "Real estate" tag next to the wordmark plus five anchor links, and
          at 896px that left everything cramped. */}
      <div className="relative w-full max-w-5xl">
        <div className="glass-pill flex items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 sm:gap-4 sm:pl-5">
          <a href="https://latchpointstudios.com" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Logomark className="size-6 text-text" />
            <span className="font-medium tracking-tight text-text">
              Latchpoint
              {/* Below ~440px there isn't room for the full name and the tag
                  together, so the tag wins and "Studios" steps aside. */}
              <span className="hidden text-text-muted min-[440px]:inline"> Studios</span>
            </span>
            <span className="whitespace-nowrap rounded-full border border-border-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted min-[400px]:tracking-[0.12em]">
              Real estate
            </span>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="whitespace-nowrap text-sm text-text-muted transition-colors hover:text-text">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <div className="hidden lg:block">
              <Magnetic strength={0.25}>
                <Button href="#start" className="!px-5 !py-2 !text-sm">
                  Start a project
                </Button>
              </Magnetic>
            </div>
            <button
              className="flex size-9 shrink-0 items-center justify-center text-text lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill glass-dense absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-[20px] p-2 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-[15px] text-text-muted transition-colors hover:bg-bg-elevated-2 hover:text-text"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button href="#start" onClick={() => setOpen(false)} className="mt-1 w-full">
                  Start a project
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
