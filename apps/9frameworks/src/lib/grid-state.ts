import { type Framework, getFramework } from '../data/catalog';

export const GRID_SIZE = 9;
export const MAX_TITLE_LENGTH = 40;
export const MAX_CUSTOM_NAME_LENGTH = 24;

export interface Pick {
  /** Catalog id, or `~Name` for a framework that isn't in the catalog. */
  id: string;
  /** Year the framework entered your life. */
  year?: number;
}

export type Slot = Pick | null;

export interface GridState {
  slots: Slot[];
  title: string;
}

export interface ResolvedPick {
  year?: number;
  isCustom: boolean;
  framework: Framework;
}

const EMPTY_TOKEN = '_';
const CUSTOM_PREFIX = '~';
const YEAR_SEPARATOR = '@';

export function emptySlots(): Slot[] {
  return Array.from({ length: GRID_SIZE }, () => null);
}

export function customId(name: string): string {
  return `${CUSTOM_PREFIX}${sanitizeCustomName(name)}`;
}

// Commas, @ and ~ are reserved by the URL format.
export function sanitizeCustomName(name: string): string {
  return name
    .replace(/[,@~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CUSTOM_NAME_LENGTH);
}

export function isValidYear(year: number): boolean {
  return Number.isInteger(year) && year >= 1970 && year <= 2100;
}

export function resolvePick(pick: Pick): ResolvedPick | null {
  if (pick.id.startsWith(CUSTOM_PREFIX)) {
    const name = sanitizeCustomName(pick.id.slice(1));
    if (!name) return null;
    return {
      framework: { category: 'tooling', id: customId(name), name },
      isCustom: true,
      year: pick.year,
    };
  }
  const framework = getFramework(pick.id);
  return framework ? { framework, isCustom: false, year: pick.year } : null;
}

export function encodeSlots(slots: Slot[]): string {
  return normalizeSlots(slots)
    .map((slot) => {
      if (!slot) return EMPTY_TOKEN;
      return slot.year ? `${slot.id}${YEAR_SEPARATOR}${slot.year}` : slot.id;
    })
    .join(',');
}

export function decodeSlots(value: string | null | undefined): Slot[] {
  if (!value) return emptySlots();
  const tokens = value.split(',').slice(0, GRID_SIZE);
  return normalizeSlots(tokens.map(decodeToken));
}

function decodeToken(token: string): Slot {
  if (!token || token === EMPTY_TOKEN) return null;
  const [id, rawYear] = token.split(YEAR_SEPARATOR);
  const year = Number(rawYear);
  const pick: Pick = isValidYear(year) ? { id, year } : { id };
  const resolved = resolvePick(pick);
  return resolved ? { id: resolved.framework.id, year: pick.year } : null;
}

// Always exactly nine slots, and each framework at most once.
export function normalizeSlots(slots: Slot[]): Slot[] {
  const seen = new Set<string>();
  const result = emptySlots();
  slots.slice(0, GRID_SIZE).forEach((slot, index) => {
    if (!slot || seen.has(slot.id.toLowerCase())) return;
    seen.add(slot.id.toLowerCase());
    result[index] = slot;
  });
  return result;
}

export function sanitizeTitle(title: string | null | undefined): string {
  return (title ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_TITLE_LENGTH);
}

export function toSearchParams(state: GridState): string {
  const params = [
    `f=${encodeURIComponent(encodeSlots(state.slots)).replace(/%2C/g, ',').replace(/%40/g, '@')}`,
  ];
  const title = sanitizeTitle(state.title);
  if (title) params.push(`n=${encodeURIComponent(title)}`);
  return params.join('&');
}

export function fromSearchParams(
  params: Record<string, string | string[] | undefined>,
): GridState {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  return {
    slots: decodeSlots(first(params.f)),
    title: sanitizeTitle(first(params.n)),
  };
}

export function countFilled(slots: Slot[]): number {
  return slots.filter(Boolean).length;
}
