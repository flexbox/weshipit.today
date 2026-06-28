export interface DesignDetail {
  title: string;
  description: string;
  media: Array<string>;
  orientation?: 'landscape';
}

export interface DesignDetailsPost {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  details: Array<DesignDetail>;
  tint: string;
}
