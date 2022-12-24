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
    description: string;
    features?: string[];
    github_url?: string;
    logo?: LogoProps[];
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
