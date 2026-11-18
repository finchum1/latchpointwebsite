import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow, CtaBand } from "@/components/subsite/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/faq", "Questions: Latchpoint Real Estate", "Answers to what agents and brokerages ask first about Latchpoint Real Estate.");

export default function RealEstateFaq() {
  return (
    <>
      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-24">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h1 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            Things agents ask first.
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 divide-y divide-border border-y border-border">
          {[
            {
              q: "What does it cost?",
              a: "$500 to set up, then $150 a month. There are no contracts, so you pay month to month.",
            },
            {
              q: "When can I get in?",
              a: "We're inviting people in a few at a time, by hand. Request early access and we'll email you to set up a short call when there's a spot.",
            },
            {
              q: "Can I use my own AI, like Claude, ChatGPT, or Grok?",
              a: "Yes. You can connect the assistant you already use to your dashboard, and ask it to draft follow-up texts, add a lead, set a reminder, or write a blog post. It works with your own contacts, leads, and deals. Texts and emails are saved as drafts for you to send yourself, and it can't delete your records. Your admin switches AI access on one agent at a time, and every action is logged.",
            },
            {
              q: "Do I need to be technical?",
              a: "No. Editing a listing, writing a post, or updating a lead is a form. If you can use your email, you can run this.",
            },
            {
              q: "I already have a website and a blog. Can you move them?",
              a: "Yes. Posts can be imported from your current site, and old URLs are redirected to the new ones with permanent redirects, so links and search rankings carry over.",
            },
            {
              q: "Does it work with Google Calendar?",
              a: "Yes. Connect your Google account, choose the calendars to show, and your schedule appears on the dashboard. Add or edit an appointment there and it updates in Google Calendar, and changes in Google show up in the dashboard. You can disconnect at any time.",
            },
            {
              q: "Does it work on my phone?",
              a: "Yes. Your site is built phone-first, and the dashboard installs to your home screen like an app, so checking a lead between showings takes a tap.",
            },
            {
              q: "Can people on my team see different things?",
              a: "Yes. Each person can have full website access, blog-only access, or none, and the contacts, leads, pipeline, and deals tools are switched on per agent. Your contacts and leads stay private to you; deals can be shared with a coordinator or a compliance reviewer you choose.",
            },
            {
              q: "Can my clients see where their deal stands?",
              a: "Yes. You send a private link that shows their closing timeline, with a countdown, what's done, what's coming, and who's helping. It never shows price, commission, or your internal checklist, and you can turn the link off whenever you like.",
            },
            {
              q: "Can I see who's looking at my listings?",
              a: "Yes. Each property site reports views, visitors, where they came from, and how far they got. Give every place you share a listing its own link and you'll see which one works, and send the seller a private report page with the same numbers.",
            },
            {
              q: "Can I choose how my website looks?",
              a: "Yes. Start from one of three templates, pick your colors, a header and a footer, and set the order of your pages. You can also send your agents a private link where they see their site in every layout and pick the one they like.",
            },
            {
              q: "Will it look like my brokerage?",
              a: "It will look like you. Each office gets its own logo, colors, photography, and domain, and your agents' sites follow your brand.",
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
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
