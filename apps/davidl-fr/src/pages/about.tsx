import styled from 'styled-components';
import React from 'react';
import Page, {
  SectionHeading,
  SectionImg,
  ContentContainer,
} from '~/components/Page';
import {
  H1,
  P,
  Ul,
  Li,
  Subheading,
  TextLight,
  H2,
} from '~/components/Typography';
import { courses } from '~/pages/api/data';
import { Container as NewsletterContainer } from '~/components/Newsletter/style';

import { NativeLink } from '~/components/Link/NativeLink';
import { ContributionImg } from '~/components/Page/style';
import Link from 'next/link';
import defaultTheme from '~/components/Theme';
import Image from 'next/legacy/image';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { allShows } from '~/pages/api/shows';
import { PreviewImage } from '~/components/Blog/List/style';

const LogosContainer = styled.div`
  svg {
    filter: grayscale(100%);
    transition: all ${defaultTheme.animations.hover};
    opacity: 0.4;

    &:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
`;

const SEO_DATA = {
  seo_title: 'About - David Leuliette',
  seo_description:
    'My skillset includes leading design in a team of developers, product strategy and discovery, rapid prototyping & validation, user interface design, front-end and mobile development.',
  image: {
    alt: 'About David Leuliette React Native Developer',
  },
};

const LogosDesign = () => (
  <LogosContainer className="flex w-full items-center">
    <div className="p-4">
      <Image
        src={'https://www.vectorlogo.zone/logos/figma/figma-icon.svg'}
        alt={'figma'}
        width={32}
        height={32}
      />
    </div>
    <div className="p-4">
      <Image
        src={
          'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg'
        }
        alt={'tailwind css'}
        width={32}
        height={32}
      />
    </div>
    <div className="p-4">
      <Image
        src={
          'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_storybook.svg'
        }
        alt={'storybook'}
        width={32}
        height={32}
      />
    </div>
  </LogosContainer>
);

const LogosTech = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between py-8">
        <Image
          src={'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg'}
          alt={'git'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg'
          }
          alt={'html5'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg'
          }
          alt={'css3'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
          }
          alt={'javascript'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
          }
          alt={'typescript'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg'
          }
          alt={'react'}
          width={32}
          height={32}
        />
        <svg viewBox="0 0 128 128" className="h-8 fill-black dark:fill-white">
          <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"></path>
        </svg>
        <Image
          src={'https://www.vectorlogo.zone/logos/gatsbyjs/gatsbyjs-icon.svg'}
          alt={'gatsby'}
          width={32}
          height={32}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <Image
          src={'https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg'}
          alt={'graphql'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg'
          }
          alt={'tensorflow'}
          width={32}
          height={32}
        />
        <Image
          src={'https://docs.amplify.aws/assets/logo-dark.svg'}
          alt={'amplify'}
          width={32}
          height={32}
        />
        <Image
          src={'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg'}
          alt={'netlify'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg'
          }
          alt={'ruby'}
          width={32}
          height={32}
        />
        <Image
          src={
            'https://raw.githubusercontent.com/devicons/devicon/master/icons/rails/rails-original-wordmark.svg'
          }
          alt={'rails'}
          width={32}
          height={32}
        />
        <svg viewBox="0 0 128 128" className=" h-8 fill-black dark:fill-white">
          <path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137-.138.44-2.607 8.916-8.597 17.669-5.178 7.568-10.553 15.108-19.018 15.266-8.318.152-10.993-4.934-20.504-4.934-9.508 0-12.479 4.776-20.354 5.086-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571 8.024-.153 15.598 5.398 20.503 5.398 4.902 0 14.106-6.676 23.782-5.696 4.051.169 15.421 1.636 22.722 12.324-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836-6.254.251-13.816 4.167-18.301 9.416-4.02 4.647-7.54 12.087-6.591 19.216 6.971.54 14.091-3.542 18.43-8.796"></path>
        </svg>
        <Image
          src={'https://www.vectorlogo.zone/logos/android/android-icon.svg'}
          alt={'android'}
          width={32}
          height={32}
        />
      </div>
    </>
  );
};

const LastYoutubeVideo = () => {
  const lastThreeShows = allShows.slice(-3);
  return (
    <div className="mb-24 grid grid-flow-col gap-8">
      {lastThreeShows.map((show) => {
        return (
          <NativeLink href={show.url} key={show.id}>
            <PreviewImage loading="lazy" src={show.thumbnailUrl} />
          </NativeLink>
        );
      })}
    </div>
  );
};

