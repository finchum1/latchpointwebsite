import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { websitesMetadata } from "@/components/websites/meta";

export const metadata: Metadata = websitesMetadata("/faq", "Questions: Latchpoint Websites", "Answers to what people ask first about getting a small business website: cost, timing, ownership, and more.");

export default function WebsitesFaq() {
  return (
    <>
      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things people ask first.
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 divide-y divide-border border-y border-border">
          {[
            {
              q: "How much does a website cost?",
              a: "Sites start at $500 to set up, then $100 a month for hosting, updates, and small changes. Bigger or more custom sites cost more, and we quote those after a short call. You see the price in writing before anything starts.",
            },
            {
              q: "How long does it take?",
              a: "About two weeks from our first call for a typical small business site. The biggest factor is how quickly we get your photos and the details of what you do. Larger or custom sites take longer, and we tell you up front.",
            },
            {
              q: "Do I own the website?",
              a: "Your domain is registered in your name and your content is yours. The monthly plan covers hosting and keeping the site running and up to date.",
            },
            {
              q: "I already have a website. Can you redo it?",
              a: "Yes. We'll look at what's working, move over what should stay, and redirect your old addresses so the search ranking you've earned comes with you.",
            },
            {
              q: "Will people find it on Google?",
              a: "We build it the way search engines like: fast, mobile-friendly, with clear titles and descriptions and your local details marked up. No one can honestly promise a number-one spot, but we make sure the foundation is right.",
            },
            {
              q: "Can it take bookings, quotes, or payments?",
              a: "Yes. We can add online booking, a quote request form, or payments, and send form messages straight to your email. If you need more than that, see what else the studio builds.",
            },
            {
              q: "Can I update it myself?",
              a: "Tell us on the first call what you expect to change often, and we'll set it up so that's easy. For everything else, just ask us.",
            },
            {
              q: "Do you only work with local businesses?",
              a: "We're in Edmond, Oklahoma, and many of our customers are in the Oklahoma City metro, but we build for anyone, anywhere. A phone or video call works fine.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-text [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted transition-transform duration-300 group-open:rotate-45">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </section>
      <CtaBand title="Ready for a website that works?" body="Tell us about your business and we'll reach out by the end of the next business day." label="Get a free quote" />
    </>
  );
}
