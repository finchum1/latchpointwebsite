import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { solutions } from "@/lib/solutions";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Latchpoint Studios builds for small businesses, real estate, personal use, and nonprofits and ministries alike.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-text sm:text-5xl">
            Solutions
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            The same studio, shaped around who it’s for. Not every project
            is a business, and not every business is the same kind of
            business.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={`/solutions/${s.slug}`} className="block">
                <SpotlightCard className="h-full rounded-[20px] border border-border bg-bg-elevated p-7 transition-colors duration-300 hover:border-border-strong">
                  <s.icon weight="light" className="size-8 text-accent" />
                  <h2 className="mt-6 text-xl font-medium text-text">{s.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text">
                    Explore
                    <ArrowRight weight="bold" className="size-4" />
                  </span>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
