import { Check } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../button";
import { Magnetic } from "../magnetic";
import { Reveal } from "../reveal";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{children}</p>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-muted">
          <Check weight="bold" className="mt-1 size-4 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Copy on one side, a visual on the other; flips on large screens. */
export function Feature({
  id,
  eyebrow,
  title,
  body,
  bullets,
  visual,
  caption,
  flip = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  caption?: string;
  flip?: boolean;
}) {
  return (
    <div id={id} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-text sm:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-text-muted">{body}</p>
        <Bullets items={bullets} />
      </Reveal>
      <Reveal delay={0.1} className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        {visual}
        {caption && <p className="mt-3 text-center text-xs text-text-faint">{caption}</p>}
      </Reveal>
    </div>
  );
}

/** A closing band at the foot of a page, pointing at the contact page. A full page load: the host rewrites paths on the subdomain. */
export function CtaBand({ title, body, label, href = "/contact" }: { title: string; body: string; label: string; href?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated px-6 py-14 text-center sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{body}</p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <Button href={href} plain>{label}</Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Opens an inner page: a mono eyebrow, the page's one h1, and a short intro. The hero glow is left to the home page. */
export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 lg:px-8 lg:pt-20">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-text sm:text-5xl">{title}</h1>
        {body && <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">{body}</p>}
      </Reveal>
    </section>
  );
}
