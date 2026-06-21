export type Article = {
  slug: string;
  category: string; // category slug
  title: string;
  excerpt: string;
  body: string[]; // paragraphs
  heroImage: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  publishedAt: string; // ISO date
  readTime: number; // minutes
  tags: string[];
};

export const articles: Article[] = [
  {
    slug: "dario-camal-bairro-central-mundo",
    category: "empreendedorismo",
    title: '"Dário Camal" – Do Bairro Central para o mundo',
    excerpt:
      "Conheça o nosso canal digital que conta com uma série documental sobre empreendedorismo, economia, liderança e histórias de individualidades que questionam o jeito que estão levando a vida, se desprendem da carreira que construíram até então e partem para uma nova caminhada.",
    body: [
      "Numa conversa franca sobre raízes e horizontes, Dário Camal recorda como cresceu no Bairro Central, em Maputo, e como o tecido associativo da comunidade moldou a sua visão de liderança.",
      '"Quando comecei, o que eu queria era fazer alguma coisa pelo bairro. Nunca imaginei que isso me levaria a falar em conferências internacionais", conta. Hoje, divide o tempo entre Maputo, Joanesburgo e Lisboa, mas insiste que o trabalho de base continua a ser o que mais o motiva.',
      "Para ele, o erro mais comum entre jovens empreendedores é confundir visibilidade com impacto. \"Aparecer nas redes sociais não muda a vida de ninguém. O que muda é estar presente, é resolver problemas reais.\"",
      "Sobre o futuro, fala em criar uma rede pan-africana de jovens líderes — um projecto ainda em fase de desenho, mas que descreve com a mesma determinação de quem, há dez anos, organizava encontros à luz de candeeiros de rua.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDQ3NTd8MA&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Equipa Chiveve", role: "Redacção" },
    publishedAt: "2026-01-05",
    readTime: 6,
    tags: ["perfil", "liderança jovem", "Maputo"],
  },
  {
    slug: "marlene-sousa-recursos-humanos",
    category: "lideranca",
    title:
      "Marlene de Sousa – Uma mulher com a vida resumida em Recursos Humanos",
    excerpt:
      "Natural de Quelimane e com 31 anos de idade, Marlene de Sousa conta como construiu uma carreira sólida no sector de RH em Moçambique.",
    body: [
      "Marlene de Sousa começou cedo. Aos 22, já coordenava equipas de recrutamento numa multinacional em Maputo. Hoje, gere uma consultora que apoia empresas em três países da região.",
      '"O sector de RH foi durante muito tempo visto como administrativo. A minha geração teve de provar que é estratégico", afirma.',
      "A sua tese é simples: empresas que tratam pessoas como custo não escalam. \"Não há produto, por melhor que seja, que sobreviva a uma cultura tóxica.\"",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTY0NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Inês Massingue", role: "Jornalista" },
    publishedAt: "2026-01-05",
    readTime: 5,
    tags: ["perfil", "RH", "liderança feminina"],
  },
  {
    slug: "ser-empresario-em-mocambique",
    category: "empreendedorismo",
    title: "Ser empresário em Moçambique",
    excerpt:
      '"Procurem não correr atrás de muitos sonhos. Definam o grande sonho e corram atrás dele." Uma conversa franca sobre empreender no país.',
    body: [
      "Empreender em Moçambique exige uma combinação rara de paciência e teimosia. As burocracias são lentas, o crédito é caro, mas o mercado tem janelas que poucos países africanos oferecem.",
      "Nesta conversa, três empresários com mais de uma década de operação no país discutem como navegaram crises cambiais, mudanças regulatórias e a aprendizagem dura de saber quando dizer não a uma oportunidade.",
      "A lição comum: foco. \"Quem persegue muitos sonhos ao mesmo tempo, no fim não constrói nenhum.\"",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1709912760136-3da61d6f1361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3phbWJpcXVlJTIwZW50cmVwcmVuZXVyJTIwbGVhZGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1NjQ0NzU3fDA&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Equipa Chiveve", role: "Redacção" },
    publishedAt: "2026-01-04",
    readTime: 7,
    tags: ["empreendedorismo", "Moçambique"],
  },
  {
    slug: "cop-30-mocambique",
    category: "economia",
    title: "COP 30: o que está em jogo para Moçambique",
    excerpt:
      "Da agenda climática à transição energética, os pontos críticos da Conferência das Partes que mais afectam o tecido económico nacional.",
    body: [
      "A próxima edição da Conferência das Partes das Nações Unidas para as alterações climáticas reúne mais de 190 países em torno de uma agenda cada vez mais inseparável das decisões económicas nacionais.",
      "Para Moçambique, com exposição directa a fenómenos climáticos extremos e uma economia ainda dependente de exportação de matérias-primas, o que sai destas negociações influencia tudo, do crédito ao desenvolvimento até ao preço dos seguros agrícolas.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3AzMCUyMGNsaW1hdGUlMjBjb25mZXJlbmNlJTIwYnJhemlsfGVufDF8fHx8MTc3NTY1MjM0MHww&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Henrique Mucavele", role: "Editor de Economia" },
    publishedAt: "2026-02-14",
    readTime: 4,
    tags: ["COP30", "clima", "política económica"],
  },
  {
    slug: "data-centers-africa",
    category: "inovacao-tecnologia",
    title:
      "Bilionário indiano aposta US$ 1 bilhão em expansão de data centers",
    excerpt:
      "O movimento confirma a tendência: a próxima vaga de infra-estrutura crítica vai jogar-se na nuvem.",
    body: [
      "A infraestrutura digital é a nova electricidade. Os anúncios de investimento em data centers no continente africano não param de se acumular — e desta vez vêm com cheques de nove dígitos.",
      "O que isto significa, na prática, para as PME moçambicanas: latência menor, custos de cloud mais baixos a médio prazo e — finalmente — uma alternativa real aos fornecedores europeus.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZGF0YSUyMGNlbnRlciUyMHNlcnZlcnN8ZW58MXx8fHwxNzc1NjUyMzQzfDA&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Carlos Bila", role: "Tecnologia" },
    publishedAt: "2026-03-02",
    readTime: 3,
    tags: ["tecnologia", "cloud", "investimento"],
  },
  {
    slug: "10-mais-ricos-mundo-abril-2026",
    category: "opiniao",
    title: "As 10 pessoas mais ricas do mundo em Abril de 2026",
    excerpt:
      "Quem entrou, quem saiu e o que isto diz sobre a concentração de capital global.",
    body: [
      "A lista actualizada confirma a tendência da última década: o capital concentra-se cada vez mais em torno de fundadores de plataformas tecnológicas e proprietários de infra-estrutura energética.",
      "Mais interessante do que as posições é o que mudou: três novos nomes ligados à inteligência artificial entraram pela primeira vez no top 10.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNoZXN0JTIwcGVvcGxlJTIwYmlsbGlvbmFpcmVzJTIwd29ybGR8ZW58MXx8fHwxNzc1NjUyMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Equipa Chiveve", role: "Redacção" },
    publishedAt: "2026-04-08",
    readTime: 4,
    tags: ["opinião", "riqueza global"],
  },
  {
    slug: "forbes-mulheres-mais-poderosas-2026",
    category: "lideranca",
    title: "Homenageadas da Forbes Mulheres Mais Poderosas 2026",
    excerpt:
      "A lista reúne executivas, fundadoras e líderes da sociedade civil — e tem cada vez mais nomes africanos.",
    body: [
      "A edição de 2026 traz uma novidade silenciosa mas significativa: quatro nomes africanos no top 50, número inédito desde que a lista existe.",
      "Entre elas, duas moçambicanas. Ambas referem o mesmo nome quando perguntadas por mentores: uma professora do ensino secundário em Inhambane.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWFuJTIwcHJvZmVzc2lvbmFsJTIwbGVhZGVyfGVufDF8fHx8MTc3NTY1MjM0OHww&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Inês Massingue", role: "Jornalista" },
    publishedAt: "2026-05-20",
    readTime: 5,
    tags: ["liderança feminina", "Forbes"],
  },
  {
    slug: "mercado-trabalho-fed-2026",
    category: "economia",
    title: "Mercado de trabalho aquecido desafia projecções do Fed para 2026",
    excerpt:
      "A Reserva Federal dos EUA pode ter de rever em alta a sua trajectória de juros — com efeitos directos nas economias emergentes.",
    body: [
      "Os dados de emprego norte-americano voltaram a surpreender pela resiliência, num movimento que coloca pressão renovada sobre o Federal Reserve.",
      "Para mercados emergentes, incluindo Moçambique, a leitura é dupla: dólar mais forte, mas também procura externa mais sustentada.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3JrJTIwYnVzaW5lc3MlMjBtZWV0aW5nfGVufDF8fHx8MTc3NTY1MjM0N3ww&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Henrique Mucavele", role: "Editor de Economia" },
    publishedAt: "2026-05-29",
    readTime: 4,
    tags: ["Fed", "macroeconomia"],
  },
  {
    slug: "analise-credito-rural-600-bilhoes",
    category: "analise",
    title: "Bancos assumem fiscalização de desmatamento em crédito rural",
    excerpt:
      "Mudança regulatória redesenha a relação entre o sistema financeiro e a agropecuária — e o modelo já está a ser estudado por reguladores africanos.",
    body: [
      "A decisão transfere para os bancos parte da responsabilidade de garantir que linhas de crédito agrícolas não financiem desmatamento.",
      "O modelo é observado de perto por reguladores moçambicanos, que estudam aplicar mecanismo semelhante ao crédito agrário concedido em zonas de fronteira ambiental.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzaWxpYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm18ZW58MXx8fHwxNzc1NjUyMzM5fDA&ixlib=rb-4.1.0&q=80&w=1600",
    author: { name: "Carlos Bila", role: "Análise" },
    publishedAt: "2026-06-01",
    readTime: 6,
    tags: ["análise", "crédito", "sustentabilidade"],
  },
];

export function getArticleBySlug(
  category: string,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getRelatedArticles(article: Article, n = 3): Article[] {
  return articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aSame = a.category === article.category ? 1 : 0;
      const bSame = b.category === article.category ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, n);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}
