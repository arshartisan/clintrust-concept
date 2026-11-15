"use client";

// A client component on purpose, although it has no state or effects.
// These drawings are generated from a few lines of code into a lot of SVG.
// As a server component that SVG is sent twice: once as HTML and once in the
// page's serialized component tree. As a client component it is sent once as
// HTML, plus the small generator in the script bundle. On the homepage that
// was the difference between 50 KB and the HTML budget (docs/sop/05-performance.md).

import type { CSSProperties } from "react";
import {
  IsoBox,
  IsoLabel,
  IsoStamp,
  IsoWire,
  isoLine,
  type Point3,
} from "./iso";

/**
 * Blueprint-style isometric illustrations for the six platform modules.
 *
 * Drawn with the toolkit in ./iso.tsx, so they share the hero scene's
 * projection, line weight and tones. Server components: markup plus `iso-*`
 * animation classes, switched on by the card's `data-inview` while visible.
 * Each one's resting state is a complete drawing.
 *
 * Colour carries meaning, as everywhere on the site: blue line work is raw
 * or in-progress, teal is verified or paid, amber needs review.
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const svg = "h-full w-full";

/** The ClinTrust node used in the two flow diagrams: plinth and deck, with the mark printed on top. */
function Hub({ scale }: { scale: number }) {
  return (
    <>
      <IsoBox at={[0, 0]} size={[2.8, 2.8, 0.3]} scale={scale} tone="blue" />
      <IsoBox at={[0, 0]} size={[2.3, 2.3, 0.45]} z={0.3} scale={scale} />
      <IsoStamp at={[0, 0, 0.75]} scale={scale} width={scale * 1.9} />
    </>
  );
}

/** Budget Intelligence Engine: contract layers resolved into line items. */
export function BudgetVisual() {
  const S = 22;
  const rows = [-0.9, -0.2, 0.5];
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-112 -92 224 150"
      className={svg}
      aria-hidden="true"
    >
      {[0, 0.85, 1.7].map((z, index) => (
        <g key={z} className="iso-float" style={delay(index * 500)}>
          <IsoBox at={[0, 0]} size={[4.4, 3.2, 0.14]} z={z} scale={S} />
          {index === 2
            ? rows.map((y, row) => (
                <path
                  key={y}
                  d={isoLine(
                    [
                      [-1.6, y, z + 0.14],
                      [row === 1 ? 1.5 : 0.6, y, z + 0.14],
                    ],
                    S,
                  )}
                  className={
                    row === 1 ? "stroke-accent-500" : "stroke-brand-blue-300"
                  }
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ))
            : null}
        </g>
      ))}
    </svg>
  );
}

/** Multi-Source Execution Capture: three sources converge on one verified record. */
export function CaptureVisual() {
  const S = 24;
  // Sources sit to the left of the hub, the verified record to its right,
  // the same reading direction as the hero scene.
  const sources: { label: string; at: [number, number]; wire: Point3[] }[] = [
    {
      label: "EDC",
      at: [-5.2, -0.6],
      wire: [
        [-4.4, -0.6],
        [-1.4, -0.6],
      ],
    },
    {
      label: "CTMS",
      at: [-3.6, 3],
      wire: [
        [-3.6, 2.3],
        [-3.6, 0.6],
        [-1.4, 0.6],
      ],
    },
    {
      label: "Site logs",
      at: [0.4, 5],
      wire: [
        [0.4, 4.3],
        [0.4, 1.4],
      ],
    },
  ];
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-196 -124 372 232"
      className={svg}
      aria-hidden="true"
    >
      {sources.map((source, index) => (
        <IsoWire
          key={source.label}
          scale={S}
          tone="blue"
          delay={index * 500}
          points={source.wire}
        />
      ))}
      <IsoWire
        scale={S}
        tone="accent"
        delay={1200}
        points={[
          [0, -1.4],
          [0, -4.3],
        ]}
      />

      <IsoBox
        at={[0, -5.2]}
        size={[1.9, 1.7, 0.5]}
        scale={S}
        tone="accent"
        className="iso-blink"
      />
      <IsoBox at={sources[0].at} size={[1.6, 1.3, 0.4]} scale={S} />
      <Hub scale={S} />
      <IsoBox at={sources[1].at} size={[1.6, 1.3, 0.4]} scale={S} />
      <IsoBox at={sources[2].at} size={[1.6, 1.3, 0.4]} scale={S} />

      <g className="max-sm:hidden">
        {sources.map((source) => (
          <IsoLabel
            key={source.label}
            at={[source.at[0], source.at[1], 0.4]}
            scale={S}
            lift={24}
          >
            {source.label}
          </IsoLabel>
        ))}
        <IsoLabel at={[0, -5.2, 0.5]} scale={S} lift={26}>
          Verified record
        </IsoLabel>
      </g>
    </svg>
  );
}

