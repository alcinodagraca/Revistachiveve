import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getArticleBySlug } from "../../data/articles";
import { Heading } from "./typography";

const ENTREVISTA_CATEGORY = "empreendedorismo";
const ENTREVISTA_SLUG = "dario-camal-bairro-central-mundo";

export function EntrevistaSection() {
  const article = getArticleBySlug(ENTREVISTA_CATEGORY, ENTREVISTA_SLUG);
  if (!article) return null;

  const articleLink = {
    to: "/artigos/$category/$slug" as const,
    params: { category: article.category, slug: article.slug },
  };

  const formattedDate = new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <section className="px-4 md:px-8 bg-primary py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary-foreground mb-8">
          Entrevista
        </h2>

        <div className="grid gap-12 items-center grid-cols-1 md:grid-cols-2">
          <Link
            {...articleLink}
            className="group block overflow-hidden no-underline aspect-[16/9] w-full bg-background"
            aria-label="Ver entrevista completa"
          >
            <ImageWithFallback
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <div>
            <Link
              {...articleLink}
              className="block no-underline text-inherit transition-opacity hover:opacity-85"
            >
              <Heading
                as="h3"
                variant="feature-title"
                className="text-primary-foreground mb-4"
              >
                {article.title}
              </Heading>
            </Link>
            <p className="font-sans text-base font-normal text-primary-foreground leading-[1.7] mb-6">
              {article.excerpt}
            </p>
            <p className="font-sans text-[13px] font-normal text-primary-foreground">
              {article.author.name}, {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
