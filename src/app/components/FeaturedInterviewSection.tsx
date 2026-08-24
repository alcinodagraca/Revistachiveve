import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, SectionHeader } from "./typography";
import type { Article } from "../../server/wp";

function formatDateLong(iso: string) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function FeaturedInterviewSection({
  article,
  maisLidos = [],
}: {
  article: Article | null;
  maisLidos?: Article[];
}) {
  if (!article) return null;

  return (
    <section className="bg-background pt-18 pb-8 md:pt-20 md:pb-8">
      <div className="site-shell">
        <SectionHeader>Entrevista Principal</SectionHeader>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] lg:gap-10">
          <article className="flex flex-col">
            <Link
              to="/artigos/$category/$slug"
              params={{ category: article.category, slug: article.slug }}
              className="group block text-inherit no-underline"
            >
              <div className="mb-5 h-[320px] w-full overflow-hidden bg-secondary sm:h-[420px] lg:h-[540px]">
                <ImageWithFallback
                  src={article.heroImage}
                  alt={article.heroAlt || article.title}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mb-3 font-sans text-[0.74rem] font-medium uppercase tracking-[0.12em] text-primary">
                Conversa de capa
              </p>

              <Heading
                as="h3"
                variant="feature-title"
                className="mb-3 text-foreground transition-colors group-hover:text-primary"
              >
                {article.title}
              </Heading>
            </Link>

            <p className="mb-4 font-sans text-sm font-light leading-[1.75] text-foreground/82 md:text-[0.98rem]">
              {article.excerpt}
            </p>

            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.8rem] font-normal text-muted-foreground">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDateLong(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readTime} min de leitura</span>
            </div>
          </article>

          <aside className="flex w-full flex-col self-start">
            <div className="border border-border bg-background p-4">
              <h3 className="mb-3 border-b border-primary/35 pb-2 font-sans text-[1rem] font-semibold uppercase leading-none tracking-[-0.02em] text-primary">
                Esta Semana
              </h3>
              <ol className="m-0 list-none p-0">
                {maisLidos.slice(0, 5).map((item, index) => (
                  <li
                    key={item.slug}
                    className={
                      "mb-3 pb-3" + (index < Math.min(maisLidos.length, 5) - 1 ? " border-b border-border" : "")
                    }
                  >
                    <Link
                      to="/artigos/$category/$slug"
                      params={{ category: item.category, slug: item.slug }}
                      className="group flex items-start gap-3 text-inherit no-underline"
                    >
                      <span
                        aria-hidden
                        className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary font-sans text-xs font-semibold text-white"
                      >
                        {index + 1}
                      </span>
                      <span className="font-sans text-[13px] font-normal leading-[1.4] text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
