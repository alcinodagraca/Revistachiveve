import { createServerFn } from "@tanstack/react-start";
import {
  getArticleBySlug,
  getMaisLidos,
  getRelatedArticles,
  listArticles,
} from "./articles";
import { getCategoryBySlug, listCategories } from "./categories";

export const fnListArticles = createServerFn({ method: "GET" })
  .inputValidator(
    (
      input?: {
        page?: number;
        perPage?: number;
        categorySlug?: string;
        search?: string;
      },
    ) => input ?? {},
  )
  .handler(({ data }) => listArticles(data));

export const fnGetArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => getArticleBySlug(slug));

export const fnGetArticleBundle = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const article = await getArticleBySlug(slug);
    if (!article) return null;
    const [related, maisLidos] = await Promise.all([
      getRelatedArticles(article, 3),
      getMaisLidos(article.id, 5),
    ]);
    return { article, related, maisLidos };
  });

export const fnListCategories = createServerFn({ method: "GET" }).handler(() =>
  listCategories(),
);

export const fnGetCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => getCategoryBySlug(slug));

export const fnGetCategoryWithArticles = createServerFn({ method: "GET" })
  .inputValidator(
    (input: { slug: string; page?: number; perPage?: number }) => input,
  )
  .handler(async ({ data }) => {
    const category = await getCategoryBySlug(data.slug);
    if (!category) return null;
    const list = await listArticles({
      categorySlug: data.slug,
      page: data.page ?? 1,
      perPage: data.perPage ?? 12,
    });
    return { category, ...list };
  });
