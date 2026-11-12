/**
 * The truth the figure moves by: a small flexbox solver for one container
 * and three children, with React Native's defaults (flexDirection column,
 * justifyContent flex-start, alignItems stretch). `flex: 1` makes a child
 * take all remaining space along the main axis.
 */

export const DIRECTIONS = ['column', 'row'] as const;
export const JUSTIFY = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
] as const;
export const ALIGN = ['stretch', 'flex-start', 'center', 'flex-end'] as const;

export type Direction = (typeof DIRECTIONS)[number];
export type Justify = (typeof JUSTIFY)[number];
export type Align = (typeof ALIGN)[number];

export interface Style {
  align: Align;
  grow: boolean;
  justify: Justify;
  direction: Direction;
}

export const DEFAULTS: Style = {
  align: 'stretch',
  direction: 'column',
  grow: false,
  justify: 'flex-start',
};

/** Children as [width, height] in layout units; the middle one can grow. */
export const CHILDREN: Array<[number, number]> = [
  [22, 14],
  [30, 12],
  [16, 18],
];
export const GROWER = 1;

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Lay out the children in a container of width W and height H. */
export function layout(
  { align, direction, grow, justify }: Style,
  W: number,
  H: number,
): Box[] {
  const row = direction === 'row';
  const mainLen = row ? W : H;
  const crossLen = row ? H : W;
  const main = CHILDREN.map(([w, h]) => (row ? w : h));
  const cross = CHILDREN.map(([w, h]) => (row ? h : w));
  const used = main.reduce((sum, value) => sum + value, 0);
  if (grow) main[GROWER] += mainLen - used;
  const free = grow ? 0 : mainLen - used;
  let offset = 0;
  let gap = 0;
  if (justify === 'center') offset = free / 2;
  if (justify === 'flex-end') offset = free;
  if (justify === 'space-between') gap = free / (CHILDREN.length - 1);
  return CHILDREN.map((_, index) => {
    const size = align === 'stretch' ? crossLen : cross[index];
    const at =
      align === 'center'
        ? (crossLen - size) / 2
        : align === 'flex-end'
          ? crossLen - size
          : 0;
    const start = offset;
    offset += main[index] + gap;
    return row
      ? { h: size, w: main[index], x: start, y: at }
      : { h: main[index], w: size, x: at, y: start };
  });
}

export const styleText = ({ align, direction, grow, justify }: Style) =>
  `${direction} · ${justify} · ${align}${grow ? ' · flex: 1' : ''}`;
