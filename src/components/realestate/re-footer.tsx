import { Wordmark } from "../logomark";

const links = [
  { href: "https://latchpointstudios.com/work", label: "Our work" },
  { href: "https://latchpointstudios.com/services", label: "Services" },
  { href: "https://latchpointstudios.com/about", label: "About" },
  { href: "mailto:hello@latchpointstudios.com", label: "hello@latchpointstudios.com" },
];

export function RealEstateFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-12 sm:flex-row sm:items-end lg:px-8">
        <div className="max-w-sm">
          <a href="https://latchpointstudios.com">
            <Wordmark />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Websites and back offices for real estate agents and brokerages. Edmond, Oklahoma.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-sm text-text-muted transition-colors hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-7xl border-t border-border px-6 py-6 lg:px-8">
        <p className="text-xs text-text-faint">&copy; {new Date().getFullYear()} Latchpoint Studios.</p>
      </div>
    </footer>
  );
}
