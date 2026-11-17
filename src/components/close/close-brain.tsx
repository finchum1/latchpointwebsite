"use client";

import { CalendarCheck, ChatCircleText, FileText, Handshake, ListChecks, Signature } from "@phosphor-icons/react";
import { Logomark } from "../logomark";
import { BrainMap, type BrainCap, type BrainConfig, type BrainItem } from "../brain-map";

/**
 * Close's hero: a map of everything a transaction coordinator takes care of on a file. The discs are what gets done
 * (dates, documents, signatures, the checklist, updates, introductions); the pills are the steps and parties of the deal.
 * Point at a step and the work around it lights up; point at a kind of work and every step that needs it does.
 */

const caps: BrainCap[] = [
  { id: "dates", label: "Deadlines", blurb: "Every date from the contract, set on day one: earnest money, inspection, appraisal, loan, closing.", at: [196, 225], above: true, Icon: CalendarCheck },
  { id: "docs", label: "Documents", blurb: "Collected, checked, and filed. You can see what's in and what's still missing.", at: [300, 170], above: true, Icon: FileText },
  { id: "signs", label: "Signatures", blurb: "Tracked until everyone has signed, with a nudge to whoever is holding things up.", at: [404, 225], above: true, Icon: Signature },
  { id: "tasks", label: "Checklist", blurb: "A task list for every file, with due dates, worked through in order.", at: [404, 335], Icon: ListChecks },
  { id: "updates", label: "Updates", blurb: "A note to you when something needs you, and a closing timeline your client can read themselves.", at: [300, 390], Icon: ChatCircleText },
  { id: "intros", label: "Introductions", blurb: "I introduce myself to the title company, lender, and other agent, so everyone knows who to send things to.", at: [196, 335], Icon: Handshake },
];

// Clockwise from "Your file", the way a deal runs.
const items: BrainItem[] = [
  { id: "earnest", label: "Earnest money", blurb: "Confirmed with title and tracked, so the deposit lands on time.", at: [210, 81], uses: ["dates", "docs", "tasks"] },
  { id: "inspection", label: "Inspection", blurb: "Scheduled, followed through the inspection period, and the report collected and filed.", at: [390, 81], uses: ["dates", "docs", "tasks", "updates"] },
  { id: "appraisal", label: "Appraisal", blurb: "Followed up on, so a late or low appraisal never comes as a surprise.", at: [517, 198], uses: ["dates", "updates"] },
  { id: "loan", label: "Loan approval", blurb: "I check in with the lender and chase conditions until you have clear to close.", at: [517, 362], uses: ["dates", "docs", "updates", "intros"] },
  { id: "title", label: "Title work", blurb: "Commitment, payoff, and survey items followed up with title until they're clean.", at: [390, 479], uses: ["docs", "signs", "intros", "updates"] },
  { id: "walk", label: "Walk-through", blurb: "Scheduled with everyone and confirmed before closing day.", at: [210, 479], uses: ["dates", "tasks", "updates"] },
  { id: "closing", label: "Closing day", blurb: "The time confirmed, the file complete, and the keys change hands.", at: [83, 362], uses: ["signs", "docs", "dates", "tasks", "updates"] },
];

const config: BrainConfig = {
  ariaLabel: "Map of what a transaction coordinator takes care of on a file",
  centre: {
    label: "Your file",
    mark: <Logomark animated />,
    info: { title: "Your file", blurb: "Every step and every person on the deal, run from one place, from the signed contract to the closing table.", tag: "One coordinator" },
  },
  caps,
  items,
  capTag: (_cap, used) => `What I handle · part of ${used.length} steps`,
  itemTag: "A step I run",
  idea: {
    at: [83, 198],
    label: "Send a file",
    ariaLabel: "Send me a file: yours is next",
    href: "#start",
    info: { title: "Send me a file", blurb: "Send the executed contract and I'll open the file, set the dates, and send you both links.", tag: "Start here", href: "#start", cta: "Send me a file" },
  },
  defaultInfo: {
    title: "Everything on the file, handled.",
    blurb: "Hover or tap anything to see what I do around it. Every step runs on the same board.",
  },
};

export function CloseBrain() {
  return <BrainMap config={config} />;
}
