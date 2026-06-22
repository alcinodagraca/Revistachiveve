import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Breadcrumb } from "../components/Breadcrumb";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { Heading, SectionHeader } from "../components/typography";
import { Route } from "../../routes/pesquisa";

export default function SearchPage() {
  const { list, q } = Route.useLoaderData();
  const navigate = useNavigate();
  const [input, setInput] = useState(q ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/pesquisa", search: { q: input.trim() } });
  }

  return (
    <div className="bg-background min-h-[70vh]">
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-12">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Início", to: "/" }, { label: "Pesquisa" }]} />
        </div>

        <Heading as="h1" variant="page-title" className="text-foreground mb-6">
          Pesquisar
        </Heading>

        <form
          onSubmit={onSubmit}
          className="flex items-center border border-border rounded-md bg-[var(--input-background)] mb-8"
        >
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pesquisar artigos por palavra-chave..."
            className="flex-1 px-4 py-3 bg-transparent outline-none font-sans text-base text-foreground"
          />
          <button
            type="submit"
            aria-label="Pesquisar"
            className="px-4 py-3 transition-opacity hover:opacity-80 text-muted-foreground"
          >
            <FaMagnifyingGlass size={18} />
          </button>
        </form>

        {!q && (
          <EmptyState
            title="Comece a pesquisar"
            message="Escreva uma palavra-chave acima — pode ser um tema, um nome ou uma cidade."
          />
        )}

        {q && list.articles.length === 0 && (
          <EmptyState
            title={`Nenhum resultado para "${q}"`}
            message="Tente outras palavras-chave ou explore as nossas categorias."
          />
        )}

        {q && list.articles.length > 0 && (
          <>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              {list.total} resultado{list.total === 1 ? "" : "s"} para{" "}
              <strong className="text-foreground">"{q}"</strong>
            </p>

            <section>
              <SectionHeader as="h2">Artigos</SectionHeader>
              <motion.div
                variants={articleCardGridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              >
                {list.articles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </motion.div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="text-center px-4 py-12 border border-dashed border-border rounded-lg bg-secondary">
      <Heading as="h2" variant="feature-title" className="text-foreground mb-2">
        {title}
      </Heading>
      <p className="font-sans text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
