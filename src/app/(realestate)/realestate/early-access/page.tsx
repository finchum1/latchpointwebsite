import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { EarlyAccessForm } from "@/components/realestate/early-access-form";
import { Eyebrow } from "@/components/subsite/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/early-access", "Request early access: Latchpoint Real Estate", "Tell me about your site and your office. Spots are limited and invited by hand.");

export default function RealEstateEarlyAccess() {
  return (
    <>
      {/* ------------------------- Early access --------------------------- */}
      <section id="early-access" className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>Early access</Eyebrow>
                <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Get on the list.
                </h1>
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
