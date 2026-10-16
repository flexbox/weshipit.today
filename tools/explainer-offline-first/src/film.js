// Offline-first explainer: paints the frame at time t. Every frame is a pure function of t.
// URL params: ?fmt=16x9|9x16|1x1  &reduced=1 (reduced-motion cut: same ideas, no travel, no camera moves)
window.initFilm = function () {
  const P = new URLSearchParams(location.search);
  const FMT = P.get('fmt') || '16x9';
  const R = P.get('reduced') === '1';
  const TL = window.TIMELINE,
    E = TL.ev,
    K = window.TOKENS,
    C = K.color,
    BEAT = TL.beat;
  const [W, H] = {
    '16x9': [1920, 1080],
    '9x16': [1080, 1920],
    '1x1': [1080, 1080],
  }[FMT];
  const NS = 'http://www.w3.org/2000/svg';

  // ---------------------------------------------------------------- layout per format
  // World coordinates = stage pixels at camera scale 1. The phone is drawn at 340×660 and scaled by phone.s.
  const LAYOUTS = {
    '16x9': {
      head: { x: 120, y: 172, size: 92 },
      cap: { cx: 960, bottom: 1040, size: 50, maxW: 1640, lh: 64 },
      label: 30,
      chip: 56,
      phone: { x: 150, y: 250, s: 1 },
      out: [490, 580],
      corner: null,
      storage: { cx: 745, cy: 580, w: 250, h: 128, dx: 74 },
      queue: { cx: 1110, cy: 580, w: 330, h: 128, dx: 98 },
      gap: [1370, 580],
      gapLabel: 'below',
      server: {
        cx: 1640,
        cy: 580,
        w: 300,
        h: 400,
        in: [1490, 580],
        y0: 95,
        dy: 92,
        size: 30,
      },
      zoom: { s: 1.2, fx: 860, fy: 470 },
      annot: { dx: 150, align: 'start' },
    },
    '9x16': {
      head: { x: 70, y: 130, size: 60 },
      cap: { cx: 540, bottom: 1880, size: 48, maxW: 940, lh: 62 },
      label: 34,
      chip: 64,
      phone: { x: 336, y: 925, s: 1.2 },
      out: [540, 925],
      corner: null,
      storage: { cx: 540, cy: 805, w: 290, h: 124, dx: 84, labelAt: 'left' },
      queue: { cx: 540, cy: 625, w: 360, h: 124, dx: 108, labelAt: 'left' },
      gap: [540, 510],
      gapLabel: 'right',
      server: {
        cx: 540,
        cy: 335,
        w: 380,
        h: 240,
        in: [540, 455],
        y0: 60,
        dy: 66,
        size: 34,
      },
      zoom: { s: 1.2, fx: 420, fy: 900 },
      annot: { dx: 100, align: 'start' },
    },
    '1x1': {
      head: { x: 60, y: 100, size: 46 },
      cap: { cx: 540, bottom: 1052, size: 42, maxW: 960, lh: 54 },
      label: 26,
      chip: 52,
      phone: { x: 60, y: 175, s: 0.9 },
      out: [366, 690],
      corner: [790, 690],
      storage: { cx: 790, cy: 690, w: 250, h: 116, dx: 70, labelAt: 'below' },
      queue: { cx: 790, cy: 507, w: 330, h: 110, dx: 96, labelAt: 'left' },
      gap: [790, 410],
      gapLabel: 'right',
      server: {
        cx: 790,
        cy: 272,
        w: 330,
        h: 210,
        in: [790, 377],
        y0: 50,
        dy: 56,
        size: 24,
      },
      zoom: { s: 1.25, fx: 360, fy: 520 },
      annot: { dx: 100, align: 'start' },
    },
  };
  const L = LAYOUTS[FMT];

  // ---------------------------------------------------------------- math
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  function bezier(p1x, p1y, p2x, p2y) {
    const cx = 3 * p1x,
      bx = 3 * (p2x - p1x) - cx,
      ax = 1 - cx - bx;
    const cy = 3 * p1y,
      by = 3 * (p2y - p1y) - cy,
      ay = 1 - cy - by;
    const X = (s) => ((ax * s + bx) * s + cx) * s,
      Y = (s) => ((ay * s + by) * s + cy) * s;
    return (u) => {
      if (u <= 0) return 0;
      if (u >= 1) return 1;
      let lo = 0,
        hi = 1,
        s = u;
      for (let i = 0; i < 40; i++) {
        const x = X(s);
        if (Math.abs(x - u) < 1e-6) break;
        if (x < u) lo = s;
        else hi = s;
        s = (lo + hi) / 2;
      }
      return Y(s);
    };
  }
  const eMove = bezier(...K.ease.move),
    eEnter = bezier(...K.ease.enter);
  const prog = (t, t0, dur) => clamp((t - t0) / dur);
  // Movement progress. Reduced motion: no in-between, the move snaps when it would have finished.
  const mv = (t, t0, dur, ease = eMove) =>
    R ? (t >= t0 + dur ? 1 : 0) : ease(prog(t, t0, dur));
  // Opacity fades are kept in reduced motion: nothing travels.
  const fade = (t, t0, dur = 0.3) => eMove(prog(t, t0, dur));
  const between = (t, t0, t1, fi = 0.3, fo = 0.3) =>
    Math.min(fade(t, t0, fi), 1 - fade(t, t1, fo));

  function along(pts, u) {
    const seg = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(
        pts[i][0] - pts[i - 1][0],
        pts[i][1] - pts[i - 1][1],
      );
      seg.push(d);
      total += d;
    }
    let d = clamp(u) * total;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) {
        const k = seg[i] ? clamp(d / seg[i]) : 1;
        return [
          lerp(pts[i][0], pts[i + 1][0], k),
          lerp(pts[i][1], pts[i + 1][1], k),
        ];
      }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  }

  // ---------------------------------------------------------------- dom helpers
  const svg = document.getElementById('stage');
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  function el(tag, attrs = {}, parent = svg, text) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    parent.appendChild(n);
    return n;
  }
  const set = (n, attrs) => {
    for (const k in attrs) n.setAttribute(k, attrs[k]);
  };
  const show = (n, o) =>
    n.setAttribute('opacity', Math.round(clamp(o) * 1000) / 1000);
  const measureCtx = document.createElement('canvas').getContext('2d');
  const measure = (text, size, weight = 700, family = 'Space Grotesk') => {
    measureCtx.font = `${weight} ${size}px "${family}"`;
    return measureCtx.measureText(text).width;
  };
  const DISPLAY = K.font.display,
    MONO = K.font.mono;
  const monoAttrs = (size, fill = C.ink) => ({
    'font-family': MONO,
    'font-weight': 500,
    'font-size': size,
    'letter-spacing': (size * 0.08).toFixed(2),
    fill,
  });

  // ---------------------------------------------------------------- derived geometry
  const PH = L.phone;
  const ROW = (i) => 170 + i * 122; // row top inside the phone
  const ctrlLocal = (i) => [266, ROW(i) + 53];
  const toWorld = ([x, y]) => [PH.x + x * PH.s, PH.y + y * PH.s];
  const ctrl = (i) => toWorld(ctrlLocal(i));
  const slot = (node, i) => [node.cx + (i - 1) * node.dx, node.cy];
  const serverRow = (i) => [
    L.server.cx - L.server.w / 2 + 40,
    L.server.cy - L.server.h / 2 + L.server.y0 + i * L.server.dy,
  ];
  const via = L.corner ? [L.out, L.corner] : [L.out];
  const short = ([x, y], [fx, fy], d) => {
    const l = Math.hypot(x - fx, y - fy);
    return [x - ((x - fx) / l) * d, y - ((y - fy) / l) * d];
  };
  const PATH = {
    toGap: (i) => [ctrl(i), ...via, short(L.gap, L.corner || L.out, 40)],
    toStorage: (i) => [ctrl(i), ...via, slot(L.storage, i)],
    copy: (i) => [slot(L.storage, i), slot(L.queue, i)],
    flush: (i) => [
      slot(L.queue, i),
      [L.queue.cx, L.queue.cy],
      L.server.in,
      [serverRow(i)[0] + 14, serverRow(i)[1]],
    ],
  };

  // ---------------------------------------------------------------- build: background
  el('rect', { width: W, height: H, fill: C.ground });
  const grid = el('g', { stroke: C.grid, 'stroke-width': 1 });
  for (let x = 40; x < W; x += K.space.grid)
    el('line', { x1: x + 0.5, y1: 0, x2: x + 0.5, y2: H }, grid);
  for (let y = 40; y < H; y += K.space.grid)
    el('line', { x1: 0, y1: y + 0.5, x2: W, y2: y + 0.5 }, grid);
  const marks = el('g', { stroke: C.muted, 'stroke-width': 1.5 });
  for (const [x, y] of [
    [40, 40],
    [W - 40, 40],
    [40, H - 40],
    [W - 40, H - 40],
  ]) {
    el('line', { x1: x - 10, y1: y, x2: x + 10, y2: y }, marks);
    el('line', { x1: x, y1: y - 10, x2: x, y2: y + 10 }, marks);
  }

  // ---------------------------------------------------------------- build: world
  const world = el('g');
  const pipeline = el('g', {}, world);

  // wire: phone → (corner) → server, drawn on in S2
  const wirePts = [L.out, ...(L.corner ? [L.corner] : []), L.server.in];
  const wire = el(
    'polyline',
    {
      points: wirePts.join(' '),
      fill: 'none',
      stroke: C.ink,
      'stroke-width': K.stroke.wire,
      pathLength: 1,
      'stroke-dasharray': '1 1',
    },
    pipeline,
  );

  // the gap: where the signal drops out. Shape + label, never colour alone.
  const vertical = L.gapLabel === 'right';
  const gapG = el(
    'g',
    { transform: `translate(${L.gap[0]} ${L.gap[1]})` },
    pipeline,
  );
  const gapBreak = el(
    'rect',
    vertical
      ? { x: -8, y: -30, width: 16, height: 60, fill: C.ground }
      : { x: -30, y: -8, width: 60, height: 16, fill: C.ground },
    gapG,
  );
  const gapMark = el('g', {}, gapG);
  el(
    'circle',
    { r: 22, fill: C.ground, stroke: C.ink, 'stroke-width': 3 },
    gapMark,
  );
  el(
    'path',
    {
      d: 'M-9 -9 L9 9 M9 -9 L-9 9',
      stroke: C.ink,
      'stroke-width': 3.5,
      'stroke-linecap': 'round',
    },
    gapMark,
  );
  const gapText = el(
    'text',
    {
      ...monoAttrs(L.label),
      'text-anchor': vertical ? 'start' : 'middle',
      x: vertical ? 40 : 0,
      y: vertical ? L.label * 0.28 : 62,
    },
    gapMark,
    'NO SIGNAL',
  );

  function node(n, name) {
    const g = el('g', {}, pipeline);
    const inner = el('g', {}, g);
    const x = n.cx - n.w / 2,
      y = n.cy - n.h / 2;
    const fill = el(
      'rect',
      { x, y, width: n.w, height: n.h, rx: 14, fill: C.ground },
      inner,
    );
    const box = el(
      'rect',
      {
        x,
        y,
        width: n.w,
        height: n.h,
        rx: 14,
        fill: 'none',
        stroke: C.ink,
        'stroke-width': 3,
        pathLength: 1,
        'stroke-dasharray': '1 1',
      },
      inner,
    );
    // labels sit where the wire never crosses them
    const at = n.labelAt || 'above';
    const pos = {
      above: { x, y: y - 16 },
      left: { x: x - 20, y: n.cy + L.label * 0.35, 'text-anchor': 'end' },
      below: { x, y: y + n.h + L.label + 10 },
    }[at];
    const label = el('text', { ...monoAttrs(L.label), ...pos }, inner, name);
    return { g, inner, fill, box, label };
  }
  const storage = node(L.storage, 'PHONE STORAGE');
  const queue = node(L.queue, 'QUEUE');
  const server = node(L.server, 'SERVER');
  const slotsG = [];
  for (const [n, nn] of [
    [storage, L.storage],
    [queue, L.queue],
  ]) {
    const g = el('g', {}, n.inner);
    for (let i = 0; i < 3; i++) {
      const [sx, sy] = slot(nn, i);
      el(
        'rect',
        {
          x: sx - L.chip / 2,
          y: sy - L.chip / 2,
          width: L.chip,
          height: L.chip,
          rx: 10,
          fill: 'none',
          stroke: C.muted,
          'stroke-width': 2,
          'stroke-dasharray': '6 6',
        },
        g,
      );
    }
    slotsG.push(g);
  }
  let emptySize = L.label; // largest mono size that fits inside the server box
  while (
    emptySize > 16 &&
    measure('NO VISITS YET', emptySize, 500, 'JetBrains Mono') +
      emptySize * 0.08 * 12 >
      L.server.w - 56
  )
    emptySize--;
  const serverEmpty = el(
    'text',
    {
      ...monoAttrs(emptySize, C.muted),
      x: L.server.cx,
      y: L.server.cy + 8,
      'text-anchor': 'middle',
    },
    server.inner,
    'NO VISITS YET',
  );
  const serverRows = [0, 1, 2].map((i) => {
    const [x, y] = serverRow(i);
    const g = el('g', {}, server.inner);
    el('circle', { cx: x + 14, cy: y, r: 16, fill: C.accent }, g);
    el(
      'path',
      {
        d: `M${x + 6} ${y} l6 6 l11 -12`,
        fill: 'none',
        stroke: C.paper,
        'stroke-width': 3.5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      g,
    );
    el(
      'text',
      {
        x: x + 44,
        y: y + L.server.size * 0.36,
        'font-family': DISPLAY,
        'font-weight': 700,
        'font-size': L.server.size,
        fill: C.ink,
      },
      g,
      `Visit ${i + 1}`,
    );
    return g;
  });

  function chip(parent, n) {
    const g = el('g', {}, parent);
    el(
      'rect',
      {
        x: -L.chip / 2,
        y: -L.chip / 2,
        width: L.chip,
        height: L.chip,
        rx: 10,
        fill: C.accent,
      },
      g,
    );
    el(
      'text',
      {
        'font-family': DISPLAY,
        'font-weight': 700,
        'font-size': L.chip * 0.5,
        fill: C.paper,
        'text-anchor': 'middle',
        y: L.chip * 0.18,
      },
      g,
      String(n),
    );
    return g;
  }
  const storageChips = [0, 1, 2].map((i) => chip(storage.inner, i + 1));
  const queueChips = [0, 1, 2].map((i) => chip(queue.inner, i + 1));

  // ---------------------------------------------------------------- build: phone (real UI, field-service app)
  const phone = el(
    'g',
    { transform: `translate(${PH.x} ${PH.y}) scale(${PH.s})` },
    world,
  );
  el(
    'rect',
    {
      x: 0,
      y: 0,
      width: 340,
      height: 660,
      rx: 46,
      fill: C.paper,
      stroke: C.ink,
      'stroke-width': 3,
    },
    phone,
  );
  el(
    'text',
    {
      x: 30,
      y: 48,
      'font-family': DISPLAY,
      'font-weight': 700,
      'font-size': 22,
      fill: C.ink,
    },
    phone,
    '09:41',
  );
  const noSignal = el(
    'text',
    {
      x: 268,
      y: 48,
      'text-anchor': 'end',
      'font-family': DISPLAY,
      'font-weight': 500,
      'font-size': 24,
      fill: C.ink,
    },
    phone,
    'No signal',
  );
  const bars = [0, 1, 2, 3].map((i) =>
    el(
      'rect',
      {
        x: 278 + i * 9,
        y: 46 - (7 + i * 4.5),
        width: 6,
        height: 7 + i * 4.5,
        rx: 1.5,
        'stroke-width': 1.5,
        stroke: C.ink,
      },
      phone,
    ),
  );
  el(
    'text',
    {
      x: 28,
      y: 112,
      'font-family': DISPLAY,
      'font-weight': 700,
      'font-size': 34,
      fill: C.ink,
    },
    phone,
    'Today’s visits',
  );
  el(
    'text',
    { ...monoAttrs(18, C.muted), x: 28, y: 144 },
    phone,
    'BASEMENT LEVEL -2',
  );
  const TASKS = ['Boiler check', 'Smoke alarm', 'Water meter'];
  const rows = TASKS.map((task, i) => {
    const y = ROW(i);
    const g = el('g', {}, phone);
    el(
      'rect',
      {
        x: 18,
        y,
        width: 304,
        height: 106,
        rx: 18,
        fill: C.paper,
        stroke: C.rule,
        'stroke-width': 2,
      },
      g,
    );
    el(
      'text',
      {
        x: 40,
        y: y + 46,
        'font-family': DISPLAY,
        'font-weight': 700,
        'font-size': 30,
        fill: C.ink,
      },
      g,
      `Visit ${i + 1}`,
    );
    const sub = el(
      'text',
      {
        x: 40,
        y: y + 82,
        'font-family': DISPLAY,
        'font-weight': 500,
        'font-size': 26,
        fill: C.muted,
      },
      g,
      task,
    );
    const [cx, cy] = ctrlLocal(i);
    const pill = el(
      'rect',
      {
        x: cx - 48,
        y: cy - 25,
        width: 96,
        height: 50,
        rx: 25,
        'stroke-width': 2.5,
        stroke: C.ink,
      },
      g,
    );
    const pillText = el(
      'text',
      {
        x: cx,
        y: cy + 9,
        'text-anchor': 'middle',
        'font-family': DISPLAY,
        'font-weight': 700,
        'font-size': 26,
      },
      g,
      'Done',
    );
    const spin = el(
      'path',
      {
        d: 'M0 -17 A17 17 0 1 1 -16.2 -5.3',
        fill: 'none',
        stroke: C.accent,
        'stroke-width': 4.5,
        'stroke-linecap': 'round',
      },
      g,
    );
    const done = el('g', {}, g);
    el('circle', { cx, cy, r: 22, fill: C.accent }, done);
    el(
      'path',
      {
        d: `M${cx - 10} ${cy} l7 7 l13 -14`,
        fill: 'none',
        stroke: C.paper,
        'stroke-width': 4,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      done,
    );
    const err = el('g', {}, g);
    el(
      'circle',
      { cx, cy, r: 22, fill: C.paper, stroke: C.ink, 'stroke-width': 3 },
      err,
    );
    el(
      'path',
      {
        d: `M${cx - 8} ${cy - 8} l16 16 M${cx + 8} ${cy - 8} l-16 16`,
        stroke: C.ink,
        'stroke-width': 3.5,
        'stroke-linecap': 'round',
      },
      err,
    );
    const ring = el(
      'circle',
      { cx, cy, r: 24, fill: 'none', stroke: C.ink, 'stroke-width': 2 },
      g,
    );
    return { sub, pill, pillText, spin, done, err, ring, task, cx, cy };
  });
  const toast = el('g', {}, phone);
  el(
    'rect',
    { x: 18, y: 560, width: 304, height: 66, rx: 16, fill: C.ink },
    toast,
  );
  el(
    'text',
    {
      x: 170,
      y: 601,
      'text-anchor': 'middle',
      'font-family': DISPLAY,
      'font-weight': 500,
      'font-size': 22,
      fill: C.ground,
    },
    toast,
    'Couldn’t save. Try again.',
  );

  // moving objects: dots (a tap in flight) and chips (a saved change in flight)
  const movers = el('g', {}, world);
  const dot = (() => {
    const pool = [];
    return (i) =>
      pool[i] || (pool[i] = el('circle', { r: 13, fill: C.accent }, movers));
  })();
  const flyChips = [0, 1, 2, 3, 4, 5].map((i) => chip(movers, (i % 3) + 1));

  // ---------------------------------------------------------------- build: screen-space layers
  const annot = el('g');
  const annotLine = el(
    'polyline',
    {
      fill: 'none',
      stroke: C.ink,
      'stroke-width': 3,
      pathLength: 1,
      'stroke-dasharray': '1 1',
    },
    annot,
  );
  const annotDot = el('circle', { r: 6, fill: C.ink }, annot);
  const annotText = [
    el('text', { ...monoAttrs(L.label) }, annot, 'WAITING ON'),
    el('text', { ...monoAttrs(L.label) }, annot, 'THE SERVER'),
  ];

  const heads = TL.heads.map((h, hi) => {
    const g = el('g');
    const id = `head-clip-${hi}`;
    const clip = el('clipPath', { id }, el('defs', {}, g));
    el(
      'rect',
      {
        x: L.head.x - 20,
        y: L.head.y - L.head.size * 1.1,
        width: W,
        height: L.head.size * 1.45,
      },
      clip,
    );
    const inner = el('g', { 'clip-path': `url(#${id})` }, g);
    const words = [];
    let x = L.head.x;
    const space = measure(' ', L.head.size);
    for (const w of h.text.split(' ')) {
      words.push(
        el(
          'text',
          {
            x,
            y: L.head.y,
            'font-family': DISPLAY,
            'font-weight': 700,
            'font-size': L.head.size,
            'letter-spacing': (-0.025 * L.head.size).toFixed(2),
            fill: C.ink,
          },
          inner,
          w,
        ),
      );
      x += measure(w, L.head.size) - 0.025 * L.head.size * w.length + space;
    }
    return { ...h, g, words };
  });

  const cart = el('g');
  el(
    'text',
    { ...monoAttrs(L.label), x: L.head.x, y: L.head.y - L.head.size * 0.3 },
    cart,
    'WESHIPIT.TODAY',
  );
  el(
    'text',
    {
      ...monoAttrs(L.label * 0.8, C.muted),
      x: L.head.x,
      y: L.head.y - L.head.size * 0.3 + L.label * 1.5,
    },
    cart,
    'OFFLINE-FIRST, EXPLAINED',
  );

  // captions: wrap to at most two balanced lines
  function wrap(text) {
    const size = L.cap.size,
      words = text.split(' ');
    const fits = (l) =>
      measure(l, size, 500) <= L.cap.maxW && l.split(' ').length <= 8;
    if (fits(text)) return [text];
    let best = null;
    for (let k = 1; k < words.length; k++) {
      const a = words.slice(0, k).join(' '),
        b = words.slice(k).join(' ');
      if (!fits(a) || !fits(b)) continue;
      const score = Math.abs(measure(a, size, 500) - measure(b, size, 500));
      if (!best || score < best.score) best = { score, lines: [a, b] };
    }
    if (!best)
      throw new Error(`caption does not fit in two lines of 8 words: ${text}`);
    return best.lines;
  }
  const capBox = el('rect', { rx: 12, fill: C.ink });
  const caps = TL.captions.map((c) => {
    const lines = wrap(c.text);
    const w = Math.max(...lines.map((l) => measure(l, L.cap.size, 500))) + 56;
    const h = lines.length * L.cap.lh + 28;
    const g = el('g');
    lines.forEach((l, i) =>
      el(
        'text',
        {
          x: L.cap.cx,
          y: L.cap.bottom - h + 14 + L.cap.lh * (i + 0.5) + L.cap.size * 0.34,
          'text-anchor': 'middle',
          'font-family': DISPLAY,
          'font-weight': 500,
          'font-size': L.cap.size,
          fill: C.ground,
        },
        g,
        l,
      ),
    );
    return { ...c, lines, w, h, g };
  });

  // ---------------------------------------------------------------- state over time
  const TAPS_OK = [E.tapPhone, E.tap2, E.tap3];
  // Each row's state at time t: idle | press | spin | done | error, with the time the state began.
  function rowState(i, t) {
    const spans = [];
    if (i === 0)
      spans.push(
        ['idle', 0],
        ['spin', E.tapOpen],
        ['error', E.errOpen],
        ['idle', E.pullBack + 0.3],
        ['spin', E.tapServer],
        ['error', E.hitGap],
        ['idle', 9.7],
      );
    else spans.push(['idle', 0]);
    spans.push(
      ['press', TAPS_OK[i]],
      ['done', E.saves[i]],
      ['idle', E.turnFold + 0.4],
      ['spin', E.turnTaps[i]],
      ['error', E.turnErrors[i]],
    );
    spans.push(i === 0 ? ['spin', E.pushIn + 0.3] : ['idle', E.pushIn + 0.3]);
    let cur = spans[0];
    for (const s of spans) if (t >= s[1]) cur = s;
    return { mode: cur[0], since: cur[1] };
  }
  const tapTimes = (i) =>
    i === 0
      ? [E.tapOpen, E.tapServer, E.tapPhone, E.turnTaps[0]]
      : [TAPS_OK[i], E.turnTaps[i]];

  function offline(t) {
    return !(t >= E.online && t < E.turnReset);
  }

  // camera: Z = close on the phone, F = full diagram
  function camera(t) {
    const pc = toWorld([170, 330]);
    const Z = {
      s: L.zoom.s,
      x: L.zoom.fx - pc[0] * L.zoom.s,
      y: L.zoom.fy - pc[1] * L.zoom.s,
    };
    const F = { s: 1, x: 0, y: 0 };
    let u;
    if (t < E.pushIn) u = 1 - mv(t, E.pullBack, 1.1);
    else u = mv(t, E.pushIn, 1.1);
    return { s: lerp(F.s, Z.s, u), x: lerp(F.x, Z.x, u), y: lerp(F.y, Z.y, u) };
  }

  // ---------------------------------------------------------------- paint
  function paintWorld(t) {
    const cam = camera(t);
    set(world, {
      transform: `translate(${cam.x.toFixed(3)} ${cam.y.toFixed(3)}) scale(${cam.s.toFixed(5)})`,
    });

    // pipeline fades out in S8 so the phone is the one focal point again
    show(pipeline, 1 - fade(t, E.pushIn, 0.8));

    // wire draws on with the server in S2
    const wd = R ? 1 : eMove(prog(t, E.serverDraw, 0.9));
    set(wire, { 'stroke-dashoffset': (1 - wd).toFixed(4) });
    show(wire, R ? fade(t, E.serverDraw) : t >= E.serverDraw ? 1 : 0);

    // the gap is open whenever the phone has no signal
    const open =
      (t < E.online ? fade(t, E.serverDraw + 0.5, 0.4) : 0) ||
      (t >= E.turnReset ? fade(t, E.turnReset, 0.4) : 0);
    const closing =
      t >= E.online && t < E.turnReset ? 1 - fade(t, E.online, 0.4) : 0;
    const g = Math.max(open, closing);
    show(gapBreak, g);
    show(gapMark, g);
    const hit = (tt) => (R ? 0 : Math.sin(Math.PI * prog(t, tt, 0.4)) * 0.18);
    const pulse = Math.max(hit(E.hitGap), ...E.turnErrors.map(hit));
    set(gapMark, {
      transform: `scale(${(lerp(R ? 1 : 0.6, 1, g) + pulse).toFixed(4)})`,
    });

    // nodes draw on, then fold away in the turn
    const drawNode = (n, t0) => {
      const d = R ? 1 : eMove(prog(t, t0, 0.6));
      set(n.box, { 'stroke-dashoffset': (1 - d).toFixed(4) });
      show(n.box, R ? fade(t, t0) : t >= t0 ? 1 : 0);
      show(n.fill, fade(t, t0, 0.4));
      show(n.label, fade(t, t0 + 0.2, 0.4));
    };
    drawNode(storage, E.storageDraw);
    drawNode(queue, E.queueDraw);
    drawNode(server, E.serverDraw);
    show(slotsG[0], fade(t, E.storageDraw + 0.3, 0.4));
    show(slotsG[1], fade(t, E.queueDraw + 0.3, 0.4));
    for (const [n, nn] of [
      [storage, L.storage],
      [queue, L.queue],
    ]) {
      const f = mv(t, E.turnFold, 0.7);
      const k = 1 - f;
      set(n.g, {
        transform: `translate(${nn.cx} ${nn.cy}) scale(${vertical ? 1 : k} ${vertical ? k : 1}) translate(${-nn.cx} ${-nn.cy})`,
      });
      show(n.g, R ? 1 - fade(t, E.turnFold, 0.4) : k > 0.02 ? 1 : 0);
    }

    // storage chips: a tap's dot lands and becomes a chip
    storageChips.forEach((c, i) => {
      const [x, y] = slot(L.storage, i);
      const a = mv(t, E.saves[i], 0.25, eEnter);
      const s = R ? 1 : lerp(0.45, 1, a);
      set(c, { transform: `translate(${x} ${y}) scale(${s.toFixed(4)})` });
      show(c, t >= E.saves[i] ? (R ? fade(t, E.saves[i], 0.25) : 1) : 0);
    });
    // queue chips: present from landing until they leave for the server
    queueChips.forEach((c, i) => {
      const [x, y] = slot(L.queue, i);
      set(c, { transform: `translate(${x} ${y})` });
      const landed = E.copies[i] + BEAT;
      show(
        c,
        t >= landed && t < E.flush[i] ? (R ? fade(t, landed, 0.25) : 1) : 0,
      );
    });
    // server rows
    let anyRow = 0;
    serverRows.forEach((r, i) => {
      const landed = E.flush[i] + BEAT;
      const o =
        t < E.turnFold ? fade(t, landed, 0.25) : 1 - fade(t, E.turnFold, 0.4);
      show(r, o);
      anyRow = Math.max(anyRow, o);
    });
    show(serverEmpty, fade(t, E.serverDraw + 0.4, 0.4) * (1 - anyRow));

    // movers
    let d = 0;
    const moveDot = (pts, t0, t1, linger = 0) => {
      const n = dot(d++);
      if (R) {
        // reduced motion: nothing travels, but a still dot marks where the tap stopped
        const end = pts[pts.length - 1];
        set(n, { cx: end[0], cy: end[1] });
        return show(
          n,
          linger ? between(t, t1 - 0.25, t1 + linger, 0.2, 0.3) : 0,
        );
      }
      if (t < t0 || t > t1 + linger) return show(n, 0);
      const [x, y] = along(pts, eMove(prog(t, t0, t1 - t0)));
      set(n, { cx: x.toFixed(2), cy: y.toFixed(2) });
      show(n, t <= t1 ? 1 : 1 - fade(t, t1, linger));
    };
    moveDot(PATH.toGap(0), E.tapServer + 0.1, E.hitGap, 0.5);
    TAPS_OK.forEach((tt, i) =>
      moveDot(PATH.toStorage(i), tt + 0.05, E.saves[i]),
    );
    E.turnTaps.forEach((tt, i) =>
      moveDot(PATH.toGap(i), tt + 0.1, E.turnErrors[i], 0.5),
    );
    let f = 0;
    const moveChip = (pts, t0, t1) => {
      const n = flyChips[f++];
      if (R || t < t0 || t >= t1) return show(n, 0);
      const [x, y] = along(pts, eMove(prog(t, t0, t1 - t0)));
      set(n, { transform: `translate(${x.toFixed(2)} ${y.toFixed(2)})` });
      show(n, 1);
    };
    E.copies.forEach((tt, i) => moveChip(PATH.copy(i), tt, tt + BEAT));
    E.flush.forEach((tt, i) => moveChip(PATH.flush(i), tt, tt + BEAT));
  }

  function paintPhone(t) {
    // signal: bars drain at the drop, refill when the signal returns
    const off = offline(t);
    bars.forEach((b, i) => {
      let filled;
      if (t < E.signalDrop) filled = true;
      else if (t < E.online)
        filled = R ? false : t < E.signalDrop + (3 - i) * 0.1;
      else if (t < E.turnReset) filled = R ? true : t >= E.online + i * 0.08;
      else filled = R ? false : t < E.turnReset + (3 - i) * 0.08;
      set(b, { fill: filled ? C.ink : C.paper });
    });
    show(
      noSignal,
      off
        ? fade(t, t < E.online ? E.signalDrop + 0.3 : E.turnReset + 0.2, 0.25)
        : 0,
    );

    rows.forEach((r, i) => {
      const { mode, since } = rowState(i, t);
      const pressed =
        mode === 'press' || tapTimes(i).some((tt) => t >= tt && t < tt + 0.16);
      const idleish = mode === 'idle' || mode === 'press';
      show(r.pill, idleish && !pressed ? 1 : pressed ? 1 : 0);
      set(r.pill, { fill: pressed ? C.ink : C.paper });
      set(r.pillText, { fill: pressed ? C.paper : C.ink });
      show(r.pillText, idleish || pressed ? 1 : 0);
      const spinning = mode === 'spin' && !pressed;
      // reduced motion: the same spinner shape, held still
      show(r.spin, spinning ? 1 : 0);
      if (spinning)
        set(r.spin, {
          transform: `translate(${r.cx} ${r.cy}) rotate(${R ? 0 : (((t - since) * 400) % 360).toFixed(2)})`,
        });
      show(r.done, mode === 'done' ? (R ? fade(t, since, 0.2) : 1) : 0);
      const s = R ? 1 : lerp(0.6, 1, eEnter(prog(t, since, 0.25)));
      set(r.done, {
        transform: `translate(${r.cx} ${r.cy}) scale(${(mode === 'done' ? s : 1).toFixed(4)}) translate(${-r.cx} ${-r.cy})`,
      });
      show(r.err, mode === 'error' ? fade(t, since, 0.2) : 0);
      // every state has a word as well as a shape: Saving… / Not saved
      r.sub.textContent =
        mode === 'error' ? 'Not saved' : spinning ? 'Saving…' : r.task;
      set(r.sub, {
        fill: mode === 'error' || spinning ? C.ink : C.muted,
        'font-weight': mode === 'error' ? 700 : 500,
      });
      // tap ring: the finger lands
      const last = tapTimes(i)
        .filter((tt) => t >= tt)
        .pop();
      if (!R && last != null && t < last + 0.45) {
        const u = prog(t, last, 0.45);
        set(r.ring, { r: lerp(24, 50, eEnter(u)).toFixed(2) });
        show(r.ring, 0.6 * (1 - u));
      } else show(r.ring, 0);
    });
    show(toast, between(t, E.errOpen + 0.1, E.pullBack, 0.25, 0.3));
  }

  function paintScreen(t) {
    // annotation (S8): the opening spinner, now read correctly
    const cam = camera(t);
    const [wx, wy] = ctrl(0);
    const sx = wx * cam.s + cam.x,
      sy = wy * cam.s + cam.y;
    const phoneRight = (PH.x + 340 * PH.s) * cam.s + cam.x;
    const lx = phoneRight + L.annot.dx;
    const ly = sy - L.label * 0.2;
    const a = R ? 1 : eMove(prog(t, E.annotate, 0.6));
    set(annotLine, {
      points: `${sx + 30},${sy} ${lx - 18},${sy}`,
      'stroke-dashoffset': (1 - a).toFixed(4),
    });
    set(annotDot, { cx: sx + 30, cy: sy });
    show(annot, t >= E.annotate ? (R ? fade(t, E.annotate) : 1) : 0);
    annotText.forEach((n, i) => {
      set(n, { x: lx, y: ly + i * L.label * 1.25 });
      show(n, fade(t, E.annotate + 0.35, 0.4));
    });

    heads.forEach((h) => {
      const vis = t >= h.t0 - 0.01 && t < h.t1 + 0.4;
      show(h.g, vis ? 1 - fade(t, h.t1, 0.3) : 0);
      if (!vis) return;
      h.words.forEach((w, j) => {
        const u = R
          ? fade(t, h.t0, 0.3)
          : eEnter(prog(t, h.t0 + j * 0.07, 0.6));
        set(w, {
          transform: `translate(0 ${R ? 0 : ((1 - u) * L.head.size * 1.1).toFixed(2)})`,
        });
        show(w, R ? u : 1);
      });
    });
    show(cart, fade(t, E.cart, 0.5));

    // captions: the box morphs between consecutive lines instead of blinking
    let cur = -1;
    for (let i = 0; i < caps.length; i++) if (t >= caps[i].t0 - 0.0001) cur = i;
    caps.forEach((c, i) =>
      show(c.g, i === cur ? between(t, c.t0, c.t1, 0.12, 0.12) : 0),
    );
    if (cur < 0) return show(capBox, 0);
    const c = caps[cur],
      prev = caps[cur - 1];
    const chained = prev && c.t0 - prev.t1 < 0.35;
    const u = chained && !R ? eMove(prog(t, c.t0 - 0.1, 0.25)) : 1;
    const w = chained ? lerp(prev.w, c.w, u) : c.w,
      h = chained ? lerp(prev.h, c.h, u) : c.h;
    set(capBox, {
      x: (L.cap.cx - w / 2).toFixed(2),
      y: (L.cap.bottom - h).toFixed(2),
      width: w.toFixed(2),
      height: h.toFixed(2),
    });
    const boxIn = chained ? 1 : fade(t, c.t0, 0.15);
    const next = caps[cur + 1];
    const boxOut = next && next.t0 - c.t1 < 0.35 ? 0 : fade(t, c.t1, 0.15);
    show(capBox, Math.min(boxIn, 1 - boxOut));
  }

  // keep caption box under caption text
  svg.insertBefore(capBox, caps[0].g);

  window.seek = function (t) {
    t = clamp(+t, 0, TL.duration);
    paintWorld(t);
    paintPhone(t);
    paintScreen(t);
  };
  window.META = { FPS: TL.fps, DURATION: TL.duration, W, H, FMT, REDUCED: R };
};
