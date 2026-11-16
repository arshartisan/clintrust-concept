"use client";

// A client component on purpose, although it has no state or effects.
// These drawings are generated from a few lines of code into a lot of SVG.
// As a server component that SVG is sent twice: once as HTML and once in the
// page's serialized component tree. As a client component it is sent once as
// HTML, plus the small generator in the script bundle. On the homepage that
// was the difference between 50 KB and the HTML budget (docs/sop/05-performance.md).

import { useId, type CSSProperties } from "react";
import {
  IsoBox,
  IsoDisc,
  IsoLabel,
  IsoShield,
  IsoWire,
  isoLine,
  type Point3,
} from "./iso";

/**
 * Isometric illustrations for the six platform modules (sprint 7, after a
 * "glass devices" reference, set in the site's light theme): frosted white
 * parts with cool blue sides, and the one part that matters in teal
 * (verified, paid) or blue (incoming). No glow: the pools of light and the
 * beam were removed at the client's request.
 *
 * Drawn with the toolkit in ./iso.tsx, so they share the hero scene's
 * projection and line weight. The `iso-*` animation classes are switched on
 * by the card's `data-inview` while it is visible, and every drawing's
 * resting state is complete.
 *
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const svg = "h-full w-full overflow-visible";

/** A gradient-safe id for this drawing (useId's output contains colons). */
function useLightId() {
  return `l${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

/** The one gradient every scene uses: a solid ink fill for the shield (SVG
 * presentation attributes cannot read CSS variables, gradients can). */
function Lights({ id }: { id: string }) {
  const ink = { stopColor: "var(--color-navy-900)", stopOpacity: 1 };
  return (
    <defs>
      <linearGradient id={`${id}-ink`}>
        <stop offset="0" style={ink} />
        <stop offset="1" style={ink} />
      </linearGradient>
    </defs>
  );
}

/** Budget Intelligence Engine: contract layers resolved into payable line items. */
export function BudgetVisual() {
  const id = useLightId();
  const S = 20;
  const rows = [-1.1, -0.4, 0.3, 1];
  const top = 2.1;
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-125 -102 260 162" className={svg} aria-hidden="true">
      <Lights id={id} />

      {[0, 1.05, top].map((z, index) => (
        <g key={z} className="iso-float" style={delay(index * 450)}>
          <IsoBox at={[0, 0]} size={[4.8, 3.6, 0.12]} z={z} scale={S} tone="glass" />
          {index === 2 ? (
            <>
              {/* Line items on the top sheet; the resolved one is teal. */}
              {rows.map((y, row) => (
                <path
                  key={y}
                  d={isoLine(
                    [
                      [-1.9, y, top + 0.12],
                      [row === 1 ? 0.9 : row === 3 ? -0.2 : 0.4, y, top + 0.12],
                    ],
                    S,
                  )}
                  className={row === 1 ? "stroke-accent-500" : "stroke-brand-blue-300"}
                  strokeWidth={row === 1 ? 2.6 : 2}
                  strokeLinecap="round"
                />
              ))}
              <IsoBox
                at={[1.65, -0.4]}
                size={[0.7, 0.42, 0.14]}
                z={top + 0.12}
                scale={S}
                tone="glow"
                className="iso-blink"
              />
            </>
          ) : null}
        </g>
      ))}

      {/* The signed contract, floating in from the top right. */}
      <g className="iso-float" style={delay(1200)}>
        <IsoBox at={[3.4, -3]} size={[1.3, 1.6, 0.12]} z={3.2} scale={S} tone="glowBlue" />
        <path
          d={isoLine(
            [
              [3, -3.4, 3.32],
              [3.8, -3.4, 3.32],
            ],
            S,
          )}
          className="stroke-text-white/80"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <path
          d={isoLine(
            [
              [3, -2.9, 3.32],
              [3.5, -2.9, 3.32],
            ],
            S,
          )}
          className="stroke-text-white/60"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** Multi-Source Execution Capture: one live visit log fed by EDC, CTMS and site logs. */
export function CaptureVisual() {
  const id = useLightId();
  const S = 20;
  const panelZ = 0.8;
  const surface = panelZ + 0.14;
  // Rows of the log: a status chip, then a bar. Teal rows are verified.
  const rows = [-1.2, -0.4, 0.4, 1.2];
  const sources: { label: string; at: [number, number]; z: number; tone: "glowBlue" | "glass" }[] = [
    { label: "EDC", at: [-4.2, 1.2], z: 2.4, tone: "glowBlue" },
    { label: "CTMS", at: [1.6, -4.6], z: 2.4, tone: "glass" },
    { label: "Site logs", at: [-1.4, 4.6], z: 0.3, tone: "glowBlue" },
  ];
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-160 -112 320 200" className={svg} aria-hidden="true">
      <Lights id={id} />
      {/* A ring of light on the floor, under the log. */}
      <ellipse cx={0} cy={0} rx={112} ry={62} fill="none" className="stroke-brand-blue-300/60" strokeWidth={1.25} />

      <g className="iso-float">
        <IsoBox at={[0, 0]} size={[6, 4.4, 0.14]} z={panelZ} scale={S} tone="glass" />
        {/* Title bar. */}
        <path
          d={isoLine(
            [
              [-2.5, -1.75, surface],
              [-1, -1.75, surface],
            ],
            S,
          )}
          className="stroke-brand-blue-500"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {rows.map((y, row) => {
          const verified = row !== 2;
          return (
            <g key={y}>
              <path
                d={isoLine(
                  [
                    [-2.5, y + 0.3, surface],
                    [-1.9, y + 0.3, surface],
                  ],
                  S,
                )}
                className={verified ? "stroke-accent-400 iso-blink" : "stroke-brand-blue-400"}
                style={delay(row * 600)}
                strokeWidth={3.2}
                strokeLinecap="round"
              />
              <path
                d={isoLine(
                  [
                    [-1.3, y + 0.3, surface],
                    [row % 2 ? 2.2 : 1.2, y + 0.3, surface],
                  ],
                  S,
                )}
                className="stroke-brand-blue-200"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      {sources.map((source, index) => (
        <g key={source.label} className="iso-float" style={delay(500 + index * 550)}>
          <IsoBox at={source.at} size={[1, 1, 0.26]} z={source.z} scale={S} tone={source.tone} />
          <IsoLabel
            at={[source.at[0], source.at[1], source.z + 0.26]}
            scale={S}
            lift={20}
            className="max-sm:hidden"
          >
            {source.label}
          </IsoLabel>
        </g>
      ))}
    </svg>
  );
}

/** AI-Assisted Reconciliation: every match scored, verified matches lit, exceptions flagged. */
export function ReconcileVisual() {
  const id = useLightId();
  const S = 20;
  const h = 0.9;
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-135 -122 270 170" className={svg} aria-hidden="true">
      <Lights id={id} />
      {/* Light running out along the floor, both ground axes. */}
      {[
        [
          [-5.4, 0, 0],
          [5.4, 0, 0],
        ],
        [
          [0, -5.4, 0],
          [0, 5.4, 0],
        ],
      ].map((points, index) => (
        <path
          key={index}
          d={isoLine(points as Point3[], S)}
          className="stroke-accent-400/50"
          strokeWidth={1.25}
        />
      ))}

      <IsoBox at={[0, 0]} size={[3.8, 3.8, h]} scale={S} tone="glass" />
      <IsoBox at={[0, 0]} size={[2.4, 2.4, 0.14]} z={h} scale={S} tone="glow" />
      <IsoShield at={[0, 0, h + 0.14]} scale={S} size={34} fill={`url(#${id}-ink)`} />

      {/* A scored match and a flagged exception, hovering beside the engine. */}
      <g className="iso-float" style={delay(300)}>
        <IsoBox at={[-3.8, 0.6]} size={[0.9, 0.9, 0.2]} z={1.6} scale={S} tone="glow" />
        <IsoLabel at={[-3.8, 0.6, 1.8]} scale={S} lift={20} className="max-sm:hidden">
          98% match
        </IsoLabel>
      </g>
      <g className="iso-float" style={delay(1100)}>
        <IsoBox at={[4.4, 0.8]} size={[0.9, 0.9, 0.2]} z={0.4} scale={S} tone="amber" />
        <IsoLabel at={[4.4, 0.8, 0.6]} scale={S} lift={20} className="max-sm:hidden">
          Flagged
        </IsoLabel>
      </g>
    </svg>
  );
}

