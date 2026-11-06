// Exported from Prismic (weshipit repo) on 2026-11-02. Edit here, Prismic is no longer the source of truth.
import type { LocalImage } from './types';

export interface Customer {
  id: string;
  data: {
    id: string;
    name: string;
    industry?: string;
    is_visible_homepage: boolean;
    is_audit: boolean;
    logo?: LocalImage;
  };
}

export const clients: Customer[] = [
  {
    data: {
      id: 'react-grahql-academy',
      industry: 'Education',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'React GraphQL Academy logo',
        height: 250,
        url: '/images/clients/react-grahql-academy.svg',
        width: 250,
      },
      name: 'React GrahQL Academy',
    },
    id: 'Y3TsrxAAACYAxPjM',
  },
  {
    data: {
      id: 'axa',
      industry: 'Insurance',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Axa Insurance logo',
        height: 250,
        url: '/images/clients/axa.svg',
        width: 250,
      },
      name: 'Axa',
    },
    id: 'Y0aMWREAACIAq24h',
  },
  {
    data: {
      id: 'smart-pension',
      industry: 'Fintech',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Smartpension logo',
        height: 250,
        url: '/images/clients/smart-pension.svg',
        width: 250,
      },
      name: 'Smart Pension',
    },
    id: 'Y3Ts5BAAACUAxPnN',
  },
  {
    data: {
      id: 'universite-du-littoral-cote-dopale',
      industry: 'Education',
      is_audit: false,
      is_visible_homepage: false,
      logo: {
        alt: 'Université du littoral Logo',
        height: 250,
        url: '/images/clients/universite-du-littoral-cote-d-opale.svg',
        width: 250,
      },
      name: "Université du Littoral-Côte-d'Opale",
    },
    id: 'Y3TtLhAAACcAxPsZ',
  },
  {
    data: {
      id: 'mahalo-banking',
      industry: 'Fintech',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'mahalo BANKING logo',
        height: 250,
        url: '/images/clients/mahalo-banking.svg',
        width: 250,
      },
      name: 'Mahalo Banking',
    },
    id: 'Y1Z5PxEAAF5w8n4J',
  },
  {
    data: {
      id: 'm6',
      industry: 'Media',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'M6 media logo',
        height: 250,
        url: '/images/clients/m6.svg',
        width: 250,
      },
      name: 'M6',
    },
    id: 'Y0aOKhEAACQAq3aN',
  },
  {
    data: {
      id: 'retail-shake',
      industry: 'Retail',
      is_audit: false,
      is_visible_homepage: false,
      logo: {
        alt: '',
        height: 250,
        url: '/images/clients/retail-shake.svg',
        width: 250,
      },
      name: 'Retail Shake',
    },
    id: 'Y1Z6HhEAAF5w8oIU',
  },
  {
    data: {
      id: 'spark-dating',
      industry: 'Dating',
      is_audit: true,
      is_visible_homepage: false,
      logo: {
        alt: 'Spark Speed Dating app logo',
        height: 250,
        url: '/images/clients/spark-dating.svg',
        width: 250,
      },
      name: 'Spark Dating',
    },
    id: 'Z_5F8xEAACgAp4LC',
  },
  {
    data: {
      id: 'plantura',
      industry: 'Gardening',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Plantura garden logo',
        height: 250,
        url: '/images/clients/plantura.svg',
        width: 250,
      },
      name: 'Plantura',
    },
    id: 'Y3TslxAAACgAxPha',
  },
  {
    data: {
      id: 'nacon',
      industry: 'Gaming',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Nacon gaming logo',
        height: 250,
        url: '/images/clients/nacon.svg',
        width: 250,
      },
      name: 'Nacon',
    },
    id: 'ZoWnxhcAACUAvHVx',
  },
  {
    data: {
      id: 'shoootin',
      industry: 'Media',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Shoootin logo',
        height: 250,
        url: '/images/clients/shoootin.svg',
        width: 250,
      },
      name: 'Shoootin',
    },
    id: 'ZobpvhcAACYAvm1e',
  },
  {
    data: {
      id: 'drdata',
      industry: 'Health',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: '',
        height: 250,
        url: '/images/clients/drdata.svg',
        width: 250,
      },
      name: 'DrData',
    },
    id: 'Zr9iXBEAACIAd8GU',
  },
  {
    data: {
      id: 'karnott',
      industry: 'AgTech',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Karnott logo',
        height: 250,
        url: '/images/clients/karnott.svg',
        width: 250,
      },
      name: 'Karnott',
    },
    id: 'ZobpExcAACQAvmxJ',
  },
  {
    data: {
      id: 'freeformers',
      industry: 'Education',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Freeformers logo',
        height: 250,
        url: '/images/clients/freeformers.svg',
        width: 250,
      },
      name: 'Freeformers',
    },
    id: 'ZoWeexcAACMAvGeW',
  },
  {
    data: {
      id: 'human-coders',
      industry: 'Education',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Human Coders Logo',
        height: 250,
        url: '/images/clients/human-coders.svg',
        width: 250,
      },
      name: 'Human Coders',
    },
    id: 'Y1Z5jxEAAF5w8n99',
  },
  {
    data: {
      id: 'abricot',
      industry: 'Dating',
      is_audit: false,
      is_visible_homepage: false,
      logo: {
        alt: 'Abricot logo',
        height: 250,
        url: '/images/clients/abricot.svg',
        width: 250,
      },
      name: 'Abricot',
    },
    id: 'Y3TswBAAACUAxPkl',
  },
  {
    data: {
      id: 'talib',
      industry: 'Education',
      is_audit: true,
      is_visible_homepage: false,
      logo: {
        alt: '',
        height: 250,
        url: '/images/clients/talib.svg',
        width: 250,
      },
      name: 'Talib',
    },
    id: 'Zr9jaREAACEAd8Mx',
  },
  {
    data: {
      id: 'stablehouse',
      industry: 'Cryptocurrency',
      is_audit: false,
      is_visible_homepage: false,
      logo: {
        alt: 'Stablehouse logo',
        height: 250,
        url: '/images/clients/stablehouse.svg',
        width: 250,
      },
      name: 'Stablehouse',
    },
    id: 'Y3TshxAAACgAxPgK',
  },
  {
    data: {
      id: 'contentfull',
      industry: 'Headless CMS',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'contentful logo',
        height: 250,
        url: '/images/clients/contentful.svg',
        width: 250,
      },
      name: 'Contentful',
    },
    id: 'Y1Z8bBEAAF5w8oy3',
  },
  {
    data: {
      id: 'le-wagon',
      industry: 'Education',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'le wagon best worldwide tech bootcamp logo',
        height: 250,
        url: '/images/clients/le-wagon.svg',
        width: 250,
      },
      name: 'Le wagon',
    },
    id: 'Y1Z8PREAACEA8ovO',
  },
  {
    data: {
      id: 'red-bull',
      industry: 'Media',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Red bull logo',
        height: 250,
        url: '/images/clients/red-bull.svg',
        width: 250,
      },
      name: 'Red Bull',
    },
    id: 'Y0aMOBEAACEAq22B',
  },
  {
    data: {
      id: 'sunday',
      industry: 'Fintech',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'sunday restaurant payments logo',
        height: 250,
        url: '/images/clients/sunday.svg',
        width: 250,
      },
      name: 'Sunday',
    },
    id: 'sunday',
  },
  {
    data: {
      id: 'tracktile',
      industry: 'FoodTech',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Tracktile food and beverage operations software logo',
        height: 250,
        url: '/images/clients/tracktile.svg',
        width: 250,
      },
      name: 'Tracktile',
    },
    id: 'tracktile',
  },
  {
    data: {
      id: 'ensemble-analytics',
      industry: 'Logistics',
      is_audit: false,
      is_visible_homepage: true,
      logo: {
        alt: 'Ensemble Analytics port workforce management software logo',
        height: 250,
        url: '/images/clients/ensemble-analytics.svg',
        width: 250,
      },
      name: 'Ensemble Analytics',
    },
    id: 'ensemble-analytics',
  },
  {
    data: {
      id: 'klareo',
      industry: 'Logistics',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Klareo last-mile delivery software logo',
        height: 250,
        url: '/images/clients/klareo.svg',
        width: 250,
      },
      name: 'Klareo',
    },
    id: 'klareo',
  },
  {
    data: {
      id: 'stellar-quantum',
      industry: 'AI',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Stellar Quantum human-centred AI software logo',
        height: 250,
        url: '/images/clients/stellar-quantum.svg',
        width: 250,
      },
      name: 'Stellar Quantum',
    },
    id: 'stellar-quantum',
  },
  {
    data: {
      id: 'kizeo-forms',
      industry: 'Field Service',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'Kizeo Forms field data collection app logo',
        height: 250,
        url: '/images/clients/kizeo-forms.svg',
        width: 250,
      },
      name: 'Kizeo Forms',
    },
    id: 'kizeo-forms',
  },
  {
    data: {
      id: 'gac-technology',
      industry: 'Asset Management',
      is_audit: true,
      is_visible_homepage: true,
      logo: {
        alt: 'GAC Software fleet and asset management software logo',
        height: 250,
        url: '/images/clients/gac-technology.svg',
        width: 250,
      },
      name: 'GAC Technology',
    },
    id: 'gac-technology',
  },
];
