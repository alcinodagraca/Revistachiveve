import { FaLinkedinIn } from "react-icons/fa6";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/sobre-nos";

const editorialPrinciples = [
  {
    number: "01",
    title: "Contexto antes do ruído",
    text: "Explicamos porque um tema importa e o que pode mudar para quem toma decisões.",
  },
  {
    number: "02",
    title: "Protagonistas que constroem",
    text: "Damos voz a empresários, empreendedores e iniciativas que fazem a economia acontecer.",
  },
  {
    number: "03",
    title: "Informação para agir",
    text: "Procuramos entregar clareza e conhecimento aplicável, sem complicar o que pode ser simples.",
  },
];

const davidFranco = {
  id: -1,
  name: "David Franco",
  role: "Editor-Chefe",
  image: "/Franco-Editor Chefe.jpeg",
  bio: "Responsável pela direcção editorial da Revista Negócios no Chiveve.",
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

        <section className="mb-14 border-t border-border pt-8 md:mb-18 md:pt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_340px] lg:items-start lg:gap-12">
            <div>
              <Eyebrow className="mb-3 inline-block">Revista Negócios no Chiveve</Eyebrow>
              <Heading as="h2" variant="article-title" className="mb-5 max-w-4xl text-foreground">
                Informação empresarial com raízes na Beira e atenção a todo o país.
              </Heading>
              <div className="max-w-3xl font-sans text-[0.98rem] font-light leading-[1.8] text-foreground/78">
                <p>
                  A Revista Negócios no Chiveve acompanha o empreendedorismo, a liderança,
                  a inovação e as oportunidades económicas em Moçambique, aproximando quem
                  cria, lidera e investe.
                </p>
              </div>
            </div>

            <aside className="border border-border bg-card p-6 md:p-7">
              <Eyebrow className="mb-5 inline-block">Em foco</Eyebrow>
              <div className="space-y-5">
                <div>
                  <Heading as="h3" variant="feature-title" className="mb-2 text-foreground">
                    O nosso propósito
                  </Heading>
                  <p className="font-sans text-[0.92rem] font-light leading-[1.65] text-foreground/74">
                    Transformar informação empresarial em conteúdo útil para decisões e negócios.
                  </p>
                </div>
                <div>
                  <Heading as="h3" variant="feature-title" className="mb-2 text-foreground">
                    O que fazemos
                  </Heading>
                  <p className="font-sans text-[0.92rem] font-light leading-[1.65] text-foreground/74">
                    Produzimos reportagens, entrevistas e análises sobre a economia moçambicana.
                  </p>
                </div>
                <div>
                  <Heading as="h3" variant="feature-title" className="mb-2 text-foreground">
                    Para quem escrevemos
                  </Heading>
                  <p className="font-sans text-[0.92rem] font-light leading-[1.65] text-foreground/74">
                    Empreendedores, gestores, investidores, profissionais e estudantes.
                  </p>
                </div>
              </div>
            </aside>
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
                Contar melhor o que acontece nos negócios para ajudar o leitor a compreender o que vem a seguir.
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
                <article key={member.id}>
                  <div className="mb-4 aspect-square overflow-hidden bg-secondary">
                    <ImageWithFallback
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      className="h-full w-full object-cover"
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
          <SectionHeader as="h2">Parcerias</SectionHeader>
          <div className="grid overflow-hidden bg-primary lg:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-h-[210px] items-center justify-center p-8 md:p-10">
              <img
                src="/Logo Branco.png"
                alt="Negócios no Chiveve Hub"
                className="h-auto max-h-28 w-full max-w-[430px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-center border-t border-white/20 px-7 py-8 text-primary-foreground md:px-10 lg:border-l lg:border-t-0">
              <Eyebrow className="mb-3 inline-block text-primary-foreground/80">
                Parceiro institucional
              </Eyebrow>
              <Heading as="h3" variant="feature-title" className="mb-3 text-primary-foreground">
                Negócios no Chiveve Hub
              </Heading>
              <p className="max-w-2xl font-sans text-[0.96rem] font-light leading-[1.75] text-primary-foreground/90">
                A Revista Negócios no Chiveve faz parte do Negócios no Chiveve Hub,
                uma plataforma que liga iniciativas de informação, colaboração e
                desenvolvimento do ecossistema empresarial.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
