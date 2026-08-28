import { Storefront, Key, House, HandHeart } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Audience } from "./projects";

export type Solution = {
  slug: string;
  audience: Audience;
  name: string;
  navDescription: string;
  tagline: string;
  description: string;
  icon: Icon;
  capabilities: string[];
};

export const solutions: Solution[] = [
  {
    slug: "small-business",
    audience: "small-business",
    name: "Small Business",
    navDescription: "Booking sites, invoicing, and a back office that fits.",
    tagline: "Software for a business that's still doing its own books.",
    description:
      "A site that books the job, a dashboard that replaces the spreadsheet, and a back office that remembers who owes you money.",
    icon: Storefront,
    capabilities: [
      "Booking and lead-gen websites",
      "Invoicing, quotes, and billing",
      "Customer and job tracking",
      "A dashboard your team actually opens",
    ],
  },
  {
    slug: "real-estate",
    audience: "real-estate",
    name: "Real Estate",
    navDescription: "Agent sites, brokerage dashboards, live listings.",
    tagline: "Software for agents and brokerages who live in listings.",
    description:
      "Agent sites, brokerage dashboards, and a listings system that updates itself the moment a deal changes.",
    icon: Key,
    capabilities: [
      "Agent and brokerage websites",
      "Listing management, no redeploys needed",
      "Buyer and seller lead capture",
      "Multi-agent dashboards",
    ],
  },
  {
    slug: "personal",
    audience: "personal",
    name: "Personal",
    navDescription: "Private tools for exactly one household.",
    tagline: "Software for exactly one household, not a product with your name on it.",
    description:
      "Private tools shaped around your actual routine: money, goals, whatever you're tracking on a spreadsheet that deserves better.",
    icon: House,
    capabilities: [
      "Private finance and budget trackers",
      "Family or household organizers",
      "Personal goal and habit tools",
      "Invite-only, on your own domain",
    ],
  },
  {
    slug: "nonprofits-ministries",
    audience: "nonprofit",
    name: "Nonprofits & Ministries",
    navDescription: "Members, giving, and events, kept organized.",
    tagline: "A back office that keeps a mission-driven team organized.",
    description:
      "Member directories, giving and donation tracking, event and volunteer coordination, all in one place, with nothing you don't need.",
    icon: HandHeart,
    capabilities: [
      "Member and donor directories",
      "Giving and donation tracking",
      "Event and volunteer scheduling",
      "A back office built around your team, not a generic template",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
