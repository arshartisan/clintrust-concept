import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * BoardUI's entrance (fade + slight scale + small blur, ease-out), played once
 * when the element scrolls into view. Used on section headings only; body
 * content stays still so the page does not shimmer as it scrolls.
 *
 * Pure CSS (`.reveal` in styles/brand.css) driven by InView's data attribute:
 * no animation library, and visible by default without JS or with reduced motion.
 */
export function Reveal({ children, className }: RevealProps) {
  return (
    <InView once rootMargin="0px 0px -12% 0px" className={cx("reveal", className)}>
      {children}
    </InView>
  );
}
