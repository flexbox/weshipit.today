export type Framework =
  | 'capacitor'
  | 'cordova'
  | 'flutter'
  | 'native'
  | 'nativescript'
  | 'react-native'
  | 'unity'
  | 'xamarin';

export interface FrameworkDetection {
  evidence: string[];
  expo: boolean;
  framework: Framework;
  hermes: boolean;
  isReactNative: boolean;
}

const REACT_NATIVE = [
  /lib\/[^/]+\/libreactnativejni\.so$/,
  /lib\/[^/]+\/libreactnative\.so$/,
  /lib\/[^/]+\/libjscexecutor\.so$/,
  /lib\/[^/]+\/libhermes_executor\.so$/,
  /^assets\/index\.android\.bundle$/,
];

const EXPO = [
  /^META-INF\/expo[\w-]*\.kotlin_module$/,
  /lib\/[^/]+\/libexpo-modules-core\.so$/,
  /^assets\/app\.config$/,
];

const HERMES = [/lib\/[^/]+\/libhermes(vm)?\.so$/];

// Checked in order: the first framework with a match wins.
const OTHER_FRAMEWORKS: [Framework, RegExp[]][] = [
  ['flutter', [/lib\/[^/]+\/libflutter\.so$/, /^assets\/flutter_assets\//]],
  ['xamarin', [/lib\/[^/]+\/libmonodroid\.so$/, /^assemblies\/.+\.dll$/]],
  ['unity', [/lib\/[^/]+\/libunity\.so$/]],
  ['nativescript', [/lib\/[^/]+\/libNativeScript\.so$/]],
  ['capacitor', [/^assets\/capacitor\.(config|plugins)\.json$/]],
  ['cordova', [/^assets\/www\/cordova\.js$/]],
];

/** Split APKs are listed as `base.apk!lib/arm64-v8a/libfoo.so`. */
function innerPath(entry: string) {
  const separator = entry.lastIndexOf('!');
  return separator === -1 ? entry : entry.slice(separator + 1);
}

function matching(entries: string[], patterns: RegExp[]) {
  return entries.filter((entry) =>
    patterns.some((pattern) => pattern.test(innerPath(entry))),
  );
}

export function detectFramework(entries: string[]): FrameworkDetection {
  const reactNative = matching(entries, REACT_NATIVE);
  const expo = matching(entries, EXPO);
  const hermes = matching(entries, HERMES);

  if (reactNative.length > 0) {
    return {
      evidence: [...reactNative, ...hermes, ...expo].map(innerPath),
      expo: expo.length > 0,
      framework: 'react-native',
      hermes: hermes.length > 0,
      isReactNative: true,
    };
  }

  for (const [framework, patterns] of OTHER_FRAMEWORKS) {
    const evidence = matching(entries, patterns);
    if (evidence.length > 0) {
      return {
        evidence: evidence.map(innerPath),
        expo: false,
        framework,
        hermes: false,
        isReactNative: false,
      };
    }
  }

  return {
    evidence: [],
    expo: false,
    framework: 'native',
    hermes: false,
    isReactNative: false,
  };
}
