export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "economia",
    name: "Economia",
    description:
      "Análises e notícias sobre a economia moçambicana, africana e global.",
    image:
      "https://images.unsplash.com/photo-1737442528819-5526652236e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwZmluYW5jZSUyMG1hcmtldCUyMGdyb3d0aHxlbnwxfHx8fDE3NzU2NDQ3NzF8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    slug: "empreendedorismo",
    name: "Empreendedorismo",
    description:
      "Histórias inspiradoras e dicas práticas para quem cria e faz crescer negócios.",
    image:
      "https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    slug: "inovacao-tecnologia",
    name: "Inovação e Tecnologia",
    description:
      "O que está a mudar com a tecnologia, da inteligência artificial às fintechs africanas.",
    image:
      "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3NTY0NDc2NHww&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    slug: "lideranca",
    name: "Liderança",
    description:
      "Perfis e ensaios sobre liderança, gestão de pessoas e cultura organizacional.",
    image:
      "https://images.unsplash.com/photo-1759310610552-914069ec2e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwbWFuYWdlbWVudCUyMHRlYW0lMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc1NjQ0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    slug: "opiniao",
    name: "Opinião",
    description:
      "Colunas e ensaios assinados pelos nossos colaboradores e convidados.",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNoZXN0JTIwcGVvcGxlJTIwYmlsbGlvbmFpcmVzJTIwd29ybGR8ZW58MXx8fHwxNzc1NjUyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    slug: "analise",
    name: "Análise",
    description:
      "Reportagens e análises aprofundadas sobre os temas que movem o mercado.",
    image:
      "https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDQ3NTd8MA&ixlib=rb-4.1.0&q=80&w=1200",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
