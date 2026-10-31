import type { Metadata } from "next";
import { Check, Minus, LinkSimple, Kanban } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import { CloseStartForm } from "@/components/close/close-start-form";

const URL = "https://close.latchpointstudios.com";

export const metadata: Metadata = {
  title: { absolute: "Close by Latchpoint: transaction coordination for Oklahoma agents" },
  description:
    "Contract-to-close coordination for Oklahoma real estate agents. You get a private link that shows the whole file, and your client gets a closing timeline in plain English. Flat fee per file.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Close by Latchpoint",
    description:
      "Transaction coordination for Oklahoma agents, with a live link to the file for you and a closing timeline for your client.",
    url: URL,
    siteName: "Close by Latchpoint",
    type: "website",
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
  id,
  eyebrow,
  title,
  body,
  bullets,
  visual,
  caption,
  flip = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  caption?: string;
  flip?: boolean;
}) {
  return (
    <div id={id} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
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

const SAMPLE = "Sample data. Every name, date, and address on this screen is invented.";

/** What each shared page shows. `true` = shown, `false` = never shown. */
const COMPARE: { row: string; agent: boolean | string; client: boolean | string }[] = [
  { row: "Days to closing and the key dates", agent: true, client: true },
  { row: "A short note from me", agent: true, client: "From you" },
  { row: "What needs you right now", agent: true, client: false },
  { row: "Open tasks and due dates", agent: true, client: false },
  { row: "Documents collected and still needed", agent: true, client: false },
  { row: "Signatures out and who they're waiting on", agent: true, client: false },
  { row: "Lender, title company, other agent", agent: true, client: "Lender and title" },
  { row: "What each step means, in plain English", agent: false, client: true },
  { row: "Price or commission", agent: false, client: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check weight="bold" className="mx-auto size-4 text-accent" aria-label="Yes" />;
  if (value === false) return <Minus weight="bold" className="mx-auto size-4 text-text-faint" aria-label="No" />;
  return <span className="text-xs text-text-muted">{value}</span>;
}

/* -------------------------------- page -------------------------------- */

export default function ClosePage() {
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
              <Eyebrow>Transaction coordination · Oklahoma</Eyebrow>
              <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.2rem]">
                Contract to close, handled. And everyone can see where it stands.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                I run your file from the signed contract to the closing table. You get a private link that shows the
                whole deal. Your client gets their own link with a closing timeline in plain English. Nobody has to
                text you to ask what&rsquo;s next.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="#start">Send me a file</Button>
                </Magnetic>
                <Button href="#agent" variant="secondary" showArrow={false}>
                  See the two links
                </Button>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                Flat fee per file, paid at closing.{" "}
                <a href="#pricing" className="underline underline-offset-4 hover:text-text-muted">
                  What&rsquo;s included
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative min-w-0 pb-10 lg:col-span-7">
            <BrowserFrame
              src="/close/agent-update.jpg"
              alt="The agent's deal update page: days to closing, tasks done, documents collected, and a note from the coordinator"
              url="app.latchpointstudios.com/update/…"
              ratio="aspect-[16/10]"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <PhoneFrame
              src="/realestate/m-timeline.jpg"
              alt="The client's closing timeline on a phone: a countdown to closing and a note from their agent"
              className="absolute -bottom-6 right-0 w-[104px] sm:right-2 sm:w-[132px] lg:-right-5 lg:w-[150px]"
              sizes="150px"
            />
            <p className="mt-3 max-w-[60%] text-xs text-text-faint">{SAMPLE}</p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- Quick facts -------------------------- */}
      <section className="border-y border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Reveal>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
              {[
                { k: "Where", v: "Oklahoma" },
                { k: "What", v: "Contract to close" },
                { k: "Who", v: "One coordinator: me" },
                { k: "Price", v: "Flat fee per file" },
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

      {/* --------------------------- Two links ---------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-accent">
              <LinkSimple weight="bold" className="size-5" />
            </span>
            <Eyebrow>Two links per file</Eyebrow>
          </div>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            One for you, one for your client. Both always current.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            Every file I take gets two private links. They aren&rsquo;t PDFs or email recaps that go stale. Each page
            reads the deal fresh every time it&rsquo;s opened, so what you see is where things stand right now.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28">
          <Feature
            id="agent"
            eyebrow="Your link"
            title="The whole file, whenever you want it."
            body="Open it between showings and you know where the deal stands without calling me. It starts with what needs you, then the dates, tasks, documents, and signatures behind it."
            bullets={[
              "Days to closing, tasks done, and documents collected at the top",
              "\"Needs you\": overdue items, flagged documents, and signatures still out",
              "Every key date from contract to closing, with the next one highlighted",
              "Documents split into collected and still needed, with what's been reviewed",
              "Lender, title company, and the other agent in one place",
              "A note from me at the top when there's something to say",
            ]}
            visual={
              <div className="relative pb-8">
                <BrowserFrame
                  src="/close/agent-update-tall.jpg"
                  alt="The full agent update page: needs you, key dates, tasks, documents, signatures, and who's involved"
                  url="app.latchpointstudios.com/update/…"
                  ratio="aspect-[4/5]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <PhoneFrame
                  src="/close/m-agent-update.jpg"
                  alt="The agent update page on a phone"
                  className="absolute -bottom-2 -right-2 w-[110px] sm:w-[150px] lg:-right-6 lg:w-[170px]"
                  sizes="170px"
                />
              </div>
            }
            caption={SAMPLE}
          />

          <Feature
            id="client"
            flip
            eyebrow="Your client's link"
            title="A closing timeline your client understands, with your name on it."
            body="Buyers and sellers mostly want to know two things: how long until closing, and what happens next. This page answers both, and it comes from you. Your name, photo, and phone number are on it, not mine."
            bullets={[
              "A countdown to closing and how far along the deal is",
              "Each step explained in plain English: inspection, appraisal, loan approval, closing day",
              "What's still coming, with the next step called out",
              "Who's helping: the lender and title company",
              "Never shows the price, commission, or the task checklist",
              "Works on any phone, no app or login, and can be turned off any time",
            ]}
            visual={
              <div className="relative pb-8">
                <BrowserFrame
                  src="/close/client-timeline.jpg"
                  alt="The client's closing timeline page: countdown, progress bar, note from the agent, and what's still coming"
                  url="app.latchpointstudios.com/timeline/…"
                  ratio="aspect-[16/10]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <PhoneFrame
                  src="/realestate/m-timeline.jpg"
                  alt="The client's closing timeline on a phone"
                  className="absolute -bottom-6 -right-2 w-[96px] sm:w-[130px] lg:-right-6 lg:w-[150px]"
                  sizes="170px"
                />
              </div>
            }
            caption={SAMPLE}
          />
        </div>

        {/* What each link shows */}
        <Reveal className="mt-28">
          <h3 className="text-2xl font-medium leading-tight tracking-tight text-text sm:text-3xl">What each link shows</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted">
            Your client sees what helps them relax. You see what helps you work. Neither one shows money.
          </p>
          <div className="mt-8 overflow-hidden rounded-[20px] border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-elevated">
                <tr>
                  <th className="px-5 py-4 font-medium text-text-muted">&nbsp;</th>
                  <th className="w-[22%] px-3 py-4 text-center font-medium text-text">You</th>
                  <th className="w-[22%] px-3 py-4 text-center font-medium text-text">Your client</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARE.map((r) => (
                  <tr key={r.row}>
                    <td className="px-5 py-3.5 text-text-muted">{r.row}</td>
                    <td className="px-3 py-3.5 text-center">
                      <Cell value={r.agent} />
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <Cell value={r.client} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* -------------------------- Behind it ----------------------------- */}
      <section className="border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-accent">
                <Kanban weight="bold" className="size-5" />
              </span>
              <Eyebrow>Behind the links</Eyebrow>
            </div>
            <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              Every file runs on the same deals board.
            </h2>
          </Reveal>

          <div className="mt-16">
            <Feature
              eyebrow="Where I work"
              title="Nothing lives in my inbox or a spreadsheet."
              body="I work every file in the Latchpoint deals dashboard. Dates, tasks, documents, and signatures are tracked in one place, and that's what both links read from. When I check something off, your page and your client's page show it the next time they're opened."
              bullets={[
                "A checklist for every file, with due dates set from the contract dates",
                "Documents tracked as collected or needed, and reviewed before they're filed",
                "Signatures tracked until everyone has signed",
                "One email to the title company, the other agent, and the lender, without your client on it",
                "If you already use the Latchpoint dashboard, add me to your deal and I work right in it",
              ]}
              visual={
                <div className="relative pb-8">
                  <BrowserFrame
                    src="/realestate/dash-deals.jpg"
                    alt="The deals dashboard: open deals, what needs attention, and what's coming up in the next 14 days"
                    url="app.latchpointstudios.com/deals"
                    ratio="aspect-[16/10]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              }
              caption={SAMPLE}
            />
          </div>
        </div>
      </section>

      {/* -------------------------- What I handle ------------------------- */}
      <section id="handled" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>What I handle</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            The paperwork and the follow-up, so you can stay with your clients.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              title: "Opening the file",
              body: "I read the executed contract, set every deadline, build the checklist, and send you and your client your links. Then I introduce myself to the title company, lender, and other agent.",
            },
            {
              title: "Keeping it moving",
              body: "Earnest money, inspection, the inspection period, appraisal, and loan approval. I track each one, remind the people who owe something, and tell you before anything slips.",
            },
            {
              title: "Getting to the table",
              body: "I collect and check the documents, chase signatures, confirm the closing time with title, and schedule the final walk-through. Your file is complete when the keys change hands.",
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

      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              One flat fee per file. You pay when it closes.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              No monthly fee and no contract. If a deal falls through, you don&rsquo;t pay for that file.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "$395",
                unit: "per file",
                items: [
                  "Contract to close, buyer or seller side",
                  "Your live link to the file, and a closing timeline link for your client",
                  "Deadlines, documents, and signatures tracked until closing",
                  "Paid at closing",
                ],
              },
              {
                price: "Volume",
                unit: "5+ files a month",
                items: [
                  "A lower per-file price for teams and busy agents",
                  "Everything in the per-file price",
                  "Ask me and I'll quote you",
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

      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Send the contract. I take it from there.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "You send the executed contract",
              body: "Use the form below or email it to me. Tell me who your client is and anything unusual about the deal.",
            },
            {
              n: "02",
              title: "I open the file and send the links",
              body: "Within a business day you have your link, and your client has their timeline with your name on it. You can send it yourself, or I can.",
            },
            {
              n: "03",
              title: "I run it to closing",
              body: "I handle the follow-up and keep both pages current. You hear from me when something needs you, not every time something moves.",
            },
          ].map((s) => (
            <RevealItem key={s.n}>
              <p className="font-mono text-sm text-accent">{s.n}</p>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-text">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things agents ask first.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 divide-y divide-border border-y border-border">
          {[
            {
              q: "Where do you work?",
              a: "Oklahoma only, for now. I know the Oklahoma contracts and the local title companies and lenders, and I'd rather do one state well.",
            },
            {
              q: "Who will I be working with?",
              a: "Me. I'm one coordinator, not a call center, so every file gets the same person from start to finish.",
            },
            {
              q: "What does it cost?",
              a: "$395 per file, paid at closing. If the deal falls through, you don't pay. If you close five or more a month, ask about a volume price.",
            },
            {
              q: "Will my client know I use a coordinator?",
              a: "Only if you want them to. Their timeline page carries your name, photo, and phone number, and the note at the top is from you.",
            },
            {
              q: "Can my client see the price or my commission?",
              a: "No. Neither link shows the price or the commission, and your client never sees the task checklist.",
            },
            {
              q: "Do I need to log in or install anything?",
              a: "No. Both pages open from a link on any phone or computer. If you already use the Latchpoint dashboard, you can also add me to the deal there and see the same file inside it.",
            },
            {
              q: "What if I want to stop sharing a link?",
              a: "I can turn any link off right away, and every link expires on its own after a set number of days. A link is long and random, and the pages tell search engines not to list them.",
            },
            {
              q: "What don't you do?",
              a: "I don't negotiate, give legal advice, or talk price with anyone. You stay the agent. I handle the paperwork, deadlines, and follow-up around you.",
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
                  Send me your next file.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  Tell me a little about you and the deal. I&rsquo;ll get back to you by the end of the next business
                  day.
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
                <CloseStartForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
