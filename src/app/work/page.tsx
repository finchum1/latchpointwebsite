import type { Metadata } from "next";
import Image from "next/image";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Work",
  description: "Real products Latchpoint Studios has designed and built, live right now.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-text sm:text-5xl">
            Work
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Seven products, seven different problems. Everything below is
            live today, not a mockup.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="flex flex-col gap-20 sm:gap-28">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <div
                id={p.slug}
                className="grid scroll-mt-24 grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-12"
              >
                <div className="order-2 lg:order-1 lg:col-span-3">
                  <div className="overflow-hidden rounded-[20px] border border-border bg-bg-elevated-2">
                    <Image
                      src={p.image}
                      alt={`${p.name} screenshot`}
                      width={1440}
                      height={900}
                      priority={i === 0}
                      className="w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-2">
                  <p className="text-xs uppercase tracking-[0.1em] text-text-faint">
                    {p.category} &middot; {p.year}
                  </p>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight text-text sm:text-3xl">
                    {p.name}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-text-muted">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent"
                  >
                    Visit live site
                    <ArrowSquareOut weight="bold" className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
