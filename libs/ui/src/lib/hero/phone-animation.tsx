'use client';

import { useEffect, useRef } from 'react';

/**
 * Blueprint-style phone UI diagram.
 *
 * Everything is drawn in a fixed virtual coordinate system (VW x VH) and then
 * scaled/centered to fit the canvas, which keeps the layout math simple.
 */

const VW = 700; // virtual canvas width
const VH = 820; // virtual canvas height

// Blueprint palette (fixed — this is a technical "sheet", independent of theme)
const PAPER = '#eef1fa';
const INK = '#2f5fe0';
const INK_SOFT = 'rgba(47, 95, 224, 0.55)';
const FILL = 'rgba(47, 95, 224, 0.06)';
const GRID = 'rgba(47, 95, 224, 0.09)';
const GRID_MAJOR = 'rgba(47, 95, 224, 0.16)';

const DURATION = 6200; // ms for a full draw
const PAUSE = 1600; // ms hold once complete, before looping

// Phone geometry (virtual coords)
const PHONE = { x: 232, y: 150, w: 236, h: 504, r: 34 };
const SCREEN = {
  x: PHONE.x + 11,
  y: PHONE.y + 11,
  w: PHONE.w - 22,
  h: PHONE.h - 22,
  r: 24,
};
const CX = PHONE.x + PHONE.w / 2;

