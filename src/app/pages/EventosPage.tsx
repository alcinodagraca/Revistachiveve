import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaCalendarDays, FaLocationDot, FaClock } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";

// Featured events (2 events)
const featuredEvents = [
  {
    id: 1,
    title: "Fórum de Empreendedorismo 2026",
    date: "15 Maio 2026",
    time: "09:00 - 17:00",
    location: "Hotel Polana, Maputo",
    image: "https://images.unsplash.com/photo-1769798643582-32ef781c45d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBzcGVha2Vyc3xlbnwxfHx8fDE3NzU2Mjk1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "O maior evento de empreendedorismo em Moçambique. Participe de palestras, workshops e networking com os principais líderes empresariais do país.",
    category: "Empreendedorismo",
  },
  {
    id: 2,
    title: "Workshop: Liderança 4.0",
    date: "22 Maio 2026",
    time: "14:00 - 18:00",
    location: "Centro de Conferências, Maputo",
    image: "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTU5MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Desenvolva competências de liderança moderna com especialistas internacionais. Workshop prático com cases de sucesso.",
    category: "Liderança",
  },
];

// Regular events (for the grid)
const regularEvents = [
  {
    id: 3,
    title: "Networking Night: Conexões de Negócios",
    date: "30 Maio 2026",
    time: "18:00 - 22:00",
    location: "Sky Bar, Maputo",
    image: "https://images.unsplash.com/photo-1772724317613-f9a09ca9cfe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc3NTY0ODg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Conecte-se com líderes empresariais em um ambiente descontraído.",
    category: "Networking",
  },
  {
    id: 4,
    title: "Pitch Day: Startups Inovadoras",
    date: "5 Junho 2026",
    time: "10:00 - 16:00",
    location: "Hub de Inovação, Maputo",
    image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHBpdGNoJTIwZXZlbnR8ZW58MXx8fHwxNzc1NjQ4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Assista apresentações de startups e encontre oportunidades de investimento.",
    category: "Inovação",
  },
  {
    id: 5,
    title: "Summit de Inovação e Tecnologia",
    date: "12 Junho 2026",
    time: "09:00 - 18:00",
    location: "Centro Internacional de Conferências",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwc3VtbWl0JTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Explore as últimas tendências em tecnologia e inovação empresarial.",
    category: "Tecnologia",
  },
  {
    id: 6,
    title: "Painel: Economia Digital em África",
    date: "20 Junho 2026",
    time: "15:00 - 18:00",
    location: "Auditório Joaquim Chissano",
    image: "https://images.unsplash.com/photo-1769798643582-32ef781c45d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBzcGVha2Vyc3xlbnwxfHx8fDE3NzU2Mjk1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Discussão sobre o futuro da economia digital no continente africano.",
    category: "Economia",
  },
  {
    id: 7,
    title: "Workshop: Marketing Digital Avançado",
    date: "28 Junho 2026",
    time: "13:00 - 17:00",
    location: "Centro de Formação Digital",
    image: "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTU5MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Aprenda estratégias avançadas de marketing digital para negócios.",
    category: "Marketing",
  },
  {
    id: 8,
    title: "Encontro de Investidores",
    date: "5 Julho 2026",
    time: "16:00 - 20:00",
    location: "Clube de Negócios, Maputo",
    image: "https://images.unsplash.com/photo-1772724317613-f9a09ca9cfe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc3NTY0ODg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Conecte-se com investidores ativos no ecossistema empreendedor.",
    category: "Investimento",
  },
  {
    id: 9,
    title: "Conferência de Sustentabilidade",
    date: "15 Julho 2026",
    time: "09:00 - 17:00",
    location: "Campus Universitário",
    image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHBpdGNoJTIwZXZlbnR8ZW58MXx8fHwxNzc1NjQ4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Debata práticas sustentáveis no mundo dos negócios.",
    category: "Sustentabilidade",
  },
];

export default function EventosPage() {
  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <PageHeader
          title="Eventos"
          subtitle="Participe nos nossos eventos e amplie a sua rede de contactos profissionais"
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Eventos" }]}
        />

        <div className="mb-16">
          <SectionHeader>Em Destaque</SectionHeader>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
            {featuredEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[280px] object-cover block"
                  />
                </div>

                <div className="pt-4">
                  <div className="inline-block mb-2">
                    <Eyebrow>{event.category}</Eyebrow>
                  </div>

                  <Heading as="h3" variant="feature-title" className="text-foreground mb-3 leading-[1.3]">
                    {event.title}
                  </Heading>

                  <p className="font-sans text-sm text-muted-foreground leading-[1.6] mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarDays size={16} className="text-primary" />
                      <span className="font-sans text-sm font-medium text-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock size={16} className="text-primary" />
                      <span className="font-sans text-sm font-medium text-foreground">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationDot size={16} className="text-primary" />
                      <span className="font-sans text-sm font-medium text-foreground">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 px-6 rounded-md bg-primary text-primary-foreground border-none font-sans text-sm font-medium cursor-pointer transition-opacity hover:opacity-90">
                    Inscrever-se
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader>Próximos Eventos</SectionHeader>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {regularEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[200px] object-cover block"
                  />
                </div>

                <div className="pt-4">
                  <div className="inline-block mb-2">
                    <Eyebrow>{event.category}</Eyebrow>
                  </div>

                  <Heading as="h3" variant="card-title" className="text-foreground mb-2 leading-[1.3]">
                    {event.title}
                  </Heading>

                  <p className="font-sans text-sm text-muted-foreground leading-[1.6] mb-3">
                    {event.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarDays size={14} className="text-primary" />
                      <span className="font-sans text-xs font-medium text-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock size={14} className="text-primary" />
                      <span className="font-sans text-xs font-medium text-foreground">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationDot size={14} className="text-primary" />
                      <span className="font-sans text-xs font-medium text-foreground">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 px-5 rounded-md bg-primary text-primary-foreground border-none font-sans text-xs font-medium cursor-pointer transition-opacity hover:opacity-90">
                    Inscrever-se
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
