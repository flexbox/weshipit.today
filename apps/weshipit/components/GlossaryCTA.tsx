import { Card, LinkButton, Prose, Text } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

type GlossaryCTAVariant = 'default' | 'gradient';

interface GlossaryCTAProps {
  variant?: GlossaryCTAVariant;
}

export function GlossaryCTA({ variant = 'default' }: GlossaryCTAProps) {
  if (variant === 'gradient') {
    return (
      <Card
        size="xl"
        className="flex flex-col items-start"
        variant="gradient-blue"
      >
        <Text
          variant="h4"
          as="h2"
          className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-bold tracking-tight text-transparent drop-shadow"
        >
          React Native Expertise
        </Text>
        <Text
          variant="p1"
          as="p"
          className="bg-gradient-to-b from-white to-white/75 bg-clip-text tracking-tight text-transparent drop-shadow"
        >
          Make your app stand out from the crowd with professional assistance.
          We can help with:
        </Text>
        <ul className="mt-4 space-y-2 text-white">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Expert advice on React Native development</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Performance optimization</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>UX/UI improvements</span>
          </li>
        </ul>
        <div className="mt-6 w-full">
          <LinkButton
            href={linksApi?.cal?.ONBOARDING || '/contact'}
            size="xl"
            variant="outline"
            className="mt-4 w-full justify-center"
          >
            Book a Free Consultation
          </LinkButton>
        </div>
      </Card>
    );
  }

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
