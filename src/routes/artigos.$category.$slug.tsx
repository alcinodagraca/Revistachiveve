import { createFileRoute, notFound } from "@tanstack/react-router";
import ArticleDetailPage from "../app/pages/ArticleDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";
import { fnGetArticleBundle } from "../server/wp/server-fns";
import { articleJsonLd, breadcrumbJsonLd, pageSeo } from "../server/seo";

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
    const path = `/artigos/${article.category}/${article.slug}`;
    return pageSeo({
      title: article.title,
      description: article.excerpt,
      path,
      image: article.heroImage,
      imageAlt: article.heroAlt || article.title,
      type: "article",
      article: {
        publishedAt: article.publishedAt,
        modifiedAt: article.modifiedAt,
        authorName: article.author.name,
        section: article.categoryName,
        tags: article.tags,
      },
      jsonLd: [
        articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: path,
          image: article.heroImage,
          publishedAt: article.publishedAt,
          modifiedAt: article.modifiedAt,
          authorName: article.author.name,
          section: article.categoryName,
          tags: article.tags,
        }),
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Artigos", path: "/artigos" },
          { name: article.categoryName, path: `/artigos/${article.category}` },
          { name: article.title, path },
        ]),
      ],
    });
  },
});
