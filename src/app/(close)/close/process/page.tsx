import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { CloseProcess } from "@/components/close/close-process";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/process", "How it works: Latchpoint Close", "Send the executed contract and I take it from there: the file opens within a business day and runs to closing.");

export default function CloseHow() {
  return (
    <>
      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Send the contract. I take it from there.
          </h1>
        </Reveal>

        <CloseProcess />
      </section>
      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
