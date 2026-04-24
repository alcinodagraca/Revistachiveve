import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

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
    <section className="px-4 md:px-8 py-8" style={{ backgroundColor: "var(--secondary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <h2
              className="mb-2"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-20)",
                fontWeight: "var(--font-weight-extra-bold)",
                color: "var(--chart-1)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Eventos
            </h2>
            <div
              className="w-full"
              style={{ height: "2px", backgroundColor: "var(--chart-1)" }}
            />
          </div>
          <div className="flex items-center gap-2 ml-6">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full transition-colors"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full transition-colors"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {eventos.map((evento) => (
            <article
              key={evento.id}
              className="flex-shrink-0 overflow-hidden group cursor-pointer"
              style={{
                width: "280px",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "160px" }}>
                <ImageWithFallback
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Date badge */}
                <div
                  className="absolute top-3 left-3 flex flex-col items-center justify-center px-2 py-1 rounded"
                  style={{
                    backgroundColor: "var(--chart-1)",
                    color: "#ffffff",
                    minWidth: "44px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-20)",
                      fontWeight: "var(--font-weight-extra-bold)",
                      lineHeight: "1",
                    }}
                  >
                    {evento.day}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "var(--font-weight-semi-bold)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {evento.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <a
                  href="#"
                  className="block hover:underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-14)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--chart-1)",
                    lineHeight: "1.4",
                  }}
                >
                  {evento.title}
                </a>
                <div className="flex items-center gap-1 mt-2">
                  <Calendar size={12} style={{ color: "var(--muted-foreground)" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                    }}
                  >
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