export default function AboutPage() {
  return (
    <Page withHeader withFooter>
      <GlobalSeo
        data={SEO_DATA}
        slug="about"
        title="Freelance JavaScript developer living in France, where he works with startups and companies to build their products"
      />

      <ContentContainer>
        <SectionHeading mt="0">
          <H1>
            Work with <br />a trusted partner
          </H1>
          <Subheading>
            I’m an experienced software developer and have been programming
            since childhood. I’ve written code for startups, established
            companies, and even French Institutions.
          </Subheading>
        </SectionHeading>
      </ContentContainer>
      <SectionImg
        src={`/images/about.jpg`}
        alt="David Leuliette developer React Native freelance"
      />
      <TextLight className="mb-12">
        Here is a picture of me and my wife, on our way to the base camp
        Everest.
      </TextLight>
      <ProseContainer withContentContainer>
        <P>
          I work remotely (GMT+01:00 Europe/Paris),{' '}
          <strong>ship software that sparks joy to production</strong>, and{' '}
          <Link href="/talks">give talks</Link> about it.
        </P>
        <P>
          My skillset includes leading design in a team of developers, product
          strategy and discovery, rapid prototyping & validation, user interface
          design, front-end and mobile development.
        </P>
        <H2>The more you automate, the more you innovate</H2>
        <P>
          As a mobile software developer, I curate all of the tools I use on my{' '}
          <NativeLink href="https://github.com/flexbox/macos-front-end">
            effective front-end developer with macOS repository
          </NativeLink>
          .
        </P>
        <P>
          I have experience building and{' '}
          <strong>shipping products from scratch to production</strong>, and
          releasing them to the the Apple app store and Google Play Store. This
          includes:
        </P>
        <ul>
          <li>designing UI</li>
          <li>simplifying onboarding UX —because millisecond matters</li>
          <li>creating entire design system from Figma</li>
          <li>writing TypeScript code with documentation</li>
          <li>automating QA with unit tests</li>
          <li>creating monorepo architecture with productive DX</li>
        </ul>
        <P>
          and helping thousands of{' '}
          <Link href="/bootcamp">developers grow during bootcamps</Link>.
        </P>
        <P>
          I use a <strong>lean approach to product design</strong>, relying on
          research and data to guide design decisions early in the process. I
          continuously validate assumptions and iterate with engineers and
          product stakeholders.
        </P>
        <P>
          I’ve also lead product teams to ship complex products end-to-end. You
          can take a look at my{' '}
          <NativeLink href="https://github.com/flexbox/">
            GitHub profile
          </NativeLink>{' '}
          for examples of my work, including products I have built and code I
          have written.
        </P>
        <h2>Design skillset</h2>
        <ul>
          <li>Delightful UX/UI Design</li>
          <li>I am a developer focused on design engineering</li>
          <li>
            Building{' '}
            <Link href="/blog/react-navigation-object-storybook">
              Design System with Storybook
            </Link>
          </li>
          <li>Mobile & Responsive Design</li>
        </ul>
        <LogosDesign />
        <h2>Development Background</h2>
        <ul>
          <li>
            Primarily front-end: HTML, CSS, CSS-in-JS, TypeScript and React
          </li>
          <li>Familiar with backend: Ruby on Rails, Node.js, GraphQL</li>
          <li>Universal apps for iOS, Android and web with React Native</li>
          <li>Monorepo architecture with nx</li>
        </ul>
        <LogosTech />
        <h2>Teaching experiences</h2>
        <ul>
          <li>At University: “How to use git and GitHub”</li>
          <li>
            Design and Front-end teacher during{' '}
            <a href="https://www.lewagon.com/">le wagon bootcamp</a>
          </li>
          <li>
            As a{' '}
            <NativeLink href="https://twitter.com/reactgqlacademy">
              React GraphQL Academy
            </NativeLink>{' '}
            coach: Helping devlopers to masterise the React and Graphql
            ecosystem.
          </li>
          <li>
            During my <Link href="/bootcamp">React Native Bootcamp</Link>.
          </li>
        </ul>
        <h2>Workshops and talks</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <NativeLink href={course.link}>{course.title}</NativeLink>
            </li>
          ))}
        </ul>
      </ProseContainer>

      <ProseContainer withContentContainer style="mt-12">
        <h2>Youtube Show</h2>
        <p className="mb-8">
          I am in the YouTube game to speak to a younger version of myself,
          because I wish I had someone like me to learn from when I was learning
          how to create software.
        </p>
      </ProseContainer>
      <LastYoutubeVideo />
      <ProseContainer withContentContainer>
        <h2>Open source contributions</h2>
        <p>
          I signed and follow the mozilla manifesto since 2010.
          <br />
          <em>
            Free and open source software promotes the development of the
            internet as a public resource.
          </em>
        </p>

        <ContributionImg
          src="https://ghchart.rshah.org/409ba5/flexbox"
          alt="Open source contributions by David Leuliette"
        />
      </ProseContainer>

      <ContentContainer>
        <NewsletterContainer>
          <em>
            P.S. Here are a few pages on this site that aren’t included in the
            normal site navigation, but might interest you:
          </em>
          <Ul>
            <Li>
              <Link href="/contact">Contact</Link> - Contact me!
            </Li>
            <Li>
              <Link href="/uses">Uses</Link> - links to all the stuff I use
            </Li>
            <Li>
              <Link href="/featured">Featured</Link> - Podcasts/interviews/etc
              that I’ve appeared on
            </Li>
          </Ul>
        </NewsletterContainer>
      </ContentContainer>
    </Page>
  );
}
