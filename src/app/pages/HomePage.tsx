import { DestaquesSection } from "../components/DestaquesSection";
import { FeaturedInterviewSection } from "../components/FeaturedInterviewSection";
import { ColunistasSection } from "../components/ColunistasSection";
import { ContinueImpactadoSection } from "../components/ContinueImpactadoSection";
import { NewsletterSection } from "../components/NewsletterSection";
import { AdvertisementBanner } from "../components/AdvertisementBanner";
import { Route } from "../../routes/index";

export default function HomePage() {
  const { recent, opiniao, entrevistas, editions, maisLidos } = Route.useLoaderData();
  const featuredInterview = entrevistas.articles[0] ?? recent.articles[0] ?? null;
  const exploreArticles = [
    ...recent.articles,
    ...opiniao.articles.filter((article) =>
      recent.articles.every((recentArticle) => recentArticle.slug !== article.slug),
    ),
  ]
    .reduce<typeof recent.articles>((acc, article) => {
      if (acc.some((item) => item.slug === article.slug)) return acc;
      acc.push(article);
      return acc;
    }, [])
    .sort((a, b) => {
      const sameCategoryCountA = recent.articles.filter((item) => item.category === a.category).length;
      const sameCategoryCountB = recent.articles.filter((item) => item.category === b.category).length;
      if (sameCategoryCountA === sameCategoryCountB) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return sameCategoryCountA - sameCategoryCountB;
    })
    .slice(0, 6);

  return (
    <>
      <DestaquesSection articles={recent.articles.slice(0, 3)} />
      <ContinueImpactadoSection />
      <FeaturedInterviewSection
        article={featuredInterview}
        maisLidos={maisLidos}
      />
      <AdvertisementBanner />
      <ColunistasSection
        articles={exploreArticles}
      />
      <NewsletterSection editions={editions.slice(0, 3)} />
    </>
  );
}
