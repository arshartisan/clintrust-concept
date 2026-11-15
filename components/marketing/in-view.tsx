"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface InViewProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
}

/**
 * Stamps `data-inview="true"` on a wrapper while it is on screen. CSS in
 * styles/brand.css keys every looping animation off that attribute, so the
 * children can stay server components and still only animate when visible.
 */
export function InView({ children, className, once, rootMargin }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, rootMargin });

  return (
    <div ref={ref} data-inview={inView} className={className}>
      {children}
    </div>
  );
}
