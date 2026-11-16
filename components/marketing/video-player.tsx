"use client";

import { useRef, useState } from "react";
import { RiPlayFill } from "@remixicon/react";
import { cx } from "@/utils/cx";

interface VideoPlayerProps {
  /** In order of preference: WebM first, MP4 as the fallback. */
  sources: readonly { src: string; type: string }[];
  /** Still frame shown before play. Without one, a dark panel with soft light. */
  poster?: string | null;
  /** Accessible name for the play button and the video. */
  label: string;
  className?: string;
}

/**
 * A click-to-play video in a dark rounded panel (sprint 7).
 *
 * Never autoplays. `preload="none"` keeps the file off the network until the
 * visitor presses play, so the panel costs nothing on load
 * (docs/sop/05-performance.md). Then the browser's own controls take over:
 * pause, seek, volume and fullscreen. The browser picks the first `<source>`
 * it can play, so list WebM before MP4.
 */
export function VideoPlayer({ sources, poster, label, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  return (
    <div
      className={cx(
        "dark relative aspect-video overflow-hidden rounded-3xl border border-border-button-default bg-background-full shadow-lg",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="size-full object-cover"
        poster={poster ?? undefined}
        preload="none"
        playsInline
        controls={started}
        aria-label={label}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      {started ? null : (
        <button
          type="button"
          onClick={play}
          aria-label={label}
          className="group absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-inset"
        >
          {poster ? null : (
            <span
              aria-hidden="true"
              className="absolute inset-0 [background:radial-gradient(40%_55%_at_50%_55%,color-mix(in_srgb,var(--color-accent-400)_22%,transparent),transparent_70%),radial-gradient(70%_80%_at_50%_100%,color-mix(in_srgb,var(--color-brand-blue-500)_28%,transparent),transparent_70%)]"
            />
          )}
          <span
            aria-hidden="true"
            className="button-glow relative flex size-16 items-center justify-center rounded-full text-text-white transition-transform duration-300 group-hover:scale-105 sm:size-20"
          >
            <RiPlayFill className="ms-1 size-7 sm:size-8" />
          </span>
        </button>
      )}
    </div>
  );
}
