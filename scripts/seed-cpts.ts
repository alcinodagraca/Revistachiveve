#!/usr/bin/env tsx
/**
 * Seed sample WP content for the three writable CPTs so the /eventos,
 * /concursos-publicos and /contactos-uteis layouts can be judged with
 * real data. Featured images are pulled from Unsplash and uploaded to
 * WP media via the helpers in wp-write.ts.
 *
 *   pnpm tsx scripts/seed-cpts.ts
 *
 * Not idempotent for content (rerunning duplicates events/tenders/contacts);
 * IS idempotent for the contacto-categoria taxonomy terms (slug-first GET).
 * Rollback any unwanted entry with `wp-write.ts <kind> delete <id>`.
 */

import { uploadMediaFromUrl, wpFetch } from "./wp-write";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600&q=80`;

// ---------------------------------------------------------------------------
// Block 1 — Events (5)
// ---------------------------------------------------------------------------

type SeedEvent = {
  title: string;
  slug: string;
  content: string;
  data_do_evento: string;
  local_do_evento: string;
  preco_do_evento: string;
  organizador: string;
  link_do_evento: string;
  imageUrl: string;
  imageAlt: string;
};

const events: SeedEvent[] = [
  {
    title: "Fórum de Empreendedorismo — Maputo 2026",
    slug: "forum-empreendedorismo-maputo-2026",
    content: `
<p>O maior encontro de empreendedores do país regressa à capital com painéis sobre financiamento, internacionalização e construção de marca. Esperam-se mais de 800 participantes ao longo de dois dias.</p>
<p>Entre os oradores confirmados estão fundadores de startups regionais, parceiros institucionais e responsáveis por programas de aceleração. Há sessões dedicadas a captação de capital, internacionalização para SADC e gestão de equipas em fase de crescimento.</p>
<p>A inscrição inclui acesso aos painéis, almoço de <em>networking</em> e à sessão de <em>pitching</em> da edição deste ano.</p>
`,
    data_do_evento: "2026-09-15",
    local_do_evento: "Centro de Conferências Joaquim Chissano, Maputo",
    preco_do_evento: "MZN 2.500",
    organizador: "Revista Chiveve",
    link_do_evento: "https://example.com/inscrever/forum-empreendedorismo",
    imageUrl: UNSPLASH("photo-1540575467063-178a50c2df87"),
    imageAlt: "Plateia atenta durante painel de conferência empresarial",
  },
  {
    title: "Summit de Negócios e Inovação — Beira",
    slug: "summit-negocios-inovacao-beira",
    content: `
<p>Encontro focado em inovação aplicada a sectores tradicionais — agricultura, logística portuária e energia. A edição da Beira reúne empresas regionais e parceiros do Corredor da Beira.</p>
<p>Painéis sobre digitalização de cadeias de valor, automação no porto e parcerias entre PME e grandes operadores anchoram a agenda.</p>
<p>Inclui visita guiada ao Porto da Beira e sessão de fecho com investidores da região.</p>
`,
    data_do_evento: "2026-10-22",
    local_do_evento: "Hotel Tivoli, Beira",
    preco_do_evento: "MZN 1.800",
    organizador: "Câmara de Comércio de Sofala",
    link_do_evento: "https://example.com/inscrever/summit-beira",
    imageUrl: UNSPLASH("photo-1577416412292-747c6607f055"),
    imageAlt: "Gruas portuárias a operar ao pôr-do-sol",
  },
  {
    title: "Conferência de Liderança Feminina nos Negócios",
    slug: "conferencia-lideranca-feminina-2026",
    content: `
