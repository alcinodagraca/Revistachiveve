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

function normalizeCategory(c: WPCategory): Category {
  return {
    id: c.id,
    slug: c.slug,
    name: decodeEntities(c.name),
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
    .filter((c) => c.slug !== "uncategorized")
    .map(normalizeCategory);
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
