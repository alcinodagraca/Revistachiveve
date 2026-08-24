import { wpList } from "./client";
import type { WPCategory } from "./types";
import { decodeEntities, stripTags } from "./util";
import { articles as MOCK_ARTICLES } from "../../data/articles";

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
};

const CATEGORY_TTL_MS = 60 * 60_000;
const CATEGORY_LABELS: Record<string, string> = {
  analise: "Análise",
  economia: "Economia",
  empreendedorismo: "Empreendedorismo",
  "inovacao-tecnologia": "Inovação e Tecnologia",
  lideranca: "Liderança",
  opiniao: "Opinião",
};

function normalizeCategory(c: WPCategory): Category {
  return {
    id: c.id,
    slug: c.slug,
    name: decodeEntities(c.name),
    description: stripTags(c.description ?? ""),
    count: c.count ?? 0,
  };
}

function getMockCategories(): Category[] {
  return Array.from(new Set(MOCK_ARTICLES.map((article) => article.category)))
    .map((slug, index) => ({
      id: index + 1,
      slug,
      name: CATEGORY_LABELS[slug] ?? slug,
      description: "",
      count: MOCK_ARTICLES.filter((article) => article.category === slug).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt"));
}

export async function listCategories(): Promise<Category[]> {
  try {
    const res = await wpList<WPCategory>("/categories", {
      params: { per_page: 100, orderby: "name", order: "asc", hide_empty: false },
      ttlMs: CATEGORY_TTL_MS,
    });
    return res.items
      .filter((c) => c.slug !== "uncategorized")
      .map(normalizeCategory);
  } catch (error) {
    console.error("[wp] listCategories fallback to mock data:", error);
    return getMockCategories();
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  try {
    const res = await wpList<WPCategory>("/categories", {
      params: { slug, per_page: 1 },
      ttlMs: CATEGORY_TTL_MS,
    });
    if (res.items.length === 0) return null;
    return normalizeCategory(res.items[0]);
  } catch (error) {
    console.error("[wp] getCategoryBySlug fallback to mock data:", error);
    return getMockCategories().find((category) => category.slug === slug) ?? null;
  }
}
