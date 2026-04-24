import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

export function ContinueImpactadoSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--primary)",
        paddingTop: "var(--spacing-64)",
        paddingBottom: "var(--spacing-64)",
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
        {/* Two-Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--spacing-48)",
            alignItems: "center",
          }}
        >
          {/* Left Column: Video */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Conheça a Revista Negócios no Chiveve"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Right Column: Content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Label */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "var(--spacing-16)",
                opacity: 0.9,
              }}
            >
              Vídeo Canal
            </p>

            {/* Title */}
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "var(--text-30)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "#FFFFFF",
                marginBottom: "var(--spacing-24)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              A Revolução Empreendedora Começa Aqui
            </h3>

            {/* Paragraph */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-16)",
                fontWeight: "var(--font-weight-regular)",
                color: "rgba(255, 255, 255, 0.95)",
                lineHeight: "1.65",
                marginBottom: "var(--spacing-24)",
              }}
            >
              Descubra histórias inspiradoras de empreendedores moçambicanos que estão a transformar os seus sonhos em realidade. O nosso canal traz entrevistas exclusivas, análises de mercado e insights valiosos para o seu negócio crescer.
            </p>

            {/* Supporting Text */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-16)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "#FFFFFF",
                marginBottom: "var(--spacing-24)",
              }}
            >
              Assista agora e inspire-se!
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "var(--spacing-12)", alignItems: "center" }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Facebook size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Twitter size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Youtube size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Linkedin size={18} color="#FFFFFF" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-32) !important;
          }
        }
      `}</style>
    </section>
  );
}