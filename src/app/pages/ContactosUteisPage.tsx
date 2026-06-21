import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Search, Building2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/typography";

const allContacts = [
  {
    id: 1,
    category: "Instituições Financeiras",
    name: "Banco de Moçambique",
    phone: "+258 21 354 500",
    email: "info@bancomoc.mz",
    address: "Av. 25 de Setembro, 1695, Maputo",
    website: "www.bancomoc.mz",
    logo: "https://images.unsplash.com/photo-1761383224726-67e375a6fd88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5rJTIwZmluYW5jaWFsJTIwaW5zdGl0dXRpb24lMjBsb2dvfGVufDF8fHx8MTc3NTY0OTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Banco Central de Moçambique",
  },
  {
    id: 2,
    category: "Instituições Financeiras",
    name: "BCI - Banco Comercial e de Investimentos",
    phone: "+258 21 322 100",
    email: "contacto@bci.co.mz",
    address: "Av. 25 de Setembro, 1184, Maputo",
    website: "www.bci.co.mz",
    logo: "https://images.unsplash.com/photo-1641155049992-8cba3e42f632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU1NzkwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Banco comercial líder em Moçambique",
  },
  {
    id: 3,
    category: "Instituições Financeiras",
    name: "Standard Bank Moçambique",
    phone: "+258 21 352 500",
    email: "info@standardbank.co.mz",
    address: "Praça 25 de Junho, 1, Maputo",
    website: "www.standardbank.co.mz",
    logo: "https://images.unsplash.com/photo-1761383224726-67e375a6fd88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5rJTIwZmluYW5jaWFsJTIwaW5zdGl0dXRpb24lMjBsb2dvfGVufDF8fHx8MTc3NTY0OTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Soluções financeiras integradas",
  },
  {
    id: 4,
    category: "Associações Empresariais",
    name: "CTA - Confederação das Associações Económicas",
    phone: "+258 21 493 181",
    email: "cta@cta.org.mz",
    address: "Rua Consiglieri Pedroso, 347, Maputo",
    website: "www.cta.org.mz",
    logo: "https://images.unsplash.com/photo-1774195044152-19c8c002bb6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlcyUyMGZpcm18ZW58MXx8fHwxNzc1NjQ5NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Confederação de associações económicas",
  },
  {
    id: 5,
    category: "Associações Empresariais",
    name: "AIMO - Associação Industrial de Moçambique",
    phone: "+258 21 352 670",
    email: "aimo@aimo.co.mz",
    address: "Av. 25 de Setembro, 1502, Maputo",
    website: "www.aimo.co.mz",
    logo: "https://images.unsplash.com/photo-1641155049992-8cba3e42f632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU1NzkwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Representação do sector industrial",
  },
  {
    id: 6,
    category: "Associações Empresariais",
    name: "ACIS - Associação de Comércio e Indústria",
    phone: "+258 21 491 970",
    email: "acis@acismoz.com",
    address: "Rua Mateus Sansão Muthemba, 452, Maputo",
    website: "www.acismoz.com",
    logo: "https://images.unsplash.com/photo-1774195044152-19c8c002bb6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlcyUyMGZpcm18ZW58MXx8fHwxNzc1NjQ5NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Promoção do comércio e indústria",
  },
  {
    id: 7,
    category: "Entidades Governamentais",
    name: "Ministério da Economia e Finanças",
    phone: "+258 21 354 300",
    email: "mef@mef.gov.mz",
    address: "Praça da Marinha Popular, Maputo",
    website: "www.mef.gov.mz",
    logo: "https://images.unsplash.com/photo-1636217424491-ff7393fe73fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwaW5zdGl0dXRpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU2NDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Gestão económica e financeira do país",
  },
  {
    id: 8,
    category: "Entidades Governamentais",
    name: "APIEX - Agência de Promoção de Investimentos",
    phone: "+258 21 313 420",
    email: "info@apiex.gov.mz",
    address: "Av. 25 de Setembro, 1218, Maputo",
    website: "www.apiex.gov.mz",
    logo: "https://images.unsplash.com/photo-1636217424491-ff7393fe73fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwaW5zdGl0dXRpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU2NDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Promoção e facilitação de investimentos",
  },
  {
    id: 9,
    category: "Tecnologia e Inovação",
    name: "Centro de Inovação do Maputo",
    phone: "+258 21 325 800",
    email: "info@cimap.co.mz",
    address: "Av. Julius Nyerere, 3233, Maputo",
    website: "www.cimap.co.mz",
    logo: "https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzc1NjE0NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hub de inovação e tecnologia",
  },
  {
    id: 10,
    category: "Tecnologia e Inovação",
    name: "TechHub Moçambique",
    phone: "+258 84 555 1234",
    email: "hello@techhub.mz",
    address: "Rua da Resistência, 1800, Maputo",
    website: "www.techhub.mz",
    logo: "https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzc1NjE0NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Espaço para startups e empreendedores tech",
  },
];

