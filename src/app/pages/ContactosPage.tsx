import { useState } from "react";
import {
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaPhone,
} from "react-icons/fa6";
import { PageHeader } from "../components/PageHeader";
import { Heading, SectionHeader } from "../components/typography";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const contactChannels = [
  {
    title: "Redacção",
    description:
      "Sugestões editoriais, propostas de entrevista, temas para investigação e contributos relevantes para a agenda da revista.",
    value: "geral@negociosnochiveve.co.mz",
    href: "mailto:geral@negociosnochiveve.co.mz",
    icon: FaEnvelope,
  },
  {
    title: "Telefone",
    description:
      "Para contacto directo com a equipa e acompanhamento de pedidos institucionais, editoriais ou comerciais.",
    value: "+258 84 300 1234",
    href: "tel:+258843001234",
    icon: FaPhone,
  },
  {
    title: "Maputo",
    description:
      "Estamos disponíveis para reuniões, parcerias e encontros editoriais mediante agendamento prévio.",
    value: "Av. Julius Nyerere, 1234, Maputo, Moçambique",
    href: undefined,
    icon: FaLocationDot,
  },
];

export default function ContactosPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada. Entraremos em contacto em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-background">
      <div className="site-shell py-12 md:py-14">
        <PageHeader
          title="Contactos"
          subtitle="Fale com a Revista Chiveve para sugestões editoriais, parcerias, publicidade ou pedidos institucionais."
          breadcrumbs={[{ label: "Início", to: "/" }, { label: "Contactos" }]}
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
          <section>
            <SectionHeader as="h2">Canais Directos</SectionHeader>
            <div className="space-y-6">
              {contactChannels.map(({ title, description, value, href, icon: Icon }) => (
                <article key={title} className="border-b border-border pb-6 last:border-b-0">
                  <div className="mb-3 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <Heading
                        as="h3"
                        variant="feature-title"
                        className="mb-1 text-foreground"
                      >
                        {title}
                      </Heading>
                      <p className="max-w-2xl font-sans text-[0.94rem] font-light leading-[1.72] text-foreground/74">
                        {description}
                      </p>
                    </div>
                  </div>

                  {href ? (
                    <a
                      href={href}
                      className="ml-14 font-sans text-[0.94rem] font-normal text-primary no-underline transition-opacity hover:opacity-80"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="ml-14 font-sans text-[0.94rem] font-normal text-foreground">
                      {value}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="border border-border bg-card p-7 md:p-8">
            <SectionHeader as="h2">Envie-nos uma mensagem</SectionHeader>
            <p className="mb-6 max-w-2xl font-sans text-[0.94rem] font-light leading-[1.72] text-foreground/74">
              Se preferir, partilhe o seu pedido por aqui. Quanto mais claro for o contexto,
              mais útil e rápida será a nossa resposta.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary"
                  >
                    Nome
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="O seu nome"
                    className="h-11 border-border bg-white px-4"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="nome@empresa.com"
                    className="h-11 border-border bg-white px-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary"
                >
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Ex.: Sugestão editorial, parceria, publicidade"
                  className="h-11 border-border bg-white px-4"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  required
                  rows={7}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Partilhe connosco o contexto do seu pedido."
                  className="min-h-[180px] border-border bg-white px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-[0.82rem] font-light leading-[1.6] text-muted-foreground">
                  A equipa responde prioritariamente a pedidos com contexto claro e relevância editorial ou institucional.
                </p>
                <Button type="submit" size="lg" className="gap-2 px-7">
                  <FaPaperPlane size={15} />
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
