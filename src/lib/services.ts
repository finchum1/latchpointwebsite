export type Service = {
  name: string;
  tagline: string;
  description: string;
  includes: string[];
};

export const services: Service[] = [
  {
    name: "Websites",
    tagline: "The site people find you through",
    description:
      "A marketing site, portfolio, or brochure site built to load fast, read clearly, and turn a visit into a call, an email, or a booking.",
    includes: ["Custom design, not a template", "Copywriting pass", "Contact and booking forms", "Analytics and SEO basics"],
  },
  {
    name: "Web apps",
    tagline: "The product your customers log into",
    description:
      "A full product with accounts, data, and billing. Built to handle real users on day one, not retrofitted later.",
    includes: ["Authentication and user accounts", "A real database, not a spreadsheet", "Payments, if you're charging for it", "Deployed with monitoring in place"],
  },
  {
    name: "Dashboards",
    tagline: "The internal tool your team actually opens",
    description:
      "A permission-aware view into the data your business already has, replacing a spreadsheet habit that's starting to show cracks.",
    includes: ["Role-based access", "Live data, not a nightly export", "Filters and views built around your workflow", "Handoff docs so your team can maintain it"],
  },
  {
    name: "Personal apps",
    tagline: "The tool built around one household or team",
    description:
      "Something small, private, and shaped around exactly how you work, not a general product with your logo bolted on.",
    includes: ["Private by default, invite-only", "Built around your actual routine", "Runs on your own domain", "No subscription to a product you don't control"],
  },
  {
    name: "CRMs",
    tagline: "The system that remembers to follow up",
    description:
      "Lead and customer tracking shaped around how your team actually sells, not a generic pipeline you have to bend around.",
    includes: ["Pipeline stages that match your process", "Notes and history on every contact", "Reminders for the follow-up you'd otherwise forget", "Import from your current spreadsheet"],
  },
  {
    name: "Back office & portals",
    tagline: "The system that runs behind the login",
    description:
      "Internal tools and client-facing portals: quotes and invoices, billing, project tracking, anything your business or your customers need behind a sign-in.",
    includes: ["A login only your team or your clients have", "Quotes, invoices, and billing built in", "Real-time status your clients can check themselves", "Stripe for one-time and recurring payments"],
  },
];
