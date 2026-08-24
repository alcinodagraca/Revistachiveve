import { useState } from "react";
import {
  FaFileLines,
  FaCalendarDays,
  FaUpRightFromSquare,
  FaBriefcase,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { ListPagination } from "../components/ListPagination";
import { Heading, SectionHeader } from "../components/typography";
import { Input } from "../components/ui/input";
import { Route } from "../../routes/concursos-publicos";
import type { Tender } from "../../server/wp";

const MOCK_TENDERS: Tender[] = [
  {
    id: 1,
    slug: "assistente-administrativo-minfin",
    title: "Assistente Administrativo",
    institution: "Ministério das Finanças",
    deadline: "30 Setembro 2026",
    type: "Concurso Público",
    vacancies: 5,
  },
  {
    id: 2,
    slug: "gestor-projectos-banco-mocambique",
    title: "Gestor de Projectos",
    institution: "Banco de Moçambique",
    deadline: "15 Outubro 2026",
    type: "Concurso Limitado",
    vacancies: 2,
  },
  {
    id: 3,
    slug: "analista-sistemas-ine",
    title: "Analista de Sistemas",
    institution: "Instituto Nacional de Estatística",
    deadline: "25 Outubro 2026",
    type: "Concurso Público",
    vacancies: 3,
  },
  {
    id: 4,
    slug: "economista-senior-at",
    title: "Economista Sénior",
    institution: "Autoridade Tributária de Moçambique",
    deadline: "10 Novembro 2026",
    type: "Concurso Público",
    vacancies: 4,
  },
];

export default function ConcursosPublicosPage() {
  const { tenders, currentPage, totalPages, total } = Route.useLoaderData();
  const navigate = useNavigate();
  const items = tenders ?? [];
  const effectiveTotalPages = totalPages || 1;
  const typeOptions = [
    "Todos os tipos",
    ...Array.from(new Set(items.map((item) => item.type).filter(Boolean))),
  ];
  const [selectedType, setSelectedType] = useState("Todos os tipos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesType =
      selectedType === "Todos os tipos" || item.type === selectedType;
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const matchesSearch =
      normalizedQuery === "" ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.institution.toLowerCase().includes(normalizedQuery);

    return matchesType && matchesSearch;
  });

  function handlePageChange(page: number) {
    navigate({ to: "/concursos-publicos", search: { page } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-background">
      <div className="site-shell py-12 md:py-14">
        <PageHeader
          title="Concursos Públicos"
          subtitle="Oportunidades no sector público reunidas para consulta rápida, com o essencial de cada edital."
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Concursos Públicos" }]}
        />

        {items.length === 0 ? (
          <EmptyState
            icon={FaBriefcase}
            title="Sem concursos publicados"
            message="Ainda não existem editais disponíveis nesta secção. Assim que novos concursos forem publicados, passam a aparecer aqui."
            cta={{ label: "Ver edições recentes", to: "/edicao-impressa" }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
            <aside className="h-fit border border-border bg-card p-5 lg:sticky lg:top-24">
              <div className="mb-8">
                <label className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                  Pesquisar
                </label>
                <div className="relative flex items-center">
                  <FaMagnifyingGlass size={18} className="absolute left-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cargo ou instituição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 w-full border-border bg-[var(--input-background)] py-3 pr-3 pl-[42px] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                  Tipo de concurso
                </label>
                <div className="flex flex-col gap-1">
                  {typeOptions.map((type) => {
                    const isSelected = selectedType === type;
                    const count =
                      type === "Todos os tipos"
                        ? items.length
                        : items.filter((item) => item.type === type).length;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={
                          "flex items-center justify-between border-none px-0 py-2.5 font-sans text-sm cursor-pointer text-left transition-all border-b border-border/70 last:border-b-0 " +
                          (isSelected
                            ? "text-foreground font-medium"
                            : "bg-transparent text-foreground/72 font-normal hover:text-foreground")
                        }
                      >
                        <span>{type}</span>
                        <span className="text-[11px] text-muted-foreground">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </aside>

            <main className="min-w-0">
              <SectionHeader>Concursos em Destaque</SectionHeader>

              {filteredItems.length === 0 ? (
                <EmptyState
                  icon={FaBriefcase}
                  title="Nenhum concurso encontrado"
                  message="Tente ajustar os filtros ou usar outra palavra-chave na pesquisa."
                />
              ) : (
                <div className="space-y-6">
                  {filteredItems.map((concurso) => (
                    <article
                      key={concurso.id}
                      className="border border-border bg-card p-5 md:p-6"
                    >
                      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-start">
                        <div className="min-w-0">
                          <Heading as="h2" variant="feature-title" className="mb-2 max-w-[34ch] text-foreground">
                            {concurso.title}
                          </Heading>

                          <p className="mb-4 font-sans text-[0.96rem] font-light leading-[1.68] text-foreground/78">
                            {concurso.institution}
                          </p>

                          <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <FaCalendarDays size={14} className="shrink-0 text-primary" />
                              <span className="font-sans text-[0.9rem] font-normal text-foreground">
                                Prazo: {concurso.deadline || "Por confirmar"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <FaFileLines size={14} className="shrink-0 text-primary" />
                              <span className="font-sans text-[0.9rem] font-normal text-foreground">
                                {concurso.vacancies} {concurso.vacancies === 1 ? "vaga" : "vagas"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex lg:justify-end">
                          {concurso.editalUrl ? (
                            <a
                              href={concurso.editalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 whitespace-nowrap border-none bg-primary px-6 py-3 font-sans text-[0.9rem] font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
                            >
                              Ver Edital
                              <FaUpRightFromSquare size={15} />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 whitespace-nowrap border-none bg-primary px-6 py-3 font-sans text-[0.9rem] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                            >
                              Ver Edital
                              <FaUpRightFromSquare size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        )}

        {items.length > 0 && (
          <ListPagination
            currentPage={currentPage}
            totalPages={effectiveTotalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
