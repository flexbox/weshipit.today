import { Workshop } from '~/types/workshop';

export const CHALLENGE_SOURCE_RAW =
  'https://raw.githubusercontent.com/flexbox/react-native-bootcamp/main/challenges';

// count number of challenges
export const countChallenges = (workshops: Workshop[]) => {
  let count = 0;
  workshops.forEach((workshop) => {
    count += workshop.challenges.length;
  });
  // remove setup and hackathon from the count
  count -= 2;
  return count;
};

export const allWorkshops: Workshop[] = [
  {
    id: 'setup',
    title: 'Setup',
    description:
      '_Start here!_ This is where you will get oriented, set up your work environment, and get ready to succeed as a **React Native developer**.',
    challenges: [
      {
        title: 'Getting ready for the workshop',
        exercice: 1,
        linkHref: '/workshop/challenges/setup',
        nextLinkHref: '/workshop/challenges/foundation-01',
      },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    description:
      "The foundational skills you'll need to create your first components with React Native and use a UI library called `react-native-paper`.",
    urlPreview:
      'https://docs.google.com/presentation/d/e/2PACX-1vR2TXxGBvdj-pp0hNfJgjDITuqW3QSLVJxrfJiyonHz6x_fhynW8vY69YbCGpp9p2c2ibZZd9OVfMqx/pub',
    urlPdf:
      'https://docs.google.com/presentation/d/1Zj5aeBFNVC3ARvzqeU-r2JfeQixZ6i0wbT_EGGQWZd8/export/pdf',
    urlVideo: 'https://youtu.be/TH6vGPyVV5M',
    challenges: [
      {
        title: '1. Code from the cloud with Expo Snack',
        exercice: 1,
        linkHref: '/workshop/challenges/foundation-01',
        nextLinkHref: '/workshop/challenges/foundation-02',
      },
      {
        title: '2. Code on your laptop with VSCode',
        exercice: 2,
        linkHref: '/workshop/challenges/foundation-02',
        nextLinkHref: '/workshop/challenges/foundation-03',
      },
      {
        title: '3. Scroll on mobile',
        exercice: 3,
        linkHref: '/workshop/challenges/foundation-03',
        nextLinkHref: '/workshop/challenges/foundation-04',
      },
      {
        title: '4. Render a list of data',
        exercice: 4,
        linkHref: '/workshop/challenges/foundation-04',
        nextLinkHref: '/workshop/challenges/foundation-05',
      },
      {
        title: '5. Folder structure',
        exercice: 5,
        linkHref: '/workshop/challenges/foundation-05',
        nextLinkHref: '/workshop/challenges/data-01',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data Layer',
    description:
      'The data layer is where you will store your data and connect it to your UI.',
    urlPreview:
      'https://docs.google.com/presentation/d/e/2PACX-1vSTp1TTTrmeVTkapTFCVvPlNB4rSdSEt4JZANssaMmqwQ3TTaRPuWfThhEv9-VqT3PaQaVcuXNz3nKc/pub',
    urlPdf:
      'https://docs.google.com/presentation/d/1wRMSijBuUKmRB91RAZYdc8k2o544xQxpPW8b1rBr1LY/export/pdf',
    challenges: [
      {
        title: '1. How to debug with React Native',
        exercice: 1,
        linkHref: '/workshop/challenges/data-01',
        nextLinkHref: '/workshop/challenges/data-02',
      },
      {
        title: '2. Data fetching using @tanstack/react-query',
        exercice: 2,
        linkHref: '/workshop/challenges/data-02',
        nextLinkHref: '/workshop/challenges/data-03',
      },
      {
        title: '3. Add an offline message',
        exercice: 3,
        linkHref: '/workshop/challenges/data-03',
        nextLinkHref: '/workshop/challenges/ecosystem-01',
      },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem',
    description:
      'The ecosystem is where you will learn how to use other libraries and frameworks.',
    urlPreview:
      'https://docs.google.com/presentation/d/e/2PACX-1vS6H6YVnpLAutrtEarTTPTkTAak9GRVEoafg3JPWD4s-IN4FGk1N48IME-1-vjoVineBTzQIw7Pjlam/pub',
    urlPdf:
      'https://docs.google.com/presentation/d/1JQ-JixROh9hr5H3K4rJvlwixMJcdR-PIIjhrskUWDRA/export/pdf',
    challenges: [
      {
        title: '1. VSCode extensions',
        exercice: 1,
        linkHref: '/workshop/challenges/ecosystem-01',
        nextLinkHref: '/workshop/challenges/ecosystem-02',
      },
      {
        title: '2. ESLint and Prettier',
        exercice: 2,
        linkHref: '/workshop/challenges/ecosystem-02',
        nextLinkHref: '/workshop/challenges/ecosystem-03',
      },
      {
        title: '3. TypeScript',
        exercice: 3,
        linkHref: '/workshop/challenges/ecosystem-03',
        nextLinkHref: '/workshop/challenges/ecosystem-04',
      },
      {
        title: '4. UI component explorer with Storybook',
        exercice: 4,
        linkHref: '/workshop/challenges/ecosystem-04',
        nextLinkHref: '/workshop/challenges/ecosystem-05',
      },
      {
        title: '5. Unit testing with Jest',
        exercice: 5,
        linkHref: '/workshop/challenges/ecosystem-05',
        nextLinkHref: '/workshop/challenges/ecosystem-06',
      },
      {
        title: '6. End-to-end testing with Maestro',
        exercice: 6,
        linkHref: '/workshop/challenges/ecosystem-06',
        nextLinkHref: '/workshop/challenges/expo-router-01',
      },
    ],
  },
  {
    id: 'expo-router',
    title: 'Expo Router',
    description:
      'Learn file-based routing with Expo Router, the modern way to handle navigation in Expo apps.',
    challenges: [
      {
        title: '1. Introduction to Expo Router',
        exercice: 1,
        linkHref: '/workshop/challenges/expo-router-01',
        nextLinkHref: '/workshop/challenges/expo-router-02',
      },
      {
        title: '2. Dynamic Routes',
        exercice: 2,
        linkHref: '/workshop/challenges/expo-router-02',
        nextLinkHref: '/workshop/challenges/expo-router-03',
      },
      {
        title: '3. Protected Routes & Authentication',
        exercice: 3,
        linkHref: '/workshop/challenges/expo-router-03',
        nextLinkHref: '/workshop/challenges/expo-router-04',
      },
      {
        title: '4. Tab Navigation',
        exercice: 4,
        linkHref: '/workshop/challenges/expo-router-04',
        nextLinkHref: '/workshop/challenges/expo-router-05',
      },
      {
        title: '5. Advanced patterns',
        exercice: 5,
        linkHref: '/workshop/challenges/expo-router-05',
        nextLinkHref: '/workshop/challenges/release-01',
      },
    ],
  },
  {
    id: 'release',
    title: 'Release',
    description:
      'The releases will teach you how to publish your app to the Apple App Store and Google Play Store.',
    urlPreview:
      'https://docs.google.com/presentation/d/e/2PACX-1vR2gpbtnuYo38OGeSz1CfVKOAXSEYqNjC8mmU3ecDUEJHDHLmJlsDnWMRSzRrt2o0UG4xQMPy5m83I2/pub',
    urlPdf:
      'https://docs.google.com/presentation/d/1Qzf342LjrtXJ9IwLIKwpJKA9PQFhz6tXYamd9TvM9aQ/export/pdf',
    challenges: [
      {
        title: '1. Release with Expo Application Services',
        exercice: 1,
        linkHref: '/workshop/challenges/release-01',
        nextLinkHref: '/workshop/challenges/release-02',
      },
      {
        title: '2. Environment variable and configuration',
        exercice: 2,
        linkHref: '/workshop/challenges/release-02',
        nextLinkHref: '/workshop/challenges/release-03',
      },
      {
        title: '3. Strategies for beta testing on real device',
        exercice: 3,
        linkHref: '/workshop/challenges/release-03',
        nextLinkHref: '/workshop/challenges/hackathon',
      },
    ],
  },
  {
    id: 'hackathon',
    title: 'Hackathon',
    description:
      'The hackathon is a fun way to learn and share your knowledge.',
    challenges: [
      {
        title: 'Create a unique application',
        exercice: 1,
        linkHref: '/workshop/challenges/hackathon',
      },
    ],
  },
];
