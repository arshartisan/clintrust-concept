import type { Metadata } from "next";
import { ConceptBar } from "@/components/concepts/concept-bar";
import { HeroCashFlowCalled } from "@/components/concepts/hero-cash-flow-called";
import { heroConcepts } from "@/content/landing";

const concept = heroConcepts.items[1];

export const metadata: Metadata = { title: `Concept ${concept.letter}: ${concept.name}` };

export default function Page() {
  return (
    <>
      <ConceptBar slug={concept.slug} />
      <HeroCashFlowCalled />
    </>
  );
}
