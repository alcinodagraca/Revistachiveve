import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Search, Building2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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
    <div style={{ backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "var(--spacing-48) var(--spacing-16)" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "var(--spacing-48)" }}>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "var(--text-48)",
              fontWeight: "var(--font-weight-semi-bold)",
              color: "var(--foreground)",
              marginBottom: "var(--spacing-8)",
              lineHeight: "1.1",
            }}
          >
            Directório de Contactos Úteis
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-16)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
            }}
          >
            Encontre instituições, organizações e empresas essenciais para o seu negócio
          </p>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "var(--spacing-48)",
          }}
          className="directory-layout"
        >
          {/* Sidebar - Filters */}
          <aside
            style={{
              position: "sticky",
              top: "var(--spacing-24)",
              height: "fit-content",
            }}
          >
            {/* Search Box */}
            <div style={{ marginBottom: "var(--spacing-32)" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  marginBottom: "var(--spacing-12)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Pesquisar
              </label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "var(--spacing-12)",
                    color: "var(--muted-foreground)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Nome ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "var(--spacing-12) var(--spacing-12) var(--spacing-12) 42px",
                    borderRadius: "var(--radius)",
                    border: "var(--border-width) solid var(--border)",
                    backgroundColor: "var(--input-background)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-14)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--foreground)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  marginBottom: "var(--spacing-12)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Categorias
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "var(--spacing-12) var(--spacing-16)",
                        borderRadius: "var(--radius)",
                        border: "none",
                        backgroundColor: isSelected ? "var(--primary)" : "transparent",
                        color: isSelected ? "var(--primary-foreground)" : "var(--foreground)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-14)",
                        fontWeight: isSelected ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--secondary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span>{category}</span>
                      <span
                        style={{
                          fontSize: "var(--text-12)",
                          opacity: 0.8,
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count */}
            <div
              style={{
                marginTop: "var(--spacing-24)",
                padding: "var(--spacing-16)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--secondary)",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  textAlign: "center",
                }}
              >
                {filteredContacts.length} {filteredContacts.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>
          </aside>

          {/* Main Content - Directory Listings */}
          <main>
            {filteredContacts.length === 0 ? (
              <div
                style={{
                  padding: "var(--spacing-64) var(--spacing-24)",
                  textAlign: "center",
                }}
              >
                <Building2 size={48} style={{ color: "var(--muted-foreground)", margin: "0 auto var(--spacing-16)" }} />
                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "var(--text-24)",
                    fontWeight: "var(--font-weight-semi-bold)",
                    color: "var(--foreground)",
                    marginBottom: "var(--spacing-8)",
                  }}
                >
                  Nenhum resultado encontrado
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-16)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  Tente ajustar os filtros ou termo de pesquisa
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-20)" }}>
                {filteredContacts.map((contact) => (
                  <article
                    key={contact.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: "var(--spacing-24)",
                      padding: "var(--spacing-24)",
                      borderRadius: "var(--radius-card)",
                      border: "var(--border-width) solid var(--border)",
                      backgroundColor: "var(--card)",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    {/* Logo */}
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "var(--radius)",
                        overflow: "hidden",
                        backgroundColor: "var(--secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ImageWithFallback
                        src={contact.logo}
                        alt={`${contact.name} logo`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      {/* Category Badge */}
                      <div style={{ marginBottom: "var(--spacing-8)" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "var(--spacing-4) var(--spacing-12)",
                            borderRadius: "var(--radius-sm)",
                            backgroundColor: "var(--secondary)",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            fontWeight: "var(--font-weight-semi-bold)",
                            color: "var(--primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {contact.category}
                        </span>
                      </div>

                      {/* Name */}
                      <h3
                        style={{
                          fontFamily: "Playfair Display, serif",
                          fontSize: "var(--text-20)",
                          fontWeight: "var(--font-weight-semi-bold)",
                          color: "var(--foreground)",
                          marginBottom: "var(--spacing-4)",
                          lineHeight: "1.3",
                        }}
                      >
                        {contact.name}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--muted-foreground)",
                          marginBottom: "var(--spacing-16)",
                          lineHeight: "1.6",
                        }}
                      >
                        {contact.description}
                      </p>

                      {/* Contact Details Grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                          gap: "var(--spacing-12)",
                        }}
                      >
                        {/* Phone */}
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                          <Phone size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                          <a
                            href={`tel:${contact.phone}`}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "var(--text-14)",
                              fontWeight: "var(--font-weight-regular)",
                              color: "var(--foreground)",
                              textDecoration: "none",
                              transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                          >
                            {contact.phone}
                          </a>
                        </div>

                        {/* Email */}
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                          <Mail size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                          <a
                            href={`mailto:${contact.email}`}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "var(--text-14)",
                              fontWeight: "var(--font-weight-regular)",
                              color: "var(--foreground)",
                              textDecoration: "none",
                              transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                          >
                            {contact.email}
                          </a>
                        </div>

                        {/* Address */}
                        <div style={{ display: "flex", alignItems: "start", gap: "var(--spacing-8)" }}>
                          <MapPin size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "var(--text-14)",
                              fontWeight: "var(--font-weight-regular)",
                              color: "var(--foreground)",
                            }}
                          >
                            {contact.address}
                          </span>
                        </div>

                        {/* Website */}
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
                          <Globe size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                          <a
                            href={`https://${contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "var(--text-14)",
                              fontWeight: "var(--font-weight-regular)",
                              color: "var(--primary)",
                              textDecoration: "none",
                              transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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

      {/* Responsive styles for mobile */}
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
