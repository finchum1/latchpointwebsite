import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Company = {
  id: "studios" | "realestate" | "close" | "websites";
  name: string;
  line: string;
  href: string;
  /** Each company's own color, dark theme / light theme (see the company colors block in globals.css). */
  dark: string;
  light: string;
};

const companies: Company[] = [
  {
    id: "studios",
    name: "Latchpoint Studios",
    line: "Custom websites, apps and dashboards, built by a small studio in Edmond.",
    href: "https://latchpointstudios.com",
    dark: "#e8623f",
    light: "#e8623f",
  },
  {
    id: "realestate",
    name: "Latchpoint Real Estate",
    line: "The all-in-one platform for agents: sites, leads, deals and back office.",
    href: "https://realestate.latchpointstudios.com",
    dark: "#5b8def",
    light: "#3b72dc",
  },
  {
    id: "close",
    name: "Latchpoint Close",
    line: "Transaction coordination for Oklahoma agents, contract to closing.",
    href: "https://close.latchpointstudios.com",
    dark: "#3fb58a",
    light: "#23805d",
  },
  {
    id: "websites",
    name: "Latchpoint Websites",
    line: "Fast, good-looking websites for small businesses, with a free quote.",
    href: "https://websites.latchpointstudios.com",
    dark: "#9b84f5",
    light: "#6a4fd6",
  },
];

/**
 * "The Latchpoint family": the other companies, each in its own color, just above the footer of every Latchpoint site.
 * Pass the company this page belongs to and it is left out. Full page loads on purpose: these are different hosts.
 */
export function LatchpointFamily({ current }: { current: Company["id"] }) {
  const others = companies.filter((c) => c.id !== current);
  return (
    <section aria-labelledby="latchpoint-family" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <p id="latchpoint-family" className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
          More from Latchpoint
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {others.map((c) => (
            <li key={c.id}>
              <a
                href={c.href}
                style={{ "--fam": c.dark, "--fam-light": c.light } as React.CSSProperties}
                className="family-card group flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-6 transition-colors hover:border-border-strong"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <span className="family-dot size-2.5 rounded-full" aria-hidden="true" />
                    <span className="text-[15px] font-medium tracking-tight text-text">{c.name}</span>
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className="size-4 text-text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
                  />
                </span>
                <span className="mt-3 text-sm leading-relaxed text-text-muted">{c.line}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
