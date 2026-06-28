import { FAQPageJsonLdProps } from 'next-seo';
import * as React from 'react';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { H2, P } from '~/components/Typography';

const faqData: FAQPageJsonLdProps = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'I’m new to React Native. Will this course get me creating React Native apps quickly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This course provides you the fast track to developing your own React Native apps quickly, without spending too long on theory. Even better, it’s well-suited for people new to React Native, and who might not have extensive background in React. It’s a great resource for breaking into React Native development.',
      },
    },
    {
      '@type': 'Question',
      name: 'Isn’t React Native complicated? There are so many tools! How can I master the React Native ecosystem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This course excels at keeping things simple and straightforward, so you can focus on developing your first end to end React Native app. The course teaches you the most important libraries quickly and within the first module you’ll already have created a React Native app with some of the libraries you’ll use professionally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after I buy the course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You'll get access to the bootcamp section of the site to follow the exercises and your progression. You'll also receive an email detailing instructions on how to access the content —updates will be included regularly.",
      },
    },
    {
      '@type': 'Question',
      name: 'Understanding all of the hooks is quite challenging. Especially the non-basic Hooks and when to use them.',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I created and maintain a Cheat Sheet for React Native Hooks. You will have access to it on the site.',
      },
    },
  ],
};

export const FaqBootcamp = () => {
  return (
    <div className="py-24">
      <ProseContainer withContentContainer>
        <H2>Frequently Asked Questions</H2>
        {faqData.mainEntity.map((item, index) => {
          return (
            <details key={index} className="mb-6">
              <summary className="font-bold hover:cursor-pointer hover:text-blue-500">
                {item.name}
              </summary>
              <P>{item.acceptedAnswer.text}</P>
            </details>
          );
        })}
      </ProseContainer>
    </div>
  );
};
