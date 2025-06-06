/**
 * Level of difficulty for a starter template
 */
export type StarterLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Fields contained in a starter record
 */
export interface StarterFields {
  /**
   * GitHub repository URL
   */
  github_url?: string;

  /**
   * Difficulty level
   */
  level: StarterLevel;

  /**
   * Name of the starter template
   */
  name: string;

  /**
   * Optional internal notes
   */
  private_note?: string;

  /**
   * Area of application
   */
  scope?: string[];

  /**
   * URL-friendly identifier
   */
  slug: string;

  /**
   * Technologies used in the starter
   */
  stack?: string[];

  /**
   * Documentation or demo URL
   */
  website_url?: string;
}

export interface StarterRecord {
  createdTime: string;
  fields: StarterFields;
  id: string;
}

/**
 * API response containing all starter records
 */
export interface StartersResponse {
  records: StarterRecord[];
}

/**
 * Categorized starter records grouped by difficulty level
 */
export interface CategorizedStarters {
  title: StarterLevel;
  records: StarterRecord[];
}

/**
 * Props for the ReactNativeStartersPage component
 */
export interface ReactNativeStartersPageProps {
  categorizedRecords: CategorizedStarters[];
}

export const starters: StartersResponse = {
  records: [
    {
      createdTime: '2023-09-08T17:24:41.000Z',
      fields: {
        github_url: 'https://github.com/Aetherspace/green-stack-starter-demo',
        level: 'Advanced',
        name: 'GREEN stack',
        scope: ['Full Stack', 'Monorepo', 'Mobile', 'Web', 'DevOps'],
        slug: 'green-stack',
        stack: [
          'Next.js',
          'Storybook',
          'GraphQL',
          '@expo/html-elements',
          'Expo',
          'expo-router',
          'react-navigation',
          'SWR',
          'tailwind',
          'turborepo',
          'Zod',
          'Storybook',
        ],
        website_url: 'https://aetherspace-green-stack-starter.vercel.app/',
      },
      id: 'rec4vmSrIjV2UrQCJ',
    },
    {
      createdTime: '2022-12-22T21:59:56.000Z',
      fields: {
        github_url: 'https://github.com/t3-oss/create-t3-turbo',
        level: 'Intermediate',
        name: 'create-t3-turbo',
        scope: ['Mobile', 'Web', 'Monorepo'],
        slug: 'create-t3-turbo',
        stack: [
          'EAS',
          'Expo',
          'Next.js',
          'tRPC',
          'tailwind',
          'expo-router',
          'turborepo',
        ],
        website_url: 'https://turbo.t3.gg/',
      },
      id: 'rec57V56wEh9BPvxd',
    },
    {
      createdTime: '2023-04-27T14:00:48.000Z',
      fields: {
        github_url: 'https://github.com/expo/create-react-native-app',
        level: 'Beginner',
        name: 'create-react-native-app',
        scope: ['Frontend', 'Mobile', 'Full Stack'],
        slug: 'create-react-native-app',
        website_url: 'https://github.com/expo/examples',
      },
      id: 'rec5YVhmijmcwxOrB',
    },
    {
      createdTime: '2023-11-28T11:55:30.000Z',
      fields: {
        github_url: 'https://github.com/dabit3/react-native-ai',
        level: 'Intermediate',
        name: 'react-native-ai',
        scope: ['Full Stack', 'Mobile'],
        slug: 'react-native-ai',
        stack: ['Expo', 'ai', 'TypeScript', 'react-navigation', 'React Native'],
        website_url: 'https://nader.codes/',
      },
      id: 'rec8YcsbOYC7a47YD',
    },
    {
      createdTime: '2024-02-26T12:49:44.000Z',
      fields: {
        level: 'Intermediate',
        name: 'HyperFast',
        scope: ['Full Stack', 'Mobile'],
        slug: 'hyperfast',
        stack: [
          'Expo',
          'Supabase',
          'React Native',
          'MobX',
          'Push Notifications',
          'cli templating',
        ],
        website_url: 'https://hyperfa.st/',
      },
      id: 'recFWM9km9gsH5W5C',
    },
    {
      createdTime: '2023-08-31T08:23:42.000Z',
      fields: {
        github_url: 'https://github.com/timothymiller/t4-app',
        level: 'Advanced',
        name: 'T4',
        scope: ['Full Stack'],
        slug: 't4',
        stack: [
          'Tamagui',
          'Next.js',
          'Expo',
          'Supabase',
          'Edge SSR',
          'Drizzle',
          'tRPC',
          'React Query',
          'Hono',
          'Valibot',
          'Million.js',
          'Virtualized Lists',
          'Pattycake',
        ],
        website_url: 'https://t4stack.com/',
      },
      id: 'recFsEVHrSm2lTxLy',
    },
    {
      createdTime: '2023-04-27T14:02:11.000Z',
      fields: {
        github_url: 'https://github.com/tamagui/tamagui',
        level: 'Advanced',
        name: 'tamagui',
        scope: ['Frontend', 'Monorepo', 'Mobile', 'Web'],
        slug: 'tamagui',
        stack: ['Expo', 'Next.js', 'turborepo'],
        website_url: 'https://tamagui.dev/',
      },
      id: 'recKTNzxUzQrCp3NA',
    },
    {
      createdTime: '2022-12-22T21:58:59.000Z',
      fields: {
        github_url: 'https://github.com/expo/expo',
        level: 'Beginner',
        name: 'create-expo-app',
        scope: ['Frontend', 'Mobile'],
        slug: 'create-expo-app',
        website_url: 'https://docs.expo.dev/tutorial/create-your-first-app/',
      },
      id: 'recMfHzZz1VilHCFT',
    },
    {
      createdTime: '2023-10-19T12:11:06.000Z',
      fields: {
        github_url: 'https://github.com/callstack/react-native-builder-bob',
        level: 'Beginner',
        name: 'create-react-native-library',
        scope: ['Mobile', 'Full Stack'],
        slug: 'create-react-native-library',
        website_url: 'https://callstack.github.io/react-native-builder-bob',
      },
      id: 'recPQt8XOovO9Qn9d',
    },
    {
      createdTime: '2022-12-22T21:58:59.000Z',
      fields: {
        github_url: 'https://github.com/react-native-community/cli',
        level: 'Intermediate',
        name: 'react-native-cli',
        scope: ['Mobile'],
        slug: 'react-native-cli',
        stack: ['React Native'],
        website_url:
          'https://reactnative.dev/docs/getting-started-without-a-framework',
      },
      id: 'recT7gn9zuQwjAn1A',
    },
    {
      createdTime: '2023-09-08T15:25:12.000Z',
      fields: {
        github_url: 'https://github.com/bidah/universal-medusa/',
        level: 'Advanced',
        name: 'Universal Medusa',
        slug: 'universal-medusa',
        website_url: 'https://universal-medusa-docs.vercel.app/',
      },
      id: 'recTPcAacV7vJdLrH',
    },
    {
      createdTime: '2023-10-19T07:15:32.000Z',
      fields: {
        github_url: 'https://github.com/danstepanov/create-expo-stack',
        level: 'Advanced',
        name: 'create-expo-stack',
        scope: ['Frontend', 'Full Stack', 'Mobile', 'Web', 'Monorepo'],
        slug: 'create-expo-stack',
        website_url: 'https://createexpostack.com/',
      },
      id: 'recUWZbd6LXkCUKxk',
    },
    {
      createdTime: '2024-02-16T08:29:15.000Z',
      fields: {
        level: 'Intermediate',
        name: 'ShopifySync',
        private_note:
          'GraphQL API • Expo • React Native • Restyle • Reanimated • Expo Router • i18n-js • Tanstack Query',
        slug: 'shopifysync',
        stack: ['Expo', 'GraphQL'],
        website_url: 'https://shopify-sync.com/',
      },
      id: 'recWSs6AYNtzqBLJg',
    },
    {
      createdTime: '2022-12-22T22:00:14.000Z',
      fields: {
        github_url: 'https://github.com/obytes/react-native-template-obytes',
        level: 'Advanced',
        name: 'react-native-template-obytes',
        scope: ['Frontend', 'Mobile'],
        slug: 'react-native-template-obytes',
        website_url: 'https://starter.obytes.com/',
      },
      id: 'recoKKaMxcNA9O4Dk',
    },
    {
      createdTime: '2022-12-22T21:58:59.000Z',
      fields: {
        github_url: 'https://github.com/infinitered/ignite',
        level: 'Beginner',
        name: 'ignite-cli',
        scope: ['Mobile'],
        slug: 'ignite-cli',
        stack: [
          'apisauce',
          'AsyncStorage',
          'date-fns',
          'Expo',
          'expo-font',
          'expo-localization',
          'Hermes',
          'Jest',
          'Maestro',
          'MobX',
          'React Native',
          'react-navigation',
          'Reactotron',
          'Reanimated',
          'TypeScript',
          'cli templating',
        ],
        website_url: 'https://ignitecookbook.com/',
      },
      id: 'recxD7MVlq8WDgrpa',
    },
    {
      createdTime: '2024-03-05T17:06:45.000Z',
      fields: {
        github_url: 'https://github.com/bidah/uni-stack',
        level: 'Advanced',
        name: 'UNI STACK',
        private_note: 'add prisma',
        scope: ['Full Stack'],
        slug: 'uni-stack',
        stack: ['TypeScript', 'Expo', 'expo-router', 'tRPC', 'tailwind'],
        website_url: 'https://www.uni-stack.dev/',
      },
      id: 'recxdHaNdl69ZDkJJ',
    },
    {
      createdTime: '2024-01-09T08:45:44.000Z',
      fields: {
        github_url:
          'https://github.com/supabase/supabase/tree/master/examples/user-management/expo-push-notifications',
        level: 'Intermediate',
        name: 'Expo React Native Push Notifications with Supabase Edge Functions',
        scope: ['Mobile'],
        slug: 'expo-react-native-push-notifications-with-supabase-edge-functions',
        stack: ['Expo', 'Supabase', 'TypeScript'],
        website_url: 'https://supabase.com/',
      },
      id: 'recxhlwffMoCNMVQ3',
    },
  ],
};
