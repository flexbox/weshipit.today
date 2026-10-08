'use client';

import { useEffect, useRef } from 'react';

/**
 * Shared machinery for the blueprint-style hero figures.
 *
 * Each figure is drawn in a fixed virtual coordinate system (width x height)
 * that is scaled/centered to fit the canvas, which keeps the layout math
 * simple. A figure only supplies a `draw` function for a progress `p` in 0..1.
 */

/**
 * Paper and ink follow the colour scheme. Light mode is graph paper with blue
 * ink. Dark mode is a lit drafting table: the same grid at the same opacity
 * becomes a dense mesh, so it drops back and the figure gets a glow instead.
 * The canvas cannot read `currentColor`, so the palette is swapped from a
 * `prefers-color-scheme` listener. The paper itself is the container's
 * background, set with Tailwind so it never flashes the wrong theme.
 */
export interface Palette {
  ink: string;
  /** Secondary ink for the interface inside the screen. */
  inkUi: string;
  inkSoft: string;
  fill: string;
  buttonFill: string;
  screenFill: string;
  grid: string;
  gridMajor: string;
  /** Peak opacity of the backlight behind the handset. 0 disables it. */
  halo: number;
}

export const rgba = (rgb: string, alpha: number) => `rgba(${rgb}, ${alpha})`;

const LIGHT_RGB = '47, 95, 224';
export const DARK_RGB = '122, 158, 255';

const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    ink: `rgb(${LIGHT_RGB})`,
    inkUi: rgba(LIGHT_RGB, 0.85),
    inkSoft: rgba(LIGHT_RGB, 0.55),
    fill: rgba(LIGHT_RGB, 0.06),
    buttonFill: rgba(LIGHT_RGB, 0.16),
    screenFill: rgba(LIGHT_RGB, 0.035),
    grid: rgba(LIGHT_RGB, 0.09),
    gridMajor: rgba(LIGHT_RGB, 0.16),
    halo: 0,
  },
  dark: {
    ink: `rgb(${DARK_RGB})`,
    inkUi: rgba(DARK_RGB, 0.85),
    inkSoft: rgba(DARK_RGB, 0.5),
    fill: rgba(DARK_RGB, 0.08),
    buttonFill: rgba(DARK_RGB, 0.22),
    screenFill: rgba(DARK_RGB, 0.05),
    grid: rgba(DARK_RGB, 0.06),
    gridMajor: rgba(DARK_RGB, 0.11),
    halo: 0.28,
  },
};

// local progress within a stage
export const seg = (p: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (p - start) / (end - start)));

export const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Low level drawing helpers, all operating in virtual coords. */
export function createPen(
  ctx: CanvasRenderingContext2D,
  C: Palette,
  scale: number,
) {
  const partialLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    prog: number,
  ) => {
    if (prog <= 0) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + (x2 - x1) * prog, y1 + (y2 - y1) * prog);
    ctx.stroke();
  };

  // Stroke an open or closed polyline progressively along its length.
  const partialPolyline = (points: [number, number][], prog: number) => {
    if (prog <= 0 || points.length < 2) return;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += Math.hypot(
        points[i][0] - points[i - 1][0],
        points[i][1] - points[i - 1][1],
      );
    }
    let remain = total * Math.min(1, prog);
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length && remain > 0; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const len = Math.hypot(x1 - x0, y1 - y0);
      const t = Math.min(1, remain / len);
      ctx.lineTo(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
      remain -= len;
    }
    ctx.stroke();
  };

  // Stroke a rounded rect progressively along its perimeter.
  const roundedRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    prog: number,
  ) => {
    const corner = (r * Math.PI) / 2;
    const topLen = w - 2 * r;
    const sideLen = h - 2 * r;
    const total = 2 * topLen + 2 * sideLen + 4 * corner;
    let remain = prog * total;

    ctx.beginPath();
    ctx.moveTo(x + r, y);

    // top edge
    const top = Math.min(topLen, remain);
    ctx.lineTo(x + r + top, y);
    remain -= topLen;
    if (remain <= 0) return ctx.stroke();

    // top-right corner
    let c = Math.min(corner, remain) / corner;
    ctx.arc(
      x + w - r,
      y + r,
      r,
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI / 2) * c,
    );
    remain -= corner;
    if (remain <= 0) return ctx.stroke();

    // right edge
    const right = Math.min(sideLen, remain);
    ctx.lineTo(x + w, y + r + right);
    remain -= sideLen;
    if (remain <= 0) return ctx.stroke();

    // bottom-right corner
    c = Math.min(corner, remain) / corner;
    ctx.arc(x + w - r, y + h - r, r, 0, (Math.PI / 2) * c);
    remain -= corner;
    if (remain <= 0) return ctx.stroke();

    // bottom edge
    const bottom = Math.min(topLen, remain);
    ctx.lineTo(x + w - r - bottom, y + h);
    remain -= topLen;
    if (remain <= 0) return ctx.stroke();

    // bottom-left corner
    c = Math.min(corner, remain) / corner;
    ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI / 2 + (Math.PI / 2) * c);
    remain -= corner;
    if (remain <= 0) return ctx.stroke();

    // left edge
    const left = Math.min(sideLen, remain);
    ctx.lineTo(x, y + h - r - left);
    remain -= sideLen;
    if (remain <= 0) return ctx.stroke();

    // top-left corner
    c = Math.min(corner, remain) / corner;
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI + (Math.PI / 2) * c);
    ctx.stroke();
  };

  // A fully closed rounded rect path (used for small filled components).
  const roundedPath = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const drawGrid = (width: number, height: number) => {
    const step = 20;
    ctx.lineWidth = 1 / scale;
    ctx.strokeStyle = C.grid;
    ctx.beginPath();
    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    ctx.strokeStyle = C.gridMajor;
    ctx.beginPath();
    for (let x = 0; x <= width; x += step * 5) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step * 5) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  // Figure number, year and rotated spine label in the sheet margins.
  const drawSheetMarkings = (
    width: number,
    height: number,
    figure: string,
    spine: string,
    alpha: number,
  ) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = C.ink;
    ctx.font = `600 13px ${MONO}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(figure, 36, 56);
    ctx.textAlign = 'right';
    ctx.fillText('2026', width - 36, height - 32);
    ctx.translate(width - 30, 110);
    ctx.rotate(Math.PI / 2);
    ctx.textAlign = 'left';
    ctx.fillText(spine, 0, 0);
    ctx.restore();
  };

  // Leader line + part label. `anchor` is on the figure, `tip` is the elbow,
  // text is drawn outward from the tip.
  const drawLabel = (
    ax: number,
    ay: number,
    tx: number,
    ty: number,
    text: string,
    align: 'left' | 'right',
    prog: number,
  ) => {
    const e = ease(prog);
    ctx.save();
    ctx.globalAlpha = Math.min(1, prog * 1.5);
    ctx.strokeStyle = C.inkSoft;
    ctx.lineWidth = 1 / scale;

    // anchor dot
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(ax, ay, 2.4, 0, Math.PI * 2);
    ctx.fill();

    // leader: anchor -> elbow -> horizontal run to text
    const run = 26;
    const endX = align === 'right' ? tx + run : tx - run;
    // animate the elbow segment then the run
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax + (tx - ax) * e, ay + (ty - ay) * e);
    ctx.stroke();
    if (e >= 0.999) {
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(endX, ty);
      ctx.stroke();
    }

    // text
    ctx.globalAlpha = Math.max(0, (prog - 0.55) / 0.45);
    ctx.fillStyle = C.ink;
    ctx.font = `600 12.5px ${MONO}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = align === 'right' ? 'left' : 'right';
    const pad = 6;
    ctx.fillText(text, align === 'right' ? endX + pad : endX - pad, ty);
    ctx.restore();
  };

  return {
    partialLine,
    partialPolyline,
    roundedRect,
    roundedPath,
    drawGrid,
    drawSheetMarkings,
    drawLabel,
  };
}

