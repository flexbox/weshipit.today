export interface DevTool {
  id: string;
  name: string;
  slug: string;
  description?: string;
  description_success?: string;
  website_url?: string;
  platform?: string[];
  pricing?: string[];
  features?: string[];
  ios_url?: string;
  android_url?: string;
}

export interface DevToolsFixture {
  records: DevTool[];
}

export const devtoolsFixture: DevToolsFixture = {
  records: [
    {
      id: 'rec9bu4YFX8mh8Bui',
      name: 'App Store Connect',
      slug: 'app-store-connect',
      description:
        'App Store Connect is Apple\u2019s portal for managing your iOS, macOS, tvOS, and watchOS apps. Monitor sales, manage your team, respond to reviews, and submit apps for review.',
      description_success:
        'Monitor your app\u2019s performance, manage releases, and respond to user reviews directly from your iPhone.',
      features: ['Store', 'Analytics', 'Reviews', 'Distribution'],
      ios_url: 'https://apps.apple.com/app/id1234793120',
      platform: ['iOS', 'macOS'],
      website_url: 'https://appstoreconnect.apple.com/login',
    },
    {
      id: 'recMDtgjXclE4We62',
      name: 'nRF Connect',
      slug: 'nrf-connect',
      description:
        'nRF Connect for Mobile is a robust tool that enables you to scan, explore, and communicate with your Bluetooth Low Energy devices. It supports various Bluetooth SIG adopted profiles, as well as the Device Firmware Update profile (DFU) from Nordic Semiconductor and Eddystone from Google.',
      description_success: 'Debug Bluetooth issues on Android and iOS.',
      features: ['Bluetooth'],
      android_url:
        'https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp',
      ios_url:
        'https://apps.apple.com/pl/app/nrf-connect-for-mobile/id1054362403',
      platform: ['iOS', 'Android'],
      website_url:
        'https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-mobile',
    },
    {
      id: 'recPmAB07ROC8odrt',
      name: 'Testflight',
      slug: 'testflight',
      description:
        'The TestFlight app allows you to install and beta test apps on your iOS devices. The app is available for free on the App Store.',
      description_success:
        'Receive a push notification when the status of your app is updated.',
      features: ['Distribution', 'Beta testing'],
      ios_url: 'https://apps.apple.com/app/id899247664',
      platform: ['macOS', 'iOS'],
      website_url: 'https://testflight.apple.com/',
    },
    {
      id: 'recWjVg8R7DXZ6Gx5',
      name: 'Exodus Privacy',
      slug: 'exodus-privacy',
      description:
        '\u03b5xodus analyzes Android applications in order to list the embedded trackers.',
      description_success:
        'Audit any Android app to see which third-party trackers are embedded before shipping your own.',
      features: ['Privacy', 'Analytics'],
      android_url:
        'https://play.google.com/store/apps/details?id=org.eu.exodus_privacy.exodusprivacy&hl=fr&gl=US',
      platform: ['Android'],
      website_url: 'https://reports.exodus-privacy.eu.org/en/',
    },
    {
      id: 'rechpJsggMYdxgEcn',
      name: 'Google Play Console',
      slug: 'google-play-console',
      description:
        'The Google Play Console app lets you manage your Android apps on the go \u2014 track installs and ratings, reply to reviews, and monitor release rollouts.',
      description_success:
        'Monitor your Android app releases, reply to reviews, and track installs on the go.',
      features: ['Store', 'Analytics', 'Reviews', 'Distribution'],
      android_url:
        'https://play.google.com/store/apps/details?id=com.google.android.apps.playconsole&pli=1',
      ios_url: 'https://apps.apple.com/app/id1606772645',
      platform: ['iOS', 'Android'],
    },
    {
      id: 'reci4WamlBzT55w2B',
      name: 'LibChecker',
      slug: 'libchecker',
      description:
        'Discover what languages and libraries were used to build any given app.',
      description_success:
        'Inspect any Android app to understand its tech stack and detect React Native usage.',
      features: ['Debugging', 'Inspection'],
      android_url:
        'https://play.google.com/store/apps/details?id=com.absinthe.libchecker',
      platform: ['Android'],
    },
    {
      id: 'recxVC2Qar9y4cu4J',
      name: 'Bluefruit Connect',
      slug: 'bluefruit-connect',
      description:
        'The Bluefruit LE Connect app provides iOS & Android devices with a variety of tools to communicate with Bluefruit LE devices. These tools cover basic communication and info reporting as well as more project specific uses such as Arduino Pin Control and a Color Picker.',
      description_success:
        'Test Bluetooth Low Energy communication between your React Native app and hardware devices.',
      features: ['Bluetooth'],
      android_url:
        'https://play.google.com/store/apps/details?id=com.adafruit.bluefruit.le.connect&hl=fr',
      ios_url: 'https://apps.apple.com/ci/app/bluefruit-connect/id830125974',
      platform: ['iOS', 'Android'],
      website_url: 'https://learn.adafruit.com/bluefruit-le-connect/ios-setup',
    },
    {
      id: 'devtools-apple-developer',
      name: 'Apple Developer',
      slug: 'apple-developer',
      description:
        'The Apple Developer app gives you access to WWDC sessions, developer documentation, and news. Stay up to date with the latest Apple technologies and platform announcements.',
      description_success:
        'Watch WWDC sessions and read developer news to stay current with iOS platform changes.',
      features: ['Documentation'],
      ios_url: 'https://apps.apple.com/app/id640199958',
      platform: ['iOS'],
      website_url: 'https://developer.apple.com/',
    },
    {
      id: 'devtools-expo-go',
      name: 'Expo Go',
      slug: 'expo-go',
      description:
        'Expo Go lets you open React Native apps running in development mode directly on your device without building a native binary.',
      description_success:
        'Instantly preview your Expo app on a real device by scanning a QR code.',
      features: ['Debugging', 'Preview', 'Distribution'],
      ios_url: 'https://apps.apple.com/app/id982107779',
      platform: ['iOS', 'Android'],
      website_url: 'https://expo.dev/go',
    },
    {
      id: 'devtools-react-native-paper',
      name: 'React Native Paper',
      slug: 'react-native-paper',
      description:
        'The official companion app for React Native Paper \u2014 a cross-platform Material Design component library. Browse and interact with all available components.',
      description_success:
        'Preview Material Design components and copy code snippets to use in your React Native app.',
      features: ['Design', 'UI components'],
      ios_url: 'https://apps.apple.com/app/id1548934513',
      platform: ['iOS'],
      website_url: 'https://reactnativepaper.com/',
    },
    {
      id: 'devtools-lightblue',
      name: 'LightBlue\u00ae',
      slug: 'lightblue',
      description:
        'LightBlue\u00ae is a Bluetooth Low Energy discovery and inspection app. Scan for BLE devices, explore services and characteristics, and read or write data.',
      description_success:
        'Debug Bluetooth peripherals and verify BLE communication for your React Native app.',
      features: ['Bluetooth'],
      ios_url: 'https://apps.apple.com/app/id557428110',
      platform: ['iOS'],
      website_url: 'https://punchthrough.com/lightblue/',
    },
    {
      id: 'devtools-animate-react-native',
      name: 'AnimateReactNative',
      slug: 'animate-react-native',
      description:
        'AnimateReactNative is an interactive showcase of animations built with React Native Reanimated. Browse, preview, and explore animation recipes.',
      description_success:
        'Get inspired and copy animation patterns directly into your React Native project.',
      features: ['Animations', 'Reanimated'],
      ios_url: 'https://apps.apple.com/app/id6738016513',
      platform: ['iOS'],
    },
    {
      id: 'devtools-make-it-animated',
      name: 'Make It Animated',
      slug: 'make-it-animated',
      description:
        'Make It Animated is a collection of ready-to-use animations for React Native. Browse examples and copy the source code into your project.',
      description_success:
        'Find the perfect animation for your app and paste the Reanimated code straight into your project.',
      features: ['Animations', 'Reanimated'],
      ios_url: 'https://apps.apple.com/app/id6742489722',
      platform: ['iOS'],
    },
    {
      id: 'devtools-react-native-reusables',
      name: 'React Native Reusables',
      slug: 'react-native-reusables',
      description:
        'React Native Reusables is the companion app for the react-native-reusables component library \u2014 a port of shadcn/ui for React Native with accessible, composable primitives.',
      description_success:
        'Preview and explore accessible, composable components before adding them to your app.',
      features: ['Design', 'UI components'],
      ios_url: 'https://apps.apple.com/app/id6748838250',
      platform: ['iOS'],
    },
    {
      id: 'devtools-v0',
      name: 'v0',
      slug: 'v0',
      description:
        'v0 is Vercel\u2019s AI-powered UI generation tool. Describe a component and get production-ready React code in seconds.',
      description_success:
        'Generate UI components with a text prompt and copy the code directly into your project.',
      features: ['Design', 'AI', 'UI components'],
      ios_url: 'https://apps.apple.com/app/id6745097949',
      platform: ['iOS'],
      website_url: 'https://v0.dev/',
    },
    {
      id: 'devtools-github',
      name: 'GitHub',
      slug: 'github',
      description:
        "The GitHub mobile app lets you manage issues, review pull requests, merge code, and follow your team's activity from anywhere.",
      description_success:
        'Review and merge pull requests, triage issues, and stay on top of notifications while away from your desk.',
      features: ['CI / CD', 'Collaboration'],
      ios_url: 'https://apps.apple.com/fr/app/github/id1477376905',
      platform: ['iOS', 'Android'],
      website_url: 'https://github.com/',
    },
  ],
};
