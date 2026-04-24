import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactosPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Mensagem enviada! Entraremos em contacto em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
          Contactos
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
          Entre em contacto connosco
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
        }}
        className="md:grid-cols-[1fr_1.5fr]"
      >
        {/* Contact Information */}
        <div>
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-30)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "24px",
            }}
          >
            Informações de Contacto
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={20} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Email
                </h3>
                <a
                  href="mailto:geral@negociosnochiveve.co.mz"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                  }}
                >
                  geral@negociosnochiveve.co.mz
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={20} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Telefone
                </h3>
                <a
                  href="tel:+258843001234"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                    textDecoration: "none",
                  }}
                >
                  +258 84 300 1234
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "start", gap: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    marginBottom: "4px",
                  }}
                >
                  Endereço
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
                  Av. Julius Nyerere, 1234
                  <br />
                  Maputo, Moçambique
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            padding: "32px",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--card)",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-30)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "24px",
            }}
          >
            Envie-nos uma mensagem
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  marginBottom: "8px",
                }}
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--input-background)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--input-background)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  marginBottom: "8px",
                }}
              >
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--input-background)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  marginBottom: "8px",
                }}
              >
                Mensagem
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--input-background)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  color: "var(--foreground)",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-16)",
                fontWeight: "var(--font-weight-medium)",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Send size={18} />
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
