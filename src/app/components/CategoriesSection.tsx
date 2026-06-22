import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FaArrowRight } from "react-icons/fa6";
import { SectionHeader } from "./typography";

const categories = [
  {
    id: 1,
    slug: "economia",
    label: "Economia",
    image:
      "https://images.unsplash.com/photo-1737442528819-5526652236e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwZmluYW5jZSUyMG1hcmtldCUyMGdyb3d0aHxlbnwxfHx8fDE3NzU2NDQ3NzF8MA&ixlib=rb-4.1.0&q=80&w=800",
    count: 48,
  },
  {
    id: 2,
    slug: "empreendedorismo",
    label: "Empreendedorismo",
    image:
      "https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=800",
    count: 35,
  },
  {
    id: 3,
    slug: "inovacao-tecnologia",
    label: "Inovação e Tecnologia",
    image:
      "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3NTY0NDc2NHww&ixlib=rb-4.1.0&q=80&w=800",
    count: 27,
  },
  {
    id: 4,
    slug: "lideranca",
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
        <SectionHeader>Categorias</SectionHeader>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/artigos/$category"
              params={{ category: cat.slug }}
              className="relative group overflow-hidden flex items-end h-[200px] rounded-lg no-underline"
            >
              <ImageWithFallback
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.85)] from-0% via-[rgba(15,23,42,0.2)] via-60% to-transparent to-100%"
              />
              <div className="relative z-10 w-full p-4 flex items-end justify-between">
                <div>
                  <span className="block font-serif font-semibold text-base md:text-lg text-white">
                    {cat.label}
                  </span>
                  <span className="font-sans text-xs font-normal text-white/75">
                    {cat.count} artigos
                  </span>
                </div>
                <FaArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 text-white/85"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
