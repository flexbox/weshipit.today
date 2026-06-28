import React, { ReactElement } from 'react';
import Layout from '~/components/Workshop/Layout';
import MindMapList from '~/components/MindMapList';

export default function resourcesPage(): ReactElement {
  return (
    <Layout>
      <MindMapList />
    </Layout>
  );
}
