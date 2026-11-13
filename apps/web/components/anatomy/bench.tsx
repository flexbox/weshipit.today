import * as React from 'react';
import { Dots, Line, Solid } from './kit/draw';
import type { Bench } from './parts';

/** The bench every glossary machine stands on. */
export function BenchArt({ bench }: { bench: Bench }) {
  return (
    <g>
      <path className="iso-halo" d={bench.halo} />
      {bench.feet.map((parts, index) => (
        <g key={index}>
          {parts.map((paths, part) => (
            <Solid
              key={part}
              paths={paths}
              tone={part ? 'mid' : 'lo'}
              crease="faint"
            />
          ))}
        </g>
      ))}
      <Solid paths={bench.slab} tone="mid" crease="faint" />
      <Line d={bench.groove} tone="lo" />
      <Line d={bench.screwRings} tone="lo" />
      <Dots points={bench.screws} size={0.5} tone="mid" />
      <Solid paths={bench.ruler} tone="lo" crease="none" />
      <Line d={bench.ticksMinor} tone="lo" />
      <Line d={bench.ticksMajor} tone="mid" />
      <Solid paths={bench.label} tone="lo" crease="none" />
      <Line d={bench.labelLine} tone="faint" />
      {bench.labelRules.map((d, index) => (
        <Line key={index} d={d} tone="lo" free />
      ))}
      <Dots points={bench.labelScrews} size={0.45} tone="mid" />
    </g>
  );
}

/** A cable drawn as a sheath around a pale core. */
export function Cable({ d }: { d: string }) {
  return (
    <g>
      <path className="af-cable" d={d} />
      <path className="af-cable-core" d={d} />
    </g>
  );
}

/** The lit dash and its head that run along a cable; moved by runAlong. */
export function Runner({
  d,
  headRef,
  runRef,
}: {
  d: string;
  runRef: (node: SVGPathElement | null) => void;
  headRef: (node: SVGGElement | null) => void;
}) {
  return (
    <>
      <path
        ref={runRef}
        className="af-run"
        d={d}
        pathLength={1}
        style={{ opacity: 0 }}
      />
      <g ref={headRef} style={{ opacity: 0 }}>
        <circle className="af-head-halo" r={3.2} />
        <circle className="af-head" r={1.5} />
      </g>
    </>
  );
}

/** Pill buttons under a figure. */
export function Controls({
  children,
  label = 'Figure controls',
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="af-controls" role="group" aria-label={label}>
      {children}
    </div>
  );
}

/** A Solid-like housing from housingOf. */
export function HousingArt({
  art,
  children,
}: {
  art: import('./parts').Housing;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Solid paths={art.plinth} tone="lo" crease="faint" />
      <Solid
        paths={art.body}
        tone="mid"
        crease="faint"
        inner={<Line d={art.seam} tone="faint" />}
      />
      <Line d={art.groove} tone="faint" />
      <Dots points={art.screws} size={0.5} tone="mid" />
      {children}
    </>
  );
}

/**
 * A dial drawn in a face plane (pass the face's sideMatrix as transform).
 * The needle sweeps from -135° (value 0) to +135° (value 1).
 */
export function FaceDial({
  needleRef,
  r = 7,
  ticks = 10,
  transform,
  value = 0,
}: {
  transform: string;
  r?: number;
  ticks?: number;
  value?: number;
  needleRef?: React.Ref<SVGPathElement>;
}) {
  const marks: string[] = [];
  for (let index = 0; index <= ticks; index++) {
    const angle = ((-135 + (270 * index) / ticks) * Math.PI) / 180;
    const inner = index % 5 === 0 ? r - 2.2 : r - 1.3;
    marks.push(
      `M${(Math.sin(angle) * inner).toFixed(2)} ${(-Math.cos(angle) * inner).toFixed(2)}L${(Math.sin(angle) * (r - 0.4)).toFixed(2)} ${(-Math.cos(angle) * (r - 0.4)).toFixed(2)}`,
    );
  }
  return (
    <g transform={transform}>
      <circle className="af-dial" r={r + 1} />
      <circle className="af-dial-face" r={r} />
      <path className="af-ui-line" d={marks.join('')} />
      <path
        ref={needleRef}
        className="af-dial-needle"
        d={`M0 1.6L0 ${-(r - 1.2)}`}
        transform={`rotate(${-135 + 270 * value})`}
      />
      <circle className="af-head" r={0.7} />
    </g>
  );
}

export const dialRotate = (value: number) =>
  `rotate(${(-135 + 270 * Math.max(0, Math.min(1, value))).toFixed(2)})`;

/** The dock and phone body; draw the screen content after it, then PhoneFront. */
export function PhoneBack({ phone }: { phone: import('./parts').Phone }) {
  return (
    <>
      <Solid
        paths={phone.dock}
        tone="mid"
        crease="faint"
        inner={<Line d={phone.dockSeam} tone="faint" />}
      />
      <Line d={phone.dockGroove} tone="faint" />
      <Dots points={phone.dockScrews} size={0.5} tone="mid" />
      <Solid paths={phone.rest} tone="lo" crease="faint" />
      <Solid paths={phone.body} tone="hi" crease="lo" />
      <Solid paths={phone.sideButton} tone="mid" crease="none" />
      <path className="af-glass" d={phone.bezel} />
      <Line d={phone.speaker} tone="lo" />
      <Dots points={[phone.camera]} size={0.6} tone="lo" />
      <path className="af-glass" d={phone.glass} />
    </>
  );
}

export function PhoneFront({ phone }: { phone: import('./parts').Phone }) {
  return (
    <>
      <Solid paths={phone.lip} tone="mid" crease="faint" />
      <Dots points={phone.lipScrews} size={0.45} tone="mid" />
    </>
  );
}

/** A clipped screen in the glass plane: children draw in screen units (u right, v down). */
export function PhoneScreen({
  children,
  id,
  phone,
}: {
  phone: import('./parts').Phone;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={phone.screen}>
      <defs>
        <clipPath id={id}>
          <rect width={phone.sw} height={phone.sh} rx={1.2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect className="af-screen" width={phone.sw} height={phone.sh} />
        {children}
      </g>
    </g>
  );
}

/** A socket shell from phone.socketAt. */
export function Socket({
  socket,
}: {
  socket: { shell: import('./kit/iso-kit').SolidPaths; mouth: string };
}) {
  return (
    <>
      <Solid paths={socket.shell} tone="mid" crease="none" />
      <Line d={socket.mouth} tone="lo" />
    </>
  );
}
