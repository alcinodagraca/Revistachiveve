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
      <div className="site-shell pt-8 pb-12">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Início", to: "/" }, { label: title }]} />
        </div>

        <header className="mb-8 max-w-[1040px] pb-5">
          <Heading
            as="h1"
            variant="page-title"
            className="mb-2 text-[1.18rem] leading-[1.12] tracking-[-0.024em] text-foreground md:text-[1.34rem]"
          >
            {title}
          </Heading>
          <p className="font-sans text-[0.72rem] font-light uppercase tracking-[0.08em] text-muted-foreground">
            Última actualização: {updatedAt}
          </p>
        </header>

        <div className="max-w-[1040px]">
          <Prose>
            {intro && (
              <p className="mb-5 text-left text-[16px] leading-[1.7]">
                {intro}
              </p>
            )}
            {sections.map((section, i) => (
              <section key={i} className="mb-7 pt-1">
                <Heading
                  as="h2"
                  variant="feature-title"
                  className="mb-3 text-[0.98rem] leading-[1.22] text-foreground md:text-[1rem]"
                >
                  {section.heading}
                </Heading>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 text-left text-[16px] leading-[1.7]">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </Prose>
        </div>
      </div>
    </div>
  );
}

export function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="12 de Setembro de 2026"
      intro="A Revista Chiveve respeita a sua privacidade. Esta política descreve que dados recolhemos, porquê, e como pode exercer os seus direitos."
      sections={[
        {
          heading: "Dados que recolhemos",
          paragraphs: [
            "Recolhemos apenas os dados necessários para prestar os nossos serviços: nome e endereço de e-mail, dados enviados nos formulários de contacto e submissão, e dados de navegação anónimos para fins estatísticos.",
            "Nos formulários de contactos úteis e concursos públicos, os dados identificados como públicos podem ser publicados após revisão editorial. O nome e o e-mail da pessoa que submete são usados apenas para verificação e acompanhamento.",
            "Não vendemos nem partilhamos dados pessoais com terceiros para fins comerciais.",
          ],
        },
        {
          heading: "Finalidade do tratamento",
          paragraphs: [
            "Usamos os dados recolhidos para enviar a newsletter, melhorar a experiência editorial, responder a contactos e rever contribuições submetidas para possível publicação.",
            "As submissões pendentes são guardadas no WordPress. O nome e o e-mail da pessoa que submete são enviados através do Resend para a caixa de correio da equipa editorial, onde ficam sujeitos às políticas de retenção desses serviços.",
            "As submissões rejeitadas e as notificações relacionadas são conservadas apenas durante o período necessário para revisão, segurança e resolução de eventuais pedidos, sendo depois eliminadas de acordo com os procedimentos editoriais.",
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
      updatedAt="12 de Setembro de 2026"
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
            "Ao submeter um contacto útil ou concurso público, confirma que os dados são correctos, que tem autorização para os partilhar e que a equipa pode corrigi-los ou editá-los antes da publicação.",
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
