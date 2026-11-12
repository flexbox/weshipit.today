/**
 * The truth the figure moves by.
 *
 * In Expo Router the files in app/ are the routes: index.tsx is /,
 * settings.tsx is /settings, post/[id].tsx matches /post/42 with id = 42,
 * and _layout.tsx wraps every route. Every screen has a URL, so a deep link
 * opens it with no extra wiring, and a new file is a new route.
 */

export interface RouteFile {
  url: string;
  file: string;
  title: string;
}

export const FILES: RouteFile[] = [
  { file: 'index.tsx', title: 'Home', url: '/' },
  { file: 'settings.tsx', title: 'Settings', url: '/settings' },
  { file: '[id].tsx', title: 'Post', url: '/post/[id]' },
  { file: 'profile.tsx', title: 'Profile', url: '/profile' },
];

/** profile.tsx is not in app/ until the user adds it. */
export const ADDED = 3;
export const FOLDER = 2;

/** Which file a URL resolves to, and its params. */
export function match(
  url: string,
  files: number,
): { file: number; id?: string } | null {
  const post = url.match(/^\/post\/(\w+)$/);
  if (post) return { file: 2, id: post[1] };
  const index = FILES.slice(0, files).findIndex((route) => route.url === url);
  return index >= 0 ? { file: index } : null;
}

export const readouts = {
  added: () => `added app/profile.tsx · /profile exists now`,
  deep: (url: string, id: string) =>
    `deep link ${url} → app/post/[id].tsx · id = ${id}`,
  missing: (url: string) => `${url} · no file in app/ · unmatched route`,
  open: (url: string, file: string) => `${url} → app/${file}`,
  rest: () => `app/ · 3 files → 3 routes · open a URL`,
};
