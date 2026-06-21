import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X as CloseIcon,
  Search,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { cn } from "./ui/utils";

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

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.965 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.73 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01ZM12.04 20.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.48-.02-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: XIcon, href: "#", label: "X" },
  { Icon: WhatsAppIcon, href: "#", label: "WhatsApp" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchInput.trim();
    if (!q) return;
    navigate({ to: "/pesquisa", search: { q } });
    setSearchOpen(false);
    setSearchInput("");
  }

  useEffect(() => {
    if (!searchOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return (
      location.pathname === href ||
      location.pathname.startsWith(href + "/")
    );
  };

  return (
    <header className="bg-background">
      <div className="bg-primary px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 transition-opacity hover:opacity-80 text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 no-underline"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 6 L18 2 L18 34 L6 30 Z" fill="#ffffff" />
              <path
                d="M20 2 L32 6 L32 30 L20 34 Z"
                fill="#ffffff"
                opacity="0.6"
              />
              <path d="M18 2 L20 2 L20 34 L18 34 Z" fill="#ffffff" opacity="0.9" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="uppercase font-sans text-base font-bold text-white tracking-[0.06em]">
                Negócios no Chiveve
                <span className="text-white opacity-70">.</span>
              </span>
              <span className="uppercase font-sans text-[10px] font-semibold text-white/75 tracking-[0.24em]">
                Revista
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-85 bg-white text-primary"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="hidden md:block px-4 md:px-8 relative bg-background border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center -ml-3">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setArtigosDropdownOpen(true)
                }
                onMouseLeave={() =>
                  item.hasDropdown && setArtigosDropdownOpen(false)
                }
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-0.5 px-3 py-6 uppercase tracking-wide transition-colors font-sans text-xs no-underline border-b-2",
                    isActive(item.href)
                      ? "font-semibold text-primary border-primary"
                      : "font-medium text-foreground border-transparent",
                  )}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={13} />}
                </Link>

                {item.hasDropdown && artigosDropdownOpen && (
                  <div className="absolute top-full left-0 min-w-[220px] bg-card border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50">
                    {artigosCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to="/artigos/$category"
                        params={{ category: category.slug }}
                        className="block py-3 px-4 font-sans text-sm font-normal text-foreground no-underline border-b border-border transition-colors hover:bg-secondary"
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
            className="p-2 transition-colors text-foreground hover:text-primary"
            aria-label="Pesquisar"
          >
            <Search size={18} />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              key="search-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="max-w-7xl mx-auto pb-5">
                <form
                  onSubmit={handleSearchSubmit}
                  className="group flex items-center bg-background border-b-2 border-border transition-colors focus-within:border-primary"
                >
                  <Search
                    size={20}
                    className="text-muted-foreground mr-3 flex-shrink-0"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Pesquisar artigos, eventos, tags…"
                    className="flex-1 bg-transparent outline-none font-serif font-medium text-foreground py-3 text-[clamp(20px,2.4vw,28px)]"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => setSearchInput("")}
                      aria-label="Limpar"
                      className="p-2 transition-opacity hover:opacity-80 text-muted-foreground"
                    >
                      <CloseIcon size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Fechar"
                    className="ml-2 px-3 py-1.5 transition-opacity hover:opacity-80 font-sans text-xs font-semibold tracking-[0.06em] uppercase text-muted-foreground border border-border rounded-md bg-background cursor-pointer"
                  >
                    Esc
                  </button>
                </form>
                <p className="font-sans text-xs text-muted-foreground mt-2 tracking-[0.03em]">
                  Carregue em <strong className="text-foreground font-semibold">Enter</strong> para procurar
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Slide-in Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/45 z-[90]"
              aria-hidden
            />

            <motion.aside
              key="sidebar-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="fixed top-0 left-0 bottom-0 w-[min(420px,92vw)] bg-primary z-[100] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center py-5 px-6 border-b border-white/[0.18]">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 transition-opacity hover:opacity-80 text-white bg-transparent border-none cursor-pointer p-0 font-sans text-base font-medium"
                  aria-label="Fechar menu"
                >
                  <CloseIcon size={24} />
                  Fechar Menu
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="list-none p-0 m-0 flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.04,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block py-3 font-sans text-lg text-white no-underline transition-opacity hover:opacity-100",
                          isActive(item.href)
                            ? "font-semibold opacity-100"
                            : "font-medium opacity-90",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + navItems.length * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      to="/anuncios"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-sans text-lg font-medium text-white opacity-90 no-underline"
                    >
                      Anuncie
                    </Link>
                  </motion.li>
                </ul>

                <div className="flex gap-2 mt-8 pt-5 border-t border-white/[0.18]">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-85 bg-white text-primary"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </nav>

              <div className="pt-5 px-6 pb-6 border-t border-white/[0.18]">
                <Link
                  to="/"
                  hash="newsletter"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full p-4 bg-white text-primary font-sans text-base font-semibold text-center no-underline rounded-md tracking-[0.02em] transition-opacity hover:opacity-90"
                >
                  Assine Agora
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
