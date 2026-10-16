import { Wordmark } from "../logomark";

const links = [
  { href: "https://app.latchpointstudios.com", label: "Sign in" },
  { href: "https://app.latchpointstudios.com/privacy", label: "Privacy" },
  { href: "https://app.latchpointstudios.com/terms", label: "Terms" },
  { href: "https://emailsignature.latchpointstudios.com", label: "Free email signature tool" },
  { href: "https://latchpointstudios.com", label: "Latchpoint Studios" },
  { href: "mailto:hello@latchpointstudios.com", label: "hello@latchpointstudios.com" },
];

export function RealEstateFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-12 sm:flex-row sm:items-end lg:px-8">
        <div className="max-w-sm">
          <a href="https://latchpointstudios.com">
            <Wordmark animated />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Latchpoint Real Estate: the website and back office for agents and brokerages, built and maintained by Latchpoint Studios in Edmond, Oklahoma.
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
