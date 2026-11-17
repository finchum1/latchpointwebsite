"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CalendarBlank, Check, Code, Compass, FileText, PenNib, Receipt, RocketLaunch } from "@phosphor-icons/react";
import "./process-steps.css";

const steps = [
  {
    icon: Compass,
    name: "Discover",
    description:
      "A short call to figure out what the software actually needs to do, and what it can skip.",
    caption: "The brief",
  },
  {
    icon: PenNib,
    name: "Design",
    description: "A real interface to react to, not a wireframe, before a line of production code exists.",
    caption: "The first look",
  },
  {
    icon: Code,
    name: "Build",
    description: "The product gets built in the open, with a working preview you can check on anytime.",
    caption: "The working preview",
  },
  {
    icon: RocketLaunch,
    name: "Ship",
    description: "Live on your domain, handed off with the access and docs to keep running it yourself.",
    caption: "Live",
  },
];

/**
 * How we work. The orange node from the hero map walks down the four steps as
 * you scroll, lighting the line behind it, and the browser beside the steps
 * builds up to match: the brief, then the first look, then the working
 * preview, then live. Point at a step to jump the node and the browser to it.
 *
 * The active step is the one crossing a band near the middle of the screen
 * (an IntersectionObserver, so no scroll listeners). The node's position is
 * measured from the real step markers, so it stays on them at any width.
 */
