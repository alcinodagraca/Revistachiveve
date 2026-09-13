import { useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaLocationDot, FaGlobe, FaMagnifyingGlass, FaBuilding } from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { EmptyState } from "../components/EmptyState";
import { Heading, SectionHeader } from "../components/typography";
import { Input } from "../components/ui/input";
import { Route } from "../../routes/contactos-uteis";
import { UsefulContactSubmissionDialog } from "../components/ListingSubmissionDialogs";
import { CONTACT_CATEGORY_NAMES } from "../../data/contactCategories";
import { ListPagination } from "../components/ListPagination";

const ITEMS_PER_PAGE = 10;

function CompanyLogo({ name, logo }: { name: string; logo: string }) {
  const [didError, setDidError] = useState(false);
  const initial = Array.from(name.trim())[0]?.toLocaleUpperCase("pt-MZ") ?? "?";

  if (!logo || didError) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full items-center justify-center bg-primary/10 font-sans text-2xl font-semibold text-primary"
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={`Logótipo de ${name}`}
      className="h-full w-full object-cover"
      onError={() => setDidError(true)}
    />
  );
}

function phoneLink(phone: string): string {
  const firstNumber = phone.split(/\s*(?:\||\/)\s*/)[0] ?? phone;
  const prefix = firstNumber.trim().startsWith("+") ? "+" : "";
  return `tel:${prefix}${firstNumber.replace(/\D/g, "")}`;
}

export default function ContactosUteisPage() {
  const { contacts: wpContacts, contactCategories } = Route.useLoaderData();
  const items = wpContacts ?? [];

  const additionalCategories = Array.from(
    new Set(items.map((contact) => contact.category).filter(Boolean)),
  ).filter(
    (category) =>
      !CONTACT_CATEGORY_NAMES.includes(
        category as (typeof CONTACT_CATEGORY_NAMES)[number],
      ),
  );
  const categories = [
    "Todas as categorias",
    ...CONTACT_CATEGORY_NAMES,
    ...additionalCategories,
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todas as categorias");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsTopRef = useRef<HTMLDivElement>(null);

  const filteredContacts = items.filter((contact) => {
    const matchesCategory =
      selectedCategory === "Todas as categorias" || contact.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      [
        contact.name,
        contact.category,
        contact.description,
        contact.address,
        contact.website,
      ].some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visibleContacts = filteredContacts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.requestAnimationFrame(() => {
      resultsTopRef.current?.focus({ preventScroll: true });
      resultsTopRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="bg-background">
      <div className="site-shell py-12 md:py-14">
        <PageHeader
          title="Directório empresarial e institucional"
          subtitle="Encontre instituições, associações, empresas, serviços e organizações de referência que podem apoiar, conectar ou activar oportunidades de negócio em Moçambique."
          breadcrumbs={[
            { label: "Início", to: "/" },
            { label: "Directório empresarial" },
          ]}
        />

        <UsefulContactSubmissionDialog categories={contactCategories} />

        {items.length === 0 ? (
          <EmptyState
            icon={FaBuilding}
            title="Nenhum contacto publicado"
            message="Ainda não existem contactos disponíveis neste directório."
          />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12 directory-layout">
          <aside className="h-fit border border-border bg-card p-5 lg:sticky lg:top-24">
            <div className="mb-8">
              <label
                htmlFor="contact-search"
                className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary"
              >
                Pesquisar no directório
              </label>
              <div className="relative flex items-center">
                <FaMagnifyingGlass aria-hidden="true" size={18} className="absolute left-3 text-muted-foreground" />
                <Input
                  id="contact-search"
                  type="text"
                  placeholder="Pesquisar contacto"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full border-foreground/50 bg-[var(--input-background)] py-3 pr-3 pl-[42px] text-sm focus-visible:border-primary focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="min-w-0 max-w-full">
              <p className="mb-3 block font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-primary">
                Categorias
              </p>
              <div
                className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  const count =
                    category === "Todas as categorias"
                      ? items.length
                      : items.filter((c) => c.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={
                        "flex min-h-[44px] shrink-0 items-center gap-3 border-0 bg-secondary px-3 py-0 font-sans text-sm cursor-pointer text-left transition-all lg:w-full lg:justify-between lg:bg-transparent lg:px-0 " +
                        (isSelected
                          ? "bg-primary/10 text-primary font-medium lg:bg-transparent lg:text-foreground"
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

          <section aria-label="Contactos" className="min-w-0">
            <div
              ref={resultsTopRef}
              tabIndex={-1}
              className="scroll-mt-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <SectionHeader className="border-b-0 pb-0">Resultados</SectionHeader>
            </div>
            {filteredContacts.length === 0 ? (
              <EmptyState
                icon={FaBuilding}
                title="Nenhum contacto encontrado"
                message="Não foram encontrados resultados para a pesquisa realizada. Experimente ajustar os filtros, usar outra palavra-chave ou seleccionar uma categoria diferente."
              />
            ) : (
              <div className="space-y-6">
                {visibleContacts.map((contact) => (
                  <article
                    key={contact.id}
                    className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border border-border bg-card p-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-5 sm:p-5 md:p-6"
                  >
                    <div className="flex size-14 items-center justify-center overflow-hidden bg-secondary sm:size-[72px]">
                      <CompanyLogo name={contact.name} logo={contact.logo} />
                    </div>

                    <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-x-6">
                      <div className="min-w-0">
                        <span className="mb-2 inline-flex bg-primary/10 px-2.5 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary">
                          {contact.category}
                        </span>

                        <Heading
                          as="h3"
                          variant="feature-title"
                          className="mb-2 text-foreground"
                        >
                          {contact.name}
                        </Heading>

                        {contact.phone && (
                                <div className="flex items-center gap-2">
                                  <FaPhone aria-hidden="true" size={14} className="shrink-0 text-primary" />
                                  <a
                                    href={phoneLink(contact.phone)}
                                    className="font-sans text-[0.9rem] font-normal text-foreground no-underline transition-colors hover:text-primary"
                                  >
                                    {contact.phone}
                                  </a>
                                </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {contact.email && (
                                <div className="flex items-center gap-2">
                                  <FaEnvelope aria-hidden="true" size={14} className="shrink-0 text-primary" />
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
                                  <FaLocationDot aria-hidden="true" size={14} className="mt-0.5 shrink-0 text-primary" />
                                  <span className="font-sans text-[0.9rem] font-normal text-foreground">
                                    {contact.address}
                                  </span>
                                </div>
                        )}

                        {contact.website && (
                                <div className="flex items-center gap-2">
                                  <FaGlobe aria-hidden="true" size={14} className="shrink-0 text-primary" />
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
                <ListPagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
          </div>
        )}
      </div>

    </div>
  );
}
