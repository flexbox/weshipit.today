import { Layout } from '../components/layout';

import { Text } from '@weshipit/ui';

export default function ReactNativeApiPage() {
  return (
    <Layout
      withHeaderButton
      headerButtonHref="https://airtable.com/shrKPA2DGcG8xnQGG"
      withContainer
    >
      <div className="py-24">
        <Text variant="h3" style="py-4">
          React Native API
        </Text>
        <Text variant="s2" style="mb-4">
          Here is the list of all the React Native API.
        </Text>
      </div>
    </Layout>
  );
}
