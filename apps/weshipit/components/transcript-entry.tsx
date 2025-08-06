import React from 'react';
import { TranscriptEntryType, timecodeToSeconds } from '../utils/transcript';

export function TranscriptEntry({
  entry,
  spotifyLink,
}: {
  entry: TranscriptEntryType;
  spotifyLink?: string;
}) {
  const seconds = timecodeToSeconds(entry.time);
  const spotifyUrl = spotifyLink
    ? `${spotifyLink}${spotifyLink.includes('?') ? '&' : '?'}t=${seconds}`
    : undefined;
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-semibold text-blue-700 dark:text-blue-300">
          {entry.speaker}
        </span>
        <span className="text-slate-500">-</span>
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-mono"
          style={{ flexShrink: 0 }}
        >
          [{entry.time}]
        </a>
      </div>
      <div className="whitespace-pre-line pl-2 border-l-2 border-blue-200 dark:border-blue-800">
        {entry.text}
      </div>
    </div>
  );
}
