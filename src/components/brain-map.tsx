"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import "./hero-brain.css";

/**
 * A second-brain map: a centre, a ring of discs (the things done) and an outer
 * ring of pills (the things they apply to), joined by lines that carry pulses.
 * Hover or focus any node and the nodes it connects to light up, with one
 * caption explaining it. All the content is passed in, so the studio's hero and
 * Close's hero are the same engine with different data.
 */

const W = 600;
const H = 560;
const CENTER: [number, number] = [300, 280];

export type BrainCap = {
  id: string;
  label: string;
  blurb: string;
  at: [number, number];
  Icon: ComponentType<{ weight?: "regular" | "light" | "bold"; className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  /** Put the label above the disc (used for the discs along the top, so lines to the centre don't cross it). */
  above?: boolean;
};

export type BrainItem = {
  id: string;
  label: string;
  /** Longer title for the caption, if the pill's label is shortened. */
  title?: string;
  blurb: string;
  at: [number, number];
  /** Which discs this item connects to. */
  uses: string[];
  href?: string;
  external?: boolean;
  /** This company's own colour for the pill (dot, hover and active states), instead of the page accent. */
  accent?: string;
};

export type BrainInfo = { title: string; blurb: string; tag?: string; href?: string; cta?: string; external?: boolean };

export type BrainConfig = {
  ariaLabel: string;
  centre: { label: string; mark: ReactNode; info: BrainInfo };
  caps: BrainCap[];
  items: BrainItem[];
  /** Small caption tag for a disc, given the items that connect to it. */
  capTag: (cap: BrainCap, items: BrainItem[]) => string;
  /** Small caption tag for a pill. */
  itemTag: string;
  /** Call to action under a pill's caption, if it links somewhere. */
  itemCta?: (item: BrainItem) => string | undefined;
  /** The dashed empty slot that points at the next step (optional). */
  idea?: { at: [number, number]; label: string; ariaLabel: string; href: string; info: BrainInfo };
  defaultInfo: BrainInfo;
  /** Use plain anchors for paths, not client-side Links: for sites on a subdomain whose paths are rewritten by host. */
  plainLinks?: boolean;
};

type Edge = { id: string; a: string; b: string; from: [number, number]; to: [number, number]; ghost?: boolean };

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

/** An internal path uses Link, anything else a plain anchor. */
function Anchor({ href, external, plain, children, ...rest }: { href: string; external?: boolean; plain?: boolean; children: ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/") && !plain) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

export function BrainMap({ config }: { config: BrainConfig }) {
  const { caps, items, idea } = config;
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;

  const { pos, edges, captionIds } = useMemo(() => {
    const pos = new Map<string, [number, number]>([
      ["core", CENTER],
      ...(idea ? ([["idea", idea.at]] as [string, [number, number]][]) : []),
      ...caps.map((c) => [c.id, c.at] as [string, [number, number]]),
      ...items.map((p) => [p.id, p.at] as [string, [number, number]]),
    ]);
    const edges: Edge[] = [
      ...caps.map((c) => ({ id: `core-${c.id}`, a: "core", b: c.id, from: CENTER, to: c.at })),
      ...items.flatMap((p) => p.uses.map((u) => ({ id: `${u}-${p.id}`, a: u, b: p.id, from: pos.get(u)!, to: p.at }))),
      ...(idea ? [{ id: "core-idea", a: "core", b: "idea", from: CENTER, to: idea.at, ghost: true }] : []),
    ];
    const captionIds: (string | null)[] = [null, "core", ...(idea ? ["idea"] : []), ...caps.map((c) => c.id), ...items.map((p) => p.id)];
    return { pos, edges, captionIds };
  }, [caps, items, idea]);

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

  function info(id: string | null): BrainInfo {
    if (!id) return config.defaultInfo;
    if (id === "core") return config.centre.info;
    if (id === "idea" && idea) return idea.info;
    const cap = caps.find((c) => c.id === id);
    if (cap) return { title: cap.label, blurb: cap.blurb, tag: config.capTag(cap, items.filter((p) => p.uses.includes(cap.id))) };
    const p = items.find((x) => x.id === id)!;
    return { title: p.title ?? p.label, blurb: p.blurb, tag: config.itemTag, href: p.href, cta: config.itemCta?.(p), external: p.external };
  }

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
      <div ref={stage} className="brain-stage" role="group" aria-label={config.ariaLabel}>
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
            <button type="button" className="brain-hit" aria-label={config.centre.label} style={{ ["--delay" as string]: "0.1s" }} {...bind("core")} onClick={() => setPinned((p) => (p === "core" ? null : "core"))}>
              <span className="brain-core">
                {config.centre.mark}
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

          {/* the things they apply to */}
          {items.map((p, i) => {
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
              ...bind(p.id),
            };
            return (
              <div
                key={p.id}
                className="brain-node"
                data-kind="product"
                data-state={nodeState(p.id)}
                style={
                  p.accent
                    ? { ...at(p.id), ["--accent" as string]: p.accent, ["--accent-soft" as string]: `color-mix(in srgb, ${p.accent} 16%, transparent)` }
                    : at(p.id)
                }
              >
                {p.href ? (
                  <Anchor href={p.href} external={p.external} plain={config.plainLinks} onClick={tap(p.id)} {...common}>
                    {inner}
                  </Anchor>
                ) : (
                  <button type="button" onClick={() => setPinned((x) => (x === p.id ? null : p.id))} {...common}>
                    {inner}
                  </button>
                )}
              </div>
            );
          })}

          {/* the empty slot */}
          {idea && (
            <div className="brain-node" data-kind="idea" data-state={nodeState("idea")} style={at("idea")}>
              <Anchor href={idea.href} plain={config.plainLinks} className="brain-hit" aria-label={idea.ariaLabel} style={{ ["--delay" as string]: "1.5s" }} onClick={tap("idea")} {...bind("idea")}>
                <span className="brain-pill brain-ghost">
                  <span className="brain-dot" />
                  {idea.label}
                </span>
              </Anchor>
            </div>
          )}
        </div>
      </div>

      {/* What the highlighted node means. Every caption is laid out in the same grid cell and only the active one is shown, so the
          box is always as tall as the longest caption and the page below never moves when the pointer changes node. */}
      <div className="brain-caption" aria-live="polite">
        {captionIds.map((id) => {
          const c = info(id);
          const on = (active ?? null) === id;
          return (
            <div key={id ?? "default"} className="brain-caption-item" data-on={on} aria-hidden={!on}>
              {c.tag && <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{c.tag}</p>}
              <p className={`${c.tag ? "mt-1.5 " : ""}text-base font-medium text-text`}>{c.title}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-text-muted">{c.blurb}</p>
              {c.href && c.cta && (
                <p className="mt-1.5 text-sm font-medium text-text">
                  {c.cta} &rarr;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
