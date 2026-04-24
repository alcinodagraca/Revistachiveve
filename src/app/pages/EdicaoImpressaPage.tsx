import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Calendar, FileText } from "lucide-react";

const currentEdition = {
  id: 1,
  title: "Abril 2026",
  subtitle: "Transformação Digital em Moçambique",
  cover: "https://images.unsplash.com/photo-1634224111525-7c631808aa61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGNvdmVyJTIwYnVzaW5lc3MlMjBmb3JiZXN8ZW58MXx8fHwxNzc1NjQ5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  date: "Abril 2026",
  featured: true,
  highlights: [
    "Especial: O futuro das fintechs em África",
    "Entrevista exclusiva com CEOs de sucesso",
    "Análise: Economia digital moçambicana",
    "Top 30 jovens empreendedores",
  ],
};

const pastEditions = [
  {
    id: 2,
    title: "Março 2026",
    subtitle: "O Futuro do Empreendedorismo",
    cover: "https://images.unsplash.com/photo-1647668068108-748576356aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwZWRpdG9yaWFsJTIwZGVzaWdufGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Março 2026",
  },
  {
    id: 3,
    title: "Fevereiro 2026",
    subtitle: "Liderança em Tempos de Mudança",
    cover: "https://images.unsplash.com/photo-1569097715724-f705a82c4a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWdhemluZSUyMGNvdmVyJTIwY29ycG9yYXRlfGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Fevereiro 2026",
  },
  {
    id: 4,
    title: "Janeiro 2026",
    subtitle: "Inovação e Sustentabilidade",
    cover: "https://images.unsplash.com/photo-1610251064409-8d94b0939629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBtYWdhemluZSUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc3NTY0OTc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Janeiro 2026",
  },
  {
    id: 5,
    title: "Dezembro 2025",
    subtitle: "Balanço do Ano Económico",
    cover: "https://images.unsplash.com/photo-1763889167910-b13b12b49bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMG5ld3NzdGFuZCUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc3NTY0OTc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Dezembro 2025",
  },
  {
    id: 6,
    title: "Novembro 2025",
    subtitle: "Startups Africanas em Destaque",
    cover: "https://images.unsplash.com/photo-1634224111525-7c631808aa61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGNvdmVyJTIwYnVzaW5lc3MlMjBmb3JiZXN8ZW58MXx8fHwxNzc1NjQ5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Novembro 2025",
  },
  {
    id: 7,
    title: "Outubro 2025",
    subtitle: "Investimento em Infraestrutura",
    cover: "https://images.unsplash.com/photo-1647668068108-748576356aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwZWRpdG9yaWFsJTIwZGVzaWdufGVufDF8fHx8MTc3NTY0OTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Outubro 2025",
  },
];

export default function EdicaoImpressaPage() {
  return (
    <div style={{ backgroundColor: "var(--background)" }}>
      {/* Hero Section - Current Edition */}
      <section
        style={{
          backgroundColor: "var(--secondary)",
          borderBottom: "var(--border-width) solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "var(--spacing-64) var(--spacing-16)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-64)",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left Column - Magazine Cover */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  maxWidth: "400px",
                  width: "100%",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <ImageWithFallback
                  src={currentEdition.cover}
                  alt={`Edição ${currentEdition.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* Right Column - Edition Details */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "var(--spacing-4) var(--spacing-16)",
                  backgroundColor: "var(--primary)",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "var(--spacing-16)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--primary-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Edição Atual
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "var(--text-48)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  lineHeight: "1.1",
                  marginBottom: "var(--spacing-12)",
                }}
              >
                {currentEdition.title}
              </h1>

              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "var(--text-30)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  lineHeight: "1.3",
                  marginBottom: "var(--spacing-24)",
                }}
              >
                {currentEdition.subtitle}
              </h2>

              {/* Highlights */}
              <div style={{ marginBottom: "var(--spacing-32)" }}>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-14)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "var(--spacing-16)",
                  }}
                >
                  Nesta Edição
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-12)",
                  }}
                >
                  {currentEdition.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "var(--spacing-12)",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "var(--primary)",
                          marginTop: "8px",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-16)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--foreground)",
                          lineHeight: "1.6",
                        }}
                      >
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--spacing-8)",
                  padding: "var(--spacing-16) var(--spacing-32)",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--foreground)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Download size={20} />
                Baixar Edição Atual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-64) var(--spacing-16)" }}>
        {/* Section Header */}
        <div
          style={{
            marginBottom: "var(--spacing-48)",
            paddingBottom: "var(--spacing-24)",
            borderBottom: "var(--border-width) solid var(--border)",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-30)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "var(--spacing-8)",
            }}
          >
            Edições Anteriores
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            Aceda ao arquivo completo das nossas publicações
          </p>
        </div>

        {/* Editions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "var(--spacing-48) var(--spacing-32)",
          }}
        >
          {pastEditions.map((edition) => (
            <article
              key={edition.id}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Magazine Cover */}
              <div
                style={{
                  marginBottom: "var(--spacing-16)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)";
                }}
              >
                <ImageWithFallback
                  src={edition.cover}
                  alt={`Edição ${edition.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Edition Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)", marginBottom: "var(--spacing-8)" }}>
                <Calendar size={14} style={{ color: "var(--muted-foreground)" }} />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-12)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {edition.date}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "var(--text-20)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  lineHeight: "1.3",
                  marginBottom: "var(--spacing-4)",
                }}
              >
                {edition.title}
              </h3>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                  lineHeight: "1.5",
                  marginBottom: "var(--spacing-12)",
                }}
              >
                {edition.subtitle}
              </p>

              {/* Download Link */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--spacing-8)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--primary)",
                  textDecoration: "none",
                  transition: "gap 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "var(--spacing-12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "var(--spacing-8)";
                }}
              >
                <FileText size={16} />
                Baixar PDF
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-32) !important;
          }
        }
      `}</style>
    </div>
  );
}
