"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Magnetic } from "../magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "text-sm font-medium text-text";

const NEEDS = ["A new website", "A redesign of my current site", "More than a website (booking, logins, a dashboard)", "Not sure yet"];

/** "Get a free quote" for Latchpoint Websites. Posts to the studio's contact API, which saves it to HQ's
 *  inquiries and emails it, tagged as a Websites request so it's counted apart from studio projects. */
export function WebsitesStartForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          projectType: "websites",
          source: "websites.latchpointstudios.com/start",
          hp: data.website,
          message: [
            data.phone ? `Phone: ${data.phone}` : null,
            data.kind ? `Kind of business: ${data.kind}` : null,
            data.site ? `Current website: ${data.site}` : null,
            `Needs: ${data.need}`,
            data.notes ? `Notes: ${data.notes}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-3 rounded-[20px] border border-border bg-bg p-8"
      >
        <CheckCircle weight="fill" className="size-8 text-accent" />
        <h3 className="text-lg font-medium text-text">Got it</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Thanks. We&rsquo;ll reach out by the end of the next business day to set up a short call. If you have a
          website you like, or one you want to replace, reply to our email with the link.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      {/* Honeypot: real visitors never see or fill this field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ws-website">Website</label>
        <input id="ws-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-name" className={labelClass}>
            Name
          </label>
          <input id="ws-name" name="name" type="text" required className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-email" className={labelClass}>
            Email
          </label>
          <input id="ws-email" name="email" type="email" required className={inputClass} placeholder="jordan@yourbusiness.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-phone" className={labelClass}>
            Phone <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="ws-phone" name="phone" type="tel" className={inputClass} placeholder="(405) 555-0100" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-company" className={labelClass}>
            Business name
          </label>
          <input id="ws-company" name="company" type="text" required className={inputClass} placeholder="Reyes Roofing" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-kind" className={labelClass}>
            What kind of business?
          </label>
          <input id="ws-kind" name="kind" type="text" className={inputClass} placeholder="Roofing, salon, bakery, church..." />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ws-site" className={labelClass}>
            Current website <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="ws-site" name="site" type="text" className={inputClass} placeholder="yourbusiness.com" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ws-need" className={labelClass}>
          I&rsquo;m looking for
        </label>
        <select id="ws-need" name="need" className={inputClass} defaultValue={NEEDS[0]}>
          {NEEDS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ws-notes" className={labelClass}>
          Anything we should know? <span className="font-normal text-text-faint">(optional)</span>
        </label>
        <textarea
          id="ws-notes"
          name="notes"
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="What you do, who your customers are, what you want the site to do..."
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Get my free quote"}
          </button>
        </Magnetic>
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-accent-hover">
            <WarningCircle weight="fill" className="size-4" />
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
