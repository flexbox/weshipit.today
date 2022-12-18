interface LogoProps {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: {
    full: {
      height: number;
      url: string;
      width: number;
    };
    large: {
      height: number;
      url: string;
      width: number;
    };
    small: {
      height: number;
      url: string;
      width: number;
    };
  };
  type: string;
  url: string;
  width: number;
}

export interface ApiProps {
  id?: string;
  fields: {
    logo: LogoProps[];
    description: string;
    features: string[];
    github_url: string;
    name: string;
    platform: string[];
    pricing: string[];
    type: string;
    website_url: string;
    slug: string;
  };
}

export interface ApiListProps {
  apis: ApiProps[];
}
