import Image from "next/image";
import type { ReactNode } from "react";

/*
  Sample-data renderings of The Agency Dashboard's real screens (Overview,
  Leads, Pipeline, Transactions, Blog), drawn with the same labels, layout,
  and cream-and-ink palette as the dashboard itself. Every name, number, and
  address in the people and transaction screens is invented -- nothing here
  is a real client or lead. Purely presentational, so these stay server
  components and ship no JavaScript.
*/

const INK = "text-[#1c1a17]";
const CARD = "rounded-lg border border-black/5 bg-white";
const pill =
  "rounded-full border border-black/10 px-1.5 py-0.5 text-[10px] font-medium text-[#1c1a17]/70";

type NavGroup = { label: string; items?: string[] };

const NAV: NavGroup[] = [
  { label: "Website", items: ["Analytics", "Site Details", "Testimonials", "Areas of Expertise", "Blog Posts", "Redirects"] },
  { label: "People", items: ["Overview", "Leads", "Pipeline", "Transactions"] },
  { label: "Listings" },
  { label: "Upcoming" },
];

/** The dashboard in a browser window, with its real sidebar structure. */
export function DashboardWindow({
  active,
  group,
  url,
  children,
  className = "",
}: {
  /** Which sidebar item is highlighted */
  active: string;
  /** Which sidebar group is expanded */
  group?: "Website" | "People";
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`select-none overflow-hidden rounded-[14px] border border-border-strong bg-[#faf9f7] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-black/10 bg-[#efede8] px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ec6a5e]" />
          <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="size-2.5 rounded-full bg-[#61c554]" />
        </div>
        <div className="mx-auto max-w-[320px] flex-1 truncate rounded-md bg-white/70 px-3 py-1 text-center text-[10.5px] text-[#1c1a17]/50">
          {url}
        </div>
        <div className="w-[42px]" />
      </div>

      <div className={`flex ${INK}`}>
        <aside className="hidden w-[148px] shrink-0 flex-col border-r border-black/5 bg-white px-2.5 py-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <Image src="/realestate/the-agency-logo.png" alt="" width={72} height={22} className="h-[18px] w-auto" />
          </div>
          <nav className="flex flex-col gap-0.5 text-[11.5px] font-medium">
            {NAV.map((g) => {
              const expanded = g.items && g.label === group;
              const isActive = !g.items && g.label === active;
              return (
                <div key={g.label}>
                  <div
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                      isActive ? "bg-[#1c1a17]/10" : "text-[#1c1a17]/70"
                    }`}
                  >
                    <span>{g.label}</span>
                    {g.items && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className={expanded ? "rotate-90" : ""}>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {expanded && (
                    <div className="ml-2 mt-0.5 flex flex-col gap-0.5 border-l border-black/10 pl-1.5">
                      {g.items!.map((item) => (
                        <div
                          key={item}
                          className={`rounded-md px-2 py-1 ${
                            item === active ? "bg-[#1c1a17]/10 text-[#1c1a17]" : "text-[#1c1a17]/60"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1 bg-[#faf9f7]">{children}</div>
      </div>
    </div>
  );
}

function Heading({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-3">
      <p className="font-serif text-[17px] font-semibold leading-tight">{children}</p>
      {sub && <p className="mt-0.5 text-[10.5px] text-[#1c1a17]/50">{sub}</p>}
    </div>
  );
}

/* ------------------------------ Overview ------------------------------ */

export function OverviewMock() {
  const tiles: [string, number, string[]][] = [
    ["Leads", 14, ["New 5", "Contacted 4", "Nurturing 3", "Qualified 2"]],
    ["Pipeline", 22, ["12+ Months 6", "6+ Months 5", "3-6 Months 5", "Active 6"]],
    ["Transactions", 5, ["Pending 2", "Closing Soon 2", "Closed 1"]],
  ];
  const values: [string, string, string][] = [
    ["Open deals", "4", "$1.6M volume"],
    ["Expected commission", "$48,200", "From open transactions"],
    ["Closed in 2026", "17", "$6.4M volume"],
    ["Commission earned", "$191,500", "Deals closed this year"],
  ];
  return (
    <div className="p-4 sm:p-5">
      <Heading>Overview</Heading>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map(([name, total, rows]) => (
          <div key={name} className={`${CARD} p-2.5`}>
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[10.5px] font-semibold sm:text-[11.5px]">{name}</span>
              <span className="text-base font-semibold sm:text-lg">{total}</span>
            </div>
            <ul className="mt-1 space-y-0.5">
              {rows.map((r) => (
                <li key={r} className="text-[10px] text-[#1c1a17]/50">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {values.map(([label, value, sub]) => (
          <div key={label} className={`${CARD} p-2.5`}>
            <p className="text-[9.5px] text-[#1c1a17]/50">{label}</p>
            <p className="text-[15px] font-semibold">{value}</p>
            <p className="text-[9.5px] text-[#1c1a17]/45">{sub}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className={`${CARD} space-y-1.5 p-2.5`}>
          <p className="text-[11.5px] font-semibold">Key dates · next 14 days</p>
          {[
            ["Thu, Oct 9", "Inspection · 412 Maple Ridge Dr"],
            ["Tue, Oct 14", "Appraisal · 412 Maple Ridge Dr"],
            ["Fri, Oct 31", "Closing · 88 Cedar Hollow Ln"],
          ].map(([d, t]) => (
            <div key={t}>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#1c1a17]/55">{d}</p>
              <p className="text-[10.5px]">{t}</p>
            </div>
          ))}
        </div>
        <div className={`${CARD} space-y-1.5 p-2.5`}>
          <p className="text-[11.5px] font-semibold">Follow-ups</p>
          {[
            ["Priya Raman", "Leads · Contacted · overdue", true],
            ["Maya Whitfield", "Leads · New · today", false],
            ["Marcus Bell", "Pipeline · Coming Soon · today", false],
          ].map(([n, t, late]) => (
            <div key={n as string}>
              <p className="text-[10.5px] font-medium">{n}</p>
              <p className={`text-[9.5px] ${late ? "text-red-600" : "text-[#1c1a17]/50"}`}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Boards ------------------------------- */

type Card = { name: string; sub?: string; follow?: string; tone?: "overdue" | "today" | "muted" };
type Column = { name: string; cards: Card[] };

function MiniCard({ name, sub, follow, tone = "muted" }: Card) {
  const toneClass = tone === "overdue" ? "text-red-600" : tone === "today" ? "text-amber-700" : "text-[#1c1a17]/50";
  return (
    <div className={`${CARD} space-y-1 p-2`}>
      <p className="truncate text-[11.5px] font-medium">{name}</p>
      {sub && <p className="truncate text-[10px] text-[#1c1a17]/50">{sub}</p>}
      {follow && <p className={`text-[10px] font-medium ${toneClass}`}>{follow}</p>}
      <div className="flex gap-1">
        <span className={pill}>Call</span>
        <span className={pill}>Text</span>
        <span className={pill}>Email</span>
      </div>
    </div>
  );
}

export function BoardMock({ title, sub, columns }: { title: string; sub: string; columns: Column[] }) {
  return (
    <div className="p-4 sm:p-5">
      <Heading sub={sub}>{title}</Heading>
      <div className="flex gap-2.5 overflow-hidden">
        {columns.map((col) => (
          <div key={col.name} className="w-[136px] shrink-0 space-y-1.5 rounded-xl bg-black/[0.04] p-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[9.5px] font-semibold uppercase tracking-wide text-[#1c1a17]/60">{col.name}</span>
              <span className="text-[10px] text-[#1c1a17]/40">{col.cards.length} +</span>
            </div>
            {col.cards.map((c) => (
              <MiniCard key={c.name} {...c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const LEAD_COLUMNS: Column[] = [
  {
    name: "New",
    cards: [
      { name: "Maya Whitfield", sub: "Website inquiry", follow: "Follow up today", tone: "today" },
      { name: "Daniel Ortega", sub: "Open house sign-in", follow: "Follow up Oct 9" },
    ],
  },
  {
    name: "Contacted",
    cards: [{ name: "Priya Raman", sub: "Referral", follow: "Follow up · overdue", tone: "overdue" }],
  },
  {
    name: "Nurturing",
    cards: [
      { name: "The Hendersons", sub: "Open house", follow: "Follow up Oct 14" },
      { name: "Chris Boyd", sub: "Blog subscriber", follow: "Follow up Oct 21" },
    ],
  },
  { name: "Qualified", cards: [{ name: "Alana Fox", sub: "Past client", follow: "Follow up Oct 10" }] },
];

export const PIPELINE_COLUMNS: Column[] = [
  { name: "12+ Months", cards: [{ name: "Sam Patel", sub: "Renting until lease ends", follow: "Follow up Nov 3" }] },
  { name: "6+ Months", cards: [{ name: "Jordan & Lee Park", sub: "Selling to upsize", follow: "Follow up Oct 18" }] },
  { name: "3-6 Months", cards: [{ name: "Rhea Collins", sub: "Pre-approved", follow: "Follow up Oct 12" }] },
  {
    name: "Coming Soon",
    cards: [{ name: "Marcus Bell", sub: "Listing in spring", follow: "Follow up today", tone: "today" }],
  },
  { name: "Active", cards: [{ name: "Tessa Nguyen", sub: "Touring this weekend", follow: "Follow up Oct 8" }] },
];

/* ---------------------------- Transactions ---------------------------- */

export function TransactionMock() {
  const dates: [string, string][] = [
    ["Contract", "Oct 1"],
    ["Inspection", "Oct 9"],
    ["Appraisal", "Oct 14"],
    ["Financing", "Oct 20"],
    ["Closing", "Oct 31"],
  ];
  const tasks: [boolean, string][] = [
    [true, "Create calendar event for closing and invite agent"],
    [true, "Send buyer welcome and next steps email"],
    [false, "Confirm earnest money deposit and upload"],
    [false, "Email lender to confirm appraisal is ordered"],
  ];
  return (
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
      <div className="space-y-3">
        <Heading sub="Transactions · Closing Soon">Jordan &amp; Lee Park</Heading>
        <div className={`${CARD} space-y-2 p-3 text-[11px]`}>
          {[
            ["Property", "412 Maple Ridge Dr"],
            ["Side", "Buyer"],
            ["Price · Commission", "$385,000 · $11,550"],
            ["Title · Lender", "Frontier Title · Cardinal Home Loans"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <span className="text-[#1c1a17]/50">{k}</span>
              <span className="text-right font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {dates.map(([label, date]) => (
            <div key={label} className={`${CARD} px-1 py-1.5 text-center`}>
              <p className="text-[8.5px] uppercase tracking-wide text-[#1c1a17]/45">{label}</p>
              <p className="text-[10.5px] font-semibold">{date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${CARD} space-y-2 p-3`}>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold">Checklist</p>
          <p className="text-[10px] text-[#1c1a17]/50">2 of 24 done</p>
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-semibold">
            <span>First 7 Days</span>
            <span className="text-[10px] font-normal text-[#1c1a17]/50">2/8</span>
          </div>
          <p className="mb-1 text-[9.5px] text-[#1c1a17]/45">Due 7 days after the contract date</p>
          <ul className="space-y-1.5">
            {tasks.map(([done, text]) => (
              <li key={text} className="flex items-start gap-1.5 text-[10.5px] leading-snug">
                <span
                  className={`mt-0.5 flex size-3 shrink-0 items-center justify-center rounded-[3px] border ${
                    done ? "border-[#ed2127] bg-[#ed2127]" : "border-black/25"
                  }`}
                >
                  {done && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={done ? "line-through opacity-50" : ""}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between pt-1 text-[11px] font-semibold">
          <span>Inspection Window</span>
          <span className="text-[10px] font-normal text-[#1c1a17]/50">0/8</span>
        </div>
        <div className="flex justify-between text-[11px] font-semibold">
          <span>10 Days Before Closing</span>
          <span className="text-[10px] font-normal text-[#1c1a17]/50">0/8</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Blog -------------------------------- */

export function BlogMock() {
  // October 2026 starts on a Thursday.
  const lead = 4;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const posts: Record<number, string> = {
    6: "Neighborhood Guide",
    13: "Restaurant Feature",
    20: "New Development",
    27: "Weekly Local Events",
  };
  const checklist: [boolean, string][] = [
    [true, "Title"],
    [true, "Category"],
    [true, "Excerpt"],
    [true, "Cover photo"],
    [true, "A subheading in the body"],
    [false, "150+ words (112 so far)"],
  ];
  return (
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-5 sm:p-5">
      <div className="sm:col-span-3">
        <Heading sub="One post a week keeps the site fresh">Post calendar</Heading>
        <div className={`${CARD} p-2.5`}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold">October 2026</span>
            <span className="text-[10px] text-[#1c1a17]/45">4 scheduled</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] uppercase tracking-wide text-[#1c1a17]/40">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: lead }).map((_, i) => (
              <span key={`b${i}`} />
            ))}
            {days.map((d) => (
              <div
                key={d}
                className={`min-h-[34px] rounded-md p-1 text-[9.5px] ${
                  posts[d] ? "bg-[#ed2127]/10 ring-1 ring-[#ed2127]/25" : "bg-black/[0.03]"
                }`}
              >
                <span className={posts[d] ? "font-semibold text-[#ed2127]" : "text-[#1c1a17]/45"}>{d}</span>
                {posts[d] && <p className="mt-0.5 hidden truncate text-[8px] leading-tight text-[#1c1a17]/60 sm:block">{posts[d]}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Heading sub="Draft · Neighborhood Guide">Publish checklist</Heading>
        <div className={`${CARD} p-3`}>
          <ul className="space-y-1.5">
            {checklist.map(([done, label]) => (
              <li key={label} className="flex items-center gap-2 text-[11px]">
                <span className={done ? "text-emerald-600" : "text-[#1c1a17]/35"}>{done ? "✓" : "○"}</span>
                <span className={done ? "" : "text-[#1c1a17]/55"}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${CARD} space-y-1.5 p-3`}>
          <p className="text-[11px] font-semibold">Post views</p>
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[#1c1a17]/50">All-time views</span>
            <span className="font-semibold">1,284</span>
          </div>
          <div className="flex justify-between text-[10.5px]">
            <span className="text-[#1c1a17]/50">Last 30 days</span>
            <span className="font-semibold">312</span>
          </div>
          <div className="flex justify-between gap-3 text-[10.5px]">
            <span className="text-[#1c1a17]/50">Top post</span>
            <span className="truncate text-right font-semibold">Golf Course Living in Edmond</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Listings ------------------------------ */

export function ListingsMock() {
  const rows: [string, string, string, string, string, "green" | "amber" | "gray", boolean][] = [
    ["1645 Saratoga Way", "Edmond, OK 73003", "Terrence Finchum", "$1,395,000", "For Sale", "green", false],
    ["412 Winding Creek Rd", "Nichols Hills, OK 73116", "Maya Coleman", "$685,000", "Pending", "amber", true],
    ["88 Preston Ridge Ct", "Edmond, OK 73025", "Diego Alvarez", "$2,150,000", "Coming Soon", "gray", true],
  ];
  const tone = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    gray: "bg-black/[0.05] text-[#1c1a17]/60",
  };
  return (
    <div className="p-4 pb-20 sm:p-5 sm:pb-32">
      <div className="flex items-start justify-between">
        <Heading sub="3 listings">Listings</Heading>
        <span className="rounded-full bg-[#1c1a17] px-3 py-1.5 text-[10.5px] font-semibold text-white">+ New Listing</span>
      </div>
      <div className={`${CARD} overflow-hidden`}>
        <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.9fr] gap-2 border-b border-black/5 px-3 py-2 text-[8.5px] font-semibold uppercase tracking-wide text-[#1c1a17]/40">
          <span>Address</span>
          <span>Agent</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        {rows.map(([addr, city, agent, price, status, t, sample]) => (
          <div
            key={addr}
            className="grid grid-cols-[1.5fr_1fr_0.8fr_0.9fr] items-center gap-2 border-b border-black/5 px-3 py-2.5 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-[11px] font-semibold">
                <span className="truncate">{addr}</span>
                {sample && (
                  <span className="rounded border border-black/10 px-1 text-[7.5px] font-medium tracking-wide text-[#1c1a17]/50">
                    SAMPLE
                  </span>
                )}
              </p>
              <p className="truncate text-[9.5px] text-[#1c1a17]/45">{city}</p>
            </div>
            <span className="truncate text-[10.5px] text-[#1c1a17]/70">{agent}</span>
            <span className="text-[10.5px]">{price}</span>
            <span className={`w-fit rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${tone[t]}`}>{status} &#8964;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
