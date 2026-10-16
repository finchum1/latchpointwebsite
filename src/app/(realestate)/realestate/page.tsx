import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Browser, CalendarBlank, Check, Kanban } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import { EarlyAccessForm } from "@/components/realestate/early-access-form";

export const metadata: Metadata = {
  title: { absolute: "Latchpoint Real Estate: your website and back office, built and maintained" },
  description:
    "A real estate website with a dashboard behind it: blog, leads, pipeline, transactions, and a schedule that syncs with Google Calendar. We build it, move you over, and keep it running. $500 setup, then $200 a month.",
  alternates: { canonical: "https://realestate.latchpointstudios.com" },
  openGraph: {
    title: "Latchpoint Real Estate",
    description:
      "The website and back office for real estate agents and brokerages: blog, leads, pipeline, transactions, and your schedule in one dashboard.",
    url: "https://realestate.latchpointstudios.com",
    siteName: "Latchpoint Real Estate",
    type: "website",
    images: [{ url: "https://realestate.latchpointstudios.com/realestate/og.png", width: 2400, height: 1260, alt: "Latchpoint Real Estate" }],
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

/** Copy on one side, a visual on the other; flips on large screens. */
function Feature({
  eyebrow,
  title,
  body,
  bullets,
  visual,
  caption,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  caption?: string;
  flip?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-text sm:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-text-muted">{body}</p>
        <Bullets items={bullets} />
      </Reveal>
      <Reveal delay={0.1} className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        {visual}
        {caption && <p className="mt-3 text-center text-xs text-text-faint">{caption}</p>}
      </Reveal>
    </div>
  );
}

function GroupHeader({ id, icon, title, body }: { id: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-accent">
            {icon}
          </span>
          <Eyebrow>{title}</Eyebrow>
        </div>
        <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
          {body}
        </h2>
      </Reveal>
    </div>
  );
}

const SAMPLE = "Sample data. Every name, number, and address on this screen is invented.";

/* -------------------------------- page -------------------------------- */

export default function RealEstatePage() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>For agents, teams, and brokerages</Eyebrow>
              <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.2rem]">
                Your website and your back office, built and maintained for you.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                Latchpoint Real Estate is a real estate website with a dashboard behind it: your blog, leads, pipeline,
                transactions, and schedule in one place. We build it, move you over, and keep it running.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="#early-access">Request early access</Button>
                </Magnetic>
                <Button href="#home" variant="secondary" showArrow={false}>
                  See how it works
                </Button>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                $500 to set up, then $200 a month. <a href="#pricing" className="underline underline-offset-4 hover:text-text-muted">What&rsquo;s included</a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative min-w-0 pb-10 lg:col-span-7">
            <BrowserFrame
              src="/realestate/dash-home.png"
              alt="The Latchpoint Real Estate dashboard home page: schedule, shortcuts, new inquiries, and tasks"
              url="yourbrokerage.com/dashboard"
              ratio="aspect-[16/10]"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <PhoneFrame
              src="/realestate/dash-home-mobile.png"
              alt="The dashboard home page on a phone: today's schedule, shortcuts, and tasks"
              className="absolute -bottom-6 right-0 w-[104px] sm:right-2 sm:w-[132px] lg:-right-5 lg:w-[150px]"
              sizes="150px"
            />
            <p className="mt-3 max-w-[60%] text-xs text-text-faint">{SAMPLE}</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------- In production ------------------------- */}
      <section className="border-y border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <Eyebrow>Running in production today</Eyebrow>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
                {[
                  { name: "Terrence Finchum", note: "Agent website", href: "https://terrencefinchum.com" },
                  { name: "The Agency Oklahoma", note: "Brokerage website", href: "https://the-agency-oklahoma.vercel.app" },
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

      {/* -------------------------- Two halves --------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>The system</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Two halves, one login.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            Most agents run a website in one place, leads in a second, and transactions in a spreadsheet. Here it&rsquo;s
            one dashboard, and what you do in it shows up on your site.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              icon: <Browser weight="regular" className="size-5" />,
              title: "The website",
              items: [
                "Agent and brokerage sites on your own domain",
                "A property site for every listing, from a form",
                "A blog with a post calendar, a publish checklist, and a formatting menu right on your text",
                "Areas, bios, and testimonials you edit yourself",
              ],
            },
            {
              icon: <Kanban weight="regular" className="size-5" />,
              title: "The back office",
              items: [
                "A home page for your day: schedule, new inquiries, tasks, and your goal",
                "Leads and a pipeline, tagged buyer, seller, or both",
                "Transactions with key dates, checklists, and progress rings",
                "Open houses, flyers, and upcoming listings",
              ],
            },
          ].map((card) => (
            <RevealItem key={card.title}>
              <div className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  {card.icon}
                </span>
                <h3 className="mt-5 text-xl font-medium tracking-tight text-text">{card.title}</h3>
                <Bullets items={card.items} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------ Your day -------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <GroupHeader
          id="home"
          icon={<CalendarBlank weight="regular" className="size-5" />}
          title="Your day"
          body="Open one page and know what today looks like."
        />

        <div className="mt-16">
          <Feature
            eyebrow="Home"
            title="Your schedule, in sync with Google Calendar."
            body="Connect your Google account and your calendars show up on the dashboard, in day, week, and month views. Add or change an appointment here and it changes in Google Calendar, and the other way around."
            bullets={[
              "Pick which calendars to show; calendars you can only view stay view-only",
              "Your deal dates and tasks appear on the same schedule",
              "New website inquiries are waiting right below, with call, text, and email buttons",
              "Repeating tasks and a scorecard that tracks your year against your goal",
            ]}
            visual={
              <div className="relative pb-6 pr-0 sm:pr-24">
                <figure className="overflow-hidden rounded-[16px] border border-border-strong bg-[#faf9f7] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/realestate/dash-calendar-sync.png"
                    alt="The schedule with a connected Google account and the calendars shown on the dashboard"
                    width={1500}
                    height={1600}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                </figure>
                <figure className="absolute -bottom-2 right-0 hidden w-[200px] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:block lg:w-[230px]">
                  <Image
                    src="/realestate/dash-event.png"
                    alt="Adding an appointment to Google Calendar from the dashboard"
                    width={896}
                    height={1352}
                    className="h-auto w-full"
                    sizes="230px"
                  />
                </figure>
              </div>
            }
            caption={SAMPLE}
          />
        </div>
      </section>

      {/* ----------------------------- Website ----------------------------- */}
      <section className="border-t border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <GroupHeader
            id="website"
            icon={<Browser weight="regular" className="size-5" />}
            title="The website"
            body="A site that looks like you, and keeps itself current."
          />

          <div className="mt-16 flex flex-col gap-24">
            <Feature
              eyebrow="Listings"
              title="A property site for every listing."
              body="Fill out a form and the listing has its own site: hero photo, gallery, features, map, and a tour request. No new repo, no redeploy, no waiting on a developer."
              bullets={[
                "Change a listing's status and the live site updates the moment you do",
                "Open houses appear as a banner on the listing",
                "Printable flyers generated from the same listing",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/listing-hero.jpg"
                  alt="A listing's property website with hero photo, price, and key stats"
                  url="youragency.com/listings/1645-saratoga-way"
                />
              }
            />

            <Feature
              flip
              eyebrow="Agent sites"
              title="Your own site, on your own domain."
              body="A bio, your areas of expertise, testimonials, your listings, and a blog, in a look you pick and an accent color that matches your brand. It's built phone-first, because that's where your clients are."
              bullets={[
                "Six looks to start from, then your colors, photos, and square or rounded buttons",
                "Your own domain, with old URLs redirected so you keep your search rankings",
                "Inquiry forms that filter spam, confirm to the visitor, and land straight in your leads",
              ]}
              visual={
                <div className="relative pb-6 pr-0 sm:pr-16">
                  <BrowserFrame
                    src="/realestate/agent-site-blog.jpg"
                    alt="An agent's blog index with neighborhood guides and local features"
                    url="terrencefinchum.com/blog"
                  />
                  <PhoneFrame
                    src="/realestate/listing-mobile.jpg"
                    alt="A listing website on a phone"
                    className="absolute -bottom-2 right-0 hidden w-[124px] sm:block"
                    sizes="124px"
                  />
                </div>
              }
            />

            <Feature
              eyebrow="Blog"
              title="A blog you'll actually keep up."
              body="Neighborhood guides, local features, and market notes are how an agent gets found. The editor, the calendar, and the checklist are built to make a weekly post the easy thing to do."
              bullets={[
                "Select text and the formatting menu appears right above it",
                "Schedule posts ahead, with a calendar that shows the gaps",
                "A publish checklist: title, category, excerpt, cover photo, and a real length",
                "Post views, all-time and last 30 days, with your top post",
                "Moving over from another site? Your old posts can be imported",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-blog-editor.png"
                  alt="The blog editor with the formatting menu floating above selected text"
                  url="yourbrokerage.com/dashboard/site/blog"
                  ratio="aspect-[2190/1035]"
                />
              }
              caption={SAMPLE}
            />
          </div>
        </div>
      </section>

      {/* --------------------------- Back office --------------------------- */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <GroupHeader
            id="back-office"
            icon={<Kanban weight="regular" className="size-5" />}
            title="The back office"
            body="Leads, pipeline, and transactions, laid out the way agents think."
          />

          <div className="mt-16 flex flex-col gap-24">
            <Feature
              eyebrow="Overview"
              title="Your whole book at a glance."
              body="Leads, pipeline, and deals by stage, the key dates coming up in the next two weeks, and the follow-ups due today, on one page."
              bullets={[
                "Open deals, expected commission, and closed volume for the year",
                "Inspections, appraisals, and closings in date order",
                "Open anyone from a follow-up and call, text, or email in one tap",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-overview.png"
                  alt="The People overview with counts by stage, key dates, and follow-ups"
                  url="yourbrokerage.com/dashboard/people/overview"
                  ratio="aspect-[1500/860]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Leads"
              title="Every lead has a next step."
              body="Website inquiries, open house sign-ins, and referrals land on a board. Each card carries a follow-up date, and anything overdue turns red, so the person you meant to call doesn't slip."
              bullets={[
                "Tag each person as a buyer, a seller, or both",
                "Call, text, or email from inside the card",
                "A second inquiry from the same person joins their existing card",
                "Columns you can rename, reorder, and add",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-leads.png"
                  alt="The Leads board with buyer and seller tags and follow-up dates"
                  url="yourbrokerage.com/dashboard/people/leads"
                  ratio="aspect-[1500/640]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Pipeline"
              title="A pipeline that looks past this month."
              body="Your sphere, your someday-buyers, and the sellers who'll list in spring, all in one place and sorted by how soon they're likely to move. The same board, the same follow-up dates, a longer horizon."
              bullets={[
                "Stages from 12+ months out to active, or whatever fits how you work",
                "Everyone you're nurturing, visible at a glance",
                "Move a card as the timeline changes",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-pipeline.png"
                  alt="The Pipeline board, from 12 months out to active"
                  url="yourbrokerage.com/dashboard/people/pipeline"
                  ratio="aspect-[1500/640]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Transactions"
              title="Under contract, nothing forgotten."
              body="Each deal gets its key dates, the numbers, the title and lender, and buyer or seller checklists for tasks and documents, with deadlines counted from the contract date. Progress rings show how far along every deal is."
              bullets={[
                "Contract, inspection, appraisal, financing, and closing dates",
                "A task checklist and a document list, with seller and buyer versions you can edit",
                "Open deals, expected commission, and closed volume on your Overview",
              ]}
              visual={
                <div className="relative pb-24 sm:pb-28">
                  <BrowserFrame
                    src="/realestate/dash-transactions.png"
                    alt="The Transactions board with task and document progress rings on every deal"
                    url="yourbrokerage.com/dashboard/people/transactions"
                    ratio="aspect-[1500/640]"
                  />
                  <figure className="absolute -bottom-2 right-3 w-[62%] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:w-[54%]">
                    <Image
                      src="/realestate/dash-checklists.png"
                      alt="A deal's task and document checklists with progress rings"
                      width={1976}
                      height={790}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 32vw, 60vw"
                    />
                  </figure>
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Listings"
              title="One place to manage every listing."
              body="Status, price, photos, and open houses live in a single dashboard. Change a status from the list and the listing's site reflects it right away."
              bullets={[
                "Add photos, pick the hero shot, and schedule open houses",
                "Upcoming listings tracked before they hit the market",
                "A brokerage-wide view when you manage more than one agent",
              ]}
              visual={
                <figure className="overflow-hidden rounded-[14px] border border-border-strong shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
                  <Image
                    src="/realestate/editor.png"
                    alt="The listing editor with photos and open house scheduling"
                    width={560}
                    height={508}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </figure>
              }
            />
          </div>
        </div>
      </section>

      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              A setup fee, then one monthly price.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              This is what our first customers pay. Larger offices and custom requests are quoted to fit.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "$500",
                unit: "to set up",
                items: [
                  "Your website built and live on your own domain",
                  "Your blog posts and old URLs moved over, so you keep your search rankings",
                  "Your dashboard set up with your logo and colors",
                ],
              },
              {
                price: "$200",
                unit: "a month",
                items: [
                  "Hosting, upkeep, and updates for your site and dashboard",
                  "New features as they ship",
                  "A studio to call when you want something changed",
                ],
              },
            ].map((tier) => (
              <RevealItem key={tier.price}>
                <div className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 sm:p-8">
                  <p className="text-4xl font-medium tracking-tight text-text">
                    {tier.price} <span className="text-base font-normal text-text-muted">{tier.unit}</span>
                  </p>
                  <Bullets items={tier.items} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
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
              body: "Give each person the access that fits: full website editing, blog only, or none, and switch the leads and pipeline tools on per agent.",
            },
            {
              title: "Brokerages",
              body: "A brokerage site with an agent roster, areas, and a blog, and a dashboard for every listing and every agent. Each office gets its own logo, colors, and domain.",
            },
          ].map((c) => (
            <RevealItem key={c.title}>
              <div className="h-full rounded-[20px] border border-border bg-bg-elevated p-7">
                <h3 className="text-lg font-medium tracking-tight text-text">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{c.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              We build it around how you already work.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "We talk through your day",
                body: "Where leads come from, what stages your pipeline has, what happens between contract and closing. The back office gets shaped to that, not the other way around.",
              },
              {
                n: "02",
                title: "We build and move you over",
                body: "Your site, your dashboard, and your old blog posts. Old URLs are redirected to the new ones so the search ranking you've earned comes with you.",
              },
              {
                n: "03",
                title: "You run it, we keep it healthy",
                body: "Edits are forms, not code. And when you want something added later, you have a studio to call instead of a ticket queue.",
              },
            ].map((s) => (
              <RevealItem key={s.n}>
                <p className="font-mono text-sm text-accent">{s.n}</p>
                <h3 className="mt-3 text-lg font-medium tracking-tight text-text">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things agents ask first.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 divide-y divide-border border-y border-border">
          {[
            {
              q: "What does it cost?",
              a: "$500 to set up, then $200 a month. That's what our first customers pay. Larger offices and custom requests are quoted to fit.",
            },
            {
              q: "When can I get in?",
              a: "We're inviting people in a few at a time, by hand. Request early access and we'll email you to set up a short call when there's a spot.",
            },
            {
              q: "Do I need to be technical?",
              a: "No. Editing a listing, writing a post, or updating a lead is a form. If you can use your email, you can run this.",
            },
            {
              q: "I already have a website and a blog. Can you move them?",
              a: "Yes. Posts can be imported from your current site, and old URLs are redirected to the new ones with permanent redirects, so links and search rankings carry over.",
            },
            {
              q: "Does it work with Google Calendar?",
              a: "Yes. Connect your Google account, choose the calendars to show, and your schedule appears on the dashboard. Add or edit an appointment there and it updates in Google Calendar, and changes in Google show up in the dashboard. You can disconnect at any time.",
            },
            {
              q: "Does it work on my phone?",
              a: "Yes. Your site is built phone-first, and the dashboard installs to your home screen like an app, so checking a lead between showings takes a tap.",
            },
            {
              q: "Can people on my team see different things?",
              a: "Yes. Each person can have full website access, blog-only access, or none, and the leads, pipeline, and transactions tools are switched on per agent.",
            },
            {
              q: "Will it look like my brokerage?",
              a: "It will look like you. Each office gets its own logo, colors, photography, and domain, and your agents' sites follow your brand.",
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

      {/* ------------------------- Early access --------------------------- */}
      <section id="early-access" className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>Early access</Eyebrow>
                <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Get on the list.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  We&rsquo;re bringing agents and offices in a few at a time. Tell us who you are and we&rsquo;ll reach out
                  to set up a short call. It&rsquo;s $500 to set up and $200 a month, and asking costs nothing.
                </p>
                <p className="mt-6 text-sm text-text-muted">
                  Want something fully custom instead?{" "}
                  <a
                    href="mailto:hello@latchpointstudios.com"
                    className="text-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    hello@latchpointstudios.com
                  </a>
                </p>
              </div>
              <div className="lg:col-span-7">
                <EarlyAccessForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
