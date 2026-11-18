import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RealEstateProcess } from "@/components/realestate/re-process";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, Bullets, CtaBand } from "@/components/subsite/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/pricing", "Pricing: Latchpoint Real Estate", "$500 to set up, then $150 a month, no contracts. We build it, move you over, and keep it running.");

export default function RealEstatePricing() {
  return (
    <>
      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              A setup fee, then one monthly price.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              No contracts. You pay month to month, and the setup fee is paid once.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "$500",
                unit: "to set up",
                items: [
                  "Your website built and live on your own domain",
                  "Your blog posts and old URLs moved over, so you keep your search rankings",
                  "Your dashboard set up with your logo and colors",
                ],
              },
              {
                price: "$150",
                unit: "a month",
                items: [
                  "Hosting, upkeep, and updates for your site and dashboard",
                  "New features as they ship",
                  "A studio to call when you want something changed",
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
      {/* ----------------------------- Process ---------------------------- */}
      <section id="process" className="scroll-mt-28 border-y border-border bg-bg-elevated/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              We build it around how you already work.
            </h2>
          </Reveal>

          <RealEstateProcess />
        </div>
      </section>
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
