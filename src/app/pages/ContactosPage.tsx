import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader } from "../components/typography";

export default function ContactosPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada! Entraremos em contacto em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <PageHeader
        title="Contactos"
        subtitle="Entre em contacto connosco"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Contactos" }]}
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionHeader as="h2">Informações de contacto</SectionHeader>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="card-title" className="text-foreground mb-1">
                  Email
                </Heading>
                <a
                  href="mailto:geral@negociosnochiveve.co.mz"
                  className="font-sans font-normal text-base text-muted-foreground no-underline"
                >
                  geral@negociosnochiveve.co.mz
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="card-title" className="text-foreground mb-1">
                  Telefone
                </Heading>
                <a
                  href="tel:+258843001234"
                  className="font-sans font-normal text-base text-muted-foreground no-underline"
                >
                  +258 84 300 1234
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <Heading as="h3" variant="card-title" className="text-foreground mb-1">
                  Endereço
                </Heading>
                <p className="font-sans font-normal text-base text-muted-foreground leading-relaxed">
                  Av. Julius Nyerere, 1234
                  <br />
                  Maputo, Moçambique
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg border border-border bg-card">
          <SectionHeader as="h2">Envie-nos uma mensagem</SectionHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="block font-sans font-medium text-sm text-foreground mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-border bg-[var(--input-background)] font-sans text-base text-foreground outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-sans font-medium text-sm text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-border bg-[var(--input-background)] font-sans text-base text-foreground outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-sans font-medium text-sm text-foreground mb-2"
              >
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-border bg-[var(--input-background)] font-sans text-base text-foreground outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-sans font-medium text-sm text-foreground mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-border bg-[var(--input-background)] font-sans text-base text-foreground outline-none resize-y"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground border-none font-sans font-medium text-base cursor-pointer transition-opacity hover:opacity-90"
            >
              <Send size={18} />
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
