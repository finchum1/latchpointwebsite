"use client";

import { CalendarCheck, DeviceMobile, Key, MagnifyingGlass, PhoneCall, SealCheck } from "@phosphor-icons/react";
import { Logomark } from "../logomark";
import { BrainMap, type BrainCap, type BrainConfig, type BrainItem } from "../brain-map";

/**
 * The Websites hero: a map of what a good small-business website does (the discs) and the kinds of business it is built for
 * (the pills). Point at a kind of business and what its site needs lights up; point at one of the jobs and every kind of
 * business that relies on it does.
 */

const caps: BrainCap[] = [
  { id: "found", label: "Found", blurb: "Show up when people search for what you do, with the page titles, descriptions, and local details Google looks for.", at: [196, 225], above: true, Icon: MagnifyingGlass },
  { id: "trusted", label: "Trusted", blurb: "Reviews, photos, credentials, and plain answers, so a stranger feels sure about calling you.", at: [300, 170], above: true, Icon: SealCheck },
  { id: "contact", label: "Easy to reach", blurb: "A call button, a short form, and a map, so getting in touch takes one tap.", at: [404, 225], above: true, Icon: PhoneCall },
  { id: "book", label: "Bookings", blurb: "Let people book, request a quote, or ask a question without playing phone tag.", at: [404, 335], Icon: CalendarCheck },
  { id: "fast", label: "Fast on phones", blurb: "Most visitors arrive on a phone. Pages are designed for one first, and they load quickly.", at: [300, 390], Icon: DeviceMobile },
  { id: "own", label: "Yours", blurb: "Your domain, your hosting account, your content, handed over with the access to run it.", at: [196, 335], Icon: Key },
];

// Clockwise from the top left.
const items: BrainItem[] = [
  { id: "home", label: "Home services", blurb: "Plumbers, roofers, landscapers: found by the neighbor searching right now, with a one-tap call button and a quote form.", at: [210, 81], uses: ["found", "contact", "book", "trusted", "fast"] },
  { id: "food", label: "Restaurants", blurb: "Menu, hours, and directions that load fast on a phone, with ordering or reservations linked right in.", at: [390, 81], uses: ["found", "fast", "contact", "book"] },
  { id: "salon", label: "Salons & studios", blurb: "Your services and prices, your work on display, and a way to book, in your own style.", at: [517, 198], uses: ["book", "trusted", "fast", "found"] },
  { id: "clinic", label: "Clinics & offices", blurb: "Credentials, services, and how to get an appointment, laid out plainly for people who are a little nervous.", at: [517, 362], uses: ["trusted", "book", "contact", "found"] },
  { id: "shop", label: "Shops", blurb: "Your products, your story, and the details that bring people through the door.", at: [390, 479], uses: ["found", "fast", "trusted", "own"] },
  { id: "church", label: "Churches & nonprofits", blurb: "Events, ways to give or volunteer, and a site your team can keep current.", at: [210, 479], uses: ["contact", "own", "fast", "trusted"] },
  { id: "pro", label: "Local pros", blurb: "Inspectors, accountants, attorneys, agents: a site that shows you're the one to call.", at: [83, 362], uses: ["trusted", "found", "contact", "book", "own"] },
];

const config: BrainConfig = {
  ariaLabel: "Map of what a business website does and the kinds of business it is built for",
  centre: {
    label: "Your business",
    mark: <Logomark animated />,
    info: { title: "Your business", blurb: "One website, designed around what you sell and who buys it, doing the six jobs around it.", tag: "Built for you" },
  },
  caps,
  items,
  capTag: (_cap, used) => `What your site does · relied on by ${used.length} kinds of business`,
  itemTag: "A site we build",
  idea: {
    at: [83, 198],
    label: "Your business",
    ariaLabel: "Get a free quote: yours is next",
    href: "/contact",
    info: { title: "Yours is next", blurb: "Tell us what you do and we'll show you what your site could look like and what it costs.", tag: "Start here", href: "/contact", cta: "Get a free quote" },
  },
  plainLinks: true,
  defaultInfo: {
    title: "Every kind of business, built to fit.",
    blurb: "Hover or tap a business to see what its website does for it.",
  },
};

export function WebsitesBrain() {
  return <BrainMap config={config} />;
}
