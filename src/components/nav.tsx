"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Wordmark } from "./logomark";
import { Button } from "./button";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation, adjusting state during render
  // (React's documented alternative to an effect for this exact case)
  // rather than setting state from inside a useEffect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <div className="relative w-full max-w-4xl">
        <div className="glass-pill flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2">
          <Link href="/" className="flex shrink-0 items-center">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors ${
                  pathname === l.href ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" className="!px-5 !py-2 !text-sm">
              Start a project
            </Button>
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
