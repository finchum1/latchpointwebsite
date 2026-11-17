"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logomark } from "../logomark";
import { NavFrame } from "../nav-frame";
import { Button } from "../button";
import { Magnetic } from "../magnetic";
import { ThemeToggle } from "../theme-toggle";

const links = [
  { href: "#agent", label: "For agents" },
  { href: "#client", label: "For clients" },
  { href: "#handled", label: "What I handle" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/** Focused nav for the Close page: anchors down the page instead of
 *  the studio site's section links, with the wordmark leading back out. */
export function CloseNav() {
  const [open, setOpen] = useState(false);

  return (
    <NavFrame
      pillWidth="max-w-5xl"
      gap="gap-2 sm:gap-4"
      panels={
        <>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill glass-dense absolute inset-x-0 top-[calc(100%+0.5rem)] mx-auto max-w-4xl rounded-[20px] p-2 lg:hidden"
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
                  Send me a file
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </>
      }
    >
      {/* A full page load: "/" here is the subdomain root, a host-based rewrite. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <Logomark className="size-6 text-text" animated />
        <span className="font-medium tracking-tight text-text">
          Close
          <span className="text-text-muted"> by Latchpoint</span>
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
              Send me a file
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
    </NavFrame>
  );
}
