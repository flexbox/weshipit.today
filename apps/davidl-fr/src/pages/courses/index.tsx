import React from 'react';

import Page, { SectionHeading, ContentContainer } from '~/components/Page';
import { H1, Li, Subheading, Ul } from '~/components/Typography';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import Link from 'next/link';
import Newsletter from '~/components/Newsletter/Newsletter';

const SEO_DATA = {
  seo_title: 'Courses - David Leuliette',
  seo_description:
    'All my courses about React and React Native, from beginner to advanced, to release React and React Native application to production.',
  image: {
    alt: 'Courses',
  },
};

const coursesList = [
  {
    title: 'Git & GitHub 101 —introduction to version control',
    link: '/courses/git-101.html',
  },
  {
    title: 'Git & GitHub 102 —automation with GitHub cli and git Hooks',
    link: '/courses/git-102.html',
  },
  {
    title: 'Git & GitHub 103 —multiplayer collaboration',
    link: '/courses/git-103.html',
  },
  {
    title: 'How to develop 55% faster with AI using VSCode and GitHub Copilot?',
    link: '/courses/copilot.html',
  },
  {
    title: 'Universtal Styling for React apps',
    link: '/courses/tamagui.html',
  },
  {
    title: 'Job Seeking on Autopilot',
    link: '/courses/job-seeker.html',
  },
  {
    title: 'How to write a book —as a indie hacker',
    link: '/courses/book.html',
  },
  {
    title: 'Archived talks',
    link: 'https://courses.davidl.fr/programs/',
  },
  {
    title: 'Template',
    link: '/courses/template.html',
  },
];

const CoursesPage = () => {
  return (
    <Page>
      <GlobalSeo data={SEO_DATA} slug="courses" title="David Leuliette Talks" />

      <ContentContainer>
        <SectionHeading $mt="0">
          <H1>Courses</H1>
          <Subheading>
            I participate in events organized by the Meetup community and give
            talks at conferences. The slides from my presentations are publicly
            available.
          </Subheading>
          <Newsletter />
          <Ul className="list-disc">
            {coursesList.map((course) => (
              <Li key={course.title}>
                <Link href={course.link}>{course.title}</Link>
              </Li>
            ))}
          </Ul>
        </SectionHeading>
      </ContentContainer>
    </Page>
  );
};

export default CoursesPage;
