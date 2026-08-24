import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, Eyebrow, SectionHeader } from "./typography";
import type { Article } from "../../server/wp";

export function ColunistasSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  const [lead, secondLead, ...rest] = articles;
  const mainArticles = [lead, secondLead].filter(Boolean);
  const sideArticles = rest.slice(0, 3);

  return (
    <section className="bg-background pt-8 pb-18 md:pt-8 md:pb-20">
      <div className="site-shell">
        <SectionHeader action={{ label: "Ver todos", to: "/artigos" }}>
          Para Ler Agora
        </SectionHeader>

        <div className="grid items-start gap-4 md:grid-cols-[1.02fr_0.98fr]">
          <div className="grid h-full gap-4 md:h-[390px] md:grid-rows-2">
            {mainArticles.map((article) => (
              <Link
                key={article.slug}
                to="/artigos/$category/$slug"
                params={{ category: article.category, slug: article.slug }}
                className="group grid h-full gap-4 border border-border p-4 text-inherit no-underline md:grid-cols-[0.9fr_0.82fr]"
              >
                <div className="order-2 flex h-full flex-col md:order-1">
                  {article.categoryName && (
                    <Eyebrow as="p" className="mb-2 text-[9px] font-normal tracking-[0.12em] text-primary/72 md:text-[10px]">
                      {article.categoryName}
                    </Eyebrow>
                  )}

                  <Heading
                    as="h3"
                    variant="feature-title"
                    className="mb-2 max-w-[245px] text-[0.92rem] font-normal leading-[1.18] tracking-[-0.016em] text-foreground transition-colors group-hover:text-primary md:text-[1rem]"
                  >
                    {article.title}
                  </Heading>

                  <p className="max-w-[250px] line-clamp-3 font-sans text-[0.78rem] font-light leading-[1.46] text-foreground/76 md:text-[0.82rem]">
                    {article.excerpt}
                  </p>

                  <p className="mt-auto pt-4 font-sans text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
                    {article.author.name}
                  </p>
                </div>

                <div className="order-1 min-h-[160px] overflow-hidden bg-background md:order-2 md:min-h-0">
                  <ImageWithFallback
                    src={article.heroImage}
                    alt={article.heroAlt || article.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid h-full gap-3 md:h-[390px] md:grid-rows-3">
            {sideArticles.map((article) => (
              <Link
                key={article.slug}
                to="/artigos/$category/$slug"
                params={{ category: article.category, slug: article.slug }}
                className="group grid h-full grid-cols-[78px_1fr] gap-3 border border-border p-3 text-inherit no-underline"
              >
                <div className="h-full min-h-[78px] overflow-hidden bg-background">
                  <ImageWithFallback
                    src={article.heroImage}
                    alt={article.heroAlt || article.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 self-center">
                  {article.categoryName && (
                    <Eyebrow as="p" className="mb-1 text-[9px] font-normal tracking-[0.12em] text-primary/72 md:text-[10px]">
                      {article.categoryName}
                    </Eyebrow>
                  )}
                  <Heading
                    as="h3"
                    variant="card-title-sm"
                    className="mb-1 max-w-[310px] text-[0.82rem] font-normal leading-[1.2] tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary md:text-[0.88rem]"
                  >
                    {article.title}
                  </Heading>
                  <p className="line-clamp-2 font-sans text-[0.72rem] font-light leading-[1.38] text-foreground/72 md:text-[0.76rem]">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
