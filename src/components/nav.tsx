"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { Wordmark } from "./logomark";
import { Button } from "./button";
import { Magnetic } from "./magnetic";
import { solutions } from "@/lib/solutions";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  // Trigger and panel are DOM siblings (the panel has to live outside the
  // pill's own overflow-hidden, or it gets clipped -- see the panel's
  // comment below), so a plain onMouseLeave on either one would flicker
  // shut while the cursor crosses the gap between them. A short delayed
  // close, cancelled by either element's onMouseEnter, bridges that gap.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openSolutions() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  }

  function scheduleCloseSolutions() {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
  }

  const solutionsActive = pathname.startsWith("/solutions");

  // Close menus on navigation, adjusting state during render (React's
  // documented alternative to an effect for this exact case) rather than
  // setting state from inside a useEffect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setSolutionsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <div className="relative w-full max-w-4xl">
        <div className="glass-pill flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2">
          <Link href="/" className="flex shrink-0 items-center">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <div
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
              onFocus={openSolutions}
              onBlur={scheduleCloseSolutions}
            >
              <Link
                href="/solutions"
                className={`group relative flex items-center gap-1 text-sm transition-colors ${
                  solutionsActive ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                Solutions
                <CaretDown
                  weight="bold"
                  className={`size-3 transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute -bottom-1 left-0 h-px w-[calc(100%-1rem)] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
                    solutionsActive ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </div>

            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative text-sm transition-colors ${
                    active ? "text-text" : "text-text-muted hover:text-text"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
                      active ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Magnetic strength={0.25}>
              <Button href="/contact" className="!px-5 !py-2 !text-sm">
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

        {/* Rendered as a sibling of .glass-pill, not a child of it -- that
            div's own overflow-hidden (needed to clip the glass highlight to
            the pill shape) would otherwise clip this panel too. */}
        <AnimatePresence>
          {solutionsOpen && (
            <motion.div
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill absolute inset-x-0 top-[calc(100%+0.5rem)] hidden rounded-[20px] p-3 lg:block"
            >
              <div className="grid grid-cols-2 gap-1">
                {solutions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                  >
                    <s.icon
                      weight="light"
                      className="mt-0.5 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                    />
                    <span>
                      <span className="block text-sm font-medium text-text">{s.name}</span>
                      <span className="mt-0.5 block text-xs text-text-muted">{s.navDescription}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/solutions"
                className="group mt-1 flex items-center gap-1.5 border-t border-border px-3 pt-3 text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                View all solutions
                <ArrowRight
                  weight="bold"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-[20px] p-2 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href="/solutions"
                  className="rounded-xl px-3 py-2.5 text-[15px] text-text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  Solutions
                </Link>
                <div className="flex flex-col gap-0.5 pb-1 pl-3">
                  {solutions.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="rounded-lg px-3 py-2 text-sm text-text-faint transition-colors hover:bg-white/5 hover:text-text"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-3 py-2.5 text-[15px] text-text-muted transition-colors hover:bg-white/5 hover:text-text"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button href="/contact" className="mt-1 w-full">
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
