import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    label: "Economia",
    image:
      "https://images.unsplash.com/photo-1737442528819-5526652236e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwZmluYW5jZSUyMG1hcmtldCUyMGdyb3d0aHxlbnwxfHx8fDE3NzU2NDQ3NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
    count: 48,
  },
  {
    id: 2,
    label: "Empreendedorismo",
    image:
      "https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=800",
    count: 35,
  },
  {
    id: 3,
    label: "Inovação e Tecnologia",
    image:
      "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3NTY0NDc2NHww&ixlib=rb-4.1.0&q=80&w=800",
    count: 27,
  },
  {
    id: 4,
    label: "Liderança",
    image:
      "https://images.unsplash.com/photo-1759310610552-914069ec2e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwbWFuYWdlbWVudCUyMHRlYW0lMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc1NjQ0NzcyfDA&ixlib=rb-4.1.0&q=80&w=800",
    count: 31,
  },
];

export function CategoriesSection() {
  return (
    <section className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-4">
          <h2
            className="mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-20)",
              fontWeight: "var(--font-weight-extra-bold)",
              color: "var(--chart-1)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Categorias
          </h2>
          <div
            className="w-full"
            style={{ height: "2px", backgroundColor: "var(--chart-1)" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="relative group overflow-hidden flex items-end"
              style={{
                height: "200px",
                borderRadius: "var(--radius-card)",
              }}
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)",
                }}
              />
              {/* Content */}
              <div className="relative z-10 w-full p-4 flex items-end justify-between">
                <div>
                  <span
                    className="block"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-16)",
                      fontWeight: "var(--font-weight-semi-bold)",
                      color: "#ffffff",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "var(--font-weight-regular)",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {cat.count} artigos
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
