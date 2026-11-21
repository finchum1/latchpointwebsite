import type { Metadata } from "next";

export const CLOSE_URL = "https://close.latchpointstudios.com";

const SHARE = {
  url: `${CLOSE_URL}/close/og-latchpoint-close-2.jpg`,
  width: 2400,
  height: 1260,
  alt: "Latchpoint Close: transaction coordination for Oklahoma agents",
};

/** Metadata for a Close page. `path` is the public path on the subdomain ("" for the home page). */
export function closeMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${CLOSE_URL}${path}` },
    openGraph: { title: "Latchpoint Close", description, url: `${CLOSE_URL}${path}`, siteName: "Latchpoint Close", type: "website", images: [SHARE] },
    twitter: { card: "summary_large_image" },
  };
}
