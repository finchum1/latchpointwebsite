"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Magnetic } from "../magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "text-sm font-medium text-text";

// Maps what an agent is shopping for onto the contact API's project types,
// so the existing email template still reads correctly.
const NEEDS: Record<string, { label: string; projectType: string }> = {
  both: { label: "A website and a back office", projectType: "crm" },
  agent: { label: "An agent website", projectType: "website" },
  brokerage: { label: "A brokerage website", projectType: "website" },
  backoffice: { label: "Just the back office (leads, pipeline, transactions)", projectType: "crm" },
  unsure: { label: "Not sure yet", projectType: "other" },
};

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const need = NEEDS[data.need] ?? NEEDS.unsure;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          projectType: need.projectType,
          source: "realestate.latchpointstudios.com",
          message: `${need.label}\n\n${data.message}`,
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
        className="flex flex-col items-start gap-3 rounded-[20px] border border-border bg-bg-elevated p-8"
      >
        <CheckCircle weight="fill" className="size-8 text-accent" />
        <h3 className="text-lg font-medium text-text">Message received</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Thanks for reaching out. We&rsquo;ll reply within a business day at the email address you gave us.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="re-name" className={labelClass}>
            Name
          </label>
          <input id="re-name" name="name" type="text" required className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="re-email" className={labelClass}>
            Email
          </label>
          <input
            id="re-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="jordan@brokerage.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="re-company" className={labelClass}>
            Brokerage or team <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="re-company" name="company" type="text" className={inputClass} placeholder="Reyes Realty Group" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="re-need" className={labelClass}>
            What are you after?
          </label>
          <select id="re-need" name="need" className={inputClass} defaultValue="both">
            {Object.entries(NEEDS).map(([value, n]) => (
              <option key={value} value={value}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="re-message" className={labelClass}>
          Tell us how you work today
        </label>
        <textarea
          id="re-message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Where your leads come from, what you track (and where), what your current site is missing."
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
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
