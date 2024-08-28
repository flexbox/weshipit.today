import Gravatar from 'react-gravatar';
import { Card } from '../card/card';
import { Prose } from '../prose/prose';
import { Text } from '../text/text';
import Image from 'next/image';

export function Bento() {
  return (
    <div className="m-auto grid w-full grid-cols-1 gap-4 p-4 md:w-3/4 md:grid-cols-2">
      <div className="flex h-full flex-col gap-4">
        <Card className="h-1/2 overflow-hidden p-4">
          <Prose size={'xl'} className="mb-6">
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
        <Card className="h-1/2 overflow-hidden p-4">
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
      </div>
      <div className="flex h-full flex-col gap-4">
        <Card className="h-1/4 p-4  md:h-1/3">
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
        </Card>
        <div className="flex h-1/3 w-full gap-4">
          <Card variant={'gradient-purple-dark'} className="w-1/2 p-4">
            <Prose size={'xl'} className="mb-0 md:mb-6">
              <Text>
                Talk to <strong>experts</strong>
              </Text>
            </Prose>
            <div className="relative mx-auto flex h-[164px] w-full flex-col-reverse items-center justify-center sm:h-[124px] md:flex-row">
              <Gravatar
                className="size-[64px] rounded-full border-4 border-white bg-slate-300 md:size-auto dark:bg-slate-700"
                size={80}
                email="ducrocq.matthys@gmail.com"
              />
              <Gravatar
                className="-mb-4 size-[64px] rounded-full border-4 border-white bg-slate-300 md:-mb-0 md:-ml-4 md:mr-4 md:size-auto dark:bg-slate-700"
                size={80}
                email="dleuliette@gmail.com"
              />
            </div>
          </Card>
          <Card className="w-1/2 p-4">
            <div className="mb-6 flex flex-col gap-2">
              <Text>
                <strong>Slack !</strong>
              </Text>
              <Text variant="c2">
                No emails here! Responsive and more human exchanges
              </Text>
            </div>
            <div className="flex justify-end gap-8 md:h-auto md:w-full">
              <Image
                src="/images/slack.png"
                alt="slack logo"
                className="size-[32px] md:size-auto"
                width={40}
                height={40}
              />
            </div>
          </Card>
        </div>
        <Card className="h-1/3 p-4">
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
      </div>
    </div>
  );
}

export default Bento;