export function ProcessSteps() {
  const wrap = useRef<HTMLDivElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const markerEls = useRef<(HTMLDivElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [ys, setYs] = useState<number[]>([]);
  const stage = hover ?? scrolled;

  // While the node is travelling it rides the rail; once it arrives it docks on the corner of its marker so the step icon stays visible.
  const [moving, setMoving] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setMoving(true);
    const t = window.setTimeout(() => setMoving(false), 950);
    return () => window.clearTimeout(t);
  }, [stage]);

  // Whichever step crosses the middle band of the screen is the current one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setScrolled(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    stepEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Where each step's marker sits, relative to the steps column, so the node can travel between them.
  useLayoutEffect(() => {
    const measure = () => {
      const root = wrap.current;
      if (!root) return;
      const top = root.getBoundingClientRect().top;
      setYs(markerEls.current.map((m) => (m ? m.getBoundingClientRect().top - top + m.offsetHeight / 2 : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ready = ys.length === steps.length;
  const y0 = ys[0] ?? 0;
  const yEnd = ys[steps.length - 1] ?? 0;
  const yNow = ys[stage] ?? 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-xl">
        <h2 className="text-3xl font-medium tracking-tight text-text sm:text-4xl">How we work</h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Four steps, one point of contact, no handoffs between teams that
          have never met.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-12 lg:grid-cols-12">
        {/* the steps, with the rail and the node */}
        <div ref={wrap} className="pp-steps relative lg:col-span-6" data-ready={ready}>
          {ready && (
            <>
              <span className="pp-rail" style={{ top: y0, height: yEnd - y0 }} aria-hidden="true" />
              <span className="pp-rail pp-rail-fill" style={{ top: y0, height: yNow - y0 }} aria-hidden="true" />
              <span className="pp-ghost pp-ghost-2" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
              <span className="pp-ghost pp-ghost-1" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
              <span className="pp-node" data-moving={moving} style={{ top: yNow }} aria-hidden="true" />
            </>
          )}

          {steps.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => {
                stepEls.current[i] = el;
              }}
              data-step={i}
              data-state={i < stage ? "done" : i === stage ? "now" : "next"}
              className="pp-step relative pb-14 pl-[4.5rem] last:pb-0 lg:min-h-[15.5rem] lg:pb-0 lg:last:min-h-[26rem]"
              onPointerEnter={(e) => e.pointerType !== "touch" && setHover(i)}
              onPointerLeave={(e) => e.pointerType !== "touch" && setHover((h) => (h === i ? null : h))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover((h) => (h === i ? null : h))}
              tabIndex={0}
            >
              <div
                ref={(el) => {
                  markerEls.current[i] = el;
                }}
                className="pp-marker absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-border-strong bg-bg text-text"
              >
                <s.icon weight="light" className="size-5" />
              </div>
              <p className="pp-num font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">Step {i + 1}</p>
              <h3 className="mt-1 text-xl font-medium text-text">{s.name}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">{s.description}</p>
            </div>
          ))}
        </div>

        {/* the browser that builds as the node moves; desktop only, sticks while the steps scroll */}
        <div className="mt-14 hidden lg:col-span-6 lg:mt-0 lg:block">
          <div className="sticky top-28">
            <div className="pp" data-stage={stage} aria-hidden="true">
              <div className="pp-browser">
                <div className="pp-bar">
                  <i />
                  <i />
                  <i />
                  <div className="pp-url">
                    <span data-for="0">new tab</span>
                    <span data-for="1">preview.latchpointstudios.com/draft</span>
                    <span data-for="2">preview.latchpointstudios.com</span>
                    <span data-for="3">yourbusiness.com</span>
                    <b className="pp-live">Live</b>
                  </div>
                </div>

                <div className="pp-screen">
                  {/* step 1: the brief */}
                  <div className="pp-brief">
                    <p className="pp-eyebrow">What it needs to do</p>
                    <ul>
                      <li style={{ ["--i" as string]: 0 }}>
                        <Check weight="bold" /> Take online bookings
                      </li>
                      <li style={{ ["--i" as string]: 1 }}>
                        <Check weight="bold" /> Send quotes and invoices
                      </li>
                      <li style={{ ["--i" as string]: 2 }}>
                        <Check weight="bold" /> A login for every client
                      </li>
                    </ul>
                    <p className="pp-eyebrow pp-skip-head">What it can skip</p>
                    <ul className="pp-skip">
                      <li style={{ ["--i" as string]: 3 }}>Blog</li>
                      <li style={{ ["--i" as string]: 4 }}>Chat widget</li>
                    </ul>
                  </div>

                  {/* steps 2 to 4: the same page, first as a layout, then built, then live */}
                  <div className="pp-page">
                    <div className="pp-nav">
                      <span className="pp-logo" />
                      <span className="pp-links">
                        <span className="pp-wire pp-bar-sm" />
                        <span className="pp-wire pp-bar-sm" />
                        <span className="pp-wire pp-bar-sm" />
                        <span className="pp-real">Services</span>
                        <span className="pp-real">Pricing</span>
                        <span className="pp-real">Contact</span>
                      </span>
                    </div>

                    <div className="pp-hero">
                      <div className="pp-stack">
                        <span className="pp-wire pp-bar-lg" />
                        <span className="pp-wire pp-bar-lg pp-short" />
                        <h4 className="pp-real">Book, quote, and get paid in one place.</h4>
                      </div>
                      <div className="pp-stack">
                        <span className="pp-wire pp-bar-sm pp-mid" />
                        <p className="pp-real">Everything your clients need, behind one login.</p>
                      </div>
                      <div className="pp-stack pp-cta">
                        <span className="pp-wire pp-btn-wire" />
                        <span className="pp-real pp-btn">Get started</span>
                      </div>
                    </div>

                    <div className="pp-cards">
                      {[
                        { Icon: CalendarBlank, label: "Bookings" },
                        { Icon: FileText, label: "Quotes" },
                        { Icon: Receipt, label: "Invoices" },
                      ].map(({ Icon, label }, i) => (
                        <div key={label} className="pp-card" style={{ ["--i" as string]: i }}>
                          <span className="pp-wire pp-card-wire" />
                          <span className="pp-real pp-card-real">
                            <Icon weight="light" />
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* build progress, then the handoff */}
                  <div className="pp-strip">
                    <div className="pp-strip-build">
                      <span className="pp-strip-label">Building: preview link shared</span>
                      <span className="pp-meter">
                        <span />
                      </span>
                      <span className="pp-ticks">
                        <em style={{ ["--i" as string]: 0 }}>Auth</em>
                        <em style={{ ["--i" as string]: 1 }}>Payments</em>
                        <em style={{ ["--i" as string]: 2 }}>Admin</em>
                      </span>
                    </div>
                    <div className="pp-strip-ship">
                      <Check weight="bold" /> Live on your domain. Access and docs handed over.
                    </div>
                  </div>
                </div>
              </div>
              <p className="pp-caption">
                <span>{String(stage + 1).padStart(2, "0")}</span> {steps[stage].name} &middot; {steps[stage].caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
