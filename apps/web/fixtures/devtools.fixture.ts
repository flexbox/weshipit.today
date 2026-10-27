export interface DevTool {
  id: string;
  name: string;
  slug: string;
  ios_url?: string;
  pricing?: string[];
  platform?: string[];
  features?: string[];
  description?: string;
  website_url?: string;
  android_url?: string;
  description_success?: string;
}

export const devtoolsFixture: DevTool[] = [
  {
    description:
      'App Store Connect is Apple\u2019s portal for managing your iOS, macOS, tvOS, and watchOS apps. Monitor sales, manage your team, respond to reviews, and submit apps for review.',
    description_success:
      'Monitor your app\u2019s performance, manage releases, and respond to user reviews directly from your iPhone.',
    features: ['Store', 'Analytics', 'Reviews', 'Distribution'],
    id: 'rec9bu4YFX8mh8Bui',
    ios_url: 'https://apps.apple.com/app/id1234793120',
    name: 'App Store Connect',
    platform: ['iOS', 'macOS'],
    slug: 'app-store-connect',
    website_url: 'https://appstoreconnect.apple.com/login',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp',
    description:
      'nRF Connect for Mobile is a robust tool that enables you to scan, explore, and communicate with your Bluetooth Low Energy devices. It supports various Bluetooth SIG adopted profiles, as well as the Device Firmware Update profile (DFU) from Nordic Semiconductor and Eddystone from Google.',
    description_success: 'Debug Bluetooth issues on Android and iOS.',
    features: ['Bluetooth'],
    id: 'recMDtgjXclE4We62',
    ios_url:
      'https://apps.apple.com/pl/app/nrf-connect-for-mobile/id1054362403',
    name: 'nRF Connect',
    platform: ['iOS', 'Android'],
    slug: 'nrf-connect',
    website_url:
      'https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-mobile',
  },
  {
    description:
      'The TestFlight app allows you to install and beta test apps on your iOS devices. The app is available for free on the App Store.',
    description_success:
      'Receive a push notification when the status of your app is updated.',
    features: ['Distribution', 'Beta testing'],
    id: 'recPmAB07ROC8odrt',
    ios_url: 'https://apps.apple.com/app/id899247664',
    name: 'Testflight',
    platform: ['macOS', 'iOS'],
    slug: 'testflight',
    website_url: 'https://testflight.apple.com/',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=org.eu.exodus_privacy.exodusprivacy&hl=fr&gl=US',
    description:
      '\u03b5xodus analyzes Android applications in order to list the embedded trackers.',
    description_success:
      'Audit any Android app to see which third-party trackers are embedded before shipping your own.',
    features: ['Privacy', 'Analytics'],
    id: 'recWjVg8R7DXZ6Gx5',
    name: 'Exodus Privacy',
    platform: ['Android'],
    slug: 'exodus-privacy',
    website_url: 'https://reports.exodus-privacy.eu.org/en/',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.google.android.apps.playconsole&pli=1',
    description:
      'The Google Play Console app lets you manage your Android apps on the go \u2014 track installs and ratings, reply to reviews, and monitor release rollouts.',
    description_success:
      'Monitor your Android app releases, reply to reviews, and track installs on the go.',
    features: ['Store', 'Analytics', 'Reviews', 'Distribution'],
    id: 'rechpJsggMYdxgEcn',
    ios_url: 'https://apps.apple.com/app/id1606772645',
    name: 'Google Play Console',
    platform: ['iOS', 'Android'],
    slug: 'google-play-console',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.absinthe.libchecker',
    description:
      'Discover what languages and libraries were used to build any given app.',
    description_success:
      'Inspect any Android app to understand its tech stack and detect React Native usage.',
    features: ['Debugging', 'Inspection'],
    id: 'reci4WamlBzT55w2B',
    name: 'LibChecker',
    platform: ['Android'],
    slug: 'libchecker',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.adafruit.bluefruit.le.connect&hl=fr',
    description:
      'The Bluefruit LE Connect app provides iOS & Android devices with a variety of tools to communicate with Bluefruit LE devices. These tools cover basic communication and info reporting as well as more project specific uses such as Arduino Pin Control and a Color Picker.',
    description_success:
      'Test Bluetooth Low Energy communication between your React Native app and hardware devices.',
    features: ['Bluetooth'],
    id: 'recxVC2Qar9y4cu4J',
    ios_url: 'https://apps.apple.com/ci/app/bluefruit-connect/id830125974',
    name: 'Bluefruit Connect',
    platform: ['iOS', 'Android'],
    slug: 'bluefruit-connect',
    website_url: 'https://learn.adafruit.com/bluefruit-le-connect/ios-setup',
  },
  {
    description:
      'The Apple Developer app gives you access to WWDC sessions, developer documentation, and news. Stay up to date with the latest Apple technologies and platform announcements.',
    description_success:
      'Watch WWDC sessions and read developer news to stay current with iOS platform changes.',
    features: ['Documentation'],
    id: 'devtools-apple-developer',
    ios_url: 'https://apps.apple.com/app/id640199958',
    name: 'Apple Developer',
    platform: ['iOS'],
    slug: 'apple-developer',
    website_url: 'https://developer.apple.com/',
  },
  {
    description:
      'Expo Go lets you open React Native apps running in development mode directly on your device without building a native binary.',
    description_success:
      'Instantly preview your Expo app on a real device by scanning a QR code.',
    features: ['Debugging', 'Preview', 'Distribution'],
    id: 'devtools-expo-go',
    ios_url: 'https://apps.apple.com/app/id982107779',
    name: 'Expo Go',
    platform: ['iOS', 'Android'],
    slug: 'expo-go',
    website_url: 'https://expo.dev/go',
  },
  {
    description:
      'The official companion app for React Native Paper \u2014 a cross-platform Material Design component library. Browse and interact with all available components.',
    description_success:
      'Preview Material Design components and copy code snippets to use in your React Native app.',
    features: ['Design', 'UI components'],
    id: 'devtools-react-native-paper',
    ios_url: 'https://apps.apple.com/app/id1548934513',
    name: 'React Native Paper',
    platform: ['iOS'],
    slug: 'react-native-paper',
    website_url: 'https://reactnativepaper.com/',
  },
  {
    description:
      'LightBlue\u00ae is a Bluetooth Low Energy discovery and inspection app. Scan for BLE devices, explore services and characteristics, and read or write data.',
    description_success:
      'Debug Bluetooth peripherals and verify BLE communication for your React Native app.',
    features: ['Bluetooth'],
    id: 'devtools-lightblue',
    ios_url: 'https://apps.apple.com/app/id557428110',
    name: 'LightBlue\u00ae',
    platform: ['iOS'],
    slug: 'lightblue',
    website_url: 'https://punchthrough.com/lightblue/',
  },
  {
    description:
      'AnimateReactNative is an interactive showcase of animations built with React Native Reanimated. Browse, preview, and explore animation recipes.',
    description_success:
      'Get inspired and copy animation patterns directly into your React Native project.',
    features: ['Animations'],
    id: 'devtools-animate-react-native',
    ios_url: 'https://apps.apple.com/app/id6738016513',
    name: 'AnimateReactNative',
    platform: ['iOS'],
    slug: 'animate-react-native',
  },
  {
    description:
      'Make It Animated is a collection of ready-to-use animations for React Native. Browse examples and copy the source code into your project.',
    description_success:
      'Find the perfect animation for your app and paste the Reanimated code straight into your project.',
    features: ['Animations'],
    id: 'devtools-make-it-animated',
    ios_url: 'https://apps.apple.com/app/id6742489722',
    name: 'Make It Animated',
    platform: ['iOS'],
    slug: 'make-it-animated',
  },
  {
    description:
      'React Native Reusables is the companion app for the react-native-reusables component library \u2014 a port of shadcn/ui for React Native with accessible, composable primitives.',
    description_success:
      'Preview and explore accessible, composable components before adding them to your app.',
    features: ['Design', 'UI components'],
    id: 'devtools-react-native-reusables',
    ios_url: 'https://apps.apple.com/app/id6748838250',
    name: 'React Native Reusables',
    platform: ['iOS'],
    slug: 'react-native-reusables',
  },
  {
    description:
      'v0 is Vercel\u2019s AI-powered UI generation tool. Describe a component and get production-ready React code in seconds.',
    description_success:
      'Generate UI components with a text prompt and copy the code directly into your project.',
    features: ['Design', 'AI', 'UI components'],
    id: 'devtools-v0',
    ios_url: 'https://apps.apple.com/app/id6745097949',
    name: 'v0',
    platform: ['iOS'],
    slug: 'v0',
    website_url: 'https://v0.dev/',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor',
    description:
      'Accessibility Scanner scans your Android app\u2019s UI and suggests improvements to make it more accessible \u2014 checking content labels, touch target sizes, and color contrast ratios.',
    description_success:
      'Audit your Android app for accessibility issues before shipping to catch missing labels and contrast failures.',
    features: ['Design', 'Testing'],
    id: 'devtools-accessibility-scanner',
    name: 'Accessibility Scanner',
    platform: ['Android'],
    slug: 'accessibility-scanner',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.wered.sensorsmultitool',
    description:
      'Sensors Multitool gives you real-time access to all hardware sensors on your Android device \u2014 accelerometer, gyroscope, compass, barometer, proximity, and more \u2014 with live data visualization.',
    description_success:
      'Verify real device sensor data while building React Native features that use accelerometer, gyroscope, or compass.',
    features: ['Sensors', 'Debugging', 'Hardware'],
    id: 'devtools-sensors-multitool',
    name: 'Sensors Multitool',
    platform: ['Android'],
    slug: 'sensors-multitool',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.testerscommunity',
    description:
      '12 Testers is a community platform for mobile app beta testing. Connect with testers, distribute builds, and collect feedback before your app goes live.',
    description_success:
      'Get real feedback from a community of testers before shipping your app to production.',
    features: ['Beta testing', 'Distribution', 'Testing'],
    id: 'devtools-12-testers',
    name: '12 Testers - Testers Community',
    platform: ['Android'],
    slug: '12-testers',
  },
  {
    android_url:
      'https://play.google.com/store/apps/details?id=com.swmansion.pulsar.app',
    description:
      'Pulsar is a haptics design tool by Software Mansion that lets you create, preview, and fine-tune haptic feedback patterns on your device. Design custom haptic presets and export them for use in your apps.',
    description_success:
      'Design and test haptic patterns directly on your device before integrating them into your React Native app.',
    features: ['Haptics', 'Design'],
    id: 'devtools-pulsar',
    ios_url:
      'https://apps.apple.com/es/app/haptics-presets-pulsar/id6761362104?l=en-GB&platform=vision',
    name: 'Pulsar',
    platform: ['iOS', 'Android'],
    slug: 'pulsar',
    website_url: 'https://pulsar.swmansion.com/',
  },
  {
    description:
      "The GitHub mobile app lets you manage issues, review pull requests, merge code, and follow your team's activity from anywhere.",
    description_success:
      'Review and merge pull requests, triage issues, and stay on top of notifications while away from your desk.',
    features: ['CI / CD'],
    id: 'devtools-github',
    ios_url: 'https://apps.apple.com/fr/app/github/id1477376905',
    name: 'GitHub',
    platform: ['iOS', 'Android'],
    slug: 'github',
    website_url: 'https://github.com/',
  },
];
