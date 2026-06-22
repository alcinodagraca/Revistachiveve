import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaDownload, FaCalendarDays, FaFileLines } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";

const currentEdition = {
  id: 1,
  title: "Abril 2026",
  subtitle: "Transformação Digital em Moçambique",
  cover: "https://images.unsplash.com/photo-1634224111525-7c631808aa61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGNvdmVyJTIwYnVzaW5lc3MlMjBmb3JiZXN8ZW58MXx8fHwxNzc1NjQ5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  date: "Abril 2026",
  featured: true,
  highlights: [
    "Especial: O futuro das fintechs em África",
    "Entrevista exclusiva com CEOs de sucesso",
    "Análise: Economia digital moçambicana",
    "Top 30 jovens empreendedores",
  ],
};

const pastEditions = [
  {
    id: 2,
    title: "Março 2026",
    subtitle: "O Futuro do Empreendedorismo",
    cover: "https://images.unsplash.com/photo-1647668068108-748576356aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwZWRpdG9yaWFsJTIwZGVzaWdufGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Março 2026",
  },
  {
    id: 3,
    title: "Fevereiro 2026",
    subtitle: "Liderança em Tempos de Mudança",
    cover: "https://images.unsplash.com/photo-1569097715724-f705a82c4a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWdhemluZSUyMGNvdmVyJTIwY29ycG9yYXRlfGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Fevereiro 2026",
  },
  {
    id: 4,
    title: "Janeiro 2026",
    subtitle: "Inovação e Sustentabilidade",
    cover: "https://images.unsplash.com/photo-1610251064409-8d94b0939629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBtYWdhemluZSUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc3NTY0OTc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Janeiro 2026",
  },
  {
    id: 5,
    title: "Dezembro 2025",
    subtitle: "Balanço do Ano Económico",
    cover: "https://images.unsplash.com/photo-1763889167910-b13b12b49bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMG5ld3NzdGFuZCUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc3NTY0OTc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Dezembro 2025",
  },
  {
    id: 6,
    title: "Novembro 2025",
    subtitle: "Startups Africanas em Destaque",
    cover: "https://images.unsplash.com/photo-1634224111525-7c631808aa61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGNvdmVyJTIwYnVzaW5lc3MlMjBmb3JiZXN8ZW58MXx8fHwxNzc1NjQ5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Novembro 2025",
  },
  {
    id: 7,
    title: "Outubro 2025",
    subtitle: "Investimento em Infraestrutura",
    cover: "https://images.unsplash.com/photo-1647668068108-748576356aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwZWRpdG9yaWFsJTIwZGVzaWdufGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Outubro 2025",
  },
];

export default function EdicaoImpressaPage() {
  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto pt-8 px-4">
        <PageHeader
          title="Edição Impressa"
          subtitle="Edições anteriores e a edição actual em formato digital"
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Edição Impressa" },
          ]}
        />
      </div>

      <section className="bg-secondary border-b border-border">
        <div className="max-w-[1280px] mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-8 md:gap-16 items-center">
            <div className="w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-[1.02]">
              <ImageWithFallback
                src={currentEdition.cover}
                alt={`Edição ${currentEdition.title}`}
                className="w-full h-auto aspect-[3/4] object-cover block"
              />
            </div>

            <div>
              <div className="inline-block py-1 px-4 bg-primary rounded-sm mb-4">
                <Eyebrow className="text-primary-foreground">Edição Atual</Eyebrow>
              </div>

              <Heading as="h1" variant="display" className="text-foreground mb-3">
                {currentEdition.title}
              </Heading>

              <Heading as="h2" variant="feature-title" className="text-foreground mb-6">
                {currentEdition.subtitle}
              </Heading>

              <div className="mb-8">
                <SectionHeader as="h3">Nesta Edição</SectionHeader>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {currentEdition.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="font-sans text-base text-foreground leading-[1.6]">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="inline-flex items-center gap-2 py-4 px-8 bg-primary text-primary-foreground border-none rounded-md font-sans text-base font-medium cursor-pointer transition-all duration-200 hover:bg-foreground hover:-translate-y-0.5">
                <FaDownload size={20} />
                Baixar Edição Atual
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto py-16 px-4">
        <div className="mb-12">
          <SectionHeader>Edições Anteriores</SectionHeader>
          <p className="font-sans text-base text-muted-foreground leading-[1.6]">
            Aceda ao arquivo completo das nossas publicações
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-y-12 gap-x-8">
          {pastEditions.map((edition) => (
            <article
              key={edition.id}
              className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
                <ImageWithFallback
                  src={edition.cover}
                  alt={`Edição ${edition.title}`}
                  className="w-full h-auto aspect-[3/4] object-cover block"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <FaCalendarDays size={14} className="text-muted-foreground" />
                <span className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-[0.05em]">
                  {edition.date}
                </span>
              </div>

              <Heading as="h3" variant="feature-title" className="text-foreground mb-1">
                {edition.title}
              </Heading>

              <p className="font-sans text-sm text-muted-foreground leading-[1.5] mb-3">
                {edition.subtitle}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary no-underline transition-[gap] duration-200 hover:gap-3"
              >
                <FaFileLines size={16} />
                Baixar PDF
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
