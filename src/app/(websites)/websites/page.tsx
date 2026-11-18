import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Check, Devices, Globe, MagnifyingGlass, Phone, Wrench } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { WebsitesBrain } from "@/components/websites/websites-brain";
import { WebsitesProcess } from "@/components/websites/websites-process";
import { WebsitesStartForm } from "@/components/websites/websites-start-form";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";

const URL = "https://websites.latchpointstudios.com";

export const metadata: Metadata = {
  title: { absolute: "Latchpoint Websites: websites for small businesses" },
  description:
    "Websites for small businesses and anyone with something to share. Designed around your business, fast on phones, easy to find on Google, and yours to keep. Starts at $500 to set up, then $100 a month, and live in about two weeks.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Latchpoint Websites",
    description: "Websites for small businesses: designed around your business and built to be found. From $500 to set up, then $100 a month.",
    url: URL,
    siteName: "Latchpoint Websites",
    type: "website",
    images: [{ url: `${URL}/websites/og-websites-2.jpg`, width: 2400, height: 1260, alt: "Latchpoint Websites: websites for small businesses" }],
  },
  twitter: { card: "summary_large_image" },
};

/* ------------------------------ helpers ------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-muted">
          <Check weight="bold" className="mt-1 size-4 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

const INCLUDED = [
  {
    icon: Globe,
    title: "Designed around your business",
    body: "Not a template with your logo dropped in. We start from what you sell, who buys it, and what you want a visitor to do.",
  },
  {
    icon: MagnifyingGlass,
    title: "Easy to find",
    body: "Fast pages, clear titles and descriptions, and your address and hours marked up the way search engines read them.",
  },
  {
    icon: Devices,
    title: "Great on every screen",
    body: "Designed on a phone first, then widened for tablets and desktops, and checked on all three before launch.",
  },
  {
    icon: Phone,
    title: "Turns visitors into customers",
    body: "One clear next step on every page: call, book, or ask for a quote. Form messages go straight to your email.",
  },
  {
    icon: Check,
    title: "Yours to keep",
    body: "Your domain is registered in your name and the content is yours. At the end you get the access and a short guide.",
  },
  {
    icon: Wrench,
    title: "Someone to call afterward",
    body: "Need a price changed, a page added, or a hand? Ask the studio that built it. Your monthly plan keeps it updated and secure.",
  },
];

const WORK = [
  { name: "Thrively Inspections", kind: "Home inspector", note: "A booking-first site for a licensed inspector: credentials, a service-area map, and a schedule flow.", image: "/work/thrively.png", href: "https://thrivelyinspections.com", host: "thrivelyinspections.com" },
  { name: "Oklahoma Film Solutions", kind: "Film-industry services", note: "One request form for on-set engineering, remediation, cleaning, trades, and security.", image: "/work/oklahoma-film-solutions.jpg", href: "https://oklahoma.film", host: "oklahoma.film" },
  { name: "Shine Ministries", kind: "Women's ministry", note: "Events, RSVPs, and ways to get involved, with a private back office for the team.", image: "/work/shine-ministries.png", href: "https://www.shineministriesok.com", host: "shineministriesok.com" },
];

const GROW = [
  "Online booking, so customers pick a time instead of calling",
  "Client logins and private pages for each customer",
  "Quotes and invoices you can send and get paid on",
  "A simple customer list that follows up on a schedule you set",
  "A dashboard that shows how the business is doing",
  "Your own AI assistant, working inside your data",
];

/* -------------------------------- page -------------------------------- */

