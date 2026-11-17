"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  AppWindow,
  Browser,
  Kanban,
  Robot,
  SquaresFour,
  UsersThree,
} from "@phosphor-icons/react";
import { Logomark } from "./logomark";
import "./hero-brain.css";

/**
 * A second-brain map of the studio: what Latchpoint can build (the discs),
 * what it has built (the pills), and the empty slot where the next one goes.
 * Hover or focus anything and the things it connects to light up.
 */

const W = 600;
const H = 560;
const CENTER: [number, number] = [300, 280];

type Cap = { id: string; label: string; blurb: string; at: [number, number]; Icon: typeof Browser; above?: boolean };
type Product = { id: string; label: string; blurb: string; at: [number, number]; href: string; external?: boolean; uses: string[] };

const caps: Cap[] = [
  { id: "websites", label: "Websites", blurb: "Marketing sites and agent sites that look sharp and turn visitors into leads.", at: [196, 225], above: true, Icon: Browser },
  { id: "dashboards", label: "Dashboards", blurb: "One screen that shows how the business is doing, built around the numbers you check.", at: [300, 170], above: true, Icon: SquaresFour },
  { id: "portals", label: "Client portals", blurb: "A private link where a client sees where things stand, with no login to forget.", at: [404, 225], above: true, Icon: UsersThree },
  { id: "crms", label: "CRMs", blurb: "Contacts, leads, and pipeline that follow up on a schedule you set.", at: [404, 335], Icon: Kanban },
  { id: "ai", label: "AI assistants", blurb: "Your own assistant working inside your data, so you can ask it instead of clicking.", at: [300, 390], Icon: Robot },
  { id: "apps", label: "Web apps", blurb: "Full products with sign-up, accounts, and payments, installable on a phone.", at: [196, 335], Icon: AppWindow },
];

const products: Product[] = [
  { id: "finchum", label: "Terrence Finchum", blurb: "A personal agent website built around one listing at a time.", at: [210, 81], href: "/work#terrence-finchum", uses: ["websites"] },
  { id: "realestate", label: "Real Estate", blurb: "Latchpoint Real Estate: an agent's website and the back office behind it.", at: [390, 81], href: "/work#latchpoint-real-estate", uses: ["websites", "dashboards", "crms", "portals", "ai"] },
  { id: "close", label: "Close", blurb: "Close by Latchpoint: transaction coordination with a live link to every file.", at: [517, 198], href: "https://close.latchpointstudios.com", external: true, uses: ["portals", "dashboards"] },
  { id: "film", label: "Oklahoma Film", blurb: "Oklahoma Film Solutions: a film-services site and the private back office behind it.", at: [517, 362], href: "/work#oklahoma-film-solutions", uses: ["websites", "dashboards"] },
  { id: "solobooks", label: "Solo Books", blurb: "Books, budgets, bank matching, and payroll for every business you run.", at: [210, 479], href: "/work#solo-books", uses: ["apps", "dashboards", "ai"] },
  { id: "shine", label: "Shine Ministries", blurb: "A public ministry site and the back office the team runs on.", at: [83, 362], href: "/work#shine-ministries", uses: ["websites", "dashboards", "apps"] },
  { id: "thrively", label: "Thrively", blurb: "A booking-first website for a licensed home inspector.", at: [83, 198], href: "/work#thrively-inspections", uses: ["websites"] },
];

// Fixed order so the entrance reads as a wave outward from the centre.
const IDEA_AT: [number, number] = [390, 479];

type Edge = { id: string; a: string; b: string; from: [number, number]; to: [number, number]; ghost?: boolean };

const pos = new Map<string, [number, number]>([
  ["core", CENTER],
  ["idea", IDEA_AT],
  ...caps.map((c) => [c.id, c.at] as [string, [number, number]]),
  ...products.map((p) => [p.id, p.at] as [string, [number, number]]),
]);

