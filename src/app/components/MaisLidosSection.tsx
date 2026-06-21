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
    <section className="bg-[#111111] relative overflow-hidden py-16">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="font-serif text-3xl font-semibold text-white text-center mb-12 tracking-[-0.01em]">
          As Mais Lidas agora
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-[-20px] top-[40%] -translate-y-1/2 z-10 bg-white/10 border border-white/20 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-[-20px] top-[40%] -translate-y-1/2 z-10 bg-white/10 border border-white/20 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight size={24} color="#FFFFFF" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="hide-scrollbar flex gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] pb-6"
          >
            {maisLidos.map((item) => (
              <article
                key={item.id}
                className="group min-w-[260px] max-w-[260px] cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="w-full aspect-[3/4] overflow-hidden mb-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-serif text-base font-medium text-white leading-[1.4] transition-colors duration-200 group-hover:text-primary">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {dots.map((dot, index) => (
            <button
              key={dot}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = 284;
                  scrollContainerRef.current.scrollTo({
                    left: cardWidth * index * 2,
                    behavior: "smooth",
                  });
                }
              }}
              className={
                index === 0
                  ? "w-3 h-3 rounded-full bg-[#EF4444] border-none cursor-pointer transition-all duration-300 p-0"
                  : "w-2 h-2 rounded-full bg-white/40 border-none cursor-pointer transition-all duration-300 p-0 hover:bg-white/60"
              }
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
