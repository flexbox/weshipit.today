import type { TileView } from '../lib/tile-view';

interface FrameworkGlyphProps {
  tile: TileView;
  className?: string;
}

export function FrameworkGlyph({ className, tile }: FrameworkGlyphProps) {
  if (tile.path) {
    return (
      <svg
        aria-hidden
        className={className}
        fill={tile.color}
        viewBox="0 0 24 24"
      >
        <path d={tile.path} />
      </svg>
    );
  }
  return (
    <svg aria-hidden className={className} viewBox="0 0 24 24">
      <rect
        fill="none"
        height="22"
        rx="5"
        stroke={tile.color}
        strokeWidth="1.5"
        width="22"
        x="1"
        y="1"
      />
      <text
        dominantBaseline="central"
        fill={tile.color}
        fontFamily="var(--font-mono), monospace"
        fontSize={tile.mark.length > 1 ? 9 : 11}
        fontWeight="700"
        textAnchor="middle"
        x="12"
        y="12.5"
      >
        {tile.mark}
      </text>
    </svg>
  );
}
