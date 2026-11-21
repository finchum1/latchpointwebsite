import { CloseNav } from "@/components/close/close-nav";
import { CloseFooter } from "@/components/close/close-footer";

export default function CloseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-brand="close" className="contents">
      <CloseNav />
      <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
      <CloseFooter />
    </div>
  );
}
