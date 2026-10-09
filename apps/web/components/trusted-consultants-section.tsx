import Image from 'next/image';
import { Text, Prose, Card, LinkButton } from '@weshipit/ui';
import { SiGithub } from '@icons-pack/react-simple-icons';

export function TrustedConsultantsSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center py-12">
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
              Our team doesn’t just build with React Native —we help define its
              future. We share our expertise at prestigious events like Chain
              React and React Summit, empowering developers worldwide.
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
                className="w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
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
                className="w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
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
              <div className="flex items-center gap-3">
                <SiGithub className="h-5 w-5 text-muted-foreground" />
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
                variant="outline"
              >
                View our open source work
              </LinkButton>
            </Prose>
          </div>
        </div>
      </div>
    </section>
  );
}
