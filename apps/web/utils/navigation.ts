import type { HeaderLinksProps } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

export const headerNavigation: HeaderLinksProps[] = [
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources' },
  { name: 'Podcast', href: '/podcast' },
  { name: 'Pricing', href: '/pricing' },
];

export const headerCallToActionButton: HeaderLinksProps = {
  name: 'Book a call',
  href: linksApi.cal.ONBOARDING,
  isExternalLink: true,
};

export const servicesLinks = [
  { name: 'Subscription Dev', href: '/' },
  { name: 'Consulting', href: '/services/consulting' },
  { name: 'React Native Audit', href: '/services/audit' },
];

export const resourcesLinks = [
  { name: 'React Native Tools', href: '/resources/react-native-tools' },
  { name: 'Dev Tools', href: '/resources/dev-tools' },
  { name: 'React Native Starters', href: '/resources/react-native-starters' },
  { name: 'Migration Guide', href: '/resources/react-native-migration' },
  { name: 'React Native Glossary', href: '/resources/react-native-glossary' },
  { name: 'Learning Hub', href: '/resources/learn' },
  { name: 'French RN Apps', href: '/resources/french-apps' },
];

export const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Customers', href: '/customers' },
  { name: 'Podcast', href: '/podcast' },
  { name: 'Plan', href: '/plan' },
  { name: 'Contact', href: '/contact' },
  {
    name: 'Sponsorship',
    href: 'https://github.com/sponsors/flexbox?frequency=one-time&sponsor=flexbox',
  },
  {
    name: 'Jobs',
    href: 'https://flexbox.notion.site/Jobs-1c65e7a956a64a07b60a401f8747f1af',
  },
];

export const legalLinks = [
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
];
