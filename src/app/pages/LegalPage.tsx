import { Breadcrumb } from "../components/Breadcrumb";
import { Prose } from "../components/Prose";
import { Heading } from "../components/typography";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export function LegalPage({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-12">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Início", to: "/" }, { label: title }]} />
        </div>

        <header className="max-w-[680px] mx-auto mb-8">
          <Heading as="h1" variant="page-title" className="text-foreground mb-3">
            {title}
          </Heading>
          <p className="font-sans text-[13px] text-muted-foreground tracking-[0.05em]">
            Última actualização: {updatedAt}
          </p>
        </header>

        <Prose>
          {intro && <p className="mb-8">{intro}</p>}
          {sections.map((section, i) => (
            <section key={i} className="mb-8">
              <Heading as="h2" variant="feature-title" className="text-foreground mb-3 leading-tight">
                {section.heading}
              </Heading>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </Prose>
      </div>
    </div>
  );
}

export function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="01 de Junho de 2026"
      intro="A Revista Chiveve respeita a sua privacidade. Esta política descreve que dados recolhemos, porquê, e como pode exercer os seus direitos."
      sections={[
        {
          heading: "Dados que recolhemos",
          paragraphs: [
            "Recolhemos apenas os dados estritamente necessários para prestar os nossos serviços: nome e endereço de e-mail (quando subscreve a newsletter), e dados de navegação anónimos para fins estatísticos.",
            "Não vendemos nem partilhamos dados pessoais com terceiros para fins comerciais.",
          ],
        },
        {
          heading: "Finalidade do tratamento",
          paragraphs: [
            "Usamos os dados recolhidos para enviar a newsletter, melhorar a experiência editorial e responder a contactos enviados através do formulário do site.",
          ],
        },
        {
          heading: "Os seus direitos",
          paragraphs: [
            "Pode, a qualquer momento, solicitar acesso, correcção ou eliminação dos seus dados pessoais através do nosso e-mail de contacto.",
            "Esta política pode ser actualizada. Qualquer alteração relevante será comunicada nesta página com a respectiva data de actualização.",
          ],
        },
      ]}
    />
  );
}

export function TermosPage() {
  return (
    <LegalPage
      title="Termos e Condições"
      updatedAt="01 de Junho de 2026"
      intro="Ao utilizar a Revista Chiveve, está a concordar com os termos abaixo. Leia com atenção."
      sections={[
        {
          heading: "Uso do conteúdo",
          paragraphs: [
            "Todo o conteúdo publicado é propriedade da Revista Chiveve, salvo quando expressamente indicado o contrário. A reprodução parcial é permitida com citação da fonte e ligação ao artigo original.",
            "Reprodução integral exige autorização prévia por escrito.",
          ],
        },
        {
          heading: "Comentários e contribuições",
          paragraphs: [
            "O leitor é responsável pelo conteúdo que envia através de formulários ou comentários. Reservamo-nos o direito de não publicar ou remover contribuições que violem boas práticas editoriais.",
          ],
        },
        {
          heading: "Limitação de responsabilidade",
          paragraphs: [
            "A informação publicada é apurada com rigor jornalístico, mas não substitui aconselhamento profissional especializado em matérias jurídicas, fiscais ou de investimento.",
          ],
        },
      ]}
    />
  );
}

export function AnunciosPage() {
  return (
    <LegalPage
      title="Anúncios e Parcerias"
      updatedAt="01 de Junho de 2026"
      intro="Trabalhe connosco para chegar a uma audiência qualificada de líderes, empreendedores e quadros executivos em Moçambique e na região."
      sections={[
        {
          heading: "Formatos disponíveis",
          paragraphs: [
            "Disponibilizamos banners no site, conteúdo patrocinado claramente identificado, presença na newsletter semanal e parcerias para eventos próprios.",
            "Cada formato é discutido caso a caso para garantir alinhamento com a linha editorial.",
          ],
        },
        {
          heading: "Princípios editoriais",
          paragraphs: [
            "Conteúdo patrocinado é sempre rotulado como tal. Nunca aceitamos pagamentos para influenciar a cobertura noticiosa.",
          ],
        },
        {
          heading: "Contacto comercial",
          paragraphs: [
            "Envie a sua proposta para info@revistachiveve.co.mz com o assunto \"Parceria comercial\" e responderemos no prazo de até 5 dias úteis.",
          ],
        },
      ]}
    />
  );
}
