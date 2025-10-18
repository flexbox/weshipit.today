import React from 'react';
import { TranscriptEntryType, timecodeToSeconds } from '../utils/transcript';
import { Hyperlink } from '@weshipit/ui';

export function TranscriptEntry({
  entry,
  spotify_url,
}: {
  entry: TranscriptEntryType;
  spotify_url?: string;
}) {
  const seconds = timecodeToSeconds(entry.time);
  const spotifyUrl = `${spotify_url}${spotify_url?.includes('?') ? '&' : '?'}t=${seconds}`;

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-semibold">{entry.speaker}</span>
        <span className="text-slate-500">-</span>
        <Hyperlink href={spotifyUrl} isExternal>
          {entry.time}
        </Hyperlink>
      </div>
      <p className="whitespace-pre-line pl-2 border-l-2 border-blue-200 dark:border-blue-800 mt-0">
        {entry.text}
      </p>
    </div>
  );
}
