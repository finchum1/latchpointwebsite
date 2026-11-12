"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react";

type Item = { title: string; body: string; href: string; src?: string; alt?: string };

/** What comes with it, one card per idea. Every line here is something the product does today. */
const ITEMS: Item[] = [
  {
    title: "A website that looks like you",
    body: "Agent and brokerage sites on your own domain, from three starter templates, with your colors, header, and footer.",
    href: "#website",
    src: "/realestate/agent-site-home.jpg",
    alt: "An agent's website home page",
  },
  {
    title: "A site for every listing",
    body: "Photos, video, a map, and visitor analytics for each property, plus a link to send the seller their own report.",
    href: "#website",
    src: "/realestate/listing-hero.jpg",
    alt: "A property website with a large photo and price",
  },
  {
    title: "Your day on one screen",
    body: "An hourly schedule that syncs with Google Calendar, new inquiries, tasks, and who to follow up with today.",
    href: "#home",
    src: "/realestate/dash-home.jpg",
    alt: "The dashboard home page with an hourly schedule and tasks",
  },
  {
    title: "Contacts that stay private",
    body: "Your own database with tags and keep-in-touch reminders, so nobody you know slips away.",
    href: "#back-office",
    src: "/realestate/dash-contacts.jpg",
    alt: "The contacts database",
  },
  {
    title: "Leads and a pipeline that nudge you",
    body: "Drag people between columns. Every column has its own follow-up rhythm, so the next call is always on your list.",
    href: "#back-office",
    src: "/realestate/dash-pipeline.jpg",
    alt: "The pipeline board with columns of people",
  },
  {
    title: "Deals from contract to close",
    body: "Key dates, checklists, a transaction coordinator, and compliance review, all on one board.",
    href: "#back-office",
    src: "/realestate/dash-deals.jpg",
    alt: "The deals board with stages and closing dates",
  },
  {
    title: "See who looks at your listings",
    body: "Views, visitors, and where they came from, with tagged links so you know which post or flyer worked.",
    href: "#website",
    src: "/realestate/dash-analytics.jpg",
    alt: "A listing analytics page with visitor numbers",
  },
  {
    title: "Flyers that print on one page",
    body: "Three styles, filled in from the listing. Print one or save it as a PDF.",
    href: "#website",
    src: "/realestate/flyer-editorial.jpg",
    alt: "A printable listing flyer",
  },
  {
    title: "A blog and a past-sales section",
    body: "A post calendar, pinned posts, and a Recently Sold section under your listings.",
    href: "#website",
    src: "/realestate/site-past-sales.jpg",
    alt: "A recently sold section on an agent website",
  },
  {
    title: "Your AI works inside it",
    body: "Connect Claude, ChatGPT, or Grok and ask it to draft follow-up texts, add a lead, or set a reminder.",
    href: "#ai",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function FeatureScroller() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  // Where the last click is heading, so two quick clicks go two cards instead of both starting from the same spot.
  const heading = useRef<number | null>(null);

  const step = useCallback(() => {
    const t = track.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return 320;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 20;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setProgress(max > 0 ? t.scrollLeft / max : 0);
    const here = Math.min(ITEMS.length - 1, Math.max(0, Math.round(t.scrollLeft / step())));
    setIndex(here);
    if (heading.current !== null && here === heading.current) heading.current = null;
  }, [step]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    const from = heading.current ?? Math.round(t.scrollLeft / step());
    const to = Math.min(ITEMS.length - 1, Math.max(0, from + dir));
    heading.current = to;
    t.scrollTo({ left: Math.min(to * step(), t.scrollWidth - t.clientWidth), behavior: "smooth" });
  };

  // Dragging with a mouse; touch and trackpads already scroll natively.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    heading.current = null;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) {
      setDragging(false);
      const t = track.current;
      if (t) t.scrollTo({ left: Math.round(t.scrollLeft / step()) * step(), behavior: "smooth" });
    }
  };

  return (
    <div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label="What comes with it. Scroll sideways."
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        }}
        className={`-mx-6 flex scroll-pl-6 gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:-mx-8 lg:scroll-pl-8 lg:px-8 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
      >
        {ITEMS.map((item, i) => (
          <li key={item.title} className="w-[82vw] shrink-0 snap-start sm:w-[400px]">
            <a
              href={item.href}
              draggable={false}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-bg-elevated transition-colors hover:border-border-strong"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-elevated-2">
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    sizes="(min-width: 640px) 400px, 82vw"
                    draggable={false}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-accent-soft text-accent">
                    <Sparkle weight="fill" className="size-14" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">{pad(i + 1)}</span>
                <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-text">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{item.body}</p>
                <span className="mt-auto pt-5 text-sm font-medium text-accent">
                  See how it works <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous"
            className="flex size-10 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:bg-bg-elevated disabled:opacity-35"
          >
            <ArrowLeft weight="bold" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={progress >= 0.995}
            aria-label="Next"
            className="flex size-10 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:bg-bg-elevated disabled:opacity-35"
          >
            <ArrowRight weight="bold" className="size-4" />
          </button>
        </div>
        <div className="h-px flex-1 bg-border" aria-hidden="true">
          <div className="h-px origin-left bg-accent transition-transform duration-200" style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
        </div>
        <p className="font-mono text-xs tabular-nums text-text-faint" aria-live="polite">
          {pad(index + 1)} / {pad(ITEMS.length)}
        </p>
      </div>
    </div>
  );
}
