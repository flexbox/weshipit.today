import { render } from '@testing-library/react';
import { AppBadge, Card, Prose, Text } from '@weshipit/ui';

import { frenchAppsFixture } from './french-apps.fixture';
import { formatAppsByCategory } from './format-apps-by-category';
import Image from 'next/image';

describe('French Apps', () => {
  it('should render a list of items', () => {
    const categorizedApps = formatAppsByCategory(frenchAppsFixture);
    const { baseElement } = render(
      <div>
        {' '}
        {categorizedApps.map((category) => (
          <div key={category.category}>
            <Text variant={'h4'} as={'h2'} className="mb-8 mt-12 capitalize">
              {category.category}
            </Text>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.apps.map((app) => (
                <Card key={app.name} size={'md'}>
                  <Prose>
                    <Image
                      src={app.logo_url}
                      width={96}
                      height={96}
                      alt={app.name}
                      className="rounded-lg"
                    />
                    <div className="mb-4 flex justify-start gap-4">
                      <AppBadge link={app.website_url} />
                      {app.ios_url && <AppBadge link={app.ios_url} iOS />}
                      {app.android_url && (
                        <AppBadge link={app.android_url} android />
                      )}
                    </div>
                    <h3 className="mt-0">{app.name}</h3>
                    <p>{app.category}</p>
                  </Prose>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
    expect(baseElement).toBeTruthy();
  });
});
