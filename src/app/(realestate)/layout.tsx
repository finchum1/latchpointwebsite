import { RealEstateNav } from "@/components/realestate/re-nav";
import { RealEstateFooter } from "@/components/realestate/re-footer";

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RealEstateNav />
      <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
      <RealEstateFooter />
    </>
  );
}
