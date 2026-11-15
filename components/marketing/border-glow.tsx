"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cx } from "@/utils/cx";

interface BorderGlowProps {
  children: ReactNode;
  /** Classes for the card: radius, border, background. */
  className?: string;
  /** Delay before the one-off intro sweep, in ms (stagger cards in a grid). */
  sweepDelay?: number;
}

/**
 * A card whose border lights up toward the cursor.
 *
 * Adapted from React Bits' BorderGlow (reactbits.dev/components/border-glow).
 * All the drawing is CSS (`.glow-card*` in styles/brand.css); this component
 * only reports where the pointer is, by writing two CSS variables straight
 * onto the element. It never sets React state on pointer move, so the card's
 * children are not re-rendered while the cursor travels across it.
 *
 * Also stamps `data-inview`, which (a) plays one sweep of the glow when the
 * card first appears, the whole effect on touch screens, and (b) switches on
 * any `iso-*` animation inside the card while it is visible.
 */
export function BorderGlow({ children, className, sweepDelay = 0 }: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const seen = useInView(ref, { once: true, rootMargin: "0px 0px -20% 0px" });

  // Play the intro sweep exactly once, the first time the card is seen.
  useEffect(() => {
    const card = ref.current;
    if (!card || !seen) return;
    card.dataset.sweep = "run";
    const done = (event: AnimationEvent) => {
      if (event.target === card) delete card.dataset.sweep;
    };
    card.addEventListener("animationend", done);
    return () => card.removeEventListener("animationend", done);
  }, [seen]);

  useEffect(() => {
    const card = ref.current;
    // Only track a real cursor. Touch and pen get the intro sweep instead.
    if (!card || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pointer) return;
      const rect = card.getBoundingClientRect();
      const cx0 = rect.width / 2;
      const cy0 = rect.height / 2;
      const dx = pointer.x - rect.left - cx0;
      const dy = pointer.y - rect.top - cy0;
      // 0 at the centre, 1 on the nearest edge.
      const edge = Math.min(1, Math.max(Math.abs(dx) / cx0, Math.abs(dy) / cy0));
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      card.style.setProperty("--glow-angle", `${angle.toFixed(1)}deg`);
      card.style.setProperty("--glow-edge", edge.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      card.dataset.tracking = "true";
      // At most one write per frame, however fast pointer events arrive.
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      pointer = null;
      card.dataset.tracking = "false";
      card.style.setProperty("--glow-edge", "0");
    };

    card.addEventListener("pointermove", onMove, { passive: true });
    card.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-inview={inView}
      style={sweepDelay ? ({ "--d": `${sweepDelay}ms` } as CSSProperties) : undefined}
      className={cx("glow-card", className)}
    >
      <span className="glow-card-halo" aria-hidden="true">
        <span />
      </span>
      <span className="glow-card-cone" aria-hidden="true">
        <span className="glow-card-ring" />
      </span>
      {children}
    </div>
  );
}
