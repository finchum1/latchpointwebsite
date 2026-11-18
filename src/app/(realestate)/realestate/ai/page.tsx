import type { Metadata } from "next";
import { AiSection } from "@/components/realestate/ai-section";
import { CtaBand } from "@/components/subsite/parts";
import { realEstateMetadata } from "@/components/realestate/meta";

export const metadata: Metadata = realEstateMetadata("/ai", "AI built in: Latchpoint Real Estate", "Bring the AI you already use. Connect Claude, ChatGPT, or Grok to your dashboard and just ask.");

export default function RealEstateAi() {
  return (
    <>
      {/* ------------------------------ AI built in ----------------------------- */}
      <section id="ai" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <AiSection asH1 />
        </div>
      </section>
      <CtaBand title="Want your website and back office built?" body="Tell me about your site and your office, and I'll set you up." label="Request early access" href="/early-access" />
    </>
  );
}
