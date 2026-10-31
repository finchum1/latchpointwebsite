import { TcNav } from "@/components/tc/tc-nav";
import { TcFooter } from "@/components/tc/tc-footer";

export default function TcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TcNav />
      <main className="flex-1 pt-[104px] sm:pt-[112px]">{children}</main>
      <TcFooter />
    </>
  );
}
