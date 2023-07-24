import Image from 'next/image';
import Button from '../button/button';
import gumroad from '../../assets/gumroad-thumbnail.png';
import CardGradient from '../card-gradient/card-gradient';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { CardImageProps } from './card-bootcamp';

export function CardChecklist({ imageSize }: CardImageProps) {
  return (
    <CardGradient
      variant="pink"
      className="flex justify-center rounded-xl bg-cover p-8 text-white"
    >
      <a
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="gumroad.com/l/expo-checklist"
      >
        <div className="items-center">
          <Image
            src={gumroad}
            alt="Expo checklist"
            width={imageSize}
            height={imageSize}
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
            as={'a'}
            variant="ghost"
            href="https://flexbox.gumroad.com/l/expo-checklist"
            className="mt-4"
            accessoryRight={
              <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 text-gray-400" />
            }
            target="_blank"
            rel="noreferrer"
          >
            Get the checklist
          </Button>
        </div>
      </a>
    </CardGradient>
  );
}

export default CardChecklist;
