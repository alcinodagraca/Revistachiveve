import { DestaquesSection } from "../components/DestaquesSection";
import { EntrevistaSection } from "../components/EntrevistaSection";
import { CategoriaSection } from "../components/CategoriaSection";
import { AdvertisementBanner } from "../components/AdvertisementBanner";
import { ColunistasSection } from "../components/ColunistasSection";
import { NewsletterSection } from "../components/NewsletterSection";
import { Route } from "../../routes/index";

export default function HomePage() {
  const { recent, opiniao, economia, entrevistas } = Route.useLoaderData();

  return (
    <>
      <DestaquesSection articles={recent.articles.slice(0, 3)} />
      <EntrevistaSection article={entrevistas.articles[0] ?? null} />
      <CategoriaSection
        categoryName="Economia"
        categorySlug="economia"
        articles={economia.articles}
      />
      <AdvertisementBanner />
      <ColunistasSection
        articles={
          opiniao.articles.length >= 3
            ? opiniao.articles.slice(0, 3)
            : [
                ...opiniao.articles,
                ...recent.articles
                  .filter((a) => a.category !== "opiniao")
                  .slice(0, 3 - opiniao.articles.length),
              ]
        }
      />
      <NewsletterSection />
    </>
  );
}
