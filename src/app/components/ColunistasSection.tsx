import { Link } from "@tanstack/react-router";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, Eyebrow } from "./typography";
import type { Article } from "../../server/wp";

export function ColunistasSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="px-4 md:px-8 bg-secondary py-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center mb-8 border-b border-border">
          <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] bg-primary text-primary-foreground px-3 py-1.5 rounded-sm -mb-px">
            Colunistas
          </span>
          <div className="flex-1" />
          <Link
            to="/artigos/$category"
            params={{ category: "opiniao" }}
            className="inline-flex items-center gap-1 font-sans font-medium text-xs md:text-sm text-primary no-underline py-2 transition-opacity hover:opacity-80"
          >
            Ver tudo
            <FaUpRightFromSquare size={14} />
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to="/artigos/$category/$slug"
              params={{ category: article.category, slug: article.slug }}
              className="group block no-underline text-inherit"
            >
              {article.categoryName && (
                <Eyebrow as="p" className="text-foreground mb-2">
                  {article.categoryName}
                </Eyebrow>
              )}

              <div className="w-full aspect-[4/3] overflow-hidden mb-3 bg-background">
                <ImageWithFallback
                  src={article.heroImage}
                  alt={article.heroAlt || article.title}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <Heading
                as="h3"
                variant="card-title"
                className="text-foreground mb-2 line-clamp-2 transition-colors group-hover:text-primary"
              >
                {article.title}
              </Heading>

              <p className="font-sans text-sm font-normal text-foreground leading-[1.55] line-clamp-3">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
