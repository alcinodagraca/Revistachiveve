import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AdvertisementBanner() {
  return (
    <section className="px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-between mb-2">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Publicidade
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Anuncie aqui
          </span>
        </div>

        {/* Banner */}
        <a
          href="#"
          className="relative flex items-center justify-between overflow-hidden w-full"
          style={{
            height: "120px",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Background image */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1768839721483-c4501b5d6eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFkdmVydGlzZW1lbnQlMjBiYW5uZXIlMjBwcm9tb3Rpb258ZW58MXx8fHwxNzc1NjQ0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1400"
            alt="Anúncio"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />

          {/* Overlay content */}
          <div className="relative z-10 flex items-center justify-between w-full px-8 md:px-16">
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-24)",
                  fontWeight: "var(--font-weight-extra-bold)",
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                }}
              >
                Espaço Publicitário
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Tamanho do anúncio: 1400 × 120 px
              </p>
            </div>
            <span
              className="px-6 py-2.5 rounded"
              style={{
                backgroundColor: "var(--chart-1)",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-semi-bold)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Anuncie aqui
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
