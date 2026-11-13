/**
 * The truth the figure moves by.
 *
 * Metro builds one bundle per platform. Importing './Picker' resolves to
 * Picker.ios.tsx in the iOS bundle and Picker.android.tsx in the Android
 * one, so the other platform's file is never shipped. Platform.select ships
 * in both bundles and picks its branch at runtime by Platform.OS.
 */

export type OS = 'ios' | 'android';

export interface SourceFile {
  only?: OS;
  name: string;
  select?: boolean;
}

export const FILES: SourceFile[] = [
  { name: 'App.tsx' },
  { name: 'Picker.ios.tsx', only: 'ios' },
  { name: 'Picker.android.tsx', only: 'android' },
  { name: 'styles.ts', select: true },
];

export const BUNDLE_NAME: Record<OS, string> = {
  android: 'index.android.bundle',
  ios: 'main.jsbundle',
};

export const shipped = (file: SourceFile, os: OS) =>
  !file.only || file.only === os;

export const readouts = {
  done: (os: OS, n: number) =>
    `${BUNDLE_NAME[os]} · ${n} of ${FILES.length} files`,
  file: (file: SourceFile, os: OS) =>
    !shipped(file, os)
      ? `${file.name} · not for ${os === 'ios' ? 'iOS' : 'Android'} · never shipped`
      : file.select
        ? `${file.name} · Platform.select ships both branches, picks ${os} at runtime`
        : file.only
          ? `./Picker → ${file.name}`
          : `${file.name} · shared, in both bundles`,
  rest: () => `Metro builds one bundle per platform`,
  start: (os: OS) =>
    `bundling for ${os === 'ios' ? 'iOS' : 'Android'} → ${BUNDLE_NAME[os]}`,
};
