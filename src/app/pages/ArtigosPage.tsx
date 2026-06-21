import { Link } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/typography";

const categories = [
  { name: "Economia", slug: "economia", color: "#1E4ED8" },
  { name: "Empreendedorismo", slug: "empreendedorismo", color: "#059669" },
  { name: "Inovação e Tecnologia", slug: "inovacao-tecnologia", color: "#DC2626" },
  { name: "Liderança", slug: "lideranca", color: "#7C3AED" },
  { name: "Opinião", slug: "opiniao", color: "#EA580C" },
  { name: "Análise", slug: "analise", color: "#0891B2" },
];

export default function ArtigosPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <PageHeader
        title="Artigos"
        subtitle="Explore nossos artigos por categoria"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Artigos" }]}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to="/artigos/$category"
            params={{ category: category.slug }}
            className="block py-8 px-6 rounded-lg bg-card border border-border no-underline transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <div
              className="w-12 h-1 rounded-sm mb-5"
              style={{ backgroundColor: category.color }}
            />
            <Heading as="h3" variant="feature-title" className="text-foreground mb-3">
              {category.name}
            </Heading>
            <p className="font-sans text-sm text-muted-foreground">
              Ver todos os artigos →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