<p>Um dia intensivo com mentoras seniores e exercícios práticos sobre negociação, gestão de equipas e construção de presença executiva. Aberto a quadros médios e séniores em ascensão de carreira.</p>
<p>Programa inclui keynote de abertura, três <em>workshops</em> paralelos e jantar de <em>networking</em>.</p>
<p>Lugares limitados; inscrição com prazo até 10 de Novembro.</p>
`,
    data_do_evento: "2026-11-05",
    local_do_evento: "Polana Serena Hotel, Maputo",
    preco_do_evento: "MZN 3.200",
    organizador: "Rede Feminina de Líderes",
    link_do_evento: "https://example.com/inscrever/lideranca-feminina",
    imageUrl: UNSPLASH("photo-1573497019418-b400bb3ab074"),
    imageAlt: "Executiva africana a liderar reunião de equipa",
  },
  {
    title: "Tech Africa: Soluções Digitais para PME",
    slug: "tech-africa-pme-nampula",
    content: `
<p>Conferência prática para gestores de PME que querem entender o que cabe — e o que não cabe — no orçamento digital deste ano. Casos reais, demonstrações ao vivo e oficinas de implementação.</p>
<p>Tópicos: ERP para pequenos negócios, pagamentos digitais, presença online, automação de marketing e gestão financeira.</p>
<p>Inclui sessão de diagnóstico individual com consultores parceiros.</p>
`,
    data_do_evento: "2026-11-19",
    local_do_evento: "Universidade Lúrio, Nampula",
    preco_do_evento: "MZN 1.200",
    organizador: "Universidade Lúrio · Revista Chiveve",
    link_do_evento: "https://example.com/inscrever/tech-africa-nampula",
    imageUrl: UNSPLASH("photo-1611605698335-8b1569810432"),
    imageAlt: "Torre de telecomunicações com antenas contra céu azul",
  },
  {
    title: "Encontro Anual de Investidores — Maputo 2026",
    slug: "encontro-anual-investidores-maputo-2026",
    content: `
<p>Reunião anual que apresenta o panorama macroeconómico de Moçambique para o ano seguinte e analisa as oportunidades sectoriais com maior tracção.</p>
<p>Apresentações de bancos de investimento, fundos regionais e da Bolsa de Valores de Moçambique. Espaço dedicado a <em>matchmaking</em> entre investidores e empresas em ronda de capital.</p>
<p>Evento <em>by invitation</em>; pedidos de credenciação avaliados caso a caso.</p>
`,
    data_do_evento: "2026-12-03",
    local_do_evento: "Centro de Conferências Joaquim Chissano, Maputo",
    preco_do_evento: "Por convite",
    organizador: "Bolsa de Valores de Moçambique",
    link_do_evento: "https://example.com/credenciacao/investidores-2026",
    imageUrl: UNSPLASH("photo-1559526324-593bc073d938"),
    imageAlt: "Sala de reuniões executiva com mesa redonda",
  },
];

// ---------------------------------------------------------------------------
// Block 2 — Tenders (4)
// ---------------------------------------------------------------------------

type SeedTender = {
  title: string;
  slug: string;
  content: string;
  instituicao: string;
  data_limite_de_submissao: string;
  numero_de_vagas: number;
  link_do_concurso: string;
};

const tenders: SeedTender[] = [
  {
    title: "Assistente Administrativo (5 vagas)",
    slug: "concurso-mef-assistente-administrativo-2026",
    content: `
<p>O Ministério das Finanças abre concurso público para preenchimento de cinco (5) vagas de Assistente Administrativo na sede em Maputo.</p>
<p>Requisitos mínimos: 12.ª classe concluída, conhecimentos de informática na óptica do utilizador, fluência em português escrito e falado.</p>
<p>Candidaturas presenciais ou via portal do concurso até à data limite indicada. Consultar o edital completo para detalhes sobre documentação exigida e etapas do processo.</p>
`,
    instituicao: "Ministério das Finanças",
    data_limite_de_submissao: "2026-08-30",
    numero_de_vagas: 5,
    link_do_concurso: "https://example.com/editais/mef-2026-001.pdf",
  },
  {
    title: "Gestor de Projectos (2 vagas)",
    slug: "concurso-banco-mocambique-gestor-projectos-2026",
    content: `
