import { Audiences } from "@/components/marketing/audiences";
import { CapitalCalculator } from "@/components/marketing/capital-calculator";
import { CtaBand } from "@/components/marketing/cta-band";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Platform, Region } from "@/components/marketing/platform";
import { Problem } from "@/components/marketing/problem";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <CapitalCalculator />
      <Audiences />
      <Platform />
      <Region />
      <CtaBand />
    </>
  );
}
