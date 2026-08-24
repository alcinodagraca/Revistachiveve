import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, SectionHeader } from "./typography";

// Maps display category label → slug used in /artigos/$category routes
const categorySlug: Record<string, string> = {
  Economia: "economia",
  Empreendedorismo: "empreendedorismo",
  Inovação: "inovacao-tecnologia",
  "Inovação e Tecnologia": "inovacao-tecnologia",
  Liderança: "lideranca",
  Opinião: "opiniao",
  Análise: "analise",
};

// Maps card id → article slug (subset wired to actual mock articles;
// rest fall back to the category index page)
const articleSlugById: Record<number, string | undefined> = {
  1: undefined, // no dedicated article — link to category
  2: undefined,
  3: "cop-30-mocambique",
  4: undefined,
  5: "data-centers-africa",
  6: "10-mais-ricos-mundo-abril-2026",
  7: "mercado-trabalho-fed-2026",
  8: "forbes-mulheres-mais-poderosas-2026",
  9: undefined,
  10: undefined,
  11: undefined,
  12: undefined,
  13: undefined,
};

const lancamentos = [
  {
    id: 1,
    category: "Economia",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBmYXJtJTIwY2hpY2tlbiUyMGVnZ3N8ZW58MXx8fHwxNzc1NjUyMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Frango e ovos do Brasil ganham sinal verde da União Europeia após 7 anos de bloqueio",
  },
  {
    id: 2,
    category: "Economia",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzaWxpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm18ZW58MXx8fHwxNzc1NjUyMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bancos assumem fiscalização de desmatamento em crédito rural de R$ 600 bilhões",
  },
  {
    id: 3,
    category: "Economia",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3AzMCUyMGNsaW1hdGUlMjBjb25mZXJlbmNlJTIwYnJhemlsfGVufDF8fHx8MTc3NTY1MjM0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "COP 30",
  },
  {
    id: 4,
    category: "Empreendedorismo",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZSUyMG9mZmljZSUyMHRlYW18ZW58MXx8fHwxNzc1NjUyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "De olho nas eleições, Podemos troca de comando na Câmara",
  },
  {
    id: 5,
    category: "Inovação",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGF0YSUyMGNlbnRlciUyMHNlcnZlcnN8ZW58MXx8fHwxNzc1NjUyMzQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bilionário Indiano das Telecomunicações Aposta US$ 1 Bilhão em Expansão de Data Centers na Índia",
  },
  {
    id: 6,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNoZXN0JTIwcGVvcGxlJTIwYmlsbGlvbmFpcmVzJTIwd29ybGR8ZW58MXx8fHwxNzc1NjUyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "As 10 Pessoas Mais Ricas do Mundo em Abril de 2026",
  },
  {
    id: 7,
    category: "Empreendedorismo",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3JrJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc3NTY1MjM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mercado de trabalho aquecido desafia projeções do Fed para juros em 2026",
  },
  {
    id: 8,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwcHJvZmVzc2lvbmFsJTIwbGVhZGVyfGVufDF8fHx8MTc3NTY1MjM0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Homenageadas da lista Forbes Mulheres Mais Poderosas do Brasil 2026",
  },
  {
    id: 9,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmlua3MlMjBsZWFkZXJzaGlwJTIwYnVzaW5lc3MlMjBldmVudHxlbnwxfHx8fDE3NzU2NTIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "The Buckingham – O drinque que brindou as lideranças no Forbes Agro 100",
  },
  {
    id: 10,
    category: "Inovação",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGJsYWNrJTIwZW50cmVwcmVuZXVyfGVufDF8fHx8MTc3NTY1MjM1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Ingrid Silva e sua jornada de superação",
  },
  {
    id: 11,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc3BvcnQlMjBmaXRuZXNzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzc1NjUyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Correr não envelhece as articulações. O problema são lesões, diz estudo",
  },
  {
    id: 12,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBzcG9ydHMlMjBsZWdlbmQlMjBmZWRlcmVyfGVufDF8fHx8MTc3NTY1MjM1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Roger Federer ensina lições sobre carreira e sucesso",
  },
  {
    id: 13,
    category: "Economia",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW52ZXN0bWVudCUyMHByb3BlcnR5fGVufDF8fHx8MTc3NTY1MjM1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Fundos imobiliários: queda de juros aquece mercado em 2026",
  },
];

export function LancamentosSection() {
  return (
    <section className="bg-background py-12">
      <div className="site-shell">
        <SectionHeader>Lançamentos</SectionHeader>

        <div className="grid grid-cols-3 gap-6">
          {lancamentos.map((item) => {
            const catSlug = categorySlug[item.category] ?? "economia";
            const articleSlug = articleSlugById[item.id];

            const imageInner = (
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-cover block transition-transform duration-500 group-hover:scale-105"
              />
            );

            return (
              <article key={item.id}>
                <div className="mb-3">
                  <Link
                    to="/artigos/$category"
                    params={{ category: catSlug }}
                    className="font-sans text-xs font-semibold text-primary bg-secondary py-1 px-3 uppercase tracking-[0.05em] inline-block no-underline"
                  >
                    {item.category}
                  </Link>
                </div>

                {articleSlug ? (
                  <Link
                    to="/artigos/$category/$slug"
                    params={{ category: catSlug, slug: articleSlug }}
                    className="group block overflow-hidden mb-4 no-underline"
                  >
                    {imageInner}
                  </Link>
                ) : (
                  <Link
                    to="/artigos/$category"
                    params={{ category: catSlug }}
                    className="group block overflow-hidden mb-4 no-underline"
                  >
                    {imageInner}
                  </Link>
                )}

                {/* Title */}
                {articleSlug ? (
                  <Link
                    to="/artigos/$category/$slug"
                    params={{ category: catSlug, slug: articleSlug }}
                    className="block no-underline transition-opacity hover:opacity-80"
                  >
                    <Heading as="h3" variant="card-title" className="text-foreground">
                      {item.title}
                    </Heading>
                  </Link>
                ) : (
                  <Link
                    to="/artigos/$category"
                    params={{ category: catSlug }}
                    className="block no-underline transition-opacity hover:opacity-80"
                  >
                    <Heading as="h3" variant="card-title" className="text-foreground">
                      {item.title}
                    </Heading>
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
