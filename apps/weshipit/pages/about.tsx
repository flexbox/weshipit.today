import { Hyperlink, LinkButton, Prose } from '@weshipit/ui';
import { Layout } from '../components/layout';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  {
    href: 'https://twitter.com/intent/follow?screen_name=flexbox_',
    label: 'X',
  },
  {
    href: 'https://github.com/flexbox/',
    label: 'GitHub',
  },
  {
    href: 'https://www.youtube.com/channel/UCO0X5b0mQ4eIHitXHXSFUyw?sub_confirmation=1',
    label: 'Youtube',
  },
];

export default function About() {
  return (
    <Layout
      seoTitle="About"
      seoDescription="Our philosophy is simple: the more you automate, the more you innovate. We are dedicated to creating delightful React Native applications."
      withHeader
      withFooter
      withContainer
    >
      <Prose className="my-12">
        <h1>About</h1>
        <h2>Logo</h2>
        <Image
          src="/images/weshipit.today-logo.png"
          alt={'weshipit.today logo'}
          width={100}
          height={100}
        />
        <div className="not-prose">
          <LinkButton
            href="/images/weshipit.today-logo.png"
            variant="secondary"
          >
            Download
          </LinkButton>
        </div>
        <h3>Styleguide</h3>
        <p>
          A collection of packages use to share styles and icons across websites
          and projects.
        </p>
        <div className="not-prose">
          <LinkButton
            href="https://styleguide.weshipit.today"
            variant="secondary"
          >
            Check it out
          </LinkButton>
        </div>
        <h2>Short description</h2>
        <p>
          In response to the growing demands of software development,{' '}
          <Link href="/">weshipit.today</Link> has shifted its focus to daily
          releases of React Native Apps on production.
        </p>
        <p></p>
        <h2>Long description</h2>
        <p>
          <Link href="/">weshipit.today</Link> is a remote React Native design
          and development agency based in France. We specialize in React Native,
          offering expertise in mobile design and development. Our teams build
          robust apps and contribute to libraries that drive the React Native
          movement.
        </p>
        <p>
          Our company is renowned for the Twitch show “Office Hours Des
          Pirates”, and we also organize React Native Bootcamps.
        </p>
        <h2>Links</h2>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Hyperlink href={link.href}>{link.label}</Hyperlink>
            </li>
          ))}
        </ul>
      </Prose>
    </Layout>
  );
}
