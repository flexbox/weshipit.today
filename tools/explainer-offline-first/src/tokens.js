// Design tokens for the offline-first explainer.
// Pulled from the weshipit.today design system (light variant), shifted to a warm ground.
// Contrast ratios are measured against GROUND (see DECISIONS.md).
window.TOKENS = {
  color: {
    ground: '#F4F1EA', // warm paper, a step warmer than the brand light #F8FAFC
    ink: '#0A1E3C', // Deep Blueprint, 14.7:1
    muted: '#4A5A6E', // secondary text and line art, 6.3:1
    accent: '#0A6F8C', // React Cyan darkened for text-safe contrast, 5.1:1
    grid: '#E3DED3', // engineering grid, decorative only
    rule: '#C9C3B6', // inactive wires and outlines, decorative only
    paper: '#FFFFFF', // phone screen surface
  },
  font: {
    display: "'Space Grotesk', sans-serif", // headlines, captions, UI text
    mono: "'JetBrains Mono', monospace", // technical labels, uppercase, +8% tracking
  },
  // 8 px base grid; the stage uses a 40 px engineering grid.
  space: { unit: 8, grid: 40, margin: 120 },
  size: {
    // 16:9 sizes. Other formats scale from these in film.html.
    head: 96,
    caption: 58,
    label: 30,
    ui: 30,
  },
  stroke: { hair: 1.5, line: 3, wire: 4 },
  // Custom easing: a cubic bezier that settles without overshoot.
  ease: {
    move: [0.65, 0, 0.2, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
  },
};
