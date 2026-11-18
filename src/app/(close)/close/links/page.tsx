import type { Metadata } from "next";
import { LinkSimple } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import { Eyebrow, Feature, CtaBand } from "@/components/subsite/parts";
import { SAMPLE, COMPARE, Cell } from "@/components/close/data";
import { CompareReveal } from "@/components/close/compare-reveal";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/links", "The two links: Latchpoint Close", "Every file gets a private link for you and a closing timeline for your client, both always current. See what each one shows.");

export default function CloseLinks() {
  return (
    <>
      {/* --------------------------- Two links ---------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-accent">
              <LinkSimple weight="bold" className="size-5" />
            </span>
            <Eyebrow>Two links per file</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            One for you, one for your client. Both always current.
          </h1>
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
          <CompareReveal>
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-elevated">
                <tr>
                  <th className="px-5 py-4 font-medium text-text-muted">&nbsp;</th>
                  <th className="w-[22%] px-3 py-4 text-center font-medium text-text">You</th>
                  <th className="w-[22%] px-3 py-4 text-center font-medium text-text">Your client</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARE.map((r, ri) => (
                  <tr key={r.row} style={{ ["--r" as string]: ri }}>
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
          </CompareReveal>
        </Reveal>
      </section>
      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
