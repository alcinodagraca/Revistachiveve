import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";
import logoAlt from "../../assets/logo-alt.png";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@RevistaChiveve";
const FACEBOOK_URL = "https://facebook.com/Revistachiveve/";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/neg%C3%B3cios-no-chiveve/";

const mainLinks: { label: string; to: string }[] = [
  { label: "Página Inicial", to: "/" },
  { label: "Artigos", to: "/artigos" },
  { label: "Edição Impressa", to: "/edicao-impressa" },
  { label: "Eventos", to: "/eventos" },
  { label: "Concursos Públicos", to: "/concursos-publicos" },
];

const supportLinks: { label: string; to: string }[] = [
  { label: "Contactos Úteis", to: "/contactos-uteis" },
  { label: "Sobre Nós", to: "/sobre-nos" },
  { label: "Anunciar Aqui", to: "/anuncios" },
  { label: "Privacidade", to: "/privacidade" },
];

const socials = [
  { Icon: FaFacebook, href: FACEBOOK_URL, label: "Facebook" },
  { Icon: FaYoutube, href: YOUTUBE_CHANNEL_URL, label: "YouTube" },
  { Icon: FaLinkedin, href: LINKEDIN_URL, label: "LinkedIn" },
];

const linkClass =
  "font-sans text-sm font-normal text-primary-foreground block no-underline";

const headingClass =
  "mb-4 font-sans text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground md:text-sm";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="pt-18 pb-14">
        <div className="site-shell">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] md:gap-x-8">
            <div className="max-w-[420px] text-center md:text-left">
              <img
                src={logoAlt}
                alt="Negócios no Chiveve — Revista"
                className="mx-auto mb-4 block h-12 w-auto md:mx-0"
              />

              <p className="mb-6 font-sans text-sm font-normal leading-[1.7] text-primary-foreground">
                Leitura de referência para acompanhar negócios, liderança e
                inovação em Moçambique e no continente africano.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
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

            <div>
              <h4 className={headingClass}>Navegação</h4>
              <ul className="grid gap-2">
                {mainLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={`${linkClass} transition-opacity hover:opacity-80`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>Informações</h4>
              <ul className="grid gap-2">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={`${linkClass} transition-opacity hover:opacity-80`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>Contactos</h4>
              <ul className="grid gap-3">
                <li>
                  <span className={`${linkClass} cursor-default`}>Maputo, Moçambique</span>
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
          </div>
        </div>
      </div>

      <div className="border-t border-white/25 py-4">
        <div className="site-shell flex items-center justify-center">
          <span className="font-sans text-xs font-normal text-primary-foreground">
            Revista Chiveve — Todos os direitos reservados © 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
