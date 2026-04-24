import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const magazineCovers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1588463340632-0dec4c6971dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NTA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610902422826-548d3472fff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JiZXMlMjBtYWdhemluZSUyMGNvdmVyJTIwY2VvfGVufDF8fHx8MTc3NTY1MDc5OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTYwMjkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1771898343647-bd979ad8cca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU2NTA3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="newsletter"
      style={{
        backgroundColor: "var(--primary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "var(--spacing-48) var(--spacing-16)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "var(--spacing-32)",
          alignItems: "center",
        }}
      >
        {/* Left Side: Form */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "var(--spacing-48)",
            alignItems: "center",
          }}
        >
          {/* Form Container */}
          <div style={{ maxWidth: "500px" }}>
            {/* Title */}
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "var(--text-30)",
                fontWeight: "var(--font-weight-semi-bold)",
                color: "#FFFFFF",
                marginBottom: "var(--spacing-32)",
                lineHeight: "1.3",
                letterSpacing: "-0.01em",
              }}
            >
              Assine Forbes. Inspire-se, lidere, conquiste.
            </h2>

            {submitted ? (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "#FFFFFF",
                }}
              >
                ✓ Obrigado! Confirmaremos em breve.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div style={{ marginBottom: "var(--spacing-16)" }}>
                  <input
                    type="email"
                    placeholder="E-mail*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-16)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "#FFFFFF",
                      backgroundColor: "transparent",
                      border: "2px solid #FFFFFF",
                      padding: "var(--spacing-16)",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--primary)",
                    border: "none",
                    padding: "var(--spacing-16)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                  }}
                >
                  Assinar
                </button>

                {/* Privacy Policy Text */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "var(--font-weight-regular)",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginTop: "var(--spacing-16)",
                    lineHeight: "1.5",
                  }}
                >
                  Ao se cadastrar, você concorda com nossa{" "}
                  <a
                    href="#"
                    style={{
                      color: "#FFFFFF",
                      textDecoration: "underline",
                    }}
                  >
                    Política de Privacidade
                  </a>{" "}
                  e com o uso de seus dados para fins de comunicação.
                </p>
              </form>
            )}
          </div>

          {/* Right Side: Magazine Covers */}
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-16)",
              alignItems: "center",
            }}
          >
            {magazineCovers.map((cover, index) => (
              <div
                key={cover.id}
                style={{
                  position: "relative",
                  minWidth: "140px",
                  width: "140px",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  transform: index % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg) translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    index % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)";
                }}
              >
                {/* Red Ribbon */}
                <div
                  style={{
                    position: "absolute",
                    top: "var(--spacing-12)",
                    right: "-30px",
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    padding: "4px 40px",
                    fontSize: "10px",
                    fontWeight: "var(--font-weight-semi-bold)",
                    transform: "rotate(45deg)",
                    zIndex: 2,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Novo
                </div>

                {/* Magazine Cover Image */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#111111",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "var(--spacing-16)",
                  }}
                >
                  {/* Forbes Logo */}
                  <div
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "28px",
                      fontWeight: "var(--font-weight-extra-bold)",
                      color: "#FFFFFF",
                      textAlign: "center",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Forbes
                  </div>

                  {/* Cover Image */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "var(--spacing-8)",
                      marginBottom: "var(--spacing-8)",
                    }}
                  >
                    <ImageWithFallback
                      src={cover.image}
                      alt="Magazine cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Cover Text */}
                  <div
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "9px",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "#FFFFFF",
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {index === 0 && "Os Donos da Fortuna"}
                    {index === 1 && "Super Poderosas"}
                    {index === 2 && "Under 30"}
                    {index === 3 && "Sempre em Conexão"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          section#newsletter > div > div {
            grid-template-columns: 1fr !important;
          }
          section#newsletter > div > div > div:last-child {
            justify-content: center;
            overflow-x: auto;
            padding-bottom: var(--spacing-16);
          }
        }
      `}</style>
    </section>
  );
}
