import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  FaFacebookF,
  FaLink,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiX } from "react-icons/si";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumb } from "../components/Breadcrumb";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { Prose } from "../components/Prose";
import { SidebarAdvertisement } from "../components/SidebarAdvertisement";
import { Eyebrow, Heading, SectionHeader } from "../components/typography";
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
  const [copied, setCopied] = useState(false);
  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://revistachiveve.co.mz/artigos/${article.category}/${article.slug}`;
  const shareText = `${article.title} | Revista Chiveve`;

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="bg-background">
      <div className="site-shell pt-8 pb-12">
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
            <Eyebrow className="mb-3 inline-block">{article.categoryName}</Eyebrow>

            <Heading
              as="h1"
              variant="article-title"
              className="mb-4 max-w-[760px] text-foreground"
            >
              {article.title}
            </Heading>

            <div className="mb-6 flex max-w-[760px] flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[0.82rem] text-muted-foreground">
              <span>
                Por{" "}
                <strong className="font-medium text-foreground">
                  {article.author.name}
                </strong>
              </span>
              <span>·</span>
              <span>{formatDateLong(article.publishedAt)}</span>
              <span>·</span>
              <span>{article.readTime} min de leitura</span>
            </div>

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

            {article.excerpt && (
              <p className="mb-8 max-w-[760px] text-left font-sans text-[1.02rem] font-light text-foreground/72 leading-[1.8] md:text-[1.08rem]">
                {article.excerpt}
              </p>
            )}

            <Prose>
              <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
            </Prose>

            <div className="mt-10 max-w-[760px] border-t border-border pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                  Partilhar este artigo
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no Facebook"
                >
                  <FaFacebookF size={14} />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no X"
                >
                  <SiX size={13} />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no LinkedIn"
                >
                  <FaLinkedinIn size={14} />
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${articleUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
                  aria-label="Partilhar no WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </a>

                <button
                  type="button"
                  onClick={copyArticleLink}
                  className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-sans text-[0.82rem] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <FaLink size={13} />
                  {copied ? "Link copiado" : "Copiar link"}
                </button>
              </div>
            </div>

            {related.length > 0 && (
              <section className="mt-14">
                <SectionHeader>Continue a Leitura</SectionHeader>

                <ul className="m-0 grid list-none gap-5 p-0">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link
                        to="/artigos/$category/$slug"
                        params={{ category: a.category, slug: a.slug }}
                        className="group grid grid-cols-[140px_1fr] gap-4 no-underline text-inherit"
                      >
                        <div className="w-[140px] h-[90px] bg-secondary overflow-hidden relative">
                          <ImageWithFallback
                            src={a.heroImage}
                            alt={a.heroAlt}
                            className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div>
                          {a.categoryName && (
                            <Eyebrow className="mb-2 inline-block">{a.categoryName}</Eyebrow>
                          )}
                          <Heading
                            as="h4"
                            variant="card-title-sm"
                            className="text-foreground mb-1.5 transition-colors group-hover:text-primary"
                          >
                            {a.title}
                          </Heading>
                          <p className="font-sans text-[0.92rem] font-light text-foreground/72 leading-[1.65] line-clamp-2">
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
            <div className="border border-border bg-card p-5">
              <p className="mb-3 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                Mais Lidos
              </p>
              <ol className="m-0 list-none p-0">
                {maisLidos.map((a, i) => (
                  <li
                    key={a.slug}
                    className={
                      "mb-4 pb-4" +
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
                        className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary text-[11px] font-medium text-white"
                      >
                        {i + 1}
                      </span>
                      <span className="font-sans text-[0.88rem] font-normal text-foreground leading-[1.55] transition-colors group-hover:text-primary">
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <SidebarAdvertisement tall />
          </aside>
        </div>
      </div>

      <NewsletterCTA />
    </div>
  );
}
