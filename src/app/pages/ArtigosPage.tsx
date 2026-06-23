import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaNewspaper } from "react-icons/fa6";
import { Breadcrumb } from "../components/Breadcrumb";
import { EmptyState } from "../components/EmptyState";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  ArticleCard,
  articleCardGridVariants,
} from "../components/ArticleCard";
import { Heading, Eyebrow } from "../components/typography";
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
        <div className="overflow-hidden mb-5 rounded-md">
          <ImageWithFallback
            src={article.heroImage}
            alt={article.title}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105 h-[280px] md:h-[420px]"
          />
        </div>

        {article.categoryName && (
          <Eyebrow className="inline-block mb-2">{article.categoryName}</Eyebrow>
        )}

        <Heading
          as="h2"
          variant="feature-title"
          className="text-foreground mb-3 transition-opacity group-hover:opacity-80"
        >
          {article.title}
        </Heading>

        <p className="font-sans text-sm font-normal text-muted-foreground mb-3">
          {formatDate(article.publishedAt)} · {article.readTime} min de leitura
        </p>

        <p className="font-sans text-base font-normal text-foreground leading-[1.55]">
          {article.excerpt}
        </p>
      </Link>
    </motion.article>
  );
}

export default function ArtigosPage() {
  const { list } = Route.useLoaderData();
  const [featured, rest] = [list.articles.slice(0, 2), list.articles.slice(2)];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumb items={[{ label: "Início", to: "/" }, { label: "Artigos" }]} />
      </div>

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
            <motion.div
              variants={articleCardGridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16"
            >
              {featured.map((article) => (
                <FeaturedCard key={article.id} article={article} />
              ))}
            </motion.div>
          )}

          {rest.length > 0 && (
            <motion.div
              variants={articleCardGridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
