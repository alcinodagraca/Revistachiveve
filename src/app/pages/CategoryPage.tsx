import { Link, useParams } from "@tanstack/react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Clock } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";

const categoryData: Record<string, { name: string; color: string; description: string }> = {
  economia: {
    name: "Economia",
    color: "#1E4ED8",
    description: "Análises e notícias sobre a economia moçambicana e global",
  },
  empreendedorismo: {
    name: "Empreendedorismo",
    color: "#059669",
    description: "Histórias de empreendedores e dicas para o sucesso empresarial",
  },
  "inovacao-tecnologia": {
    name: "Inovação e Tecnologia",
    color: "#DC2626",
    description: "As últimas tendências em tecnologia e inovação empresarial",
  },
  lideranca: {
    name: "Liderança",
    color: "#7C3AED",
    description: "Insights sobre liderança e gestão de equipas",
  },
  opiniao: {
    name: "Opinião",
    color: "#EA580C",
    description: "Artigos de opinião de especialistas e líderes",
  },
  analise: {
    name: "Análise",
    color: "#0891B2",
    description: "Análises profundas sobre temas de negócios",
  },
};

// Featured articles (2 articles)
const featuredArticles = [
  {
    id: 1,
    title: "Como a transformação digital está mudando o panorama empresarial em Moçambique",
    excerpt:
      "As empresas moçambicanas estão cada vez mais a adoptar tecnologias digitais para melhorar a eficiência e competitividade no mercado global.",
    image: "https://images.unsplash.com/photo-1760999187614-7a3b22a077d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNvbXB1dGVyfGVufDF8fHx8MTc3NTU4NDgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Carlos Mendes",
    date: "Abril 2026",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Startups moçambicanas atraem investimento internacional",
    excerpt:
      "O ecossistema de startups em Moçambique está em crescimento, atraindo atenção de investidores internacionais interessados em tecnologia africana.",
    image: "https://images.unsplash.com/photo-1590097520283-52d3d7926a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBzdGFydHVwJTIwb2ZmaWNlfGVufDF8fHx8MTc3NTU2MDg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Ana Silva",
    date: "Abril 2026",
    readTime: "6 min",
  },
];

// Regular articles (for the grid)
const regularArticles = [
  {
    id: 3,
    title: "Liderança em tempos de mudança: estratégias para CEOs modernos",
    excerpt:
      "Líderes empresariais partilham as suas estratégias para navegar em ambientes de negócios cada vez mais complexos.",
    image: "https://images.unsplash.com/photo-1681949103006-70066fb25dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzc1NTc0NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "João Matola",
    date: "Abril 2026",
    readTime: "10 min",
  },
  {
    id: 4,
    title: "O futuro do trabalho: como preparar a sua empresa",
    excerpt:
      "Especialistas discutem as tendências que estão a moldar o futuro do trabalho e como as empresas podem se adaptar.",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ4NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Maria Santos",
    date: "Março 2026",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "Mulheres na liderança: rompendo barreiras no mundo empresarial",
    excerpt:
      "Conheça as histórias de mulheres que estão a transformar o panorama empresarial moçambicano.",
    image: "https://images.unsplash.com/photo-1573497491306-c8a68afac6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc3NTYyNDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Beatriz Nunes",
    date: "Março 2026",
    readTime: "9 min",
  },
  {
    id: 6,
    title: "Empreendedorismo jovem: casos de sucesso em Moçambique",
    excerpt:
      "Jovens empreendedores partilham os seus desafios e conquistas no mundo dos negócios.",
    image: "https://images.unsplash.com/photo-1645736593731-4eef033ac37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDMwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Ricardo Monteiro",
    date: "Março 2026",
    readTime: "5 min",
  },
  {
    id: 7,
    title: "Colaboração e inovação: o segredo do sucesso empresarial",
    excerpt:
      "Como a colaboração entre equipas está a impulsionar a inovação nas empresas moçambicanas.",
    image: "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzc1NTY5NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Fernando Costa",
    date: "Março 2026",
    readTime: "6 min",
  },
  {
    id: 8,
    title: "Produtividade e gestão de tempo para empreendedores",
    excerpt:
      "Técnicas comprovadas para maximizar a produtividade e alcançar os seus objectivos empresariais.",
    image: "https://images.unsplash.com/photo-1621762782296-a131155befee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBsYXB0b3AlMjB3b3JraW5nfGVufDF8fHx8MTc3NTY0NjkwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Paulo Machado",
    date: "Março 2026",
    readTime: "8 min",
  },
  {
    id: 9,
    title: "Marketing digital: estratégias para pequenas empresas",
    excerpt:
      "Como pequenas empresas podem competir no mercado digital com recursos limitados.",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ4NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Sandra Lopes",
    date: "Março 2026",
    readTime: "7 min",
  },
];

export default function CategoryPage() {
  const { category } = useParams({ strict: false });
  const categoryInfo = category ? categoryData[category] : null;

  if (!categoryInfo) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-12 text-center">
        <Heading as="h1" variant="page-title" className="text-foreground mb-6">
          Categoria não encontrada
        </Heading>
        <Link
          to="/artigos"
          className="inline-block mt-6 text-primary no-underline font-sans text-base font-medium"
        >
          ← Voltar para Artigos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <PageHeader
          title={categoryInfo.name}
          subtitle={categoryInfo.description}
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Artigos", to: "/artigos" },
            { label: categoryInfo.name },
          ]}
        />

        <div className="mb-12">
          <SectionHeader>Em Destaque</SectionHeader>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[280px] object-cover block"
                  />
                </div>

                <div className="pt-4">
                  <div className="mb-2">
                    <Eyebrow style={{ color: categoryInfo.color }}>
                      {categoryInfo.name}
                    </Eyebrow>
                  </div>

                  <Heading as="h3" variant="feature-title" className="text-foreground mb-2">
                    {article.title}
                  </Heading>

                  <p className="font-sans text-sm text-muted-foreground leading-[1.6] mb-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans text-xs font-medium text-foreground">
                      {article.author}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                    <span className="font-sans text-xs text-muted-foreground">
                      {article.date}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="font-sans text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader>Todos os Artigos</SectionHeader>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[200px] object-cover block"
                  />
                </div>

                <div className="pt-4">
                  <div className="mb-2">
                    <Eyebrow style={{ color: categoryInfo.color }}>
                      {categoryInfo.name}
                    </Eyebrow>
                  </div>

                  <Heading as="h3" variant="card-title" className="text-foreground mb-2">
                    {article.title}
                  </Heading>

                  <p className="font-sans text-sm text-muted-foreground leading-[1.6] mb-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans text-xs font-medium text-foreground">
                      {article.author}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                    <span className="font-sans text-xs text-muted-foreground">
                      {article.date}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="font-sans text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
