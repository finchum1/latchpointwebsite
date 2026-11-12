export type Audience = "small-business" | "real-estate" | "personal" | "nonprofit";

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
  audience: Audience;
};

export const projects: Project[] = [
  {
    slug: "latchpoint-real-estate",
    name: "Latchpoint Real Estate",
    category: "Website and back office for agents",
    summary: "An agent's website and the dashboard behind it, built and maintained for them.",
    description:
      "A real estate website with a full back office behind it: templates, blog, contacts, leads, pipeline, deals, and a schedule that syncs with Google Calendar. Agents get a site that is theirs, and a dashboard that runs the day. Latchpoint builds it, moves the agent over, and keeps it running.",
    image: "/work/latchpoint-real-estate.jpg",
    url: "https://realestate.latchpointstudios.com",
    tags: ["Next.js", "Supabase", "Multi-tenant"],
    year: "2026",
    audience: "real-estate",
  },
  {
    slug: "oklahoma-film-solutions",
    name: "Oklahoma Film Solutions",
    category: "Business website & back office",
    summary: "One point of contact for on-set engineering, remediation, cleaning, trades, and security.",
    description:
      "The public site for a company that supplies film productions with on-site services, built around a single request form. Behind it, a private back office keeps vendors, job pricing, and branded quotes and invoices in one place, so a production gets one clean number instead of five vendors' bills.",
    image: "/work/oklahoma-film-solutions.jpg",
    url: "https://oklahoma.film",
    tags: ["Marketing site", "React", "Supabase", "Back office"],
    year: "2026",
    audience: "small-business",
  },
  {
    slug: "solo-books",
    name: "Solo Books",
    category: "Bookkeeping app",
    summary: "One ledger for every business you run, with receipts, contractors, clients, and payroll.",
    description:
      "A private bookkeeping app for owner-operators. Log income and expenses by business and category, drop in receipts, and see exactly what you paid each contractor or received from each client. Payroll now lives alongside the books, and Profit and Loss reports export as a clean PDF for one business or all of them. Anyone can sign up and gets a fully isolated ledger, and it installs to a phone's home screen like an app.",
    image: "/work/solo-books.jpg",
    url: "https://solobooks.latchpointstudios.com",
    tags: ["React", "Supabase", "PDF reports"],
    year: "2026",
    audience: "small-business",
  },
  {
    slug: "shine-ministries",
    name: "Shine Ministries",
    category: "Ministry website & back office",
    summary: "A public site for a women's ministry, paired with a private back office for the team running it.",
    description:
      "The public face for a women's ministry: events, RSVPs, and ways to get involved. Behind it, a private back office the team actually uses, tracking those same events and giving without a spreadsheet in sight.",
    image: "/work/shine-ministries.png",
    url: "https://www.shineministriesok.com",
    tags: ["Next.js", "Supabase", "Back office"],
    year: "2026",
    audience: "nonprofit",
  },
  {
    slug: "thrively-inspections",
    name: "Thrively Inspections",
    category: "Small business website",
    summary: "A booking-first marketing site for a licensed home inspector.",
    description:
      "A conversion-focused site for a solo home inspection business: clear credentials, a service-area map, and a schedule flow that turns a nervous home buyer into a booked inspection.",
    image: "/work/thrively.png",
    url: "https://thrivelyinspections.com",
    tags: ["Next.js", "Vercel", "Lead gen"],
    year: "2026",
    audience: "small-business",
  },
  {
    slug: "terrence-finchum",
    name: "Terrence Finchum",
    category: "Real estate agent website",
    summary: "A personal agent site built around one listing at a time, not a brokerage roster.",
    description:
      "The public site for an individual agent: a full-bleed featured listing up top, areas served, and a blog, all pointed at one call-to-action instead of splitting attention across a brokerage's full team.",
    image: "/work/terrencefinchum.png",
    url: "https://terrencefinchum.com",
    tags: ["Next.js", "Marketing site"],
    year: "2026",
    audience: "real-estate",
  },
];