/** AI-Assisted Reconciliation: activity matched to budget lines, one flagged. */
export function ReconcileVisual() {
  const S = 21;
  const cells = [-1.5, -0.5, 0.5, 1.5];
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-112 -66 224 150"
      className={svg}
      aria-hidden="true"
    >
      <IsoBox at={[0, 0]} size={[5, 5, 0.3]} scale={S} tone="blue" />
      <IsoBox at={[0, 0]} size={[4.7, 4.7, 0.16]} z={0.3} scale={S} />
      {cells.flatMap((y, row) =>
        cells.map((x, col) => {
          const index = row * 4 + col;
          const flagged = index === 10;
          const open = index === 3 || index === 12;
          return (
            <IsoBox
              key={index}
              at={[x * 1.12, y * 1.12]}
              size={[0.86, 0.86, 0.12]}
              z={0.46}
              scale={S}
              tone={flagged ? "amber" : open ? "paper" : "accent"}
              className={open ? undefined : "iso-blink"}
              style={open ? undefined : delay(index * 170)}
            />
          );
        }),
      )}
    </svg>
  );
}

/** Continuous Payable Formation: payables building as work is verified. */
export function PayableVisual() {
  const S = 22;
  const bars = [0.7, 1.1, 1.6, 2.2, 3];
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-112 -92 224 150"
      className={svg}
      aria-hidden="true"
    >
      {/* Stepping along (+x, -y) keeps the row level on screen, left to right. */}
      {bars.map((height, index) => {
        const t = (index - 2) * 1.2;
        return (
          <IsoBox
            key={height}
            at={[t, -t]}
            size={[1.05, 1.05, height]}
            z={-1.2}
            scale={S}
            tone={index === bars.length - 1 ? "accent" : "paper"}
            className="iso-step"
            style={delay(index * 260)}
          />
        );
      })}
    </svg>
  );
}

/** Dynamic Funding Model: funding sized to verified work, inside the old advance. */
export function FundingVisual() {
  const S = 21;
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-112 -100 224 150"
      className={svg}
      aria-hidden="true"
    >
      <IsoBox at={[0, 0]} size={[4, 4, 0.16]} scale={S} tone="blue" />
      <IsoBox
        at={[0, 0]}
        size={[2.3, 2.3, 1.15]}
        z={0.16}
        scale={S}
        tone="accent"
        className="iso-blink"
      />
      {/* The upfront advance it replaces: an empty, dashed volume. */}
      <IsoBox
        at={[0, 0]}
        size={[3.3, 3.3, 3.1]}
        z={0.16}
        scale={S}
        tone="wire"
        dashed
      />
    </svg>
  );
}

/** Fintech Payment Orchestration: one payable paid out in local currencies. */
export function PayoutVisual() {
  const S = 24;
  const payouts: { label: string; at: [number, number]; wire: Point3[] }[] = [
    {
      label: "KRW",
      at: [0.4, -5.2],
      wire: [
        [0.4, -1.4],
        [0.4, -4.4],
      ],
    },
    {
      label: "SGD",
      at: [3.4, -3.6],
      wire: [
        [1.4, -0.7],
        [3.4, -0.7],
        [3.4, -2.9],
      ],
    },
    {
      label: "AUD",
      at: [5.4, 0.5],
      wire: [
        [1.4, 0.5],
        [4.6, 0.5],
      ],
    },
  ];
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-190 -124 372 232"
      className={svg}
      aria-hidden="true"
    >
      <IsoWire
        scale={S}
        tone="accent"
        points={[
          [-0.4, 4.4],
          [-0.4, 1.4],
        ]}
      />
      {payouts.map((payout, index) => (
        <IsoWire
          key={payout.label}
          scale={S}
          tone="accent"
          delay={700 + index * 400}
          points={payout.wire}
        />
      ))}

      {payouts.slice(0, 2).map((payout, index) => (
        <IsoBox
          key={payout.label}
          at={payout.at}
          size={[1.5, 1.5, 0.3]}
          scale={S}
          tone="accent"
          className="iso-blink"
          style={delay(700 + index * 400)}
        />
      ))}
      <Hub scale={S} />
      <IsoBox
        at={payouts[2].at}
        size={[1.5, 1.5, 0.3]}
        scale={S}
        tone="accent"
        className="iso-blink"
        style={delay(1500)}
      />
      <IsoBox at={[-0.4, 5.2]} size={[1.9, 1.7, 0.5]} scale={S} />

      <g className="max-sm:hidden">
        <IsoLabel at={[-0.4, 5.2, 0.5]} scale={S} lift={26}>
          Payable, USD
        </IsoLabel>
        {payouts.map((payout) => (
          <IsoLabel
            key={payout.label}
            at={[payout.at[0], payout.at[1], 0.3]}
            scale={S}
            lift={22}
          >
            {payout.label}
          </IsoLabel>
        ))}
      </g>
    </svg>
  );
}
