"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling for wheel and trackpad input.
 *
 * - Off the first load: the library (about 5 KB gzip) is fetched after the
 *   page is idle, so it never competes with the hero or the LCP
 *   (docs/sop/05-performance.md).
 * - Touch keeps native scrolling (Lenis's default, `syncTouch: false`).
 * - Respects `prefers-reduced-motion`: Lenis is not started at all, and the
 *   page keeps native scrolling.
 * - `anchors`: same-page hash links glide to their section and honour each
 *   section's `scroll-margin-top` (the `scroll-mt-16` on Frame).
 * - `autoToggle`: Lenis stops whenever the page itself is made unscrollable
 *   (the phone drawer locks `<html>`), and resumes afterwards.
 * - `allowNestedScroll`: wheel input inside a scrollable panel scrolls that
 *   panel, not the page. Add `data-lenis-prevent` to opt an element out.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { destroy: () => void } | undefined;
    let cancelled = false;

    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({
          autoRaf: true,
          anchors: true,
          autoToggle: true,
          allowNestedScroll: true,
          lerp: 0.1,
        });
      });
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      lenis?.destroy();
    };
  }, []);

  return null;
}
