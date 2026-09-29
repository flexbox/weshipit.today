import type { Slot } from '../lib/grid-state';
import { toTileView } from '../lib/tile-view';
import { FrameworkTile, TileIndex } from './framework-tile';

export function NineGrid({ slots }: { slots: Slot[] }) {
  return (
    <ol className="grid grid-cols-3 gap-2 sm:gap-3">
      {slots.map((slot, index) => {
        const tile = toTileView(slot);
        return (
          <li key={tile?.id ?? `empty-${index}`}>
            {tile ? (
              <FrameworkTile index={index} tile={tile} />
            ) : (
              <div className="relative aspect-square rounded-2xl border border-dashed border-white/10">
                <TileIndex index={index} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
