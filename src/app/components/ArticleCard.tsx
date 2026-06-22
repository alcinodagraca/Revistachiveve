import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Article } from "../../server/wp";
import { Heading, Eyebrow } from "./typography";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function ArticleCard({
  article,
  variant = "default",
}: {
  article: Article;
  variant?: "default" | "compact";
}) {
  const imageHeight = variant === "compact" ? "180px" : "260px";

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link
        to="/artigos/$category/$slug"
        params={{ category: article.category, slug: article.slug }}
        className="group block no-underline"
      >
        <div className="overflow-hidden mb-4 rounded-md">
          <ImageWithFallback
            src={article.heroImage}
            alt={article.title}
            className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
            style={{ height: imageHeight }}
          />
        </div>

        {article.categoryName && (
          <Eyebrow className="inline-block mb-2">{article.categoryName}</Eyebrow>
        )}

        <Heading
          as="h3"
          variant="card-title"
          className="text-foreground mb-2 transition-opacity group-hover:opacity-80"
        >
          {article.title}
        </Heading>

        <p className="font-sans text-sm font-normal text-muted-foreground mb-3">
          {formatDate(article.publishedAt)} · {article.readTime} min de leitura
        </p>

        {variant !== "compact" && (
          <p className="font-sans text-sm font-normal text-foreground leading-[1.5]">
            {article.excerpt}
          </p>
        )}
      </Link>
    </motion.article>
  );
}

export const articleCardGridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};