<p>O Banco de Moçambique procura dois (2) Gestores de Projectos para integrar o Departamento de Sistemas e Tecnologia.</p>
<p>Perfil: licenciatura em Gestão, Engenharia ou áreas afins, certificação PMP/Prince2 valorizada, mínimo de 5 anos de experiência em gestão de projectos no sector financeiro.</p>
<p>Concurso limitado; envio de candidaturas exclusivamente através do portal de recursos humanos do BdM.</p>
`,
    instituicao: "Banco de Moçambique",
    data_limite_de_submissao: "2026-09-15",
    numero_de_vagas: 2,
    link_do_concurso: "https://example.com/editais/bdm-2026-projectos.pdf",
  },
  {
    title: "Analista de Sistemas (3 vagas)",
    slug: "concurso-ine-analista-sistemas-2026",
    content: `
<p>O Instituto Nacional de Estatística abre três (3) vagas para Analista de Sistemas para reforço da equipa de TI, com foco em modernização das plataformas de recolha e disseminação de dados.</p>
<p>Requisitos: licenciatura em Engenharia Informática ou Sistemas de Informação, experiência com SQL, Linux e <em>frameworks</em> web modernos.</p>
<p>Processo inclui prova técnica e entrevista final com o painel.</p>
`,
    instituicao: "Instituto Nacional de Estatística",
    data_limite_de_submissao: "2026-09-25",
    numero_de_vagas: 3,
    link_do_concurso: "https://example.com/editais/ine-2026-sistemas.pdf",
  },
  {
    title: "Economista Sénior (4 vagas)",
    slug: "concurso-at-economista-senior-2026",
    content: `
