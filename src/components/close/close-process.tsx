"use client";

import { Check, FileText, Key, LinkSimple } from "@phosphor-icons/react";
import { WalkingProcess, type WalkStep } from "../walking-process";
import "./close-process.css";

const steps: WalkStep[] = [
  {
    marker: "01",
    title: "You send the executed contract",
    body: "Use the form below or email it to me. Tell me who your client is and anything unusual about the deal.",
    caption: "The file arrives",
  },
  {
    marker: "02",
    title: "I open the file and send the links",
    body: "Within a business day you have your link, and your client has their timeline with your name on it. You can send it yourself, or I can.",
    caption: "The file opens",
  },
  {
    marker: "03",
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
 * How it works, the way the studio's How we work section does it (see WalkingProcess): a small deal file beside the
 * steps fills in to match. The contract arrives, the file opens with its dates and both links, then every date is
 * ticked off to closing.
 */
export function CloseProcess() {
  return (
    <WalkingProcess
      steps={steps}
      preview={(stage) => (
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
      )}
    />
  );
}
