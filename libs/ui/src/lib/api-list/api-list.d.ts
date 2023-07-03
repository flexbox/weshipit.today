export interface ApiProps {
  id?: string;
  fields: {
    description: string;
    features?: string[];
    github_url?: string;
    name: string;
    platform?: string[];
    pricing?: string[];
    slug: string;
    type: string;
    website_url: string;
  };
}

export interface ApiListProps {
  apis: ApiProps[];
}
