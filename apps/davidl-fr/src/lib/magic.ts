import { Magic } from 'magic-sdk';

export const NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!;

export const magic =
  typeof window !== 'undefined'
    ? new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
    : null;
