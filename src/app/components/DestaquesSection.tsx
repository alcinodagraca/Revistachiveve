import { ImageWithFallback } from "./figma/ImageWithFallback";

const destaques = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDQ3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: '"Dário Camal" – Do Bairro Central para o mundo',
    date: "05/01/2022",
    description:
      "Dário Camal fala do seu percurso associativo e influência para mudanças a nível internacional, mostrando que os sonhos não têm fronteiras.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTY0NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Marlene de Sousa – Uma mulher com a vida resumida em Recursos Humanos",
    date: "05/01/2022",
    description:
      "Natural de Quelimane e com 31 anos de idade, Marlene de Sousa conta como construiu uma carreira sólida no sector de RH em Moçambique.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1709912760136-3da61d6f1361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3phbWJpcXVlJTIwZW50cmVwcmVuZXVyJTIwbGVhZGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1NjQ0NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Ser empresário em Moçambique",
    date: "04/01/2022",
    description:
      '"Procurem não correr atrás de muitos sonhos. Procure definir seu grande sonho e corra atrás para não perder-se pelo caminho." Uma conversa franca sobre empreendedorismo.',
  },
];

export function DestaquesSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--background)",
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
        {/* Section Header */}
        <div style={{ marginBottom: "var(--spacing-32)" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-20)",
              fontWeight: "var(--font-weight-extra-bold)",
              color: "var(--primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--spacing-8)",
            }}
          >
            Destaques
          </h2>
          <div
            style={{ 
              height: "2px", 
              backgroundColor: "var(--primary)",
              width: "100%"
            }}
          />
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--spacing-24)",
          }}
        >
          {destaques.map((item) => (
            <article key={item.id}>
              {/* Image - No border radius */}
              <a 
                href="#" 
                style={{ 
                  display: "block",
                  overflow: "hidden",
                  marginBottom: "var(--spacing-16)"
                }}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "260px",
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

              {/* Title */}
              <a
                href="#"
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--primary)",
                  lineHeight: "1.3",
                  marginBottom: "var(--spacing-8)",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {item.title}
              </a>

              {/* Date */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                  marginBottom: "var(--spacing-12)",
                }}
              >
                {item.date}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--foreground)",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}