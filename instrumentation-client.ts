import { track } from "@/utils/track";

/**
 * Runs once in the browser before the app starts (Next.js client
 * instrumentation). One delegated listener turns clicks on any element with
 * `data-track` into a tracking event, so server-rendered buttons can be
 * tracked without becoming client components. See utils/track.ts.
 */
document.addEventListener(
  "click",
  (event) => {
    const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
    if (!target) return;
    const { track: name, trackLocation, trackLabel } = target.dataset;
    if (!name) return;
    track(name, {
      location: trackLocation,
      label: trackLabel ?? target.textContent?.trim() ?? undefined,
      href: target.getAttribute("href") ?? undefined,
    });
  },
  { capture: true },
);
