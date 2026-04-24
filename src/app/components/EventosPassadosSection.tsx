import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const eventos = [
  {
    id: 1,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTY1MjQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Forbes Mulheres 2026",
    subtitle: "Quem são as 100 brasileiras mais poderosas, segundo a Forbes",
    date: "03 de Abril",
  },
  {
    id: 2,
    category: "Empreendedorismo",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBtZWV0aW5nJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzc1NjUyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Under 30 Summit",
    subtitle: "Os jovens que estão revolucionando o mundo dos negócios",
    date: "15 de Março",
  },
  {
    id: 3,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRpbm5lciUyMGV2ZW50JTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NzU2NTI0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Forbes Agro 100",
    subtitle: "Conheça os 100 líderes do agronegócio brasileiro",
    date: "28 de Fevereiro",
  },
  {
    id: 4,
    category: "Inovação",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGV2ZW50JTIwYnVzaW5lc3MlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzc1NjUyNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Tech Innovation Summit",
    subtitle: "Descubra as startups que estão transformando o mercado",
    date: "10 de Janeiro",
  },
];

export function EventosPassadosSection() {
  return (
    <section
      style={{
        backgroundColor: "#F5F5F5",
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
        {/* Section Header with "Ver todos" button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--spacing-32)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-20)",
                fontWeight: "var(--font-weight-extra-bold)",
                color: "var(--foreground)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--spacing-8)",
              }}
            >
              Eventos Passados
            </h2>
            <div
              style={{
                height: "2px",
                backgroundColor: "var(--foreground)",
                width: "200px",
              }}
            />
          </div>

          {/* Ver todos button */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-8)",
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--primary)",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Ver todos
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Events Grid - 4 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--spacing-24)",
          }}
        >
          {eventos.map((evento) => (
            <article key={evento.id}>
              {/* Image */}
              <a
                href="#"
                style={{
                  display: "block",
                  overflow: "hidden",
                  marginBottom: "var(--spacing-16)",
                  position: "relative",
                }}
              >
                {/* Category Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "var(--spacing-12)",
                    left: "var(--spacing-12)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#FFFFFF",
                    padding: "4px var(--spacing-12)",
                    fontSize: "var(--text-12)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "var(--font-weight-semi-bold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    zIndex: 1,
                  }}
                >
                  {evento.category}
                </div>

                <ImageWithFallback
                  src={evento.image}
                  alt={evento.title}
                  style={{
                    width: "100%",
                    height: "240px",
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

              {/* Date */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-12)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--spacing-8)",
                }}
              >
                {evento.date}
              </p>

              {/* Title */}
              <a
                href="#"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  lineHeight: "1.3",
                  marginBottom: "var(--spacing-8)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground)";
                }}
              >
                {evento.title}
              </a>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                  lineHeight: "1.5",
                }}
              >
                {evento.subtitle}
              </p>
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
