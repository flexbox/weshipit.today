import Image from 'next/image';
import Button from '../button/button';
import gumroad from '../../assets/gumroad-thumbnail.png';
import CardGradient from '../card-gradient/card-gradient';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

/* eslint-disable-next-line */
export interface CardChecklistProps {
  cardSize: string;
  imgWidth: number;
  imgHeight: number;
  cardColor: any;
}

export function CardChecklist(props: CardChecklistProps) {
  const { cardSize, imgWidth, imgHeight, cardColor } = props;
  return (
    <CardGradient
      variant={cardColor}
      className={`m-auto flex justify-center rounded-xl bg-cover px-4 py-8 text-white sm:col-span-2 md:m-0 lg:col-span-5 lg:row-span-5 ${cardSize}`}
    >
      <a
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="gumroad.com/l/expo-checklist"
      >
        <div className="items-center">
          <Image
            src={gumroad}
            alt="Expo checklist"
            width={imgWidth}
            height={imgHeight}
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
            Checklist
          </h2>
          <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
            Never miss your store deployments with Expo.
          </p>
          <Button
            variant="ghost"
            href="https://flexbox.gumroad.com/l/expo-checklist"
            className="mt-4"
            accessoryRight={
              <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
            }
          >
            Get the checklist
          </Button>
        </div>
      </a>
    </CardGradient>
  );
}

export default CardChecklist;
