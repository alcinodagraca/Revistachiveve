import { useState } from "react";
import { FaPhone, FaEnvelope, FaLocationDot, FaGlobe, FaMagnifyingGlass, FaBuilding } from "react-icons/fa6";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { Heading, SectionHeader } from "../components/typography";
import { Input } from "../components/ui/input";
import { Route } from "../../routes/contactos-uteis";

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

export default function ContactosUteisPage() {
  const { contacts: wpContacts } = Route.useLoaderData();
  const items = wpContacts ?? [];

  // Derive category list dynamically from the data so WP-added categories show up.
  const categories = [
    "Todas as Categorias",
    ...Array.from(new Set(items.map((c) => c.category).filter(Boolean))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = items.filter((contact) => {
    const matchesCategory =
      selectedCategory === "Todas as Categorias" || contact.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedContacts = categories
    .filter((category) => category !== "Todas as Categorias")
    .map((category) => ({
      category,
      contacts: filteredContacts.filter((contact) => contact.category === category),
    }))
    .filter((group) => group.contacts.length > 0);

  return (
    <div className="bg-background">
      <div className="site-shell py-12 md:py-14">
        <PageHeader
          title="Directório de Empresas"
          subtitle="Instituições, associações e organizações de referência para acompanhar, contactar e activar oportunidades de negócio."
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Contactos Úteis" },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12 directory-layout">
          <aside className="h-fit border border-border bg-card p-5 lg:sticky lg:top-24">
            <div className="mb-8">
              <label className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                Pesquisar
              </label>
              <div className="relative flex items-center">
                <FaMagnifyingGlass size={18} className="absolute left-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Nome ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full border-border bg-[var(--input-background)] py-3 pr-3 pl-[42px] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                Categorias
              </label>
              <div className="flex flex-col gap-1">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  const count =
                    category === "Todas as Categorias"
                      ? items.length
                      : items.filter((c) => c.category === category).length;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        "flex items-center justify-between border-none px-0 py-2.5 font-sans text-sm cursor-pointer text-left transition-all border-b border-border/70 last:border-b-0 " +
                        (isSelected
                          ? "text-foreground font-medium"
                          : "bg-transparent text-foreground/72 font-normal hover:text-foreground")
                      }
                    >
                      <span>{category}</span>
                      <span className="text-[11px] text-muted-foreground">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          <main className="min-w-0">
            {filteredContacts.length === 0 ? (
              <EmptyState
                icon={FaBuilding}
                title="Nenhum resultado encontrado"
                message="Tente ajustar os filtros ou usar outra palavra-chave na pesquisa."
              />
            ) : (
              <div className="space-y-12">
                {groupedContacts.map((group) => (
                  <section key={group.category}>
                    <SectionHeader>{group.category}</SectionHeader>
                    <div className="space-y-6">
                      {group.contacts.map((contact) => (
                        <article
                          key={contact.id}
                          className="grid grid-cols-[72px_1fr] gap-5 border border-border bg-card p-5 md:p-6"
                        >
                          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden bg-secondary">
                            <ImageWithFallback
                              src={contact.logo}
                              alt={`${contact.name} logo`}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div>
                            <Heading
                              as="h3"
                              variant="feature-title"
                              className="mb-2 text-foreground"
                            >
                              {contact.name}
                            </Heading>

                            <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
                              {contact.phone && (
                                <div className="flex items-center gap-2">
                                  <FaPhone size={14} className="shrink-0 text-primary" />
                                  <a
                                    href={`tel:${contact.phone}`}
                                    className="font-sans text-[0.9rem] font-normal text-foreground no-underline transition-colors hover:text-primary"
                                  >
                                    {contact.phone}
                                  </a>
                                </div>
                              )}

                              {contact.email && (
                                <div className="flex items-center gap-2">
                                  <FaEnvelope size={14} className="shrink-0 text-primary" />
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="font-sans text-[0.9rem] font-normal text-foreground no-underline transition-colors hover:text-primary"
                                  >
                                    {contact.email}
                                  </a>
                                </div>
                              )}

                              {contact.address && (
                                <div className="flex items-start gap-2">
                                  <FaLocationDot size={14} className="mt-0.5 shrink-0 text-primary" />
                                  <span className="font-sans text-[0.9rem] font-normal text-foreground">
                                    {contact.address}
                                  </span>
                                </div>
                              )}

                              {contact.website && (
                                <div className="flex items-center gap-2">
                                  <FaGlobe size={14} className="shrink-0 text-primary" />
                                  <a
                                    href={
                                      contact.website.startsWith("http")
                                        ? contact.website
                                        : `https://${contact.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-[0.9rem] font-normal text-primary no-underline transition-opacity hover:opacity-80"
                                  >
                                    {contact.website}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
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
