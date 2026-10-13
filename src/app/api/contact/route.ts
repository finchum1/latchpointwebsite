import { NextResponse } from "next/server";

const PROJECT_TYPES: Record<string, string> = {
  website: "Website",
  webapp: "Web app",
  dashboard: "Dashboard",
  personal: "Personal app",
  crm: "CRM",
  other: "Not sure yet",
};

const BUDGETS: Record<string, string> = {
  "under-3k": "Under $3,000",
  "3k-10k": "$3,000 to $10,000",
  "10k-25k": "$10,000 to $25,000",
  "25k-plus": "$25,000+",
};

// Sites other than this one that post their start-a-project form here.
const ALLOWED_ORIGINS = ["https://theagency.latchpointstudios.com"];

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

const FALLBACK_ERROR =
  "We couldn't send your message. Please email terrence@latchpointstudios.com directly and we'll get right back to you.";

/** A trimmed string, cut to `max`, or null when blank / not a string. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v || null;
}

type Inquiry = {
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  source: string | null;
  message: string;
};

/** Backup copy in HQ's database (the inquiries table). The public key can only
 *  insert, never read, so a leaked key exposes nothing. */
async function saveToHq(inquiry: Inquiry): Promise<boolean> {
  const url = process.env.HQ_SUPABASE_URL;
  const key = process.env.HQ_SUPABASE_ANON_KEY;
  if (!url || !key) return false;

  const res = await fetch(`${url}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(inquiry),
  });
  if (!res.ok) {
    console.error("[contact] HQ save failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Notification email to the studio inbox, via Resend. */
async function sendEmail(inquiry: Inquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Latchpoint Studios <site@latchpointstudios.com>",
      to: [to],
      reply_to: inquiry.email,
      subject: `New project inquiry: ${inquiry.name}`,
      text: [
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        inquiry.company ? `Company: ${inquiry.company}` : null,
        `Project type: ${inquiry.project_type}`,
        inquiry.budget ? `Budget: ${inquiry.budget}` : null,
        inquiry.source ? `Source: ${inquiry.source}` : null,
        "",
        inquiry.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

export function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request);
  const body = await request.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field, bots usually do.
  // Look like a success so they don't retry, but keep nothing.
  if (typeof body?.hp === "string" && body.hp.trim()) {
    return NextResponse.json({ ok: true }, { headers });
  }

  const name = clean(body?.name, 200);
  const email = clean(body?.email, 320);
  const message = clean(body?.message, 10000);
  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Please fill in your name, email and a message." }, { status: 400, headers });
  }

  const inquiry: Inquiry = {
    name,
    email,
    company: clean(body.company, 200),
    project_type: PROJECT_TYPES[body.projectType] ?? "Not sure yet",
    budget: BUDGETS[body.budget] ?? clean(body.budget, 100),
    source: clean(body.source, 100),
    message,
  };

  // Do both so one failing never loses the lead. The visitor only sees an
  // error when neither worked, since then nobody will ever see the message.
  const [saved, emailed] = await Promise.all([
    saveToHq(inquiry).catch((err) => (console.error("[contact] HQ save threw:", err), false)),
    sendEmail(inquiry).catch((err) => (console.error("[contact] email threw:", err), false)),
  ]);

  if (!saved && !emailed) {
    console.error("[contact] inquiry NOT delivered anywhere:", inquiry);
    return NextResponse.json({ error: FALLBACK_ERROR }, { status: 502, headers });
  }

  return NextResponse.json({ ok: true, saved, emailed }, { headers });
}
