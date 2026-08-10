#!/usr/bin/env tsx
/**
 * Seed 6 sample WP posts across different categories so the /artigos
 * layout (2 large featured + grid) has real content to demo. Pulls
 * featured images from Unsplash and uploads them to WP media via the
 * helpers in wp-write.ts.
 *
 *   pnpm tsx scripts/seed-articles.ts
 *
 * Idempotent? No. Running it twice creates 12 posts. Use
 * `pnpm tsx scripts/wp-write.ts post delete <id>` to roll back.
 */

import { uploadMediaFromUrl, wpFetch } from "./wp-write";

// Category IDs from the previous WordPress instance; resolve by slug before reuse.
const CATEGORIES = {
  economia: 6,
  empreendedorismo: 7,
  inovacao: 9,
  lideranca: 10,
  analise: 11,
  entrevistas: 13,
} as const;

type SeedArticle = {
  title: string;
  slug: string;
  category: number;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
};

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600&q=80`;

const articles: SeedArticle[] = [
  {
    title:
      "Banco de Moçambique mantém taxa de juro de referência em 12,75%",
    slug: "banco-mocambique-taxa-referencia-junho-2026",
    category: CATEGORIES.economia,
    excerpt:
      "O Comité de Política Monetária optou pela cautela face à inflação subjacente e à pressão cambial sobre o metical.",
    content: `
<p>O Banco de Moçambique decidiu manter a taxa de juro de política monetária (MIMO) em 12,75% na reunião desta semana do Comité de Política Monetária. A decisão foi tomada num contexto de inflação homóloga em torno de 4,8% e pressões persistentes sobre o metical face ao dólar norte-americano.</p>
<p>No comunicado divulgado em Maputo, o regulador justifica a postura cautelosa com a "necessidade de ancorar as expectativas de inflação a médio prazo" e com a evolução incerta dos preços internacionais de combustíveis e cereais — duas rubricas que pesam sobre o cabaz alimentar moçambicano.</p>
<p>Para o sector privado, em particular as PME que dependem de crédito bancário, a decisão significa que o custo do dinheiro continua elevado por mais um trimestre. Analistas auscultados pela Chiveve apontam que só um abrandamento sustentado da inflação subjacente poderá abrir espaço para cortes ainda em 2026.</p>
<p>O próximo encontro do Comité está agendado para Setembro. Até lá, atenções voltam-se para os dados de inflação de Julho e Agosto e para o comportamento das reservas internacionais.</p>
`,
    imageUrl: UNSPLASH("photo-1567427017947-545c5f8d16ad"),
    imageAlt: "Fachada de instituição bancária com colunas clássicas",
  },
  {
    title: "Startup moçambicana lança carteira digital para PMEs",
    slug: "startup-carteira-digital-pmes-2026",
    category: CATEGORIES.empreendedorismo,
    excerpt:
      "A Mwana Pay quer simplificar pagamentos B2B e folhas salariais para pequenos negócios em Maputo, Beira e Nampula.",
    content: `
<p>Fundada em 2024 por três engenheiros formados na Universidade Eduardo Mondlane, a Mwana Pay anunciou esta semana o lançamento oficial da sua carteira digital orientada a PMEs. A solução permite pagamentos entre empresas, processamento de salários e conciliação automática com contas bancárias locais.</p>
<p>"Encontrámos um sector enorme — micro e pequenas empresas — a operar quase exclusivamente em dinheiro, com perdas de tempo e risco operacional significativos. O nosso produto é construído para essa realidade", afirmou Isabel Mateus, CEO da startup, em entrevista à Chiveve.</p>
<p>A empresa fechou recentemente uma ronda <em>seed</em> de USD 750 mil liderada por um fundo regional, com participação de <em>angel investors</em> moçambicanos. O capital será usado para expansão para Beira e Nampula até ao final do ano e para certificação pelo Banco de Moçambique como instituição de moeda electrónica.</p>
<p>O mercado moçambicano de pagamentos digitais tem crescido a dois dígitos ao ano, impulsionado por M-Pesa e e-Mola, mas o segmento B2B mantém-se largamente subatendido.</p>
`,
    imageUrl: UNSPLASH("photo-1556742400-b5b7c5121f6d"),
    imageAlt: "Mãos a usar smartphone para fazer pagamento digital",
  },
  {
    title:
      "5G chega a Maputo: o que muda para empresas e consumidores",
    slug: "5g-maputo-empresas-consumidores",
    category: CATEGORIES.inovacao,
    excerpt:
      "A Tmcel e a Vodacom activaram esta semana as primeiras células 5G na capital. Cobertura inicial cobre o centro e a Sommerschield.",
    content: `
