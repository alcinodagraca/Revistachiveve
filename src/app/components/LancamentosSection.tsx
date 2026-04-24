import { ImageWithFallback } from "./figma/ImageWithFallback";

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
        {/* Section Header */}
        <div style={{ marginBottom: "var(--spacing-32)" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-20)",
              fontWeight: "var(--font-weight-extra-bold)",
              color: "var(--primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--spacing-8)",
            }}
          >
            Lançamentos
          </h2>
          <div
            style={{
              height: "2px",
              backgroundColor: "var(--primary)",
              width: "100%",
            }}
          />
        </div>

        {/* Cards Grid - 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--spacing-24)",
          }}
        >
          {lancamentos.map((item) => (
            <article key={item.id}>
              {/* Category Badge */}
              <div style={{ marginBottom: "var(--spacing-12)" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-12)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--primary)",
                    backgroundColor: "var(--secondary)",
                    padding: "4px var(--spacing-12)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "inline-block",
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Image */}
              <a
                href="#"
                style={{
                  display: "block",
                  overflow: "hidden",
                  marginBottom: "var(--spacing-16)",
                }}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.transform = "scale(1)";
                  }}
                />
              </a>

              {/* Title */}
              <a
                href="#"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--primary)",
                  lineHeight: "1.4",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {item.title}
              </a>
            </article>
          ))}
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