export function PhoneAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
        (rect.width - pad * 2) / VW,
        (rect.height - pad * 2) / VH,
      );
      scale = s;
      offsetX = (rect.width - VW * s) / 2;
      offsetY = (rect.height - VH * s) / 2;
    };

    // local progress within a stage
    const seg = (p: number, start: number, end: number) =>
      Math.max(0, Math.min(1, (p - start) / (end - start)));

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    // ---- low level drawing helpers (operate in virtual coords) ----

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
      ctx.arc(
        x + r,
        y + h - r,
        r,
        Math.PI / 2,
        Math.PI / 2 + (Math.PI / 2) * c,
      );
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

    const drawGrid = () => {
      const step = 20;
      ctx.lineWidth = 1 / scale;
      ctx.strokeStyle = GRID;
      ctx.beginPath();
      for (let x = 0; x <= VW; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, VH);
      }
      for (let y = 0; y <= VH; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(VW, y);
      }
      ctx.stroke();

      ctx.strokeStyle = GRID_MAJOR;
      ctx.beginPath();
      for (let x = 0; x <= VW; x += step * 5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, VH);
      }
      for (let y = 0; y <= VH; y += step * 5) {
        ctx.moveTo(0, y);
        ctx.lineTo(VW, y);
      }
      ctx.stroke();
    };

    // Leader line + part label. `anchor` is on the phone, `tip` is the elbow,
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
      ctx.strokeStyle = INK_SOFT;
      ctx.lineWidth = 1 / scale;

      // anchor dot
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(ax, ay, 2.4, 0, Math.PI * 2);
      ctx.fill();

      // leader: anchor -> elbow -> horizontal run to text
      const run = 26;
      const ex = tx;
      const ey = ty;
      const endX = align === 'right' ? ex + run : ex - run;
      // animate the elbow segment then the run
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      const midX = ax + (ex - ax) * e;
      const midY = ay + (ey - ay) * e;
      ctx.lineTo(midX, midY);
      ctx.stroke();
      if (e >= 0.999) {
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(endX, ey);
        ctx.stroke();
      }

      // text
      ctx.globalAlpha = Math.max(0, (prog - 0.55) / 0.45);
      ctx.fillStyle = INK;
      ctx.font = `600 ${12.5}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = align === 'right' ? 'left' : 'right';
      const pad = 6;
      ctx.fillText(text, align === 'right' ? endX + pad : endX - pad, ey);
      ctx.restore();
    };

    const draw = (p: number) => {
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      drawGrid();

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.fillStyle = FILL;

      // ---- sheet markings ----
      ctx.save();
      ctx.globalAlpha = seg(p, 0, 0.1);
      ctx.fillStyle = INK;
      ctx.font = '600 13px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('FIG-014', 36, 56);
      ctx.textAlign = 'right';
      ctx.fillText('2026', VW - 36, VH - 32);
      // rotated spine label
      ctx.translate(VW - 30, 110);
      ctx.rotate(Math.PI / 2);
      ctx.textAlign = 'left';
      ctx.fillText('[ MOBILE INTERFACE ]', 0, 0);
      ctx.restore();

      // ---- 1. phone body ----
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2 / 1;
      roundedRect(
        PHONE.x,
        PHONE.y,
        PHONE.w,
        PHONE.h,
        PHONE.r,
        ease(seg(p, 0.02, 0.18)),
      );

      // side buttons
      const btnP = seg(p, 0.16, 0.22);
      ctx.lineWidth = 3;
      partialLine(PHONE.x - 1, PHONE.y + 120, PHONE.x - 1, PHONE.y + 160, btnP);
      partialLine(PHONE.x - 1, PHONE.y + 180, PHONE.x - 1, PHONE.y + 220, btnP);
      partialLine(
        PHONE.x + PHONE.w + 1,
        PHONE.y + 150,
        PHONE.x + PHONE.w + 1,
        PHONE.y + 210,
        btnP,
      );
      ctx.lineWidth = 1.5;

      // ---- 2. screen ----
      ctx.lineWidth = 1.5;
      roundedRect(
        SCREEN.x,
        SCREEN.y,
        SCREEN.w,
        SCREEN.h,
        SCREEN.r,
        ease(seg(p, 0.16, 0.3)),
      );

      // ---- 3. dynamic island ----
      const islandP = ease(seg(p, 0.3, 0.4));
      if (islandP > 0) {
        const iw = 78 * islandP;
        const ih = 22;
        const ix = CX - iw / 2;
        const iy = SCREEN.y + 16;
        ctx.save();
        ctx.globalAlpha = islandP;
        roundedPath(ix, iy, iw, ih, 11);
        ctx.fillStyle = FILL;
        ctx.fill();
        ctx.stroke();
        if (islandP > 0.8) {
          // camera dot
          ctx.beginPath();
          ctx.arc(CX + iw / 2 - 11, iy + ih / 2, 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ---- 4. status bar ----
      const statusP = ease(seg(p, 0.38, 0.46));
      if (statusP > 0) {
        ctx.save();
        ctx.globalAlpha = statusP;
        const sy = SCREEN.y + 27;
        // time
        ctx.fillStyle = INK;
        ctx.font = '700 12px ui-monospace, monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText('9:41', SCREEN.x + 18, sy);
        // signal bars + battery
        const bx = SCREEN.x + SCREEN.w - 56;
        for (let i = 0; i < 4; i++) {
          const bh = 4 + i * 2.5;
          roundedPath(bx + i * 6, sy + 5 - bh, 3.5, bh, 1);
          ctx.fillStyle = INK;
          ctx.fill();
        }
        // battery
        roundedPath(bx + 30, sy - 4, 18, 9, 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = INK;
        ctx.fillRect(bx + 32, sy - 2, 11, 5);
        ctx.beginPath();
        ctx.fillRect(bx + 48, sy - 1, 2, 3);
        ctx.restore();
      }

      // ---- 5. hero module ----
      const heroP = ease(seg(p, 0.44, 0.56));
      const heroX = SCREEN.x + 16;
      const heroY = SCREEN.y + 56;
      const heroW = SCREEN.w - 32;
      const heroH = 116;
      if (heroP > 0) {
        ctx.save();
        ctx.globalAlpha = heroP;
        roundedRect(heroX, heroY, heroW * heroP, heroH, 16, 1);
        if (heroP > 0.6) {
          ctx.globalAlpha = (heroP - 0.6) / 0.4;
          // play / media glyph inside hero
          const gx = heroX + heroW / 2;
          const gy = heroY + heroH / 2;
          ctx.beginPath();
          ctx.arc(gx, gy, 22, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(gx - 6, gy - 9);
          ctx.lineTo(gx + 11, gy);
          ctx.lineTo(gx - 6, gy + 9);
          ctx.closePath();
          ctx.fillStyle = FILL;
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }

      // ---- 6. list rows ----
      const rowsTop = heroY + heroH + 20;
      const rowH = 34;
      const rowGap = 14;
      for (let i = 0; i < 3; i++) {
        const rp = ease(seg(p, 0.54 + i * 0.05, 0.66 + i * 0.05));
        if (rp <= 0) continue;
        const ry = rowsTop + i * (rowH + rowGap);
        ctx.save();
        ctx.globalAlpha = rp;
        // avatar square
        roundedRect(heroX, ry, rowH, rowH, 9, 1);
        // text lines
        const lineX = heroX + rowH + 12;
        const lineMax = heroW - rowH - 12;
        ctx.strokeStyle = INK_SOFT;
        ctx.lineWidth = 4;
        partialLine(lineX, ry + 11, lineX + lineMax * 0.75, ry + 11, rp);
        partialLine(lineX, ry + 23, lineX + lineMax * 0.45, ry + 23, rp);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.5;
        ctx.restore();
      }

      // ---- 7. primary action button ----
      const btnA = ease(seg(p, 0.72, 0.82));
      const abY = SCREEN.y + SCREEN.h - 118;
      const abX = SCREEN.x + 16;
      const abW = SCREEN.w - 32;
      const abH = 42;
      if (btnA > 0) {
        ctx.save();
        ctx.globalAlpha = btnA;
        roundedPath(abX, abY, abW, abH, 21);
        ctx.fillStyle = 'rgba(47, 95, 224, 0.16)';
        ctx.fill();
        ctx.stroke();
        if (btnA > 0.6) {
          ctx.globalAlpha = (btnA - 0.6) / 0.4;
          ctx.fillStyle = INK;
          ctx.font = '700 13px ui-monospace, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('CONTINUE', CX, abY + abH / 2);
        }
        ctx.restore();
      }

      // ---- 8. tab bar ----
      const tabP = ease(seg(p, 0.8, 0.9));
      const tabY = SCREEN.y + SCREEN.h - 58;
      if (tabP > 0) {
        ctx.save();
        ctx.globalAlpha = tabP;
        // divider
        partialLine(SCREEN.x + 10, tabY, SCREEN.x + SCREEN.w - 10, tabY, tabP);
        const icons = 4;
        const spacing = SCREEN.w / (icons + 1);
        for (let i = 0; i < icons; i++) {
          if (tabP < 0.4 + i * 0.12) continue;
          const tx = SCREEN.x + spacing * (i + 1);
          const ty = tabY + 22;
          ctx.beginPath();
          if (i === 0) {
            // home glyph
            ctx.moveTo(tx - 8, ty + 6);
            ctx.lineTo(tx - 8, ty - 1);
            ctx.lineTo(tx, ty - 8);
            ctx.lineTo(tx + 8, ty - 1);
            ctx.lineTo(tx + 8, ty + 6);
            ctx.stroke();
          } else if (i === 1) {
            // search
            ctx.arc(tx - 2, ty - 2, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(tx + 2.5, ty + 2.5);
            ctx.lineTo(tx + 8, ty + 8);
            ctx.stroke();
          } else if (i === 2) {
            // bell
            ctx.moveTo(tx - 7, ty + 5);
            ctx.lineTo(tx + 7, ty + 5);
            ctx.lineTo(tx + 4, ty);
            ctx.lineTo(tx + 4, ty - 4);
            ctx.arc(tx, ty - 4, 4, 0, Math.PI, true);
            ctx.lineTo(tx - 4, ty);
            ctx.closePath();
            ctx.stroke();
          } else {
            // profile
            ctx.arc(tx, ty - 4, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(tx, ty + 12, 9, Math.PI * 1.15, Math.PI * 1.85);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // ---- 9. home indicator ----
      const homeP = ease(seg(p, 0.88, 0.96));
      if (homeP > 0) {
        ctx.save();
        ctx.globalAlpha = homeP;
        const hw = 92 * homeP;
        roundedPath(CX - hw / 2, SCREEN.y + SCREEN.h - 16, hw, 5, 2.5);
        ctx.fillStyle = INK;
        ctx.fill();
        ctx.restore();
      }

      // ---- dimension lines ----
      const dimP = ease(seg(p, 0.9, 1));
      if (dimP > 0) {
        ctx.save();
        ctx.globalAlpha = dimP;
        ctx.strokeStyle = INK_SOFT;
        ctx.lineWidth = 1;
        ctx.fillStyle = INK;
        ctx.font = '11px ui-monospace, monospace';

        // width dimension (top)
        const dy = PHONE.y - 22;
        partialLine(PHONE.x, dy, PHONE.x + PHONE.w, dy, dimP);
        partialLine(PHONE.x, dy - 5, PHONE.x, dy + 5, 1);
        partialLine(PHONE.x + PHONE.w, dy - 5, PHONE.x + PHONE.w, dy + 5, 1);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.save();
        ctx.fillStyle = PAPER;
        ctx.fillRect(CX - 26, dy - 8, 52, 14);
        ctx.restore();
        ctx.fillStyle = INK;
        ctx.fillText('390 PT', CX, dy + 4);

        // height dimension (left)
        const dx = PHONE.x - 22;
        partialLine(dx, PHONE.y, dx, PHONE.y + PHONE.h, dimP);
        partialLine(dx - 5, PHONE.y, dx + 5, PHONE.y, 1);
        partialLine(dx - 5, PHONE.y + PHONE.h, dx + 5, PHONE.y + PHONE.h, 1);
        ctx.save();
        ctx.translate(dx - 4, PHONE.y + PHONE.h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = PAPER;
        ctx.fillRect(-26, -8, 52, 14);
        ctx.fillStyle = INK;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('844 PT', 0, 0);
        ctx.restore();
        ctx.restore();
      }

      // ---- labels with leader lines ----
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1;
      // left side
      drawLabel(
        CX,
        SCREEN.y + 27,
        PHONE.x - 14,
        SCREEN.y + 27,
        'DYNAMIC ISLAND',
        'left',
        seg(p, 0.62, 0.78),
      );
      drawLabel(
        heroX + 8,
        heroY + heroH / 2,
        PHONE.x - 14,
        heroY + heroH / 2,
        'HERO MODULE',
        'left',
        seg(p, 0.68, 0.84),
      );
      drawLabel(
        heroX + 8,
        rowsTop + rowH / 2,
        PHONE.x - 14,
        rowsTop + rowH / 2 + 18,
        'LIST ROW',
        'left',
        seg(p, 0.74, 0.9),
      );
      // right side
      drawLabel(
        SCREEN.x + SCREEN.w - 30,
        SCREEN.y + 27,
        PHONE.x + PHONE.w + 14,
        SCREEN.y + 12,
        'STATUS BAR',
        'right',
        seg(p, 0.64, 0.8),
      );
      drawLabel(
        CX,
        abY + 21,
        PHONE.x + PHONE.w + 14,
        abY + 21,
        'PRIMARY ACTION',
        'right',
        seg(p, 0.78, 0.92),
      );
      drawLabel(
        SCREEN.x + SCREEN.w - 40,
        tabY + 22,
        PHONE.x + PHONE.w + 14,
        tabY + 22,
        'TAB BAR',
        'right',
        seg(p, 0.82, 0.96),
      );
      drawLabel(
        CX + 50,
        SCREEN.y + SCREEN.h - 14,
        PHONE.x + PHONE.w + 14,
        SCREEN.y + SCREEN.h + 6,
        'HOME INDICATOR',
        'right',
        seg(p, 0.9, 1),
      );

      ctx.restore();
    };

    const frame = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const cycle = DURATION + PAUSE;
      const t = elapsed % cycle;
      const p = Math.min(1, t / DURATION);

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      draw(p);

      rafRef.current = requestAnimationFrame(frame);
    };

    resize();
    rafRef.current = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-2xl overflow-hidden rounded-xl border"
      style={{ borderColor: INK_SOFT, backgroundColor: PAPER }}
    >
      <div className="relative aspect-[7/8] w-full">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
