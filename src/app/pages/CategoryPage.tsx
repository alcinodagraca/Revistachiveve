import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaClock, FaNewspaper } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { ListPagination } from "../components/ListPagination";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { Route } from "../../routes/artigos.$category.index";
import { CATEGORY_COLORS } from "../../data/category-colors";

function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function CategoryPage() {
  const { category, articles, totalPages, currentPage } = Route.useLoaderData();
  const navigate = useNavigate();
  const color = CATEGORY_COLORS[category.slug] ?? "var(--primary)";

  const featured = articles.slice(0, 2);
  const rest = articles.slice(2);

  function handlePageChange(page: number) {
    navigate({
      to: "/artigos/$category",
      params: { category: category.slug },
      search: { page },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-background">
      <div className="site-shell py-12">
        <PageHeader
          title={category.name}
          subtitle={category.description || undefined}
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Artigos", to: "/artigos" },
            { label: category.name },
          ]}
        />

        {articles.length === 0 ? (
          <EmptyState
            icon={FaNewspaper}
            title={`Sem artigos em ${category.name}`}
            message="Ainda não publicámos artigos nesta categoria. Explore as outras secções enquanto preparamos novos conteúdos."
            cta={{ label: "Ver todos os artigos", to: "/artigos" }}
          />
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-16">
                <SectionHeader>Em Destaque</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featured.map((article) => (
                    <Link
                      key={article.id}
                      to="/artigos/$category/$slug"
                      params={{ category: article.category, slug: article.slug }}
                      className="block no-underline group"
                    >
                      <div className="relative mb-4 overflow-hidden">
                        <ImageWithFallback
                          src={article.heroImage}
                          alt={article.heroAlt}
                          className="w-full h-[280px] object-cover block transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <Eyebrow className="inline-block mb-2" style={{ color }}>
                        {article.categoryName}
                      </Eyebrow>

                      <Heading
                        as="h3"
                        variant="feature-title"
                        className="text-foreground mb-2 transition-opacity group-hover:opacity-80"
                      >
                        {article.title}
                      </Heading>

                      <p className="mb-3 font-sans text-[0.98rem] font-light leading-[1.65] text-muted-foreground">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-xs font-medium text-foreground">
                          {article.author.name}
                        </span>
                        <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                        <span className="font-sans text-xs text-muted-foreground">
                          {formatDateLong(article.publishedAt)}
                        </span>
                        <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                        <div className="flex items-center gap-1">
                          <FaClock size={12} className="text-muted-foreground" />
                          <span className="font-sans text-xs text-muted-foreground">
                            {article.readTime} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {rest.length > 0 ? (
              <div>
                <SectionHeader>Todos os Artigos</SectionHeader>
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
                <ListPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : totalPages > 1 ? (
              <ListPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
