import type { Metadata } from "next";
import Image from "next/image";
import { Kanban } from "@phosphor-icons/react/dist/ssr";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import { Feature, CtaBand } from "@/components/subsite/parts";
import { GroupHeader, SAMPLE } from "@/components/realestate/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/back-office", "The back office: Latchpoint Real Estate", "Contacts, leads, pipeline, deals, vendors, and analytics in one dashboard, with the website and the back office on one login.");

export default function RealEstateBackOffice() {
  return (
    <>
      {/* --------------------------- Back office --------------------------- */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <GroupHeader
          h1
            id="back-office"
            icon={<Kanban weight="regular" className="size-5" />}
            title="The back office"
            body="Contacts, leads, pipeline, and deals, laid out the way agents think."
          />

          <div className="mt-16 flex flex-col gap-24">
            <Feature
              eyebrow="Overview"
              title="Your whole book at a glance."
              body="Leads, pipeline, and deals by stage, the key dates coming up in the next two weeks, and the follow-ups due today, on one page."
              bullets={[
                "Open deals, expected commission, and closed volume for the year",
                "Inspections, appraisals, and closings in date order",
                "Open anyone from a follow-up and call, text, or email in one tap",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-overview.png"
                  alt="The People overview with counts by stage, key dates, and follow-ups"
                  url="yourbrokerage.com/dashboard/people/overview"
                  ratio="aspect-[1500/860]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Contacts"
              title="Everyone you know, in one private database."
              body="Your sphere, past clients, referral partners, lenders, and vendors, with tags, notes, and a keep-in-touch reminder for each person. It's yours alone: no one else in your office can see your contacts."
              bullets={[
                "Tag people and save a filter as a smart list, like 'Due for a touch' or 'Holiday cards'",
                "Log a call, text, email, meeting, or showing, and 'last in touch' updates itself",
                "Import from a spreadsheet and merge duplicates into one record",
                "Every lead, pipeline, and deal card links back to its contact",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-contacts.jpg"
                  alt="The Contacts page with tags, relationship, last contact, and saved smart lists"
                  url="yourbrokerage.com/dashboard/people/contacts"
                  ratio="aspect-[16/10]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Leads"
              title="Every lead has a next step."
              body="Website inquiries, open house sign-ins, and referrals land on a board. Each column sets its own follow-up rhythm, so fresh leads come up every day and slower ones every couple of weeks. Anything overdue turns red, so the person you meant to call doesn't slip."
              bullets={[
                "Tag each person as a buyer, a seller, or both",
                "Board or list view, with search and filters, including 'due now'",
                "Call, text, or email from inside the card, and it counts as a touch",
                "Columns you can rename, reorder, and add",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-leads.jpg"
                  alt="The Leads board with follow-up cadence on every column, buyer and seller tags, and follow-up dates"
                  url="yourbrokerage.com/dashboard/people/leads"
                  ratio="aspect-[2400/1120]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Pipeline"
              title="A pipeline that looks past this month."
              body="Your sphere, your someday-buyers, and the sellers who'll list in spring, all in one place and sorted by how soon they're likely to move. The same board, the same follow-up rhythm, a longer horizon."
              bullets={[
                "Stages from 12+ months out to active, or whatever fits how you work",
                "Everyone you're nurturing, visible at a glance",
                "Move a card as the timeline changes",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-pipeline.jpg"
                  alt="The Pipeline board, from 12 months out to active"
                  url="yourbrokerage.com/dashboard/people/pipeline"
                  ratio="aspect-[2400/1120]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Deals"
              title="Under contract, nothing forgotten."
              body="Deals have their own place in the dashboard. Each one gets its key dates, the numbers, the title and lender, and buyer or seller checklists for tasks and documents, with deadlines counted from the contract date. Progress rings show how far along every deal is."
              bullets={[
                "An overview of what needs you now and what's coming in the next two weeks",
                "Contract, inspection, appraisal, financing, and closing dates, plus earnest money",
                "A task checklist and a document list, with seller and buyer versions you can edit",
                "Open deals, expected commission, and closed volume on your Overview",
              ]}
              visual={
                <div className="relative pb-24 sm:pb-28">
                  <BrowserFrame
                    src="/realestate/dash-deals.jpg"
                    alt="The Deals page with needs-your-attention, coming-up dates, and deal totals"
                    url="yourbrokerage.com/dashboard/deals"
                    ratio="aspect-[16/10]"
                  />
                  <figure className="absolute -bottom-2 right-3 w-[62%] overflow-hidden rounded-[14px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:w-[48%]">
                    <Image
                      src="/realestate/dash-deal-tasks.jpg"
                      alt="A deal's task checklist with a progress ring"
                      width={1700}
                      height={1517}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 28vw, 60vw"
                    />
                  </figure>
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Coordinators and compliance"
              title="Bring your coordinator and your compliance reviewer in."
              body="Pick a transaction coordinator for each deal and they see and work just that deal, with the agent kept informed. A compliance reviewer can read every deal's documents, mark each one approved or send it back with a note, and the agent gets an email when something comes back."
              bullets={[
                "A coordinator can start a deal on an agent's behalf, and the agent is emailed",
                "Agents submit a deal for review; reviewers approve it or send it back with a note",
                "A message thread on each deal keeps the conversation with the paperwork",
                "Optional milestone emails and a Monday summary from the coordinator keep agents in the loop",
              ]}
              visual={
                <figure className="mx-auto max-w-[520px] overflow-hidden rounded-[16px] border border-border-strong bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/realestate/dash-deal-panel.jpg"
                    alt="A deal's side panel: the address, stage, closing countdown, and tabs for tasks, documents, messages, and details"
                    width={1700}
                    height={1945}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                </figure>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="For your clients"
              title="Show clients where they stand."
              body="Send a buyer or seller a private link that shows their closing timeline: a countdown, what's done, what's still coming, and who's helping. It never shows price, commission, or your checklist. Send a vendor list the same way, and clients get your recommended inspector, mover, or plumber with a tap to call."
              bullets={[
                "A timeline page branded with you, with a personal note from you or your coordinator",
                "Links you can switch off at any time, and that expire on their own",
                "A preferred-vendor list for the whole office, shared with just the vendors you tick",
              ]}
              visual={
                <div className="flex items-start justify-center gap-4 sm:gap-6">
                  <PhoneFrame src="/realestate/m-timeline.jpg" alt="A client's closing timeline page on a phone" className="w-[44%] max-w-[210px]" sizes="210px" />
                  <PhoneFrame src="/realestate/m-vendors.jpg" alt="A vendor list shared with a client, on a phone" className="mt-10 w-[44%] max-w-[210px]" sizes="210px" />
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Listings"
              title="One place to manage every listing."
              body="Status, price, photos, and open houses live in a single dashboard. Change a status from the list and the listing's site reflects it right away."
              bullets={[
                "Add photos, pick the hero shot, and schedule open houses",
                "Upcoming listings tracked before they hit the market",
                "A brokerage-wide view when you manage more than one agent",
                "An office analytics page for brokers: views, sources, and agent websites, with a CSV export",
              ]}
              visual={
                <figure className="overflow-hidden rounded-[14px] border border-border-strong shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
                  <Image
                    src="/realestate/editor.png"
                    alt="The listing editor with photos and open house scheduling"
                    width={560}
                    height={508}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </figure>
              }
            />
          </div>
        </div>
      </section>
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
