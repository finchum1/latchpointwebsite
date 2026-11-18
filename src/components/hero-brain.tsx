"use client";

import { AppWindow, Browser, Kanban, Robot, SquaresFour, UsersThree } from "@phosphor-icons/react";
import { Logomark } from "./logomark";
import { BrainMap, type BrainCap, type BrainConfig, type BrainItem } from "./brain-map";

/**
 * The homepage's map of the studio: what Latchpoint can build (the discs),
 * what it has built (the pills), and the empty slot where the next one goes.
 */

const caps: BrainCap[] = [
  { id: "websites", label: "Websites", blurb: "Marketing sites and agent sites that look sharp and turn visitors into leads.", at: [196, 225], above: true, Icon: Browser },
  { id: "dashboards", label: "Dashboards", blurb: "One screen that shows how the business is doing, built around the numbers you check.", at: [300, 170], above: true, Icon: SquaresFour },
  { id: "portals", label: "Client portals", blurb: "A private link where a client sees where things stand, with no login to forget.", at: [404, 225], above: true, Icon: UsersThree },
  { id: "crms", label: "CRMs", blurb: "Contacts, leads, and pipeline that follow up on a schedule you set.", at: [404, 335], Icon: Kanban },
  { id: "ai", label: "AI assistants", blurb: "Your own assistant working inside your data, so you can ask it instead of clicking.", at: [300, 390], Icon: Robot },
  { id: "apps", label: "Web apps", blurb: "Full products with sign-up, accounts, and payments, installable on a phone.", at: [196, 335], Icon: AppWindow },
];

const items: BrainItem[] = [
  { id: "finchum", label: "Terrence Finchum", blurb: "A personal agent website built around one listing at a time.", at: [210, 81], href: "/work#terrence-finchum", uses: ["websites"] },
  { id: "realestate", label: "Real Estate", title: "Latchpoint Real Estate", blurb: "Latchpoint Real Estate: an agent's website and the back office behind it.", at: [390, 81], href: "/work#latchpoint-real-estate", uses: ["websites", "dashboards", "crms", "portals", "ai"] },
  { id: "close", label: "Close", title: "Latchpoint Close", blurb: "Latchpoint Close: transaction coordination with a live link to every file.", at: [517, 198], href: "https://close.latchpointstudios.com", external: true, uses: ["portals", "dashboards"] },
  { id: "film", label: "Oklahoma Film", blurb: "Oklahoma Film Solutions: a film-services site and the private back office behind it.", at: [517, 362], href: "/work#oklahoma-film-solutions", uses: ["websites", "dashboards"] },
  { id: "solobooks", label: "Solo Books", blurb: "Books, budgets, bank matching, and payroll for every business you run.", at: [210, 479], href: "/work#solo-books", uses: ["apps", "dashboards", "ai"] },
  { id: "shine", label: "Shine Ministries", blurb: "A public ministry site and the back office the team runs on.", at: [83, 362], href: "/work#shine-ministries", uses: ["websites", "dashboards", "apps"] },
  { id: "thrively", label: "Thrively", blurb: "A booking-first website for a licensed home inspector.", at: [83, 198], href: "/work#thrively-inspections", uses: ["websites"] },
];

const config: BrainConfig = {
  ariaLabel: "Map of what Latchpoint Studios builds",
  centre: {
    label: "Latchpoint Studios",
    mark: <Logomark animated />,
    info: { title: "Latchpoint Studios", blurb: "One studio designing and shipping the software behind each of these, usually in weeks.", tag: "The studio" },
  },
  caps,
  items,
  capTag: (_cap, used) => `We build this · used in ${used.length} live ${used.length === 1 ? "product" : "products"}`,
  itemTag: "Live",
  itemCta: (item) => (item.external ? "Visit the live site" : "See it in our work"),
  idea: {
    at: [390, 479],
    label: "Your idea",
    ariaLabel: "Start a project: yours is next",
    href: "/contact",
    info: { title: "Yours is next", blurb: "Tell us what your business runs on and we'll add it to the map.", tag: "Start a project", href: "/contact", cta: "Start a project" },
  },
  defaultInfo: {
    title: "Everything we build connects.",
    blurb: "Hover or tap a node to see what runs on what. Every product here is live.",
  },
};

export function HeroBrain() {
  return <BrainMap config={config} />;
}
