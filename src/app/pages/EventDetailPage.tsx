import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  FaCalendarDays,
  FaFacebookF,
  FaLink,
  FaLinkedinIn,
  FaLocationDot,
  FaTicket,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiX } from "react-icons/si";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumb } from "../components/Breadcrumb";
import { Prose } from "../components/Prose";
import { Eyebrow, Heading, SectionHeader } from "../components/typography";
import { Route } from "../../routes/eventos.$slug";

export default function EventDetailPage() {
  const { event, related } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const eventUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://revistachiveve.co.mz/eventos/${event.slug}`;
  const shareText = `${event.title} | Revista Chiveve`;

  async function copyEventLink() {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

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

      <div className="site-shell pt-8 pb-12">
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
          <div className="lg:col-span-2">
            {event.city && (
              <Eyebrow className="mb-3 inline-block">{event.city}</Eyebrow>
            )}

            <Heading
              as="h1"
              variant="article-title"
              className="mb-4 max-w-[760px] text-foreground"
            >
              {event.title}
            </Heading>

            <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[0.82rem] text-muted-foreground">
              <span>{event.displayDate}</span>
              {event.location && (
                <>
                  <span>·</span>
                  <span>{event.location}</span>
                </>
              )}
              {event.organizer && (
                <>
                  <span>·</span>
                  <span>{event.organizer}</span>
                </>
              )}
            </div>

            {event.description?.[0] && (
              <p className="mb-8 max-w-[760px] font-sans text-[1.02rem] font-light leading-[1.8] text-foreground/72 md:text-[1.08rem]">
                {event.description[0]}
              </p>
            )}

            <Prose>
              {event.bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: event.bodyHtml }} />
              ) : (
                event.description.slice(1).map((p, i) => (
                  <p key={i} className="mb-6">
                    {p}
                  </p>
                ))
              )}
            </Prose>

            <div className="mt-10 max-w-[760px] border-t border-border pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                  Partilhar este evento
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no Facebook"
                >
                  <FaFacebookF size={14} />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no X"
                >
                  <SiX size={13} />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no LinkedIn"
                >
                  <FaLinkedinIn size={14} />
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${eventUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </a>

                <button
                  type="button"
                  onClick={copyEventLink}
                  className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-sans text-[0.82rem] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FaLink size={13} />
                  {copied ? "Link copiado" : "Copiar link"}
                </button>
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 border border-border bg-card p-6">
              <p className="mb-4 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                Detalhes do Evento
              </p>

              <div className="mb-6 flex items-center gap-3">
                <div className="min-w-[62px] bg-primary px-3.5 py-2 text-center font-sans text-white">
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
                  <div className="font-sans text-[0.96rem] font-normal text-foreground">
                    {event.displayDate}
                  </div>
                </div>
              </div>

              <MetaRow icon={FaLocationDot} label="Local" value={event.location} />
              <MetaRow icon={FaTicket} label="Preço" value={event.price} />
              <MetaRow icon={FaUsers} label="Organização" value={event.organizer} />

              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-4 font-sans text-[0.84rem] font-light leading-[1.7] text-muted-foreground">
                  Confirme os detalhes directamente com a organização e acompanhe eventuais actualizações do evento.
                </p>

                {event.registrationUrl && event.registrationUrl !== "#" ? (
                  <a
                    href={event.registrationUrl}
                    className="block bg-primary px-5 py-3 text-center font-sans text-[0.9rem] font-medium uppercase tracking-[0.05em] text-white no-underline transition-opacity hover:opacity-90"
                  >
                    Inscrever-se
                  </a>
                ) : (
                  <button
                    type="button"
                    className="block w-full bg-primary px-5 py-3 text-center font-sans text-[0.9rem] font-medium uppercase tracking-[0.05em] text-white transition-opacity hover:opacity-90"
                  >
                    Pedir Informações
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <SectionHeader>Outros Eventos</SectionHeader>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
              {related.map((e) => (
                <Link
                  key={e.slug}
                  to="/eventos/$slug"
                  params={{ slug: e.slug }}
                  className="group block border-t border-border/80 pt-4 no-underline"
                >
                  <div className="mb-3 overflow-hidden">
                    <ImageWithFallback
                      src={e.image}
                      alt={e.title}
                      className="w-full h-[180px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {e.city && (
                    <Eyebrow className="mb-2 inline-block">{e.city}</Eyebrow>
                  )}
                  <Heading as="h3" variant="card-title" className="mb-2 text-foreground">
                    {e.title}
                  </Heading>
                  <p className="font-sans text-[0.84rem] font-normal uppercase tracking-[0.08em] text-muted-foreground">
                    {e.displayDate}
                  </p>
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
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 mb-4">
      <Icon size={15} className="text-primary mt-[3px]" />
      <div>
        <div className="font-sans text-[11px] text-muted-foreground tracking-[0.1em] uppercase mb-0.5">
          {label}
        </div>
        <div className="font-sans text-[0.92rem] font-normal leading-[1.55] text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}
