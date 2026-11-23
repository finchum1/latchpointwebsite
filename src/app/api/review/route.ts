import { NextResponse } from "next/server";

const PRODUCTS = ["close", "websites", "realestate"];
const FALLBACK_ERROR = "We couldn't save your review. Please email hello@latchpointstudios.com and say what you'd like to say, and thank you.";

/** A trimmed string, cut to `max`, or null when blank / not a string. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v || null;
}

type Review = {
  product: string;
  name: string;
  brokerage: string | null;
  email: string | null;
  rating: number;
  quote: string;
  show_name: boolean;
  status: "pending";
  source: string;
};

/** Saves the review to HQ's reviews table as PENDING. The public key can only insert pending rows and read the approved view, so nothing a
 *  visitor sends can show up on a website before a person approves it in HQ. */
async function saveToHq(review: Review): Promise<boolean> {
  const url = process.env.HQ_SUPABASE_URL;
  const key = process.env.HQ_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/reviews`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(review),
  });
  if (!res.ok) {
    console.error("[review] HQ save failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Heads-up email to the studio inbox so a new review doesn't wait unseen. Best effort: the review is already saved. */
async function notify(review: Review): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Latchpoint Studios <site@latchpointstudios.com>",
        to: [to],
        reply_to: review.email ?? undefined,
        subject: `New review (${review.rating} stars) from ${review.name}`,
        text: [
          `${review.name}${review.brokerage ? `, ${review.brokerage}` : ""} left a ${review.rating}-star review of ${review.product}.`,
          review.show_name ? "They said their name can be shown." : "They asked NOT to have their name shown.",
          "",
          review.quote,
          "",
          "It is waiting for your OK in HQ > Reviews. Nothing shows on the site until you approve it.",
        ].join("\n"),
      }),
    });
    if (!res.ok) console.error("[review] notify error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[review] notify threw:", err);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field, bots usually do. Look like a success, keep nothing.
  if (typeof body?.hp === "string" && body.hp.trim()) return NextResponse.json({ ok: true });

  const name = clean(body?.name, 200);
  const quote = clean(body?.quote, 2000);
  const rating = Number(body?.rating);
  const email = clean(body?.email, 320);
  if (!name || !quote || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a star rating and write a few words." }, { status: 400 });
  }
  if (email && !email.includes("@")) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });

  const review: Review = {
    product: PRODUCTS.includes(body?.product) ? body.product : "close",
    name,
    brokerage: clean(body?.brokerage, 200),
    email,
    rating,
    quote,
    show_name: body?.showName !== false,
    status: "pending",
    source: "review page",
  };

  const saved = await saveToHq(review).catch((err) => (console.error("[review] HQ save threw:", err), false));
  if (!saved) {
    console.error("[review] NOT saved:", review);
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 502 });
  }
  await notify(review);
  return NextResponse.json({ ok: true });
}
