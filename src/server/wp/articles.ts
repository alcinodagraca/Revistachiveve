import { wpList } from "./client";
import type { WPPost, WPTerm } from "./types";
import { resolveFeaturedImage, resolveFeaturedAlt } from "./media";
import { decodeEntities, readTimeFromHtml, stripTags } from "./util";
import {
  articles as MOCK_ARTICLES,
  getArticleBySlug as getMockArticleBySlug,
  getArticlesByCategory as getMockArticlesByCategory,
  getRelatedArticles as getMockRelatedArticles,
  type Article as MockArticle,
} from "../../data/articles";

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

const CATEGORY_LABELS: Record<string, string> = {
  analise: "Análise",
  economia: "Economia",
  empreendedorismo: "Empreendedorismo",
  "inovacao-tecnologia": "Inovação e Tecnologia",
  lideranca: "Liderança",
  opiniao: "Opinião",
};

function mockToArticle(article: MockArticle): Article {
  return {
    id: Math.abs(
      article.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
    ),
    slug: article.slug,
    category: article.category,
    categoryName: CATEGORY_LABELS[article.category] ?? article.category,
    title: article.title,
    excerpt: article.excerpt,
    bodyHtml: article.body.map((paragraph) => `<p>${paragraph}</p>`).join(""),
    heroImage: article.heroImage,
    heroAlt: article.title,
    author: {
      name: article.author.name,
      avatar: article.author.avatar,
      role: article.author.role,
    },
    publishedAt: article.publishedAt,
    modifiedAt: article.publishedAt,
    readTime: article.readTime,
    tags: article.tags,
    link: `/artigos/${article.category}/${article.slug}`,
  };
}

function filterMockArticles(args: ListArticlesArgs): Article[] {
  let items = MOCK_ARTICLES.slice();
  if (args.categorySlug) {
    items = getMockArticlesByCategory(args.categorySlug);
  }
  if (args.search) {
    const query = args.search.trim().toLowerCase();
    items = items.filter((article) =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  const excludeSlug =
    args.exclude !== undefined
      ? MOCK_ARTICLES.find((article) => mockToArticle(article).id === args.exclude)?.slug
      : undefined;
  if (excludeSlug) {
    items = items.filter((article) => article.slug !== excludeSlug);
  }

  items = items.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const page = args.page ?? 1;
  const perPage = args.perPage ?? 12;
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage).map(mockToArticle);
}

export async function listArticles(
  args: ListArticlesArgs = {},
): Promise<ArticleList> {
  try {
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
  } catch (error) {
    console.error("[wp] listArticles fallback to mock data:", error);
    const allMatches = filterMockArticles({
      ...args,
      page: 1,
      perPage: Number.MAX_SAFE_INTEGER,
    });
    const page = args.page ?? 1;
    const perPage = args.perPage ?? 12;
    const start = (page - 1) * perPage;
    const paginated = allMatches.slice(start, start + perPage);
    return {
      articles: paginated,
      total: allMatches.length,
      totalPages: Math.ceil(allMatches.length / perPage),
    };
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await wpList<WPPost>("/posts", {
      params: { slug, _embed: 1, per_page: 1 },
      ttlMs: DETAIL_TTL_MS,
    });
    if (res.items.length === 0) return null;
    return normalizeArticle(res.items[0]);
  } catch (error) {
    console.error("[wp] getArticleBySlug fallback to mock data:", error);
    const mock = MOCK_ARTICLES.find((article) => article.slug === slug);
    return mock ? mockToArticle(mock) : null;
  }
}

export async function getRelatedArticles(
  article: Article,
  limit = 3,
): Promise<Article[]> {
  try {
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
  } catch (error) {
    console.error("[wp] getRelatedArticles fallback to mock data:", error);
    const mock = getMockArticleBySlug(article.category, article.slug) ??
      MOCK_ARTICLES.find((item) => item.slug === article.slug);
    return (mock ? getMockRelatedArticles(mock, limit) : []).map(mockToArticle);
  }
}

/** Most-read placeholder: latest N excluding given id. WP has no native pageviews. */
export async function getMaisLidos(
  excludeId: number,
  limit = 3,
): Promise<Article[]> {
  try {
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
  } catch (error) {
    console.error("[wp] getMaisLidos fallback to mock data:", error);
    return filterMockArticles({
      exclude: excludeId,
      page: 1,
      perPage: limit,
    });
  }
}
