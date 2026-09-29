'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import {
  countFilled,
  emptySlots,
  fromSearchParams,
  GRID_SIZE,
  type GridState,
  isValidYear,
  MAX_TITLE_LENGTH,
  type Slot,
  toSearchParams,
} from '../lib/grid-state';
import { gridHeading, toTileView } from '../lib/tile-view';
import { FrameworkGlyph } from './framework-glyph';
import { FrameworkTile, TileIndex } from './framework-tile';
import { PickerDialog } from './picker-dialog';
import { ShareActions } from './share-actions';

const STORAGE_KEY = '9frameworks:grid';

interface BuilderProps {
  initialState: GridState;
  /** True when the grid came from the URL, which wins over localStorage. */
  fromUrl: boolean;
}

export function Builder({ fromUrl, initialState }: BuilderProps) {
  const [state, setState] = useState(initialState);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [restored, setRestored] = useState(fromUrl);

  // Restore the last draft once, after hydration.
  useEffect(() => {
    if (restored) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setState(
        fromSearchParams(Object.fromEntries(new URLSearchParams(saved))),
      );
    }
    setRestored(true);
  }, [restored]);

  const query = useMemo(() => toSearchParams(state), [state]);

  // Keep the draft in localStorage and the URL so refresh never loses it.
  useEffect(() => {
    if (!restored) return;
    localStorage.setItem(STORAGE_KEY, query);
    window.history.replaceState(null, '', `/create?${query}`);
  }, [query, restored]);

  const filled = countFilled(state.slots);
  const pickedIds = useMemo(
    () => new Set(state.slots.flatMap((slot) => (slot ? [slot.id] : []))),
    [state.slots],
  );

  function updateSlots(update: (slots: Slot[]) => Slot[]) {
    setState((current) => ({ ...current, slots: update([...current.slots]) }));
  }

  function openPicker(index: number | null) {
    setPickerSlot(index);
    setPickerOpen(true);
  }

  function handlePick(id: string) {
    updateSlots((slots) => {
      const target = pickerSlot ?? slots.findIndex((slot) => !slot);
      if (target < 0) return slots;
      // Replacing keeps the year only when it's the same framework.
      slots[target] = {
        id,
        year: slots[target]?.id === id ? slots[target]?.year : undefined,
      };
      return slots;
    });
    setPickerOpen(false);
  }

  function swap(from: number, to: number) {
    if (to < 0 || to >= GRID_SIZE || from === to) return;
    updateSlots((slots) => {
      [slots[from], slots[to]] = [slots[to], slots[from]];
      return slots;
    });
  }

  function remove(index: number) {
    updateSlots((slots) => {
      slots[index] = null;
      return slots;
    });
  }

  function setYear(index: number, value: string) {
    const year = Number(value);
    updateSlots((slots) => {
      const slot = slots[index];
      if (slot)
        slots[index] = { ...slot, year: isValidYear(year) ? year : undefined };
      return slots;
    });
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-6 pb-16 lg:grid-cols-[minmax(0,28rem)_1fr]">
      <div>
        <label className="block">
          <span className="font-mono text-xs text-zinc-500">
            whose 9 is it?
          </span>
          <input
            className="mt-1 w-full border-b border-white/10 bg-transparent pb-2 text-2xl font-extrabold tracking-tight text-zinc-50 outline-none placeholder:text-zinc-700 focus:border-accent"
            maxLength={MAX_TITLE_LENGTH}
            onChange={(event) =>
              setState((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="Your name or @handle"
            value={state.title}
          />
        </label>
        <p className="mt-2 text-sm text-zinc-500">
          {gridHeading(state.title.trim())}
        </p>

        <ol className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {state.slots.map((slot, index) => {
            const tile = toTileView(slot);
            return (
              <li
                className={clsx(
                  'group relative rounded-2xl transition-transform',
                  dragOver === index &&
                    dragFrom !== index &&
                    'scale-[1.04] ring-2 ring-accent',
                  dragFrom === index && 'opacity-40',
                )}
                key={tile?.id ?? `empty-${index}`}
                onDragEnd={() => {
                  setDragFrom(null);
                  setDragOver(null);
                }}
                onDragOver={(event) => {
                  if (dragFrom === null) return;
                  event.preventDefault();
                  setDragOver(index);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragFrom !== null) swap(dragFrom, index);
                  setDragFrom(null);
                  setDragOver(null);
                }}
              >
                {tile ? (
                  <>
                    <button
                      aria-label={`Replace ${tile.name}`}
                      className="block w-full cursor-grab rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing"
                      draggable
                      onClick={() => openPicker(index)}
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = 'move';
                        setDragFrom(index);
                      }}
                      type="button"
                    >
                      <FrameworkTile index={index} tile={tile} />
                    </button>
                    <button
                      aria-label={`Remove ${tile.name}`}
                      className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-black/60 text-sm text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white focus-visible:opacity-100 max-sm:opacity-100"
                      onClick={() => remove(index)}
                      type="button"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <button
                    className="relative grid aspect-square w-full place-items-center rounded-2xl border border-dashed border-white/15 text-zinc-600 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:outline-none"
                    onClick={() => openPicker(index)}
                    type="button"
                  >
                    <TileIndex index={index} />
                    <span className="text-3xl font-light">+</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>
            <span
              className={filled === GRID_SIZE ? 'text-accent' : 'text-zinc-300'}
            >
              {filled}
            </span>
            /{GRID_SIZE} picked · drag tiles to reorder
          </span>
          {filled > 0 ? (
            <button
              className="hover:text-zinc-200"
              onClick={() =>
                setState({ slots: emptySlots(), title: state.title })
              }
              type="button"
            >
              clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="font-mono text-xs text-zinc-500">
            {'// the journey — order & years'}
          </h2>
          <ol className="mt-3 divide-y divide-white/5 rounded-2xl border border-white/8 bg-tile">
            {state.slots.map((slot, index) => {
              const tile = toTileView(slot);
              return (
                <li
                  className="flex items-center gap-3 px-4 py-2.5"
                  key={tile?.id ?? `row-empty-${index}`}
                >
                  <span className="w-5 font-mono text-xs text-zinc-600 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {tile ? (
                    <>
                      <FrameworkGlyph className="size-5 shrink-0" tile={tile} />
                      <span className="min-w-0 flex-1 truncate text-sm text-zinc-100">
                        {tile.name}
                      </span>
                      <input
                        aria-label={`Year you started with ${tile.name}`}
                        className="w-20 rounded-md border border-white/10 bg-transparent px-2 py-1 font-mono text-xs text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-accent"
                        defaultValue={tile.year ?? ''}
                        inputMode="numeric"
                        maxLength={4}
                        onChange={(event) => setYear(index, event.target.value)}
                        placeholder="year"
                      />
                      <RowButton
                        label={`Move ${tile.name} up`}
                        onClick={() => swap(index, index - 1)}
                        disabled={index === 0}
                      >
                        ↑
                      </RowButton>
                      <RowButton
                        label={`Move ${tile.name} down`}
                        onClick={() => swap(index, index + 1)}
                        disabled={index === GRID_SIZE - 1}
                      >
                        ↓
                      </RowButton>
                    </>
                  ) : (
                    <button
                      className="flex-1 text-left text-sm text-zinc-600 hover:text-accent"
                      onClick={() => openPicker(index)}
                      type="button"
                    >
                      + add a framework
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section>
          <h2 className="font-mono text-xs text-zinc-500">{'// share it'}</h2>
          <div className="mt-3">
            <ShareActions disabled={filled === 0} query={query} />
          </div>
          {filled > 0 && filled < GRID_SIZE ? (
            <p className="mt-3 text-sm text-zinc-500">
              {GRID_SIZE - filled} empty{' '}
              {GRID_SIZE - filled === 1 ? 'slot' : 'slots'} left — the grid
              looks best full.
            </p>
          ) : null}
        </section>
      </div>

      <PickerDialog
        onClose={() => setPickerOpen(false)}
        onPick={handlePick}
        open={pickerOpen}
        pickedIds={pickedIds}
        slotIndex={pickerSlot}
      />
    </div>
  );
}

function RowButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-white/5 hover:text-zinc-100 disabled:opacity-20"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
