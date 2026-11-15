"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

interface InViewOptions {
  /** Stay true after the first time the element is seen (for entrances). */
  once?: boolean;
  /** IntersectionObserver rootMargin. Negative bottom margin delays the trigger. */
  rootMargin?: string;
}

/**
 * True while the element is on screen. Every self-running animation on the
 * site is gated on this, so nothing animates (or runs timers) off screen.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = false, rootMargin = "0px" }: InViewOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once, rootMargin]);

  return inView;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** The visitor's "reduce motion" setting. False on the server. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
