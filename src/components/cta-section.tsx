import { Button } from "./button";
import { Reveal } from "./reveal";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
          <h2 className="relative text-3xl font-medium tracking-tight text-text sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base leading-relaxed text-text-muted">
            Tell us what you’re trying to build, however specific or
            unusual. We’ll reply within a business day with next steps.
          </p>
          <div className="relative mt-9 flex justify-center">
            <Button href="/contact">Start a project</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
