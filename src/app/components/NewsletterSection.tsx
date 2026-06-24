import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Edition } from "../../server/wp";

export function NewsletterSection({ editions = [] }: { editions?: Edition[] }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section
      id="newsletter"
      className="px-4 md:px-8 bg-background py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          className={`grid gap-12 items-center grid-cols-1 ${
            editions.length > 0 ? "md:grid-cols-[5fr_7fr]" : ""
          }`}
        >
          {/* Left: Form */}
          <div>
            <h2 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary mb-4">
              Subscreva a nossa newsletter
            </h2>

            <p className="font-sans text-base font-normal text-foreground leading-[1.6] mb-6">
              Receba o melhor da Negócios no Chiveve directamente no seu e-mail,
              com notícias de negócios, insights.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full font-sans text-base font-normal text-foreground bg-background border-2 border-primary rounded-none py-4 px-5 outline-none mb-3"
              />
              <button
                type="submit"
                className="transition-opacity hover:opacity-90 w-full font-sans text-base font-semibold tracking-[0.02em] bg-primary text-white border-none rounded-none py-4 px-5 cursor-pointer"
              >
                {submitted ? "✓ Inscrito" : "Assinar"}
              </button>
            </form>

            <p className="font-sans text-sm font-normal text-foreground leading-[1.5] mt-4">
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

          {editions.length > 0 && (
            <Link
              to="/edicao-impressa"
              className="grid grid-cols-3 gap-4 no-underline group"
              aria-label="Ver edições impressas"
            >
              {editions.map((edition) => (
                <div key={edition.id}>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-secondary shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:-translate-y-1">
                    <ImageWithFallback
                      src={edition.cover}
                      alt={edition.title}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                </div>
              ))}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
