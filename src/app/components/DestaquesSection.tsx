import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, SectionHeader } from "./typography";
import type { Article } from "../../server/wp";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function DestaquesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="px-4 md:px-8 bg-background py-16">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader>Destaques</SectionHeader>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {articles.map((article) => (
            <motion.article key={article.id} variants={itemVariants}>
              <Link
                to="/artigos/$category/$slug"
                params={{ category: article.category, slug: article.slug }}
                className="group block overflow-hidden mb-4 no-underline aspect-[4/3] bg-secondary"
              >
                <ImageWithFallback
                  src={article.heroImage}
                  alt={article.heroAlt || article.title}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <Link
                to="/artigos/$category/$slug"
                params={{ category: article.category, slug: article.slug }}
                className="block transition-opacity hover:opacity-80 no-underline mb-2"
              >
                <Heading as="h3" variant="card-title" className="text-foreground">
                  {article.title}
                </Heading>
              </Link>

              <p className="font-sans text-sm font-normal text-muted-foreground mb-3">
                {formatDate(article.publishedAt)}
              </p>

              <p className="font-sans text-sm font-normal text-foreground leading-[1.5]">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
