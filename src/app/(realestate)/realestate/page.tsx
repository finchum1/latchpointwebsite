import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PhoneFrame } from "@/components/realestate/frames";
import { HeroVideo } from "@/components/realestate/hero-video";
import { FeatureScroller } from "@/components/realestate/feature-scroller";
import { RealEstateBrain } from "@/components/realestate/re-brain";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { SAMPLE } from "@/components/realestate/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("", "Latchpoint Real Estate: your website and back office, built and maintained", "A real estate website with a dashboard behind it: templates, blog, contacts, leads, pipeline, deals, a schedule that syncs with Google Calendar, and your own AI assistant working inside it. We build it, move you over, and keep it running. $500 to set up, then $150 a month, no contracts.");

export default function RealEstateHome() {
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
              <Eyebrow>For agents, teams, and brokerages</Eyebrow>
              <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.2rem]">
                Your website and your back office, built and maintained for you.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                Latchpoint Real Estate is a real estate website with a dashboard behind it: your contacts, leads,
                pipeline, deals, and schedule in one place. We build it, move you over, and keep it running.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="/early-access" plain>Request early access</Button>
                </Magnetic>
                <a href="/your-day" className="text-[15px] font-medium text-text underline decoration-border-strong decoration-1 underline-offset-[7px] transition-colors duration-300 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  See how it works
                </a>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                $500 to set up, then $150 a month. No contracts.{" "}
                <a href="/pricing" className="underline underline-offset-4 hover:text-text-muted">
                  What&rsquo;s included
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex min-w-0 justify-center lg:col-span-6 lg:justify-end">
            <RealEstateBrain />
          </Reveal>
        </div>
      </section>
      {/* ------------------------- In production ------------------------- */}
      <section className="border-y border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <Eyebrow>Running in production today</Eyebrow>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                {[
                  { name: "Terrence Finchum", note: "Agent website", href: "https://terrencefinchum.com" },
                  { name: "Latchpoint Real Estate", note: "The dashboard, in daily use", href: "https://app.latchpointstudios.com" },
                ].map((p) => (
                  <li key={p.name}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2">
                      <span>
                        <span className="block text-sm font-medium text-text">{p.name}</span>
                        <span className="block text-xs text-text-faint">{p.note}</span>
                      </span>
                      <ArrowUpRight
                        weight="bold"
                        className="mt-0.5 size-3.5 text-text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ------------------------- See it working ------------------------- */}
      <section id="see-it" className="mx-auto max-w-7xl scroll-mt-28 px-6 pt-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>See it working</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              The dashboard, in a minute.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              A short recording of the real thing: the day&rsquo;s schedule, a lead dragged to the next column on the
              leads board, the deals board, and the website editor.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative min-w-0 pb-10 lg:col-span-7">
            <HeroVideo
              src="/realestate/hero.mp4"
              poster="/realestate/hero-poster.jpg"
              label="A short recording of the Latchpoint Real Estate dashboard: the day's schedule, a lead dragged to the next column on the leads board, the deals board, and the website editor"
            />
            <PhoneFrame
              src="/realestate/m-home.jpg"
              alt="The dashboard home page on a phone: today's schedule and tasks"
              className="absolute -bottom-6 right-0 w-[104px] sm:right-2 sm:w-[132px] lg:-right-5 lg:w-[150px]"
              sizes="150px"
            />
            <p className="mt-3 max-w-[60%] text-xs text-text-faint">{SAMPLE}</p>
          </Reveal>
        </div>
      </section>
      {/* ------------------------- What comes with it ------------------------- */}
      <section id="included" className="scroll-mt-28 overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Eyebrow>What comes with it</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              A website and a back office, one login.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Most agents run a website in one place, leads in a second, and deals in a spreadsheet. Here it&rsquo;s one
              dashboard, and what you do in it shows up on your site. Drag through what&rsquo;s inside.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <FeatureScroller />
          </Reveal>
        </div>
      </section>
      {/* ------------------------------ Who ------------------------------ */}
      <section id="who" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>Who it&rsquo;s for</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Built for one agent, or a whole office.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              title: "Solo agents",
              body: "Your own site and blog, plus a lead and pipeline board you'll actually open. Everything an independent agent needs, with nothing you don't.",
            },
            {
              title: "Teams",
              body: "Give each person the access that fits: full website editing, blog only, or none, and switch the contacts, leads, pipeline, and deals tools on per agent. Add a transaction coordinator or a compliance reviewer where you need one.",
            },
            {
              title: "Brokerages",
              body: "A brokerage site with an agent roster, areas, and a blog, and a dashboard for every listing and every agent, plus office analytics for the broker. Each office gets its own logo, colors, and domain.",
            },
          ].map((c, i) => (
            <RevealItem key={c.title}>
              <div className="orbit-wrap relative h-full">
                <SpotlightCard className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 transition-colors duration-300 hover:border-border-strong">
                  <h3 className="text-lg font-medium tracking-tight text-text">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{c.body}</p>
                </SpotlightCard>
                <OrbitNode duration={12} delay={-(i * 4.3)} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      {/* ------------------------------ Pricing (teaser) ------------------------------ */}
      <section className="border-y border-border bg-bg-elevated/30">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">$500 to set up, then $150 a month.</h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">No contracts. We build it, move you over, and keep it running.</p>
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

      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