export default function WebsitesPage() {
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
                  <Button href="#start">Get a free quote</Button>
                </Magnetic>
                <a href="#work" className="text-[15px] font-medium text-text underline decoration-border-strong decoration-1 underline-offset-[7px] transition-colors duration-300 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  See our work
                </a>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                From $500 to set up, then $100 a month.{" "}
                <a href="#pricing" className="underline underline-offset-4 hover:text-text-muted">
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

      {/* ---------------------------- What you get ------------------------- */}
      <section id="included" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Everything a customer looks for, and nothing you don&rsquo;t need.
          </h2>
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

      {/* ------------------------------ Our work -------------------------- */}
      <section id="work" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Our work</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              Real sites for real businesses.
            </h2>
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

      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-28 border-t border-border px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            From a short call to live, in four steps.
          </h2>
        </Reveal>

        <WebsitesProcess />
      </section>

      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              $500 to set up, then $100 a month.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              That&rsquo;s where it starts. Bigger or more custom sites cost more, and we quote those after a short
              call. Either way, you see the price in writing before we start.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "From $500",
                unit: "to set up",
                items: [
                  "Design, build, and launch of your site, in about two weeks",
                  "Your domain connected and your contact forms sent to your email",
                  "Help with wording and the photos you have",
                  "Hand-off with the access and a short guide",
                ],
              },
              {
                price: "From $100",
                unit: "a month",
                items: [
                  "Hosting, backups, and security updates handled",
                  "Small edits and page changes whenever you ask",
                  "A real person to email when something needs fixing",
                  "Included with every site, so it never goes stale",
                ],
              },
            ].map((tier, i) => (
              <RevealItem key={tier.price}>
                <div className="orbit-wrap relative h-full">
                  <SpotlightCard className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 transition-colors duration-300 hover:border-border-strong sm:p-8">
                    <p className="text-4xl font-medium tracking-tight text-text">
                      {tier.price} <span className="text-base font-normal text-text-muted">{tier.unit}</span>
                    </p>
                    <Bullets items={tier.items} />
                  </SpotlightCard>
                  <OrbitNode duration={17} delay={-(i * 8.5)} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <p className="text-sm text-text-muted">
              Need more pages, booking, or something custom?{" "}
              <a href="#start" className="text-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent">
                Ask for a free quote
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things people ask first.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 divide-y divide-border border-y border-border">
          {[
            {
              q: "How much does a website cost?",
              a: "Sites start at $500 to set up, then $100 a month for hosting, updates, and small changes. Bigger or more custom sites cost more, and we quote those after a short call. You see the price in writing before anything starts.",
            },
            {
              q: "How long does it take?",
              a: "About two weeks from our first call for a typical small business site. The biggest factor is how quickly we get your photos and the details of what you do. Larger or custom sites take longer, and we tell you up front.",
            },
            {
              q: "Do I own the website?",
              a: "Your domain is registered in your name and your content is yours. The monthly plan covers hosting and keeping the site running and up to date.",
            },
            {
              q: "I already have a website. Can you redo it?",
              a: "Yes. We'll look at what's working, move over what should stay, and redirect your old addresses so the search ranking you've earned comes with you.",
            },
            {
              q: "Will people find it on Google?",
              a: "We build it the way search engines like: fast, mobile-friendly, with clear titles and descriptions and your local details marked up. No one can honestly promise a number-one spot, but we make sure the foundation is right.",
            },
            {
              q: "Can it take bookings, quotes, or payments?",
              a: "Yes. We can add online booking, a quote request form, or payments, and send form messages straight to your email. If you need more than that, see what else the studio builds.",
            },
            {
              q: "Can I update it myself?",
              a: "Tell us on the first call what you expect to change often, and we'll set it up so that's easy. For everything else, just ask us.",
            },
            {
              q: "Do you only work with local businesses?",
              a: "We're in Edmond, Oklahoma, and many of our customers are in the Oklahoma City metro, but we build for anyone, anywhere. A phone or video call works fine.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-text [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted transition-transform duration-300 group-open:rotate-45">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* ------------------------------ Start ----------------------------- */}
      <section id="start" className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>Get started</Eyebrow>
                <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Tell us about your business.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  A few quick questions and we&rsquo;ll reach out by the end of the next business day to set up a short
                  call. You&rsquo;ll get a price in writing, not a sales pitch.
                </p>
                <p className="mt-6 text-sm text-text-muted">
                  Rather email?{" "}
                  <a
                    href="mailto:hello@latchpointstudios.com"
                    className="text-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    hello@latchpointstudios.com
                  </a>
                </p>
              </div>
              <div className="lg:col-span-7">
                <WebsitesStartForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
