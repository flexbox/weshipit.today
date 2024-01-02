import Image from 'next/image';
import Button from '../button/button';
import gumroad from '../../assets/gumroad-thumbnail.png';

import { CardImageProps } from './card-bootcamp';
import { Card } from './card';

export function CardChecklist({ imageSize }: CardImageProps) {
  return (
    <Card variant="gradient-pink" size="lg">
      <a
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="https://flexbox.gumroad.com/l/expo-checklist"
      >
        <div className="items-center">
          <Image
            src={gumroad}
            alt="React Nattive Expo checklist"
            width={imageSize}
            height={imageSize}
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
            Expo Checklist
          </h2>
          <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
            Never miss your iOS and Android deployments.
          </p>
          <Button
            as={'a'}
            variant="secondary"
            href="https://flexbox.gumroad.com/l/expo-checklist"
            className="mt-4"
            isExternalLink={true}
          >
            Get the checklist
          </Button>
        </div>
      </a>
    </Card>
  );
}

export default CardChecklist;
