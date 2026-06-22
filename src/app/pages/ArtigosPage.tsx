import { Link } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader } from "../components/typography";
import { ArticleCard, articleCardGridVariants } from "../components/ArticleCard";
import { motion } from "motion/react";
import { Route } from "../../routes/artigos.index";
import { CATEGORY_COLORS } from "../../data/category-colors";

export default function ArtigosPage() {
  const { list, categories } = Route.useLoaderData();

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <PageHeader
        title="Artigos"
        subtitle="Explore nossos artigos por categoria"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Artigos" }]}
      />

      {categories.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-16">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to="/artigos/$category"
              params={{ category: category.slug }}
              className="block py-6 px-5 rounded-lg bg-card border border-border no-underline transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <div
                className="w-12 h-1 rounded-sm mb-4"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[category.slug] ?? "var(--primary)",
                }}
              />
              <Heading as="h3" variant="feature-title" className="text-foreground mb-1">
                {category.name}
              </Heading>
              <p className="font-sans text-xs text-muted-foreground">
                {category.count} {category.count === 1 ? "artigo" : "artigos"}
              </p>
            </Link>
          ))}
        </div>
      )}

      <SectionHeader>Mais recentes</SectionHeader>

      {list.articles.length === 0 ? (
        <p className="font-sans text-base text-muted-foreground py-12 text-center">
          Ainda não há artigos publicados.
        </p>
      ) : (
        <motion.div
          variants={articleCardGridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {list.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
