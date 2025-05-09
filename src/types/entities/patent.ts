export type Patent = {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
  settings: string;
  publication_number: string;
  title: string;
  ai_summary?: string;
  raw_source_url: string;
  assignee?: string;
  inventors?: {
    last_name: string;
    first_name: string;
  }[];
  priority_date: number;
  application_date: number;
  grant_date: number;
  abstract?: string;
  description?: string;
  claims?: object[];
  jurisdictions?: string;
  classifications?: object;
  application_events?: string;
  citations?: object[];
  image_urls?: string[];
  landscapes?: string;
  publish_date: number;
  citations_non_patent?: string;
  provenance?: string;
  attachment_urls?: string;
};
