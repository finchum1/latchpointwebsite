import {
  Browser,
  Buildings,
  ChartBar,
  Devices,
  House,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SpotlightCard } from "./spotlight-card";

const services = [
  {
    icon: Browser,
    name: "Websites",
    description:
      "Marketing sites and landing pages built to load fast and convert, from the first pixel to the last analytics event.",
    span: "lg:col-span-2",
    tint: true,
  },
  {
    icon: Devices,
    name: "Web apps",
    description:
      "Full products with accounts, data, and billing, the kind your customers use every day, not just visit once.",
    span: "lg:col-span-2",
    tint: true,
  },
  {
    icon: ChartBar,
    name: "Dashboards",
    description: "Internal tools that turn a spreadsheet habit into a real, permission-aware system.",
    span: "lg:col-span-1",
  },
  {
    icon: Buildings,
    name: "Back office & portals",
    description: "Quotes, invoices, billing, and a login your clients can check status through themselves.",
    span: "lg:col-span-1",
  },
  {
    icon: House,
    name: "Personal apps",
    description: "Small, private tools built around exactly one household's or one team's workflow.",
    span: "lg:col-span-1",
  },
  {
    icon: UsersThree,
    name: "CRMs",
    description: "Lead and customer tracking shaped around how your team actually follows up.",
    span: "lg:col-span-1",
  },
];

export function ServicesBento() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <Reveal>
        <h2 className="max-w-xl text-3xl font-medium tracking-tight text-text sm:text-4xl">
          What we build
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
          One studio, six kinds of software, and probably a seventh if
          that’s not quite what you need. If it runs on code, it starts
          as a conversation, not a form.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06} className={s.span}>
            <SpotlightCard
              className={`h-full rounded-[20px] border border-border p-7 transition-colors duration-300 hover:border-border-strong ${
                s.tint ? "bg-gradient-to-br from-accent-soft to-bg-elevated" : "bg-bg-elevated"
              }`}
            >
              <s.icon
                weight="light"
                className="size-8 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <h3 className="mt-6 text-lg font-medium text-text">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
