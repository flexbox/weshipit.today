import clsx from 'clsx';

import type { TileView } from '../lib/tile-view';
import { FrameworkGlyph } from './framework-glyph';

interface FrameworkTileProps {
  index: number;
  tile: TileView;
}

export function FrameworkTile({ index, tile }: FrameworkTileProps) {
  return (
    <div
      className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-tile p-3 text-center"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 38%, ${tile.color}2e 0%, transparent 62%)`,
      }}
    >
      <TileIndex index={index} />
      <FrameworkGlyph className="size-[38%]" tile={tile} />
      <p className="mt-[9%] line-clamp-2 text-[clamp(0.7rem,2.6vw,0.95rem)] leading-tight font-semibold text-zinc-100">
        {tile.name}
      </p>
      {tile.year ? (
        <p className="mt-1 font-mono text-[clamp(0.6rem,2vw,0.72rem)] text-zinc-500">
          since {tile.year}
        </p>
      ) : null}
    </div>
  );
}

export function TileIndex({
  className,
  index,
}: {
  className?: string;
  index: number;
}) {
  return (
    <span
      className={clsx(
        'absolute top-2.5 left-3 font-mono text-[0.65rem] text-zinc-600 tabular-nums',
        className,
      )}
    >
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}
