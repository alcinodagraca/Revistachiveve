import { createFileRoute, notFound } from "@tanstack/react-router";
import EventDetailPage from "../app/pages/EventDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";
import { fnGetEventBySlug, fnListEvents } from "../server/wp/server-fns";

export const Route = createFileRoute("/eventos/$slug")({
  component: EventDetailPage,
  notFoundComponent: NotFoundPage,
  loader: async ({ params }) => {
    const [event, all] = await Promise.all([
      fnGetEventBySlug({ data: params.slug }),
      fnListEvents(),
    ]);
    if (!event) throw notFound();
    const related = all
      .filter((e) => e.slug !== event.slug)
      .slice(0, 3);
    return { event, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} · Revista Chiveve` },
        {
          name: "description",
          content: event.description?.[0] ?? event.title,
        },
        { property: "og:title", content: event.title },
        { property: "og:image", content: event.image },
        { property: "og:type", content: "event" },
      ],
    };
  },
});
