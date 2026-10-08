import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { solutions, getSolution } from "@/lib/solutions";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { CTASection } from "@/components/cta-section";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = projects.filter((p) => p.audience === solution.audience);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <Reveal>
          <div className="flex size-14 items-center justify-center rounded-[14px] border border-border-strong text-accent">
            <solution.icon weight="light" className="size-7" />
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-medium tracking-tight text-text sm:text-5xl">
            {solution.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {solution.description}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {solution.capabilities.map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-[20px] border border-border bg-bg-elevated p-6">
                <Check weight="bold" className="mt-0.5 size-5 shrink-0 text-accent" />
                <p className="text-base text-text">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {solution.slug === "real-estate" && (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <Reveal>
            <a
              href="https://realestate.latchpointstudios.com"
              className="group flex flex-col gap-4 rounded-[20px] border border-border-strong bg-bg-elevated p-8 transition-colors hover:border-accent/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  The full picture
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-text">
                  See how the website and back office work together.
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  Blog, leads, pipeline, and transactions, with real examples from The Agency Dashboard.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent">
                realestate.latchpointstudios.com
                <ArrowUpRight
                  weight="bold"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </Reveal>
        </section>
      )}

      {related.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight text-text sm:text-3xl">
              {solution.name} work
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <Reveal>
            <div className="rounded-[20px] border border-border bg-bg-elevated p-8">
              <p className="text-base leading-relaxed text-text-muted">
                No {solution.name.toLowerCase()} case study yet, that’s the
                honest answer. The back office running Latchpoint Studios
                itself, quotes, invoices, client records, is the same kind
                of system described above, just built for us instead of a
                client.
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <CTASection />
    </>
  );
}