<p>O lançamento comercial da rede 5G em Maputo, anunciado conjuntamente pela Tmcel e pela Vodacom Moçambique, marca o arranque oficial da próxima geração de redes móveis no país. A cobertura inicial abrange os bairros centrais e a zona da Sommerschield, com expansão prevista para Matola, Beira e Nampula até final de 2027.</p>
<p>Para os consumidores, a promessa é velocidade de descarga até dez vezes superior à 4G actual e latência muito mais baixa, abrindo caminho a serviços de <em>streaming</em> em alta definição e a aplicações de realidade aumentada. Para as empresas, o impacto mais relevante deve ser sentido na automação industrial, logística e na ligação de equipamentos IoT em estaleiros e portos.</p>
<p>O INCM, regulador do sector, atribuiu as licenças de espectro 5G em Dezembro de 2025 num leilão que arrecadou MZN 4,2 mil milhões para os cofres do Estado. As operadoras comprometeram-se com metas de cobertura nacional faseadas até 2030.</p>
<p>O preço dos planos de dados 5G ainda não foi divulgado em detalhe, mas as duas operadoras antecipam tarifários inicialmente <em>premium</em>, alinhados com a média regional da África Austral.</p>
`,
    imageUrl: UNSPLASH("photo-1611605698335-8b1569810432"),
    imageAlt: "Torre de telecomunicações com antenas contra céu azul",
  },
  {
    title:
      "Cinco lições de liderança para gestores em mercados emergentes",
    slug: "cinco-licoes-lideranca-mercados-emergentes",
    category: CATEGORIES.lideranca,
    excerpt:
      "Da gestão de talento sob restrição cambial à navegação política — o que aprendemos com 20 entrevistas a CEOs em África Austral.",
    content: `
<p>Liderar em mercados emergentes exige um conjunto de competências raramente abordado nas escolas de negócios tradicionais. Ao longo dos últimos seis meses, a Revista Chiveve conduziu mais de 20 conversas com CEOs em Moçambique, África do Sul, Zâmbia e Tanzânia. Cinco lições emergiram com particular consistência.</p>
<p><strong>1. Construir <em>cash buffers</em> defensivos.</strong> Volatilidade cambial e atrasos em pagamentos públicos tornam a liquidez um activo estratégico, não apenas operacional. CEOs entrevistados mantêm em média 90 a 120 dias de despesas operacionais em caixa.</p>
<p><strong>2. Investir em formação interna.</strong> Com fuga de talento qualificado para o exterior, as empresas que prosperam são as que constroem pipelines de talento de raiz. Programas de mentoria estruturada aparecem em quase todas as organizações de referência.</p>
<p><strong>3. Profissionalizar a relação com o regulador.</strong> Ter equipas dedicadas a <em>compliance</em> e a relações institucionais deixou de ser opcional. A previsibilidade regulatória continua baixa e exige presença activa.</p>
<p><strong>4. Diversificar mercados.</strong> Quem opera em mais do que uma geografia mostra-se mais resiliente a choques locais — políticos, climáticos ou cambiais.</p>
<p><strong>5. Comunicação directa com as equipas.</strong> Em ambientes de incerteza, o silêncio executivo gera rumores. Os líderes mais eficazes comunicam semanalmente, mesmo quando não há novidades a partilhar.</p>
`,
    imageUrl: UNSPLASH("photo-1573497019418-b400bb3ab074"),
    imageAlt: "Executiva africana a liderar reunião de equipa em sala de conferências",
  },
  {
    title:
      "Logística portuária da Beira: gargalos e oportunidades",
    slug: "logistica-porto-beira-gargalos-oportunidades",
    category: CATEGORIES.analise,
    excerpt:
      "O Porto da Beira movimenta cerca de 12 milhões de toneladas anuais e serve a região central. Modernização tem ritmo aquém do esperado.",
    content: `
