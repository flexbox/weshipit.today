export interface apiProps {
  name: string;
  website: string;
  description: string;
  type: string;
  features: string;
  pricing: string;
  logo?: {
    url: string;
  };
}

export interface apiListProps {
  apis: apiProps[];
}
