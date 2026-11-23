import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { INCLUDED, WORK } from "@/components/websites/data";
import { WebsitesBrain } from "@/components/websites/websites-brain";
import { WebsitesReviews } from "@/components/websites/websites-reviews";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("", "Latchpoint Websites: websites for small businesses", "Websites for small businesses and anyone with something to share. Designed around your business, fast on phones, easy to find on Google. Starts at $500 to set up, then $100 a month, and live in about two weeks.");

export default function WebsitesHome() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative -mt-[104px] overflow-hidden pt-[104px] sm:-mt-[112px] sm:pt-[112px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-6 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Websites for small business · Oklahoma</Eyebrow>
              <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.2rem]">
                A website that works as hard as you do.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                We design and build websites for small businesses, and really anyone with something to share. Fast on
                phones, easy to find on Google, and built to turn visitors into customers. Live in about two weeks.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="/contact" plain>Get a free quote</Button>
                </Magnetic>
                <a href="/work" className="text-[15px] font-medium text-text underline decoration-border-strong decoration-1 underline-offset-[7px] transition-colors duration-300 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  See our work
                </a>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                From $500 to set up, then $100 a month.{" "}
                <a href="/pricing" className="underline underline-offset-4 hover:text-text-muted">
                  How pricing works
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex min-w-0 justify-center lg:col-span-6 lg:justify-end">
            <WebsitesBrain />
          </Reveal>
        </div>
      </section>
      {/* --------------------------- Quick facts -------------------------- */}
      <section className="border-y border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Reveal>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
              {[
                { k: "Who", v: "Small businesses and anyone" },
                { k: "How long", v: "About two weeks" },
                { k: "Price", v: "From $500, then $100/mo" },
                { k: "Ownership", v: "Your domain and content" },
              ].map((f) => (
                <li key={f.k}>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{f.k}</span>
                  <span className="mt-1 block text-sm font-medium text-text">{f.v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      {/* ------------------------- What you get (teaser) ------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Everything a customer looks for, and nothing you don&rsquo;t need.
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {INCLUDED.map((c) => (
            <RevealItem key={c.title}>
              <div className="flex h-full items-center gap-3 rounded-[16px] border border-border bg-bg-elevated px-4 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg text-accent">
                  <c.icon weight="bold" className="size-[18px]" />
                </span>
                <span className="text-sm font-medium text-text">{c.title}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <a href="/services" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
            See everything you get
          </a>
        </Reveal>
      </section>

      {/* ------------------------------ Our work (teaser) ------------------------------ */}
      <section className="border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Our work</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              Real sites for real businesses.
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {WORK.map((w) => (
              <RevealItem key={w.name}>
                <a href="/work" className="group block">
                  <BrowserFrame src={w.image} alt={`${w.name}'s website`} url={w.host} ratio="aspect-[16/10]" sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-text">{w.name}</h3>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{w.kind}</p>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <a href="/work" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
              See all our work
            </a>
          </Reveal>
        </div>
      </section>

      {/* ------------------------- How it works (teaser) ------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            From a short call to live, in about two weeks.
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "A short call", b: "What you sell, who buys it, and what a visitor should do." },
            { n: "02", t: "A real design", b: "Your actual homepage to react to, not a wireframe." },
            { n: "03", t: "Built in the open", b: "A preview link you can open any time while we build." },
            { n: "04", t: "Launch", b: "Live on your domain, with the access and a short guide." },
          ].map((s) => (
            <RevealItem key={s.n}>
              <div className="h-full rounded-[16px] border border-border bg-bg-elevated p-5">
                <p className="font-mono text-sm text-accent">{s.n}</p>
                <h3 className="mt-3 text-base font-medium text-text">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.b}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <a href="/process" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
            See the process in detail
          </a>
        </Reveal>
      </section>

      {/* ------------------------------ Pricing (teaser) ------------------------------ */}
      <section className="border-y border-border bg-bg-elevated/30">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">$500 to set up, then $100 a month.</h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">
              Hosting, backups, updates, and small edits are included. Bigger or custom sites are quoted after a short call.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic>
              <Button href="/pricing" plain variant="secondary">
                See what&rsquo;s included
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <WebsitesReviews />
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
