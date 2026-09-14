import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaClock, FaNewspaper } from "react-icons/fa6";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { EmptyState } from "../components/EmptyState";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/typography";
import { Route } from "../../routes/artigos.index";
import type { Article, Edition } from "../../server/wp";

function RecentArticle({ article }: { article: Article }) {
  return (
    <li>
      <Link
        to="/artigos/$category/$slug"
        params={{ category: article.category, slug: article.slug }}
        className="group grid min-h-24 grid-cols-[88px_minmax(0,1fr)] gap-4 border-b border-border py-4 no-underline first:pt-0 last:border-b-0 last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ImageWithFallback
          src={article.heroImage}
          alt=""
          className="block h-20 w-[88px] bg-secondary object-contain object-center"
        />
        <div className="min-w-0">
          <Heading
            as="h3"
            variant="card-title"
            className="line-clamp-3 text-[0.92rem] leading-[1.35] text-foreground transition-colors group-hover:text-primary"
          >
            {article.title}
          </Heading>
          <p className="mt-2 flex items-center gap-1.5 font-sans text-xs text-foreground/65">
            <FaClock aria-hidden size={12} />
            {article.readTime} min de leitura
          </p>
        </div>
      </Link>
    </li>
  );
}

function CurrentEdition({ edition }: { edition: Edition }) {
  return (
    <section aria-labelledby="current-edition-heading">
      <div className="mb-6 border-b border-primary/28 pb-2.5">
        <Heading
          id="current-edition-heading"
          as="h2"
          variant="feature-title"
          className="font-medium uppercase text-primary"
        >
          Última edição
        </Heading>
      </div>

      <div className="bg-primary p-5 text-primary-foreground">
        <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
          <ImageWithFallback
            src={edition.cover}
            alt={`Capa da edição ${edition.title}`}
            className="block aspect-[3/4] w-[104px] object-cover"
          />
          <div className="flex min-w-0 flex-col items-start">
            <p className="font-sans text-[0.98rem] font-medium leading-[1.4]">
              {edition.title}
            </p>
            {edition.date && (
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.08em] text-primary-foreground/80">
                {edition.date}
              </p>
            )}
            {edition.pdfDownloadUrl && (
              <a
                href={edition.pdfDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-[44px] items-center gap-2 bg-white px-4 py-2 font-sans text-sm font-medium text-primary no-underline transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Abrir edição
                <FaArrowRight aria-hidden size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ArtigosPage() {
  const data = Route.useLoaderData();
  const sections = data?.sections ?? [];
  const recent = data?.recent ?? [];
  const currentEdition = data?.currentEdition ?? null;

  return (
    <div className="site-shell py-8">
      <PageHeader
        title="Artigos"
        subtitle="Leituras sobre negócios, economia e empreendedorismo em Moçambique. Reportagens, entrevistas, análises e opiniões sobre empresas, liderança e inovação."
        subtitleClassName="max-w-4xl text-foreground/65"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Artigos" }]}
      />

      {sections.length === 0 ? (
        <EmptyState
          icon={FaNewspaper}
          title="Nenhum artigo ainda"
          message="A redacção está a preparar os primeiros artigos. Volte em breve para descobrir histórias sobre negócios, liderança e inovação em Moçambique."
          cta={{ label: "Voltar à página inicial", to: "/" }}
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-16">
          <div className="min-w-0">
            {sections.map(({ category, articles }) => (
              <section key={category.id} className="mb-16 last:mb-0">
                <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-3">
                  <Heading as="h2" variant="feature-title" className="text-foreground">
                    {category.name}
                  </Heading>
                  <Link
                    to="/artigos/$category"
                    params={{ category: category.slug }}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 px-1 font-sans text-sm font-medium text-primary no-underline transition-[gap] hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    Ver todos
                    <FaArrowRight aria-hidden size={13} />
                  </Link>
                </div>

                <motion.div
                  variants={articleCardGridVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
                >
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </motion.div>
              </section>
            ))}
          </div>

          <aside aria-label="Conteúdo recente" className="space-y-10 lg:sticky lg:top-8">
            {currentEdition && <CurrentEdition edition={currentEdition} />}

            {recent.length > 0 && (
              <section aria-labelledby="recent-heading">
                <div className="mb-6 border-b border-primary/28 pb-2.5">
                  <Heading
                    id="recent-heading"
                    as="h2"
                    variant="feature-title"
                    className="font-medium uppercase text-primary"
                  >
                    Mais recentes
                  </Heading>
                </div>
                <ul className="m-0 list-none p-0">
                  {recent.map((article) => (
                    <RecentArticle key={article.id} article={article} />
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