export type Pen = ReturnType<typeof createPen>;

export interface BlueprintFrame {
  ctx: CanvasRenderingContext2D;
  /** Draw progress, 0..1. */
  p: number;
  C: Palette;
  scale: number;
  pen: Pen;
}

interface BlueprintCanvasProps {
  /** Virtual sheet width. */
  width: number;
  /** Virtual sheet height. */
  height: number;
  /** ms for a full draw. */
  duration: number;
  /** ms hold once complete, before looping. */
  pause: number;
  draw: (frame: BlueprintFrame) => void;
  /** CSS aspect ratio of the sheet, defaults to width / height. */
  aspectRatio?: string;
  label?: string;
}

export function BlueprintCanvas({
  width,
  height,
  duration,
  pause,
  draw,
  aspectRatio,
  label,
}: BlueprintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let C: Palette = darkQuery.matches ? PALETTES.dark : PALETTES.light;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit the virtual sheet into the canvas with a little padding
      const pad = 8;
      const s = Math.min(
        (rect.width - pad * 2) / width,
        (rect.height - pad * 2) / height,
      );
      scale = s;
      offsetX = (rect.width - width * s) / 2;
      offsetY = (rect.height - height * s) / 2;
    };

    const render = (p: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);
      draw({ ctx, p, C, scale, pen: createPen(ctx, C, scale) });
      ctx.restore();
    };

    const frame = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = elapsed % (duration + pause);
      render(Math.min(1, t / duration));
      rafRef.current = requestAnimationFrame(frame);
    };

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const drawStatic = () => render(1);

    const play = () => {
      if (prefersReducedMotion || rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    resize();
    if (prefersReducedMotion) {
      drawStatic();
    }

    // Repaint in the new palette when the OS theme flips under us.
    const onSchemeChange = (event: MediaQueryListEvent) => {
      C = event.matches ? PALETTES.dark : PALETTES.light;
      if (prefersReducedMotion) drawStatic();
    };
    darkQuery.addEventListener('change', onSchemeChange);

    // A looping canvas costs a frame budget for as long as it runs, so the
    // loop only runs while the sheet is actually on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) play();
        else stop();
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (prefersReducedMotion) drawStatic();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      darkQuery.removeEventListener('change', onSchemeChange);
      observer.disconnect();
      stop();
    };
  }, [width, height, duration, pause, draw]);

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-[rgba(47,95,224,0.55)] bg-[#eef1fa] dark:border-[rgba(122,158,255,0.3)] dark:bg-[#0b0f1a]">
      <div
        className="relative w-full"
        style={{ aspectRatio: aspectRatio ?? `${width} / ${height}` }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role={label ? 'img' : undefined}
          aria-label={label}
        />
      </div>
    </div>
  );
}
