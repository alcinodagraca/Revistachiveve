import { createFileRoute } from "@tanstack/react-router";
import EventDetailPage from "../app/pages/EventDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";

export const Route = createFileRoute("/eventos/$slug")({
  component: EventDetailPage,
  notFoundComponent: NotFoundPage,
});
