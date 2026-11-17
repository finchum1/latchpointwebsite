"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, FileText, Key, LinkSimple } from "@phosphor-icons/react";
import "../process-steps.css"; // the rail, node, and step styles are shared with the studio's How we work section
import "./close-process.css";

const steps = [
  {
    n: "01",
    title: "You send the executed contract",
    body: "Use the form below or email it to me. Tell me who your client is and anything unusual about the deal.",
    caption: "The file arrives",
  },
  {
    n: "02",
    title: "I open the file and send the links",
    body: "Within a business day you have your link, and your client has their timeline with your name on it. You can send it yourself, or I can.",
    caption: "The file opens",
  },
  {
    n: "03",
    title: "I run it to closing",
    body: "I handle the follow-up and keep both pages current. You hear from me when something needs you, not every time something moves.",
    caption: "Closing day",
  },
];

const MILESTONES = [
  { label: "Earnest money", date: "Oct 6" },
  { label: "Inspection period ends", date: "Oct 16" },
  { label: "Appraisal", date: "Oct 22" },
  { label: "Loan approval", date: "Oct 28" },
  { label: "Final walk-through", date: "Nov 3" },
];

/**
 * How it works, the way the studio's How we work section does it: the orange node walks the steps as you scroll,
 * lighting the line behind it, and a small file beside them fills in to match (the contract arrives, the file opens
 * with its dates and both links, then every milestone is ticked off to closing). Point at a step to jump to it.
 * The current step is the one crossing a band near the middle of the screen, found with an IntersectionObserver.
 */
export function CloseProcess() {
  const wrap = useRef<HTMLDivElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const markerEls = useRef<(HTMLDivElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [ys, setYs] = useState<number[]>([]);
  const stage = hover ?? scrolled;

  // While the node travels it rides the rail; once it arrives it docks on the corner of its marker so the icon stays visible.
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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setScrolled(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    stepEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

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
    <div className="mt-14 grid grid-cols-1 gap-x-12 lg:grid-cols-12">
      <div ref={wrap} className="pp-steps relative lg:col-span-5" data-ready={ready}>
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
            key={s.n}
            ref={(el) => {
              stepEls.current[i] = el;
            }}
            data-step={i}
            data-state={i < stage ? "done" : i === stage ? "now" : "next"}
            className="pp-step relative pb-14 pl-[4.5rem] last:pb-0 lg:min-h-[14rem] lg:pb-0 lg:last:min-h-[22rem]"
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
              className="pp-marker absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-sm text-text"
            >
              {s.n}
            </div>
            <p className="pp-num font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">Step {i + 1}</p>
            <h3 className="mt-1 text-xl font-medium text-text">{s.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      {/* the file that fills in as the node moves; desktop only, sticks while the steps scroll */}
      <div className="mt-14 hidden lg:col-span-7 lg:mt-0 lg:block">
        <div className="sticky top-28">
          <div className="cp" data-stage={stage} aria-hidden="true">
            <div className="cp-card">
              <div className="cp-head">
                <div>
                  <p className="cp-addr">230 Brookstone Ct</p>
                  <p className="cp-sub">Buyer · Amelia Foster · Closing Wed, Nov 4</p>
                </div>
                <span className="cp-status">
                  <span data-for="0">Received</span>
                  <span data-for="1">File open</span>
                  <span data-for="2">Closed</span>
                </span>
              </div>

              {/* step 1: the contract arrives */}
              <div className="cp-contract">
                <div className="cp-file">
                  <FileText weight="light" />
                  <div>
                    <p>Executed contract.pdf</p>
                    <p className="cp-sub">Sent by the agent, with a note about the client</p>
                  </div>
                  <span className="cp-recv">
                    <Check weight="bold" /> Received
                  </span>
                </div>
              </div>

              {/* steps 2 and 3: the file's dates and its two links */}
              <div className="cp-board">
                <p className="cp-eyebrow">Dates, set from the contract</p>
                <ul>
                  {MILESTONES.map((m, i) => (
                    <li key={m.label} style={{ ["--i" as string]: i }}>
                      <span className="cp-tick">
                        <Check weight="bold" />
                      </span>
                      <span className="cp-ml">{m.label}</span>
                      <span className="cp-date">{m.date}</span>
                    </li>
                  ))}
                </ul>

                <div className="cp-links">
                  <span style={{ ["--i" as string]: 0 }}>
                    <LinkSimple weight="bold" /> Your link <em>Sent</em>
                  </span>
                  <span style={{ ["--i" as string]: 1 }}>
                    <LinkSimple weight="bold" /> Client timeline <em>Sent</em>
                  </span>
                </div>
              </div>

              {/* step 3: to the closing table */}
              <div className="cp-foot">
                <div className="cp-meter">
                  <span />
                </div>
                <p>
                  <Key weight="bold" /> Closed: the file is complete and the keys change hands.
                </p>
              </div>
            </div>
            <p className="cp-caption">
              <span>{String(stage + 1).padStart(2, "0")}</span> {steps[stage].caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
