"use client";

import { CalendarBlank, Check, Hammer, PhoneCall, Star } from "@phosphor-icons/react";
import { WalkingProcess, type WalkStep } from "../walking-process";

const steps: WalkStep[] = [
  {
    marker: "01",
    title: "A short call",
    body: "We learn what you sell, who buys it, and what you want a visitor to do. About twenty minutes, no jargon, and you get a fixed price.",
    caption: "The brief",
  },
  {
    marker: "02",
    title: "A real design to react to",
    body: "You see your actual homepage, not a wireframe, and tell us what to change before we build the rest.",
    caption: "The first look",
  },
  {
    marker: "03",
    title: "We build it in the open",
    body: "A working preview link you can open any time. Pages, photos, and forms come together while you watch and weigh in.",
    caption: "The working preview",
  },
  {
    marker: "04",
    title: "Launch and hand-off",
    body: "Live on your own domain, with the access and a short guide to run it. We stay on call for anything you want changed.",
    caption: "Live",
  },
];

/**
 * How it works, the way the studio's How we work section does it: a browser beside the steps builds up to match. First the
 * brief, then the first look as a layout, then the real page filling in, then live on the customer's own domain. The look of
 * the browser (the "pp" classes) comes from the shared stylesheet the walking steps import.
 */
export function WebsitesProcess() {
  return (
    <WalkingProcess
      steps={steps}
      lastMinHeight="26rem"
      preview={(stage) => (
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
                <p className="pp-eyebrow">What the site needs to do</p>
                <ul>
                  <li style={{ ["--i" as string]: 0 }}>
                    <Check weight="bold" /> Show our services and prices
                  </li>
                  <li style={{ ["--i" as string]: 1 }}>
                    <Check weight="bold" /> Let people ask for a quote
                  </li>
                  <li style={{ ["--i" as string]: 2 }}>
                    <Check weight="bold" /> Look great on a phone
                  </li>
                </ul>
                <p className="pp-eyebrow pp-skip-head">What it can skip</p>
                <ul className="pp-skip">
                  <li style={{ ["--i" as string]: 3 }}>Blog</li>
                  <li style={{ ["--i" as string]: 4 }}>Online store</li>
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
                    <span className="pp-real">Reviews</span>
                    <span className="pp-real">Contact</span>
                  </span>
                </div>

                <div className="pp-hero">
                  <div className="pp-stack">
                    <span className="pp-wire pp-bar-lg" />
                    <span className="pp-wire pp-bar-lg pp-short" />
                    <h4 className="pp-real">Honest roofing, done right the first time.</h4>
                  </div>
                  <div className="pp-stack">
                    <span className="pp-wire pp-bar-sm pp-mid" />
                    <p className="pp-real">Free estimates and same-week visits across the metro.</p>
                  </div>
                  <div className="pp-stack pp-cta">
                    <span className="pp-wire pp-btn-wire" />
                    <span className="pp-real pp-btn">Get a free quote</span>
                  </div>
                </div>

                <div className="pp-cards">
                  {[
                    { Icon: Hammer, label: "Our services" },
                    { Icon: Star, label: "5-star reviews" },
                    { Icon: CalendarBlank, label: "Book a visit" },
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
                    <em style={{ ["--i" as string]: 0 }}>Pages</em>
                    <em style={{ ["--i" as string]: 1 }}>Photos</em>
                    <em style={{ ["--i" as string]: 2 }}>Forms</em>
                  </span>
                </div>
                <div className="pp-strip-ship">
                  <PhoneCall weight="bold" /> Live on your domain. Access and guide handed over.
                </div>
              </div>
            </div>
          </div>
          <p className="pp-caption">
            <span>{String(stage + 1).padStart(2, "0")}</span> {steps[stage].title} &middot; {steps[stage].caption}
          </p>
        </div>
      )}
    />
  );
}
