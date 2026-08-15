import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { Lightning, ChatCircleText, GitBranch } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "About",
  description: "Latchpoint Studios is a small studio that designs and builds real, working software.",
};

const values = [
  {
    icon: Lightning,
    name: "Built fast, on purpose",
    description:
      "A modern, AI-assisted build process means the gap between an idea and a working preview is days, not a sales cycle.",
  },
  {
    icon: ChatCircleText,
    name: "One point of contact",
    description: "You talk to the person building the product, start to finish. No account manager relaying messages.",
  },
  {
    icon: GitBranch,
    name: "You own what gets built",
    description: "Every project ships with the access, code, and documentation to run it without us, if you ever want to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-text sm:text-5xl">
            About
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Latchpoint Studios is a small, independent studio based in
            Edmond, Oklahoma. It designs and builds software for people who
            need something real, not a slide deck.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-tight text-text sm:text-3xl">
              Why it exists
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-text-muted">
              <p>
                Most small businesses don’t need a twelve-person agency and a
                six-month timeline. They need one working product: a site
                that books appointments, a dashboard that replaces a
                spreadsheet, a CRM that remembers to follow up.
              </p>
              <p>
                Latchpoint Studios exists to build exactly that, at a pace
                and a price that fits a business still figuring out its
                next hire, not a business with a procurement department.
              </p>
              <p>
                It’s run by Terrence Finchum, who splits his time between
                real estate and building the software small teams actually
                use, which is part of why the products that come out of it
                get judged the same way: does it hold up when someone
                depends on it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-medium tracking-tight text-text sm:text-3xl">
              How it works
            </h2>
            <div className="mt-5 flex flex-col gap-6">
              {values.map((v) => (
                <div key={v.name} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-border-strong text-accent">
                    <v.icon weight="light" className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text">{v.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
