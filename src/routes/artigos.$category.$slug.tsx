import { createFileRoute } from "@tanstack/react-router";
import ArticleDetailPage from "../app/pages/ArticleDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";

export const Route = createFileRoute("/artigos/$category/$slug")({
  component: ArticleDetailPage,
  notFoundComponent: NotFoundPage,
});
