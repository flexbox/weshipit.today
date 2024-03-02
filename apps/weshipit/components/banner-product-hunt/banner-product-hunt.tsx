import { Button, Text } from '@weshipit/ui';

export function BannerProductHunt() {
  return (
    <div className="w-full bg-orange-200 py-2 dark:bg-orange-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6">
        <Text
          as="p"
          variant="p1"
          className="text-base font-bold tracking-tight !text-[#ed6c5c]"
        >
          Upvote us on Product Hunt!
          <Text as="span" variant="p2" className="mx-4">
            Help us climb the ranks and reach more people
          </Text>
        </Text>

        <Button
          variant="secondary"
          size="sm"
          as="a"
          href="https://www.producthunt.com/@flexbox"
        >
          Upvote Now
        </Button>
      </div>
    </div>
  );
}

export default BannerProductHunt;
