import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/subsite/parts";
import { CloseReviewForm } from "@/components/close/close-review-form";
import { closeMetadata } from "@/components/close/meta";

// This page is for people who already worked with me (I send them the link), so it stays out of search results.
export const metadata: Metadata = { ...closeMetadata("/review", "Leave a review: Latchpoint Close", "Worked with Latchpoint Close? Tell other agents how it went."), robots: { index: false, follow: true } };

export default function CloseReview() {
  return (
    <section className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Your review</Eyebrow>
              <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">How did your file go?</h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                A few honest sentences help other Oklahoma agents decide if I&rsquo;m a good fit. It takes about two minutes. I read every one.
              </p>
              <p className="mt-6 text-sm text-text-muted">Nothing appears on the site until I&rsquo;ve looked at it, and I never change what you wrote.</p>
            </div>
            <div className="lg:col-span-7">
              <CloseReviewForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
