import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, MapPin, Clock } from "lucide-react";

// Featured events (2 events)
const featuredEvents = [
  {
    id: 1,
    title: "Fórum de Empreendedorismo 2026",
    date: "15 Maio 2026",
    time: "09:00 - 17:00",
    location: "Hotel Polana, Maputo",
    image: "https://images.unsplash.com/photo-1769798643582-32ef781c45d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBzcGVha2Vyc3xlbnwxfHx8fDE3NzU2Mjk1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "O maior evento de empreendedorismo em Moçambique. Participe de palestras, workshops e networking com os principais líderes empresariais do país.",
    category: "Empreendedorismo",
  },
  {
    id: 2,
    title: "Workshop: Liderança 4.0",
    date: "22 Maio 2026",
    time: "14:00 - 18:00",
    location: "Centro de Conferências, Maputo",
    image: "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTU5MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Desenvolva competências de liderança moderna com especialistas internacionais. Workshop prático com cases de sucesso.",
    category: "Liderança",
  },
];

// Regular events (for the grid)
const regularEvents = [
  {
    id: 3,
    title: "Networking Night: Conexões de Negócios",
    date: "30 Maio 2026",
    time: "18:00 - 22:00",
    location: "Sky Bar, Maputo",
    image: "https://images.unsplash.com/photo-1772724317613-f9a09ca9cfe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc3NTY0ODg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Conecte-se com líderes empresariais em um ambiente descontraído.",
    category: "Networking",
  },
  {
    id: 4,
    title: "Pitch Day: Startups Inovadoras",
    date: "5 Junho 2026",
    time: "10:00 - 16:00",
    location: "Hub de Inovação, Maputo",
    image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHBpdGNoJTIwZXZlbnR8ZW58MXx8fHwxNzc1NjQ4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Assista apresentações de startups e encontre oportunidades de investimento.",
    category: "Inovação",
  },
  {
    id: 5,
    title: "Summit de Inovação e Tecnologia",
    date: "12 Junho 2026",
    time: "09:00 - 18:00",
    location: "Centro Internacional de Conferências",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwc3VtbWl0JTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Explore as últimas tendências em tecnologia e inovação empresarial.",
    category: "Tecnologia",
  },
  {
    id: 6,
    title: "Painel: Economia Digital em África",
    date: "20 Junho 2026",
    time: "15:00 - 18:00",
    location: "Auditório Joaquim Chissano",
    image: "https://images.unsplash.com/photo-1769798643582-32ef781c45d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBzcGVha2Vyc3xlbnwxfHx8fDE3NzU2Mjk1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Discussão sobre o futuro da economia digital no continente africano.",
    category: "Economia",
  },
  {
    id: 7,
    title: "Workshop: Marketing Digital Avançado",
    date: "28 Junho 2026",
    time: "13:00 - 17:00",
    location: "Centro de Formação Digital",
    image: "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTU5MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Aprenda estratégias avançadas de marketing digital para negócios.",
    category: "Marketing",
  },
  {
    id: 8,
    title: "Encontro de Investidores",
    date: "5 Julho 2026",
    time: "16:00 - 20:00",
    location: "Clube de Negócios, Maputo",
    image: "https://images.unsplash.com/photo-1772724317613-f9a09ca9cfe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc3NTY0ODg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Conecte-se com investidores ativos no ecossistema empreendedor.",
    category: "Investimento",
  },
  {
    id: 9,
    title: "Conferência de Sustentabilidade",
    date: "15 Julho 2026",
    time: "09:00 - 17:00",
    location: "Campus Universitário",
    image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHBpdGNoJTIwZXZlbnR8ZW58MXx8fHwxNzc1NjQ4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Debata práticas sustentáveis no mundo dos negócios.",
    category: "Sustentabilidade",
  },
];

export default function EventosPage() {
  return (
    <div style={{ backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-48) var(--spacing-16)" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "var(--spacing-48)" }}>
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
            Eventos
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
            Participe nos nossos eventos e amplie a sua rede de contactos profissionais
          </p>
        </div>

        {/* Featured Events Section - 2 columns */}
        <div style={{ marginBottom: "var(--spacing-64)" }}>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "var(--spacing-32)",
            }}
          >
            {featuredEvents.map((event) => (
              <article
                key={event.id}
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
                    src={event.image}
                    alt={event.title}
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
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {event.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "var(--text-24)",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "var(--foreground)",
                      marginBottom: "var(--spacing-12)",
                      lineHeight: "1.3",
                    }}
                  >
                    {event.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                      lineHeight: "1.6",
                      marginBottom: "var(--spacing-16)",
                    }}
                  >
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", marginBottom: "var(--spacing-16)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <Calendar size={16} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.date}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <Clock size={16} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.time}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <MapPin size={16} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "var(--spacing-12) var(--spacing-24)",
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      border: "none",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-medium)",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Inscrever-se
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Regular Events Grid - 3 columns */}
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
            Próximos Eventos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--spacing-24)",
            }}
          >
            {regularEvents.map((event) => (
              <article
                key={event.id}
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
                    src={event.image}
                    alt={event.title}
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
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {event.category}
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
                    {event.title}
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
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)", marginBottom: "var(--spacing-16)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <Calendar size={14} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-12)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.date}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <Clock size={14} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-12)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.time}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                      <MapPin size={14} style={{ color: "var(--primary)" }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-12)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "var(--spacing-12) var(--spacing-20)",
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      border: "none",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-12)",
                      fontWeight: "var(--font-weight-medium)",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Inscrever-se
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
