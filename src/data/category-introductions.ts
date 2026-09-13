type CategoryWithDescription = {
  slug: string;
  description?: string;
};

const CATEGORY_INTRODUCTIONS: Record<string, string> = {
  empresas:
    "Histórias, decisões, estratégias e movimentos de empresas que ajudam a compreender o tecido empresarial moçambicano.",
  "negocios-e-empresas":
    "Histórias, decisões, estratégias e movimentos de empresas que ajudam a compreender o tecido empresarial moçambicano.",
  empreendedorismo:
    "Percursos de empreendedores, pequenos negócios, marcas emergentes, iniciativas locais e experiências de criação de valor.",
  economia:
    "Leituras sobre preços, consumo, emprego, investimento, comércio, transportes, logística e factores que afectam empresas e consumidores.",
  "economia-e-mercado":
    "Leituras sobre preços, consumo, emprego, investimento, comércio, transportes, logística e factores que afectam empresas e consumidores.",
  lideranca:
    "Perfis, entrevistas e reflexões sobre gestão, associativismo empresarial, tomada de decisão e liderança institucional.",
  "inovacao-tecnologia":
    "Conteúdos sobre transformação digital, soluções tecnológicas, novos modelos de negócio, produtividade e tendências digitais.",
  "inovacao-e-tecnologia":
    "Conteúdos sobre transformação digital, soluções tecnológicas, novos modelos de negócio, produtividade e tendências digitais.",
  "sustentabilidade-e-desenvolvimento":
    "Temas ligados ao ambiente, inclusão, responsabilidade social, desenvolvimento local, financiamento e impacto económico.",
  opiniao:
    "Textos de reflexão, análise crítica e leitura de contexto sobre temas relevantes para o sector empresarial e para a sociedade.",
  entrevistas:
    "Conversas com empresários, empreendedores, gestores, líderes institucionais e protagonistas que partilham experiências e visão de mercado.",
};

export function getCategoryIntroduction(category: CategoryWithDescription): string {
  return CATEGORY_INTRODUCTIONS[category.slug] ?? category.description?.trim() ?? "";
}
