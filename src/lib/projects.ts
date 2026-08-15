export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "oaksteadly",
    name: "Oaksteadly",
    category: "Personal finance app",
    summary: "A debts, bills, and goals dashboard for a family managing money together.",
    description:
      "A private, self-serve finance tracker built for a single household. Debt payoff by category, recurring bills with due dates, and shared goals, synced across every device with its own sign-up flow.",
    image: "/work/oaksteadly.png",
    url: "https://oaksteadly-sooty-three.vercel.app",
    tags: ["Next.js", "Supabase", "Auth"],
    year: "2026",
  },
  {
    slug: "evertill",
    name: "Evertill",
    category: "Team dashboard",
    summary: "Tasks and notes for everyone, plus leads, pipeline, and deals for teams that need them.",
    description:
      "A workspace dashboard that starts simple, tasks and notes, and grows into a lightweight CRM when a team turns on leads, pipeline, and deals. Drag-and-drop boards, recurring task roll-forward, and a quick-add inbox.",
    image: "/work/evertill.png",
    url: "https://evertill-gules.vercel.app",
    tags: ["Next.js", "Postgres", "Drag & drop"],
    year: "2026",
  },
  {
    slug: "the-agency-listings",
    name: "The Agency Listings",
    category: "Multi-user SaaS platform",
    summary: "Every listing gets its own site the moment an agent fills out a form.",
    description:
      "A listings manager for a real estate brokerage. Agents create a property site by filling out a form, update status the moment a deal changes, and see every listing across the brokerage in one dashboard, no redeploys.",
    image: "/work/listings.png",
    url: "https://the-agency-listings.vercel.app",
    tags: ["Next.js", "Supabase", "Multi-tenant"],
    year: "2026",
  },
  {
    slug: "the-agency-oklahoma",
    name: "The Agency Oklahoma",
    category: "Brand website",
    summary: "A boutique brokerage site built to feel like fifty years of Oklahoma real estate.",
    description:
      "The public face of a boutique brokerage: full-bleed photography, neighborhood guides, and a search-first homepage designed to put listings in front of buyers within one click.",
    image: "/work/agencyok.png",
    url: "https://the-agency-oklahoma.vercel.app",
    tags: ["Next.js", "Marketing site"],
    year: "2026",
  },
  {
    slug: "thrively-inspections",
    name: "Thrively Inspections",
    category: "Small business website",
    summary: "A booking-first marketing site for a licensed home inspector.",
    description:
      "A conversion-focused site for a solo home inspection business: clear credentials, a service-area map, and a schedule flow that turns a nervous home buyer into a booked inspection.",
    image: "/work/thrively.png",
    url: "https://thrively-inspections.vercel.app",
    tags: ["Next.js", "Vercel", "Lead gen"],
    year: "2026",
  },
];
