import React from 'react';
import { TranscriptEntryType } from '../utils/transcript';
import { TranscriptEntry } from './transcript-entry';
import { Prose, Text } from '@weshipit/ui';

export function Transcript({
  entries,
  spotifyLink,
}: {
  entries: TranscriptEntryType[];
  spotifyLink?: string;
}) {
  if (!entries || entries.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto">
      <Text as="h2" variant="h4" className="mb-6">
        Transcript de l'épisode
      </Text>
      <Prose>
        {entries.map((entry, idx) => (
          <TranscriptEntry key={idx} entry={entry} spotifyLink={spotifyLink} />
        ))}
      </Prose>
    </section>
  );
}
