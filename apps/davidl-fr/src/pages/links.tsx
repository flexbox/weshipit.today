import React from 'react';
import Page from '~/components/Page';
import Avatar from '~/components/Avatar';
import { H4, H5, P } from '~/components/Typography';
import { Button } from '~/components/Button/style';
import { NativeLink } from '~/components/Link/NativeLink';
import GlobalSeo from '~/components/SEO/GlobalSeo';
import Link from 'next/link';
import PrimaryButton from '~/components/Button/PrimaryButton';

const SEO_DATA = {
  seo_title: 'Automating React Native stuff to build more.',
  seo_description: 'How to reach me',
  image: {
    alt: 'David Leuliette Links',
  },
};

export default function LinksPage() {
  return (
    <Page>
      <GlobalSeo data={SEO_DATA} slug="links" title="David Leuliette Links" />

      <div className="mb-4">
        <Avatar />
      </div>
      <H4>David Leuliette ⚡</H4>
      <P>Automating stuff to build more.</P>
      <div className="mt-12 text-center">
        <H5>Products</H5>
        <NativeLink href="https://flexbox.gumroad.com/l/road-react-native/HELLO_FRIEND">
          <Button className="mt-4 h-12 w-80">The Road to React Native</Button>
        </NativeLink>
        <NativeLink href="https://flexbox.gumroad.com/l/job-hunt-automation/HELLO_FRIEND">
          <Button className="mt-4 h-12 w-80">Job Hunt Automation</Button>
        </NativeLink>
        <NativeLink href="https://displate.com/flexbox?art=5de0d8e5f393a">
          <Button className="mt-4 h-12 w-80">
            Best French Artists Punchlines
          </Button>
        </NativeLink>
        <NativeLink href="https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1">
          <Button className="mb-12 mt-4 h-12 w-80">
            Office Hours Des Pirates
          </Button>
        </NativeLink>
        <H5 className="mt-4">Story</H5>
        <Link href="/talks">
          <Button className="mt-4 h-12 w-80">Talks and Workshops</Button>
        </Link>
        <NativeLink href="https://mindnode.com/post/user-story-david">
          <Button className="mt-4 h-12 w-80">
            How David Develops with Mind Maps
          </Button>
        </NativeLink>
        <NativeLink href="https://workspiration.org/david-leuliette">
          <Button className="mb-12 mt-4 h-12 w-80">
            Q&A with David Leuliette
          </Button>
        </NativeLink>
        <H5 className="mt-4">Find me</H5>
        <Link href="/onboarding">
          <PrimaryButton className="mt-4 h-12 w-80">
            Work with David
          </PrimaryButton>
        </Link>
        <NativeLink href="https://twitter.com/intent/follow?screen_name=flexbox_">
          <Button className="mt-4 h-12 w-80">X</Button>
        </NativeLink>
        <NativeLink href="https://github.com/flexbox">
          <Button className="mt-4 h-12 w-80">GitHub</Button>
        </NativeLink>
        <NativeLink href="https://www.producthunt.com/@flexbox">
          <Button className="mt-4 h-12 w-80">ProductHunt</Button>
        </NativeLink>
      </div>
    </Page>
  );
}
