import React, { ReactElement } from 'react';
import { StatsItems } from '~/components/Workshop/StatsItems';
import { statsLabels } from '~/components/Workshop/formatStats';

export function StatsSkeleton(): ReactElement {
  return (
    <StatsItems
      stats={[
        { name: statsLabels.completed, stat: '…' },
        { name: statsLabels.progress, stat: '…' },
      ]}
    />
  );
}
