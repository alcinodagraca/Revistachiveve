import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { ListPagination } from "../components/ListPagination";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/eventos.index";
import type { Event } from "../../server/wp";

export default function EventosPage() {
  const { events, currentPage, totalPages } = Route.useLoaderData();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter((event) => {
    const date = new Date(event.date);
    return Number.isNaN(date.getTime()) || date >= today;
  });
  const pastEvents = events.filter((event) => {
    const date = new Date(event.date);
    return !Number.isNaN(date.getTime()) && date < today;
  });

  if (events.length === 0) {
    return (
      <div className="bg-background">
        <div className="site-shell py-12">
          <PageHeader
            title="Eventos"
            subtitle="Agenda empresarial, encontros estratégicos e oportunidades para quem acompanha os negócios em Moçambique."
            breadcrumbs={[{ label: "Início", to: "/" }, { label: "Eventos" }]}
          />
          <EventPromotionCta />
          <EmptyState
            icon={FaCalendarDays}
            title="Sem eventos por enquanto"
            message="Ainda não há eventos publicados. Volte em breve — estamos a preparar a próxima agenda de encontros, conferências e workshops."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="site-shell py-12">
        <PageHeader
          title="Eventos"
          subtitle="Agenda empresarial, encontros estratégicos e oportunidades para quem acompanha os negócios em Moçambique."
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Eventos" }]}
        />

        <EventPromotionCta />

        {upcomingEvents.length > 0 && (
          <section aria-label="Próximos eventos" className="mb-16">
            <SectionHeader>Próximos eventos</SectionHeader>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section aria-label="Eventos anteriores">
            <SectionHeader>Eventos anteriores</SectionHeader>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        <ListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageHref={(page) =>
            page === 1 ? "/eventos" : `/eventos?page=${page}`
          }
        />
      </div>
    </div>
  );
}

function EventPromotionCta() {
  return (
    <div className="mb-12 flex flex-col gap-5 bg-primary px-5 py-6 md:flex-row md:items-center md:justify-between md:px-7">
      <div className="min-w-0 flex-1">
        <p className="mb-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
          Divulgue o seu evento
        </p>
        <p className="max-w-4xl font-sans text-[0.94rem] font-light leading-7 text-primary-foreground/90">
          Tem um evento ligado a negócios, empreendedorismo, inovação, liderança,
          formação ou investimento? Partilhe-o com a Revista Negócios no Chiveve.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-4">
        <Link
          to="/anuncios"
          className="inline-flex min-h-[44px] items-center font-sans text-sm font-medium text-primary-foreground underline underline-offset-4"
        >
          Anunciar na revista
        </Link>
        <Link
          to="/contactos"
          className="inline-flex min-h-[44px] items-center bg-primary-foreground px-5 font-sans text-sm font-medium text-primary no-underline transition-opacity hover:opacity-90"
        >
          Divulgar evento
        </Link>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <article className="transition-transform duration-200 hover:-translate-y-0.5">
      <Link
        to="/eventos/$slug"
        params={{ slug: event.slug }}
        className="block group no-underline"
      >
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="block h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="pt-4">
          {event.city && (
            <Eyebrow className="inline-block mb-2">{event.city}</Eyebrow>
          )}

          <Heading as="h3" variant="card-title" className="mb-3 leading-[1.3] text-foreground">
            {event.title}
          </Heading>

          {event.description?.[0] && (
            <p className="mb-4 font-sans text-[0.92rem] font-light text-foreground/76 leading-[1.68] line-clamp-3">
              {event.description[0]}
            </p>
          )}

          <div className="flex flex-col gap-2 border-t border-border/70 pt-3">
            <div className="flex items-center gap-2">
              <FaCalendarDays aria-hidden="true" size={14} className="text-primary" />
              <span className="font-sans text-[0.88rem] font-normal text-foreground">
                {event.displayDate}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <FaLocationDot aria-hidden="true" size={14} className="text-primary" />
                <span className="font-sans text-[0.88rem] font-normal text-foreground">
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
