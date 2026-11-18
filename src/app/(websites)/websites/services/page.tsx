import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, Bullets, CtaBand } from "@/components/subsite/parts";
import { INCLUDED, GROW } from "@/components/websites/data";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("/services", "What you get: Latchpoint Websites", "Everything a customer looks for in a small business website: designed around your business, easy to find, great on every screen, and yours to keep.");

export default function WebsitesServices() {
  return (
    <>
      {/* ---------------------------- What you get ------------------------- */}
      <section id="included" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Everything a customer looks for, and nothing you don&rsquo;t need.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            A good small-business site does a few jobs very well. Ours are built around six of them.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((c, i) => (
            <RevealItem key={c.title}>
              {/* The same traveling node and cursor glow as the studio site's cards. */}
              <div className="orbit-wrap relative h-full">
                <SpotlightCard className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 transition-colors duration-300 hover:border-border-strong">
                  <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg text-accent">
                    <c.icon weight="bold" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-text">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{c.body}</p>
                </SpotlightCard>
                <OrbitNode duration={14} delay={-(i * 2.4)} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      {/* ----------------------------- Anything --------------------------- */}
      <section id="anything" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Anything you need</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              It starts as a website. It can grow into the rest.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Not every business needs more than a clean, fast site, and that&rsquo;s a fine place to stop. When you do
              want more, the same studio builds it, so you never start over with someone new.
            </p>
            <Bullets items={GROW} />
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
            <BrowserFrame
              src="/work/solo-books.jpg"
              alt="Solo Books, a web app Latchpoint Studios built, with books, budgets, bank matching, and payroll"
              url="solobooks.latchpointstudios.com"
              ratio="aspect-[16/10]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <p className="mt-3 text-center text-xs text-text-faint">Solo Books, a web app we built.</p>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
