"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Magnetic } from "../magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "text-sm font-medium text-text";

const NEEDS = ["A file under contract now", "One coming up soon", "Just getting to know you"];
const VOLUME = ["1 to 2 a month", "3 to 5 a month", "6 to 10 a month", "More than 10"];

/** "Send me a file" for Close by Latchpoint. Posts to the studio's contact API, which saves it to HQ's
 *  inquiries and emails it, tagged as a Close request so it's counted apart from studio projects. */
export function CloseStartForm() {
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
          projectType: "close",
          source: "close.latchpointstudios.com/start",
          hp: data.website,
          message: [
            data.phone ? `Phone: ${data.phone}` : null,
            `Needs: ${data.need}`,
            `Volume: ${data.volume}`,
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
          Thanks. I&rsquo;ll reach out by the end of the next business day. If you have a contract ready, reply to my
          email with it and I&rsquo;ll get the file open.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      {/* Honeypot: real visitors never see or fill this field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="close-website">Website</label>
        <input id="close-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="close-name" className={labelClass}>
            Name
          </label>
          <input id="close-name" name="name" type="text" required className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="close-email" className={labelClass}>
            Email
          </label>
          <input id="close-email" name="email" type="email" required className={inputClass} placeholder="jordan@brokerage.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="close-phone" className={labelClass}>
            Phone <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="close-phone" name="phone" type="tel" className={inputClass} placeholder="(405) 555-0100" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="close-company" className={labelClass}>
            Brokerage <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="close-company" name="company" type="text" className={inputClass} placeholder="Reyes Realty Group" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="close-need" className={labelClass}>
            I have
          </label>
          <select id="close-need" name="need" className={inputClass} defaultValue={NEEDS[0]}>
            {NEEDS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="close-volume" className={labelClass}>
            Deals I close
          </label>
          <select id="close-volume" name="volume" className={inputClass} defaultValue={VOLUME[0]}>
            {VOLUME.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="close-notes" className={labelClass}>
          Anything I should know? <span className="font-normal text-text-faint">(optional)</span>
        </label>
        <textarea
          id="close-notes"
          name="notes"
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Address, closing date, buyer or seller side..."
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send"}
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