<p>O Porto da Beira é, depois de Maputo, o principal nó logístico de Moçambique e a porta de saída natural para o Zimbabwe, Malawi, Zâmbia e República Democrática do Congo. Movimenta cerca de 12 milhões de toneladas de carga por ano, dos quais aproximadamente 60% em trânsito para países vizinhos.</p>
<p>Apesar do papel estratégico, a competitividade do porto tem sido pressionada por congestionamento crónico, tempos de espera elevados para descarga e infra-estrutura ferroviária que não acompanha o ritmo da procura. Operadores logísticos consultados pela Chiveve apontam para tempos de <em>turnaround</em> ainda 30% acima da média de portos comparáveis na África do Sul.</p>
<p>O plano de modernização aprovado em 2023 prevê investimento superior a USD 350 milhões em dragagens, novos cais de contentores e melhorias no Corredor da Beira (linha férrea Beira-Machipanda). A execução, contudo, tem avançado a ritmo aquém do esperado, com partes substanciais ainda em fase de procurement.</p>
<p>O recente interesse de operadores asiáticos no segmento de carga geral pode mudar a equação. Há também espaço claro para crescimento no contentorizado, especialmente com a recuperação económica do Zimbabwe e a expansão mineira na Zâmbia.</p>
`,
    imageUrl: UNSPLASH("photo-1577416412292-747c6607f055"),
    imageAlt: "Gruas portuárias a operar sobre navio de contentores ao pôr-do-sol",
  },
  {
    title:
      "Entrevista: o futuro do agronegócio moçambicano",
    slug: "entrevista-futuro-agronegocio-mocambicano",
    category: CATEGORIES.entrevistas,
    excerpt:
      "Conversa com Helena Cossa, fundadora da Tsalala Agro, sobre processamento local, exportação e o desafio da electrificação rural.",
    content: `
<p>Helena Cossa fundou a Tsalala Agro em 2018, em Chimoio, com a missão de transformar produção agrícola local — sobretudo milho, soja e amendoim — em produtos processados com valor acrescentado. Sete anos depois, a empresa emprega mais de 180 pessoas e exporta para o Malawi e o Zimbabwe. Conversámos com ela na nova unidade de processamento de Manica.</p>
<p><strong>Chiveve:</strong> Onde está hoje o agronegócio moçambicano e onde devia estar?</p>
<p><strong>Helena Cossa:</strong> Estamos a anos-luz do nosso potencial. Temos terra, temos água, temos clima. O que ainda não temos é estrutura de processamento à escala. Continuamos a exportar matéria-prima e a importar produto acabado da mesma matéria. Esse é o erro estratégico fundamental.</p>
<p><strong>Chiveve:</strong> Qual o maior gargalo no dia-a-dia?</p>
<p><strong>Helena Cossa:</strong> Sem dúvida a electrificação rural. Conseguimos negociar com bancos, com a EDM, com cadeias logísticas — mas se a unidade industrial não tem energia estável, nada disto importa. Investimos quase 18% do CAPEX inicial em geração própria, e isso devia ser excepção, não regra.</p>
<p><strong>Chiveve:</strong> Mensagem final para jovens que pensam em entrar no sector?</p>
<p><strong>Helena Cossa:</strong> O agronegócio precisa de menos romantismo e mais engenharia. Quem entrar a pensar que vai mudar o país sozinho desiste no segundo ano. Quem entrar com um plano de negócios sério, com paciência para sete a dez anos, vai construir empresas extraordinárias.</p>
`,
    imageUrl: UNSPLASH("photo-1625246333195-78d9c38ad449"),
    imageAlt: "Mãos de agricultor a segurar grãos numa plantação",
  },
];

async function main() {
  console.log(`seeding ${articles.length} articles…\n`);

  let okCount = 0;
  for (const a of articles) {
    try {
      console.log(`→ ${a.title}`);
      const mediaId = await uploadMediaFromUrl(
        a.imageUrl,
        `${a.slug}.jpg`,
        a.imageAlt,
      );
      console.log(`  media id=${mediaId}`);
      const r = (await wpFetch("POST", "/posts", {
        title: a.title,
        slug: a.slug,
        content: a.content.trim(),
        excerpt: a.excerpt,
        categories: [a.category],
        featured_media: mediaId,
        status: "publish",
      })) as { id: number; slug: string; link: string };
      console.log(`  post id=${r.id} ${r.link}\n`);
      okCount += 1;
    } catch (e) {
      console.error(`  FAILED: ${e instanceof Error ? e.message : e}\n`);
    }
  }

  console.log(`done: ${okCount}/${articles.length} created`);
  if (okCount < articles.length) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
