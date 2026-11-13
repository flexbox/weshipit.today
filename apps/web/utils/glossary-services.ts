/**
 * The service page that matches a glossary term, so definitions link to the
 * page that sells the work, not only to other definitions.
 */
export interface ServiceLink {
  href: string;
  label: string;
  pitch: string;
}

const MIGRATION: ServiceLink = {
  href: '/react-native-migration',
  label: 'Expo migration service',
  pitch:
    'We migrate bare and legacy React Native apps to Expo, development builds and the New Architecture.',
};
const TESTING: ServiceLink = {
  href: '/react-native-testing',
  label: 'React Native E2E testing',
  pitch:
    'We set up Maestro flows for your core user journeys and wire them into CI in two weeks.',
};
const SECURITY: ServiceLink = {
  href: '/react-native-security-audit',
  label: 'React Native security audit',
  pitch:
    'We audit secrets, storage, network and build settings against OWASP MASVS.',
};
const SPM: ServiceLink = {
  href: '/react-native-swift-package-manager-migration',
  label: 'CocoaPods to Swift Package Manager migration',
  pitch:
    'We move your iOS dependencies from CocoaPods to Swift Package Manager before CocoaPods goes read-only.',
};
const AUDIT: ServiceLink = {
  href: '/audit',
  label: 'React Native audit',
  pitch:
    'We review performance, architecture and tooling, and hand you a prioritised fix list in two weeks.',
};

const SERVICE_BY_TERM: Record<string, ServiceLink> = {
  bridge: MIGRATION,
  'bridgeless-mode': MIGRATION,
  'config-plugin': MIGRATION,
  'continuous-native-generation': MIGRATION,
  'development-build': MIGRATION,
  eas: MIGRATION,
  'eas-build': MIGRATION,
  'eas-submit': MIGRATION,
  'eas-update': MIGRATION,
  'eas-workflows': MIGRATION,
  expo: MIGRATION,
  'expo-go': MIGRATION,
  'expo-modules-api': MIGRATION,
  'expo-sdk-version': MIGRATION,
  'interop-layer': MIGRATION,
  'legacy-vs-new-architecture': MIGRATION,
  'react-native-cli': MIGRATION,
  turbomodules: MIGRATION,
  'upgrade-helper': MIGRATION,
  detox: TESTING,
  'end-to-end-testing': TESTING,
  jest: TESTING,
  maestro: TESTING,
  mocking: TESTING,
  'react-native-testing-library': TESTING,
  'snapshot-testing': TESTING,
  'unit-testing': TESTING,
  'api-keys': SECURITY,
  'code-obfuscation': SECURITY,
  'jailbreak-root-detection': SECURITY,
  'owasp-masvs': SECURITY,
  'r8-proguard': SECURITY,
  'secure-storage': SECURITY,
  'ssl-pinning': SECURITY,
  cocoapods: SPM,
  podfile: SPM,
  'swift-package-manager': SPM,
};

export function serviceForTerm(slug: string): ServiceLink {
  return SERVICE_BY_TERM[slug] ?? AUDIT;
}

/**
 * The service a free-text page (a weekly plan) is closest to. The first
 * matching rule wins, so the more specific services come first.
 */
const SERVICE_BY_KEYWORD: [RegExp, ServiceLink][] = [
  [/\b(swift ?pm|swift package manager|cocoapods)\b/i, SPM],
  [/\b(security|owasp|ssl pinning|secure storage|vulnerab)/i, SECURITY],
  [/\b(maestro|detox|e2e|end-to-end)\b/i, TESTING],
  [/\b(expo sdk \d+|new architecture|upgrade|migrat)/i, MIGRATION],
];

export function serviceForText(text: string): ServiceLink {
  return (
    SERVICE_BY_KEYWORD.find(([pattern]) => pattern.test(text))?.[1] ?? AUDIT
  );
}
