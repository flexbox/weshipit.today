import { Card, LinkButton, Prose, Text } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

export function GlossaryCTA() {
  return (
    <Card className="flex flex-col items-start" size="lg">
      <Prose>
        <h2>Unlock your app's full potential</h2>
        <p>
          Don't let your app become another statistic. 99% of apps fail due to
          poor implementation and design.
        </p>
        <p>Our React Native experts can help you:</p>
        <ul>
          <li>Optimize performance for buttery-smooth UX</li>
          <li>Create intuitive interfaces users love</li>
          <li>Accelerate development with proven patterns</li>
        </ul>

        <LinkButton
          href={linksApi?.cal?.ONBOARDING || '/contact'}
          size="xl"
          variant="primary"
          className="mt-4 w-full justify-center not-prose"
        >
          Book your consultation
        </LinkButton>

        <Text
          as="p"
          variant="c1"
          className="mt-4 text-slate-400 dark:text-slate-300 text-center"
        >
          No commitment required. Discover how we can transform your app.
        </Text>
      </Prose>
    </Card>
  );
}
