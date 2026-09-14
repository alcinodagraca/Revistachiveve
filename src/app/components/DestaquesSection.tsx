import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Heading, SectionHeader } from "./typography";
import type { Article } from "../../server/wp";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}

export function DestaquesSection({ articles }: { articles: Article[] }) {
  const slides = articles.slice(0, 5);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const updateCurrent = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    updateCurrent(api);
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api, updateCurrent]);

  if (slides.length === 0) return null;

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="site-shell">
        <SectionHeader>Em Destaque</SectionHeader>

        <Carousel
          setApi={setApi}
          opts={{ loop: slides.length > 1 }}
          aria-label="Artigos em destaque"
          className="w-full min-w-0 max-w-full overflow-hidden border border-border bg-secondary"
        >
          <CarouselContent className="-ml-0 w-full min-w-0 items-start">
            {slides.map((article, index) => (
              <CarouselItem
                key={article.id}
                className="w-full min-w-0 max-w-full self-start pl-0"
                aria-label={`Artigo ${index + 1} de ${slides.length}`}
                aria-hidden={index !== current}
                inert={index !== current ? true : undefined}
              >
                <article className="grid w-full min-w-0 max-w-full grid-cols-1 overflow-hidden bg-background lg:h-[520px] lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
                  <Link
                    to="/artigos/$category/$slug"
                    params={{ category: article.category, slug: article.slug }}
                    className="group block h-[300px] min-w-0 overflow-hidden bg-secondary no-underline sm:h-[420px] lg:h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
                    aria-label={`Ler ${article.title}`}
                  >
                    <ImageWithFallback
                      src={article.heroImage}
                      alt={article.heroAlt || article.title}
                      className="block h-full w-full object-contain object-center"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-center overflow-hidden px-6 pb-24 pt-8 sm:px-8 lg:px-10 lg:pb-24 lg:pt-10">
                    <p className="mb-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                      {article.categoryName}
                    </p>
                    <Link
                      to="/artigos/$category/$slug"
                      params={{ category: article.category, slug: article.slug }}
                      className="group block text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      <Heading
                        as="h3"
                        variant="article-title"
                        className="mb-5 break-words text-foreground transition-colors group-hover:text-primary"
                      >
                        {article.title}
                      </Heading>
                    </Link>
                    <p className="mb-6 line-clamp-4 break-words font-sans text-[0.94rem] font-light leading-[1.72] text-foreground/78">
                      {article.excerpt}
                    </p>
                    <p className="font-sans text-[0.74rem] uppercase tracking-[0.07em] text-foreground/68">
                      {article.author.name} · {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {slides.length > 1 && (
            <div className="absolute bottom-6 right-4 flex items-center gap-3">
              <p
                className="mr-1 font-sans text-xs font-medium tabular-nums text-primary"
                aria-live="polite"
                aria-atomic="true"
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
              <CarouselPrevious
                aria-label="Artigo anterior"
                className="static size-[44px] translate-y-0 rounded-none border-primary/30 bg-background text-primary hover:bg-secondary focus-visible:ring-primary"
              />
              <CarouselNext
                aria-label="Artigo seguinte"
                className="static size-[44px] translate-y-0 rounded-none border-primary/30 bg-background text-primary hover:bg-secondary focus-visible:ring-primary"
              />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
