import { Audiences } from "@/components/marketing/audiences";
import { CtaBand } from "@/components/marketing/cta-band";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { KeycapMarquee } from "@/components/marketing/keycap-marquee";
import { PainPicker } from "@/components/marketing/pain-picker";
import { Proof } from "@/components/marketing/proof";
import { WaitingCounter } from "@/components/marketing/waiting-counter";

/** Page flow from the client brief (docs/feedback, sprint 8). */
export default function Home() {
  return (
    <>
      <Hero />
      <KeycapMarquee />
      <PainPicker />
      <WaitingCounter />
      <Audiences />
      <HowItWorks />
      <Proof />
      <CtaBand />
    </>
  );
}
