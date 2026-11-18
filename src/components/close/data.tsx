import { Check, Minus } from "@phosphor-icons/react/dist/ssr";

export const SAMPLE = "Sample data. Every name, date, and address on this screen is invented.";

/** What each shared page shows. `true` = shown, `false` = never shown. */
export const COMPARE: { row: string; agent: boolean | string; client: boolean | string }[] = [
  { row: "Days to closing and the key dates", agent: true, client: true },
  { row: "A short note from me", agent: true, client: "From you" },
  { row: "What needs you right now", agent: true, client: false },
  { row: "Open tasks and due dates", agent: true, client: false },
  { row: "Documents collected and still needed", agent: true, client: false },
  { row: "Signatures out and who they're waiting on", agent: true, client: false },
  { row: "Lender, title company, other agent", agent: true, client: "Lender and title" },
  { row: "What each step means, in plain English", agent: false, client: true },
  { row: "Price or commission", agent: false, client: false },
];

export function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check weight="bold" className="mx-auto size-4 text-accent" aria-label="Yes" />;
  if (value === false) return <Minus weight="bold" className="mx-auto size-4 text-text-faint" aria-label="No" />;
  return <span className="text-xs text-text-muted">{value}</span>;
}
