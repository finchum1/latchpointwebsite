import type { Metadata } from "next";
import Image from "next/image";
import { Browser } from "@phosphor-icons/react/dist/ssr";
import { BrowserFrame, PhoneFrame } from "@/components/realestate/frames";
import { Feature, CtaBand } from "@/components/subsite/parts";
import { GroupHeader, SAMPLE } from "@/components/realestate/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/website", "The website: Latchpoint Real Estate", "A site that looks like you and keeps itself current: templates, blog, listings, landing pages, and more, all edited from your dashboard.");

export default function RealEstateWebsite() {
  return (
    <>
      {/* ----------------------------- Website ----------------------------- */}
      <section className="">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <GroupHeader
          h1
            id="website"
            icon={<Browser weight="regular" className="size-5" />}
            title="The website"
            body="A site that looks like you, and keeps itself current."
          />

          <div className="mt-16 flex flex-col gap-24">
            <Feature
              eyebrow="Agent sites"
              title="Your own site, from a template you pick."
              body="Start from one of three finished looks, then make it yours: your photos, your logo, your accent color, and the pages and sections you want. Every site is built phone-first, because that's where your clients are."
              bullets={[
                "Three starter templates: luxury minimal, warm editorial, and guide cards",
                "Six header styles and five footers, with the menu in the order you choose",
                "Your own domain, with old URLs redirected so you keep your search rankings",
                "Inquiry forms that filter spam, confirm to the visitor, and land straight in your leads",
              ]}
              visual={
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { src: "/realestate/site-luxury.jpg", name: "Luxury minimal", cls: "col-span-3 self-stretch" },
                    { src: "/realestate/site-warm.jpg", name: "Warm editorial", cls: "col-span-2 aspect-[16/10]" },
                    { src: "/realestate/site-guide.jpg", name: "Guide cards", cls: "col-span-2 col-start-4 aspect-[16/10]" },
                  ].map((t, i) => (
                    <figure
                      key={t.name}
                      className={`relative overflow-hidden rounded-[10px] border border-border-strong bg-bg-elevated shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ${t.cls} ${i === 0 ? "row-span-2 row-start-1" : ""}`}
                    >
                      <Image src={t.src} alt={`The ${t.name} template, shown on a sample agent site`} fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-cover object-top" />
                      <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{t.name}</figcaption>
                    </figure>
                  ))}
                </div>
              }
              caption={SAMPLE}
              flip
            />

            <Feature
              eyebrow="Compare templates"
              title="Let your agents choose their own look."
              body="Make a private link and the agent sees their own site in every layout, with a choice of colors, header, and footer. They scroll around, pick the one they like, and you get an email with their choice. No sign-in, and it works while the site is still a draft."
              bullets={[
                "Live previews with their real photo, bio, and listings, not stock mockups",
                "Looking changes nothing; the site only changes when you apply their pick",
                "Apply a whole template in one click, then save; your photos and words stay",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-site-compare.jpg"
                  alt="Compare templates: a site shown in every layout, with color, header, and footer choices"
                  url="yourbrokerage.com/dashboard/site/compare"
                  ratio="aspect-[16/10]"
                />
              }
              caption={SAMPLE}
            />

            <Feature
              flip
              eyebrow="Pages that bring in leads"
              title="Sellers, buyers, and a home value page, ready to go."
              body="Every agent site comes with guide-style pages for sellers and buyers and a home value page with an address box. Each form lands in your leads tagged with the page it came from, and a home value request adds a 'pull comps' task to your list for the next day."
              bullets={[
                "A step-by-step seller and buyer journey that is ready on day one",
                "Buyer and seller cards on the home page, in the order you pick",
                "A Recently Sold section and a Past Sales page, copied from your closed listings",
                "Up to three pinned blog posts leading your blog page",
              ]}
              visual={
                <div className="relative pb-6 pr-0 sm:pr-20">
                  <BrowserFrame
                    src="/realestate/site-sellers.jpg"
                    alt="A seller's page on an agent site, with a guide to the selling journey"
                    url="youragent.com/sellers"
                    ratio="aspect-[16/10]"
                  />
                  <figure className="absolute -bottom-2 right-0 hidden w-[44%] overflow-hidden rounded-[12px] border border-border-strong bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:block">
                    <Image src="/realestate/site-past-sales.jpg" alt="The Past Sales page, a grid of recently sold homes" width={2400} height={1500} className="h-auto w-full" sizes="(min-width: 1024px) 22vw, 44vw" />
                  </figure>
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Listings"
              title="A property site for every listing."
              body="Fill out a form and the listing has its own site: hero photo or video, gallery, features, map, and a tour request. No new repo, no redeploy, no waiting on a developer."
              bullets={[
                "Change a listing's status and the live site updates the moment you do",
                "One video per listing, playing behind the hero or above the gallery",
                "Open houses appear as a banner on the listing",
                "A live check on each property's custom domain, with an alert if it stops responding",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/listing-hero.jpg"
                  alt="A listing's property website with hero photo, price, and key stats"
                  url="youragency.com/listings/1645-saratoga-way"
                />
              }
            />

            <Feature
              flip
              eyebrow="Visitor analytics"
              title="Know who's looking at every listing."
              body="Every property site reports how many people looked, where they came from, and what they did. Give each place you share a listing its own link, and you'll see which one is working. Sellers get a private report page with the same numbers."
              bullets={[
                "Views, unique visitors, time on page, and how far people scrolled",
                "Tagged links for Facebook, Instagram, email, text, MLS, and a QR code on the flyer",
                "A seller report link that never shows inquiry names or contact details",
                "An optional Monday email to you with last week's numbers",
              ]}
              visual={
                <div className="relative pb-6 pl-0 sm:pl-16">
                  <BrowserFrame
                    src="/realestate/dash-analytics.jpg"
                    alt="A listing's analytics: views by day, where visitors came from, devices, and how far they got"
                    url="yourbrokerage.com/dashboard/listings/analytics"
                    ratio="aspect-[2400/1856]"
                  />
                  <PhoneFrame
                    src="/realestate/m-report.jpg"
                    alt="The seller report page on a phone"
                    className="absolute -bottom-2 left-0 hidden w-[124px] sm:block"
                    sizes="124px"
                  />
                </div>
              }
              caption={SAMPLE}
            />

            <Feature
              eyebrow="Flyers"
              title="Print-ready flyers, in three styles."
              body="Every listing makes a one-page flyer from the same details as its website. Pick Classic, Minimal editorial, or Luxury dark, choose the photos and features, and the page checks that it all fits on one printed sheet."
              bullets={[
                "A QR code that sends scans to the listing site, counted in your analytics",
                "A fit check that shows how much room is left, and trims the blurb to fit for you",
                "Print or save as a PDF straight from the page",
              ]}
              visual={
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { src: "/realestate/flyer-classic.jpg", name: "Classic" },
                    { src: "/realestate/flyer-editorial.jpg", name: "Minimal editorial" },
                    { src: "/realestate/flyer-luxury.jpg", name: "Luxury dark" },
                  ].map((f) => (
                    <figure key={f.name} className="overflow-hidden rounded-[8px] border border-border-strong bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
                      <Image src={f.src} alt={`The ${f.name} flyer`} width={1632} height={2112} className="h-auto w-full" sizes="(min-width: 1024px) 14vw, 30vw" />
                      <figcaption className="bg-bg-elevated px-2 py-1.5 text-center text-[11px] text-text-muted">{f.name}</figcaption>
                    </figure>
                  ))}
                </div>
              }
              caption={SAMPLE}
              flip
            />

            <Feature
              eyebrow="Blog"
              title="A blog you'll actually keep up."
              body="Neighborhood guides, local features, and market notes are how an agent gets found. The editor, the calendar, and the checklist are built to make a weekly post the easy thing to do."
              bullets={[
                "Select text and the formatting menu appears right above it",
                "Schedule posts ahead, with a calendar that shows the gaps",
                "A publish checklist: title, category, excerpt, cover photo, and a real length",
                "Post views, all-time and last 30 days, with your top post",
                "Moving over from another site? Your old posts can be imported",
              ]}
              visual={
                <BrowserFrame
                  src="/realestate/dash-blog-editor.png"
                  alt="The blog editor with the formatting menu floating above selected text"
                  url="yourbrokerage.com/dashboard/site/blog"
                  ratio="aspect-[2190/1035]"
                />
              }
              caption={SAMPLE}
            />
          </div>
        </div>
      </section>
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
