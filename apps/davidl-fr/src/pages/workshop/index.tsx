import Layout from '~/components/Workshop/Layout';
import React from 'react';

import { WorkshopList } from '~/components/Workshop/WorkshopList';
import { Certification } from '~/components/Workshop/Certification';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { Platform } from '~/components/Workshop/Platform';
import { WelcomeCard } from '~/components/Workshop/WelcomeCard';
import { DownloadSpacecraft } from '~/components/Workshop/DownloadSpacecraft';

const WorkshopPage = () => {
  return (
    <Layout>
      <WelcomeCard />

      <Platform />
      <ProseContainer withContentContainer>
        <WorkshopList />
        <Certification />
      </ProseContainer>
      <DownloadSpacecraft />
    </Layout>
  );
};

export default WorkshopPage;
