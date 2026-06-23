import { FaFileLines, FaCalendarDays, FaUpRightFromSquare, FaBriefcase } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { Heading } from "../components/typography";
import { Route } from "../../routes/concursos-publicos";
import type { Tender } from "../../server/wp";

const concursos = [
  {
    id: 1,
    title: "Assistente Administrativo",
    institution: "Ministério das Finanças",
    deadline: "30 Abril 2026",
    type: "Concurso Público",
    vacancies: 5,
  },
  {
    id: 2,
    title: "Gestor de Projectos",
    institution: "Banco de Moçambique",
    deadline: "15 Maio 2026",
    type: "Concurso Limitado",
    vacancies: 2,
  },
  {
    id: 3,
    title: "Analista de Sistemas",
    institution: "Instituto Nacional de Estatística",
    deadline: "25 Maio 2026",
    type: "Concurso Público",
    vacancies: 3,
  },
  {
    id: 4,
    title: "Economista Sénior",
    institution: "Autoridade Tributária de Moçambique",
    deadline: "10 Junho 2026",
    type: "Concurso Público",
    vacancies: 4,
  },
];

const MOCK_TENDERS: Tender[] = concursos.map((c) => ({
  id: c.id,
  slug: `concurso-${c.id}`,
  title: c.title,
  institution: c.institution,
  deadline: c.deadline,
  type: c.type,
  vacancies: c.vacancies,
}));

export default function ConcursosPublicosPage() {
  const { tenders } = Route.useLoaderData();
  const items = tenders ?? MOCK_TENDERS;

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <PageHeader
        title="Concursos Públicos"
        subtitle="Oportunidades no sector público"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Concursos Públicos" }]}
      />

      {items.length === 0 ? (
        <EmptyState
          icon={FaBriefcase}
          title="Sem concursos abertos"
          message="De momento não há concursos públicos publicados. Esta página actualiza assim que novos editais forem abertos."
          cta={{ label: "Ver edições recentes", to: "/edicao-impressa" }}
        />
      ) : (
      <div className="grid gap-6">
        {items.map((concurso) => (
          <div
            key={concurso.id}
            className="p-6 rounded-lg border border-border bg-card transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <div className="inline-block px-3 py-1 rounded bg-secondary mb-3">
                  <span className="font-sans text-[11px] font-semibold text-primary uppercase tracking-[0.05em]">
                    {concurso.type}
                  </span>
                </div>
                <Heading as="h2" variant="feature-title" className="text-foreground mb-2">
                  {concurso.title}
                </Heading>
                <p className="font-sans font-medium text-base text-muted-foreground mb-4">
                  {concurso.institution}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarDays size={16} className="text-muted-foreground" />
                    <span className="font-sans font-normal text-sm text-muted-foreground">
                      Prazo: {concurso.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaFileLines size={16} className="text-muted-foreground" />
                    <span className="font-sans font-normal text-sm text-muted-foreground">
                      {concurso.vacancies} {concurso.vacancies === 1 ? "vaga" : "vagas"}
                    </span>
                  </div>
                </div>
              </div>
              {concurso.editalUrl ? (
                <a
                  href={concurso.editalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground border-none font-sans font-medium text-sm cursor-pointer transition-opacity whitespace-nowrap hover:opacity-90 no-underline"
                >
                  Ver Edital
                  <FaUpRightFromSquare size={16} />
                </a>
              ) : (
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground border-none font-sans font-medium text-sm cursor-pointer transition-opacity whitespace-nowrap hover:opacity-90"
                >
                  Ver Edital
                  <FaUpRightFromSquare size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
