import Image from 'next/image';
import { Button, Text, Hyperlink, Prose, Card, LinkButton } from '@weshipit/ui';
import {
  SiGithub,
  SiApplepodcasts,
  SiSpotify,
} from '@icons-pack/react-simple-icons';

import Link from 'next/link';
import { MicrophoneIcon } from '@heroicons/react/20/solid';

export function TrustedConsultantsSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 py-12">
          <Text as="h2" variant="h2" className="mb-4">
            Industry-leading React Native experts trusted by top companies
          </Text>
          <Text
            as="p"
            variant="p1"
            className="text-neutral-500 dark:text-neutral-400"
          >
            Not just consultants — we're active community leaders shaping the
            future of React Native
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <Prose size="xl">
            <h3>Community leadership that sets us apart</h3>
            <p>
              Our team doesn't just build with React Native —we help define its
              future. We regularly share our expertise at prestigious events
              like Chain React and App.js Conf, empowering developers worldwide.
            </p>
            <ul>
              <li>Regular speakers at major React Native conferences</li>
              <li>
                Conduct professional bootcamps for teams and organizations
              </li>
              <li>Recognized thought leaders in the React Native ecosystem</li>
            </ul>
          </Prose>
          <div className="space-y-4">
            <Card className="!p-0">
              <Image
                src="/images/chainreact-2023.jpg"
                alt="David Leuliette at Chain React conference with John and Mazen Chami"
                width={500}
                height={300}
                className="w-full object-cover"
              />
              <div className="p-4 bg-muted/30 dark:bg-slate-800/50">
                <Text
                  as="p"
                  variant="c1"
                  className="text-neutral-500 dark:text-neutral-400"
                >
                  David Leuliette with John Major and Mazen Chami at Chain React
                </Text>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <Card className="!p-0">
              <Image
                src="/images/appjs-2022.jpg"
                alt="David Leuliette at App.js Conf with Catalyn and Aman"
                width={500}
                height={300}
                className="w-full object-cover"
              />
              <div className="p-4 bg-muted/30 dark:bg-slate-800/50">
                <Text
                  as="p"
                  variant="c1"
                  className="text-neutral-500 dark:text-neutral-400"
                >
                  David Leuliette with Catalyn Miron and Aman Mittal at App.js
                  Conf
                </Text>
              </div>
            </Card>
          </div>
          <div className="order-1 md:order-2">
            <Prose size="xl">
              <h3>Open-source impact that builds trust</h3>
              <p>
                We've made significant contributions to the React Native
                ecosystem, collaborating with industry leaders like Facebook,
                Expo, AWS Amplify, and Infinite Red. Our open-source work
                demonstrates our deep technical expertise.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <SiGithub className="h-5 w-5 text-primary" />
                <p>
                  Contributors to @aws-amplify, @expo, @facebook, and
                  @infinitered
                </p>
              </div>
              <LinkButton
                href="https://github.com/flexbox/"
                isExternalLink
                size="xl"
                className="not-prose"
              >
                View our open source work
              </LinkButton>
            </Prose>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-muted rounded-xl p-6 md:p-8 dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/20 p-3 rounded-full dark:bg-primary/30">
                <MicrophoneIcon className="h-6 w-6 text-black dark:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold dark:text-white">
                  Hear From Our Founder
                </h3>
                <Text
                  as="p"
                  variant="p1"
                  className="text-muted-foreground dark:text-neutral-300"
                >
                  Listen to David Leuliette on the React Native Radio podcast
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="https://podcasts.apple.com/us/podcast/rnr-289-real-life-react-native-david-leuliette-talks/id1058647602?i=1000647166395"
                className="flex items-center justify-center gap-2 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 shadow-md hover:shadow-xl"
              >
                <SiApplepodcasts className="h-6 w-6 text-[#AB42DF] dark:text-[#C856FF]" />
                <span className="font-medium dark:text-white">
                  Apple Podcasts
                </span>
              </Link>
              <Link
                href="https://open.spotify.com/show/28hPRLml3FbP14FCYtlOvg"
                className="flex items-center justify-center gap-2 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 shadow-md hover:shadow-xl"
              >
                <SiSpotify className="h-6 w-6 text-[#1DB954] dark:text-[#1ED760]" />
                <span className="font-medium dark:text-white">Spotify</span>
              </Link>
              <Link
                href="https://reactnativeradio.com/episodes/rnr-289-real-life-react-native-david-leuliette-talks-retail-shake-scanner"
                className="flex items-center justify-center gap-2 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 shadow-md hover:shadow-xl"
              >
                <span className="text-2xl" aria-hidden="true">
                  🌐
                </span>
                <span className="font-medium dark:text-white">Web</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">
            Ready to work with React Native experts?
          </h3>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TrustedConsultantsSection2() {
  const URLS = [
    {
      icon: <SiApplepodcasts className="h-5 w-5 text-[#AB42DF]" />,
      platform: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/fr/podcast/le-cross-platform-show/id1790867559',
    },
    {
      icon: <SiSpotify className="h-5 w-5 text-[#1DB954]" />,
      platform: 'Spotify',
      url: 'https://open.spotify.com/show/69dZrIeMZ2S2QELCGp6gW1?nd=1&dlsi=3fe99c92beb14fc3',
    },
    {
      icon: <span className="text-xl">🌐</span>,
      platform: 'Web',
      url: 'https://weshipit.today/podcast',
    },
  ];

  return (
    <div className="mb-24 py-0 lg:py-24">
      <div className="m-auto max-w-2xl">
        <Prose size="xl">
          <h2>We're trusted React Native consultants.</h2>
          <p>
            We actively participate in the community, presenting at{' '}
            <Hyperlink href="https://davidl.fr/talks">
              meetups and conferences
            </Hyperlink>
            , as well as{' '}
            <Hyperlink href="https://davidl.fr/bootcamp">
              conducting bootcamps
            </Hyperlink>
            .
          </p>
          <Image
            src="/images/appjs-2022.jpg"
            alt="David Leuliette, at appjs conference."
            className="mb-0 w-full rounded-lg bg-neutral-100 object-cover dark:bg-neutral-800"
            width={950}
            height={559}
          />
          <small className="text-neutral-400">
            David with Catalyn and Aman at App.js Conf
          </small>
          <h3>infinite.red alchemist</h3>
          <p>
            We have made numerous open-source contributions to different
            organizations focused on react-native, such as <code>@expo</code>,{' '}
            <code>@facebook</code>, <code>@aws-amplify</code> and{' '}
            <code>@infinitered</code>.
          </p>
          <Image
            src="/images/chainreact-2023.jpg"
            alt="David Leuliette, at ChainReact conference."
            className="mb-0 w-full rounded-lg bg-neutral-100 object-cover dark:bg-neutral-800"
            width={950}
            height={559}
          />
          <small className="text-neutral-400">
            David with John and Mazen at Chain React
          </small>
          <p>
            Listen to David Leuliette, the founder of weshipit.today, on the
            React Native Radio podcast.
          </p>
          <div className="not-prose flex flex-wrap gap-4">
            {URLS.map(({ icon, platform, url }) => (
              <Button
                key={platform}
                href={url}
                as="a"
                isExternalLink
                variant="outline"
                size="lg"
                className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                {icon}
                {platform}
              </Button>
            ))}
          </div>
        </Prose>
      </div>
    </div>
  );
}
