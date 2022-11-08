import { Layout } from '../components/layout';

import { Text } from '@weshipit/ui';

export default function ReactNativeApiPage() {
  return (
    <Layout withHeader withContainer>
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