/** Continuous Payable Formation: payables building up as each visit is verified. */
export function PayableVisual() {
  const id = useLightId();
  const S = 21;
  const bars = [0.6, 1.05, 1.55, 2.15, 2.9];
  const base = -1.3;
  const last = bars.length - 1;
  const t = (index: number) => (index - 2) * 1.2;
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-130 -102 260 162" className={svg} aria-hidden="true">
      <Lights id={id} />

      {/* Stepping along (+x, -y) keeps the row level on screen, left to right. */}
      {bars.map((height, index) => (
        <IsoBox
          key={height}
          at={[t(index), -t(index)]}
          size={[1.05, 1.05, height]}
          z={base}
          scale={S}
          tone={index === last ? "glow" : "glass"}
          className="iso-step"
          style={delay(index * 260)}
        />
      ))}

      {/* The payable, released: a coin hovering over the tallest bar. */}
      <g className="iso-float" style={delay(1300)}>
        <IsoDisc
          at={[t(last), -t(last)]}
          radius={0.42}
          height={0.14}
          z={base + bars[last] + 0.7}
          scale={S}
          tone="glow"
        />
      </g>
    </svg>
  );
}

/** Dynamic Funding Model: funding sized to verified work, inside the old upfront advance. */
export function FundingVisual() {
  const id = useLightId();
  const S = 20;
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-130 -108 260 162" className={svg} aria-hidden="true">
      <Lights id={id} />

      <IsoBox at={[0, 0]} size={[4.6, 4.6, 0.22]} scale={S} tone="glass" />
      <IsoBox at={[0, 0]} size={[2.3, 2.3, 1.1]} z={0.22} scale={S} tone="glow" className="iso-blink" />
      {/* The upfront advance it replaces: an empty, dashed volume. */}
      <IsoBox at={[0, 0]} size={[3.4, 3.4, 3.1]} z={0.22} scale={S} tone="wire" dashed />

      {/* Funding arriving in tranches, as work is verified. */}
      {[2.1, 2.75, 3.4].map((z, index) => (
        <g key={z} className="iso-float" style={delay(index * 400)}>
          <IsoDisc at={[0, 0]} radius={0.55} height={0.12} z={z} scale={S} tone="glowBlue" />
        </g>
      ))}
    </svg>
  );
}

