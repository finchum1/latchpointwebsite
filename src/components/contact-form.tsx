"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Magnetic } from "./magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg-elevated px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";

const labelClass = "text-sm font-medium text-text";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          Thanks for reaching out. We’ll reply within a business day at the
          email address you gave us.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="jordan@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select id="projectType" name="projectType" className={inputClass} defaultValue="website">
            <option value="website">Website</option>
            <option value="webapp">Web app</option>
            <option value="dashboard">Dashboard</option>
            <option value="personal">Personal app</option>
            <option value="crm">CRM</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>
            Budget range <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="under-3k">Under $3,000</option>
            <option value="3k-10k">$3,000 to $10,000</option>
            <option value="10k-25k">$10,000 to $25,000</option>
            <option value="25k-plus">$25,000+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          What are you trying to build?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your business and what the software needs to do."
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-accent-hover">
          <WarningCircle weight="fill" className="mt-0.5 size-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <Magnetic strength={0.2}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </Magnetic>
    </form>
  );
}
