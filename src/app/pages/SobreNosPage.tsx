import { FaLinkedinIn } from "react-icons/fa6";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/sobre-nos";

const editorialPrinciples = [
  {
    number: "01",
    title: "Negócios com contexto",
    text: "Não olhamos apenas para acontecimentos isolados. Procuramos explicar o que está por trás das decisões, dos desafios e das oportunidades que influenciam o ambiente empresarial.",
  },
  {
    number: "02",
    title: "Histórias com impacto",
    text: "Valorizamos protagonistas reais, percursos inspiradores e experiências que mostram como os negócios nascem, crescem, resistem e se reinventam.",
  },
  {
    number: "03",
    title: "Economia próxima das pessoas",
    text: "Acreditamos que a economia não se resume a números. Ela está presente no comércio, nos serviços, nos transportes, nas feiras, nas empresas familiares, nas startups, nos mercados e nas decisões diárias de quem empreende.",
  },
];

const davidFranco = {
  id: -1,
  name: "David Franco",
  role: "Editor-Chefe",
  image: "/Franco-Editor Chefe.jpeg",
  bio: "Editor-Chefe da Revista Negócios no Chiveve.",
  linkedin: "https://www.linkedin.com/in/david-franco-1b248976/",
};

export default function SobreNosPage() {
  const { team: wpTeam } = Route.useLoaderData();
  const members = [
    davidFranco,
    ...(wpTeam ?? []).filter(
      (member) => member.name.toLocaleLowerCase() !== davidFranco.name.toLocaleLowerCase(),
    ),
  ];

  return (
    <div className="bg-background">
      <div className="site-shell py-12 md:py-16">
        <PageHeader
          title="Sobre Nós"
          subtitle="A revista que dá voz aos negócios, às ideias e aos protagonistas que movem Moçambique."
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Sobre Nós" }]}
        />

        <section className="mb-10 border-t border-border pt-8 md:mb-12 md:pt-10">
          <div className="grid overflow-hidden border border-border lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <div className="px-7 py-8 md:px-10 md:py-11 lg:px-12">
              <Eyebrow className="mb-3 inline-block">Revista Negócios no Chiveve</Eyebrow>
              <Heading as="h2" variant="article-title" className="mb-5 max-w-4xl text-foreground">
                Negócios, liderança e inovação em Moçambique.
              </Heading>
              <div className="max-w-4xl space-y-5 font-sans text-[0.98rem] font-light leading-[1.8] text-foreground/78">
                <p>
                  A Revista Negócios no Chiveve é uma plataforma editorial dedicada à valorização
                  do empreendedorismo, da liderança empresarial, tecnologia, da inovação e das
                  oportunidades económicas em Moçambique, com especial atenção à cidade da Beira
                  e à região centro do país.
                </p>
                <p>
                  Nascemos para contar histórias que merecem visibilidade, interpretar os
                  movimentos do mercado e aproximar empresários, empreendedores, investidores,
                  instituições e leitores interessados no desenvolvimento económico nacional.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-primary px-7 py-8 text-primary-foreground md:px-10 md:py-11">
              <Eyebrow className="mb-10 inline-block text-primary-foreground/80">
                A nossa identidade
              </Eyebrow>
              <p className="max-w-md font-sans text-[1.35rem] font-medium leading-[1.5] md:text-[1.55rem]">
                Mais do que uma revista, somos um espaço de leitura, memória, promoção e conexão empresarial.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 md:mb-18" aria-label="Identidade editorial">
          <div className="grid divide-y divide-border border border-border bg-background lg:grid-cols-[0.95fr_1.05fr_1.15fr] lg:divide-x lg:divide-y-0">
            <article className="p-7 md:p-8">
              <Eyebrow className="mb-5 inline-block">01</Eyebrow>
              <Heading as="h2" variant="feature-title" className="mb-4 text-foreground">
                O Nosso Propósito
              </Heading>
              <div className="space-y-3 font-sans text-[0.93rem] font-light leading-[1.72] text-foreground/74">
                <p>
                  O nosso propósito é transformar informação, experiências e trajectórias
                  empresariais em conteúdos relevantes, capazes de inspirar decisões, estimular
                  negócios e fortalecer o ecossistema empreendedor moçambicano.
                </p>
                <p>
                  Acreditamos que cada empresa, cada empreendedor, cada associação, cada
                  iniciativa local e cada história de superação contribui para a construção de
                  uma economia mais dinâmica, inclusiva e competitiva.
                </p>
              </div>
            </article>

            <article className="p-7 md:p-8">
              <Eyebrow className="mb-5 inline-block">02</Eyebrow>
              <Heading as="h2" variant="feature-title" className="mb-4 text-foreground">
                O Que Fazemos
              </Heading>
              <div className="space-y-3 font-sans text-[0.93rem] font-light leading-[1.72] text-foreground/74">
                <p>
                  Produzimos e publicamos conteúdos editoriais sobre negócios, empreendedorismo,
                  liderança, inovação, investimento, economia local, associativismo empresarial,
                  marcas, eventos, oportunidades e desenvolvimento.
                </p>
                <p>
                  Damos destaque a empresários, jovens empreendedores, mulheres líderes,
                  pequenas e médias empresas, instituições públicas e privadas, projectos de
                  impacto e iniciativas que contribuem para transformar comunidades e mercados.
                </p>
              </div>
            </article>

            <article className="p-7 md:p-8">
              <Eyebrow className="mb-5 inline-block">03</Eyebrow>
              <Heading as="h2" variant="feature-title" className="mb-4 text-foreground">
                Para Quem Escrevemos
              </Heading>
              <div className="space-y-3 font-sans text-[0.93rem] font-light leading-[1.72] text-foreground/74">
                <p>
                  Escrevemos para empreendedores, empresários, gestores, investidores, decisores
                  públicos, profissionais, estudantes, associações empresariais, instituições de
                  desenvolvimento e todos aqueles que procuram compreender melhor os negócios e
                  as oportunidades em Moçambique.
                </p>
                <p>
                  A nossa revista é feita para quem cria, lidera, investe, vende, compra, emprega,
                  arrisca, aprende e acredita no potencial económico do país.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mb-14 md:mb-18">
          <SectionHeader as="h2">A Nossa Linha Editorial</SectionHeader>
          <div className="grid overflow-hidden border border-border lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)]">
            <div className="flex flex-col justify-between bg-primary px-7 py-8 text-primary-foreground md:px-9 md:py-10">
              <Eyebrow className="mb-10 inline-block text-primary-foreground/80">
                O nosso critério
              </Eyebrow>
              <p className="max-w-md font-sans text-[1.35rem] font-medium leading-[1.48] md:text-[1.6rem]">
                Negócios com contexto. Histórias com impacto. Economia próxima das pessoas.
              </p>
            </div>

            <div className="divide-y divide-border bg-background px-7 md:px-9">
              {editorialPrinciples.map((item) => (
                <article
                  key={item.number}
                  className="grid gap-3 py-6 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-5 md:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-[0.72rem] font-semibold tracking-[0.12em] text-primary"
                  >
                    {item.number}
                  </span>
                  <div>
                    <Heading as="h3" variant="feature-title" className="mb-2 text-foreground">
                      {item.title}
                    </Heading>
                    <p className="max-w-2xl font-sans text-[0.94rem] font-light leading-[1.7] text-foreground/74">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 md:mb-18">
          <SectionHeader as="h2">Equipa Editorial</SectionHeader>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.slice(0, 4).map((member) => {
              const linkedin = "linkedin" in member ? member.linkedin : undefined;
              return (
                <article
                  key={member.id}
                  className={member.id === davidFranco.id ? "group" : undefined}
                >
                  <div className="mb-4 aspect-square overflow-hidden bg-secondary">
                    <ImageWithFallback
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      className={
                        member.id === davidFranco.id
                          ? "h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:transition-none"
                          : "h-full w-full object-cover"
                      }
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Heading as="h3" variant="feature-title" className="mb-1 text-foreground">
                        {member.name}
                      </Heading>
                      <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary">
                        {member.role}
                      </p>
                    </div>
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Perfil de ${member.name} no LinkedIn`}
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <FaLinkedinIn aria-hidden="true" size={16} />
                      </a>
                    )}
                  </div>
                  {member.bio && (
                    <p className="mt-3 font-sans text-[0.9rem] font-light leading-[1.65] text-foreground/72">
                      {member.bio}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeader as="h2">Suportado por</SectionHeader>
          <div className="grid overflow-hidden bg-primary lg:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-h-[210px] items-center justify-center p-8 md:p-10">
              <img
                src="/Logo Branco.png"
                alt="Negócios no Chiveve Hub"
                className="h-auto max-h-28 w-full max-w-[430px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-center border-t border-white/20 px-7 py-8 text-primary-foreground md:px-10 lg:border-l lg:border-t-0">
              <Heading as="h3" variant="feature-title" className="mb-3 text-primary-foreground">
                Negócios no Chiveve Hub
              </Heading>
              <p className="max-w-2xl font-sans text-[0.96rem] font-light leading-[1.75] text-primary-foreground/90">
                A Revista Negócios no Chiveve é suportada pelo Negócios no Chiveve Hub,
                do qual faz parte.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
