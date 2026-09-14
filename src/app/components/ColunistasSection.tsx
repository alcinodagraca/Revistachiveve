import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, Eyebrow, SectionHeader } from "./typography";
import type { Article } from "../../server/wp";

export function ColunistasSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  const visibleArticles = articles.slice(0, 4);

  return (
    <section className="bg-background pt-8 pb-18 md:pt-8 md:pb-20">
      <div className="site-shell">
        <SectionHeader action={{ label: "Ver todos", to: "/artigos" }}>
          Para Ler Agora
        </SectionHeader>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
          {visibleArticles.map((article) => (
            <Link
              key={article.slug}
              to="/artigos/$category/$slug"
              params={{ category: article.category, slug: article.slug }}
              className="group grid h-full min-h-[350px] overflow-hidden border border-border text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.92fr)] md:min-h-[230px]"
            >
              <div className="order-2 flex min-w-0 flex-col p-5 sm:order-1 md:p-6">
                {article.categoryName && (
                  <Eyebrow as="p" className="mb-3 text-[10px] font-medium tracking-[0.12em] text-primary">
                    {article.categoryName}
                  </Eyebrow>
                )}

                <Heading
                  as="h3"
                  variant="feature-title"
                  className="mb-3 line-clamp-3 text-[1rem] font-normal leading-[1.2] tracking-[-0.016em] text-foreground transition-colors group-hover:text-primary"
                >
                  {article.title}
                </Heading>

                <p className="line-clamp-3 font-sans text-[0.82rem] font-light leading-[1.5] text-foreground/76">
                  {article.excerpt}
                </p>

                <p className="mt-auto pt-5 font-sans text-[0.7rem] uppercase tracking-[0.08em] text-foreground/68">
                  {article.author.name}
                </p>
              </div>

              <div className="order-1 min-h-[190px] overflow-hidden bg-secondary sm:order-2 sm:min-h-0">
                <ImageWithFallback
                  src={article.heroImage}
                  alt=""
                  className="block h-full w-full object-contain object-center"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
