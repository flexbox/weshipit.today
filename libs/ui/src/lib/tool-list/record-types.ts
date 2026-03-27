export interface RecordProps {
  id: string;
  name: string;
  slug: string;
  description?: string;
  description_success?: string;
  website_url: string;
  platform?: string[];
  pricing?: string[];
  features?: string[];
  ios_url?: string;
  android_url?: string;
  type: string[];
}

export interface ToolListProps {
  records: RecordProps[];
}
