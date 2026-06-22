/**
 * Minimal WordPress REST response shapes — only the fields we read.
 * Extend as new fields become relevant. Keep verbatim from WP.
 */

export type WPRendered = { rendered: string; protected?: boolean };

export type WPMediaSize = {
  source_url: string;
  width: number;
  height: number;
  mime_type: string;
};

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, WPMediaSize>;
  };
};

export type WPUser = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: Record<string, string>;
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  description?: string;
  count?: number;
  link?: string;
};

export type WPCategory = WPTerm & { taxonomy: "category" };

export type WPEmbedded = {
  author?: WPUser[];
  "wp:featuredmedia"?: WPMedia[];
  "wp:term"?: WPTerm[][];
};

export type WPPost = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: WPEmbedded;
};

export type WPListResponse<T> = {
  items: T[];
  total: number;
  totalPages: number;
};
