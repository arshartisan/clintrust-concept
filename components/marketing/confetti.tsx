import type { CSSProperties } from "react";
import { cx } from "@/utils/cx";

// Fixed pieces (no randomness, so server and client render the same HTML).
const PIECES = [
  { x: -120, y: -90, spin: 260, color: "bg-sun-400", shape: "size-2.5 rounded-[2px]" },
  { x: -70, y: -130, spin: -200, color: "bg-coral-500", shape: "h-3 w-1.5 rounded-full" },
  { x: -20, y: -150, spin: 320, color: "bg-teal-400", shape: "size-2 rounded-full" },
  { x: 40, y: -140, spin: -280, color: "bg-sun-400", shape: "h-3 w-1.5 rounded-full" },
  { x: 95, y: -110, spin: 200, color: "bg-coral-400", shape: "size-2.5 rounded-[2px]" },
  { x: 135, y: -50, spin: -240, color: "bg-teal-500", shape: "h-3 w-1.5 rounded-full" },
  { x: -140, y: -30, spin: 180, color: "bg-teal-400", shape: "h-3 w-1.5 rounded-full" },
  { x: -95, y: 40, spin: -300, color: "bg-sun-500", shape: "size-2 rounded-full" },
  { x: 110, y: 35, spin: 240, color: "bg-coral-500", shape: "size-2 rounded-full" },
  { x: 10, y: -95, spin: -160, color: "bg-coral-400", shape: "size-2.5 rounded-[2px]" },
  { x: -45, y: -70, spin: 200, color: "bg-sun-300", shape: "h-3 w-1.5 rounded-full" },
  { x: 70, y: -60, spin: -220, color: "bg-teal-300", shape: "size-2.5 rounded-[2px]" },
];

/**
 * A small burst of confetti from the element's centre, the brief's "paid tick
 * or confetti moment". Re-mount it (change its `key`) to fire again. Hidden
 * entirely under reduced motion (styles/brand.css, .confetti). Used by the concept heroes and the demo form.
 */
export function Confetti({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("confetti pointer-events-none absolute inset-0 flex items-center justify-center", className)}
    >
      {PIECES.map((piece, index) => (
        <span
          key={index}
          className={cx("absolute opacity-0", piece.color, piece.shape)}
          style={
            {
              "--x": `${piece.x}px`,
              "--y": `${piece.y}px`,
              "--spin": `${piece.spin}deg`,
              animationDelay: `${(index % 4) * 40}ms`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
