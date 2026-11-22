import { LatchpointFamily } from "@/components/latchpoint-family";
import { WebsitesNav } from "@/components/websites/websites-nav";
import { WebsitesFooter } from "@/components/websites/websites-footer";

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-brand="websites" className="contents">
      <WebsitesNav />
      <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
      <LatchpointFamily current="websites" />
      <WebsitesFooter />
    </div>
  );
}
