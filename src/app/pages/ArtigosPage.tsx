import { Link } from "react-router";

const categories = [
  { name: "Economia", slug: "economia", color: "#1E4ED8" },
  { name: "Empreendedorismo", slug: "empreendedorismo", color: "#059669" },
  { name: "Inovação e Tecnologia", slug: "inovacao-tecnologia", color: "#DC2626" },
  { name: "Liderança", slug: "lideranca", color: "#7C3AED" },
  { name: "Opinião", slug: "opiniao", color: "#EA580C" },
  { name: "Análise", slug: "analise", color: "#0891B2" },
];

export default function ArtigosPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "48px", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "var(--text-48)",
            fontWeight: "var(--font-weight-semi-bold)",
            color: "var(--foreground)",
            marginBottom: "16px",
          }}
        >
          Artigos
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "var(--text-20)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            lineHeight: "1.6",
          }}
        >
          Explore nossos artigos por categoria
        </p>
      </div>

      {/* Categories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/artigos/${category.slug}`}
            style={{
              display: "block",
              padding: "32px 24px",
              borderRadius: "var(--radius-card)",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "48px",
                height: "4px",
                backgroundColor: category.color,
                borderRadius: "2px",
                marginBottom: "20px",
              }}
            />
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "var(--text-24)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "var(--foreground)",
                marginBottom: "12px",
              }}
            >
              {category.name}
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
              }}
            >
              Ver todos os artigos →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
