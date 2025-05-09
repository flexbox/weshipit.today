import { Avatar } from '../avatar/avatar';
import { Card } from '../card/card';
import { Prose } from '../prose/prose';
import { Text } from '../text/text';
import Image from 'next/image';
import Link from 'next/link';
import { Hyperlink } from '../hyperlink/hyperlink';

export interface BentoProps {
  auditLink: string;
  slackLink: string;
  expertLink: string;
  gumroadLink: string;
}

export function Bento({
  auditLink,
  expertLink,
  gumroadLink,
  slackLink,
}: BentoProps) {
  return (
    <div className="m-auto grid w-full grid-cols-1 gap-4 p-4 md:w-3/4 md:grid-cols-2">
      <div className="flex h-full flex-col gap-4">
        <Hyperlink href={gumroadLink} className="h-1/2" isExternal noIcon>
          <Card className="h-full overflow-hidden p-4" shadow="light">
            <Prose size="xl" className="mb-6">
              <Text>
                A new mobile application{' '}
                <strong>quickly on Apple and Google store</strong>.
              </Text>
            </Prose>
            <div className="flex w-full justify-center gap-8">
              <Image
                className="rounded-lg"
                src="/images/gumroad.jpg"
                alt="iOS and Android logos"
                width={375}
                height={150}
              />
            </div>
          </Card>
        </Hyperlink>
        <Hyperlink href={expertLink} className="h-1/2" isExternal noIcon>
          <Card className={'overflow-hidden p-4'} shadow={'light'}>
            <Prose size={'xl'} className="mb-6">
              <Text>
                To <strong>stop struggling</strong> with React Native updates.
              </Text>
            </Prose>
            <div className="flex w-full justify-center gap-8">
              <Image
                className="rounded-lg"
                src="/images/update.png"
                alt="iOS and Android logos"
                width={375}
                height={250}
              />
            </div>
          </Card>
        </Hyperlink>
      </div>
      <div className="flex h-full flex-col gap-4 ">
        <Card className={'h-full p-4'}>
          <Hyperlink
            href={expertLink}
            className="h-1/3"
            isExternal
            noIcon
            noSpanStyle
          >
            <Prose size={'xl'} className="mb-6">
              <Text>
                To <strong>regain agility</strong> to evolve my application
                quickly.
              </Text>
            </Prose>
            <div className="flex justify-end gap-8">
              <Text variant="h2" className="pr-4 pt-0 md:pt-4">
                🚀
              </Text>
            </div>
          </Hyperlink>
        </Card>
        <div className="flex h-1/3 w-full gap-4">
          <Card shadow="light" className="w-1/2">
            <Hyperlink
              href={expertLink}
              className="size-full p-4"
              isExternal
              noIcon
              noSpanStyle
            >
              <Prose size={'xl'} className="mb-0 md:mb-6">
                <Text>
                  Talk to <strong>experts</strong>
                </Text>
              </Prose>
              <div className="relative mx-auto flex h-[164px] w-full flex-col-reverse items-center justify-center sm:h-[124px] md:flex-row">
                <Avatar
                  className="size-[64px] rounded-full border-4 border-white bg-slate-300 md:size-auto dark:bg-slate-700"
                  size={80}
                  email="ducrocq.matthys@gmail.com"
                  name="Matthys Ducrocq"
                />
                <Avatar
                  className="-mb-4 size-[64px] rounded-full border-4 border-white bg-slate-300 md:-mb-0 md:-ml-4 md:mr-4 md:size-auto dark:bg-slate-700"
                  size={80}
                  email="dleuliette@gmail.com"
                  name="David Leuliette"
                />
              </div>
            </Hyperlink>
          </Card>
          <Hyperlink
            href={slackLink}
            className="w-1/2"
            isExternal
            noIcon
            noSpanStyle
          >
            <Card className={`relative h-full`} shadow={'light'}>
              <div className="mb-6 flex flex-col gap-2">
                <Text>
                  <strong>Slack</strong>
                </Text>
                <Text variant="p2">
                  No emails here! Responsive and more human exchanges.
                </Text>
              </div>
              <div className="absolute bottom-4 right-4">
                <Image
                  src="/images/slack.png"
                  alt="slack logo"
                  className="size-[32px] md:size-auto"
                  width={40}
                  height={40}
                />
              </div>
            </Card>
          </Hyperlink>
        </div>
        <Link href={auditLink} className="h-1/3">
          <Card className={`p-4`} shadow={'light'}>
            <Prose size={'xl'} className="mb-6">
              <Text>
                To <strong>quickly migrate</strong> an application to React
                Native.
              </Text>
            </Prose>
            <div className="flex gap-8">
              <Image
                className="rounded-xl p-2 dark:bg-white"
                src="/images/expo-logo.png"
                alt="iOS and Android logos"
                width={175}
                height={75}
              />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Bento;
