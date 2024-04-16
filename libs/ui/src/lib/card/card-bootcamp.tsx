import Image from 'next/image';
import Button from '../button/button';
import bootcampLogo from '../../assets/bootcamp.png';
import { Card } from './card';

export interface CardImageProps {
  imageSize: number;
}

export function CardBootcamp({ imageSize }: CardImageProps) {
  return (
    <Card variant="gradient-blue" size="lg">
      <a
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="https://davidl.fr/bootcamp"
      >
        <div className="items-center">
          <Image
            src={bootcampLogo}
            alt="React Native Bootcamp logo with a spaceship"
            width={imageSize}
            height={imageSize}
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h2 className="relative bg-gradient-to-b from-white to-white/75 bg-clip-text text-3xl font-bold tracking-tight text-transparent drop-shadow md:text-3xl">
            Bootcamp
          </h2>
          <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl">
            The ultimate way to learn React Native.
          </p>
          <Button
            variant="outline"
            as="a"
            href="https://davidl.fr/bootcamp"
            className="mt-4"
            isExternalLink={true}
          >
            Join the bootcamp
          </Button>
        </div>
      </a>
    </Card>
  );
}

export default CardBootcamp;
