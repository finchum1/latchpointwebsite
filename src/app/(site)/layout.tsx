import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {/* The nav is `fixed` (a floating pill) instead of occupying flow
          height, so this reserves the clearance every page used to get for
          free from the old in-flow header. */}
      <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
      <Footer />
    </>
  );
}
