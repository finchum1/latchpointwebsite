import Link from "next/link";
import { Wordmark } from "./logomark";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:hello@latchpointstudios.com", label: "hello@latchpointstudios.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              A small studio that designs and builds websites, apps, dashboards, and CRMs for
              founders and small teams.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-text-faint">
            &copy; {new Date().getFullYear()} Latchpoint Studios. Edmond, Oklahoma.
          </p>
        </div>
      </div>
    </footer>
  );
}
