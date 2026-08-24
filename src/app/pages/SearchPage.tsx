import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { EmptyState } from "../components/EmptyState";
import { ListPagination } from "../components/ListPagination";
import { PageHeader } from "../components/PageHeader";
import { SectionHeader } from "../components/typography";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Route } from "../../routes/pesquisa";

export default function SearchPage() {
  const { list, q, currentPage } = Route.useLoaderData();
  const navigate = useNavigate();
  const [input, setInput] = useState(q ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/pesquisa", search: { q: input.trim(), page: 1 } });
  }

  function handlePageChange(page: number) {
    navigate({ to: "/pesquisa", search: { q, page } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-background min-h-[70vh]">
      <div className="site-shell pt-8 pb-12">
        <PageHeader
          title="Pesquisa"
          subtitle="Procure temas, nomes e palavras-chave para regressar rapidamente às leituras que importam."
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Pesquisa" }]}
        />

        <div className="mb-8 border-b border-border pb-8">
          <p className="mb-4 max-w-3xl font-sans text-[0.98rem] font-light leading-[1.72] text-foreground/76">
            Pesquise no arquivo editorial da revista para encontrar entrevistas,
            análises e reportagens por tema, sector ou protagonista.
          </p>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 md:flex-row md:items-center"
          >
            <Input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pesquisar artigos por palavra-chave..."
              className="h-11 flex-1 px-4"
            />
            <Button type="submit" size="lg" className="gap-2 px-6">
              <FaMagnifyingGlass size={15} />
              Pesquisar
            </Button>
          </form>
        </div>

        {!q && (
          <EmptyState
            icon={FaMagnifyingGlass}
            title="Comece a pesquisar"
            message="Escreva uma palavra-chave acima — pode ser um tema, um nome ou uma cidade."
          />
        )}

        {q && list.articles.length === 0 && (
          <EmptyState
            icon={FaMagnifyingGlass}
            title={`Nenhum resultado para "${q}"`}
            message="Tente outras palavras-chave ou explore as nossas categorias."
            cta={{ label: "Ver todos os artigos", to: "/artigos" }}
          />
        )}

        {q && list.articles.length > 0 && (
          <>
            <p className="mb-8 font-sans text-sm text-muted-foreground">
              Resultados para <strong className="text-foreground">"{q}"</strong>
            </p>

            <section>
              <SectionHeader as="h2">Resultados da Pesquisa</SectionHeader>
              <motion.div
                variants={articleCardGridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
              >
                {list.articles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </motion.div>
              <ListPagination
                currentPage={currentPage}
                totalPages={list.totalPages}
                onPageChange={handlePageChange}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
