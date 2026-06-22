import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumb } from "../components/Breadcrumb";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { Prose } from "../components/Prose";
import { Heading, SectionHeader } from "../components/typography";
import { Route } from "../../routes/artigos.$category.$slug";

function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function ArticleDetailPage() {
  const { article, related, maisLidos } = Route.useLoaderData();

  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-12">
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: "Início", to: "/" },
              { label: "Artigos", to: "/artigos" },
              {
                label: article.categoryName,
                to: `/artigos/${article.category}`,
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <article>
            <Heading as="h1" variant="page-title" className="text-foreground mb-6">
              {article.categoryName}
            </Heading>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full aspect-[16/9] bg-secondary overflow-hidden mb-6 relative"
            >
              <ImageWithFallback
                src={article.heroImage}
                alt={article.heroAlt}
                className="w-full h-full object-cover block"
              />
            </motion.div>

            <Heading as="h2" variant="article-title" className="text-foreground mb-4">
              {article.title}
            </Heading>

            {article.excerpt && (
              <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                {article.excerpt}
              </p>
            )}

            <Prose>
              <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
            </Prose>

            <div className="mt-6 pt-4 border-t border-border font-sans text-[13px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>
                Por{" "}
                <strong className="text-foreground">
                  {article.author.name}
                </strong>
              </span>
              <span>·</span>
              <span>{formatDateLong(article.publishedAt)}</span>
              <span>·</span>
              <span>{article.readTime} min de leitura</span>
            </div>

            {related.length > 0 && (
              <section className="mt-12">
                <SectionHeader>Mais Notícias</SectionHeader>

                <ul className="list-none p-0 m-0 border-t border-border">
                  {related.map((a) => (
                    <li key={a.slug} className="border-b border-border">
                      <Link
                        to="/artigos/$category/$slug"
                        params={{ category: a.category, slug: a.slug }}
                        className="group grid grid-cols-[140px_1fr] gap-4 py-4 no-underline text-inherit"
                      >
                        <div className="w-[140px] h-[90px] bg-secondary overflow-hidden relative">
                          <ImageWithFallback
                            src={a.heroImage}
                            alt={a.heroAlt}
                            className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div>
                          <Heading
                            as="h4"
                            variant="card-title-sm"
                            className="text-foreground mb-1.5 transition-colors group-hover:text-primary"
                          >
                            {a.title}
                          </Heading>
                          <p className="font-sans text-sm text-muted-foreground leading-[1.55] line-clamp-2">
                            {a.excerpt}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="space-y-6">
            <div className="border border-border p-4 bg-background">
              <h3 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary pb-2 mb-3 border-b-2 border-primary">
                Mais Lidos
              </h3>
              <ol className="list-none p-0 m-0">
                {maisLidos.map((a, i) => (
                  <li
                    key={a.slug}
                    className={
                      "pb-3 mb-3" +
                      (i < maisLidos.length - 1 ? " border-b border-border" : "")
                    }
                  >
                    <Link
                      to="/artigos/$category/$slug"
                      params={{ category: a.category, slug: a.slug }}
                      className="group flex gap-3 items-start no-underline text-inherit"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 w-6 h-6 bg-primary text-white flex items-center justify-center font-sans text-xs font-semibold"
                      >
                        {i + 1}
                      </span>
                      <span className="font-sans text-[13px] font-medium text-foreground leading-[1.4] transition-colors group-hover:text-primary">
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-secondary h-[260px] flex items-center justify-center font-sans text-sm text-muted-foreground">
              Publicidade
            </div>
          </aside>
        </div>
      </div>

      <NewsletterCTA />
    </div>
  );
}
