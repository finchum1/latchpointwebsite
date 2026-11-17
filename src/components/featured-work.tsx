import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import { Button } from "./button";

export function FeaturedWork() {
  const featured = projects.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-text sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
            Real products, live right now, built for real businesses.
          </p>
        </div>
        <Button href="/work" variant="secondary">
          See all work
        </Button>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