/** Fintech Payment Orchestration: one payable paid out in local currencies. */
export function PayoutVisual() {
  const id = useLightId();
  const S = 20;
  const payouts: { label: string; at: [number, number]; wire: Point3[] }[] = [
    {
      label: "KRW",
      at: [0.4, -5],
      wire: [
        [0.4, -1.4],
        [0.4, -4.2],
      ],
    },
    {
      label: "SGD",
      at: [3.4, -3.4],
      wire: [
        [1.4, -0.7],
        [3.4, -0.7],
        [3.4, -2.7],
      ],
    },
    {
      label: "AUD",
      at: [5, 0.5],
      wire: [
        [1.4, 0.5],
        [4.2, 0.5],
      ],
    },
  ];
  return (
    <svg shapeRendering="geometricPrecision" viewBox="-150 -108 320 200" className={svg} aria-hidden="true">
      <Lights id={id} />

      <IsoWire scale={S} tone="accent" points={[[-0.4, 4.2], [-0.4, 1.4]]} />
      {payouts.map((payout, index) => (
        <IsoWire key={payout.label} scale={S} tone="accent" delay={700 + index * 400} points={payout.wire} />
      ))}

      {payouts.slice(0, 2).map((payout, index) => (
        <IsoBox
          key={payout.label}
          at={payout.at}
          size={[1.4, 1.4, 0.3]}
          scale={S}
          tone="glow"
          className="iso-blink"
          style={delay(700 + index * 400)}
        />
      ))}

      {/* The hub: a glass plinth with a lit deck and the shield on top. */}
      <IsoBox at={[0, 0]} size={[2.8, 2.8, 0.3]} scale={S} tone="glass" />
      <IsoBox at={[0, 0]} size={[2.3, 2.3, 0.4]} z={0.3} scale={S} tone="glow" />
      <IsoShield at={[0, 0, 0.7]} scale={S} size={30} fill={`url(#${id}-ink)`} />

      <IsoBox
        at={payouts[2].at}
        size={[1.4, 1.4, 0.3]}
        scale={S}
        tone="glow"
        className="iso-blink"
        style={delay(1500)}
      />
      <IsoBox at={[-0.4, 5]} size={[1.8, 1.6, 0.45]} scale={S} tone="glass" />

      <g className="max-sm:hidden">
        <IsoLabel at={[-0.4, 5, 0.45]} scale={S} lift={24}>
          Payable, USD
        </IsoLabel>
        {payouts.map((payout) => (
          <IsoLabel key={payout.label} at={[payout.at[0], payout.at[1], 0.3]} scale={S} lift={20}>
            {payout.label}
          </IsoLabel>
        ))}
      </g>
    </svg>
  );
}
