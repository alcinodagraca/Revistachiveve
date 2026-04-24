import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Award } from "lucide-react";

const teamMembers = [
  {
    name: "Ricardo Monteiro",
    role: "Editor-Chefe",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Ana Paula Silva",
    role: "Directora de Conteúdo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "João Matola",
    role: "Editor de Economia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Mariana Costa",
    role: "Editora de Empreendedorismo",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export default function SobreNosPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 16px" }}>
      {/* Header */}
      <div style={{ marginBottom: "64px", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "var(--text-48)",
            fontWeight: "var(--font-weight-semi-bold)",
            color: "var(--foreground)",
            marginBottom: "16px",
          }}
        >
          Sobre Nós
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "var(--text-20)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          A Forbes para jovens empreendedores moçambicanos
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          marginBottom: "64px",
        }}
      >
        <div
          style={{
            padding: "32px",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--secondary)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Target size={24} color="white" />
          </div>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-24)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "12px",
            }}
          >
            Missão
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            Inspirar e capacitar a próxima geração de líderes empresariais moçambicanos através
            de conteúdo de qualidade.
          </p>
        </div>

        <div
          style={{
            padding: "32px",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--secondary)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Eye size={24} color="white" />
          </div>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-24)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "12px",
            }}
          >
            Visão
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            Ser a principal plataforma de referência para empreendedorismo e negócios em
            Moçambique.
          </p>
        </div>

        <div
          style={{
            padding: "32px",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--secondary)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Award size={24} color="white" />
          </div>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-24)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "12px",
            }}
          >
            Valores
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            Excelência, integridade, inovação e compromisso com a verdade.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "var(--text-30)",
            fontWeight: "var(--font-weight-semi-bold)",
            color: "var(--foreground)",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Nossa Equipa
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          {teamMembers.map((member, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto 16px",
                  border: "4px solid var(--border)",
                }}
              />
              <h3
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "var(--text-20)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  marginBottom: "4px",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
