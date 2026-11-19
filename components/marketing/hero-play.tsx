"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Makes the hero's decoration answer the visitor (sprint 10):
 *
 * - **Pointer parallax.** Writes `--mx` / `--my` (-1 to 1, from the screen
 *   centre) on this wrapper; each `.hero-par` layer moves by its own
 *   `--depth`, so near pieces travel further than far ones. Mouse only, while
 *   the hero is on screen, one write per frame. CSS eases the motion.
 * - **Eyes that look.** Any `[data-look]` element gets `--lx` / `--ly`, a unit
 *   vector toward the cursor, which its pupils follow.
 * - **Poke.** Clicking (or tapping) a `[data-poke]` piece replays its reaction
 *   (`.is-poked`, styles/brand.css) and throws a small confetti pop at the
 *   pointer.
 *
 * All of it is off under reduced motion (the CSS ignores the variables, and
 * no confetti is thrown). Decorative only: the layer is aria-hidden and
 * nothing here is needed to use the page.
 */

const BITS = [
  "bg-accent-400 size-2.5 rounded-[2px]",
  "bg-coral-500 h-3 w-1.5 rounded-full",
  "bg-teal-400 size-2 rounded-full",
  "bg-accent-300 h-3 w-1.5 rounded-full",
  "bg-coral-400 size-2 rounded-full",
  "bg-teal-500 size-2.5 rounded-[2px]",
];

function burst(root: HTMLElement, x: number, y: number) {
  const box = root.getBoundingClientRect();
  const count = 9;
  for (let index = 0; index < count; index++) {
    const bit = document.createElement("span");
    const angle = (index / count) * Math.PI * 2 + Math.random() * 0.6;
    const distance = 36 + Math.random() * 34;
    bit.className = `poke-bit ${BITS[index % BITS.length]}`;
    bit.style.left = `${x - box.left}px`;
    bit.style.top = `${y - box.top}px`;
    bit.style.setProperty("--x", `${(Math.cos(angle) * distance).toFixed(1)}px`);
    bit.style.setProperty("--y", `${(Math.sin(angle) * distance - 14).toFixed(1)}px`);
    bit.style.setProperty("--r", `${Math.round((Math.random() - 0.5) * 540)}deg`);
    bit.addEventListener("animationend", () => bit.remove(), { once: true });
    root.appendChild(bit);
  }
}

export function HeroPlay({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lookers = Array.from(root.querySelectorAll<HTMLElement>("[data-look]"));

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(root);

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      root.style.setProperty("--mx", ((x / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--my", ((y / window.innerHeight) * 2 - 1).toFixed(3));
      for (const el of lookers) {
        const box = el.getBoundingClientRect();
        if (!box.width) continue;
        const dx = x - (box.left + box.width / 2);
        const dy = y - (box.top + box.height / 2);
        const length = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, length / 140);
        el.style.setProperty("--lx", ((dx / length) * reach).toFixed(3));
        el.style.setProperty("--ly", ((dy / length) * reach).toFixed(3));
      }
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !visible || reduce.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onClick = (event: MouseEvent) => {
      const piece = (event.target as Element).closest<HTMLElement>("[data-poke]");
      if (!piece || !root.contains(piece)) return;
      piece.classList.remove("is-poked");
      void piece.offsetWidth; // restart the reaction if it is still playing
      piece.classList.add("is-poked");
      if (!reduce.matches) burst(root, event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {children}
    </div>
  );
}
