import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { WebsitesProcess } from "@/components/websites/websites-process";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("/process", "How it works: Latchpoint Websites", "From a short call to a live website in about two weeks, in four steps.");

export default function WebsitesHow() {
  return (
    <>
      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            From a short call to live, in four steps.
          </h1>
        </Reveal>

        <WebsitesProcess />
      </section>
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
