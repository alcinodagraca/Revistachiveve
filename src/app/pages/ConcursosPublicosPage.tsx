import { FileText, Calendar, ExternalLink } from "lucide-react";

const concursos = [
  {
    id: 1,
    title: "Assistente Administrativo",
    institution: "Ministério das Finanças",
    deadline: "30 Abril 2026",
    type: "Concurso Público",
    vacancies: 5,
  },
  {
    id: 2,
    title: "Gestor de Projectos",
    institution: "Banco de Moçambique",
    deadline: "15 Maio 2026",
    type: "Concurso Limitado",
    vacancies: 2,
  },
  {
    id: 3,
    title: "Analista de Sistemas",
    institution: "Instituto Nacional de Estatística",
    deadline: "25 Maio 2026",
    type: "Concurso Público",
    vacancies: 3,
  },
  {
    id: 4,
    title: "Economista Sénior",
    institution: "Autoridade Tributária de Moçambique",
    deadline: "10 Junho 2026",
    type: "Concurso Público",
    vacancies: 4,
  },
];

export default function ConcursosPublicosPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 16px" }}>
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
          Concursos Públicos
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
          Oportunidades no sector público
        </p>
      </div>

      <div style={{ display: "grid", gap: "24px" }}>
        {concursos.map((concurso) => (
          <div
            key={concurso.id}
            style={{
              padding: "24px",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border)",
              backgroundColor: "var(--card)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    backgroundColor: "var(--secondary)",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "var(--primary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {concurso.type}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "var(--text-24)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    marginBottom: "8px",
                  }}
                >
                  {concurso.title}
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--muted-foreground)",
                    marginBottom: "16px",
                  }}
                >
                  {concurso.institution}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={16} style={{ color: "var(--muted-foreground)" }} />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-14)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Prazo: {concurso.deadline}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileText size={16} style={{ color: "var(--muted-foreground)" }} />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-14)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {concurso.vacancies} {concurso.vacancies === 1 ? "vaga" : "vagas"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ver Edital
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
