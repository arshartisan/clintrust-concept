/**
 * Click and interaction tracking (feedback brief: pain cards, the rotating
 * hero, every "Request a demo" button).
 *
 * Events are pushed to `window.dataLayer`, the queue Google Tag Manager and
 * most tag managers read. No analytics provider is installed yet: until one
 * is, events collect in the array and go nowhere, and in development they are
 * also logged to the console so they can be checked.
 *
 * Two ways to send an event:
 *   - call `track(name, props)` from a client component;
 *   - add `data-track="name"` (plus optional `data-track-location`,
 *     `data-track-label`) to any link or button, including in server
 *     components. instrumentation-client.ts listens for those clicks.
 */

export type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ event, ...props });
  if (process.env.NODE_ENV === "development") console.info("[track]", event, props);
}
