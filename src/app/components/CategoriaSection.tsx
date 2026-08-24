import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, SectionHeader } from "./typography";
import { SidebarAdvertisement } from "./SidebarAdvertisement";
import type { Article } from "../../server/wp";

export function CategoriaSection({
  categoryName,
  categorySlug,
  articles,
}: {
  categoryName: string;
  categorySlug: string;
  articles: Article[];
}) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;
  const subItems = rest.slice(0, 4);

  return (
    <section className="bg-background py-16">
      <div className="site-shell">
        <SectionHeader action={{ label: "Ver tudo", to: `/artigos/${categorySlug}` }}>
          {categoryName}
        </SectionHeader>

        <style>{`
          .categoria-grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--spacing-32);
            align-items: stretch;
          }
          .sub-articles-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--spacing-20);
            border-top: 1px solid var(--border);
            padding-top: var(--spacing-20);
            margin-top: var(--spacing-20);
          }
          @media (min-width: 768px) {
            .categoria-grid-container {
              grid-template-columns: 2fr 320px;
            }
            .sub-articles-grid {
              grid-template-columns: 1fr 1fr;
              gap: var(--spacing-24);
            }
          }
        `}</style>

        <div className="categoria-grid-container">
          <div className="flex flex-col">
            <article>
              <Link
                to="/artigos/$category/$slug"
                params={{ category: lead.category, slug: lead.slug }}
                className="group block no-underline text-inherit"
              >
                <div className="mb-4 w-full overflow-hidden aspect-[16/9] bg-secondary">
                  <ImageWithFallback
                    src={lead.heroImage}
                    alt={lead.heroAlt || lead.title}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Heading
                  as="h3"
                  variant="feature-title"
                  className="text-foreground transition-colors group-hover:text-primary"
                >
                  {lead.title}
                </Heading>
              </Link>
            </article>

            {subItems.length > 0 && (
              <div className="sub-articles-grid">
                {subItems.map((item) => (
                  <article key={item.id}>
                    <Link
                      to="/artigos/$category/$slug"
                      params={{ category: item.category, slug: item.slug }}
                      className="group block no-underline text-inherit"
                    >
                      <Heading
                        as="h4"
                        variant="card-title"
                        className="text-foreground mb-2 transition-colors group-hover:text-primary"
                      >
                        {item.title}
                      </Heading>
                      <p className="font-sans text-sm text-muted-foreground leading-[1.55]">
                        {item.excerpt}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="w-full">
            <SidebarAdvertisement tall />
          </aside>
        </div>
      </div>
    </section>
  );
}
