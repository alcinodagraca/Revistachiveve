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
  { label: "Directório Empresarial", to: "/contactos-uteis" },
  { label: "Sobre Nós", to: "/sobre-nos" },
  { label: "Contacte-nos", to: "/contactos" },
];

const supportLinks: { label: string; to: string }[] = [
  { label: "Anunciar Aqui", to: "/anuncios" },
  { label: "Privacidade", to: "/privacidade" },
  { label: "Termos de Uso", to: "/termos" },
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
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] lg:gap-x-8">
            <div className="max-w-[420px] text-center sm:text-left">
              <img
                src={logoAlt}
                alt="Negócios no Chiveve — Revista"
                className="mx-auto mb-4 block h-12 w-auto sm:mx-0"
              />

              <p className="mb-6 font-sans text-sm font-normal leading-[1.7] text-primary-foreground">
                Negócios, liderança e inovação em Moçambique.
              </p>

              <p className="mb-6 font-sans text-sm font-normal leading-[1.7] text-primary-foreground">
                Acompanhe as nossas publicações, leia as nossas edições, partilhe
                histórias e faça parte desta comunidade empresarial que acredita
                no poder da informação para transformar negócios e desenvolver o
                país.
              </p>

            </div>

            <nav aria-label="Navegação no rodapé">
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
            </nav>

            <nav aria-label="Informações no rodapé">
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
            </nav>

            <div>
              <h4 className={headingClass}>Contactos</h4>
              <ul className="grid gap-3">
                <li>
                  <span className={`${linkClass} cursor-default`}>Cidade da Beira, Moçambique</span>
                </li>
                <li>
                  <a
                    href="mailto:geral@revistachiveve.com"
                    className={`${linkClass} transition-opacity hover:opacity-80`}
                  >
                    Email: geral@revistachiveve.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+258862326404"
                    className={`${linkClass} transition-opacity hover:opacity-80`}
                  >
                    Telefone: +258 86 232 6404
                  </a>
                </li>
              </ul>

              <p className="mb-2 mt-6 font-sans text-xs uppercase tracking-[0.1em] text-primary-foreground/80">
                Redes sociais
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Revista Chiveve no ${label}`}
                    className="flex size-[44px] items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon size={19} className="text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/25 py-4">
        <div className="site-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-sans text-xs font-normal text-primary-foreground sm:text-left">
            © 2026 Revista Negócios no Chiveve — Todos os direitos reservados.
          </span>

          <div className="flex self-end items-center gap-3 sm:self-auto sm:justify-end">
            <span className="whitespace-nowrap font-sans text-[0.68rem] font-medium uppercase tracking-[0.1em] text-primary-foreground">
              Suportado por
            </span>
            <img
              src="/Logo Branco.png"
              alt="Negócios no Chiveve Hub"
              className="block h-7 w-auto max-w-[132px] object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
