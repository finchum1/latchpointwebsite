"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Magnetic } from "../magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "text-sm font-medium text-text";

const ROLES = ["Solo agent", "Agent at a brokerage", "Team lead", "Brokerage owner or manager", "Something else"];
const SIZES = ["Just me", "2 to 5 agents", "6 to 20 agents", "21 to 50 agents", "More than 50"];

/** Early-access request for Latchpoint Real Estate. Posts to the studio's
 *  contact API, which saves it to HQ's inquiries and emails it, tagged so it
 *  can be counted separately from custom project inquiries. */
export function EarlyAccessForm() {
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
          projectType: "early-access",
          source: "realestate.latchpointstudios.com/early-access",
          hp: data.website,
          message: [
            `Role: ${data.role}`,
            `Size: ${data.size}`,
            data.tools ? `Uses today: ${data.tools}` : null,
            data.notes ? `Wants most: ${data.notes}` : null,
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
        <h3 className="text-lg font-medium text-text">You&rsquo;re on the list</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Thanks. We&rsquo;re inviting people in a few at a time, by hand. We&rsquo;ll email you to set up a short call
          when there&rsquo;s a spot, and you&rsquo;ll get a confirmation at the address you gave us now.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      {/* Honeypot: real visitors never see or fill this field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ea-website">Website</label>
        <input id="ea-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-name" className={labelClass}>
            Name
          </label>
          <input id="ea-name" name="name" type="text" required className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-email" className={labelClass}>
            Email
          </label>
          <input id="ea-email" name="email" type="email" required className={inputClass} placeholder="jordan@brokerage.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-role" className={labelClass}>
            I&rsquo;m a
          </label>
          <select id="ea-role" name="role" className={inputClass} defaultValue={ROLES[0]}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-size" className={labelClass}>
            Agents, including you
          </label>
          <select id="ea-size" name="size" className={inputClass} defaultValue={SIZES[0]}>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-company" className={labelClass}>
            Brokerage or team <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="ea-company" name="company" type="text" className={inputClass} placeholder="Reyes Realty Group" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ea-tools" className={labelClass}>
            What do you use today? <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="ea-tools" name="tools" type="text" className={inputClass} placeholder="A site, a CRM, spreadsheets..." />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ea-notes" className={labelClass}>
          What would you want it to do for you? <span className="font-normal text-text-faint">(optional)</span>
        </label>
        <textarea id="ea-notes" name="notes" rows={3} className={`${inputClass} resize-none`} />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Request early access"}
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
