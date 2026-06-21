import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader, Heading } from "./typography";

const eventSlugById: Record<number, string> = {
  1: "workshop-lideranca-feminina-negocios",
  2: "forum-empreendedorismo-maputo-2026",
  3: "summit-negocios-inovacao-beira",
  4: "tech-africa-solucoes-digitais-pme",
};

const eventos = [
  {
    id: 1,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTY1MjQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Forbes Mulheres 2026",
    subtitle: "Quem são as 100 brasileiras mais poderosas, segundo a Forbes",
    date: "03 de Abril",
  },
  {
    id: 2,
    category: "Empreendedorismo",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBtZWV0aW5nJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzc1NjUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Under 30 Summit",
    subtitle: "Os jovens que estão revolucionando o mundo dos negócios",
    date: "15 de Março",
  },
  {
    id: 3,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRpbm5lciUyMGV2ZW50JTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NzU2NTI0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Forbes Agro 100",
    subtitle: "Conheça os 100 líderes do agronegócio brasileiro",
    date: "28 de Fevereiro",
  },
  {
    id: 4,
    category: "Inovação",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGV2ZW50JTIwYnVzaW5lc3MlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzc1NjUyNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Tech Innovation Summit",
    subtitle: "Descubra as startups que estão transformando o mercado",
    date: "10 de Janeiro",
  },
];

export function EventosPassadosSection() {
  return (
    <section className="bg-[#F5F5F5] py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <SectionHeader action={{ label: "Ver todos →", to: "/eventos" }}>
          Eventos Passados
        </SectionHeader>

        <div className="grid grid-cols-4 gap-6">
          {eventos.map((evento) => (
            <article key={evento.id}>
              <Link
                to="/eventos/$slug"
                params={{ slug: eventSlugById[evento.id] ?? "forum-empreendedorismo-maputo-2026" }}
                className="group block overflow-hidden mb-4 relative no-underline"
              >
                <div className="absolute top-3 left-3 bg-black/80 text-white py-1 px-3 font-sans text-xs font-semibold uppercase tracking-[0.05em] z-[1]">
                  {evento.category}
                </div>

                <ImageWithFallback
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-[240px] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-2">
                {evento.date}
              </p>

              <Link
                to="/eventos/$slug"
                params={{ slug: eventSlugById[evento.id] ?? "forum-empreendedorismo-maputo-2026" }}
                className="block no-underline transition-colors hover:text-primary"
              >
                <Heading as="h3" variant="card-title" className="text-foreground mb-2">
                  {evento.title}
                </Heading>
              </Link>

              <p className="font-sans text-sm font-normal text-muted-foreground leading-[1.5]">
                {evento.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
