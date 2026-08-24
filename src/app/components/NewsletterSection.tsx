import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Edition } from "../../server/wp";

export function NewsletterSection({ editions = [] }: { editions?: Edition[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const currentEdition = editions.find((edition) => edition.featured) ?? editions[0] ?? null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="newsletter" className="bg-[#ffcc0a] py-18 md:py-24">
      <div className="site-shell">
        <div className={`grid grid-cols-1 items-center gap-5 ${currentEdition ? "md:grid-cols-[1.18fr_360px]" : ""}`}>
          <div className="max-w-[520px] pt-2">
            <h2 className="mb-2 font-sans text-[1.32rem] font-medium leading-[1.18] tracking-[-0.025em] text-primary md:text-[1.45rem]">
              Receba a selecção editorial da semana.
            </h2>

            <p className="mb-8 font-sans text-[0.98rem] font-light leading-[1.45] text-primary/90">
              Todas as semanas, a Revista Chiveve envia uma leitura essencial sobre
              negócios, liderança e inovação em Moçambique e em África.
            </p>

            <form onSubmit={handleSubmit} className="mb-6">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-3 w-full border border-[#d1d5db] bg-white px-4 py-3.5 font-sans text-[0.94rem] font-normal text-foreground outline-none placeholder:text-[#b0b7c3]"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-3 w-full border border-[#d1d5db] bg-white px-4 py-3.5 font-sans text-[0.94rem] font-normal text-foreground outline-none placeholder:text-[#b0b7c3]"
              />
              <button
                type="submit"
                className="w-full cursor-pointer border-none bg-primary px-5 py-3.5 font-sans text-[0.94rem] font-medium uppercase tracking-[0.04em] text-white transition-opacity hover:opacity-90"
              >
                {submitted ? "✓ Subscrição confirmada" : "Subscrever"}
              </button>
            </form>

            <p className="font-sans text-[0.78rem] font-light leading-[1.45] text-primary/80">
              Ao se cadastrar, você concorda com nossa{" "}
              <Link
                to="/privacidade"
                className="text-primary underline"
              >
                Política de Privacidade
              </Link>{" "}
              e com o uso de seus dados para fins de comunicação.
            </p>
          </div>

          {currentEdition && (
            <Link
              to="/edicao-impressa"
              className="group ml-auto block w-full max-w-[360px] no-underline"
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
