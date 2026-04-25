import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  "Desenvolvimento Pessoal",
  "Tecnologia e Inovação",
  "Empreendedorismo",
  "Economia",
  "Negócios",
  "Empresas",
  "Liderança",
  "Administração",
];

const quickLinks = [
  { label: "Página Inicial", href: "#" },
  { label: "Artigos", href: "#" },
  { label: "Edição Impressa", href: "#" },
  { label: "Eventos", href: "#" },
  { label: "Concursos Públicos", href: "#" },
  { label: "Sobre Nós", href: "#" },
  { label: "Contactos", href: "#" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#F5F5F5", color: "var(--foreground)" }}>
      {/* Main Footer */}
      <div className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Column */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2 mb-4">
                <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6 L18 2 L18 34 L6 30 Z" fill="var(--foreground)" />
                  <path d="M20 2 L32 6 L32 30 L20 34 Z" fill="var(--muted-foreground)" />
                  <path d="M18 2 L20 2 L20 34 L18 34 Z" fill="var(--primary)" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-extra-bold)",
                      color: "var(--foreground)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Negócios no Chiveve.
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--muted-foreground)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    REVISTA
                  </span>
                </div>
              </div>

              <p
                className="mb-5"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                  lineHeight: "1.7",
                }}
              >
                A sua revista de referência para negócios, empreendedorismo,
                liderança e inovação em Moçambique e África.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  { Icon: Facebook, href: "#", label: "Facebook", bg: "#1877F2" },
                  { Icon: Twitter, href: "#", label: "Twitter", bg: "#1DA1F2" },
                  { Icon: Youtube, href: "#", label: "YouTube", bg: "#FF0000" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn", bg: "#0A66C2" },
                ].map(({ Icon, href, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={16} style={{ color: "#ffffff" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="mb-4 pb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Links Rápidos
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[var(--primary)]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "var(--text-14)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                        display: "block",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4
                className="mb-4 pb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "var(--text-14)",
                  fontWeight: "var(--font-weight-semi-bold)",
                  color: "var(--foreground)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Contactos
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Maputo, Moçambique
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={15} className="flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  <a
                    href="tel:+25887XXXXXXX"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                    }}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    +258 87 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={15} className="flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  <a
                    href="tel:+25882XXXXXXX"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                    }}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    +258 82 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={15} className="flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  <a
                    href="mailto:info@revistachiveve.co.mz"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "var(--text-14)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                    }}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    info@revistachiveve.co.mz
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Links Row */}
          <div
            className="mt-8 pt-6"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--muted-foreground)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="px-4 md:px-8 py-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
            }}
          >
            Revista Chiveve — Todos os direitos reservados © 2024
          </span>
          <div className="flex items-center gap-4">
            {["Anúncios", "Contactos", "Políticas de Privacidade"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                }}
                className="hover:text-[var(--primary)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
