import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/faq", "Questions: Latchpoint Close", "Answers to what agents ask first about transaction coordination: where I work, cost, what clients see, and what I do not do.");

export default function CloseFaq() {
  return (
    <>
      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things agents ask first.
          </h1>
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
              a: "$300 per file, paid at closing. If the deal falls through, you don't pay. If you close five or more a month, ask about a volume price.",
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
      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
