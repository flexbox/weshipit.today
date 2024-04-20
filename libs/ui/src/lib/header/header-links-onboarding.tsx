import { StarIcon } from '@heroicons/react/24/outline';
import { Button } from '../button/button';
import { LinkButton } from '../button/link-button';

export function HeaderLinksOnboarding() {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        href="https://github.com/flexbox/weshipit.today"
        size="xl"
        as="a"
        isExternalLink
        withExternalLinkIcon={false}
      >
        <StarIcon className="mr-2 size-5" />
        Star Us on GitHub
      </Button>
      <LinkButton variant="primary" href="/" size="xl">
        Work with us
      </LinkButton>
    </div>
  );
}

export default HeaderLinksOnboarding;