<p>A Autoridade Tributária de Moçambique abre concurso público para Economista Sénior, com colocação em Maputo, Beira, Nampula e Tete.</p>
<p>Mínimo de 7 anos de experiência relevante. Mestrado em Economia, Finanças Públicas ou áreas afins constitui factor preferencial.</p>
<p>Documentação completa disponível no portal da AT. Entrevistas previstas para meados de Outubro.</p>
`,
    instituicao: "Autoridade Tributária de Moçambique",
    data_limite_de_submissao: "2026-10-10",
    numero_de_vagas: 4,
    link_do_concurso: "https://example.com/editais/at-2026-economista.pdf",
  },
];

// ---------------------------------------------------------------------------
// Block 3 — Contacts (10) + 4 category terms
// ---------------------------------------------------------------------------

type SeedTermDef = { name: string; slug: string };
const categoryDefs: SeedTermDef[] = [
  { name: "Instituições Financeiras", slug: "instituicoes-financeiras" },
  { name: "Associações Empresariais", slug: "associacoes-empresariais" },
  { name: "Entidades Governamentais", slug: "entidades-governamentais" },
  { name: "Tecnologia e Inovação", slug: "tecnologia-e-inovacao" },
];

type SeedContact = {
  title: string;
  slug: string;
  categorySlug: string;
  telefone: string;
  email: string;
  website: string;
  descricao: string;
  imageUrl: string;
  imageAlt: string;
};

const contacts: SeedContact[] = [
  {
    title: "Banco de Moçambique",
    slug: "banco-de-mocambique",
    categorySlug: "instituicoes-financeiras",
    telefone: "+258 21 354 500",
    email: "info@bancomoc.mz",
    website: "https://www.bancomoc.mz",
    descricao: "Banco Central de Moçambique",
    imageUrl: UNSPLASH("photo-1567427017947-545c5f8d16ad"),
    imageAlt: "Fachada do Banco de Moçambique",
  },
  {
    title: "BCI - Banco Comercial e de Investimentos",
    slug: "bci-banco-comercial-investimentos",
    categorySlug: "instituicoes-financeiras",
    telefone: "+258 21 322 100",
    email: "contacto@bci.co.mz",
    website: "https://www.bci.co.mz",
    descricao: "Banco comercial líder em Moçambique",
    imageUrl: UNSPLASH("photo-1641155049992-8cba3e42f632"),
    imageAlt: "Edifício corporativo do BCI",
  },
  {
    title: "Standard Bank Moçambique",
    slug: "standard-bank-mocambique",
    categorySlug: "instituicoes-financeiras",
    telefone: "+258 21 352 500",
    email: "info@standardbank.co.mz",
    website: "https://www.standardbank.co.mz",
    descricao: "Soluções financeiras integradas",
    imageUrl: UNSPLASH("photo-1761383224726-67e375a6fd88"),
    imageAlt: "Logótipo do Standard Bank",
  },
  {
    title: "CTA - Confederação das Associações Económicas",
    slug: "cta-confederacao-associacoes-economicas",
    categorySlug: "associacoes-empresariais",
    telefone: "+258 21 493 181",
    email: "cta@cta.org.mz",
    website: "https://www.cta.org.mz",
    descricao: "Confederação de associações económicas de Moçambique",
    imageUrl: UNSPLASH("photo-1774195044152-19c8c002bb6a"),
    imageAlt: "Edifício da CTA em Maputo",
  },
  {
    title: "AIMO - Associação Industrial de Moçambique",
    slug: "aimo-associacao-industrial-mocambique",
    categorySlug: "associacoes-empresariais",
    telefone: "+258 21 352 670",
    email: "aimo@aimo.co.mz",
    website: "https://www.aimo.co.mz",
    descricao: "Representação do sector industrial moçambicano",
    imageUrl: UNSPLASH("photo-1641155049992-8cba3e42f632"),
    imageAlt: "Edifício corporativo da AIMO",
  },
  {
    title: "ACIS - Associação de Comércio e Indústria",
    slug: "acis-associacao-comercio-industria",
    categorySlug: "associacoes-empresariais",
    telefone: "+258 21 491 970",
    email: "acis@acismoz.com",
    website: "https://www.acismoz.com",
    descricao: "Promoção do comércio e indústria de Sofala",
    imageUrl: UNSPLASH("photo-1774195044152-19c8c002bb6a"),
    imageAlt: "Sede da ACIS na Beira",
  },
  {
    title: "Ministério da Economia e Finanças",
    slug: "ministerio-economia-financas",
    categorySlug: "entidades-governamentais",
    telefone: "+258 21 354 300",
    email: "mef@mef.gov.mz",
    website: "https://www.mef.gov.mz",
    descricao: "Gestão económica e financeira do país",
    imageUrl: UNSPLASH("photo-1636217424491-ff7393fe73fd"),
    imageAlt: "Edifício governamental",
  },
  {
    title: "APIEX - Agência de Promoção de Investimentos",
    slug: "apiex-agencia-promocao-investimentos",
    categorySlug: "entidades-governamentais",
    telefone: "+258 21 313 420",
    email: "info@apiex.gov.mz",
    website: "https://www.apiex.gov.mz",
    descricao: "Promoção e facilitação de investimentos em Moçambique",
    imageUrl: UNSPLASH("photo-1636217424491-ff7393fe73fd"),
    imageAlt: "Edifício institucional da APIEX",
  },
  {
    title: "Centro de Inovação do Maputo",
    slug: "centro-inovacao-maputo",
    categorySlug: "tecnologia-e-inovacao",
    telefone: "+258 21 325 800",
    email: "info@cimap.co.mz",
    website: "https://www.cimap.co.mz",
    descricao: "Hub de inovação e tecnologia em Maputo",
    imageUrl: UNSPLASH("photo-1764123108291-0f48d2c7e563"),
    imageAlt: "Espaço de coworking tecnológico",
  },
  {
    title: "TechHub Moçambique",
    slug: "techhub-mocambique",
    categorySlug: "tecnologia-e-inovacao",
    telefone: "+258 84 555 1234",
    email: "hello@techhub.mz",
    website: "https://www.techhub.mz",
    descricao: "Espaço para startups e empreendedores tech",
    imageUrl: UNSPLASH("photo-1764123108291-0f48d2c7e563"),
    imageAlt: "Sala de inovação tecnológica",
  },
];

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

type Wrapped<T> = { ok: number; total: number; created: T[] };

async function ensureCategoryTerm(def: SeedTermDef): Promise<number> {
  const existing = (await wpFetch(
    "GET",
    `/contacto-categoria?slug=${encodeURIComponent(def.slug)}&per_page=1`,
  )) as Array<{ id: number; slug: string }>;
  if (existing.length > 0) {
    console.log(`  · term "${def.name}" exists (id=${existing[0].id})`);
    return existing[0].id;
  }
  const created = (await wpFetch("POST", "/contacto-categoria", {
    name: def.name,
    slug: def.slug,
  })) as { id: number };
  console.log(`  · created term "${def.name}" id=${created.id}`);
  return created.id;
}

async function seedEvents(): Promise<Wrapped<number>> {
  console.log(`\n=== Events (${events.length}) ===`);
  const created: number[] = [];
  for (const e of events) {
    try {
      console.log(`→ ${e.title}`);
      const mediaId = await uploadMediaFromUrl(
        e.imageUrl,
        `${e.slug}.jpg`,
        e.imageAlt,
      );
      const r = (await wpFetch("POST", "/eventos", {
        title: e.title,
        slug: e.slug,
        content: e.content.trim(),
        status: "publish",
        featured_media: mediaId,
        acf: {
          data_do_evento: e.data_do_evento,
          local_do_evento: e.local_do_evento,
          preco_do_evento: e.preco_do_evento,
          organizador: e.organizador,
          link_do_evento: e.link_do_evento,
        },
      })) as { id: number; link: string };
      console.log(`  ok id=${r.id} ${r.link}`);
      created.push(r.id);
    } catch (err) {
      console.error(`  FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }
  return { ok: created.length, total: events.length, created };
}

