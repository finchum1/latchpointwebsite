import type { NextConfig } from "next";

const MAIN_ORIGIN = "https://latchpointstudios.com";

// Sites that live in this same app, each served at the root of its own subdomain. A "multi" site also serves its
// inner pages there: /pricing on the subdomain is /close/pricing inside the app, and so on.
const SUBDOMAIN_PAGES = [
  { host: "realestate.latchpointstudios.com", path: "/realestate", multi: true },
  { host: "close.latchpointstudios.com", path: "/close", multi: true },
  { host: "websites.latchpointstudios.com", path: "/websites", multi: true },
];

// Studio-site sections. A single-page site's subdomain would send these to the main domain; every site here is multi-page now, so this is unused, but kept for any future single-page one.
const STUDIO_PATHS = ["work", "services", "about", "contact", "solutions"];

const nextConfig: NextConfig = {
  // Dev only: lets the dev server be opened at the real subdomain names (mapped to localhost) to test the host rewrites.
  allowedDevOrigins: SUBDOMAIN_PAGES.map(({ host }) => host),

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
      beforeFiles: SUBDOMAIN_PAGES.flatMap(({ host, path, multi }) => [
        {
          source: "/",
          has: [{ type: "host" as const, value: host }],
          destination: path,
        },
        // Inner pages: anything that isn't a file (no dot), the framework, or the API.
        ...(multi
          ? [
              {
                // Rewrites chain, so skip a path that is already this site's internal one (/ becomes /close, which must stay).
                source: `/:page((?!_next/|api/|${path.slice(1)}(?:/|$))[^.]+)`,
                has: [{ type: "host" as const, value: host }],
                destination: `${path}/:page`,
              },
            ]
          : []),
      ]),
    };
  },

  async redirects() {
    return [
      // Latchpoint Close's first working name. Anything on it goes to the
      // same path on close.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "tc.latchpointstudios.com" }],
        destination: "https://close.latchpointstudios.com/:path*",
        permanent: false,
      },
      ...SUBDOMAIN_PAGES.flatMap(({ host, path, multi }) => [
        // One canonical home for each site: its subdomain, not the path on the main domain.
        {
          source: path,
          has: [{ type: "host" as const, value: "(www\\.)?latchpointstudios\\.com" }],
          destination: `https://${host}`,
          permanent: false,
        },
        ...(multi
          ? [
              {
                source: `${path}/:page([^.]+)`,
                has: [{ type: "host" as const, value: "(www\\.)?latchpointstudios\\.com" }],
                destination: `https://${host}/:page`,
                permanent: false,
              },
            ]
          : // A single-page site has no pages of its own: the studio sections go to the main domain.
            STUDIO_PATHS.map((base) => ({
              source: `/${base}/:path*`,
              has: [{ type: "host" as const, value: host }],
              destination: `${MAIN_ORIGIN}/${base}/:path*`,
              permanent: false,
            }))),
      ]),
    ];
  },
};

export default nextConfig;
