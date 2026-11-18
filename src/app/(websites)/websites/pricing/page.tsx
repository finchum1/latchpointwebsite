import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { OrbitNode } from "@/components/orbit-node";
import { SpotlightCard } from "@/components/spotlight-card";
import { Eyebrow, Bullets, CtaBand } from "@/components/subsite/parts";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("/pricing", "Pricing: Latchpoint Websites", "$500 to set up, then $100 a month, with hosting, backups, updates and small edits included. Custom sites are quoted after a short call.");

export default function WebsitesPricing() {
  return (
    <>
      {/* ----------------------------- Pricing ---------------------------- */}
      <section id="pricing" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              $500 to set up, then $100 a month.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              That&rsquo;s where it starts. Bigger or more custom sites cost more, and we quote those after a short
              call. Either way, you see the price in writing before we start.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                price: "From $500",
                unit: "to set up",
                items: [
                  "Design, build, and launch of your site, in about two weeks",
                  "Your domain connected and your contact forms sent to your email",
                  "Help with wording and the photos you have",
                  "Hand-off with the access and a short guide",
                ],
              },
              {
                price: "From $100",
                unit: "a month",
                items: [
                  "Hosting, backups, and security updates handled",
                  "Small edits and page changes whenever you ask",
                  "A real person to email when something needs fixing",
                  "Included with every site, so it never goes stale",
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

          <Reveal className="mt-8">
            <p className="text-sm text-text-muted">
              Need more pages, booking, or something custom?{" "}
              <a href="#start" className="text-text underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent">
                Ask for a free quote
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
