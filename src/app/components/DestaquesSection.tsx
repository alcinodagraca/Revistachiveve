import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";
import { SectionHeader } from "./typography";
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
  const [lead, ...secondary] = articles;
  const compactArticles = secondary.slice(0, 2);

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="site-shell">
        <SectionHeader>Destaques</SectionHeader>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_328px] lg:gap-[22px]"
        >
          {lead ? (
            <motion.article
              key={lead.id}
              variants={itemVariants}
              className="min-w-0"
            >
              <Link
                to="/artigos/$category/$slug"
                params={{ category: lead.category, slug: lead.slug }}
                className="group mb-3 block h-[320px] w-full overflow-hidden bg-secondary no-underline sm:h-[420px] lg:mb-[14px] lg:h-[539px]"
              >
                <ImageWithFallback
                  src={lead.heroImage}
                  alt={lead.heroAlt || lead.title}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <Link
                to="/artigos/$category/$slug"
                params={{ category: lead.category, slug: lead.slug }}
                className="mb-1 block no-underline transition-opacity hover:opacity-80 lg:mb-[6px]"
              >
                <h3
                  className={cn(
                    "font-sans text-[1.5rem] font-medium leading-[1.18] tracking-[-0.02em] text-foreground",
                    "lg:text-[24.65px] lg:leading-[1.18]",
                  )}
                >
                  {lead.title}
                </h3>
              </Link>

              <p className="mb-2 font-sans text-[10px] font-normal uppercase tracking-[0.08em] text-primary/80 lg:mb-[11px] lg:text-[10.44px]">
                {lead.categoryName} · {lead.author.name} · {formatDate(lead.publishedAt)}
              </p>

              <p className="max-w-[48rem] font-sans text-[14px] font-light leading-[1.7] text-foreground/78">
                {lead.excerpt.length > 360
                  ? `${lead.excerpt.slice(0, 360).trim()}...`
                  : lead.excerpt}
              </p>
            </motion.article>
          ) : null}

          <div className="min-w-0 grid gap-6 lg:relative lg:min-h-[596px] lg:gap-0">
            {compactArticles.map((article, index) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className={cn(
                  "min-w-0",
                  index === 0 && "lg:absolute lg:left-0 lg:top-0 lg:w-full",
                  index === 1 && "lg:absolute lg:left-0 lg:top-[306px] lg:w-full",
                )}
              >
                <Link
                  to="/artigos/$category/$slug"
                  params={{ category: article.category, slug: article.slug }}
                  className="group block no-underline"
                >
                  <div className="mb-2 overflow-hidden bg-secondary lg:mb-[7px]">
                    <ImageWithFallback
                      src={article.heroImage}
                      alt={article.heroAlt || article.title}
                      className="block h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-[233px]"
                    />
                  </div>

                  <h3 className="mb-1 font-sans text-[14px] font-normal leading-[1.24] tracking-[-0.02em] text-primary transition-opacity group-hover:opacity-80 lg:mb-[4px] lg:text-[14.21px]">
                    {article.title}
                  </h3>

                  <p className="font-sans text-[10px] font-normal leading-none text-foreground/70 lg:text-[10.44px]">
                    {article.author.name} | {formatDate(article.publishedAt)}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
