import type { NextConfig } from "next";

const REALESTATE_HOST = "realestate.latchpointstudios.com";
const MAIN_ORIGIN = "https://latchpointstudios.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },

  // The real estate landing page lives at /realestate in this same app, and
  // the subdomain just serves it at its own root.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: REALESTATE_HOST }],
          destination: "/realestate",
        },
      ],
    };
  },

  async redirects() {
    return [
      // One canonical home for the page: the subdomain, not /realestate on
      // the main domain.
      {
        source: "/realestate",
        has: [{ type: "host", value: "(www\\.)?latchpointstudios\\.com" }],
        destination: `https://${REALESTATE_HOST}`,
        permanent: false,
      },
      // The subdomain is a single landing page. Any studio-site path
      // requested on it goes to the same path on the main domain.
      ...["work", "services", "about", "contact", "solutions"].map((base) => ({
        source: `/${base}/:path*`,
        has: [{ type: "host" as const, value: REALESTATE_HOST }],
        destination: `${MAIN_ORIGIN}/${base}/:path*`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
