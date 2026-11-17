"use client";

import { AddressBook, Browser, CalendarBlank, Handshake, Kanban, Robot } from "@phosphor-icons/react";
import { Logomark } from "../logomark";
import { BrainMap, type BrainCap, type BrainConfig, type BrainItem } from "../brain-map";

/**
 * The Real Estate hero: a map of what comes with Latchpoint Real Estate. The discs are the parts of the product (the
 * website, your day, contacts, the pipeline, deals, your AI); the pills are what you get out of them. Point at one and
 * everything it works with lights up. Every line here is something the product does today.
 */

const caps: BrainCap[] = [
  { id: "website", label: "Website", blurb: "Your own site on your own domain, from a template you pick, with a blog and a page for every listing.", at: [196, 225], above: true, Icon: Browser },
  { id: "day", label: "Your day", blurb: "An hourly schedule that syncs with Google Calendar, with new inquiries, tasks, and who to follow up with today.", at: [300, 170], above: true, Icon: CalendarBlank },
  { id: "ai", label: "Your AI", blurb: "Connect Claude, ChatGPT, or Grok and ask it to draft follow-ups, add a lead, or set a reminder.", at: [404, 225], above: true, Icon: Robot },
  { id: "deals", label: "Deals", blurb: "Key dates, checklists, a coordinator, and compliance review on one board, from contract to close.", at: [404, 335], Icon: Handshake },
  { id: "pipeline", label: "Pipeline", blurb: "Drag people between columns. Every column has its own follow-up rhythm, so the next call is always on your list.", at: [300, 390], Icon: Kanban },
  { id: "contacts", label: "Contacts", blurb: "Your own private database with tags and keep-in-touch reminders, so nobody you know slips away.", at: [196, 335], Icon: AddressBook },
];

// Clockwise from the way in.
const items: BrainItem[] = [
  { id: "listings", label: "Listing sites", blurb: "A property site for every listing: photos, video, a map, and a link to send the seller their own report.", at: [210, 81], uses: ["website", "pipeline"] },
  { id: "analytics", label: "Visitor analytics", blurb: "Views, visitors, and where they came from, with tagged links so you know which post or flyer worked.", at: [390, 81], uses: ["website", "pipeline"] },
  { id: "flyers", label: "Flyers", blurb: "Three print-ready styles, filled in from the listing. Print one or save it as a PDF.", at: [517, 198], uses: ["website"] },
  { id: "blog", label: "Blog", blurb: "A post calendar, pinned posts, and a Recently Sold section under your listings.", at: [517, 362], uses: ["website", "ai"] },
  { id: "clients", label: "Client links", blurb: "A closing timeline for each client, with your name and photo on it, and no login to forget.", at: [390, 479], uses: ["deals", "contacts"] },
  { id: "coordinator", label: "Coordinator", blurb: "Bring your transaction coordinator and your compliance reviewer in, with just the access they need.", at: [210, 479], uses: ["deals", "day"] },
  { id: "keep", label: "Keep in touch", blurb: "Reminders for the people you haven't talked to in a while, so the relationship doesn't go quiet.", at: [83, 362], uses: ["contacts", "day", "ai"] },
];

const config: BrainConfig = {
  ariaLabel: "Map of what comes with Latchpoint Real Estate",
  centre: {
    label: "Latchpoint Real Estate",
    mark: <Logomark animated />,
    info: { title: "Latchpoint Real Estate", blurb: "A website and a back office, one login, built and maintained for you.", tag: "One login" },
  },
  caps,
  items,
  capTag: (_cap, used) => `Included · connects to ${used.length} ${used.length === 1 ? "thing" : "things"}`,
  itemTag: "Included",
  idea: {
    at: [83, 198],
    label: "Request access",
    ariaLabel: "Request early access: yours is next",
    href: "#early-access",
    info: { title: "Yours is next", blurb: "Tell me about your site and your office, and I'll set you up.", tag: "Start here", href: "#early-access", cta: "Request early access" },
  },
  defaultInfo: {
    title: "A website and a back office, connected.",
    blurb: "Hover or tap anything to see what it does and what it works with.",
  },
};

export function RealEstateBrain() {
  return <BrainMap config={config} />;
}
