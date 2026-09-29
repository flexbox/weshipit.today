const MIN_LUMINANCE = 0.08;

function relativeLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Tiles sit on a near-black background: near-black brands (Next.js, Vercel,
// GitHub…) swap to white so their logo stays visible.
export function readableOnDark(hex: string): string {
  return relativeLuminance(hex) < MIN_LUMINANCE ? '#F4F4F5' : hex;
}

export function monogram(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}# ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  const word = words[0] ?? '?';
  return word.slice(0, 2).replace(/^./, (c) => c.toUpperCase());
}

// Stable color for custom frameworks so the same name always looks the same.
export function colorFromName(name: string): string {
  const palette = [
    '#F97316',
    '#22D3EE',
    '#A78BFA',
    '#F472B6',
    '#34D399',
    '#FACC15',
    '#60A5FA',
  ];
  const hash = [...name.toLowerCase()].reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
  return palette[hash % palette.length];
}