async function seedTenders(): Promise<Wrapped<number>> {
  console.log(`\n=== Tenders (${tenders.length}) ===`);
  const created: number[] = [];
  for (const t of tenders) {
    try {
      console.log(`→ ${t.title}`);
      const r = (await wpFetch("POST", "/concurso", {
        title: t.title,
        slug: t.slug,
        content: t.content.trim(),
        status: "publish",
        acf: {
          instituicao: t.instituicao,
          data_limite_de_submissao: t.data_limite_de_submissao,
          numero_de_vagas: t.numero_de_vagas,
          link_do_concurso: t.link_do_concurso,
        },
      })) as { id: number; link: string };
      console.log(`  ok id=${r.id} ${r.link}`);
      created.push(r.id);
    } catch (err) {
      console.error(`  FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }
  return { ok: created.length, total: tenders.length, created };
}

async function seedContacts(): Promise<Wrapped<number>> {
  console.log(`\n=== Contact categories (${categoryDefs.length}) ===`);
  const termIdBySlug = new Map<string, number>();
  for (const def of categoryDefs) {
    try {
      const id = await ensureCategoryTerm(def);
      termIdBySlug.set(def.slug, id);
    } catch (err) {
      console.error(
        `  FAILED term ${def.slug}: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  console.log(`\n=== Contacts (${contacts.length}) ===`);
  const created: number[] = [];
  for (const c of contacts) {
    try {
      console.log(`→ ${c.title}`);
      const termId = termIdBySlug.get(c.categorySlug);
      const mediaId = await uploadMediaFromUrl(
        c.imageUrl,
        `${c.slug}.jpg`,
        c.imageAlt,
      );
      const r = (await wpFetch("POST", "/contacto-util", {
        title: c.title,
        slug: c.slug,
        status: "publish",
        featured_media: mediaId,
        ...(termId ? { "contacto-categoria": [termId] } : {}),
        acf: {
          telefone: c.telefone,
          email: c.email,
          website: c.website,
          descricao: c.descricao,
        },
      })) as { id: number; link: string };
      console.log(`  ok id=${r.id} ${r.link}`);
      created.push(r.id);
    } catch (err) {
      console.error(`  FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }
  return { ok: created.length, total: contacts.length, created };
}

async function main() {
  const e = await seedEvents();
  const t = await seedTenders();
  const c = await seedContacts();

  console.log("\n=== Summary ===");
  console.log(`events:   ${e.ok}/${e.total}`);
  console.log(`tenders:  ${t.ok}/${t.total}`);
  console.log(`contacts: ${c.ok}/${c.total}`);

  const failed =
    e.total - e.ok + (t.total - t.ok) + (c.total - c.ok);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
