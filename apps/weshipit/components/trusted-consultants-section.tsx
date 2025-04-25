import Image from 'next/image';
import {
  Text,
  Prose,
  Card,
  LinkButton,
  ClientsListHomepage,
} from '@weshipit/ui';
import {
  SiGithub,
  SiApplepodcasts,
  SiSpotify,
} from '@icons-pack/react-simple-icons';

import { MicrophoneIcon } from '@heroicons/react/20/solid';

export function TrustedConsultantsSection({ clients }) {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center pt-12">
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

        <div className="pb-12">
          <ClientsListHomepage clients={clients} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <Prose size="xl">
            <h3>Community leadership that sets us apart</h3>
            <p>
              Our team doesn’t just build with React Native —we help define its
              future. We regularly share our expertise at prestigious events
              like Chain React and App.js Conf, empowering developers worldwide.
            </p>
            <ul>
              <li>Delivering workshops at major React conferences</li>
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
                We’ve made contributions to the React Native ecosystem,
                collaborating with friends like Infinite Red and Expo. Our
                open-source work demonstrates our deep technical expertise.
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

        <div className="max-w-2xl mx-auto sm:py-12">
          <Card>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/20 p-3 rounded-full dark:bg-primary/30">
                <MicrophoneIcon className="h-6 w-6 text-black dark:text-white" />
              </div>
              <div>
                <Text as="h3" variant="h4" className="mb-2">
                  Hear from our founder
                </Text>
                <Text as="p" variant="p1">
                  Listen to David Leuliette on the React Native Radio podcast
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <LinkButton
                href="https://podcasts.apple.com/us/podcast/rnr-289-real-life-react-native-david-leuliette-talks/id1058647602?i=1000647166395"
                variant="outline"
                className="flex items-center justify-center gap-2 p-4"
              >
                <SiApplepodcasts
                  className="h-6 w-6 text-[#AB42DF] dark:text-[#C856FF]"
                  aria-hidden="true"
                />
                <span>Apple Podcasts</span>
              </LinkButton>
              <LinkButton
                href="https://open.spotify.com/show/28hPRLml3FbP14FCYtlOvg"
                variant="outline"
                className="flex items-center justify-center gap-2 p-4"
              >
                <SiSpotify
                  className="h-6 w-6 text-[#1DB954] dark:text-[#1ED760]"
                  aria-hidden="true"
                />
                <span>Spotify</span>
              </LinkButton>
              <LinkButton
                href="https://reactnativeradio.com/episodes/rnr-289-real-life-react-native-david-leuliette-talks-retail-shake-scanner"
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <span className="text-2xl" aria-hidden="true">
                  🌐
                </span>
                <span className="font-medium dark:text-white">Web</span>
              </LinkButton>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
