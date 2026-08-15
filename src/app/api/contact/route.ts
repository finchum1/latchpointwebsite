import { NextResponse } from "next/server";

const PROJECT_TYPES: Record<string, string> = {
  website: "Website",
  webapp: "Web app",
  dashboard: "Dashboard",
  personal: "Personal app",
  crm: "CRM",
  other: "Not sure yet",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;

  // Not configured yet: acknowledge receipt without sending. Set
  // RESEND_API_KEY and CONTACT_TO_EMAIL in the environment to enable
  // real delivery (see README).
  if (!apiKey || !toAddress) {
    console.log("[contact] form submission (email not configured):", body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const projectType = PROJECT_TYPES[body.projectType] ?? "Not sure yet";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Latchpoint Studios <site@latchpointstudios.com>",
      to: [toAddress],
      reply_to: body.email,
      subject: `New project inquiry: ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Project type: ${projectType}`,
        body.budget ? `Budget: ${body.budget}` : null,
        "",
        body.message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend error:", res.status, detail);
    return NextResponse.json({ error: "Could not send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
