import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CategoriaSection() {
  const newsItems = [
    {
      title: "Índia Aumenta Subsídio para Fertilizantes Enquanto Guerra Eleva Preços Globais",
      description: "O aumento foi de 11,6% em relação ao ano anterior, de forma a proteger agricultores diante de período de instabilidade"
    },
    {
      title: "Governo Quer Elevar Mistura de Etanol na Gasolina para 32%",
      description: "Segundo o ministro Alexandre Silveira, a mudança deve acontecer ainda neste primeiro semestre de 2026"
    },
    {
      title: "Governo Tem Plano de \"Estender Linha\" de Crédito Ao Setor Agropecuário",
      description: "A declaração feita por Durigan acerca do crédito ponderou que o setor tem sofrido prejuízos com eventos climáticos e com a guerra no Oriente Médio"
    },
    {
      title: "Mosaic Vai Paralisar Operações de Fosfato no Brasil",
      description: "A Mosaic anunciou nesta quarta (08) que vai paralisar duas unidades no Brasil, cortar empregos e reduzir a produção anual em cerca de 1 milhão de toneladas"
    }
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "var(--spacing-48)",
        paddingBottom: "var(--spacing-48)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: "var(--spacing-16)",
          paddingRight: "var(--spacing-16)",
        }}
      >
        {/* Header Section */}
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "var(--spacing-24)",
            borderBottom: "1px solid var(--border)"
          }}
        >
          <div
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "var(--spacing-8) var(--spacing-16)",
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Categoria
          </div>
          <div style={{ flex: 1 }} />
          <a
            href="#"
            style={{
              color: "var(--primary)",
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              textDecoration: "none",
              paddingBottom: "var(--spacing-8)",
              paddingTop: "var(--spacing-8)",
            }}
          >
            Ver tudo
          </a>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-32)" }}>
          <style>{`
            .categoria-grid-container {
              display: grid;
              grid-template-columns: 1fr;
              gap: var(--spacing-32);
              align-items: start;
            }
            .sub-articles-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: var(--spacing-24);
              border-top: 1px solid var(--border);
              padding-top: var(--spacing-24);
            }
            @media (min-width: 768px) {
              .categoria-grid-container {
                grid-template-columns: 2fr 300px;
              }
              .sub-articles-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}</style>
          
          <div className="categoria-grid-container">
            
            {/* Left Content Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)" }}>
              {/* Featured Article */}
              <article>
                <div style={{ marginBottom: "var(--spacing-16)", width: "100%", overflow: "hidden" }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1607062400977-80da9282b8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXRjaGVyfGVufDB8fHx8MTcyMTAxNzYyNA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Exportação de Carne Suína do Brasil"
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-24)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--foreground)",
                    lineHeight: "1.3",
                    marginBottom: "var(--spacing-8)",
                  }}
                >
                  Exportação de Carne Suína do Brasil Tem Recorde em Março
                </h3>
              </article>

              {/* Sub-articles Grid */}
              <div className="sub-articles-grid">
                {newsItems.map((item, index) => (
                  <article key={index} style={{ paddingRight: index % 2 === 0 ? "var(--spacing-16)" : "0" }}>
                    <h4
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-16)",
                        fontWeight: "var(--font-weight-bold)",
                        color: "var(--foreground)",
                        lineHeight: "1.4",
                        marginBottom: "var(--spacing-8)",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-14)",
                        color: "var(--muted-foreground)",
                        lineHeight: "1.6",
                      }}
                    >
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Content Column (Ad Sidebar) */}
            <div
              style={{
                backgroundColor: "#f5f5f5",
                minHeight: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            />
          </div>

          {/* Ad Banner - Full Width Now */}
          <div
            style={{
              backgroundColor: "#111",
              color: "white",
              padding: "var(--spacing-32)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--spacing-16)",
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-20)",
                  fontWeight: "var(--font-weight-bold)",
                  marginBottom: "var(--spacing-4)",
                }}
              >
                Espaço Publicitário
              </h4>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-12)",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Tamanho do anúncio: 1400 × 120 px
              </p>
            </div>
            <button
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                padding: "var(--spacing-12) var(--spacing-24)",
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-medium)",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Anuncie Aqui
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
