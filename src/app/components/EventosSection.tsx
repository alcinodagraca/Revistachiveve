import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FaChevronLeft, FaChevronRight, FaCalendarDays } from "react-icons/fa6";
import { Heading } from "./typography";

const eventSlugById: Record<number, string> = {
  1: "forum-empreendedorismo-maputo-2026",
  2: "summit-negocios-inovacao-beira",
  3: "tech-africa-solucoes-digitais-pme",
  4: "workshop-lideranca-feminina-negocios",
};

const eventos = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBldmVudCUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzc1NjQxMzQ4fDA&ixlib=rb-4.1.0&q=80&w=600",
    date: "15 Fev 2022",
    day: "15",
    month: "FEV",
    title: "Fórum de Empreendedorismo — Maputo 2022",
    location: "Maputo, Moçambique",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=600",
    date: "22 Mar 2022",
    day: "22",
    month: "MAR",
    title: "Summit de Negócios e Inovação — Beira",
    location: "Beira, Sofala",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3NTY0NDc2NHww&ixlib=rb-4.1.0&q=80&w=600",
    date: "10 Abr 2022",
    day: "10",
    month: "ABR",
    title: "Tech Africa: Soluções Digitais para PME",
    location: "Nampula, Moçambique",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1759310610552-914069ec2e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwbWFuYWdlbWVudCUyMHRlYW0lMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc1NjQ0NzcyfDA&ixlib=rb-4.1.0&q=80&w=600",
    date: "05 Mai 2022",
    day: "05",
    month: "MAI",
    title: "Workshop de Liderança Feminina nos Negócios",
    location: "Maputo, Moçambique",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1737442528819-5526652236e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwZmluYW5jZSUyMG1hcmtldCUyMGdyb3d0aHxlbnwxfHx8fDE3NzU2NDQ3NzF8MA&ixlib=rb-4.1.0&q=80&w=600",
    date: "18 Jun 2022",
    day: "18",
    month: "JUN",
    title: "Conferência de Finanças e Mercado de Capitais",
    location: "Maputo, Moçambique",
  },
];

export function EventosSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-secondary py-8">
      <div className="site-shell">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-primary/30 pb-4">
          <h2 className="font-sans text-[1.55rem] font-semibold uppercase leading-none tracking-[-0.03em] text-primary md:text-[2rem]">
            Eventos
          </h2>
          <div className="flex items-center gap-2 ml-6">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full transition-colors border border-border bg-background text-foreground"
              aria-label="Anterior"
            >
              <FaChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full transition-colors border border-border bg-background text-foreground"
              aria-label="Próximo"
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {eventos.map((evento) => (
            <article
              key={evento.id}
              className="flex-shrink-0 overflow-hidden group cursor-pointer w-[280px] rounded-lg border border-border bg-card"
            >
              <div className="relative overflow-hidden h-[160px]">
                <ImageWithFallback
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute top-3 left-3 flex flex-col items-center justify-center px-2 py-1 rounded text-white min-w-[44px]"
                  style={{ backgroundColor: "var(--chart-1)" }}
                >
                  <span className="font-sans text-xl font-bold leading-none">
                    {evento.day}
                  </span>
                  <span className="font-sans text-[10px] font-semibold tracking-[0.1em]">
                    {evento.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {eventSlugById[evento.id] ? (
                  <Link
                    to="/eventos/$slug"
                    params={{ slug: eventSlugById[evento.id] }}
                    className="block no-underline hover:underline"
                  >
                    <Heading as="h3" variant="card-title-sm" className="text-foreground">
                      {evento.title}
                    </Heading>
                  </Link>
                ) : (
                  <Link
                    to="/eventos"
                    className="block no-underline hover:underline"
                  >
                    <Heading as="h3" variant="card-title-sm" className="text-foreground">
                      {evento.title}
                    </Heading>
                  </Link>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <FaCalendarDays size={12} className="text-muted-foreground" />
                  <span className="font-sans text-xs font-normal text-muted-foreground">
                    {evento.date} · {evento.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
