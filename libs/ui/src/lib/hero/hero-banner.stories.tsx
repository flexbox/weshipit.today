import { Meta, StoryObj } from '@storybook/react';
import { HeroBanner } from './hero-banner';
import { SPOT_AVAILABILITY } from '../spot-left/spot-availability';

export default {
  component: HeroBanner,
  title: 'Hero/HeroBanner',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof HeroBanner>;

type HeroBannerStory = StoryObj<typeof HeroBanner>;

export const Default: HeroBannerStory = {
  args: {
    onboardingHref: '#',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default HeroBanner using centralized spot availability configuration.',
      },
    },
  },
};

export const NoSpotsAvailable: HeroBannerStory = {
  args: {
    onboardingHref: '#',
    teamSpotsLeft: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'HeroBanner when no spots are available - should show "Fully booked" state.',
      },
    },
  },
};

export const OneSpotLeft: HeroBannerStory = {
  args: {
    onboardingHref: '#',
    teamSpotsLeft: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'HeroBanner with only one spot remaining - creates urgency.',
      },
    },
  },
};

export const MultipleSpotsAvailable: HeroBannerStory = {
  args: {
    onboardingHref: '#',
    teamSpotsLeft: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'HeroBanner with multiple spots available.',
      },
    },
  },
};

export const WithCentralizedConfig: HeroBannerStory = {
  args: {
    onboardingHref: '#',
    // No teamSpotsLeft prop - will use SPOT_AVAILABILITY.team
  },
  parameters: {
    docs: {
      description: {
        story: `HeroBanner using the centralized configuration (${SPOT_AVAILABILITY.team} spots). This demonstrates the single source of truth pattern.`,
      },
    },
  },
};

export const AllScenarios = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">No Spots Available</h3>
        <HeroBanner onboardingHref="#" teamSpotsLeft={0} />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">One Spot Left</h3>
        <HeroBanner onboardingHref="#" teamSpotsLeft={1} />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Multiple Spots Available</h3>
        <HeroBanner onboardingHref="#" teamSpotsLeft={5} />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Centralized Config ({SPOT_AVAILABILITY.team} spots)</h3>
        <HeroBanner onboardingHref="#" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All HeroBanner scenarios in one view for easy comparison.',
      },
    },
  },
};