const edges: Edge[] = [
  ...caps.map((c) => ({ id: `core-${c.id}`, a: "core", b: c.id, from: CENTER, to: c.at })),
  ...products.flatMap((p) => p.uses.map((u) => ({ id: `${u}-${p.id}`, a: u, b: p.id, from: pos.get(u)!, to: p.at }))),
  { id: "core-idea", a: "core", b: "idea", from: CENTER, to: IDEA_AT, ghost: true },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

// A little scatter of drifting dust behind everything.
const dust = Array.from({ length: 22 }, (_, i) => {
  // Rounded: the server and the browser can differ in the last float digits, which React flags as a hydration mismatch.
  const s = (n: number) => Math.round(Math.abs(Math.sin(i * 12.9898 + n * 78.233)) * 1000) / 1000;
  const r2 = (v: number) => Math.round(v * 100) / 100;
  return {
    x: r2(20 + s(1) * 560),
    y: r2(20 + s(2) * 520),
    r: r2(1 + s(3) * 1.6),
    dx: r2((s(4) - 0.5) * 36),
    dy: r2((s(5) - 0.5) * 36),
    dur: r2(10 + s(6) * 10),
    delay: r2(-s(7) * 10),
  };
});

type Info = { title: string; blurb: string; tag?: string; href?: string; external?: boolean };

const DEFAULT_INFO: Info = {
  title: "Everything we build connects.",
  blurb: "Hover or tap a node to see what runs on what. Every product here is live.",
};

export function HeroBrain() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;

  const related = new Set<string>();
  if (active) {
    related.add(active);
    for (const e of edges) {
      if (e.a === active) related.add(e.b);
      if (e.b === active) related.add(e.a);
    }
  }
  const nodeState = (id: string) => (!active ? undefined : related.has(id) || id === "core" ? "on" : "off");
  const edgeState = (e: Edge) => (!active ? undefined : e.a === active || e.b === active ? "on" : "off");

  function info(id: string | null): Info {
    if (!id) return DEFAULT_INFO;
    if (id === "core") return { title: "Latchpoint Studios", blurb: "One studio designing and shipping the software behind each of these, usually in weeks.", tag: "The studio" };
    if (id === "idea") return { title: "Yours is next", blurb: "Tell us what your business runs on and we'll add it to the map.", tag: "Start a project", href: "/contact" };
    const cap = caps.find((c) => c.id === id);
    if (cap) {
      const n = products.filter((p) => p.uses.includes(cap.id)).length;
      return { title: cap.label, blurb: cap.blurb, tag: `We build this · used in ${n} live ${n === 1 ? "product" : "products"}` };
    }
    const p = products.find((x) => x.id === id)!;
    return { title: p.label === "Real Estate" ? "Latchpoint Real Estate" : p.label, blurb: p.blurb, tag: "Live", href: p.href, external: p.external };
  }
  const current = info(active);

  // Pointer parallax: two CSS variables, no animation loop.
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === "touch" || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    stage.current.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    stage.current.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  }
  function onLeave() {
    stage.current?.style.setProperty("--px", "0");
    stage.current?.style.setProperty("--py", "0");
    setHover(null);
  }

  const bind = (id: string) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType !== "touch" && setHover(id),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType !== "touch" && setHover((h) => (h === id ? null : h)),
    onFocus: () => setHover(id),
    onBlur: () => setHover((h) => (h === id ? null : h)),
  });

  // Touch: first tap reveals a node, a second tap on a link follows it.
  const tap = (id: string) => (e: React.MouseEvent) => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (pinned !== id) {
      e.preventDefault();
      setPinned(id);
    }
  };

  const at = (id: string) => ({ left: pct(pos.get(id)![0], W), top: pct(pos.get(id)![1], H) });

  return (
    <div className="brain" data-active={active ?? undefined} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={stage} className="brain-stage" role="group" aria-label="Map of what Latchpoint Studios builds">
        {/* depth 1: backdrop, moves against the pointer */}
        <div className="brain-layer brain-layer-back" aria-hidden="true">
          <div className="brain-glow" />
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
            <circle className="brain-ring" cx={CENTER[0]} cy={CENTER[1]} r={128} />
            <circle className="brain-ring brain-ring-b" cx={CENTER[0]} cy={CENTER[1]} r={238} />
            {dust.map((d, i) => (
              <circle
                key={i}
                className="brain-dust"
                cx={d.x}
                cy={d.y}
                r={d.r}
                style={{ ["--dx" as string]: `${d.dx}px`, ["--dy" as string]: `${d.dy}px`, ["--dur" as string]: `${d.dur}s`, ["--delay" as string]: `${d.delay}s` }}
              />
            ))}
          </svg>
        </div>

        {/* depth 2: the graph itself, moves with the pointer */}
        <div className="brain-layer brain-layer-mid">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {edges.map((e, i) => (
              <g key={e.id}>
                <line
                  className={`brain-edge${e.ghost ? " brain-edge-ghost" : ""}`}
                  x1={e.from[0]}
                  y1={e.from[1]}
                  x2={e.to[0]}
                  y2={e.to[1]}
                  pathLength={e.ghost ? undefined : 1}
                  data-state={edgeState(e)}
                  style={{ ["--delay" as string]: `${0.25 + i * 0.045}s` }}
                />
                {!reduce && !e.ghost && (
                  <circle className="brain-pulse" r={e.a === "core" ? 2.6 : 2} visibility="hidden" data-state={edgeState(e)}>
                    <set attributeName="visibility" to="visible" begin={`${1.6 + (i % 7) * 0.7}s`} />
                    <animateMotion
                      dur={`${3.4 + (i % 5) * 0.55}s`}
                      begin={`${1.6 + (i % 7) * 0.7}s`}
                      repeatCount="indefinite"
                      path={`M${e.from[0]} ${e.from[1]} L${e.to[0]} ${e.to[1]}`}
                    />
                    <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.15;0.8;1" dur={`${3.4 + (i % 5) * 0.55}s`} begin={`${1.6 + (i % 7) * 0.7}s`} repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* the centre */}
          <div className="brain-node" data-kind="core" data-state={nodeState("core")} style={at("core")}>
            <button type="button" className="brain-hit" aria-label="Latchpoint Studios" style={{ ["--delay" as string]: "0.1s" }} {...bind("core")} onClick={() => setPinned((p) => (p === "core" ? null : "core"))}>
              <span className="brain-core">
                <Logomark animated />
              </span>
            </button>
          </div>

          {/* what we can build */}
          {caps.map((c, i) => (
            <div key={c.id} className="brain-node" data-kind="cap" data-state={nodeState(c.id)} style={at(c.id)}>
              <button
                type="button"
                className="brain-hit"
                aria-label={`${c.label}: ${c.blurb}`}
                style={{ ["--delay" as string]: `${0.35 + i * 0.08}s`, ["--fire" as string]: `${-i * 1.1}s` }}
                {...bind(c.id)}
                onClick={() => setPinned((p) => (p === c.id ? null : c.id))}
              >
                <span className={`brain-cap${c.above ? " brain-cap-above" : ""}`}>
                  <span className="brain-disc">
                    <c.Icon weight="regular" aria-hidden="true" />
                  </span>
                  <span className="brain-cap-label">{c.label}</span>
                </span>
              </button>
            </div>
          ))}

          {/* what we've built */}
          {products.map((p, i) => {
            const inner = (
              <span className="brain-pill">
                <span className="brain-dot" style={{ ["--fire" as string]: `${-i * 0.9}s` }} />
                {p.label}
              </span>
            );
            const common = {
              className: "brain-hit",
              style: { ["--delay" as string]: `${0.8 + i * 0.09}s` },
              "aria-label": `${p.label}: ${p.blurb}`,
              onClick: tap(p.id),
              ...bind(p.id),
            };
            return (
              <div key={p.id} className="brain-node" data-kind="product" data-state={nodeState(p.id)} style={at(p.id)}>
                {p.external ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" {...common}>
                    {inner}
                  </a>
                ) : (
                  <Link href={p.href} {...common}>
                    {inner}
                  </Link>
                )}
              </div>
            );
          })}

          {/* the empty slot */}
          <div className="brain-node" data-kind="idea" data-state={nodeState("idea")} style={at("idea")}>
            <Link href="/contact" className="brain-hit" aria-label="Start a project: yours is next" style={{ ["--delay" as string]: "1.5s" }} onClick={tap("idea")} {...bind("idea")}>
              <span className="brain-pill brain-ghost">
                <span className="brain-dot" />
                Your idea
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* what the highlighted node means, in one stable place so it never gets clipped */}
      <div className="brain-caption" aria-live="polite">
        <div key={active ?? "default"} className="brain-caption-swap">
          {current.tag && <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{current.tag}</p>}
          <p className={`${current.tag ? "mt-1.5 " : ""}text-base font-medium text-text`}>{current.title}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-text-muted">{current.blurb}</p>
          {current.href && (
            <p className="mt-1.5 text-sm font-medium text-text">
              {current.external ? "Visit the live site" : current.href === "/contact" ? "Start a project" : "See it in our work"} &rarr;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
