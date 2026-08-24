import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Heading, SectionHeader, Eyebrow } from "../components/typography";
import { Route } from "../../routes/sobre-nos";

const teamMembers = [
  {
    id: 1,
    name: "Ricardo Monteiro",
    role: "Editor-Chefe",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Coordena a linha editorial da revista e acompanha as grandes histórias sobre negócios, liderança e transformação económica.",
  },
  {
    id: 2,
    name: "Ana Paula Silva",
    role: "Directora de Conteúdo",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Trabalha o ritmo das edições e garante profundidade, clareza e contexto em cada peça publicada.",
  },
  {
    id: 3,
    name: "João Matola",
    role: "Editor de Economia",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Foca-se em política económica, mercados, investimento e sinais que ajudam a ler o momento empresarial.",
  },
  {
    id: 4,
    name: "Mariana Costa",
    role: "Editora de Empreendedorismo",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    bio: "Acompanha empresas emergentes, novos líderes e histórias de construção de negócio em Moçambique.",
  },
];

const manifesto = [
  {
    title: "Leitura com contexto",
    text: "Não publicamos apenas factos. Procuramos explicar o que está a mudar, porque importa e como isso afecta decisões de negócio.",
  },
  {
    title: "Olhar para Moçambique",
    text: "A revista nasce do território e da sua energia empresarial, sem perder de vista os movimentos africanos e internacionais que moldam o presente.",
  },
  {
    title: "Autoridade sem ruído",
    text: "Preferimos clareza, rigor e selecção editorial a excesso de informação. O objectivo é ajudar o leitor a perceber melhor, mais depressa.",
  },
];

export default function SobreNosPage() {
  const { team: wpTeam } = Route.useLoaderData();
  const members = wpTeam && wpTeam.length > 0 ? wpTeam : teamMembers;

  return (
    <div className="bg-background">
      <section className="relative h-[280px] overflow-hidden md:h-[360px] lg:h-[420px]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800"
          alt="Equipa editorial em ambiente de trabalho"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/22" />
      </section>

      <div className="site-shell py-12 md:py-16">
        <header className="mb-12 md:mb-14">
          <Heading as="h1" variant="page-title" className="text-foreground">
            Sobre Nós
          </Heading>
        </header>

        <section className="mb-14 md:mb-16">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-start">
            <div>
              <Eyebrow className="mb-3 inline-block">Posicionamento Editorial</Eyebrow>
              <Heading as="h2" variant="article-title" className="mb-5 max-w-4xl text-foreground">
                Uma revista para ler o presente económico com mais precisão e antecipar os próximos movimentos.
              </Heading>

              <div className="max-w-3xl space-y-4 font-sans text-[0.98rem] font-light leading-[1.8] text-foreground/78">
                <p>
                  A Revista Chiveve é uma plataforma editorial dedicada a acompanhar o
                  ecossistema de negócios em Moçambique com rigor, clareza e curadoria.
                </p>
                <p>
                  Publicamos reportagens, entrevistas, leituras de contexto e histórias
                  de liderança para um público que valoriza profundidade, critério e
                  utilidade real.
                </p>
                <p>
                  O nosso compromisso é simples: transformar informação dispersa em
                  leitura relevante para quem decide, investe, lidera e constrói.
                </p>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <Eyebrow className="mb-3 inline-block">Em foco</Eyebrow>
              <div className="space-y-5">
                <div>
                  <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                    O que fazemos
                  </p>
                  <p className="mt-2 font-sans text-[0.94rem] font-light leading-[1.7] text-foreground/76">
                    Seleccionamos as histórias, ideias e protagonistas que ajudam a
                    compreender o ambiente empresarial com mais nitidez.
                  </p>
                </div>

                <div>
                  <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                    Para quem escrevemos
                  </p>
                  <p className="mt-2 font-sans text-[0.94rem] font-light leading-[1.7] text-foreground/76">
                    Empreendedores, executivos, decisores públicos, leitores curiosos e
                    profissionais que procuram contexto útil para actuar melhor.
                  </p>
                </div>

                <div>
                  <p className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-primary">
                    Como pensamos
                  </p>
                  <p className="mt-2 font-sans text-[0.94rem] font-light leading-[1.7] text-foreground/76">
                    Menos ruído, mais clareza. Menos urgência vazia, mais leitura com
                    critério editorial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-18 md:my-20">
          <SectionHeader as="h2">A Nossa Linha Editorial</SectionHeader>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {manifesto.map((item) => (
              <article key={item.title} className="pt-1">
                <Heading as="h3" variant="feature-title" className="mb-3 text-foreground">
                  {item.title}
                </Heading>
                <p className="font-sans text-[0.94rem] font-light leading-[1.72] text-foreground/74">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader as="h2">Equipa Editorial</SectionHeader>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {members.slice(0, 4).map((member, idx) => (
              <article key={member.id ?? idx}>
                <div className="mb-4 overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="h-[260px] w-full object-cover"
                  />
                </div>
                <Heading as="h3" variant="feature-title" className="mb-1 text-foreground">
                  {member.name}
                </Heading>
                <p className="font-sans text-[0.82rem] font-medium uppercase tracking-[0.08em] text-primary">
                  {member.role}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
