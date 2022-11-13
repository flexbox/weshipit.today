export interface ApiProps {
  id?: string;
  fields: {
    logo?: {
      thumbnails: {
        large: {
          url: string;
        };
      };
    };
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

export interface ApiListProps {
  apis: ApiProps[];
}
