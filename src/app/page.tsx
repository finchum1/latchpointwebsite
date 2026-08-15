import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { ServicesBento } from "@/components/services-bento";
import { FeaturedWork } from "@/components/featured-work";
import { ProcessSteps } from "@/components/process-steps";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesBento />
      <FeaturedWork />
      <ProcessSteps />
      <CTASection />
    </>
  );
}
