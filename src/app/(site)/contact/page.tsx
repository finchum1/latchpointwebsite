import type { Metadata } from "next";
import { EnvelopeSimple, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Latchpoint Studios.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-12">
        <Reveal className="lg:col-span-2">
          <h1 className="text-4xl font-medium tracking-tight text-text sm:text-5xl">
            Start a project
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-text-muted">
            Tell us what you’re building. A real reply from a real person,
            not an autoresponder.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <EnvelopeSimple weight="light" className="mt-0.5 size-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-text">Email</p>
                <a
                  href="mailto:hello@latchpointstudios.com"
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  hello@latchpointstudios.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock weight="light" className="mt-0.5 size-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-text">Response time</p>
                <p className="text-sm text-text-muted">Within one business day</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
