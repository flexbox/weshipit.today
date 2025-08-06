import React from 'react';
import { TranscriptEntryType } from '../utils/transcript';
import { TranscriptEntry } from './transcript-entry';

export function Transcript({
  entries,
  spotifyLink,
}: {
  entries: TranscriptEntryType[];
  spotifyLink?: string;
}) {
  if (!entries || entries.length === 0) return null;
  return (
    <section className="mt-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transcript de l'épisode</h2>
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 overflow-x-auto text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
        {entries.map((entry, idx) => (
          <TranscriptEntry key={idx} entry={entry} spotifyLink={spotifyLink} />
        ))}
      </div>
    </section>
  );
}
