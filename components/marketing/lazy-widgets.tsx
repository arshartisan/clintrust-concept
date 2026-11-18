"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Deferred interactive widgets.
 *
 * The contact form and the landing page's "Which one is you?" accordion are
 * the only parts of the site that need react-aria (~75 KB compressed).
 * Neither is on screen at load, so their code is split into separate
 * chunks and fetched later: when the widget comes within 800px of the
 * viewport, or once the browser is idle after load, whichever is first.
 *
 * Until then the server-rendered `fallback` holds the widget's place at the
 * same size, so nothing shifts when the real widget arrives.
 */

const DemoForm = lazy(() => import("./demo-form").then((m) => ({ default: m.DemoForm })));
const PainAccordion = lazy(() => import("./pain-accordion").then((m) => ({ default: m.PainAccordion })));

const IDLE_FALLBACK_MS = 2500;

function useIdleAfterLoad() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer = 0;
    let handle = 0;
    const arm = () => {
      if ("requestIdleCallback" in window) {
        handle = window.requestIdleCallback(() => setIdle(true), { timeout: IDLE_FALLBACK_MS });
      } else {
        // Safari has no requestIdleCallback.
        timer = globalThis.setTimeout(() => setIdle(true), IDLE_FALLBACK_MS) as unknown as number;
      }
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      if (handle) window.cancelIdleCallback(handle);
      if (timer) globalThis.clearTimeout(timer);
    };
  }, []);

  return idle;
}

interface LazyProps {
  /** Server-rendered placeholder, the same size as the widget. */
  fallback: ReactNode;
  className?: string;
}

function LazyMount({ fallback, className, children }: LazyProps & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, rootMargin: "800px 0px" });
  const idle = useIdleAfterLoad();

  return (
    <div ref={ref} className={className}>
      {near || idle ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

export function LazyDemoForm({ source, ...props }: LazyProps & { source?: string }) {
  return (
    <LazyMount {...props}>
      <DemoForm source={source} />
    </LazyMount>
  );
}

export function LazyPainAccordion(props: LazyProps) {
  return (
    <LazyMount {...props}>
      <PainAccordion />
    </LazyMount>
  );
}
