import { Button } from '@weshipit/ui';
import Image from 'next/image';

export default function FooterBook() {
  return (
    <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex-initial">
          <div className="my-4 text-lg font-semibold">
            Want to learn offline?
          </div>
          <div>
            If you like React Native Workshop, you’ll love my new book,
            <p className="font-semibold">The Road to React Native !</p>
            Throughout the book, we’ll have an overwiew of the ecosytem.
            <br /> The book comes in `PDF`, `EPUB` and `MOBI` formats.
          </div>

          <Button
            as="a"
            className="my-4 w-44"
            href="https://gumroad.com/l/road-react-native"
            isExternalLink={true}
          >
            Check it out !
          </Button>
        </div>
        <div className="w-1/3 flex-initial">
          <div className="-rotate-3 p-4">
            <Image
              src="/images/road-to-react-native-book.jpg"
              alt="Road to React Native Book"
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
