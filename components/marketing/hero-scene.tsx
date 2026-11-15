"use client";

// A client component on purpose, although it has no state or effects.
// This drawing is generated from a few lines of code into a lot of SVG.
// As a server component that SVG is sent twice: once as HTML and once in the
// page's serialized component tree. As a client component it is sent once as
// HTML, plus the small generator in the script bundle
// (docs/sop/05-performance.md, section 7).

import type { CSSProperties } from "react";
import { IsoBox, IsoDisc, IsoLabel, IsoPanel, IsoStamp, IsoWire, type Point3 } from "./iso";

/**
 * The hero illustration (sprint 5): the platform, built from its own parts.
 *
 * The composition runs from the bottom left to the top right and leaves its
 * top-left corner empty, because the headline sits over that corner.
 *
 *   Site visits   a rack of visit records at the bottom left. Teal ones are
 *                 paid, white ones are still in progress.
 *   EDC, CTMS     the two data feeds, as source blocks at the top right.
 *   ClinTrust     a stack of three plates (record, reconcile, pay) with the
 *                 mark printed on top, and a payable standing behind it.
 *   Payouts       coins in three local currencies, right and bottom.
 *
 * Blue pulses carry raw data in; teal pulses carry verified payments out.
 * One inline SVG, animated with CSS only (`iso-*` classes) while on screen.
 * Text labels are hidden below `sm`, where they would be too small to read.
 */

const S = 34;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const IN: Point3[][] = [
  [[-1, 4.5], [-1, 2]], // site visits
  [[2.6, -5.2], [2.6, -3.2], [1, -3.2], [1, -2]], // EDC
  [[-1, -4.8], [-1, -2]], // CTMS
];
const OUT: Point3[][] = [
  [[2, 1.2], [5.1, 1.2]], // SGD
  [[2, -1], [4, -1], [4, -2.4], [5.3, -2.4]], // KRW
  [[1, 2], [1, 5.8], [1.9, 5.8]], // AUD
];

// Visit records in the rack, back to front. The first three are paid.
const RACK_Y = 6.2;
const RACK = Array.from({ length: 7 }, (_, index) => ({ x: -4 + index * 0.6, paid: index < 3 }));

// The payable panel, in its own flat pixel space (see IsoPanel).
const PANEL_W = 3.2 * S;
const PANEL_H = 3.6 * S;

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-388 -238 712 416"
      shapeRendering="geometricPrecision"
      className={className}
      role="img"
      aria-label="Diagram: site visit records and the EDC and CTMS feeds flow into the ClinTrust platform, which forms a payable and pays sites in their own currency."
    >
      <defs>
        {/* The logo's own gradient, on the platform's base plate. */}
        <linearGradient id="hero-base-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-accent-400)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-brand-blue-500)" }} />
        </linearGradient>
        <linearGradient id="hero-base-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--color-brand-blue-500)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-brand-blue-600)" }} />
        </linearGradient>
      </defs>

      {/* Ground: connectors first, so everything else sits on top of them. */}
      {IN.map((points, index) => (
        <IsoWire key={index} points={points} scale={S} tone="blue" delay={index * 500} />
      ))}
      {OUT.map((points, index) => (
        <IsoWire key={index} points={points} scale={S} tone="accent" delay={1100 + index * 500} />
      ))}

      {/* The two data feeds. */}
      <IsoBox at={[2.6, -6]} size={[1.6, 1.6, 0.6]} scale={S} />
      <IsoBox at={[-1, -5.6]} size={[1.6, 1.6, 0.6]} scale={S} />

      {/* The platform: three plates. */}
      <IsoBox
        at={[0, 0]}
        size={[4.4, 4.4, 0.34]}
        scale={S}
        tone="blue"
        sideFill={{ left: "url(#hero-base-left)", right: "url(#hero-base-right)" }}
      />
      <IsoBox at={[0, 0]} size={[4, 4, 0.34]} z={0.44} scale={S} />
      <IsoBox at={[0, 0]} size={[4, 4, 0.34]} z={0.88} scale={S} />

      {/* The payable, standing on the back edge of the platform. */}
      <IsoPanel at={[-1.6, -1.6, 1.3]} size={[3.2, 3.6]} scale={S} className="iso-float">
        <g className="max-sm:hidden">
          <text x={12} y={-PANEL_H + 21} className="fill-text-secondary text-caption-2-medium">
            Payable 2041-118
          </text>
          <text x={12} y={-PANEL_H + 40} className="fill-text-primary text-body-semibold">
            S$3,611.03
          </text>
        </g>
        {["Verified", "Funded", "Settled"].map((stage, index) => {
          const y = -PANEL_H + 62 + index * 19;
          return (
            <g key={stage}>
              <circle cx={17} cy={y} r={5} className="fill-accent-400" />
              <rect
                x={29}
                y={y - 3}
                width={PANEL_W - 41 - index * 14}
                height={6}
                rx={3}
                className={index === 2 ? "fill-accent-200" : "fill-brand-blue-100"}
              />
            </g>
          );
        })}
      </IsoPanel>

      {/* The mark, printed on a raised tile at the front of the platform. */}
      <IsoBox at={[0.4, 0.5]} size={[2.3, 2.3, 0.16]} z={1.22} scale={S} />
      <IsoStamp at={[0.4, 0.5, 1.38]} scale={S} width={48} />

      {/* Site visits: a rack of records on a plinth, in front of the platform. */}
      <IsoBox at={[-2.2, RACK_Y]} size={[5.2, 3.2, 0.14]} scale={S} tone="blue" />
      {RACK.map((record, index) => (
        <IsoBox
          key={record.x}
          at={[record.x, RACK_Y]}
          size={[0.34, 2.4, 1.5]}
          z={0.14}
          scale={S}
          radius={0.08}
          tone={record.paid ? "accent" : "paper"}
          className={record.paid ? "iso-blink" : undefined}
          style={record.paid ? delay(index * 500) : undefined}
        />
      ))}

      {/* Payouts in local currencies. */}
      <IsoDisc at={[6, -2.4]} radius={0.62} height={0.22} scale={S} />
      <IsoDisc
        at={[6, 1.2]}
        radius={0.8}
        height={0.28}
        scale={S}
        tone="accent"
        className="iso-blink"
        style={delay(1100)}
      />
      <IsoDisc at={[2.7, 5.8]} radius={0.62} height={0.22} scale={S} />

      {/* Labels: hidden on phones, where they would be too small to read. */}
      <g className="max-sm:hidden">
        <IsoLabel at={[-2.2, RACK_Y, 1.64]} scale={S} lift={34}>
          Site visits
        </IsoLabel>
        <IsoLabel at={[2.6, -6, 0.6]} scale={S}>
          EDC
        </IsoLabel>
        <IsoLabel at={[-1, -5.6, 0.6]} scale={S}>
          CTMS
        </IsoLabel>
        <IsoLabel at={[6, -2.4, 0.22]} scale={S}>
          KRW
        </IsoLabel>
        <IsoLabel at={[6, 1.2, 0.28]} scale={S} lift={26}>
          SGD
        </IsoLabel>
        <IsoLabel at={[2.7, 5.8, 0.22]} scale={S}>
          AUD
        </IsoLabel>
      </g>
    </svg>
  );
}
