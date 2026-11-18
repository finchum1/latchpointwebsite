import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Magnetic } from "@/components/magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { BrowserFrame } from "@/components/realestate/frames";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { CloseBrain } from "@/components/close/close-brain";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("", "Latchpoint Close: transaction coordination for Oklahoma agents", "Contract-to-close coordination for Oklahoma real estate agents. You get a private link that shows the whole file, and your client gets a closing timeline in plain English. Flat fee per file.");

export default function CloseHome() {
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
                  <Button href="/contact" plain>Send me a file</Button>
                </Magnetic>
                <a href="/links" className="text-[15px] font-medium text-text underline decoration-border-strong decoration-1 underline-offset-[7px] transition-colors duration-300 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  See the two links
                </a>
              </div>
              <p className="mt-5 text-sm text-text-faint">
                Flat fee per file, paid at closing.{" "}
                <a href="/pricing" className="underline underline-offset-4 hover:text-text-muted">
                  What&rsquo;s included
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex min-w-0 justify-center lg:col-span-6 lg:justify-end">
            <CloseBrain />
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
      {/* ------------------------- The two links (teaser) ------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>Two links per file</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            One for you, one for your client. Both always current.
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            { src: "/close/agent-update-tall.jpg", alt: "The agent update page", url: "app.latchpointstudios.com/update/…", t: "Your link", b: "The whole file, whenever you want it: what needs you, key dates, tasks, documents, and signatures." },
            { src: "/close/client-timeline.jpg", alt: "The client's closing timeline page", url: "app.latchpointstudios.com/timeline/…", t: "Your client's link", b: "A closing timeline in plain English, with your name on it. Never shows the price or your commission." },
          ].map((x) => (
            <RevealItem key={x.t}>
              <a href="/links" className="group block">
                <BrowserFrame src={x.src} alt={x.alt} url={x.url} ratio="aspect-[16/10]" sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-5 text-lg font-medium tracking-tight text-text">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{x.b}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <p className="text-xs text-text-faint">Sample data. Every name, date, and address on these screens is invented.</p>
          <a href="/links" className="mt-4 inline-block text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
            See what each link shows
          </a>
        </Reveal>
      </section>

      {/* ------------------------- What I handle (teaser) ------------------------- */}
      <section className="border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>What I handle</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              The paperwork and the follow-up, so you can stay with your clients.
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { t: "Opening the file", b: "Contract read, deadlines set, checklist built, links sent." },
              { t: "Keeping it moving", b: "Earnest money, inspection, appraisal, loan: tracked and chased." },
              { t: "Getting to the table", b: "Documents checked, signatures chased, closing confirmed." },
            ].map((c) => (
              <RevealItem key={c.t}>
                <div className="h-full rounded-[16px] border border-border bg-bg-elevated p-5">
                  <h3 className="text-base font-medium text-text">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{c.b}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8">
            <a href="/services" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
              See everything I handle
            </a>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Pricing (teaser) ------------------------------ */}
      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center lg:px-8">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">$300 a file. Paid at closing.</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">No monthly fee and no contract. If a deal falls through, you don&rsquo;t pay for that file.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic>
            <Button href="/pricing" plain variant="secondary">
              See what&rsquo;s included
            </Button>
          </Magnetic>
        </Reveal>
      </section>

      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
