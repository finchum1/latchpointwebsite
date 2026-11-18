import type { Metadata } from "next";
import { Kanban } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, Feature, CtaBand } from "@/components/subsite/parts";
import { SAMPLE } from "@/components/close/data";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/services", "What I handle: Latchpoint Close", "Opening the file, keeping it moving, and getting to the table: the paperwork and follow-up around every transaction.");

export default function CloseServices() {
  return (
    <>
      {/* -------------------------- What I handle ------------------------- */}
      <section id="handled" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>What I handle</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            The paperwork and the follow-up, so you can stay with your clients.
          </h1>
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
          ].map((c, i) => (
            <RevealItem key={c.title}>
              {/* The same traveling node and cursor glow as the studio site's cards. */}
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
      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
