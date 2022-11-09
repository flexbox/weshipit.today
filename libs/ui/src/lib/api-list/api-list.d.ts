export interface ApiProps {
  fields: {
    description: string;
    features: string[];
    github_url: string;
    name: string;
    platform: string[];
    pricing: string[];
    type: string;
    website_url: string;
  };
}

export interface apiListProps {
  apis: apiProps[];
}
