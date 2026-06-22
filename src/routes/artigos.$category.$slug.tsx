import { createFileRoute, notFound } from "@tanstack/react-router";
import ArticleDetailPage from "../app/pages/ArticleDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";
import { fnGetArticleBundle } from "../server/wp/server-fns";

export const Route = createFileRoute("/artigos/$category/$slug")({
  component: ArticleDetailPage,
  notFoundComponent: NotFoundPage,
  loader: async ({ params }) => {
    const data = await fnGetArticleBundle({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} · Revista Chiveve` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:image", content: article.heroImage },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: article.publishedAt },
        { property: "article:modified_time", content: article.modifiedAt },
        { property: "article:author", content: article.author.name },
        { property: "article:section", content: article.categoryName },
      ],
    };
  },
});
