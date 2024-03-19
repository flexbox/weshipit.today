import {
  Button,
  ClientsListHomepage,
  HeaderLinksOnboarding,
  Hyperlink,
  LinkButton,
  Prose,
  AvatarAvenger,
  AvengerStack,
} from '@weshipit/ui';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '../components/layout';
import { getAllClients } from './api/client';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { linksApi } from './api/links';

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

export default function AboutPage({ clients }) {
  const currentYear = new Date().getFullYear();
  return (
    <Layout
      seoTitle="About"
      seoDescription="Our philosophy is simple: the more you automate, the more you innovate. We are dedicated to creating delightful React Native applications."
      withFooter
      withAccessoryRight={<HeaderLinksOnboarding />}
    >
      <Prose className="m-auto my-16">
        <h1>You might already know us</h1>
        <p>
          We are software developer, product makers, growth hackers, with a
          focus on engineering community best practices.
        </p>
        <p>
          We have written code for startups, established companies, and even
          French Institutions.
        </p>
        <blockquote>
          <p>Automation has always helped people write code.</p>
        </blockquote>
      </Prose>
      <div className="m-auto my-24 w-3/4">
        <ClientsListHomepage clients={clients} />
      </div>
      <div className="m-auto my-24 flex justify-center">
        <Button
          variant="primary"
          href={linksApi.cal.CONSULTATION}
          size="xxl"
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
        >
          Schedule an appointment
        </Button>
      </div>
      <Prose className="m-auto my-12">
        <h2>Hire top React Native developers</h2>
        <p>
          Our experience and expertise let us build the scalable TypeScript
          applications and long-term partnerships. As indie hackers, we ship
          apps from inception to production. For us, the developer experience is
          as important as the user experience. If both sparks joy, your dream
          client will become happy.
        </p>
        <p>
          In {currentYear} finding JavaScript developers is easy, but finding
          the developer you need in the React Native ecosystem is way harder.
        </p>
        <p>You dont know where to start..</p>
        <p>The good news is, you are in the right place.</p>
      </Prose>
      <div className="my-24 w-screen bg-white py-32  dark:bg-slate-900">
        <Prose className="m-auto mb-12">
          <h2>Hiring is hard and time-consuming</h2>
          <p>
            <a href="https://gum.co/job-hunt-automation">
              After successfully hacked LinkedIn
            </a>
            , David has more than 15000+ contacts on the platform. He realised
            that HR and talent managers are broken because it’s hard to be
            up-to-date in the JavaScript ecosystem. That’s why he decided to
            automate the onboarding of new clients. It’s a win-win situation
            because he can spend more time on shipping applications and less
            time reading emails.
          </p>
        </Prose>
        <div className="mx-auto flex flex-col justify-between md:mx-8 md:flex-row dark:text-white">
          <div className="m-auto w-3/4 md:w-1/2">
            <h3 className="mb-8 mr-8 pt-8 text-center text-3xl font-bold">
              David contributions
            </h3>
            <Image
              src="https://ghchart.rshah.org/409ba5/flexbox"
              alt="Open source contributions by David Leuliette"
              width={700}
              height={100}
            />
          </div>
          <div className=" m-auto w-3/4 md:w-1/2">
            <h3 className="mb-8 mr-8 pt-8 text-center text-3xl font-bold">
              Matthys contributions
            </h3>
            <Image
              src="https://ghchart.rshah.org/409ba5/matthysdev"
              alt="Open source contributions by David Leuliette"
              width={700}
              height={100}
            />
          </div>
        </div>
      </div>
      <Prose className="m-auto my-12">
        <h2>Reduce risks</h2>
        <p>
          Working with us, you can always be sure the project will be delivered.
          We keep monitoring our performance to ensure you’re satisfied.
          Everything we do is tracked on Togglr
          <a href="https://github.com/flexbox/react-native-bootcamp/pull/35/files">
            associated with the GitHub issue number.
          </a>
          <blockquote>
            <p>Hiring freelancers has never been so easy</p>
          </blockquote>
        </p>
      </Prose>
      <div className="flex justify-center py-12">
        <Button
          variant="primary"
          href="https://airtable.com/shryVoJ3nzyeq2P4s"
          size="xxl"
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
        >
          Schedule an appointment
        </Button>
      </div>
      <Prose className="m-auto my-12">
        <h2>Our story</h2>
        <p>
          David has been working as a freelancer since 2017. He delivered
          bootcamps at the university for 300+ students. One day, he decided to
          hire one of them to pass on his skills and working methods.
        </p>
        <p>
          Matthys is working with David since September 2021. In the meantime,
          he continues his studies to get his computer science degree (even if
          we know that GitHub contributions are more important).
        </p>
        <p>
          We have been working together for more than {currentYear - 2022} years
          now using up-to-date tools and sharing our knowledge about them during
          different talks
        </p>
        <LiteYouTubeEmbed
          id="gkUABRFKoXs"
          title="Design system in React Native"
        />
        <br />
        <LiteYouTubeEmbed
          id="rQzVtOhz6O0"
          title="Comment faire une application full-stack avec React Native et GraqhQL"
        />
        <br />
      </Prose>
      <div className="my-24 w-screen bg-white py-32  dark:bg-slate-900">
        <Prose className="m-auto mb-12">
          <h2>Tech stack</h2>
          <p>
            We are a team of React Native developers who trainned 50+ developers
            during bootcamps, more than 50 students have this courses.
          </p>
          <AvengerStack />
        </Prose>
      </div>
      <Prose className="m-auto my-12">
        <h2 className="text-center">Let’s make something great together</h2>
        <h3 className="text-center">Your next coworkers</h3>
      </Prose>
      <div className="m-auto mb-16 flex h-48 w-1/3 flex-row justify-around">
        <AvatarAvenger
          email={'dleuliette@gmail.com'}
          emailhover={'dleuliette+tony@gmail.com'}
          username={'@flexbox'}
          githubUrl={'https://github.com/flexbox'}
        />
        <AvatarAvenger
          email={'ducrocq.matthys@gmail.com'}
          emailhover={'ducrocq.matthys+spiderman@gmail.com'}
          username={'@MatthysDev'}
          githubUrl={'https://github.com/MatthysDev'}
        />
      </div>
      <Prose className="m-auto my-12">
        <p>
          Imagine meeting Tony Stark in real life, that’s how David works. He
          always have a nice piece of technology to solve your problem.
        </p>
        <p>
          Like Spiderman, Matthys can adapt to the situation to find the right
          way to resolve your problem.
        </p>
        <h3 className="mt-24 text-center">
          Let’s talk about your next project. We’ll reply to your message within
          24 hours. ✌️
        </h3>
      </Prose>
      <div className="flex justify-center py-12">
        <Button
          variant="primary"
          href={linksApi.cal.CONSULTATION}
          size="xxl"
          as="a"
          isExternalLink
          withExternalLinkIcon={false}
        >
          Schedule an appointment
        </Button>
      </div>
      <div className="my-24 w-screen bg-white py-32  dark:bg-slate-900">
        <Prose className="m-auto my-12">
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
            A collection of packages use to share styles and icons across
            websites and projects.
          </p>
          <div className="not-prose">
            <LinkButton
              href="https://design.weshipit.today"
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
            and development agency based in France. We specialize in React
            Native, offering expertise in mobile design and development. Our
            teams build robust apps and contribute to libraries that drive the
            React Native movement.
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
      </div>
    </Layout>
  );
}

AboutPage.getInitialProps = async function () {
  const clients = await getAllClients();
  return clients;
};
