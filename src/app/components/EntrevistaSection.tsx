export function EntrevistaSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--primary)",
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
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-extra-bold)",
              color: "var(--primary-foreground)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "var(--spacing-8)",
            }}
          >
            ENTREVISTA
          </h2>
          <div
            style={{ 
              height: "1px", 
              backgroundColor: "var(--primary-foreground)",
              width: "100%",
              opacity: 0.5
            }}
          />
        </div>

        {/* Content Layout */}
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-32)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Video / Image Placeholder */}
          <div
            style={{
              flex: "1 1 500px",
              backgroundColor: "#f0f0f0",
              aspectRatio: "16 / 9",
            }}
          />

          {/* Text Content */}
          <div
            style={{
              flex: "1 1 400px",
              color: "var(--primary-foreground)",
            }}
          >
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-20)",
                fontWeight: "var(--font-weight-bold)",
                marginBottom: "var(--spacing-16)",
                lineHeight: "1.4",
              }}
            >
              "Dário Camal" – Do Bairro Central para o mundo
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-regular)",
                lineHeight: "1.75",
                marginBottom: "var(--spacing-24)",
                color: "var(--primary-foreground)",
                opacity: 0.9,
              }}
            >
              Conheça o nosso canal digital que conta com uma série documental sobre
              empreendedorismo, economia, liderança e histórias de individualidades
              que questionam o jeito que estão levando a vida, se desprendem da
              carreira que construíram até então e partem para uma nova caminhada.
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-12)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--primary-foreground)",
                opacity: 0.8,
              }}
            >
              Autor, 20 de Abril de 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
