import { wpList } from "./client";
import type { WPCategory } from "./types";
import { decodeEntities, stripTags } from "./util";

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
};

const CATEGORY_TTL_MS = 60 * 60_000;

const EDITORIAL_CATEGORY_ORDER = [
  "empresas",
  "empreendedorismo",
  "economia",
  "lideranca",
  "inovacao-tecnologia",
  "sustentabilidade-e-desenvolvimento",
  "opiniao",
  "entrevistas",
] as const;

const EDITORIAL_CATEGORY_NAMES: Record<
  (typeof EDITORIAL_CATEGORY_ORDER)[number],
  string
> = {
  empresas: "Negócios e Empresas",
  empreendedorismo: "Empreendedorismo",
  economia: "Economia e Mercado",
  lideranca: "Liderança",
  "inovacao-tecnologia": "Inovação e Tecnologia",
  "sustentabilidade-e-desenvolvimento":
    "Sustentabilidade e Desenvolvimento",
  opiniao: "Opinião",
  entrevistas: "Entrevistas",
};

const editorialCategoryPosition = new Map<string, number>(
  EDITORIAL_CATEGORY_ORDER.map((slug, index) => [slug, index]),
);

function normalizeCategory(c: WPCategory): Category {
  return {
    id: c.id,
    slug: c.slug,
    name:
      EDITORIAL_CATEGORY_NAMES[
        c.slug as (typeof EDITORIAL_CATEGORY_ORDER)[number]
      ] ?? decodeEntities(c.name),
    description: stripTags(c.description ?? ""),
    count: c.count ?? 0,
  };
}

export async function listCategories(): Promise<Category[]> {
  const res = await wpList<WPCategory>("/categories", {
    params: { per_page: 100, orderby: "name", order: "asc", hide_empty: false },
    ttlMs: CATEGORY_TTL_MS,
  });
  return res.items
    .filter((category) => editorialCategoryPosition.has(category.slug))
    .map(normalizeCategory)
    .sort(
      (a, b) =>
        editorialCategoryPosition.get(a.slug)! -
        editorialCategoryPosition.get(b.slug)!,
    );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const res = await wpList<WPCategory>("/categories", {
    params: { slug, per_page: 1 },
    ttlMs: CATEGORY_TTL_MS,
  });
  if (res.items.length === 0) return null;
  return normalizeCategory(res.items[0]);
}
