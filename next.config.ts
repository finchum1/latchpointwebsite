import type { NextConfig } from "next";

const MAIN_ORIGIN = "https://latchpointstudios.com";

// Landing pages that live at a path in this same app, each served at the root
// of its own subdomain.
const SUBDOMAIN_PAGES = [
  { host: "realestate.latchpointstudios.com", path: "/realestate" },
  { host: "tc.latchpointstudios.com", path: "/tc" },
];

// Studio-site sections. Requested on a subdomain, they go to the main domain.
const STUDIO_PATHS = ["work", "services", "about", "contact", "solutions"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },

  async rewrites() {
    return {
      beforeFiles: SUBDOMAIN_PAGES.map(({ host, path }) => ({
        source: "/",
        has: [{ type: "host" as const, value: host }],
        destination: path,
      })),
    };
  },

  async redirects() {
    return SUBDOMAIN_PAGES.flatMap(({ host, path }) => [
      // One canonical home for each page: its subdomain, not the path on the
      // main domain.
      {
        source: path,
        has: [{ type: "host" as const, value: "(www\\.)?latchpointstudios\\.com" }],
        destination: `https://${host}`,
        permanent: false,
      },
      // Each subdomain is a single landing page.
      ...STUDIO_PATHS.map((base) => ({
        source: `/${base}/:path*`,
        has: [{ type: "host" as const, value: host }],
        destination: `${MAIN_ORIGIN}/${base}/:path*`,
        permanent: false,
      })),
    ]);
  },
};

export default nextConfig;
