export interface post {
  id: number;
  uid: string;
  type?: string;
  href?: string;
  tags?: [];
  first_publication_date?: string;
  last_publication_date?: string;
  slugs: string[];
  lang?: string;
  data: {
    date?: string;
    seo_title: string;
    seo_description: string;
    title: [];
    image: {
      url: string;
      alt?: string;
      copyright?: string;
    };
    body_content: [];
    featured_homepage: boolean;
  };
}