const categories = [
  "Todas as Categorias",
  "Instituições Financeiras",
  "Associações Empresariais",
  "Entidades Governamentais",
  "Tecnologia e Inovação",
];

export default function ContactosUteisPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = allContacts.filter((contact) => {
    const matchesCategory =
      selectedCategory === "Todas as Categorias" || contact.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <PageHeader
          title="Directório de Contactos Úteis"
          subtitle="Encontre instituições, organizações e empresas essenciais para o seu negócio"
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Contactos Úteis" },
          ]}
        />

        <div className="grid grid-cols-[280px_1fr] gap-12 directory-layout">
          <aside className="sticky top-6 h-fit">
            <div className="mb-8">
              <label className="block font-sans font-semibold text-sm text-foreground mb-3 uppercase tracking-[0.05em]">
                Pesquisar
              </label>
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Nome ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pr-3 pl-[42px] rounded-md border border-border bg-[var(--input-background)] font-sans font-normal text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans font-semibold text-sm text-foreground mb-3 uppercase tracking-[0.05em]">
                Categorias
              </label>
              <div className="flex flex-col gap-1">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  const count =
                    category === "Todas as Categorias"
                      ? allContacts.length
                      : allContacts.filter((c) => c.category === category).length;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        "flex items-center justify-between px-4 py-3 rounded-md border-none font-sans text-sm cursor-pointer text-left transition-all " +
                        (isSelected
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-transparent text-foreground font-normal hover:bg-secondary")
                      }
                    >
                      <span>{category}</span>
                      <span className="text-xs opacity-80">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-md bg-secondary">
              <p className="font-sans font-medium text-sm text-foreground text-center">
                {filteredContacts.length} {filteredContacts.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>
          </aside>

          <main>
            {filteredContacts.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <Building2 size={48} className="text-muted-foreground mx-auto mb-4" />
                <Heading as="h3" variant="feature-title" className="text-foreground mb-2">
                  Nenhum resultado encontrado
                </Heading>
                <p className="font-sans font-normal text-base text-muted-foreground leading-relaxed">
                  Tente ajustar os filtros ou termo de pesquisa
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {filteredContacts.map((contact) => (
                  <article
                    key={contact.id}
                    className="grid grid-cols-[120px_1fr] gap-6 p-6 rounded-lg border border-border bg-card transition-all cursor-pointer hover:border-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                  >
                    <div className="w-[120px] h-[120px] rounded-md overflow-hidden bg-secondary flex items-center justify-center">
                      <ImageWithFallback
                        src={contact.logo}
                        alt={`${contact.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 rounded-sm bg-secondary font-sans text-[11px] font-semibold text-primary uppercase tracking-[0.05em]">
                          {contact.category}
                        </span>
                      </div>

                      <Heading as="h3" variant="card-title" className="text-foreground mb-1 leading-tight">
                        {contact.name}
                      </Heading>

                      <p className="font-sans font-normal text-sm text-muted-foreground mb-4 leading-relaxed">
                        {contact.description}
                      </p>

                      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-primary flex-shrink-0" />
                          <a
                            href={`tel:${contact.phone}`}
                            className="font-sans font-normal text-sm text-foreground no-underline transition-colors hover:text-primary"
                          >
                            {contact.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-primary flex-shrink-0" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="font-sans font-normal text-sm text-foreground no-underline transition-colors hover:text-primary"
                          >
                            {contact.email}
                          </a>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-sans font-normal text-sm text-foreground">
                            {contact.address}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-primary flex-shrink-0" />
                          <a
                            href={`https://${contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans font-normal text-sm text-primary no-underline transition-opacity hover:opacity-80"
                          >
                            {contact.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .directory-layout {
            grid-template-columns: 1fr !important;
          }

          aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
