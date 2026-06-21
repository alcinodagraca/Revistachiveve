import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading } from "./typography";

export function CategoriaSection() {
  const newsItems = [
    {
      title:
        "Índia Aumenta Subsídio para Fertilizantes Enquanto Guerra Eleva Preços Globais",
      description:
        "O aumento foi de 11,6% em relação ao ano anterior, de forma a proteger agricultores diante de período de instabilidade",
    },
    {
      title: "Governo Quer Elevar Mistura de Etanol na Gasolina para 32%",
      description:
        "Segundo o ministro Alexandre Silveira, a mudança deve acontecer ainda neste primeiro semestre de 2026",
    },
    {
      title:
        'Governo Tem Plano de "Estender Linha" de Crédito Ao Setor Agropecuário',
      description:
        "A declaração feita por Durigan acerca do crédito ponderou que o setor tem sofrido prejuízos com eventos climáticos e com a guerra no Oriente Médio",
    },
    {
      title: "Mosaic Vai Paralisar Operações de Fosfato no Brasil",
      description:
        "A Mosaic anunciou nesta quarta (08) que vai paralisar duas unidades no Brasil, cortar empregos e reduzir a produção anual em cerca de 1 milhão de toneladas",
    },
  ];

  return (
    <section className="px-4 md:px-8 bg-background py-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center mb-8 border-b border-border">
          <span className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] bg-primary text-primary-foreground px-3 py-1.5 rounded-sm -mb-px">
            Categoria
          </span>
          <div className="flex-1" />
          <Link
            to="/artigos"
            className="font-sans font-medium text-xs md:text-sm text-primary no-underline py-2 transition-opacity hover:opacity-80"
          >
            Ver tudo
          </Link>
        </div>

        {/* Content grid */}
        <style>{`
          .categoria-grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--spacing-32);
            align-items: stretch;
          }
          .sub-articles-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--spacing-20);
            border-top: 1px solid var(--border);
            padding-top: var(--spacing-20);
            margin-top: var(--spacing-20);
          }
          @media (min-width: 768px) {
            .categoria-grid-container {
              grid-template-columns: 2fr 320px;
            }
            .sub-articles-grid {
              grid-template-columns: 1fr 1fr;
              gap: var(--spacing-24);
            }
          }
        `}</style>

        <div className="categoria-grid-container">
          <div className="flex flex-col">
            <article>
              <Link
                to="/artigos/$category"
                params={{ category: "economia" }}
                className="group block no-underline text-inherit"
              >
                <div className="mb-4 w-full overflow-hidden aspect-[16/9] bg-secondary">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1607062400977-80da9282b8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXRjaGVyfGVufDB8fHx8MTcyMTAxNzYyNA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Exportação de Carne Suína do Brasil"
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Heading
                  as="h3"
                  variant="feature-title"
                  className="text-foreground transition-colors group-hover:text-primary"
                >
                  Exportação de Carne Suína do Brasil Tem Recorde em Março
                </Heading>
              </Link>
            </article>

            {/* Sub-articles Grid */}
            <div className="sub-articles-grid">
              {newsItems.map((item, index) => (
                <article key={index}>
                  <Link
                    to="/artigos/$category"
                    params={{ category: "economia" }}
                    className="group block no-underline text-inherit"
                  >
                    <Heading
                      as="h4"
                      variant="card-title"
                      className="text-foreground mb-2 transition-colors group-hover:text-primary"
                    >
                      {item.title}
                    </Heading>
                    <p className="font-sans text-sm text-muted-foreground leading-[1.55]">
                      {item.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside
            aria-hidden
            className="bg-secondary min-h-[300px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
