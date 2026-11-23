import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, Bullets, CtaBand } from "@/components/subsite/parts";
import { CloseReviews } from "@/components/close/close-reviews";
import { closeMetadata } from "@/components/close/meta";

export const metadata: Metadata = closeMetadata("/pricing", "Pricing: Latchpoint Close", "$300 per file, paid at closing. No monthly fee and no contract. Volume pricing for teams.");

export default function ClosePricing() {
  return (
    <>
      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              One flat fee per file. You pay when it closes.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              No monthly fee and no contract. If a deal falls through, you don&rsquo;t pay for that file.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "$300",
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
            ].map((tier, i) => (
              <RevealItem key={tier.price}>
                <div className="orbit-wrap relative h-full">
                  <SpotlightCard className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 transition-colors duration-300 hover:border-border-strong sm:p-8">
                    <p className="text-4xl font-medium tracking-tight text-text">
                      {tier.price} <span className="text-base font-normal text-text-muted">{tier.unit}</span>
                    </p>
                    <Bullets items={tier.items} />
                  </SpotlightCard>
                  <OrbitNode duration={17} delay={-(i * 8.5)} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CloseReviews />
      <CtaBand title="Got a file under contract?" body="Send me the contract and I'll open the file, set the dates, and send you both links." label="Send me a file" />
    </>
  );
}
