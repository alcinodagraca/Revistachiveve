import { Users } from "lucide-react";

export function CommunityCTA() {
  return (
    <section
      style={{
        backgroundColor: "var(--secondary)",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--spacing-32)",
        }}
      >
        {/* Icon + Text */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--spacing-16)" }}>
          <div
            style={{
              flexShrink: 0,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Users size={28} color="#FFFFFF" />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "var(--text-26)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "var(--foreground)",
                lineHeight: "1.3",
                marginBottom: "var(--spacing-12)",
              }}
            >
              Junte-se à próxima geração de empreendedores
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-16)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
                lineHeight: "1.65",
                maxWidth: "600px",
              }}
            >
              Faça parte de uma comunidade crescente de líderes e profissionais que acompanham as melhores histórias de negócios em Moçambique. Acesso exclusivo a conteúdo premium e eventos.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#newsletter"
          style={{
            flexShrink: 0,
            padding: "var(--spacing-16) var(--spacing-32)",
            backgroundColor: "var(--primary)",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            fontSize: "var(--text-14)",
            fontWeight: "var(--font-weight-semi-bold)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Assine desde 500 MT / mês
        </a>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          section > div > a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}