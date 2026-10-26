import { detectFramework } from './detect-framework';

describe('detectFramework', () => {
  it('detects React Native with Expo and Hermes in a split APK', () => {
    const result = detectFramework([
      'com.planet.centerparcs.apk',
      'config.arm64_v8a.apk',
      'com.planet.centerparcs.apk!assets/index.android.bundle',
      'com.planet.centerparcs.apk!META-INF/expo-modules-core_release.kotlin_module',
      'config.arm64_v8a.apk!lib/arm64-v8a/libreactnative.so',
      'config.arm64_v8a.apk!lib/arm64-v8a/libhermesvm.so',
    ]);

    expect(result).toMatchObject({
      expo: true,
      framework: 'react-native',
      hermes: true,
      isReactNative: true,
    });
    expect(result.evidence).toContain('lib/arm64-v8a/libreactnative.so');
  });

  it('detects bare React Native on older versions', () => {
    expect(
      detectFramework([
        'lib/armeabi-v7a/libreactnativejni.so',
        'lib/armeabi-v7a/libjsc.so',
      ]),
    ).toMatchObject({
      expo: false,
      framework: 'react-native',
      hermes: false,
      isReactNative: true,
    });
  });

  it('detects Flutter', () => {
    expect(
      detectFramework([
        'base.apk!assets/flutter_assets/AssetManifest.json',
        'config.arm64_v8a.apk!lib/arm64-v8a/libflutter.so',
      ]),
    ).toMatchObject({ framework: 'flutter', isReactNative: false });
  });

  it('detects Capacitor', () => {
    expect(
      detectFramework(['assets/capacitor.config.json', 'classes.dex']),
    ).toMatchObject({ framework: 'capacitor', isReactNative: false });
  });

  it('falls back to native when nothing matches', () => {
    expect(
      detectFramework(['classes.dex', 'lib/arm64-v8a/libsqlite.so']),
    ).toEqual({
      evidence: [],
      expo: false,
      framework: 'native',
      hermes: false,
      isReactNative: false,
    });
  });
});
