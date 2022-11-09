export interface apiProps {
  name: string;
  website: string;
  description: string;
  type: string;
  features: string;
  pricing: string;
}

export interface apiListProps {
  apis: apiProps[];
}
