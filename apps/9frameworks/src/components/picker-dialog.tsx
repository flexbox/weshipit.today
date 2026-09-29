'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CATEGORIES, type Category, FRAMEWORKS } from '../data/catalog';
import { customId, sanitizeCustomName } from '../lib/grid-state';
import { toTileView } from '../lib/tile-view';
import { FrameworkGlyph } from './framework-glyph';

interface PickerDialogProps {
  open: boolean;
  onClose: () => void;
  pickedIds: Set<string>;
  slotIndex: number | null;
  onPick: (id: string) => void;
}

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9#+]/g, '');

export function PickerDialog({
  onClose,
  onPick,
  open,
  pickedIds,
  slotIndex,
}: PickerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setCategory('all');
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const results = useMemo(() => {
    const needle = normalize(query);
    return FRAMEWORKS.filter(
      (framework) =>
        (category === 'all' || framework.category === category) &&
        (!needle || normalize(framework.name).includes(needle)),
    ).sort((a, b) => {
      // Prefix matches first, so "re" surfaces React before Prettier.
      if (!needle) return 0;
      const aStarts = normalize(a.name).startsWith(needle) ? 0 : 1;
      const bStarts = normalize(b.name).startsWith(needle) ? 0 : 1;
      return aStarts - bStarts;
    });
  }, [category, query]);

  const customName = sanitizeCustomName(query);
  const hasExactMatch = FRAMEWORKS.some(
    (framework) => normalize(framework.name) === normalize(customName),
  );
  const canAddCustom =
    customName.length > 0 &&
    !hasExactMatch &&
    !pickedIds.has(customId(customName));
  const firstAvailable = results.find((f) => !pickedIds.has(f.id));

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (firstAvailable) onPick(firstAvailable.id);
    else if (canAddCustom) onPick(customId(customName));
  }

  return (
    <dialog
      aria-labelledby="picker-title"
      className="m-auto h-[min(40rem,90dvh)] w-[min(44rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e11] p-0 text-zinc-300 open:flex"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      ref={dialogRef}
    >
      <form
        className="border-b border-white/8 p-4 sm:p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-zinc-100" id="picker-title">
            {slotIndex === null
              ? 'Add a framework'
              : `Pick #${String(slotIndex + 1).padStart(2, '0')}`}
          </h2>
          <button
            aria-label="Close"
            className="rounded-md px-2 py-1 font-mono text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-100"
            onClick={onClose}
            type="button"
          >
            esc
          </button>
        </div>
        <input
          aria-label="Search frameworks"
          autoComplete="off"
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-accent"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="React, Rails, jQuery, Rust…"
          ref={inputRef}
          type="search"
          value={query}
        />
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(['all', ...Object.keys(CATEGORIES)] as const).map((key) => (
            <button
              className={clsx(
                'shrink-0 rounded-full border px-3 py-1 text-xs transition-colors',
                category === key
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-white/10 text-zinc-400 hover:text-zinc-100',
              )}
              key={key}
              onClick={() => setCategory(key as Category | 'all')}
              type="button"
            >
              {key === 'all' ? 'All' : CATEGORIES[key as Category]}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {canAddCustom ? (
          <button
            className="mb-3 flex w-full items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-3 text-left transition-colors hover:border-accent"
            onClick={() => onPick(customId(customName))}
            type="button"
          >
            <span className="font-mono text-accent">+</span>
            <span>
              Add <strong className="text-zinc-100">{customName}</strong>
              <span className="text-zinc-500"> as a custom entry</span>
            </span>
          </button>
        ) : null}

        {results.length === 0 && !canAddCustom ? (
          <p className="py-10 text-center text-sm text-zinc-500">
            Already in your grid.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {results.map((framework) => {
              const tile = toTileView({ id: framework.id });
              const picked = pickedIds.has(framework.id);
              if (!tile) return null;
              return (
                <li key={framework.id}>
                  <button
                    className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-tile px-3 py-2.5 text-left text-sm transition-colors enabled:hover:border-white/25 disabled:opacity-35"
                    disabled={picked}
                    onClick={() => onPick(framework.id)}
                    type="button"
                  >
                    <FrameworkGlyph className="size-6 shrink-0" tile={tile} />
                    <span className="truncate text-zinc-100">
                      {framework.name}
                    </span>
                    {picked ? (
                      <span className="ml-auto font-mono text-[0.65rem] text-zinc-500">
                        picked
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </dialog>
  );
}
