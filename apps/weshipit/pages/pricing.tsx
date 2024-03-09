import {
  Badge,
  Button,
  Card,
  Hero,
  LinkButton,
  Prose,
  Text,
} from '@weshipit/ui';

import { linksApi } from './api/links';
import { Layout } from '../components/layout';

export default function PricingPage() {
  return (
    <Layout
      withHeader
      withFooter
      withContainer
      seoTitle="Subscription as a Service for React Native Developers"
      seoDescription="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Zero billable hours. Pause or cancel whenever."
    >
      <Hero>
        <Text as="h1" variant="h1" className="text-center">
          One flat fee.
          <br />
          Zero billable hours.
        </Text>
        <Text as="h2" variant="h3" className="text-center opacity-50">
          Pause or cancel whenever.
        </Text>
      </Hero>

      <div className="m-auto max-w-2xl flex-col">
        <div className="mb-24 mt-12 flex flex-col gap-4 text-center">
          <div className="shrink-0">
            <Badge variant="blue">First month at 50% off ✨</Badge>
          </div>
          <Button
            href={linksApi.stripe.MONTHLY_PLAN}
            as="a"
            size="xxl"
            isExternalLink
            withExternalLinkIcon={false}
            className="justify-center"
          >
            Subscribe Today
          </Button>
          <LinkButton
            variant="link"
            href="/onboarding"
            size="xl"
            className="justify-center"
          >
            Or book a call
          </LinkButton>
        </div>

        <Prose>
          <Card variant="green" className="mb-12">
            <ul>
              <li>Unlimited revisions.</li>
              <li>One request at time.</li>
              <li>No billable hours.</li>
              <li>Pause anytime.</li>
              <li>Cancel whenever.</li>
            </ul>
          </Card>

          <Card variant="red">
            <h2 className="mt-0">Do not work with us if you want</h2>
            <ol>
              <li>A quote after an initial call.</li>
              <li>The quote is then validated.</li>
              <li>
                A service contract is signed, which describes the list of tasks
                to be accomplished and includes the elements of the quote.
              </li>
              <li>The developments are then carried out.</li>
              <li>
                A delivery report is validated, which triggers the payment of
                the invoice.
              </li>
              <li>
                Finally, the intellectual property rights transfer contract is
                signed.
              </li>
            </ol>
          </Card>
        </Prose>
      </div>
    </Layout>
  );
}
