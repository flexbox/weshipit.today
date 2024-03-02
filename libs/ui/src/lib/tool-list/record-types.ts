/**
 * @deprecated we should use codegen
 */
export interface RecordProps {
  id?: string;
  fields: {
    name: string;
    description: string;
    description_success?: string;
    features?: string[];
    github_url?: string;
    platform?: string[];
    pricing?: string[];
    slug: string;
    type: string;
    website_url: string;
    twitter_url?: string;
  };
}

/**
 * @deprecated we should use codegen
 */
export interface ToolListProps {
  records: RecordProps[];
}
