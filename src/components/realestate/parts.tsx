import { Reveal } from "../reveal";
import { Eyebrow } from "../subsite/parts";

/** A section heading with an icon disc. `h1` makes it the page's one h1 (the first heading on an inner page). */
export function GroupHeader({ id, icon, title, body, h1 = false }: { id: string; icon: React.ReactNode; title: string; body: string; h1?: boolean }) {
  const Heading = h1 ? "h1" : "h2";
  return (
    <div id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-accent">
            {icon}
          </span>
          <Eyebrow>{title}</Eyebrow>
        </div>
        <Heading className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">{body}</Heading>
      </Reveal>
    </div>
  );
}

export const SAMPLE = "Sample data. Every name, number, and address on this screen is invented.";
