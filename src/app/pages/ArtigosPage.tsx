import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaNewspaper } from "react-icons/fa6";
import { EmptyState } from "../components/EmptyState";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ListPagination } from "../components/ListPagination";
import { PageHeader } from "../components/PageHeader";
import {
  ArticleCard,
  articleCardGridVariants,
} from "../components/ArticleCard";
import { Heading, Eyebrow, SectionHeader } from "../components/typography";
import { Route } from "../../routes/artigos.index";
import type { Article } from "../../server/wp";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link
        to="/artigos/$category/$slug"
        params={{ category: article.category, slug: article.slug }}
        className="group block no-underline"
      >
        <div className="mb-5 overflow-hidden">
          <ImageWithFallback
            src={article.heroImage}
            alt={article.title}
            className="block h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[340px]"
          />
        </div>

        {article.categoryName && (
          <Eyebrow className="inline-block mb-2">{article.categoryName}</Eyebrow>
        )}

        <Heading
          as="h2"
          variant="feature-title"
          className="mb-3 text-foreground transition-opacity group-hover:opacity-80 md:max-w-[28ch]"
        >
          {article.title}
        </Heading>

        <p className="mb-3 font-sans text-[0.88rem] font-normal text-muted-foreground">
          {formatDate(article.publishedAt)} · {article.readTime} min de leitura
        </p>

        <p className="max-w-[56ch] font-sans text-[0.96rem] font-light leading-[1.72] text-foreground/78">
          {article.excerpt}
        </p>
      </Link>
    </motion.article>
  );
}

export default function ArtigosPage() {
  const { list, currentPage } = Route.useLoaderData();
  const navigate = useNavigate();
  const [featured, rest] = [list.articles.slice(0, 2), list.articles.slice(2)];

  function handlePageChange(page: number) {
    navigate({ to: "/artigos", search: { page } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="site-shell py-8">
      <PageHeader
        title="Artigos"
        subtitle="Reportagens, entrevistas e leituras de contexto para acompanhar o momento económico com mais critério."
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Artigos" }]}
      />

      {list.articles.length === 0 ? (
        <EmptyState
          icon={FaNewspaper}
          title="Nenhum artigo ainda"
          message="A redacção está a preparar os primeiros artigos. Volte em breve para descobrir histórias sobre negócios, liderança e inovação em Moçambique."
          cta={{ label: "Voltar à página inicial", to: "/" }}
        />
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mb-16">
              <SectionHeader>Leituras em Destaque</SectionHeader>
              <motion.div
                variants={articleCardGridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
              >
                {featured.map((article) => (
                  <FeaturedCard key={article.id} article={article} />
                ))}
              </motion.div>
            </section>
          )}

          {rest.length > 0 ? (
            <>
              <SectionHeader>Para Continuar a Leitura</SectionHeader>
              <motion.div
                variants={articleCardGridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
              >
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </motion.div>
              <ListPagination
                currentPage={currentPage}
                totalPages={list.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : list.totalPages > 1 ? (
            <ListPagination
              currentPage={currentPage}
              totalPages={list.totalPages}
              onPageChange={handlePageChange}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
