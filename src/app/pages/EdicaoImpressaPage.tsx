import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaDownload, FaCalendarDays, FaFileLines, FaBook } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/edicao-impressa";

export default function EdicaoImpressaPage() {
  const { editions } = Route.useLoaderData();

  if (!editions || editions.length === 0) {
    return (
      <div className="bg-background">
        <div className="max-w-[1280px] mx-auto pt-8 px-4 pb-16">
          <PageHeader
            title="Edição Impressa"
            subtitle="Edições anteriores e a edição actual em formato digital"
            breadcrumbs={[
              { label: "Início", to: "/" },
              { label: "Edição Impressa" },
            ]}
          />
          <EmptyState
            icon={FaBook}
            title="Nenhuma edição disponível"
            message="Estamos a preparar as próximas edições da Revista Chiveve. Volte em breve para descarregar os novos números."
            cta={{ label: "Voltar à página inicial", to: "/" }}
          />
        </div>
      </div>
    );
  }

  // Pick the most-recent featured for the hero, others go to the archive grid.
  const current = editions.find((e) => e.featured) ?? editions[0];
  const past = editions.filter((e) => e !== current);

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
                src={current.cover}
                alt={`Edição ${current.title}`}
                className="w-full h-auto aspect-[3/4] object-cover block"
              />
            </div>

            <div>
              <div className="inline-block py-1 px-4 bg-primary rounded-sm mb-4">
                <Eyebrow className="text-primary-foreground">Edição Atual</Eyebrow>
              </div>

              <Heading as="h1" variant="display" className="text-foreground mb-3">
                {current.title}
              </Heading>

              {current.subtitle && (
                <Heading as="h2" variant="feature-title" className="text-foreground mb-6">
                  {current.subtitle}
                </Heading>
              )}

              {current.highlights.length > 0 && (
                <div className="mb-8">
                  <SectionHeader as="h3">Nesta Edição</SectionHeader>
                  <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {current.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="font-sans text-base text-foreground leading-[1.6]">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {current.pdfDownloadUrl ? (
                <a
                  href={current.pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-4 px-8 bg-primary text-primary-foreground border-none rounded-md font-sans text-base font-medium cursor-pointer transition-all duration-200 hover:bg-foreground hover:-translate-y-0.5 no-underline"
                >
                  <FaDownload size={20} />
                  Baixar Edição Atual
                </a>
              ) : (
                <button className="inline-flex items-center gap-2 py-4 px-8 bg-primary text-primary-foreground border-none rounded-md font-sans text-base font-medium cursor-pointer transition-all duration-200 hover:bg-foreground hover:-translate-y-0.5">
                  <FaDownload size={20} />
                  Baixar Edição Atual
                </button>
              )}
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
          {past.map((edition) => (
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

              {edition.date && (
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarDays size={14} className="text-muted-foreground" />
                  <span className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-[0.05em]">
                    {edition.date}
                  </span>
                </div>
              )}

              <Heading as="h3" variant="feature-title" className="text-foreground mb-1">
                {edition.title}
              </Heading>

              {edition.subtitle && (
                <p className="font-sans text-sm text-muted-foreground leading-[1.5] mb-3">
                  {edition.subtitle}
                </p>
              )}

              {edition.pdfDownloadUrl && (
                <a
                  href={edition.pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary no-underline transition-[gap] duration-200 hover:gap-3"
                >
                  <FaFileLines size={16} />
                  Baixar PDF
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
