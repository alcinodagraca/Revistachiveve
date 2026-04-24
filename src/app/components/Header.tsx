import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Menu,
  X,
  User,
  Search,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Página Inicial", href: "/" },
  { label: "Artigos", href: "/artigos", hasDropdown: true },
  { label: "Edição Impressa", href: "/edicao-impressa" },
  { label: "Eventos", href: "/eventos" },
  { label: "Concursos Públicos", href: "/concursos-publicos" },
  { label: "Contactos Úteis", href: "/contactos-uteis" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Contactos", href: "/contactos" },
];

const artigosCategories = [
  { name: "Economia", slug: "economia" },
  { name: "Empreendedorismo", slug: "empreendedorismo" },
  { name: "Inovação e Tecnologia", slug: "inovacao-tecnologia" },
  { name: "Liderança", slug: "lideranca" },
  { name: "Opinião", slug: "opiniao" },
  { name: "Análise", slug: "analise" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header style={{ backgroundColor: "var(--background)", borderBottom: "1px solid var(--border)" }}>
      {/* Top Bar */}
      <div
        style={{ borderBottom: "1px solid var(--border)" }}
        className="px-4 md:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1"
            style={{ color: "var(--foreground)" }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button
            className="hidden md:flex p-1"
            style={{ color: "var(--foreground)" }}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          {/* Center: Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            {/* Stylized book/magazine icon */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6 L18 2 L18 34 L6 30 Z" fill="var(--chart-1)" />
              <path d="M20 2 L32 6 L32 30 L20 34 Z" fill="var(--chart-1)" opacity="0.6" />
              <path d="M18 2 L20 2 L20 34 L18 34 Z" fill="var(--foreground)" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span
                className="tracking-wider uppercase"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-16)",
                  fontWeight: "var(--font-weight-extra-bold)",
                  color: "var(--foreground)",
                  letterSpacing: "0.06em",
                }}
              >
                Negócios no Chiveve
                <span style={{ color: "var(--chart-1)" }}>.</span>
              </span>
              <span
                className="tracking-widest uppercase"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.2em",
                }}
              >
                Revista
              </span>
            </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Subscription button */}
            <a
              href="#newsletter"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--chart-1)",
                color: "var(--primary-foreground)",
                fontFamily: "Inter, sans-serif",
                fontSize: "var(--text-14)",
                fontWeight: "var(--font-weight-medium)",
                whiteSpace: "nowrap",
              }}
            >
              Assine desde 500 MT / mês
            </a>

            {/* User Icon */}
            <button
              className="p-1.5 rounded-full transition-colors"
              style={{ color: "var(--foreground)" }}
              aria-label="Conta"
            >
              <User size={20} />
            </button>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-1.5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1877F2", color: "#fff" }}
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1DA1F2", color: "#fff" }}
              >
                <Twitter size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#0A66C2", color: "#fff" }}
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#FF0000", color: "#fff" }}
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden md:block px-4 md:px-8" style={{ position: "relative" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => item.hasDropdown && setArtigosDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setArtigosDropdownOpen(false)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-0.5 px-3 py-3 uppercase tracking-wide transition-colors"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: isActive(item.href) ? "var(--font-weight-semi-bold)" : "var(--font-weight-medium)",
                    color: isActive(item.href) ? "var(--chart-1)" : "var(--foreground)",
                    borderBottom: isActive(item.href) ? "2px solid var(--chart-1)" : "2px solid transparent",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={13} />}
                </Link>
                
                {/* Artigos Dropdown */}
                {item.hasDropdown && artigosDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      minWidth: "220px",
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      zIndex: 50,
                      marginTop: "0px",
                    }}
                  >
                    {artigosCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to="/artigos/$category"
                        params={{ category: category.slug }}
                        style={{
                          display: "block",
                          padding: "12px 16px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--foreground)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--border)",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--secondary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 transition-colors"
            style={{ color: "var(--foreground)" }}
            aria-label="Pesquisar"
          >
            <Search size={18} />
          </button>
        </div>
        {searchOpen && (
          <div className="max-w-7xl mx-auto pb-3">
            <div
              className="flex items-center rounded"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--input-background)" }}
            >
              <input
                autoFocus
                type="text"
                placeholder="Pesquisar artigos..."
                className="flex-1 px-4 py-2 bg-transparent outline-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  color: "var(--foreground)",
                }}
              />
              <Search size={16} className="mr-3" style={{ color: "var(--muted-foreground)" }} />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="md:hidden px-4 pb-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <ul className="flex flex-col pt-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1 px-2 py-2.5 border-b"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "var(--text-14)",
                    fontWeight: isActive(item.href) ? "var(--font-weight-semi-bold)" : "var(--font-weight-regular)",
                    color: isActive(item.href) ? "var(--chart-1)" : "var(--foreground)",
                    borderColor: "var(--border)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={14} />}
                </Link>
                {/* Mobile Artigos Categories */}
                {item.hasDropdown && (
                  <div style={{ paddingLeft: "16px", backgroundColor: "var(--secondary)" }}>
                    {artigosCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to="/artigos/$category"
                        params={{ category: category.slug }}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "var(--text-14)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--muted-foreground)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <a
            href="#newsletter"
            className="mt-3 flex items-center justify-center px-4 py-2 rounded cursor-pointer"
            style={{
              backgroundColor: "var(--chart-1)",
              color: "var(--primary-foreground)",
              fontFamily: "Inter, sans-serif",
              fontSize: "var(--text-14)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Assine desde 500 MT / mês
          </a>
        </nav>
      )}
    </header>
  );
}
