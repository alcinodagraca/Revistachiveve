import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const maisLidos = [
  {
    id: 1,
    title: "Uma Nova Voz Para O Luxo Automotivo",
    image: "https://images.unsplash.com/photo-1774130925484-71a206efdac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU2NTA2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Artemis II: Tripulação Compartilha Imagens da Terra e Conserta o Banheiro",
    image: "https://images.unsplash.com/photo-1635645530080-8a962d154378?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwY3Jlc2NlbnQlMjBuaWdodCUyMHNreXxlbnwxfHx8fDE3NzU2NTA2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Bilionário Indiano das Telecomunicações Aposta US$ 1 Bilhão em Expansão de Data Centers na Índia",
    image: "https://images.unsplash.com/photo-1659353221405-29b7d087f9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBidXNpbmVzc21hbiUyMHByZXNlbnRhdGlvbiUyMHRlY2h8ZW58MXx8fHwxNzc1NjUwNjAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "As 10 Pessoas Mais Ricas do Mundo em Abril de 2026",
    image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwc3VpdHxlbnwxfHx8fDE3NzU2NTA2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Seis Lições de um Bilionário que Já Vendeu o Próprio Sangue para Comprar Comida",
    image: "https://images.unsplash.com/photo-1764084052338-23a317e34ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjB1cmJhbiUyMG91dGRvb3J8ZW58MXx8fHwxNzc1NjUwNjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Liderança Transformacional em Tempos de Mudança",
    image: "https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU2NTA2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function MaisLidosSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // Approximate card width + gap
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const totalDots = Math.ceil(maisLidos.length / 2);
  const dots = Array.from({ length: totalDots }, (_, i) => i);

  return (
    <section
      style={{
        backgroundColor: "#111111",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--spacing-64)",
        paddingBottom: "var(--spacing-64)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "var(--spacing-16)",
          paddingRight: "var(--spacing-16)",
        }}
      >
        {/* Section Title */}
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "var(--text-30)",
            fontWeight: "var(--font-weight-semi-bold)",
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "var(--spacing-48)",
            letterSpacing: "-0.01em",
          }}
        >
          As Mais Lidas agora
        </h2>

        {/* Carousel Container */}
        <div style={{ position: "relative" }}>
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              style={{
                position: "absolute",
                left: "-20px",
                top: "40%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              style={{
                position: "absolute",
                right: "-20px",
                top: "40%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={24} color="#FFFFFF" />
            </button>
          )}

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            style={{
              display: "flex",
              gap: "var(--spacing-24)",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "var(--spacing-24)",
            }}
            className="hide-scrollbar"
          >
            {maisLidos.map((item) => (
              <article
                key={item.id}
                style={{
                  minWidth: "260px",
                  maxWidth: "260px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    overflow: "hidden",
                    marginBottom: "var(--spacing-16)",
                  }}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
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
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "#FFFFFF",
                    lineHeight: "1.4",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                >
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        {/* Dots Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--spacing-8)",
            marginTop: "var(--spacing-32)",
          }}
        >
          {dots.map((dot, index) => (
            <button
              key={dot}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = 284; // card width + gap
                  scrollContainerRef.current.scrollTo({
                    left: cardWidth * index * 2,
                    behavior: "smooth",
                  });
                }
              }}
              style={{
                width: index === 0 ? "12px" : "8px",
                height: index === 0 ? "12px" : "8px",
                borderRadius: "50%",
                backgroundColor: index === 0 ? "#EF4444" : "rgba(255, 255, 255, 0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (index !== 0) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hide Scrollbar CSS */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
