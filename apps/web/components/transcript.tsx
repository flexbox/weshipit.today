import React from 'react';
import { TranscriptEntryType } from '../utils/transcript';
import { TranscriptEntry } from './transcript-entry';
import { Prose } from '@weshipit/ui';

// The section heading lives in the <summary> that wraps this list on the
// episode page, so this only renders the entries.
export function Transcript({
  entries,
  spotify_url,
}: {
  entries: TranscriptEntryType[];
  spotify_url?: string;
}) {
  if (!entries || entries.length === 0) return null;

  return (
    <Prose>
      {entries.map((entry, idx) => (
        <TranscriptEntry key={idx} entry={entry} spotify_url={spotify_url} />
      ))}
    </Prose>
  );
}
