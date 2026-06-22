import { Link, useParams, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaCalendarDays, FaLocationDot, FaTicket, FaUsers } from "react-icons/fa6";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumb } from "../components/Breadcrumb";
import { Prose } from "../components/Prose";
import { getEventBySlug, events } from "../../data/events";
import { Heading, SectionHeader } from "../components/typography";

export default function EventDetailPage() {
  const { slug } = useParams({ from: "/eventos/$slug" });
  const event = getEventBySlug(slug);

  if (!event) {
    throw notFound();
  }

  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <div className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-h-[480px] overflow-hidden"
      >
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full max-h-[480px] object-cover block"
        />
      </motion.div>

      <div className="max-w-[1280px] mx-auto pt-8 px-4 pb-12">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Início", to: "/" },
              { label: "Eventos", to: "/eventos" },
              { label: event.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <Heading as="h1" variant="article-title" className="text-foreground mb-6">
              {event.title}
            </Heading>

            <Prose>
              {event.description.map((p, i) => (
                <p key={i} className="mb-6">
                  {p}
                </p>
              ))}
            </Prose>
          </div>

          <aside>
            <div className="bg-secondary rounded-lg p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-white rounded-md py-2 px-3.5 text-center min-w-[62px] font-sans">
                  <div className="text-[22px] font-bold leading-none">
                    {event.day}
                  </div>
                  <div className="text-[11px] tracking-[0.1em] mt-0.5">
                    {event.month}
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[13px] text-muted-foreground tracking-[0.08em] uppercase">
                    Data
                  </div>
                  <div className="font-sans text-base font-semibold text-foreground">
                    {event.displayDate}
                  </div>
                </div>
              </div>

              <MetaRow icon={FaLocationDot} label="Local" value={event.location} />
              <MetaRow icon={FaTicket} label="Preço" value={event.price} />
              <MetaRow icon={FaUsers} label="Organização" value={event.organizer} />

              <a
                href={event.registrationUrl}
                className="block text-center transition-opacity hover:opacity-90 mt-6 py-3 px-5 bg-primary text-white rounded-md font-sans text-sm font-semibold tracking-[0.05em] uppercase no-underline"
              >
                Inscrever-se
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <SectionHeader>Outros eventos</SectionHeader>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
              {related.map((e) => (
                <Link
                  key={e.slug}
                  to="/eventos/$slug"
                  params={{ slug: e.slug }}
                  className="group block no-underline"
                >
                  <div className="overflow-hidden rounded-lg mb-3">
                    <ImageWithFallback
                      src={e.image}
                      alt={e.title}
                      className="w-full h-[180px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-sans text-xs text-primary tracking-[0.1em] uppercase font-semibold mb-1">
                    {e.displayDate}
                  </div>
                  <Heading as="h3" variant="card-title" className="text-foreground">
                    {e.title}
                  </Heading>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FaCalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <Icon size={16} className="text-muted-foreground mt-[3px]" />
      <div>
        <div className="font-sans text-[11px] text-muted-foreground tracking-[0.1em] uppercase mb-0.5">
          {label}
        </div>
        <div className="font-sans text-sm text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}
