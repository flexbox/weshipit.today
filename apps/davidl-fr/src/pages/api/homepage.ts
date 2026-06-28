import { FAQPageJsonLdProps } from 'next-seo';

export const faqData: FAQPageJsonLdProps = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is React Native?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React Native is a way to write mobile software for iOS and Android.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to create a Mobile Application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Short answer: 1 day. That said, it depends what are your criteria of success and your KPI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why developers love to work with React Native?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React Native has a large and active community of developers who contribute to the platform, provide support, and share knowledge, making it easier for developers to find solutions to any issues they encounter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can React Native provide a competitive advantage for building products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React Native offers a component-based architecture, which allows developers to reuse code components across different projects, resulting in more efficient development and easier maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Expo for my React Native Application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. in 2022 It's a nice tool to iterate faster and release your mobile application to the store. Think of it as a Platfom As A Service —like Heroku, Netlify or Vercel.",
      },
    },
    {
      '@type': 'Question',
      name: 'I heard about TypeScript, should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TypeScript is a superset of JavaScript that compiles to plain JavaScript. It is a great tool to use when you want to write code that is readable and maintainable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is using React Native in production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React Native is widely used in the industry, with many popular apps such as Facebook, Instagram, and Uber using it as their primary technology. This means that learning React Native can provide you with opportunities for employment and career advancement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Our company is not located in France, can you still help?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. I am a freelance based in France but I work with clients located in Berlin Germany, Bruxelles Belgium, America, Bermuda, and France. Working remotely is not an issue as long as we can sync up timezones. I am flexible and I will be glad to visit you in your offices as well, even if you are located in the other part of the world!',
      },
    },
    {
      '@type': 'Question',
      name: 'I still have questions!',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I would be happy to answer them! You can reach out to me at @flexbox_ on Twitter.',
      },
    },
  ],
};
