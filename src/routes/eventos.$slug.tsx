import { createFileRoute, notFound } from "@tanstack/react-router";
import EventDetailPage from "../app/pages/EventDetailPage";
import NotFoundPage from "../app/pages/NotFoundPage";
import { fnGetEventBySlug, fnListEvents } from "../server/wp/server-fns";
import { breadcrumbJsonLd, eventJsonLd, pageSeo } from "../server/seo";

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
    const description = event.description?.[0] ?? event.title;
    const path = `/eventos/${event.slug}`;
    return pageSeo({
      title: event.title,
      description,
      path,
      image: event.image,
      imageAlt: event.title,
      jsonLd: [
        eventJsonLd({
          title: event.title,
          description,
          url: path,
          image: event.image,
          startDate: event.date,
          locationName: event.location,
          city: event.city,
          organizer: event.organizer,
          registrationUrl: event.registrationUrl,
        }),
        breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Eventos", path: "/eventos" },
          { name: event.title, path },
        ]),
      ],
    });
  },
});
