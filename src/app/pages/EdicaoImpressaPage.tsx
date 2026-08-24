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
        <div className="site-shell pt-8 pb-16">
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
      <div className="site-shell pt-8">
        <PageHeader
          title="Edição Impressa"
          subtitle="A edição actual e o arquivo recente da revista, com leituras de referência sobre negócios, liderança e transformação económica."
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Edição Impressa" },
          ]}
        />
      </div>

      <section className="border-b border-border bg-secondary">
        <div className="site-shell py-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,400px)_1fr] md:gap-16">
            <div className="w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-[1.02]">
              <ImageWithFallback
                src={current.cover}
                alt={`Edição ${current.title}`}
                className="w-full h-auto aspect-[3/4] object-cover block"
              />
            </div>

            <div>
              <Eyebrow className="mb-3 inline-block">Edição Actual</Eyebrow>

              <Heading as="h1" variant="article-title" className="mb-2 text-foreground">
                {current.title}
              </Heading>

              {current.date && (
                <p className="mb-5 font-sans text-[0.84rem] font-medium uppercase tracking-[0.12em] text-primary">
                  {current.date}
                </p>
              )}

              {current.subtitle && (
                <p className="mb-5 max-w-2xl font-sans text-[1.02rem] font-light leading-[1.72] text-foreground/78">
                  {current.subtitle}
                </p>
              )}

              <div className="mb-8 max-w-3xl space-y-4 font-sans text-[0.96rem] font-light leading-[1.76] text-foreground/76">
                <p>
                  Esta edição reúne temas, protagonistas e sinais que ajudam a
                  compreender o momento dos negócios em Moçambique e no espaço
                  africano mais amplo.
                </p>
                <p>
                  É uma leitura pensada para quem prefere contexto, critério e
                  selecção editorial a informação dispersa.
                </p>
              </div>

              {current.highlights.length > 0 && (
                <div className="mb-8 border-t border-primary/25 pt-5">
                  <p className="mb-4 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                    Leituras em destaque nesta edição
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {current.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="font-sans text-[0.95rem] font-light leading-[1.68] text-foreground">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl font-sans text-[0.84rem] font-light leading-[1.7] text-muted-foreground">
                  Disponível em formato digital para leitura, consulta e download.
                </p>

                {current.pdfDownloadUrl ? (
                  <a
                    href={current.pdfDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-none bg-primary px-7 py-3.5 font-sans text-[0.94rem] font-medium text-primary-foreground no-underline transition-all duration-200 hover:bg-foreground hover:-translate-y-0.5"
                  >
                    <FaDownload size={18} />
                    Abrir Edição
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-2 border-none bg-primary px-7 py-3.5 font-sans text-[0.94rem] font-medium text-primary-foreground transition-all duration-200 hover:bg-foreground hover:-translate-y-0.5">
                    <FaDownload size={18} />
                    Abrir Edição
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell py-16">
        <div className="mb-12">
          <SectionHeader>Edições Anteriores</SectionHeader>
          <p className="font-sans text-[0.95rem] font-light text-muted-foreground leading-[1.7]">
            Consulte o arquivo recente da revista e revisite temas, perfis e análises das edições anteriores.
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
