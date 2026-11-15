import { Audiences } from "@/components/marketing/audiences";
import { Capital } from "@/components/marketing/capital";
import { CtaBand } from "@/components/marketing/cta-band";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Platform } from "@/components/marketing/platform";
import { Problem } from "@/components/marketing/problem";
import { Region } from "@/components/marketing/region";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Capital />
      <Audiences />
      <Platform />
      <Region />
      <CtaBand />
    </>
  );
}
