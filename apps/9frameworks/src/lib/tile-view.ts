import { getIcon } from '../data/catalog';
import { colorFromName, monogram, readableOnDark } from './color';
import { resolvePick, type Slot } from './grid-state';

// Everything needed to draw a tile, shared by the React UI and the
// server-rendered share image so both look identical.
export interface TileView {
  id: string;
  mark: string;
  name: string;
  color: string;
  path?: string;
  year?: number;
}

export function toTileView(slot: Slot): TileView | null {
  if (!slot) return null;
  const resolved = resolvePick(slot);
  if (!resolved) return null;
  const { framework, year } = resolved;
  const icon = getIcon(framework);
  const color = icon?.hex ?? framework.color ?? colorFromName(framework.name);
  return {
    color: readableOnDark(color),
    id: framework.id,
    mark: monogram(framework.name),
    name: framework.name,
    path: icon?.path,
    year,
  };
}

export function gridHeading(title: string): string {
  if (!title) return 'My 9 frameworks';
  const possessive = /s$/i.test(title) ? `${title}'` : `${title}'s`;
  return `${possessive} 9 frameworks`;
}
