import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/subsite/parts";
import { CloseStartForm } from "@/components/close/close-start-form";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/contact", "Send me a file: Latchpoint Close", "Tell me about you and the deal. I will get back to you by the end of the next business day.");

export default function CloseContact() {
  return (
    <>
      {/* ------------------------------ Start ----------------------------- */}
      <section id="start" className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>Get started</Eyebrow>
                <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Send me your next file.
                </h1>
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
