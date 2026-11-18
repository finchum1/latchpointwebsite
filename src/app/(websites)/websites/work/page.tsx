import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { WORK } from "@/components/websites/data";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("/work", "Our work: Latchpoint Websites", "Real websites for real businesses, live today: a home inspector, a film-services company, and a ministry.");

export default function WebsitesWork() {
  return (
    <>
      {/* ------------------------------ Our work -------------------------- */}
      <section id="work" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Our work</Eyebrow>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              Real sites for real businesses.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Each one is live today. Click through and try them on your phone.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {WORK.map((w) => (
              <RevealItem key={w.name}>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <BrowserFrame
                    src={w.image}
                    alt={`${w.name}'s website`}
                    url={w.host}
                    ratio="aspect-[16/10]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  />
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium tracking-tight text-text">{w.name}</h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{w.kind}</p>
                    </div>
                    <ArrowUpRight weight="bold" className="mt-1 size-4 shrink-0 text-text-faint transition-colors group-hover:text-accent" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{w.note}</p>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <Link href="https://latchpointstudios.com/work" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
              See everything Latchpoint Studios has built
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
