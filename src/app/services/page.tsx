import type { Metadata } from "next";
import {
  Browser,
  ChartBar,
  Check,
  Devices,
  House,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/services";
import { Reveal } from "@/components/reveal";
import { ProcessSteps } from "@/components/process-steps";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web apps, dashboards, personal apps, and CRMs, designed and built by Latchpoint Studios.",
};

const icons = [Browser, Devices, ChartBar, House, UsersThree];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <Reveal>
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-text sm:text-5xl">
            Services
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Five kinds of software, one team building all of them. Pick a
            starting point below, or tell us what you’re solving for and
            we’ll figure out the shape together.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col divide-y divide-border border-y border-border">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.name} delay={i * 0.04}>
                <div
                  className={`grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 ${
                    i % 2 === 1 ? "bg-bg-elevated/40" : ""
                  }`}
                >
                  <div className="lg:col-span-4">
                    <div className="flex size-12 items-center justify-center rounded-[10px] border border-border-strong text-accent">
                      <Icon weight="light" className="size-6" />
                    </div>
                    <h2 className="mt-5 text-2xl font-medium tracking-tight text-text">{s.name}</h2>
                    <p className="mt-1.5 text-sm text-text-muted">{s.tagline}</p>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-base leading-relaxed text-text-muted">{s.description}</p>
                  </div>

                  <div className="lg:col-span-4">
                    <ul className="flex flex-col gap-3">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ProcessSteps />
      <CTASection />
    </>
  );
}
