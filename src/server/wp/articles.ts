import { wpList } from "./client";
import type { WPPost, WPTerm } from "./types";
import { resolveFeaturedImage, resolveFeaturedAlt } from "./media";
import { decodeEntities, readTimeFromHtml, stripTags } from "./util";

/**
 * The shape pages consume. Independent of WP — if we change CMS, only the
 * normalizer below changes.
 */
export type Article = {
  id: number;
  slug: string;
  category: string;
  categoryName: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  heroImage: string;
  heroAlt: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  publishedAt: string;
  modifiedAt: string;
  readTime: number;
  tags: string[];
  link: string;
};

const EMBED = { _embed: 1 } as const;
const LIST_TTL_MS = 60_000;
const DETAIL_TTL_MS = 5 * 60_000;

function pickPrimaryCategory(post: WPPost): WPTerm | null {
  const groups = post._embedded?.["wp:term"];
  if (!groups) return null;
  for (const group of groups) {
    const cat = group.find(
      (t) => t.taxonomy === "category" && t.slug !== "uncategorized",
    );
    if (cat) return cat;
  }
  return null;
}

function pickTags(post: WPPost): string[] {
  const groups = post._embedded?.["wp:term"];
  if (!groups) return [];
  for (const group of groups) {
    if (group.length && group[0]?.taxonomy === "post_tag") {
      return group.map((t) => t.name);
    }
  }
  return [];
}

export function normalizeArticle(post: WPPost): Article {
  const author = post._embedded?.author?.[0];
  const category = pickPrimaryCategory(post);
  return {
    id: post.id,
    slug: post.slug,
    category: category?.slug ?? "uncategorized",
    categoryName: category ? decodeEntities(category.name) : "Sem categoria",
    title: decodeEntities(post.title.rendered),
    excerpt: stripTags(post.excerpt.rendered),
    bodyHtml: post.content.rendered,
    heroImage: resolveFeaturedImage(post),
    heroAlt: resolveFeaturedAlt(post) || decodeEntities(post.title.rendered),
    author: {
      name: author ? decodeEntities(author.name) : "Equipa Chiveve",
      avatar: author?.avatar_urls?.["96"],
      role: author?.description ? decodeEntities(author.description) : "Redacção",
    },
    publishedAt: post.date_gmt,
    modifiedAt: post.modified,
    readTime: readTimeFromHtml(post.content.rendered),
    tags: pickTags(post).map(decodeEntities),
    link: post.link,
  };
}

export type ListArticlesArgs = {
  page?: number;
  perPage?: number;
  /** Category slug — resolved to WP category id internally. */
  categorySlug?: string;
  /** Free-text search (passed to WP's ?search=). */
  search?: string;
  /** Exclude one article id (used for "Related" / "Mais Lidos"). */
  exclude?: number;
};

export type ArticleList = {
  articles: Article[];
  total: number;
  totalPages: number;
};

export async function listArticles(
  args: ListArticlesArgs = {},
): Promise<ArticleList> {
  const params: Record<string, unknown> = {
    _embed: 1,
    page: args.page ?? 1,
    per_page: args.perPage ?? 12,
    orderby: "date",
    order: "desc",
  };
  if (args.search) params.search = args.search;
  if (args.exclude) params.exclude = args.exclude;

  if (args.categorySlug) {
    // Resolve slug → id on the WP side (one extra call, cached separately).
    const cats = await wpList<{ id: number; slug: string }>("/categories", {
      params: { slug: args.categorySlug, per_page: 1 },
      ttlMs: 60 * 60_000,
    });
    if (cats.items.length === 0) {
      return { articles: [], total: 0, totalPages: 0 };
    }
    params.categories = cats.items[0].id;
  }

  const res = await wpList<WPPost>("/posts", {
    params,
    ttlMs: LIST_TTL_MS,
  });
  return {
    articles: res.items.map(normalizeArticle),
    total: res.total,
    totalPages: res.totalPages,
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await wpList<WPPost>("/posts", {
    params: { slug, _embed: 1, per_page: 1 },
    ttlMs: DETAIL_TTL_MS,
  });
  if (res.items.length === 0) return null;
  return normalizeArticle(res.items[0]);
}

export async function getRelatedArticles(
  article: Article,
  limit = 3,
): Promise<Article[]> {
  // Same category, exclude current.
  const params: Record<string, unknown> = {
    _embed: 1,
    per_page: limit,
    exclude: article.id,
    orderby: "date",
    order: "desc",
  };
  if (article.category && article.category !== "uncategorized") {
    const cats = await wpList<{ id: number; slug: string }>("/categories", {
      params: { slug: article.category, per_page: 1 },
      ttlMs: 60 * 60_000,
    });
    if (cats.items.length > 0) {
      params.categories = cats.items[0].id;
    }
  }
  const res = await wpList<WPPost>("/posts", {
    params,
    ttlMs: LIST_TTL_MS,
  });
  return res.items.map(normalizeArticle);
}

/** Most-read placeholder: latest N excluding given id. WP has no native pageviews. */
export async function getMaisLidos(
  excludeId: number,
  limit = 3,
): Promise<Article[]> {
  const res = await wpList<WPPost>("/posts", {
    params: {
      _embed: 1,
      per_page: limit,
      exclude: excludeId,
      orderby: "date",
      order: "desc",
    },
    ttlMs: LIST_TTL_MS,
  });
  return res.items.map(normalizeArticle);
}
