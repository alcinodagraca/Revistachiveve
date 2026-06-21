import { Facebook, Instagram, Twitter, MessageCircle, Youtube, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";

const footerCategoryLinks: { label: string; to: string; params?: { category: string } }[] = [
  { label: "Desenvolvimento Pessoal", to: "/artigos/$category", params: { category: "desenvolvimento-pessoal" } },
  { label: "Tecnologia e Inovação", to: "/artigos/$category", params: { category: "inovacao-tecnologia" } },
  { label: "Empreendedorismo", to: "/artigos/$category", params: { category: "empreendedorismo" } },
  { label: "Economia", to: "/artigos/$category", params: { category: "economia" } },
  { label: "Negócios", to: "/artigos/$category", params: { category: "negocios" } },
  { label: "Empresas", to: "/artigos/$category", params: { category: "empresas" } },
  { label: "Liderança", to: "/artigos/$category", params: { category: "lideranca" } },
  { label: "Administração", to: "/artigos/$category", params: { category: "administracao" } },
];

const mainLinks: { label: string; to: string }[] = [
  { label: "Artigos", to: "/artigos" },
  { label: "Edição Impressa", to: "/edicao-impressa" },
  { label: "Eventos", to: "/eventos" },
  { label: "Concursos Públicos", to: "/concursos-publicos" },
  { label: "Sobre Nós", to: "/sobre-nos" },
];

const usefulLinks: { label: string; to: string }[] = [
  { label: "Anunciar Aqui", to: "/anuncios" },
];

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: MessageCircle, href: "#", label: "WhatsApp" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

const linkClass =
  "font-sans text-sm font-normal text-primary-foreground block no-underline";

const headingClass =
  "font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary-foreground mb-4";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6 L18 2 L18 34 L6 30 Z" fill="#ffffff" />
                  <path d="M20 2 L32 6 L32 30 L20 34 Z" fill="rgba(255,255,255,0.7)" />
                  <path d="M18 2 L20 2 L20 34 L18 34 Z" fill="#ffffff" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-sans text-sm font-bold text-primary-foreground tracking-[0.05em]">
                    NEGÓCIOS NO CHIVEVE.
                  </span>
                  <span className="font-sans text-[10px] font-medium text-primary-foreground tracking-[0.18em]">
                    REVISTA
                  </span>
                </div>
              </div>

              <p className="mb-5 font-sans text-sm font-normal text-primary-foreground leading-[1.7]">
                A sua revista de referência para negócios, empreendedorismo,
                liderança e inovação em Moçambique e África.
              </p>

              <div className="flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 bg-white"
                  >
                    <Icon size={16} className="text-primary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className={headingClass}>Links</h4>
              <ul className="space-y-2">
                {mainLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={`${linkClass} transition-opacity hover:opacity-80`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contactos */}
            <div>
              <h4 className={headingClass}>Contactos</h4>
              <ul className="space-y-3">
                <li>
                  <span className={`${linkClass} cursor-default`}>Maputo, Moçambique</span>
                </li>
                <li>
                  <a href="tel:+25887XXXXXXX" className={`${linkClass} transition-opacity hover:opacity-80`}>
                    +258 87 000 0000
                  </a>
                </li>
                <li>
                  <a href="tel:+25882XXXXXXX" className={`${linkClass} transition-opacity hover:opacity-80`}>
                    +258 82 000 0000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@revistachiveve.co.mz"
                    className={`${linkClass} transition-opacity hover:opacity-80`}
                  >
                    info@revistachiveve.co.mz
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Úteis */}
            <div>
              <h4 className={headingClass}>Links Úteis</h4>
              <ul className="space-y-2">
                {usefulLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={`${linkClass} transition-opacity hover:opacity-80`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/25">
            <div className="flex flex-wrap gap-x-8 gap-y-3 justify-between">
              {footerCategoryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  params={link.params}
                  className="font-sans text-[11px] font-semibold text-primary-foreground tracking-[0.1em] uppercase no-underline transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 border-t border-white/25">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-sans text-xs font-normal text-primary-foreground">
            Revista Chiveve — Todos os direitos reservados © 2026
          </span>
          <Link
            to="/privacidade"
            className="font-sans text-xs font-normal text-primary-foreground no-underline transition-opacity hover:opacity-80"
          >
            Políticas de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
