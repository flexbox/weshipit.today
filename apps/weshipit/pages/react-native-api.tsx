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
      <iframe
        src="https://airtable.com/embed/shrcF4Xn27rhIZVCs/tblpNvaodZH5S99le"
        width={1200}
        height={3000}
      />
    </Layout>
  );
}
