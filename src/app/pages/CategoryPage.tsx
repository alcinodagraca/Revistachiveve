import { useParams, Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock, ArrowLeft } from "lucide-react";

const categoryData: Record<string, { name: string; color: string; description: string }> = {
  economia: {
    name: "Economia",
    color: "#1E4ED8",
    description: "Análises e notícias sobre a economia moçambicana e global",
  },
  empreendedorismo: {
    name: "Empreendedorismo",
    color: "#059669",
    description: "Histórias de empreendedores e dicas para o sucesso empresarial",
  },
  "inovacao-tecnologia": {
    name: "Inovação e Tecnologia",
    color: "#DC2626",
    description: "As últimas tendências em tecnologia e inovação empresarial",
  },
  lideranca: {
    name: "Liderança",
    color: "#7C3AED",
    description: "Insights sobre liderança e gestão de equipas",
  },
  opiniao: {
    name: "Opinião",
    color: "#EA580C",
    description: "Artigos de opinião de especialistas e líderes",
  },
  analise: {
    name: "Análise",
    color: "#0891B2",
    description: "Análises profundas sobre temas de negócios",
  },
};

// Featured articles (2 articles)
const featuredArticles = [
  {
    id: 1,
    title: "Como a transformação digital está mudando o panorama empresarial em Moçambique",
    excerpt:
      "As empresas moçambicanas estão cada vez mais a adoptar tecnologias digitais para melhorar a eficiência e competitividade no mercado global.",
    image: "https://images.unsplash.com/photo-1760999187614-7a3b22a077d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNvbXB1dGVyfGVufDF8fHx8MTc3NTU4NDgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Carlos Mendes",
    date: "Abril 2026",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Startups moçambicanas atraem investimento internacional",
    excerpt:
      "O ecossistema de startups em Moçambique está em crescimento, atraindo atenção de investidores internacionais interessados em tecnologia africana.",
    image: "https://images.unsplash.com/photo-1590097520283-52d3d7926a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBzdGFydHVwJTIwb2ZmaWNlfGVufDF8fHx8MTc3NTU2MDg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Ana Silva",
    date: "Abril 2026",
    readTime: "6 min",
  },
];

// Regular articles (for the grid)
const regularArticles = [
  {
    id: 3,
    title: "Liderança em tempos de mudança: estratégias para CEOs modernos",
    excerpt:
      "Líderes empresariais partilham as suas estratégias para navegar em ambientes de negócios cada vez mais complexos.",
    image: "https://images.unsplash.com/photo-1681949103006-70066fb25dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzc1NTc0NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "João Matola",
    date: "Abril 2026",
    readTime: "10 min",
  },
  {
    id: 4,
    title: "O futuro do trabalho: como preparar a sua empresa",
    excerpt:
      "Especialistas discutem as tendências que estão a moldar o futuro do trabalho e como as empresas podem se adaptar.",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ4NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Maria Santos",
    date: "Março 2026",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "Mulheres na liderança: rompendo barreiras no mundo empresarial",
    excerpt:
      "Conheça as histórias de mulheres que estão a transformar o panorama empresarial moçambicano.",
    image: "https://images.unsplash.com/photo-1573497491306-c8a68afac6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc3NTYyNDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Beatriz Nunes",
    date: "Março 2026",
    readTime: "9 min",
  },
  {
    id: 6,
    title: "Empreendedorismo jovem: casos de sucesso em Moçambique",
    excerpt:
      "Jovens empreendedores partilham os seus desafios e conquistas no mundo dos negócios.",
    image: "https://images.unsplash.com/photo-1645736593731-4eef033ac37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDMwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Ricardo Monteiro",
    date: "Março 2026",
    readTime: "5 min",
  },
  {
    id: 7,
    title: "Colaboração e inovação: o segredo do sucesso empresarial",
    excerpt:
      "Como a colaboração entre equipas está a impulsionar a inovação nas empresas moçambicanas.",
    image: "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzc1NTY5NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Fernando Costa",
    date: "Março 2026",
    readTime: "6 min",
  },
  {
    id: 8,
    title: "Produtividade e gestão de tempo para empreendedores",
    excerpt:
      "Técnicas comprovadas para maximizar a produtividade e alcançar os seus objectivos empresariais.",
    image: "https://images.unsplash.com/photo-1621762782296-a131155befee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBsYXB0b3AlMjB3b3JraW5nfGVufDF8fHx8MTc3NTY0NjkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Paulo Machado",
    date: "Março 2026",
    readTime: "8 min",
  },
  {
    id: 9,
    title: "Marketing digital: estratégias para pequenas empresas",
    excerpt:
      "Como pequenas empresas podem competir no mercado digital com recursos limitados.",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ4NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Sandra Lopes",
    date: "Março 2026",
    readTime: "7 min",
  },
];

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryInfo = category ? categoryData[category] : null;

  if (!categoryInfo) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-48) var(--spacing-16)", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "var(--text-48)",
            fontWeight: "var(--font-weight-semi-bold)",
            color: "var(--foreground)",
          }}
        >
          Categoria não encontrada
        </h1>
        <Link
          to="/artigos"
          style={{
            display: "inline-block",
            marginTop: "var(--spacing-24)",
            color: "var(--primary)",
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: "var(--text-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          ← Voltar para Artigos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-48) var(--spacing-16)" }}>
        {/* Category Header */}
        <div style={{ marginBottom: "var(--spacing-32)" }}>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-48)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "var(--spacing-8)",
              lineHeight: "1.1",
            }}
          >
            {categoryInfo.name}
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            {categoryInfo.description}
          </p>
        </div>

        {/* Featured Articles Section - 2 columns */}
        <div style={{ marginBottom: "var(--spacing-48)" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "var(--spacing-20)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Em Destaque
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--spacing-24)",
            }}
          >
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                style={{
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ paddingTop: "var(--spacing-16)" }}>
                  <div
                    style={{
                      display: "inline-block",
                      marginBottom: "var(--spacing-8)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "var(--font-weight-semi-bold)",
                        color: categoryInfo.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {categoryInfo.name}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "var(--text-20)",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "var(--foreground)",
                      marginBottom: "var(--spacing-8)",
                      lineHeight: "1.3",
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                      lineHeight: "1.6",
                      marginBottom: "var(--spacing-12)",
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-8)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-12)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--foreground)",
                      }}
                    >
                      {article.author}
                    </span>
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        backgroundColor: "var(--muted-foreground)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-12)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {article.date}
                    </span>
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        backgroundColor: "var(--muted-foreground)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}>
                      <Clock size={12} style={{ color: "var(--muted-foreground)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-12)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Regular Articles Grid - 3 columns */}
        <div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "var(--spacing-20)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Todos os Artigos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--spacing-24)",
            }}
          >
            {regularArticles.map((article) => (
              <article
                key={article.id}
                style={{
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ paddingTop: "var(--spacing-16)" }}>
                  <div
                    style={{
                      display: "inline-block",
                      marginBottom: "var(--spacing-8)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "var(--font-weight-semi-bold)",
                        color: categoryInfo.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {categoryInfo.name}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "var(--text-16)",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "var(--foreground)",
                      marginBottom: "var(--spacing-8)",
                      lineHeight: "1.3",
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                      lineHeight: "1.6",
                      marginBottom: "var(--spacing-12)",
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--spacing-8)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-12)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--foreground)",
                      }}
                    >
                      {article.author}
                    </span>
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        backgroundColor: "var(--muted-foreground)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-12)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {article.date}
                    </span>
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        backgroundColor: "var(--muted-foreground)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}>
                      <Clock size={12} style={{ color: "var(--muted-foreground)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-12)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
