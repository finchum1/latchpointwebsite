import type { Metadata } from "next";

export const REALESTATE_URL = "https://realestate.latchpointstudios.com";

const SHARE = {
  url: `${REALESTATE_URL}/realestate/og-map.jpg`,
  width: 2400,
  height: 1260,
  alt: "Latchpoint Real Estate",
};

/** Metadata for a Real Estate page. `path` is the public path on the subdomain ("" for the home page). */
export function realEstateMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${REALESTATE_URL}${path}` },
    openGraph: { title: "Latchpoint Real Estate", description, url: `${REALESTATE_URL}${path}`, siteName: "Latchpoint Real Estate", type: "website", images: [SHARE] },
    twitter: { card: "summary_large_image" },
  };
}
