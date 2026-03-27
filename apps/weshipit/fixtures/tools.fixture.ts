export interface Tool {
  id: string;
  name: string;
  slug: string;
  description?: string;
  description_success?: string;
  website_url: string;
  github_url?: string;
  twitter_url?: string;
  platform?: string[];
  pricing?: string[];
  features?: string[];
  ios_url?: string;
  type: string[];
  android_url?: string;
}

export const tools: Tool[] = [
  {
    description:
      'Segment is a **customer data platform (CDP)** that collects, unifies, and routes user events from your React Native app to hundreds of analytics, marketing, and data warehouse destinations.\n\nInstead of integrating each analytics tool separately, Segment gives you a **single SDK** that sends data everywhere at once — saving weeks of development time and giving your team a single source of truth for user behavior.\n',
    description_success:
      '1. **Install once, send everywhere.** Add the Segment React Native SDK and connect all your analytics destinations (Mixpanel, Amplitude, BigQuery, etc.) from the Segment dashboard — no code changes needed when you add new tools.\n2. **Unify user identity across platforms.** Segment automatically stitches anonymous sessions to identified users, so you see the full journey from first open to conversion on both iOS and Android.\n3. **Ship faster with confidence.** With a single tracking plan and schema validation, your team stops debating which events exist and starts making data-driven product decisions that grow your app.\n',
    github_url: 'https://github.com/segmentio/analytics-react-native',
    name: 'Segment',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Free trial', 'Premium tiers'],
    slug: 'segment',
    twitter_url: 'https://twitter.com/segment',
    type: ['Analytics'],
    website_url: 'https://segment.com',
    id: 'rec26VdpJBnJo2tzo',
  },
  {
    description:
      'Purchasely is a **no-code paywall and subscription management platform** for React Native apps. It lets you design, A/B test, and deploy paywalls without touching your codebase, and handles all the complexity of StoreKit and Google Play Billing under the hood.\n\nWith real-time paywall previews, smart pricing experiments, and deep integrations with analytics tools like Mixpanel and Amplitude, Purchasely helps mobile teams **maximize subscription revenue** without burning engineering cycles.\n',
    description_success:
      '1. **Launch paywalls without engineering bottlenecks.** Use the no-code builder to design and publish new paywall variants from the dashboard — no app release required, so your monetization team moves at its own pace.\n2. **Run pricing experiments with confidence.** Built-in A/B testing lets you compare price points, offer structures, and paywall designs to find the combination that converts best on iOS and Android.\n3. **Reduce revenue leakage automatically.** Purchasely handles receipt validation, renewal tracking, and failed-payment recovery server-side, so you never lose subscribers to expired receipts or billing errors.\n',
    features: ['A / B testing'],
    github_url: 'https://github.com/Purchasely/Purchasely-ReactNative',
    name: 'Purchasely',
    platform: ['iOS', 'Android'],
    pricing: ['Premium tiers'],
    slug: 'purchasely',
    twitter_url: 'https://twitter.com/purchaselycom',
    type: ['Payments & Subscriptions'],
    website_url: 'https://www.purchasely.com/',
    id: 'rec37Adlm4H93DXRu',
  },
  {
    description:
      'Sherlo is a **cloud-based visual testing and review platform** built specifically for React Native Storybook. It automatically detects UI regressions in your component library on every pull request, so visual bugs never reach production.\n\nBy connecting directly to your CI pipeline and Storybook setup, Sherlo captures screenshots of every component on real devices and highlights pixel-level differences — giving your team a visual diff review flow before any code is merged.\n',
    description_success:
      '1. **Catch visual regressions before they ship.** Sherlo runs your full Storybook on every PR and sends a Slack notification with a visual diff the moment a component changes — so your team reviews UI changes alongside code changes.\n2. **Eliminate manual screenshot comparison.** Instead of manually checking every screen after a design system update, Sherlo automates the comparison across iOS and Android, saving hours of QA work per release.\n3. **Ship UI updates with confidence.** With a documented visual history of every component, your team can approve, reject, or discuss UI changes asynchronously — keeping design and engineering aligned without endless meetings.\n',
    features: ['CLI'],
    github_url: 'https://github.com/sherlo-io/sherlo',
    name: 'Sherlo',
    platform: ['Android', 'iOS'],
    pricing: ['Premium tiers'],
    slug: 'sherlo',
    twitter_url: 'https://x.com/sherlo_io',
    type: ['Error Monitoring'],
    website_url: 'https://sherlo.io/',
    id: 'rec7PqCtUjuHCsV8m',
  },
  {
    description:
      'Realm is a **mobile-first database** designed as a drop-in replacement for SQLite and AsyncStorage in React Native apps. It stores objects natively — no SQL, no ORM, no serialization overhead — making reads and writes dramatically faster than traditional key-value stores.\n\nRealm supports **live objects**, meaning your UI automatically reflects database changes without manual re-fetching, and its Atlas Device Sync integration lets you sync data with MongoDB Atlas in real time with conflict resolution built in.\n',
    description_success:
      "1. **Replace AsyncStorage with a real database in hours.** Realm's React Native SDK gives you typed, queryable collections that persist across app restarts — upgrade from ad-hoc JSON storage to a proper data layer without rewriting your app architecture.\n2. **Build offline-first apps without extra infrastructure.** Realm works entirely on-device with no network required, then syncs automatically to MongoDB Atlas when connectivity returns — giving your users a seamless experience regardless of connection quality.\n3. **Keep your UI in sync with zero boilerplate.** Live objects and reactive queries mean your components re-render automatically when data changes, eliminating the polling loops and manual cache invalidation that slow down React Native development.\n",
    github_url: 'https://www.npmjs.com/package/@realm/expo-template-ts',
    name: 'realm',
    platform: ['Android', 'iOS'],
    pricing: ['Open source'],
    slug: 'realm',
    type: ['Database & Storage'],
    website_url: 'https://realm.io',
    id: 'rec7TqGAXJ4UrYa4g',
  },
  {
    description:
      'Mixpanel is a **product analytics platform** that tracks user actions — not just page views — giving React Native teams deep insight into how people use their app. With funnels, retention curves, and cohort analysis, you can answer "why are users churning?" instead of just "how many users do we have?"\n\nMixpanel\'s React Native SDK tracks events on iOS and Android with a single integration, and its powerful query builder lets non-technical teammates explore data without writing SQL.\n',
    description_success:
      "1. **Understand your funnel in one afternoon.** Install the Mixpanel SDK, track your core user flows (signup → activation → purchase), and immediately see where users drop off — so your team prioritizes fixes with the highest retention impact.\n2. **Segment users by behavior, not just demographics.** Build cohorts based on what users did (or didn't do) in your app, then target those segments with push notifications or experiments to bring them back.\n3. **Move from gut decisions to data decisions.** With retention charts and feature adoption metrics available to everyone on your team, product discussions shift from opinions to evidence — speeding up roadmap decisions and reducing wasted sprints.\n",
    features: ['Push notifications', 'A / B testing'],
    github_url: 'https://github.com/mixpanel/mixpanel-react-native',
    name: 'Mixpanel',
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'mixpanel',
    twitter_url: 'https://twitter.com/mixpanel',
    type: ['Analytics'],
    website_url: 'https://mixpanel.com',
    id: 'rec7bddzgKz9FTQG4',
  },
  {
    description:
      'Braintree is a **full-stack payment processing platform** owned by PayPal that lets React Native apps accept credit cards, debit cards, PayPal, Apple Pay, Google Pay, and Venmo through a single SDK.\n\nWith its Drop-in UI and Client SDK, you can add a complete, PCI-compliant checkout flow to your app in hours — and Braintree handles tokenization, fraud detection, and recurring billing on the server side so you never touch raw card data.\n',
    description_success:
      "1. **Accept every payment method your users expect.** One Braintree integration covers cards, PayPal, Apple Pay, and Google Pay on both iOS and Android — so you stop losing sales to missing payment options at checkout.\n2. **Ship a PCI-compliant checkout in hours, not weeks.** The Drop-in UI component handles card tokenization and validation client-side, meaning your backend never sees raw card numbers and your compliance burden stays minimal.\n3. **Scale revenue without scaling infrastructure.** Braintree's server-side webhooks and subscription APIs handle recurring billing, failed payment retries, and refunds automatically — so your small team can support complex monetization without building payment infrastructure from scratch.\n",
    features: ['Analytics', 'Integrations'],
    github_url: 'https://github.com/ekreative/react-native-braintree',
    name: 'Braintree',
    platform: ['Android', 'iOS'],
    pricing: ['Pay as-you-go'],
    slug: 'braintree',
    type: ['Payments & Subscriptions'],
    website_url: 'https://www.braintreepayments.com/',
    id: 'rec8VkLjRUcNej4eS',
  },
  {
    description:
      'Shake is a **bug and crash reporting SDK** for React Native apps that automatically captures over 50 data points — device info, network logs, console output, and a screen recording — every time a user submits a report.\n\nTrusted by 500+ development teams and active on 26 million devices, Shake transforms vague "it broke" feedback into fully reproducible bug reports your engineers can fix in minutes instead of hours.\n',
    description_success:
      '1. **Turn user frustration into actionable bug reports.** Users shake their device or tap the floating button to report an issue — Shake automatically attaches the screen recording, logs, and device state so you can reproduce the bug without a back-and-forth email thread.\n2. **Reduce debugging time by 80%.** With 50+ data points captured automatically per report (network requests, console logs, app state), your team diagnoses root causes in the Shake dashboard instead of asking users to "describe what you were doing."\n3. **Ship higher-quality releases faster.** Automated workflows route reports to the right engineer, track resolution status, and integrate with Jira, Slack, and Linear — so bugs get fixed before they accumulate and slow down your next release.\n',
    features: [
      'Crash reporting',
      'Integrations',
      'Events tracking',
      'Session tracking',
    ],
    github_url: 'https://github.com/shakebugs/shake-react-native',
    name: 'Shakebugs',
    platform: ['Android', 'iOS', 'Web', 'macOS'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'shakebugs',
    type: ['Error Monitoring'],
    website_url: 'https://www.shakebugs.com/',
    id: 'recDGW4TfLy0lneF4',
  },
  {
    description:
      'bitdrift is a **mobile observability platform** that gives React Native teams a real-time, queryable view of everything happening in their app — from JavaScript errors and native crashes to network latency and UI performance — without the data overload of traditional logging tools.\n\nUnlike tools that dump every log to the cloud, bitdrift lets you control exactly what telemetry you emit, reducing storage costs while giving you higher-fidelity insights when something actually goes wrong.\n',
    description_success:
      "1. **Find production issues in seconds, not hours.** bitdrift's real-time streaming lets you query live device sessions as problems happen — no waiting for aggregated dashboards to update or digging through megabytes of irrelevant logs.\n2. **Cut observability costs without cutting visibility.** Granular control over what data you emit means you stop paying for logs you never read, while keeping full context around errors and slowdowns that actually matter to your users.\n3. **Debug crashes with complete context.** bitdrift captures the full session state — network calls, user actions, JS bridge activity — leading up to a crash, so your team fixes root causes on the first investigation instead of the fifth.\n",
    features: [
      'Session recording',
      'Session tracking',
      'Real-time streaming',
      'Performance',
    ],
    github_url: 'https://github.com/bitdriftlabs',
    name: 'bitdrift',
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'bitdrift',
    twitter_url: 'https://x.com/bitdriftio',
    type: ['Error Monitoring'],
    website_url: 'https://bitdrift.io/',
    id: 'recHBl50Lwp5xeRT5',
  },
  {
    description:
      "LaunchDarkly is a **feature management platform** that lets React Native teams release features to specific users, run A/B experiments, and kill switches at runtime — without redeploying the app.\n\nBy decoupling feature releases from app store deployments, LaunchDarkly enables **progressive delivery**: ship code to 100% of users but only turn on the feature for 1% until you're confident it works — then roll out to everyone with one click.\n",
    description_success:
      '1. **Reduce the risk of every release.** Wrap new features in a flag and release to a small percentage of users first. If something breaks, disable the flag instantly — no hotfix, no app store review, no rollback required.\n2. **Improve the user experience with targeted rollouts.** Target specific users, devices, or app versions with new features before the general release, gathering real feedback from your most engaged users without exposing everyone to unfinished work.\n3. **Increase release velocity without increasing risk.** With feature flags separating deploy from release, your team ships code continuously and coordinates launches around business events — not the next available engineer weekend.\n',
    features: ['Feature flags', 'Session tracking'],
    github_url: 'https://github.com/launchdarkly/react-native-client-sdk',
    name: 'LaunchDarkly',
    platform: ['Android', 'iOS', 'macOS', 'tvOS', 'Web', 'Windows', 'Unity'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'launchdarkly',
    twitter_url: 'https://twitter.com/launchdarkly',
    type: ['Backend & APIs'],
    website_url: 'https://launchdarkly.com/',
    id: 'recI6x4s0zmjf0rOb',
  },
  {
    description:
      'ZEGOCLOUD is a **real-time communication infrastructure** platform that provides React Native SDKs for voice calls, video calls, live streaming, and in-app chat — with 99.99% uptime and sub-300ms global latency.\n\nWith pre-built UIKits for common use cases (1-on-1 calls, group video, live rooms), ZEGOCLOUD reduces what would be months of WebRTC complexity to a few hours of integration work, letting your team focus on product instead of infrastructure.\n',
    description_success:
      "1. **Launch video calling in your app in a single day.** ZEGOCLOUD's UIKit for React Native includes a complete call UI out of the box — drop it in, configure your App ID, and have working video calls on iOS and Android without building any signaling or media infrastructure.\n2. **Handle scale you'd never build yourself.** ZEGOCLOUD's global network manages tens of millions of concurrent connections with automatic quality adaptation under poor network conditions (up to 70% packet loss) — so your users get smooth calls even on 3G.\n3. **Expand features without rebuilding.** Start with basic voice calls, then add live streaming, chat, or co-hosting by enabling additional SDKs from the same platform — no vendor switching, no re-integration when your product roadmap evolves.\n",
    features: ['Real-time database', 'Video', 'Analytics', 'Cloud storage'],
    github_url:
      'https://github.com/ZEGOCLOUD/zego_uikit_prebuilt_call_example_rn',
    name: 'zegocloud',
    platform: ['Android', 'iOS'],
    pricing: ['Free trial', 'Pay as-you-go'],
    slug: 'zegocloud',
    twitter_url: 'https://twitter.com/ZEGOCLOUD_Dev',
    type: ['CI/CD & Release'],
    website_url: 'https://www.zegocloud.com/',
    id: 'recIAkp0BimbjQWjY',
  },
  {
    description:
      'UXCam is the **market leader in mobile app experience analytics**, giving React Native teams session recordings, heatmaps, funnel analysis, and crash replays — all tied together so you can see exactly what users did before they encountered a problem.\n\nUnlike traditional analytics that show you numbers, UXCam shows you **videos of real user sessions**, making it easy to spot confusing UI patterns, uncover hidden friction, and prioritize UX improvements with evidence rather than assumptions.\n',
    description_success:
      '1. **Watch what users actually do, not what you think they do.** Session recordings on real iOS and Android devices reveal tap errors, confusing navigation, and friction points that no metric dashboard can show — giving your team empathy-driven insights in minutes.\n2. **Diagnose crashes with full video context.** When a crash occurs, UXCam attaches the session recording leading up to it, so your engineers reproduce the exact steps that caused the issue instead of guessing from a stack trace alone.\n3. **Prioritize UX fixes with quantitative heatmaps.** Aggregate tap and scroll heatmaps across thousands of sessions show you which UI elements users interact with most — so you redesign with data, not debate.\n',
    features: ['Analytics'],
    github_url: 'https://github.com/uxcam/react-native-ux-cam',
    name: 'UXCam',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'uxcam',
    twitter_url: 'https://twitter.com/uxcam',
    type: ['Analytics'],
    website_url: 'https://uxcam.com',
    id: 'recJHvvUTV48AKDMm',
  },
  {
    description:
      "WatermelonDB is a **high-performance reactive database** for React and React Native apps built on SQLite. It's designed to handle tens of thousands of records while keeping your UI buttery smooth — by lazy-loading data and only observing the records your components actually need.\n\nUnlike plain AsyncStorage or context-based state, WatermelonDB gives you **full relational queries, lazy loading, and observable collections** that automatically trigger re-renders when data changes — making it the go-to choice for complex, data-heavy React Native apps.\n",
    description_success:
      "1. **Handle large datasets without UI jank.** WatermelonDB's lazy evaluation means it never loads more records than your screen needs — so list views stay fast and scrollable even with 100,000 items in the database.\n2. **Build reactive UIs with zero manual wiring.** Wrap your components with `withObservables` and they automatically re-render when the underlying data changes — eliminating the prop-drilling and cache invalidation patterns that make data-heavy apps hard to maintain.\n3. **Ship offline-first features your users love.** With SQLite under the hood and sync adapters for popular backends, WatermelonDB makes it straightforward to build apps that work perfectly offline and sync reliably when connectivity returns.\n",
    features: ['Offline'],
    github_url: 'https://github.com/Nozbe/WatermelonDB',
    name: 'Watermelon DB',
    pricing: ['Open source'],
    slug: 'watermelon-db',
    twitter_url: 'https://twitter.com/Nozbe',
    type: ['Database & Storage'],
    website_url: 'https://watermelondb.dev/',
    id: 'recL86qfmzGmriOzs',
  },
  {
    description:
      'RxDB is a **reactive NoSQL database** for JavaScript applications including React Native, built on top of PouchDB with RxJS-powered observable queries. It gives you real-time data synchronization, multi-tab support, and a flexible storage layer — all in a single npm package.\n\nBy combining offline-first storage with CouchDB-compatible replication, RxDB is particularly powerful for apps that need to **sync data across devices and backends** while staying fully functional without internet connectivity.\n',
    description_success:
      '1. **Go offline-first in your React Native app without rebuilding your data layer.** RxDB stores data locally on-device and syncs automatically with CouchDB, PouchDB, or custom backends when the connection returns — giving users a seamless experience with no extra infrastructure to manage.\n2. **Drive your UI with reactive data streams.** RxDB queries return RxJS Observables — subscribe to a collection in your component and the UI updates automatically whenever data changes, locally or from a sync — eliminating manual refetch logic.\n3. **Choose your storage engine without changing your code.** RxDB supports IndexedDB, SQLite, Memory, and more through a swappable adapter system — so you can optimize for performance on each platform without rewriting your data access layer.\n',
    features: ['Real-time database', 'Offline'],
    github_url: 'https://github.com/pubkey/rxdb',
    name: 'RxDB',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Open source'],
    slug: 'rxdb',
    type: ['Database & Storage'],
    website_url: 'https://rxdb.info/',
    id: 'recLpTxHJIXJtTIvW',
  },
  {
    description:
      'Expo is the **leading open-source platform for building universal React Native apps** that run on Android, iOS, and the web from a single JavaScript codebase. It provides a managed workflow with pre-built native modules, a cloud build service (EAS Build), and over-the-air updates — so you can ship your app without owning a Mac or knowing Xcode.\n\nWith Expo SDK, you get access to camera, notifications, location, biometrics, and 50+ other native APIs through a consistent, well-documented JavaScript interface — dramatically reducing the native development knowledge your team needs.\n',
    description_success:
      "1. **Start building in minutes, not days.** `npx create-expo-app` scaffolds a fully configured React Native project with TypeScript, navigation, and native modules ready to go — no Xcode or Android Studio configuration required to see your app on a real device.\n2. **Ship updates instantly without the App Store review cycle.** Expo's Over-the-Air (OTA) update system lets you push JavaScript and asset changes directly to your users' installed apps — critical bug fixes reach production in minutes, not days.\n3. **Build for iOS from any operating system.** EAS Build runs your iOS and Android builds in the cloud, so your Linux or Windows developers can produce App Store-ready builds without owning Apple hardware — removing the biggest infrastructure bottleneck in React Native teams.\n",
    features: ['Hosting', 'Push notifications', 'CLI', 'Over the Air Updates'],
    github_url: 'https://github.com/expo/expo',
    name: 'Expo',
    platform: ['Android', 'iOS', 'macOS', 'tvOS', 'Web', 'Windows'],
    pricing: ['Open source', 'Free tier', 'Pay as-you-go', 'Premium tiers'],
    slug: 'expo',
    twitter_url: 'https://twitter.com/expo',
    type: ['CI/CD & Release'],
    website_url: 'https://expo.dev',
    id: 'recLvcsE6QmzdBZoZ',
  },
  {
    description:
      'Waldo is a **no-code mobile testing platform** that lets React Native teams record, automate, and run end-to-end tests on real iOS and Android devices — without writing a single line of test code.\n\nBy integrating directly into your CI/CD pipeline, Waldo runs smoke tests on every pull request and delivers video reports with network logs and app traces — so engineers catch broken user flows before merging, not after a user files a bug report.\n',
    description_success:
      "1. **Protect your critical user flows on every PR.** Set up smoke tests for Login, Signup, Checkout, and other core screens once — Waldo runs them automatically on every branch so broken flows never make it to main.\n2. **Give QA superpowers without engineering involvement.** Non-technical team members record test sessions on selected devices using Waldo's UI — QA and product managers create and maintain tests independently, freeing your engineers for feature work.\n3. **Debug failures in seconds with full video evidence.** Every failed test comes with a video replay, captured network requests, and app logs — your team reproduces the exact failure conditions immediately instead of spending hours trying to replicate a flaky environment.\n",
    features: ['Video'],
    github_url: 'https://github.com/waldoapp/fastlane-plugin-waldo',
    name: 'Waldo',
    platform: ['Android', 'iOS'],
    pricing: ['Free trial', 'Premium tiers'],
    slug: 'waldo',
    twitter_url: 'https://twitter.com/UseWaldo',
    type: ['Backend & APIs'],
    website_url: 'https://www.waldo.com/',
    id: 'recMXWD3QR2asK5uQ',
  },
  {
    description:
      'PostHog is an **open-source product analytics platform** that combines event tracking, session recording, feature flags, A/B testing, and heatmaps in a single self-hostable tool — giving React Native teams complete visibility into user behavior without sending data to third-party servers.\n\nThe PostHog React Native SDK tracks custom events, user properties, and screen views on iOS and Android, and the open-source nature means you can self-host for full data ownership or use PostHog Cloud for a managed experience.\n',
    description_success:
      '1. **Replace five analytics tools with one.** PostHog covers events, session replay, feature flags, and A/B tests under a single SDK and dashboard — eliminating the integration overhead of stitching together Mixpanel, LaunchDarkly, and Hotjar just to understand your users.\n2. **Own your data, no vendor lock-in.** Self-host PostHog on your own infrastructure to keep all user data within your control — critical for apps handling sensitive data, healthcare workloads, or customers with strict compliance requirements.\n3. **Iterate faster with integrated feature flags.** Define a feature flag in PostHog, roll it out to 10% of users, track the analytics impact in the same tool, and graduate the rollout — the entire experiment lifecycle lives in one place, so nothing falls through the cracks between tools.\n',
    features: ['A / B testing', 'Analytics', 'Feature flags'],
    github_url: 'https://github.com/PostHog/posthog-react-native',
    name: 'Posthog',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Open source', 'Free tier', 'Premium tiers', 'Pay as-you-go'],
    slug: 'posthog',
    twitter_url: 'https://twitter.com/posthog',
    type: ['Analytics'],
    website_url: 'https://posthog.com',
    id: 'recMXZGNue9gXJ2oD',
  },
  {
    description:
      'AWS Amplify is a **full-stack development platform** that lets React Native developers build, deploy, and scale mobile backends on AWS without becoming a cloud infrastructure expert.\n\nFrom the terminal, you can provision authentication, REST and GraphQL APIs, real-time databases, file storage, push notifications, and CI/CD pipelines — all configured through Amplify CLI and managed as infrastructure-as-code.\n',
    description_success:
      "1. **Provision a production-ready backend in one command.** `amplify init` followed by `amplify add auth` gives you a complete Cognito-backed authentication system — sign-up, sign-in, MFA, and social login — with zero AWS console configuration required.\n2. **Scale from prototype to production on battle-tested AWS infrastructure.** Amplify abstracts DynamoDB, S3, Lambda, and AppSync behind simple configuration, so your React Native app inherits enterprise-grade scalability without the operational overhead of managing those services directly.\n3. **Ship full-stack features independently.** Backend changes deploy through Amplify's CI/CD pipeline separately from your app — so your team updates APIs, auth rules, or storage without waiting for an app store release.\n",
    features: [
      'Auth',
      'Auth - Social Login ',
      'Auth - Multi-factor',
      'Push notifications',
      'GraphQL',
      'Hosting',
      'CLI',
      'Cloud storage',
      'Geolocation',
      'AR / VR',
      'AI / ML Predictions',
      'PubSub',
      'Analytics',
      'Real-time database',
      'Cloud function',
      'Deep Linking',
    ],
    github_url: 'https://github.com/aws-amplify/amplify-js',
    name: 'Amplify',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Pay as-you-go', 'Premium tiers'],
    slug: 'amplify',
    twitter_url: 'https://twitter.com/AWSAmplify',
    type: ['CI/CD & Release', 'Backend & APIs', 'Auth & Identity'],
    website_url: 'https://docs.amplify.aws/react-native/',
    id: 'recPn4JmIKEEbbtII',
  },
  {
    description:
      'Hasura is an **open-source GraphQL engine** that connects to your PostgreSQL database and instantly generates a real-time GraphQL API — complete with fine-grained authorization, subscriptions, and action hooks — without writing resolver code.\n\nFor React Native developers, Hasura eliminates the most time-consuming part of backend development: wiring up CRUD APIs, managing role-based access control, and handling real-time data subscriptions — all while keeping your data in a Postgres database you own and control.\n',
    description_success:
      '1. **Go from database to GraphQL API in under 10 minutes.** Connect Hasura to a new or existing PostgreSQL database and get a fully functional, type-safe GraphQL API with queries, mutations, and subscriptions — without writing a single resolver function.\n2. **Implement authorization that scales with your product.** Hasura\'s row-level and column-level permission system lets you define rules like "users can only read their own data" declaratively in the console — no custom auth middleware, no security vulnerabilities from hand-rolled access control.\n3. **Stream live data to your React Native UI.** Hasura GraphQL subscriptions push database changes to connected clients in real time — build live feeds, collaborative features, and dashboards that stay in sync without polling or WebSocket infrastructure to manage.\n',
    features: ['CLI', 'Cloud storage', 'GraphQL', 'Real-time database'],
    github_url: 'https://github.com/hasura/graphql-engine',
    name: 'Hasura',
    platform: ['Android', 'iOS', 'Web'],
    slug: 'hasura',
    twitter_url: 'https://twitter.com/HasuraHQ',
    type: ['Backend & APIs', 'Database & Storage'],
    website_url: 'https://hasura.io/learn/graphql/react-native/introduction/',
    id: 'recQbHiwOM3PXmaPC',
  },
  {
    description:
      'FusionAuth is an **open-source identity and authentication platform** with over 10 million downloads, providing React Native developers with login, registration, SSO, MFA, and user management — all self-hostable on your own infrastructure.\n\nUnlike hosted auth-as-a-service providers, FusionAuth gives you complete control over your user data, no per-MAU pricing surprises, and the flexibility to customize every aspect of the authentication experience without negotiating enterprise contracts.\n',
    description_success:
      "1. **Own your user data with no vendor lock-in.** Self-host FusionAuth on any cloud or on-premise server — your user database stays under your control, no data leaves your infrastructure, and you're never subject to a third-party's policy changes or pricing increases.\n2. **Ship complete auth in days, not weeks.** FusionAuth provides pre-built login, registration, MFA, and OAuth flows out of the box, with a React Native example app in the official docs — so your team implements production-grade auth without building it from scratch.\n3. **Handle every authentication use case in one platform.** SSO, passwordless, social login, SAML, LDAP, and biometric auth are all supported — so as your user base grows and your enterprise customers arrive with their own identity requirements, FusionAuth already has you covered.\n",
    features: ['Auth'],
    github_url: 'https://github.com/FusionAuth/fusionauth-example-react-native',
    name: 'FusionAuth',
    pricing: ['Free tier', 'Premium tiers', 'Open source'],
    slug: 'fusionauth',
    twitter_url: 'https://twitter.com/FusionAuth',
    type: ['Auth & Identity'],
    website_url: 'https://fusionauth.io',
    id: 'recRFVW9jgQv4FrZz',
  },
  {
    description:
      'Clerk is a **complete authentication and user management platform** that gives React Native apps sign-up, sign-in, multi-factor authentication, and user profiles through a single SDK — with beautifully designed UI components that work out of the box.\n\nClerk handles sessions, device management, and social OAuth so your team never has to think about token refresh logic, secure storage, or identity edge cases — making it one of the fastest ways to ship production-ready auth in a React Native app.\n',
    description_success:
      "1. **Ship authentication in hours, not sprints.** Clerk's pre-built sign-in and sign-up components handle every edge case — password reset, email verification, OAuth callbacks — so your team implements complete auth without writing a single authentication screen from scratch.\n2. **Protect every route and API with one line of code.** Clerk's middleware and session tokens work across your React Native app and backend, giving you consistent user context everywhere without custom token validation logic.\n3. **Manage users without building an admin panel.** Clerk's dashboard gives your team visibility into every user account, active sessions, and authentication history — so support and ops can resolve account issues without engineering involvement.\n",
    features: ['Auth', 'Auth - Multi-factor', 'Auth - Social Login '],
    name: 'Clerk',
    slug: 'clerk',
    type: ['Auth & Identity'],
    website_url: 'https://clerk.com/',
    id: 'recRLncgjgRtXGiGa',
  },
  {
    description:
      'WunderGraph is an **end-to-end API integration framework** that lets React Native developers compose multiple APIs — REST, GraphQL, databases, and auth providers — into a single, type-safe client with one configuration file.\n\nInstead of writing custom API clients for every service your app talks to, WunderGraph auto-generates operations and TypeScript types from your API schema — so your frontend always has a type-safe, cached, and secured interface to your backend with security and caching built in.\n',
    description_success:
      "1. **Eliminate the API integration backlog.** WunderGraph auto-generates a fully typed client for all your APIs from a single config — no more hand-writing fetch wrappers, normalizing response shapes, or debugging CORS issues for each new service you integrate.\n2. **Ship secure APIs by default.** WunderGraph's BFF (Backend for Frontend) architecture means sensitive API credentials and logic stay server-side, never exposed to your React Native client — reducing your attack surface without extra security code.\n3. **Move faster with instant type safety.** Generated TypeScript types for every API operation mean your IDE autocompletes API calls, catches breaking changes at build time, and eliminates the runtime type errors that slow down mobile development.\n",
    features: [
      'Analytics',
      'Auth',
      'Auth - Multi-factor',
      'Auth - Social Login ',
      'CLI',
      'Cloud function',
      'GraphQL',
      'Image & file upload',
      'Offline',
      'Real-time database',
    ],
    github_url: 'https://github.com/wundergraph/wundergraph',
    name: 'WunderGraph',
    platform: ['Android', 'iOS', 'macOS', 'Web', 'Windows'],
    pricing: [
      'Open source',
      'Premium tiers',
      'Free tier',
      'Free trial',
      'Pay as-you-go',
    ],
    slug: 'wundergraph',
    twitter_url: 'https://twitter.com/wundergraphcom',
    type: ['Backend & APIs'],
    website_url: 'https://wundergraph.com/',
    id: 'recRh2QjhDDju1i4G',
  },
  {
    description:
      "Sentry is the **industry-standard error tracking and performance monitoring platform** for React Native apps, used by over 90,000 organizations. It captures JavaScript exceptions, native crashes, and slow API calls in real time — with full stack traces, device context, and breadcrumbs showing exactly what the user did before the error occurred.\n\nSentry's React Native SDK integrates with both the JS thread and the native layer, giving you unified visibility across the entire app stack — so you're never debugging a crash with only half the picture.\n",
    description_success:
      '1. **Know about crashes before your users complain.** Sentry sends an alert the moment a new error appears in production, with a full stack trace and session replay — so your team is already investigating before the first support ticket arrives.\n2. **Fix bugs faster with complete context.** Every error report includes device info, OS version, app version, user actions, and network requests leading up to the crash — reducing the time from "bug reported" to "root cause identified" from hours to minutes.\n3. **Track release health and ship with confidence.** Sentry\'s release health dashboard shows crash-free session rates and error regressions for every deploy — so you merge PRs knowing exactly what impact each change has on your production stability.\n',
    features: ['Crash reporting'],
    github_url: 'https://github.com/getsentry/sentry-react-native',
    name: 'Sentry',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'sentry',
    twitter_url: 'https://twitter.com/getsentry',
    type: ['Error Monitoring'],
    website_url: 'https://sentry.io',
    id: 'recS01syAN8EAJTk1',
  },
  {
    description:
      'Flurry is a **free mobile analytics platform** from Yahoo that provides React Native developers with install tracking, active user metrics, event funnels, audience segmentation, push notifications, and crash reporting — all in a single SDK.\n\nFor indie developers and small teams that need a comprehensive analytics baseline without paying for premium tools, Flurry offers a surprisingly deep feature set covering the full analytics lifecycle from acquisition to retention.\n',
    description_success:
      "1. **Get complete app analytics with zero budget.** Flurry's free tier covers installs, DAU/MAU, custom events, crashes, and push notifications — giving bootstrapped React Native apps the same analytical visibility as well-funded competitors without the monthly tool bill.\n2. **Understand acquisition and retention in one dashboard.** Flurry connects install source attribution to in-app behavior, so you can see which marketing channels bring users who actually stick around — not just users who install and churn.\n3. **Re-engage churned users with targeted push campaigns.** Flurry's audience segmentation lets you define cohorts by behavior (e.g., \"users who haven't opened in 7 days\") and send targeted re-engagement notifications without building a separate push infrastructure.\n",
    features: [
      'Events tracking',
      'Install tracking',
      'Audience segmentation',
      'Push notifications',
      'Audience retargeting',
      'Crash reporting',
    ],
    github_url: 'https://github.com/flurry/react-native-flurry-sdk',
    name: 'Flurry',
    platform: ['Android', 'iOS', 'tvOS'],
    slug: 'flurry',
    type: ['Analytics'],
    website_url: 'https://www.flurry.com/',
    id: 'recUrA2AQOxjmNcvq',
  },
  {
    description:
      "Firebase is **Google's all-in-one mobile and web app development platform**, providing React Native developers with real-time database, authentication, push notifications, crash reporting, remote config, cloud storage, and serverless functions — all integrated and managed through the Firebase console.\n\nThe React Native integration is handled by **React Native Firebase**, the most popular and well-maintained Firebase library for React Native, offering a native module implementation that outperforms the JavaScript-only Firebase SDK in performance-critical scenarios.\n",
    description_success:
      "1. **Build a complete backend in a weekend.** Firebase Auth, Firestore, and Cloud Functions together give you authentication, a scalable database, and serverless API endpoints — all fully integrated with zero server provisioning, letting a single React Native developer launch a production app solo.\n2. **Send push notifications that actually reach users.** Firebase Cloud Messaging (FCM) handles token management, notification delivery, and delivery receipts across iOS and Android — with reliable delivery even when your app is in the background or closed.\n3. **Monitor and improve app quality in production.** Firebase Crashlytics captures every crash with a symbolicated stack trace, and Performance Monitoring shows you slow network calls and screen load times — giving you the data to improve your app's reliability and speed with each release.\n",
    features: [
      'Hosting',
      'Crash reporting',
      'Remote config',
      'Cloud messaging',
      'Real-time database',
      'Analytics',
      'AI / ML Predictions',
      'Cloud function',
      'Cloud storage',
      'Deep Linking',
    ],
    github_url: 'https://github.com/invertase/react-native-firebase',
    name: 'Firebase',
    platform: ['Android', 'iOS', 'Unity', 'Web'],
    pricing: ['Free tier', 'Pay as-you-go'],
    slug: 'firebase',
    twitter_url: 'https://twitter.com/rnfirebase',
    type: ['CI/CD & Release', 'Backend & APIs', 'Database & Storage'],
    website_url: 'https://rnfirebase.io',
    id: 'recXY5f6J6Ryht5wz',
  },
  {
    description:
      'Pushwoosh is a **mobile push notification platform** that helps React Native app teams engage, retain, and re-activate users through highly targeted push campaigns on iOS, Android, and web — with delivery rates optimized by AI-powered send-time personalization.\n\nWith advanced audience segmentation, A/B testing for notification content, automation workflows, and real-time analytics, Pushwoosh gives marketing teams full control over the push channel without requiring engineering involvement for every campaign.\n',
    description_success:
      "1. **Increase user retention with precisely timed push notifications.** Pushwoosh's behavioral segmentation lets you define audiences by in-app actions, last session date, or custom attributes — so your re-engagement campaigns reach users who are most likely to return, not everyone at once.\n2. **Run notification experiments without engineering bottlenecks.** Build and launch A/B tests comparing notification copy, send times, and deep link destinations directly from the Pushwoosh dashboard — no app releases required, results visible in real time.\n3. **Automate your entire user communication lifecycle.** Set up drip campaigns, onboarding sequences, and win-back flows once — Pushwoosh triggers them automatically based on user events in your React Native app, keeping users engaged without manual campaign management.\n",
    features: [
      'Push notifications',
      'Cloud messaging',
      'A / B testing',
      'Analytics',
      'Audience retargeting',
      'Audience segmentation',
      'Other',
    ],
    github_url: 'https://github.com/Pushwoosh/pushwoosh-react-native-plugin',
    name: 'Pushwoosh',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Premium tiers', 'Free trial'],
    slug: 'pushwoosh',
    twitter_url: 'https://twitter.com/Pushwoosh',
    type: ['CI/CD & Release'],
    website_url: 'https://www.pushwoosh.com',
    id: 'recXoL2bTgaO34va8',
  },
  {
    description:
      'Storyteller is a **SDK for embedding interactive stories and video clips** directly into React Native apps — the same format popularized by Instagram and Snapchat, now available for any mobile product.\n\nWith a lightweight SDK, a powerful CMS for your content team, native ad support, and built-in analytics, Storyteller lets product teams add a full stories experience to their app without building video infrastructure, content management, or an ad serving layer from scratch.\n',
    description_success:
      "1. **Add an Instagram-style stories feed to your app in hours.** Drop the Storyteller SDK into your React Native project, connect to the CMS, and ship a fully interactive stories experience — swipes, taps, polls, CTAs — without building a single video component yourself.\n2. **Let your content team publish without touching the codebase.** Storyteller's CMS gives non-technical editors full control over story creation, scheduling, and targeting — so your content pipeline runs independently from the engineering sprint, keeping the feed fresh without developer involvement.\n3. **Monetize engagement with native ads.** Storyteller's built-in ad support serves native story ads within your feed, creating a new revenue stream from your existing engaged users — no separate ad SDK to integrate, no custom ad unit to design.\n",
    features: ['Video', 'Events tracking', 'Cloud storage'],
    github_url:
      'https://github.com/getstoryteller/storyteller-sdk-react-native',
    name: 'Storyteller',
    platform: ['Android', 'iOS', 'macOS', 'Web'],
    pricing: ['Free trial', 'Premium tiers'],
    slug: 'storyteller',
    twitter_url: 'https://twitter.com/GetStoryteller',
    type: ['Backend & APIs'],
    website_url:
      'https://www.getstoryteller.com/documentation/react-native/getting-started',
    id: 'recY8xh59eWIWw3uL',
  },
  {
    description:
      'Strapi is the **leading open-source headless CMS** that gives React Native developers a self-hosted content management backend with a customizable REST and GraphQL API, a visual admin panel, and a flexible content type builder — all without needing a dedicated backend engineer.\n\nBy separating content management from the presentation layer, Strapi lets your React Native app consume content from a professional CMS while your editorial team manages articles, products, and settings through a clean UI — no code required on their end.\n',
    description_success:
      "1. **Give your content team an admin panel without building one.** Strapi's visual content type builder and admin UI let non-developers create, edit, and publish content independently — so your React Native app always has fresh content without a developer being in the loop for every change.\n2. **Ship faster with a flexible, auto-generated API.** Define your content models in Strapi's builder and get REST and GraphQL endpoints automatically — no API code to write, no endpoint documentation to maintain, and a type-safe query layer for your React Native app from day one.\n3. **Own your content infrastructure with full customization.** Self-host Strapi on any cloud provider with full access to the source code — extend it with custom plugins, webhooks, and lifecycle hooks, or upgrade to Strapi Cloud for a managed option — without ever being locked into a proprietary platform.\n",
    features: ['GraphQL'],
    github_url: 'https://github.com/phidn/awesome-react-native-strapi-starter',
    name: 'Strapi',
    platform: ['Android', 'iOS', 'macOS', 'Web', 'Windows'],
    pricing: ['Open source', 'Free trial', 'Premium tiers'],
    slug: 'strapi',
    twitter_url: 'https://twitter.com/strapijs',
    type: ['CMS & Content', 'Backend & APIs'],
    website_url: 'https://strapi.io/',
    id: 'recZt8NrvzeBJ9WTn',
  },
  {
    description:
      'Vexo is a **React Native-first analytics platform** that provides event tracking, session recordings, heatmaps, user paths, and real-time dashboards in a single SDK — purpose-built for mobile, not adapted from a web analytics tool.\n\nWith one line of initialization code, Vexo automatically captures screen views, user interactions, and app lifecycle events — giving React Native developers deep behavioral insights without spending weeks configuring a complex analytics setup.\n',
    description_success:
      "1. **Understand exactly how users navigate your app.** Vexo's Most Popular Paths and drop-off analysis show you the real journeys users take through your screens — so you redesign based on actual behavior instead of assumptions, reducing churn at the screens that matter most.\n2. **Identify friction in minutes with heatmaps.** Aggregate tap heatmaps across thousands of sessions reveal which buttons get ignored, which areas cause confusion, and where your layout fights your users' instincts — insights that turn directly into higher conversion and better UX.\n3. **Get a complete analytics stack in one integration.** Session recordings, custom events, device distribution, version adoption, and real-time active users all come from a single Vexo SDK — eliminating the 3–5 tool integrations your competitors maintain just to get the same visibility.\n",
    features: [
      'Audience segmentation',
      'Install tracking',
      'Analytics',
      'Events tracking',
      'Session recording',
      'Integrations',
      'Most popular paths',
      'Heatmaps',
      'Session tracking',
      'Average session time',
      'Active users',
      'Unique downloads',
      'App intensity',
      'Devices distribution',
      'Version adoption',
      'Custom events',
    ],
    github_url: 'https://vexo-docs.vercel.app/',
    name: 'Vexo',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'vexo',
    twitter_url: 'https://twitter.com/vexo_tech',
    type: ['Analytics'],
    website_url: 'https://www.vexo.co/',
    id: 'reca452Fwq3Q3HJuK',
  },
  {
    description:
      "Stream is a **managed API platform for in-app chat and activity feeds** that gives React Native developers production-ready messaging with offline support, push notifications, file uploads, reactions, and thread replies — backed by infrastructure that handles billions of messages per month.\n\nStream's React Native Chat SDK ships with fully customizable UI components — MessageList, Channel, MessageInput — so your team can launch a complete chat experience in days and spend the rest of the sprint customizing it to match your design system, not building core messaging primitives.\n",
    description_success:
      "1. **Ship production-ready in-app chat in days, not months.** Stream's React Native Chat SDK includes pre-built UI components for every part of the chat experience — channels, messages, reactions, threads — so you're customizing an existing product, not building messaging infrastructure from scratch.\n2. **Scale to millions of users without managing infrastructure.** Stream's cloud handles message persistence, fan-out to offline devices, push notification delivery, and real-time delivery at scale — your React Native app just connects to the API and the platform handles the rest.\n3. **Improve retention with chat that users love.** In-app messaging keeps users inside your product instead of switching to WhatsApp or SMS — increasing session time, daily active users, and the stickiness of your core product loop.\n",
    features: ['Push notifications', 'Video', 'Image & file upload'],
    github_url: 'https://github.com/GetStream/stream-chat-react-native',
    name: 'Stream',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'stream',
    twitter_url: 'https://twitter.com/getstream_io',
    type: ['Backend & APIs'],
    website_url: 'https://getstream.io',
    id: 'recbItw6artac4gqd',
  },
  {
    description:
      '`react-native-iap` is the **most popular open-source library for in-app purchases in React Native**, supporting both iOS App Store (StoreKit) and Android Google Play Billing — including subscriptions, consumables, non-consumables, and Amazon IAP.\n\nIt provides a consistent JavaScript API across all three platforms, handling the complex platform-specific purchase flows, receipt validation hooks, and subscription status updates — so you implement one purchasing logic that works everywhere.\n',
    description_success:
      '1. **Monetize your app on all platforms with a single API.** `react-native-iap` abstracts iOS StoreKit, Google Play Billing, and Amazon IAP behind one consistent interface — so your purchase logic, subscription management, and receipt handling code works on every platform without platform-specific branches.\n2. **Reduce revenue loss from unvalidated receipts.** The library exposes receipt data in a standardized format that you can forward to your server for validation — preventing fraudulent purchases from slipping through without building your own StoreKit/Billing integration.\n3. **Handle subscription lifecycle events correctly.** `react-native-iap` provides purchase update listeners that fire on renewal, cancellation, and billing issues — so your app responds to subscription state changes in real time instead of discovering them only on the next launch.\n',
    features: ['Other'],
    github_url: 'https://github.com/dooboolab-community/react-native-iap',
    name: 'react-native-iap',
    platform: ['iOS', 'Android'],
    pricing: ['Open source'],
    slug: 'react-native-iap',
    type: ['Payments & Subscriptions'],
    website_url: 'https://react-native-iap.dooboolab.com/docs/get-started/',
    id: 'recbseR7a3VeMnHmb',
  },
  {
    description:
      'Auth0 is a **flexible, drop-in authentication and authorization platform** that gives React Native apps enterprise-grade identity features — SSO, MFA, passwordless login, social connections, and user management — through a single SDK and a few lines of configuration.\n\nAuth0 handles the complexity of OAuth 2.0, OIDC, SAML, and LDAP so your team implements secure authentication without becoming identity experts — and scales from a weekend project to an enterprise product without rearchitecting your auth layer.\n',
    description_success:
      "1. **Ship auth in a day with battle-tested security.** Auth0's React Native SDK provides pre-built login, registration, and token refresh flows that handle every edge case — PKCE, silent refresh, biometric unlock — so your team never writes vulnerable authentication code from scratch.\n2. **Meet enterprise customer requirements without building enterprise features.** When a business customer asks for SAML SSO, SCIM provisioning, or custom MFA — Auth0 already supports it — so your sales team says yes instead of \"we'll add it to the roadmap.\"\n3. **Protect every API endpoint with zero configuration.** Auth0's access tokens work natively with your React Native app and backend, giving you a consistent, verified user identity in every API call without custom token validation middleware.\n",
    features: ['Auth', 'Auth - Social Login ', 'Auth - Multi-factor'],
    github_url:
      'https://github.com/auth0-samples/auth0-react-native-sample/tree/master/00-Login-Hooks',
    name: 'Auth0',
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'auth0',
    twitter_url: 'https://twitter.com/auth0',
    type: ['Auth & Identity'],
    website_url: 'https://auth0.com',
    id: 'recdtu5o6p40gOu37',
  },
  {
    description:
      'React Native MMKV is the **fastest key-value storage library for React Native**, leveraging the MMKV storage framework originally built by WeChat — delivering read and write speeds approximately 30x faster than AsyncStorage.\n\nWith synchronous reads, AES encryption support, and a simple key-value API, MMKV is the go-to replacement for AsyncStorage in performance-critical React Native apps — handling user preferences, session tokens, and cached data without the async overhead that causes UI jank.\n',
    description_success:
      "1. **Eliminate UI stutter caused by slow storage reads.** MMKV's synchronous API means you read user preferences and session tokens instantly on the JS thread — no `await`, no loading states, no flickering UI while your app waits for AsyncStorage to return a value.\n2. **Secure sensitive data with built-in AES encryption.** MMKV supports transparent encryption with a single `encryptionKey` parameter — store auth tokens, API keys, and user data with encryption-at-rest without integrating a separate keychain library.\n3. **Drop in as an AsyncStorage replacement in minutes.** MMKV's API mirrors AsyncStorage closely, and community wrappers make migration trivial — so you get a 30x storage performance improvement with a minimal diff to your existing code.\n",
    github_url: 'https://github.com/mrousavy/react-native-mmkv',
    name: 'React Native MMKV',
    platform: ['Android', 'iOS'],
    pricing: ['Open source'],
    slug: 'react-native-mmkv',
    twitter_url: 'https://twitter.com/mrousavy',
    type: ['Database & Storage'],
    website_url: 'https://github.com/mrousavy/react-native-mmkv',
    id: 'recfVAxGQNNd1Ok9n',
  },
  {
    description:
      'Featurevisor is a **Git-based feature flag and remote config system** for React Native and web apps, where all feature flags, experiments, and remote configuration live as YAML files in your Git repository — reviewed, versioned, and deployed through your existing CI/CD pipeline.\n\nUnlike SaaS feature flag tools, Featurevisor keeps your entire feature configuration in version control — giving you a complete audit trail, pull request reviews for flag changes, and static JSON artifacts served from your own CDN with no runtime dependency on a third-party SaaS platform.\n',
    description_success:
      '1. **Make feature flag changes go through code review.** Every flag update is a Git commit — your team reviews flag changes in pull requests just like code changes, with full history, blame, and rollback via standard Git operations, not a proprietary dashboard.\n2. **Eliminate external runtime dependencies from your app.** Featurevisor generates static JSON files served from your CDN — your React Native app fetches a config file, not a live API — so feature flags work even when the Featurevisor service is unavailable.\n3. **Ship and unship features without app store releases.** Once Featurevisor is integrated, enabling or disabling a feature for all users or a specific segment is a Git commit and a CI run — no app store submission, no waiting for users to update, no emergency hotfix required.\n',
    features: [
      'Feature flags',
      'Events tracking',
      'Install tracking',
      'Audience segmentation',
    ],
    github_url: 'https://github.com/featurevisor/featurevisor',
    name: 'Featurevisor',
    platform: ['Android', 'iOS', 'macOS', 'Web'],
    pricing: ['Open source'],
    slug: 'featurevisor',
    twitter_url: 'https://twitter.com/featurevisor',
    type: ['Backend & APIs'],
    website_url: 'https://featurevisor.com/docs/react-native/',
    id: 'recfzMIEarrqrCmZB',
  },
  {
    description:
      'PouchDB is an **open-source JavaScript database** that runs entirely in the browser and in React Native, designed to allow apps to store data locally while offline and synchronize it with CouchDB or other compatible servers when connectivity is restored.\n\nBuilt on the Apache CouchDB protocol, PouchDB handles conflict resolution, incremental sync, and attachment storage — making it one of the most proven solutions for building **offline-first React Native apps** that need robust data persistence without a complex backend.\n',
    description_success:
      '1. **Make your app fully functional without internet.** PouchDB stores all data locally on-device and syncs in the background when connectivity returns — users create, edit, and delete data offline without any "no connection" states or lost work.\n2. **Sync data across devices without building sync infrastructure.** PouchDB\'s CouchDB replication protocol handles conflict resolution, incremental updates, and attachment sync automatically — you define what to sync and PouchDB manages the rest, even with intermittent connectivity.\n3. **Get started in minutes with a familiar document API.** PouchDB\'s `put`, `get`, `query`, and `allDocs` API is intuitive for JavaScript developers — you have a working local database in your React Native app within minutes of installation, with full offline support from day one.\n',
    github_url: 'https://github.com/seigel/pouchdb-react-native',
    name: 'PouchDB',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Open source'],
    slug: 'pouchdb',
    twitter_url: 'https://twitter.com/pouchdb',
    type: ['Database & Storage'],
    website_url: 'https://pouchdb.com',
    id: 'rech5TNiPo7O3tNIh',
  },
  {
    description:
      'LogRocket is a **frontend monitoring platform** that combines session replay, performance monitoring, and product analytics for React Native apps — letting you watch video recordings of real user sessions alongside network requests, Redux state, and console logs.\n\nWhen a bug is reported, LogRocket lets you replay exactly what the user experienced — seeing every tap, swipe, and network call in context — so your team diagnoses the root cause in minutes instead of asking the user to reproduce the issue.\n',
    description_success:
      "1. **Stop guessing, start watching.** LogRocket's session replay shows you the exact sequence of user actions, screen states, and network requests that led to a bug — your team reproduces any reported issue instantly without needing the user on a call to demonstrate it.\n2. **Combine visual replay with technical context.** Every session recording is annotated with Redux state changes, console errors, and API response times — so you see both what the user saw and what was happening in the app simultaneously.\n3. **Proactively catch issues before user reports.** LogRocket's anomaly detection surfaces sessions where users rage-tapped, hit errors, or saw degraded performance — so your team finds and fixes friction points before they accumulate into bad App Store reviews.\n",
    features: ['Crash reporting'],
    github_url: 'https://docs.logrocket.com/docs/react-native',
    name: 'LogRocket',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'logrocket',
    twitter_url: 'https://twitter.com/LogRocket',
    type: ['Error Monitoring'],
    website_url: 'https://logrocket.com',
    id: 'rechLPQrH2pc7o9WY',
  },
  {
    description:
      'BaseQL is a **GraphQL layer for Airtable** that instantly transforms your Airtable bases into a queryable GraphQL API — letting React Native developers read, filter, and write Airtable records using standard GraphQL queries without building a custom backend.\n\nFor teams using Airtable as a lightweight CMS or operational database, BaseQL eliminates the manual REST API wrapper code and gives you a structured, typed interface to your Airtable data that integrates natively with Apollo, urql, and other GraphQL clients.\n',
    description_success:
      "1. **Use Airtable as your app's backend without writing a backend.** BaseQL wraps your Airtable base in a GraphQL API automatically — so your React Native app queries Airtable records with typed GraphQL operations instead of wrestling with the Airtable REST API's pagination and filtering quirks.\n2. **Move from no-code prototype to shipped app faster.** If your team already manages data in Airtable, BaseQL closes the gap between the spreadsheet and the app with zero additional infrastructure — prototype in Airtable, ship to users via React Native.\n3. **Filter and join data with GraphQL instead of client-side logic.** BaseQL exposes Airtable's filtering and linked record relationships as GraphQL arguments — so you query exactly the records you need server-side instead of fetching entire tables and filtering in JavaScript.\n",
    features: ['GraphQL'],
    github_url: 'https://docs.baseql.com/',
    name: 'BaseQL',
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'baseql',
    twitter_url: 'https://twitter.com/BaseQL',
    type: ['Backend & APIs'],
    website_url: 'https://baseql.com',
    id: 'reciYrtGCT9a6YGIb',
  },
  {
    description:
      'Airship is an **enterprise mobile engagement platform** that helps React Native apps drive retention and revenue through push notifications, in-app messaging, SMS, email, and mobile wallet integrations — all managed from a single campaign dashboard.\n\nWith advanced audience segmentation, deep link automation, and native Google Wallet / Apple Wallet pass support, Airship gives marketing and CRM teams the tools to run sophisticated mobile engagement campaigns without requiring engineering involvement for every send.\n',
    description_success:
      "1. **Run sophisticated engagement campaigns without engineering bottlenecks.** Airship's drag-and-drop campaign builder lets marketing teams create multi-channel journeys — push, in-app message, SMS, email — that trigger automatically on user behavior, without writing a line of code after the initial SDK integration.\n2. **Reach the right users at the right time with powerful segmentation.** Airship's audience builder combines demographic, behavioral, and location data to define hyper-specific segments — so every notification feels personally relevant rather than broadcast spam, improving open rates and preventing unsubscribes.\n3. **Expand to mobile wallet without building a native integration.** Airship's Google Wallet and Apple Wallet pass support lets you issue loyalty cards, boarding passes, and event tickets from the same platform you use for push — extending your engagement surface without a separate wallet SDK integration.\n",
    features: [
      'Deep Linking',
      'Audience segmentation',
      'Push notifications',
      'Analytics',
      'Google Wallet',
      'Localization',
    ],
    github_url: 'https://github.com/urbanairship/react-native-module',
    name: 'Airship',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Premium tiers'],
    slug: 'airship',
    twitter_url: 'https://twitter.com/airship',
    type: ['CI/CD & Release'],
    website_url: 'https://docs.airship.com/platform/mobile/',
    id: 'recj0iM37aM6CNleb',
  },
  {
    description:
      'RevenueCat is a **subscription management and in-app purchase infrastructure platform** that abstracts the complexity of StoreKit and Google Play Billing into a single cross-platform SDK — handling purchase validation, subscription status, trial management, and revenue analytics out of the box.\n\nUsed by thousands of apps generating billions in revenue, RevenueCat eliminates the server-side receipt validation infrastructure that every monetized React Native app needs, letting small teams implement robust subscription monetization without a dedicated backend engineer.\n',
    description_success:
      "1. **Launch subscriptions without building payment infrastructure.** RevenueCat validates receipts, tracks subscription status, and handles billing edge cases server-side — your React Native app calls the SDK, RevenueCat handles the complexity, and you ship monetization in days instead of months.\n2. **Optimize revenue with data-driven pricing experiments.** RevenueCat's A/B testing for paywalls and pricing lets you experiment with different subscription tiers, trial lengths, and offer structures — and measures the actual revenue impact of each variant, not just conversion rate.\n3. **Get cross-platform subscription analytics in one dashboard.** RevenueCat unifies iOS App Store and Google Play subscription data — MRR, churn, LTV, trial conversion — into a single view, so your team makes monetization decisions based on total business reality, not platform silos.\n",
    features: ['Analytics', 'A / B testing'],
    github_url: 'https://github.com/RevenueCat/react-native-purchases',
    name: 'RevenueCat',
    platform: ['iOS', 'Android', 'Unity', 'Web'],
    pricing: ['Free tier', 'Pay as-you-go', 'Premium tiers'],
    slug: 'revenuecat',
    twitter_url: 'https://twitter.com/revenuecat',
    type: ['Payments & Subscriptions'],
    website_url: 'https://www.revenuecat.com/docs/reactnative',
    id: 'reclw400RHyEgHJjV',
  },
  {
    description:
      "AppsFlyer is the **world's leading mobile attribution and marketing analytics platform**, trusted by over 12,000 brands to measure the effectiveness of their user acquisition campaigns across every channel — social, search, email, TV, and organic.\n\nFor React Native developers, AppsFlyer's SDK provides install attribution, in-app event tracking, deep linking, retargeting, and audience segmentation — giving your marketing team reliable data on which campaigns drive high-value users, not just installs.\n",
    description_success:
      "1. **Know exactly which campaigns bring your best users.** AppsFlyer's attribution engine connects every install to its original source — ad network, influencer campaign, email link, or organic search — so your marketing team doubles down on what works and cuts what doesn't.\n2. **Personalize the first app experience with deep linking.** AppsFlyer's OneLink creates smart deep links that open your app to the right screen for each campaign — new users land on the relevant onboarding flow, existing users go straight to the promoted content, on iOS and Android.\n3. **Protect revenue from mobile fraud.** AppsFlyer's Protect360 fraud prevention filters invalid installs from bot farms and click injection before they reach your attribution data — ensuring your marketing budget reaches real users and your LTV calculations reflect reality.\n",
    features: [
      'Audience segmentation',
      'Push notifications',
      'Events tracking',
      'Audience retargeting',
      'Install tracking',
      'A / B testing',
    ],
    github_url: 'https://github.com/AppsFlyerSDK/appsflyer-react-native-plugin',
    name: 'AppsFlyer',
    platform: ['Android', 'iOS', 'Web', 'tvOS'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'appsflyer',
    type: ['Analytics'],
    website_url: 'https://www.appsflyer.com',
    id: 'recm3J131JfMFdLpF',
  },
  {
    description:
      "OneSignal is the **world's most widely used push notification service**, enabling React Native apps to send personalized push notifications to iOS, Android, and web users through a single integration — with delivery tracking, segmentation, A/B testing, and automation included.\n\nWith over 1 million apps using OneSignal, the platform's high-deliverability infrastructure, rich notification templates, and real-time analytics give development teams everything they need to run the push channel without managing Firebase Cloud Messaging and APNs directly.\n",
    description_success:
      "1. **Set up push notifications in 30 minutes.** OneSignal's React Native SDK handles APNs and FCM token management, permission requests, and delivery tracking automatically — your team sends the first push notification to a real device in under an hour, with no backend infrastructure required.\n2. **Send the right message to the right user.** OneSignal's segmentation engine lets you target users by device type, location, behavior, or custom attributes — so re-engagement campaigns reach inactive users and promotional messages hit only the audience that's relevant, improving open rates and reducing unsubscribes.\n3. **Automate the push lifecycle with zero engineering overhead.** OneSignal's automated messages trigger on user events — session start, purchase completion, 7-day inactivity — running your entire push engagement strategy in the background without a single manual send or engineering sprint.\n",
    features: ['Cloud messaging', 'Push notifications'],
    github_url: 'https://github.com/OneSignal/react-native-onesignal',
    name: 'OneSignal',
    platform: ['Android', 'iOS', 'Web'],
    slug: 'onesignal',
    type: ['Backend & APIs'],
    website_url: 'https://onesignal.com',
    id: 'recmwNkublGYk6O47',
  },
  {
    description:
      'Using a **Mac mini as a self-hosted CI/CD build server** for React Native is a cost-effective alternative to cloud CI platforms like Bitrise or Codemagic — giving you full control over the build environment, Xcode version, and pipeline configuration at the cost of a single hardware purchase.\n\nBy running your own build machine with Fastlane, Xcode, and Android SDK installed, you can execute the same automated build, test, and deploy pipelines as cloud CI — but with no per-minute build costs and complete customization of every step in the process.\n',
    description_success:
      '1. **Eliminate unpredictable CI bills.** A Mac mini is a one-time hardware cost that replaces monthly cloud CI subscriptions — for teams with frequent builds (multiple deploys per day), self-hosted CI typically pays for itself within 3–6 months compared to Bitrise or Codemagic.\n2. **Get full control over your build environment.** Self-hosted CI means you choose every Xcode version, simulator, and macOS configuration — no waiting for a cloud provider to support the latest iOS SDK or workarounding undocumented differences between your local environment and the cloud runner.\n3. **Build iOS without a Mac subscription.** A single Mac mini on your network gives every developer on your team — including Linux and Windows developers — the ability to trigger iOS builds and App Store submissions through Fastlane without owning personal Apple hardware.\n',
    features: ['Other'],
    name: 'Mac mini',
    platform: ['iOS'],
    pricing: ['Premium tiers'],
    slug: 'mac-mini',
    type: ['CI/CD & Release'],
    website_url: 'https://www.apple.com/mac-mini/',
    id: 'recpKXVA0FCRYBclI',
  },
  {
    description:
      'Mux is a **developer-first video infrastructure platform** that provides APIs for video upload, encoding, playback, and real-time streaming — purpose-built for software teams building video features into React Native apps without wanting to manage video encoding infrastructure.\n\nWith the Mux React Native Player, adaptive bitrate streaming, and detailed video quality analytics, your app delivers a smooth viewing experience across every network condition and device — while Mux handles transcoding, CDN delivery, and stream health monitoring behind the scenes.\n',
    description_success:
      "1. **Add video playback to your React Native app in hours.** Mux's React Native Player component integrates with your Mux video assets and handles adaptive bitrate switching, buffering states, and fullscreen automatically — your team ships a high-quality video experience without implementing a custom media player.\n2. **Upload and process user-generated video at any scale.** Mux's video upload API accepts any input format and returns an HLS stream optimized for mobile playback — eliminating the server infrastructure, encoding queues, and storage management that video features normally require.\n3. **Monitor video quality where it actually matters — on the user's device.** Mux Data provides real-time playback quality metrics (startup time, buffering ratio, error rate) broken down by device, OS, and network quality — so you fix video performance issues before they show up in App Store reviews.\n",
    features: ['Video', 'Audio', 'Real-time streaming', 'Live'],
    name: 'Mux',
    platform: ['Android', 'iOS'],
    pricing: ['Pay as-you-go', 'Premium tiers'],
    slug: 'mux',
    twitter_url: 'https://x.com/muxhq',
    type: ['Backend & APIs'],
    website_url: 'https://www.mux.com/video-for/react-native',
    id: 'recpj2YXTgqEFTfCZ',
  },
  {
    description:
      'PlanetScale is a **MySQL-compatible serverless database platform** built on Vitess — the same database sharding technology that powers YouTube and Google — designed to give React Native backend teams the scalability of Google-scale infrastructure with the familiarity of MySQL.\n\nWith branching workflows, non-blocking schema changes, and automatic query optimization, PlanetScale brings a developer-friendly Git-like workflow to database operations — so your team deploys schema changes safely without locking tables or causing downtime.\n',
    description_success:
      "1. **Deploy schema changes without downtime or table locks.** PlanetScale's branching model lets you propose, test, and merge database schema changes like pull requests — non-blocking migrations run automatically, so your React Native app's backend updates without a maintenance window or degraded user experience.\n2. **Scale your database without a DBA.** PlanetScale's Vitess foundation handles horizontal sharding automatically as your data grows — so the same database setup that works for your first 1,000 users scales to your first 10 million without re-architecting your data layer.\n3. **Ship faster with database branches.** Create a PlanetScale branch for every feature branch — test risky schema changes in isolation before merging to production, and roll back instantly if something goes wrong — without affecting your live React Native app's database.\n",
    features: ['Cloud function', 'Real-time database'],
    github_url: 'https://github.com/planetscale/database-js',
    name: 'PlanetScale',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'planetscale',
    twitter_url: 'https://twitter.com/planetscaledata',
    type: ['Database & Storage'],
    website_url: 'https://planetscale.com/',
    id: 'recqlao2CHN3Ym5eH',
  },
  {
    description:
      "Bugsnag is an **application stability monitoring platform** that helps React Native teams make data-driven decisions about when to ship new features versus when to fix bugs — by showing you the exact percentage of user sessions affected by each error.\n\nUnlike basic crash reporters, Bugsnag's stability score and error grouping help you prioritize the bugs that actually impact your users most, not just the most recently occurring ones — reducing the noise and helping your team focus on what genuinely improves app quality.\n",
    description_success:
      "1. **Prioritize bugs by user impact, not just frequency.** Bugsnag's stability score shows you the percentage of crash-free sessions for each app version — so your team fixes the errors affecting the most users first, not just the errors that appeared most recently in your error inbox.\n2. **Reproduce crashes with complete diagnostic context.** Every Bugsnag error report includes device state, app version, recent breadcrumbs, and the full stack trace with source-mapped JavaScript — your engineers diagnose the root cause in the report, not in a 45-minute debugging session.\n3. **Release confidently with real-time stability monitoring.** Bugsnag's release tracking dashboard shows error rates climbing or falling for each deploy — so your team catches stability regressions in the first hour after a release, not after it reaches all users and damages your App Store rating.\n",
    features: ['Crash reporting'],
    github_url: 'https://docs.bugsnag.com/platforms/react-native/expo/',
    name: 'BugSnag',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'bugsnag',
    type: ['Error Monitoring'],
    website_url: 'https://www.bugsnag.com',
    id: 'recqyttqfExh8posU',
  },
  {
    description:
      'Instabug is a **mobile bug reporting and in-app feedback platform** that makes it easy for users to report issues directly from your React Native app — by shaking the device or tapping a floating button — and automatically attaches a screenshot, session recording, device info, and logs to every report.\n\nTrusted by 25,000+ mobile teams, Instabug reduces the feedback loop between your users and your engineers from days of back-and-forth to minutes — giving your team reproducible, context-rich bug reports instead of vague "the app crashed" tickets.\n',
    description_success:
      "1. **Get reproducible bug reports with zero extra effort from users.** When a user reports an issue through Instabug, it automatically attaches the last 60 seconds of screen recording, network requests, console logs, and device state — so your engineers have everything they need to reproduce the bug immediately.\n2. **Understand user behavior to build a better app.** Instabug's in-app surveys and feedback widgets give you direct qualitative insight from your most engaged users — identifying the UX friction, missing features, and confusing flows that structured analytics can't reveal.\n3. **Reduce churn by fixing issues before they accumulate.** Instabug's crash tracking and user feedback loop lets your team identify and resolve high-impact issues within hours of release — keeping your App Store rating high, your users happy, and your churn rate low.\n",
    features: [
      'Analytics',
      'Crash reporting',
      'Session recording',
      'Audience segmentation',
      'Feedback collection',
      'In-app surveys',
      'User feedback management',
    ],
    github_url: 'https://github.com/Instabug/Instabug-React-Native',
    name: 'Instabug',
    platform: ['iOS', 'Android', 'Unity'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'instabug',
    twitter_url: 'https://twitter.com/instabug',
    type: ['Error Monitoring'],
    website_url: 'https://www.instabug.com/platforms/react-native',
    id: 'recrKm6FFFxPIHjn8',
  },
  {
    description:
      'Runway is a **mobile release management platform** that gives React Native teams a single source of truth for the entire release process — from branch cut to App Store submission — with automated workflows, CI/CD integrations, and real-time release health dashboards.\n\nBy centralizing release coordination across iOS, Android, Fastlane, Bitrise, and App Store Connect, Runway eliminates the spreadsheets, Slack threads, and manual checklist steps that make mobile releases stressful and error-prone — letting your team ship faster and more consistently.\n',
    description_success:
      "1. **Cut release preparation time in half.** Runway automates the repetitive parts of your release — branch creation, build triggering, changelog generation, TestFlight distribution, and store submission — so your team executes a consistent release process without a dedicated release manager.\n2. **Give everyone visibility into release health.** Runway's release dashboard shows open issues, build status, store review status, and crash rates in one view — so every stakeholder knows exactly where the release stands without Slacking the mobile team for a status update.\n3. **Ship without the weekend anxiety.** Runway's rollout controls let you start a release at 1%, monitor crash rates and ANRs in real time, and pause or halt the rollout from the dashboard — so your team ships confidently on any day of the week, not just Tuesday mornings with everyone online.\n",
    features: ['Over the Air Updates'],
    name: 'Runway',
    platform: ['Android', 'iOS'],
    pricing: ['Free tier', 'Premium tiers'],
    slug: 'runway',
    twitter_url: 'https://twitter.com/RunwayTeam',
    type: ['CI/CD & Release'],
    website_url: 'https://www.runway.team/',
    id: 'recv6nP97msWvGgMF',
  },
  {
    description:
      "Supabase is an **open-source Firebase alternative** built on PostgreSQL, providing React Native developers with a real-time database, authentication, file storage, and auto-generated REST and GraphQL APIs — all self-hostable and backed by the reliability of the world's most advanced open-source relational database.\n\nUnlike Firebase's proprietary NoSQL model, Supabase gives you a proper SQL database with full relational queries, row-level security, and database functions — while still providing the developer experience and real-time capabilities that make Firebase popular for mobile apps.\n",
    description_success:
      "1. **Ship a full-stack React Native app with a single backend.** Supabase Auth, Postgres database, and Storage bucket give you everything a mobile app needs — user accounts, relational data, and file uploads — with auto-generated REST and GraphQL APIs, so your team focuses on the product, not the infrastructure.\n2. **Own your data with a real SQL database.** Unlike Firebase's NoSQL model, Supabase gives you PostgreSQL — full SQL queries, foreign keys, and row-level security policies — so you model complex data correctly from day one instead of working around NoSQL limitations as your app scales.\n3. **Add real-time features without a WebSocket server.** Supabase Realtime streams database changes to your React Native app as they happen — build live feeds, collaborative editing, and notification triggers by subscribing to table changes, with zero additional infrastructure to manage.\n",
    features: ['Auth', 'Real-time database'],
    github_url:
      'https://github.com/supabase/supabase/tree/master/examples/expo-todo-list',
    name: 'Supabase',
    platform: ['Android', 'iOS', 'Web'],
    pricing: ['Open source'],
    slug: 'supabase',
    twitter_url: 'https://twitter.com/supabase',
    type: ['Backend & APIs', 'Database & Storage', 'Auth & Identity'],
    website_url: 'https://supabase.com',
    id: 'recx8kDZRBP3jj79y',
  },
  {
    description:
      "Magic is a **passwordless authentication SDK** that replaces traditional username/password login with a secure, one-tap magic link or SMS OTP flow — eliminating the most common source of user frustration and account abandonment in React Native apps.\n\nBuilt on decentralized cryptographic identity (DKMS), Magic issues non-custodial key pairs per user — meaning your users own their identity and authentication tokens can't be compromised by a server-side breach, giving your app enterprise-grade security with consumer-grade UX.\n",
    description_success:
      '1. **Remove the #1 friction point at signup.** Passwordless login with Magic means no password to create, forget, or reset — users enter their email or phone number and tap a link to authenticate instantly, consistently converting more signups and reducing support tickets for locked accounts.\n2. **Implement secure auth without managing passwords.** Magic handles the cryptographic key generation, token signing, and session management server-side — your React Native app never stores or transmits passwords, and your backend never holds credential data that could be breached.\n3. **Support every authentication method from one SDK.** Magic covers email magic links, SMS OTP, social login (Google, Apple, Facebook), and Web3 wallet auth through a single integration — so you start with email passwordless and expand to other methods as your user base demands them, without switching SDKs.\n',
    features: [
      'Email',
      'SMS',
      'Auth - Social Login ',
      'Auth',
      'Auth - Multi-factor',
    ],
    github_url: 'https://github.com/magiclabs/magic-js',
    name: 'Magic',
    pricing: ['Free tier', 'Pay as-you-go'],
    slug: 'magic',
    twitter_url: 'https://twitter.com/magic_labs',
    type: ['Auth & Identity'],
    website_url: 'https://magic.link',
    id: 'reczZoVhsonfN26FS',
  },
];
