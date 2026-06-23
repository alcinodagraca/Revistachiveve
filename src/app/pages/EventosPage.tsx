import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/eventos.index";
import type { Event } from "../../server/wp";

export default function EventosPage() {
  const { events } = Route.useLoaderData();

  if (events.length === 0) {
    return (
      <div className="bg-background">
        <div className="max-w-[1280px] mx-auto px-4 py-12">
          <PageHeader
            title="Eventos"
            subtitle="Participe nos nossos eventos e amplie a sua rede de contactos profissionais"
            breadcrumbs={[{ label: "Início", to: "/" }, { label: "Eventos" }]}
          />
          <EmptyState
            icon={FaCalendarDays}
            title="Sem eventos por enquanto"
            message="Ainda não há eventos publicados. Volte em breve — estamos a preparar a próxima agenda de encontros, conferências e workshops."
            cta={{ label: "Voltar à página inicial", to: "/" }}
          />
        </div>
      </div>
    );
  }

  const featured = events.slice(0, 2);
  const rest = events.slice(2);

  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <PageHeader
          title="Eventos"
          subtitle="Participe nos nossos eventos e amplie a sua rede de contactos profissionais"
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Eventos" }]}
        />

        {featured.length > 0 && (
          <div className="mb-16">
            <SectionHeader>Em Destaque</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((event) => (
                <EventCard key={event.slug} event={event} size="large" />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <SectionHeader>Próximos Eventos</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((event) => (
                <EventCard key={event.slug} event={event} size="small" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, size }: { event: Event; size: "large" | "small" }) {
  const imgClass = size === "large" ? "h-[280px]" : "h-[200px]";
  const headingVariant = size === "large" ? "feature-title" : "card-title";
  return (
    <article className="rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
      <Link
        to="/eventos/$slug"
        params={{ slug: event.slug }}
        className="block group no-underline"
      >
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className={`w-full ${imgClass} object-cover block transition-transform duration-500 group-hover:scale-105`}
          />
        </div>

        <div className="pt-4">
          {event.city && (
            <Eyebrow className="inline-block mb-2">{event.city}</Eyebrow>
          )}

          <Heading as="h3" variant={headingVariant} className="text-foreground mb-3 leading-[1.3]">
            {event.title}
          </Heading>

          {event.description?.[0] && (
            <p className="font-sans text-sm text-muted-foreground leading-[1.6] mb-4 line-clamp-2">
              {event.description[0]}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaCalendarDays size={14} className="text-primary" />
              <span className="font-sans text-sm font-medium text-foreground">
                {event.displayDate}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <FaLocationDot size={14} className="text-primary" />
                <span className="font-sans text-sm font-medium text-foreground">
                  {event.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
