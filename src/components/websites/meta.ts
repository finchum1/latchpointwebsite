import type { Metadata } from "next";

export const WEBSITES_URL = "https://websites.latchpointstudios.com";

const SHARE = {
  url: `${WEBSITES_URL}/websites/og-websites-3.jpg`,
  width: 2400,
  height: 1260,
  alt: "Latchpoint Websites: websites for small businesses",
};

/** Metadata for a Websites page. `path` is the public path on the subdomain ("" for the home page). */
export function websitesMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${WEBSITES_URL}${path}` },
    openGraph: { title: "Latchpoint Websites", description, url: `${WEBSITES_URL}${path}`, siteName: "Latchpoint Websites", type: "website", images: [SHARE] },
    twitter: { card: "summary_large_image" },
  };
}
