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
    "A real estate website with a dashboard behind it: templates, blog, contacts, leads, pipeline, deals, and a schedule that syncs with Google Calendar. We build it, move you over, and keep it running. $500 to set up, then $200 a month, no contracts.",
  alternates: { canonical: "https://realestate.latchpointstudios.com" },
  openGraph: {
    title: "Latchpoint Real Estate",
    description:
      "The website and back office for real estate agents and brokerages: contacts, leads, pipeline, deals, and your schedule in one dashboard.",
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
                Latchpoint Real Estate is a real estate website with a dashboard behind it: your contacts, leads,
                pipeline, deals, and schedule in one place. We build it, move you over, and keep it running.
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
                $500 to set up, then $200 a month. No contracts.{" "}
                <a href="#pricing" className="underline underline-offset-4 hover:text-text-muted">
                  What&rsquo;s included
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative min-w-0 pb-10 lg:col-span-7">
            <BrowserFrame
              src="/realestate/dash-home.jpg"
              alt="The Latchpoint Real Estate dashboard home page: an hourly schedule, tasks waiting to be scheduled, and today's follow-ups"
              url="yourbrokerage.com/dashboard"
              ratio="aspect-[16/10]"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
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
                "Agent and brokerage sites on your own domain, from three starter templates",
                "Six headers, five footers, and live previews of your site in every layout",
                "Seller, buyer, and home value pages, plus a Recently Sold section",
                "A property site for every listing, with video, visitor analytics, and printable flyers",
                "A blog with a post calendar and pinned posts",
              ],
            },
            {
              icon: <Kanban weight="regular" className="size-5" />,
              title: "The back office",
              items: [
                "A home page for your day: an hourly schedule, new inquiries, tasks, and your goal",
                "A private contacts database with tags and keep-in-touch reminders",
                "Leads and a pipeline with a follow-up rhythm for every column",
                "Deals with key dates, checklists, a coordinator, and compliance review",
                "Timeline and vendor links you can send to a client",
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
            title="Your day, hour by hour, in sync with Google Calendar."
            body="Connect your Google account and your calendars show up on the dashboard, in day, week, and month views. Block time for a task by dragging it onto the grid. Add or change an appointment here and it changes in Google Calendar, and the other way around."
            bullets={[
              "Pick which calendars to show; calendars you can only view stay view-only",
              "Tasks, deal dates, and appointments share one schedule, with a tray of tasks waiting for a time",
              "New website inquiries are waiting right below, with call, text, and email buttons",
              "Repeating tasks and a scorecard that tracks your year against your goal",
            ]}
            visual={
              <div className="relative pb-6 pr-0 sm:pr-24">
                <BrowserFrame
                  src="/realestate/dash-home-week.jpg"
                  alt="The week view of the schedule, with appointments, tasks, and deal dates on an hourly grid"
                  url="yourbrokerage.com/dashboard"
                  ratio="aspect-[16/10]"
                />
                <figure className="absolute -bottom-2 right-0 hidden w-[200px] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:block lg:w-[240px]">
                  <Image
                    src="/realestate/dash-add.jpg"
                    alt="Adding a task to the schedule with a start and end time"
                    width={1700}
                    height={1065}
                    className="h-auto w-full"
                    sizes="240px"
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
              eyebrow="Agent sites"
              title="Your own site, from a template you pick."
              body="Start from one of three finished looks, then make it yours: your photos, your logo, your accent color, and the pages and sections you want. Every site is built phone-first, because that's where your clients are."
              bullets={[
                "Three starter templates: luxury minimal, warm editorial, and guide cards",
                "Six header styles and five footers, with the menu in the order you choose",
                "Your own domain, with old URLs redirected so you keep your search rankings",
                "Inquiry forms that filter spam, confirm to the visitor, and land straight in your leads",
              ]}
              visual={
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { src: "/realestate/site-luxury.jpg", name: "Luxury minimal", cls: "col-span-3 self-stretch" },
                    { src: "/realestate/site-warm.jpg", name: "Warm editorial", cls: "col-span-2 aspect-[16/10]" },
                    { src: "/realestate/site-guide.jpg", name: "Guide cards", cls: "col-span-2 col-start-4 aspect-[16/10]" },
                  ].map((t, i) => (
                    <figure
                      key={t.name}
                      className={`relative overflow-hidden rounded-[10px] border border-border-strong bg-bg-elevated shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ${t.cls} ${i === 0 ? "row-span-2 row-start-1" : ""}`}
                    >
                      <Image src={t.src} alt={`The ${t.name} template, shown on a sample agent site`} fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-cover object-top" />
                      <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{t.name}</figcaption>
                    </figure>
                  ))}
                </div>
              }
              caption={SAMPLE}
              flip
            />

            <Feature
              eyebrow="Compare templates"
              title="Let your agents choose their own look."
              body="Make a private link and the agent sees their own site in every layout, with a choice of colors, header, and footer. They scroll around, pick the one they like, and you get an email with their choice. No sign-in, and it works while the site is still a draft."
              bullets={[
                "Live previews with their real photo, bio, and listings, not stock mockups",
                "Looking changes nothing; the site only changes when you apply their pick",
                "Apply a whole template in one click, then save; your photos and words stay",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-site-compare.jpg"
                  alt="Compare templates: a site shown in every layout, with color, header, and footer choices"
                  url="yourbrokerage.com/dashboard/site/compare"
                  ratio="aspect-[16/10]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Pages that bring in leads"
              title="Sellers, buyers, and a home value page, ready to go."
              body="Every agent site comes with guide-style pages for sellers and buyers and a home value page with an address box. Each form lands in your leads tagged with the page it came from, and a home value request adds a 'pull comps' task to your list for the next day."
              bullets={[
                "A step-by-step seller and buyer journey that is ready on day one",
                "Buyer and seller cards on the home page, in the order you pick",
                "A Recently Sold section and a Past Sales page, copied from your closed listings",
                "Up to three pinned blog posts leading your blog page",
              ]}
              visual={
                <div className="relative pb-6 pr-0 sm:pr-20">
                  <BrowserFrame
                    src="/realestate/site-sellers.jpg"
                    alt="A seller's page on an agent site, with a guide to the selling journey"
                    url="youragent.com/sellers"
                    ratio="aspect-[16/10]"
                  />
                  <figure className="absolute -bottom-2 right-0 hidden w-[44%] overflow-hidden rounded-[12px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:block">
                    <Image src="/realestate/site-past-sales.jpg" alt="The Past Sales page, a grid of recently sold homes" width={2400} height={1500} className="h-auto w-full" sizes="(min-width: 1024px) 22vw, 44vw" />
                  </figure>
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Listings"
              title="A property site for every listing."
              body="Fill out a form and the listing has its own site: hero photo or video, gallery, features, map, and a tour request. No new repo, no redeploy, no waiting on a developer."
              bullets={[
                "Change a listing's status and the live site updates the moment you do",
                "One video per listing, playing behind the hero or above the gallery",
                "Open houses appear as a banner on the listing",
                "A live check on each property's custom domain, with an alert if it stops responding",
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
              eyebrow="Visitor analytics"
              title="Know who's looking at every listing."
              body="Every property site reports how many people looked, where they came from, and what they did. Give each place you share a listing its own link, and you'll see which one is working. Sellers get a private report page with the same numbers."
              bullets={[
                "Views, unique visitors, time on page, and how far people scrolled",
                "Tagged links for Facebook, Instagram, email, text, MLS, and a QR code on the flyer",
                "A seller report link that never shows inquiry names or contact details",
                "An optional Monday email to you with last week's numbers",
              ]}
              visual={
                <div className="relative pb-6 pl-0 sm:pl-16">
                  <BrowserFrame
                    src="/realestate/dash-analytics.jpg"
                    alt="A listing's analytics: views by day, where visitors came from, devices, and how far they got"
                    url="yourbrokerage.com/dashboard/listings/analytics"
                    ratio="aspect-[2400/1856]"
                  />
                  <PhoneFrame
                    src="/realestate/m-report.jpg"
                    alt="The seller report page on a phone"
                    className="absolute -bottom-2 left-0 hidden w-[124px] sm:block"
                    sizes="124px"
                  />
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Flyers"
              title="Print-ready flyers, in three styles."
              body="Every listing makes a one-page flyer from the same details as its website. Pick Classic, Minimal editorial, or Luxury dark, choose the photos and features, and the page checks that it all fits on one printed sheet."
              bullets={[
                "A QR code that sends scans to the listing site, counted in your analytics",
                "A fit check that shows how much room is left, and trims the blurb to fit for you",
                "Print or save as a PDF straight from the page",
              ]}
              visual={
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { src: "/realestate/flyer-classic.jpg", name: "Classic" },
                    { src: "/realestate/flyer-editorial.jpg", name: "Minimal editorial" },
                    { src: "/realestate/flyer-luxury.jpg", name: "Luxury dark" },
                  ].map((f) => (
                    <figure key={f.name} className="overflow-hidden rounded-[8px] border border-border-strong bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
                      <Image src={f.src} alt={`The ${f.name} flyer`} width={1632} height={2112} className="h-auto w-full" sizes="(min-width: 1024px) 14vw, 30vw" />
                      <figcaption className="bg-bg-elevated px-2 py-1.5 text-center text-[11px] text-text-muted">{f.name}</figcaption>
                    </figure>
                  ))}
                </div>
              }
              caption={SAMPLE}
              flip
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
            body="Contacts, leads, pipeline, and deals, laid out the way agents think."
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
              eyebrow="Contacts"
              title="Everyone you know, in one private database."
              body="Your sphere, past clients, referral partners, lenders, and vendors, with tags, notes, and a keep-in-touch reminder for each person. It's yours alone: no one else in your office can see your contacts."
              bullets={[
                "Tag people and save a filter as a smart list, like 'Due for a touch' or 'Holiday cards'",
                "Log a call, text, email, meeting, or showing, and 'last in touch' updates itself",
                "Import from a spreadsheet and merge duplicates into one record",
                "Every lead, pipeline, and deal card links back to its contact",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-contacts.jpg"
                  alt="The Contacts page with tags, relationship, last contact, and saved smart lists"
                  url="yourbrokerage.com/dashboard/people/contacts"
                  ratio="aspect-[16/10]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Leads"
              title="Every lead has a next step."
              body="Website inquiries, open house sign-ins, and referrals land on a board. Each column sets its own follow-up rhythm, so fresh leads come up every day and slower ones every couple of weeks. Anything overdue turns red, so the person you meant to call doesn't slip."
              bullets={[
                "Tag each person as a buyer, a seller, or both",
                "Board or list view, with search and filters, including 'due now'",
                "Call, text, or email from inside the card, and it counts as a touch",
                "Columns you can rename, reorder, and add",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-leads.jpg"
                  alt="The Leads board with follow-up cadence on every column, buyer and seller tags, and follow-up dates"
                  url="yourbrokerage.com/dashboard/people/leads"
                  ratio="aspect-[2400/1120]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Pipeline"
              title="A pipeline that looks past this month."
              body="Your sphere, your someday-buyers, and the sellers who'll list in spring, all in one place and sorted by how soon they're likely to move. The same board, the same follow-up rhythm, a longer horizon."
              bullets={[
                "Stages from 12+ months out to active, or whatever fits how you work",
                "Everyone you're nurturing, visible at a glance",
                "Move a card as the timeline changes",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-pipeline.jpg"
                  alt="The Pipeline board, from 12 months out to active"
                  url="yourbrokerage.com/dashboard/people/pipeline"
                  ratio="aspect-[2400/1120]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Deals"
              title="Under contract, nothing forgotten."
              body="Deals have their own place in the dashboard. Each one gets its key dates, the numbers, the title and lender, and buyer or seller checklists for tasks and documents, with deadlines counted from the contract date. Progress rings show how far along every deal is."
              bullets={[
                "An overview of what needs you now and what's coming in the next two weeks",
                "Contract, inspection, appraisal, financing, and closing dates, plus earnest money",
                "A task checklist and a document list, with seller and buyer versions you can edit",
                "Open deals, expected commission, and closed volume on your Overview",
              ]}
              visual={
                <div className="relative pb-24 sm:pb-28">
                  <BrowserFrame
                    src="/realestate/dash-deals.jpg"
                    alt="The Deals page with needs-your-attention, coming-up dates, and deal totals"
                    url="yourbrokerage.com/dashboard/deals"
                    ratio="aspect-[16/10]"
                  />
                  <figure className="absolute -bottom-2 right-3 w-[62%] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:w-[48%]">
                    <Image
                      src="/realestate/dash-deal-tasks.jpg"
                      alt="A deal's task checklist with a progress ring"
                      width={1700}
                      height={1517}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 28vw, 60vw"
                    />
                  </figure>
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Coordinators and compliance"
              title="Bring your coordinator and your compliance reviewer in."
              body="Pick a transaction coordinator for each deal and they see and work just that deal, with the agent kept informed. A compliance reviewer can read every deal's documents, mark each one approved or send it back with a note, and the agent gets an email when something comes back."
              bullets={[
                "A coordinator can start a deal on an agent's behalf, and the agent is emailed",
                "Agents submit a deal for review; reviewers approve it or send it back with a note",
                "A message thread on each deal keeps the conversation with the paperwork",
                "Optional milestone emails and a Monday summary from the coordinator keep agents in the loop",
              ]}
              visual={
                <figure className="mx-auto max-w-[520px] overflow-hidden rounded-[16px] border border-border-strong bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/realestate/dash-deal-panel.jpg"
                    alt="A deal's side panel: the address, stage, closing countdown, and tabs for tasks, documents, messages, and details"
                    width={1700}
                    height={1945}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                </figure>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="For your clients"
              title="Show clients where they stand."
              body="Send a buyer or seller a private link that shows their closing timeline: a countdown, what's done, what's still coming, and who's helping. It never shows price, commission, or your checklist. Send a vendor list the same way, and clients get your recommended inspector, mover, or plumber with a tap to call."
              bullets={[
                "A timeline page branded with you, with a personal note from you or your coordinator",
                "Links you can switch off at any time, and that expire on their own",
                "A preferred-vendor list for the whole office, shared with just the vendors you tick",
              ]}
              visual={
                <div className="flex items-start justify-center gap-4 sm:gap-6">
                  <PhoneFrame src="/realestate/m-timeline.jpg" alt="A client's closing timeline page on a phone" className="w-[44%] max-w-[210px]" sizes="210px" />
                  <PhoneFrame src="/realestate/m-vendors.jpg" alt="A vendor list shared with a client, on a phone" className="mt-10 w-[44%] max-w-[210px]" sizes="210px" />
                </div>
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
                "An office analytics page for brokers: views, sources, and agent websites, with a CSV export",
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
              No contracts. You pay month to month, and the setup fee is paid once.
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
              body: "Give each person the access that fits: full website editing, blog only, or none, and switch the contacts, leads, pipeline, and deals tools on per agent. Add a transaction coordinator or a compliance reviewer where you need one.",
            },
            {
              title: "Brokerages",
              body: "A brokerage site with an agent roster, areas, and a blog, and a dashboard for every listing and every agent, plus office analytics for the broker. Each office gets its own logo, colors, and domain.",
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
              a: "$500 to set up, then $200 a month. There are no contracts, so you pay month to month.",
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
              a: "Yes. Each person can have full website access, blog-only access, or none, and the contacts, leads, pipeline, and deals tools are switched on per agent. Your contacts and leads stay private to you; deals can be shared with a coordinator or a compliance reviewer you choose.",
            },
            {
              q: "Can my clients see where their deal stands?",
              a: "Yes. You send a private link that shows their closing timeline, with a countdown, what's done, what's coming, and who's helping. It never shows price, commission, or your internal checklist, and you can turn the link off whenever you like.",
            },
            {
              q: "Can I see who's looking at my listings?",
              a: "Yes. Each property site reports views, visitors, where they came from, and how far they got. Give every place you share a listing its own link and you'll see which one works, and send the seller a private report page with the same numbers.",
            },
            {
              q: "Can I choose how my website looks?",
              a: "Yes. Start from one of three templates, pick your colors, a header and a footer, and set the order of your pages. You can also send your agents a private link where they see their site in every layout and pick the one they like.",
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
                  to set up a short call. Asking costs nothing.
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
