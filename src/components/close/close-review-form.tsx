"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle, Star } from "@phosphor-icons/react";
import { motion } from "motion/react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "text-sm font-medium text-text";

/** The review page's form for Latchpoint Close. Posts to /api/review, which saves a pending review to HQ; nothing shows publicly until it is approved there. */
export function CloseReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) {
      setStatus("error");
      setErrorMessage("Please choose a star rating.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "close",
          name: data.name,
          brokerage: data.brokerage,
          email: data.email,
          rating,
          quote: data.quote,
          showName: data.showName === "on",
          hp: data.website,
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
        <h3 className="text-lg font-medium text-text">Thank you</h3>
        <p className="text-sm leading-relaxed text-text-muted">
          I read every one of these. I&rsquo;ll look it over, and with your OK it will appear on the site.
        </p>
      </motion.div>
    );
  }

  const shown = hover || rating;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      {/* Honeypot: real visitors never see or fill this field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="rv-website">Website</label>
        <input id="rv-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>How was it?</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              aria-pressed={rating === n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              className="rounded-md p-1 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            >
              <Star weight={n <= shown ? "fill" : "regular"} className={`size-8 ${n <= shown ? "text-accent" : "text-text-faint"}`} />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="rv-quote" className={labelClass}>
          What was it like working with me?
        </label>
        <textarea id="rv-quote" name="quote" rows={5} required maxLength={2000} className={`${inputClass} resize-none`} placeholder="A few honest sentences are plenty." />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="rv-name" className={labelClass}>
            Your name
          </label>
          <input id="rv-name" name="name" type="text" required maxLength={200} className={inputClass} placeholder="Jordan Reyes" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="rv-brokerage" className={labelClass}>
            Brokerage <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input id="rv-brokerage" name="brokerage" type="text" maxLength={200} className={inputClass} placeholder="Reyes Realty Group" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rv-email" className={labelClass}>
          Email <span className="font-normal text-text-faint">(optional, only so I can thank you; never shown)</span>
        </label>
        <input id="rv-email" name="email" type="email" maxLength={320} className={inputClass} placeholder="jordan@brokerage.com" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
        <input type="checkbox" name="showName" defaultChecked className="mt-1 size-4 accent-[var(--accent)]" />
        <span>
          You can show my name and brokerage with my review. <span className="text-text-faint">(Uncheck it to appear as &ldquo;An Oklahoma agent&rdquo;.)</span>
        </span>
      </label>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium leading-none text-accent-foreground shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-all duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send my review"}
        </button>
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
