import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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
        <Nav />
        {/* The nav is now `fixed` (a floating pill) instead of occupying
            flow height, so this reserves the same clearance every page
            used to get for free from the old in-flow header. */}
        <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
