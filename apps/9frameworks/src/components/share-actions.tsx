'use client';

import { useEffect, useState } from 'react';

import { SHARE_TEXT } from '../lib/site';

interface ShareActionsProps {
  disabled?: boolean;
  /** Query string produced by `toSearchParams`. */
  query: string;
}

const buttonClass =
  'rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40';

export function ShareActions({ disabled, query }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');
  useEffect(() => setOrigin(window.location.origin), []);
  const shareUrl = `${origin}/g?${query}`;
  const text = encodeURIComponent(SHARE_TEXT);
  const url = encodeURIComponent(shareUrl);

  async function copyLink() {
    if (disabled) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-page transition-transform hover:-translate-y-0.5 aria-disabled:pointer-events-none aria-disabled:opacity-40"
        download="my-9-frameworks.png"
        href={`/api/og?${query}&format=square`}
      >
        Download PNG
      </a>
      <button
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={buttonClass}
        onClick={copyLink}
        type="button"
      >
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      <a
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={buttonClass}
        href={`https://x.com/intent/post?text=${text}&url=${url}`}
        rel="noreferrer"
        target="_blank"
      >
        Post on X
      </a>
      <a
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={buttonClass}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        rel="noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={buttonClass}
        href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`)}`}
        rel="noreferrer"
        target="_blank"
      >
        Bluesky
      </a>
    </div>
  );
}
