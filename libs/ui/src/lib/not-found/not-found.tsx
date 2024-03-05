import { Text } from '../text/text';
import { LinkButton } from '../button/link-button';
export interface NotFoundProps {}

export function NotFound(props: NotFoundProps) {
  return (
    <div className="m-auto mb-64 w-2/3 py-24">
      <Text variant="h2" as="h1" className="mb-12">
        Oh oh. There is nothing to see here.
      </Text>
      <Text variant="p2" as="p" className="mb-12">
        The page you requested does not exist.
      </Text>
      <LinkButton href="/" size="xl">
        Go back to homepage
      </LinkButton>
    </div>
  );
}

export default NotFound;
