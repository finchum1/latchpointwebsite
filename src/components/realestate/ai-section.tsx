"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ClockCountdown, ShieldCheck, Notepad } from "@phosphor-icons/react";

const ASSISTANTS = [
  { id: "claude", name: "Claude", mark: "C" },
  { id: "chatgpt", name: "ChatGPT", mark: "G" },
  { id: "grok", name: "Grok", mark: "X" },
] as const;

type Scenario = {
  chip: string;
  ask: string;
  reply: string;
  /** What it left behind in the dashboard. */
  items: { title: string; text: string }[];
  foot: string;
};

/** Each of these is a thing the connection can do today (read your day, add and update people, set follow-ups, write drafts). Names are invented. */
const SCENARIOS: Scenario[] = [
  {
    chip: "Draft my follow-up texts",
    ask: "Draft a follow-up text for everyone who's due today.",
    reply: "Three people are due today. I wrote a short text for each and put them in Drafts waiting for you.",
    items: [
      { title: "Priya Shah", text: "Hi Priya, it's Alex. Did the Maple Ridge home work for your Saturday schedule? Happy to set up a second look." },
      { title: "Olivia Bennett", text: "Hi Olivia, checking in. The two homes you liked have new photos up. Want me to send them over?" },
      { title: "Megan & Luke Carter", text: "Hi Megan and Luke, just following up on the lender call. Any questions I can help with?" },
    ],
    foot: "Nothing was sent. You read them, edit if you like, and send from your own phone.",
  },
  {
    chip: "Add a lead",
    ask: "Add Daniel Ortiz as a seller lead and remind me to call him Friday.",
    reply: "Done. Daniel is in Leads and the reminder is set.",
    items: [
      { title: "Leads · New", text: "Daniel Ortiz, seller." },
      { title: "Follow-up", text: "Friday: call Daniel about listing his home." },
    ],
    foot: "He shows up on your board like anyone you added yourself.",
  },
  {
    chip: "Who needs attention?",
    ask: "Who in my pipeline needs attention this week?",
    reply: "Three people stand out, mostly because they're overdue.",
    items: [
      { title: "Megan & Luke Carter", text: "Follow-up was due yesterday. Last touch was nine days ago." },
      { title: "Marcus Webb", text: "Listing at 88 Lakeview Dr is coming soon. Photos aren't booked yet." },
      { title: "Hannah Brooks", text: "Nurturing for three weeks with no note since the first call." },
    ],
    foot: "It reads your own contacts and pipeline, and only yours.",
  },
  {
    chip: "Write a blog post",
    ask: "Draft a blog post about what to expect in the Summit Valley market this winter.",
    reply: "I wrote a draft and saved it to your blog. It isn't published.",
    items: [{ title: "What to expect in Summit Valley this winter", text: "Draft · 640 words · saved to your blog, waiting for you to read it." }],
    foot: "You edit it in your blog editor and publish it when you're happy.",
  },
];

const TRUST = [
  { icon: Notepad, title: "Drafts, not sends", body: "Texts and emails wait in your dashboard. You send them yourself, from your own phone or mail app." },
  { icon: ShieldCheck, title: "You choose who has access", body: "AI access is switched on one agent at a time, and each connection only gets the permissions you give it." },
  { icon: ClockCountdown, title: "Every action is logged", body: "You can see what your AI did and when. It can't delete your records." },
];

const NOTES: Record<(typeof ASSISTANTS)[number]["id"], string> = {
  claude: "Add your dashboard to Claude with one address, sign in once, and pick what it may do.",
  chatgpt: "Add your dashboard to ChatGPT the same way, with one address and one sign-in.",
  grok: "In daily use here: Grok bots draft follow-up texts for Terrence's own pipeline.",
};

export function AiSection() {
  const reduce = useReducedMotion();
  const [who, setWho] = useState<(typeof ASSISTANTS)[number]["id"]>("claude");
  const [i, setI] = useState(0);
  const s = SCENARIOS[i];
  const current = ASSISTANTS.find((a) => a.id === who)!;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">AI built in</p>
        <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
          Bring the AI you already use. It works inside your back office.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Connect Claude, ChatGPT, or Grok to your dashboard and just ask. Draft follow-up texts, add a lead, set a
          reminder, write a blog post. It works with your own contacts, leads, and deals, and it asks you before anything
          goes out.
        </p>

        <div role="tablist" aria-label="Choose an assistant" className="mt-8 inline-flex rounded-full border border-border-strong bg-bg-elevated p-1">
          {ASSISTANTS.map((a) => (
            <button
              key={a.id}
              role="tab"
              type="button"
              aria-selected={who === a.id}
              onClick={() => setWho(a.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                who === a.id ? "bg-text text-bg" : "text-text-muted hover:text-text"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <p className="mt-3 min-h-[3rem] max-w-md text-sm leading-relaxed text-text-muted" aria-live="polite">
          {NOTES[who]}
        </p>

        <ol className="mt-6 flex flex-col gap-3">
          {["You ask in plain words", "It drafts or updates your dashboard", "You review and send"].map((t, n) => (
            <li key={t} className="flex items-center gap-3 text-[15px] text-text">
              <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft font-mono text-xs text-accent">{n + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </div>

      <div className="min-w-0 lg:col-span-7">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Example requests">
          {SCENARIOS.map((sc, n) => (
            <button
              key={sc.chip}
              type="button"
              onClick={() => setI(n)}
              aria-pressed={i === n}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                i === n ? "border-accent bg-accent-soft text-text" : "border-border-strong text-text-muted hover:text-text"
              }`}
            >
              {sc.chip}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[20px] border border-border-strong bg-bg-elevated shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 border-b border-border bg-bg-elevated-2 px-5 py-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-medium text-accent" aria-hidden="true">
              {current.mark}
            </span>
            <span className="text-sm font-medium text-text">Asked in {current.name}</span>
            <span className="ml-auto text-xs text-text-faint">Example</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${who}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[27rem] flex-col gap-4 p-5 sm:p-6"
            >
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-text px-4 py-3 text-[15px] leading-relaxed text-bg">{s.ask}</div>

              <div className="max-w-[94%]">
                <p className="text-[15px] leading-relaxed text-text">{s.reply}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {s.items.map((it) => (
                    <li key={it.title} className="rounded-xl border border-border bg-bg px-4 py-3">
                      <p className="flex items-center gap-2 text-sm font-medium text-text">
                        <Check weight="bold" className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
                        {it.title}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-text-muted">{it.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-text-muted">{s.foot}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 text-xs text-text-faint">Example conversation. Every name here is invented.</p>
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:col-span-12">
        {TRUST.map((t) => (
          <li key={t.title} className="rounded-[20px] border border-border bg-bg-elevated p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
              <t.icon weight="regular" className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-medium text-text">{t.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
