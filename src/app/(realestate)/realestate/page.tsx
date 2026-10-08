import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Browser, Check, Kanban } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import {
  BlogMock,
  BoardMock,
  DashboardWindow,
  LEAD_COLUMNS,
  ListingsMock,
  OverviewMock,
  PIPELINE_COLUMNS,
  TransactionMock,
} from "@/components/realestate/dashboard-mocks";
import { InquiryForm } from "@/components/realestate/inquiry-form";

export const metadata: Metadata = {
  title: "Websites and back offices for real estate",
  description:
    "Latchpoint Studios builds real estate websites and the back office behind them: your blog, leads, pipeline, and transactions in one system you own.",
  alternates: { canonical: "https://realestate.latchpointstudios.com" },
  openGraph: {
    title: "Websites and back offices for real estate | Latchpoint Studios",
    description:
      "Agent and brokerage websites, plus the back office to run them: blog, leads, pipeline, and transactions.",
    url: "https://realestate.latchpointstudios.com",
    siteName: "Latchpoint Studios",
    type: "website",
  },
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
                Your website and your back office, built as one system.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                Latchpoint Studios builds real estate websites, then the back office behind them: your blog, leads,
                pipeline, and transactions in one place you own. It&rsquo;s the same system that runs
                terrencefinchum.com.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="#start">Start a project</Button>
                </Magnetic>
                <Button href="#website" variant="secondary" showArrow={false}>
                  See how it works
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative min-w-0 pb-10 lg:col-span-7">
            <DashboardWindow active="Overview" group="People" url="yourbrokerage.com/dashboard/people/overview">
              <OverviewMock />
            </DashboardWindow>
            <PhoneFrame
              src="/realestate/agent-site-mobile.jpg"
              alt="A real estate agent's website on a phone"
              className="absolute -bottom-6 right-0 w-[88px] sm:right-2 sm:w-[108px] lg:-right-5 lg:w-[112px]"
              sizes="112px"
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
                  { name: "The Agency Dashboard", note: "The back office", href: "https://theagency.latchpointstudios.com" },
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
                "A blog with a post calendar and publish checklist",
                "Areas, bios, and testimonials you edit yourself",
              ],
            },
            {
              icon: <Kanban weight="regular" className="size-5" />,
              title: "The back office",
              items: [
                "Leads with follow-up dates, so nobody goes cold",
                "A pipeline from someday-buyers to active clients",
                "Transactions with key dates and a closing checklist",
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

      {/* ----------------------------- Website ----------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
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
              "Six looks to start from, then your colors and photos",
              "Your own domain, with old URLs redirected so you keep your search rankings",
              "Site views and leads tracked right in the dashboard",
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
              "A calendar of what's scheduled, so gaps are obvious",
              "A publish checklist: title, category, excerpt, cover photo, and a real length",
              "Post views, all-time and last 30 days, with your top post",
              "Moving over from another site? Your old posts can be imported",
            ]}
            visual={
              <DashboardWindow active="Blog Posts" group="Website" url="yourbrokerage.com/dashboard/site/blog">
                <BlogMock />
              </DashboardWindow>
            }
            caption={SAMPLE}
          />
        </div>
      </section>

      {/* --------------------------- Back office --------------------------- */}
      <section className="border-t border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <GroupHeader
            id="back-office"
            icon={<Kanban weight="regular" className="size-5" />}
            title="The back office"
            body="Leads, pipeline, and transactions, laid out the way agents think."
          />

          <div className="mt-16 flex flex-col gap-24">
            <Feature
              eyebrow="Leads"
              title="Every lead has a next step."
              body="Website inquiries, open house sign-ins, and referrals land on a board. Each card carries a follow-up date, and anything overdue turns red, so the person you meant to call doesn't slip."
              bullets={[
                "Call, text, or email from the card",
                "Follow-up dates with overdue and due-today called out",
                "Columns you can rename, reorder, and add",
              ]}
              visual={
                <DashboardWindow active="Leads" group="People" url="yourbrokerage.com/dashboard/people/leads">
                  <BoardMock title="Leads" sub="14 leads" columns={LEAD_COLUMNS} />
                </DashboardWindow>
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Pipeline"
              title="A pipeline that looks past this month."
              body="Your sphere, your someday-buyers, and the sellers who'll list in spring, all in one place and sorted by how soon they're likely to move. The same board, the same follow-up dates, a longer horizon."
              bullets={[
                "Stages from 12+ months out to active, or whatever fits how you work",
                "Everyone you're nurturing, visible at a glance",
                "Move a card as the timeline changes",
              ]}
              visual={
                <DashboardWindow active="Pipeline" group="People" url="yourbrokerage.com/dashboard/people/pipeline">
                  <BoardMock title="Pipeline" sub="22 people" columns={PIPELINE_COLUMNS} />
                </DashboardWindow>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Transactions"
              title="Under contract, nothing forgotten."
              body="Each deal gets its key dates, the numbers, the title and lender, and a closing checklist with deadlines counted from the contract date. You see what's due before it's late."
              bullets={[
                "Contract, inspection, appraisal, financing, and closing dates",
                "A task checklist grouped by deadline, built from a template you control",
                "Open deals, expected commission, and closed volume on your Overview",
              ]}
              visual={
                <DashboardWindow active="Transactions" group="People" url="yourbrokerage.com/dashboard/people/transactions">
                  <TransactionMock />
                </DashboardWindow>
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Listings"
              title="One place to manage every listing."
              body="Status, price, photos, and open houses live in a single dashboard. Change a status from the list and the listing's site reflects it right away."
              bullets={[
                "Add photos, pick the hero shot, and schedule open houses",
                "Upcoming listings tracked before they hit the market",
                "A brokerage-wide view when you manage more than one agent",
              ]}
              visual={
                <div className="relative pb-20 sm:pb-24">
                  <DashboardWindow active="Listings" url="yourbrokerage.com/dashboard/listings">
                    <ListingsMock />
                  </DashboardWindow>
                  <figure className="absolute -bottom-2 right-3 w-[46%] overflow-hidden rounded-[14px] border border-border-strong shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:w-[36%]">
                    <Image
                      src="/realestate/editor.png"
                      alt="The listing editor with photos and open house scheduling"
                      width={560}
                      height={508}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 22vw, 46vw"
                    />
                  </figure>
                </div>
              }
            />
          </div>
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
              body: "A brokerage site with an agent roster, areas, and a blog, and a dashboard that shows every listing and every agent's site in one place.",
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
              q: "Do I need to be technical?",
              a: "No. Editing a listing, writing a post, or updating a lead is a form. If you can use your email, you can run this.",
            },
            {
              q: "I already have a website and a blog. Can you move them?",
              a: "Yes. Posts can be imported from your current site, and old URLs are redirected to the new ones with permanent redirects, so links and search rankings carry over.",
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
              q: "Will it look like The Agency's?",
              a: "It will look like you. The Agency's version carries their branding; yours gets your logo, your colors, your photography, and your domain.",
            },
            {
              q: "What does it cost?",
              a: "Every project is quoted to what you actually need, so there's no pricing table to squint at. Tell us what you're after and we'll reply within a business day.",
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
                <Eyebrow>Start a project</Eyebrow>
                <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Tell us how you work today.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  A few lines is plenty: where your leads come from, what you track and where, what your current site is
                  missing. We&rsquo;ll reply within a business day with next steps.
                </p>
                <p className="mt-6 text-sm text-text-muted">
                  Prefer email?{" "}
                  <a
                    href="mailto:hello@latchpointstudios.com"
                    className="text-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    hello@latchpointstudios.com
                  </a>
                </p>
              </div>
              <div className="lg:col-span-7">
                <InquiryForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
