import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FaBullseye, FaEye, FaAward } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader } from "../components/typography";

const teamMembers = [
  {
    name: "Ricardo Monteiro",
    role: "Editor-Chefe",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Ana Paula Silva",
    role: "Directora de Conteúdo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "João Matola",
    role: "Editor de Economia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Mariana Costa",
    role: "Editora de Empreendedorismo",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export default function SobreNosPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <PageHeader
        title="Sobre Nós"
        subtitle="A Forbes para jovens empreendedores moçambicanos"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Sobre Nós" }]}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mb-16">
        <div className="p-8 rounded-lg bg-secondary">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-5">
            <FaBullseye size={24} color="white" />
          </div>
          <Heading as="h3" variant="feature-title" className="text-foreground mb-3">
            Missão
          </Heading>
          <p className="font-sans font-normal text-base text-muted-foreground leading-relaxed">
            Inspirar e capacitar a próxima geração de líderes empresariais moçambicanos através
            de conteúdo de qualidade.
          </p>
        </div>

        <div className="p-8 rounded-lg bg-secondary">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-5">
            <FaEye size={24} color="white" />
          </div>
          <Heading as="h3" variant="feature-title" className="text-foreground mb-3">
            Visão
          </Heading>
          <p className="font-sans font-normal text-base text-muted-foreground leading-relaxed">
            Ser a principal plataforma de referência para empreendedorismo e negócios em
            Moçambique.
          </p>
        </div>

        <div className="p-8 rounded-lg bg-secondary">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-5">
            <FaAward size={24} color="white" />
          </div>
          <Heading as="h3" variant="feature-title" className="text-foreground mb-3">
            Valores
          </Heading>
          <p className="font-sans font-normal text-base text-muted-foreground leading-relaxed">
            Excelência, integridade, inovação e compromisso com a verdade.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <SectionHeader as="h2">Equipa</SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="text-center">
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-border"
              />
              <Heading as="h3" variant="card-title" className="text-foreground mb-1">
                {member.name}
              </Heading>
              <p className="font-sans font-normal text-sm text-muted-foreground">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
