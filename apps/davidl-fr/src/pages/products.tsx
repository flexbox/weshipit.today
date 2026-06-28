import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Card, CardContent, ReadingTime } from '~/components/MindMapList/style';
import Page, {
  ContentContainer,
  ContentGrid,
  SectionHeading,
  SectionImg,
} from '~/components/Page';
import {
  H1,
  H2,
  H5,
  P,
  Rarr,
  Subheading,
  TextLight,
} from '~/components/Typography';
import { NativeLink } from '~/components/Link/NativeLink';
import GlobalSeo from '~/components/SEO/GlobalSeo';

const allProducts = [
  {
    title: 'FigmaToStore',
    description:
      'I shipped dozen of apps to the Apple store and Google play. Everytime, it’s a pain to coordinate everyone. Let’s fix it with this Figma boilerplate.',
    linkUrl: 'https://figmatostore.com',
    linkTitle: 'View figmatostore.com',
  },
  {
    title: 'Road to React Native',
    description:
      'At first look, React Native can be overwhelming. This book is a collection of fundamentals to have a global picture about the ecosystem.',
    route: '/road-to-react-native',
    linkTitle: 'Dive into React Native',
  },
  {
    title: 'React Native Bootcamp',
    description:
      'Use the Star Wars API to create your first application and learn @tanstack/react-query, react-navigation and TypeScript.',
    route: '/bootcamp',
    linkTitle: 'Ship your first application',
  },
  {
    title: 'Coaching',
    description:
      'Your question requires more than 280 characters in response? It’s probably pushing into consulting territory. And that’s okay — I’m always happy to do coaching and consulting calls — but I do charge for my time.',
    route: '/coaching',
    linkTitle: 'Book a coaching session',
  },
];

const allWorkshops = [
  {
    title: 'Talks',
    description:
      'In my Hometown, I am a co-founder with some friends of a famous JavaScript meetup called ChtiJS.',
    route: '/talks',
    linkTitle: 'View talks',
  },
  {
    title: 'React Worshops 🇬🇧',
    description:
      'In 2018, I met Alex Lobera. He gave me the oportunity to teach the React, React Native and GraphQL ecosystem to other developers with his company React GraphQL Academy.',
    linkUrl: 'https://twitter.com/reactgqlacademy',
    linkTitle: 'View reactgraphql.academy',
  },
  {
    title: 'React Native Bootcamp 🇫🇷',
    description:
      'The ruby community is a small world —especially in France. I encounter Camille Roux when he started his company around Ruby on Rails. 7 years later, he hired me to teach React Native.',
    route: 'https://www.humancoders.com/formateurs/david-leuliette',
    linkTitle: 'View humancoders.com',
  },
];

const allSideProjects = [
  {
    title: 'Bab el Raid',
    description:
      'My father have a passion for an old car: the 2CV. For christmas —as a familly gift— we offered him a ticket for a race accross the desert.',
    route: '/raid',
    linkTitle: 'View',
  },
  {
    title: 'Inspiration',
    description:
      'Punchlines and quotations from tech talks or books for startups entrepreneurs. I curate the best ones and made them available on my Displate profile.',
    linkUrl: 'https://inspiration.davidl.fr/',
    linkTitle: 'View',
  },
  {
    title: 'ART au féminin',
    description:
      'My wife had a podcast idea. To get out of her comfort zone, I bought her a blue Yeti and I am giving advices about GarageBand and Podcasting.',
    linkUrl: 'https://artaufeminin.fr/',
    linkTitle: 'View artaufeminin.fr',
  },
];

function ProductItem({ item }) {
  return (
    <Card>
      <CardContent>
        <H5 style={{ marginTop: 0 }}>{item.title}</H5>
        <P>{item.description}</P>
        <ReadingTime>
          {item.linkTitle} <Rarr />
        </ReadingTime>
      </CardContent>
    </Card>
  );
}

function ProductLink({ item }) {
  return (
    <>
      {item.linkUrl ? (
        <NativeLink href={item.linkUrl}>
          <ProductItem item={item} />
        </NativeLink>
      ) : (
        <Link href={item.route} as={item.route}>
          <ProductItem item={item} />
        </Link>
      )}
    </>
  );
}

const SEO_DATA = {
  seo_title: 'Products - David Leuliette',
  seo_description:
    'My skillset includes leading design in a team of developers, product strategy and discovery, rapid prototyping & validation, user interface design, front-end and mobile development.',
  image: {
    alt: 'David Leuliette Products',
  },
};

export default function ProductsPage(): ReactElement {
  return (
    <Page withHeader withFooter>
      <GlobalSeo
        data={SEO_DATA}
        slug="/products"
        title="Products from a Front-end developer"
      />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Products</H1>
          <Subheading>
            Over the past 10 years, I worked for differents clients with a focus
            on improving design, documentation, tooling, and automated
            workflows.
          </Subheading>
        </SectionHeading>
      </ContentContainer>
      <ContentGrid defaultColumns={3}>
        {allProducts.map((item) => (
          <ProductLink item={item} key={item.title} />
        ))}
      </ContentGrid>

      <ContentContainer>
        <SectionHeading>
          <H2>Focusing my engagement on tech education</H2>
          <Subheading>
            If you want to learn something, read about it. If you want to
            understand something, write about it. If you want to master
            something, teach it.
          </Subheading>
        </SectionHeading>
      </ContentContainer>
      <SectionImg
        src={`/images/david-leuliette-product.jpg`}
        alt="David Leuliette developer React Native freelance"
      />
      <TextLight>
        My talk “websites in the era of Headless CMS” at React GraphQL Academy
        Meetup in London.
      </TextLight>
      <ContentGrid defaultColumns={3}>
        {allWorkshops.map((item) => (
          <ProductLink item={item} key={item.title} />
        ))}
      </ContentGrid>

      <ContentContainer>
        <SectionHeading>
          <H2>Side projects</H2>
          <Subheading>
            I onboarded all my familly on Airtable to automate their digital
            life. If my mother is using automated funnel to get new leads for
            our kickstater, you should do the same for your business.
          </Subheading>
        </SectionHeading>
      </ContentContainer>
      <SectionImg
        src={`/images/side-projects.jpg`}
        alt="David Leuliette working on a side project"
      />
      <TextLight>
        Giving some advices about productivity and automation at Deliveroo HQ.
      </TextLight>
      <ContentGrid defaultColumns={3}>
        {allSideProjects.map((item) => (
          <ProductLink item={item} key={item.title} />
        ))}
      </ContentGrid>
    </Page>
  );
}
