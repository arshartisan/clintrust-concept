import type { Metadata } from "next";

// Review pages: keep them out of search results. The fonts (Bricolage
// Grotesque headlines, Manrope body) are loaded site-wide in app/layout.tsx.
export const metadata: Metadata = {
  title: "Hero concepts",
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({ children }: LayoutProps<"/concepts">) {
  return children;
}
