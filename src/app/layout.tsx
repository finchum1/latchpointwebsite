import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Latchpoint Studios",
    template: "%s | Latchpoint Studios",
  },
  description:
    "Latchpoint Studios designs and builds websites, apps, dashboards, client portals, and CRMs for businesses, nonprofits and ministries, and personal projects, usually in weeks, not quarters.",
  // Link previews. Pages with their own openGraph (the real estate and Close landing pages) replace this wholesale.
  openGraph: {
    title: "Latchpoint Studios",
    description: "We build the software your business runs on: websites, apps, dashboards, client portals, and CRMs, usually in weeks, not quarters.",
    url: "https://latchpointstudios.com",
    siteName: "Latchpoint Studios",
    type: "website",
    images: [{ url: "https://latchpointstudios.com/og.jpg", width: 2400, height: 1260, alt: "Latchpoint Studios: we build the software your business runs on." }],
  },
  twitter: { card: "summary_large_image" },
};

// Runs before hydration so a returning light-mode visitor never sees a
// flash of the default dark theme. Reads localStorage directly rather than
// matchMedia, since dark (not the OS preference) is this site's default
// until someone explicitly opts into light via the nav toggle.
const themeInitScript = `
  try {
    if (localStorage.getItem('latchpoint-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="grain" />
        {/* Nav, main, and footer live in the route-group layouts -- (site)
            for the studio site, (realestate) for the real estate landing
            page -- so each can have its own navigation. */}
        {children}
      </body>
    </html>
  );
}
