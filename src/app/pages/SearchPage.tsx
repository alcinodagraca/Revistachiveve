import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search as SearchIcon } from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { searchArticles } from "../../data/articles";
import { searchEvents } from "../../data/events";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Heading, SectionHeader } from "../components/typography";

export default function SearchPage() {
  const { q } = useSearch({ from: "/pesquisa" });
  const navigate = useNavigate();
  const [input, setInput] = useState(q ?? "");

  const query = (q ?? "").trim();
  const articleResults = query ? searchArticles(query) : [];
  const eventResults = query ? searchEvents(query) : [];
  const total = articleResults.length + eventResults.length;

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
            placeholder="Pesquisar artigos, eventos, tags..."
            className="flex-1 px-4 py-3 bg-transparent outline-none font-sans text-base text-foreground"
          />
          <button
            type="submit"
            aria-label="Pesquisar"
            className="px-4 py-3 transition-opacity hover:opacity-80 text-muted-foreground"
          >
            <SearchIcon size={18} />
          </button>
        </form>

        {!query && (
          <EmptyState
            title="Comece a pesquisar"
            message="Escreva uma palavra-chave acima — pode ser um tema, um nome ou uma cidade."
          />
        )}

        {query && total === 0 && (
          <EmptyState
            title={`Nenhum resultado para "${query}"`}
            message="Tente outras palavras-chave ou explore as nossas categorias."
          />
        )}

        {query && total > 0 && (
          <>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              {total} resultado{total === 1 ? "" : "s"} para{" "}
              <strong className="text-foreground">"{query}"</strong>
            </p>

            {articleResults.length > 0 && (
              <section className="mb-12">
                <SectionHeader as="h2">Artigos</SectionHeader>
                <motion.div
                  variants={articleCardGridVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
                >
                  {articleResults.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </motion.div>
              </section>
            )}

            {eventResults.length > 0 && (
              <section>
                <SectionHeader as="h2">Eventos</SectionHeader>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                  {eventResults.map((e) => (
                    <Link
                      key={e.slug}
                      to="/eventos/$slug"
                      params={{ slug: e.slug }}
                      className="group block no-underline"
                    >
                      <div className="overflow-hidden rounded-lg mb-3">
                        <ImageWithFallback
                          src={e.image}
                          alt={e.title}
                          className="transition-transform duration-500 group-hover:scale-105 w-full h-[200px] object-cover block"
                        />
                      </div>
                      <div className="font-sans text-xs text-primary tracking-[0.1em] uppercase font-semibold mb-1">
                        {e.displayDate}
                      </div>
                      <div className="font-sans text-base font-semibold text-foreground leading-tight">
                        {e.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
