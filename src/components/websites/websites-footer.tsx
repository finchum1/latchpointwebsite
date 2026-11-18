import { Logomark } from "../logomark";
import { WebsitesWordmark } from "./websites-wordmark";

// Same shape as the real estate footer (components/realestate/re-footer.tsx), with this page's links.
const service = [
  { href: "/services", label: "What you get" },
  { href: "/work", label: "Our work" },
  { href: "/process", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Get a free quote" },
];

const company = [
  { href: "https://latchpointstudios.com", label: "Latchpoint Studios" },
  { href: "https://realestate.latchpointstudios.com", label: "Latchpoint Real Estate" },
  { href: "https://close.latchpointstudios.com", label: "Latchpoint Close" },
  { href: "mailto:hello@latchpointstudios.com", label: "Email us" },
  { href: "https://app.latchpointstudios.com/privacy", label: "Privacy" },
  { href: "https://app.latchpointstudios.com/terms", label: "Terms" },
];

const heading = "font-mono text-[11px] uppercase tracking-[0.14em] text-[#6c6e76]";
const link = "text-sm text-[#a4a5ac] transition-colors hover:text-[#f5f5f4]";

/** Always dark, on both themes. */
export function WebsitesFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08090b]">
      <div className="mx-auto max-w-7xl px-6 pb-0 pt-14 lg:px-8">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            {/* A full page load: "/" here is the subdomain root, a host-based rewrite. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" aria-label="Latchpoint Websites, home" className="inline-flex items-center gap-2.5">
              <Logomark className="size-6 text-[#f5f5f4]" animated />
              <span className="font-medium tracking-tight text-[#f5f5f4]">
                Latchpoint<span className="text-[#a4a5ac]"> Websites</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#a4a5ac]">
              Websites for small businesses and anyone with something to share, from Latchpoint Studios in Edmond, Oklahoma.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <h3 className={heading}>The service</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {service.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={heading}>Latchpoint</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {company.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs text-[#6c6e76]">&copy; {new Date().getFullYear()} Latchpoint Studios. Edmond, Oklahoma.</p>
        </div>
      </div>
      <WebsitesWordmark />
    </footer>
  );
}
