import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sendContactMessage } from "../../server/contact";
import type { Edition } from "../../server/wp";

export function NewsletterSection({ editions = [] }: { editions?: Edition[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submissionState, setSubmissionState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const currentEdition = editions.find((edition) => edition.featured) ?? editions[0] ?? null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submissionState === "sending") return;

    setSubmissionState("sending");
    try {
      await sendContactMessage({
        data: {
          name,
          email,
          subject: "Pedido de subscrição da newsletter",
          message: "Solicito a subscrição deste endereço na newsletter editorial da Revista Chiveve.",
          website,
        },
      });
      setName("");
      setEmail("");
      setWebsite("");
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <section id="newsletter" className="bg-[#ffcc0a] py-18 md:py-24">
      <div className="site-shell">
        <div className={`grid grid-cols-1 items-center gap-8 ${currentEdition ? "lg:grid-cols-[minmax(0,1.18fr)_360px]" : ""}`}>
          <div className="max-w-[520px] pt-2">
            <h2 className="mb-2 font-sans text-[1.32rem] font-medium leading-[1.18] tracking-[-0.025em] text-[#123b9d] md:text-[1.45rem]">
              Receba a selecção editorial da semana
            </h2>

            <p className="mb-8 font-sans text-[0.98rem] font-light leading-[1.55] text-[#123b9d]">
              Todas as semanas, a Revista Negócios no Chiveve envia uma selecção de
              conteúdos sobre negócios, liderança, inovação, empreendedorismo e
              oportunidades em Moçambique.
            </p>

            <form onSubmit={handleSubmit} className="mb-6" aria-describedby="newsletter-consent">
              <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="newsletter-website">Website</label>
                <input
                  id="newsletter-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <label htmlFor="newsletter-name" className="mb-2 block font-sans text-sm font-medium text-[#123b9d]">
                Nome
              </label>
              <Input
                id="newsletter-name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-4 min-h-12 border-foreground/60 bg-background px-4 py-3.5 font-sans text-[0.94rem] text-foreground focus-visible:border-primary focus-visible:ring-primary/30"
              />

              <label htmlFor="newsletter-email" className="mb-2 block font-sans text-sm font-medium text-[#123b9d]">
                Email
              </label>
              <Input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 min-h-12 border-foreground/60 bg-background px-4 py-3.5 font-sans text-[0.94rem] text-foreground focus-visible:border-primary focus-visible:ring-primary/30"
              />

              <Button
                type="submit"
                size="lg"
                disabled={submissionState === "sending"}
                className="min-h-[44px] w-full uppercase tracking-[0.04em]"
              >
                {submissionState === "sending" ? "A enviar…" : "Subscrever"}
              </Button>

              {submissionState === "success" && (
                <p className="mt-4 font-sans text-sm font-medium text-[#123b9d]" role="status">
                  Pedido enviado. A equipa confirmará a subscrição por email.
                </p>
              )}
              {submissionState === "error" && (
                <p className="mt-4 font-sans text-sm font-medium text-foreground" role="alert">
                  Não foi possível enviar o pedido. Tente novamente ou escreva para geral@revistachiveve.com.
                </p>
              )}
            </form>

            <p id="newsletter-consent" className="font-sans text-[0.78rem] font-light leading-[1.45] text-[#123b9d]">
              Ao subscrever, concorda com o uso dos seus dados para fins de
              comunicação editorial da revista.
            </p>
          </div>

          {currentEdition && (
            <Link
              to="/edicao-impressa"
              className="group block w-full max-w-[360px] no-underline lg:ml-auto"
              aria-label="Ver edição impressa atual"
            >
              <div className="overflow-hidden border border-[#d4a600] bg-secondary shadow-[0_26px_60px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.24)]">
                <ImageWithFallback
                  src={currentEdition.cover}
                  alt={currentEdition.title}
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
